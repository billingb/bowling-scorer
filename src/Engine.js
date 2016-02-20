var exports = module.exports = {};
var Scorer = require('./Scorer');
var Parser = require('./Parser');
var Immutable = require('immutable');
var _ = require('lodash');
var readline = require('readline');

function processSetup(line, state) {
  var players = Parser.parseWholePositiveNumber(line);
  var playerScores = Immutable.List();
  for(var i = 0; i < players; i++) {
    playerScores = playerScores.push('');
  }
  return state.set('gameState', 'in progress').set('playerScores', playerScores).set('frame', 1);
}

function processGame(line, state) {
  var parsedInput = Parser.parseBallInput(line);
  var playerIndex = findCurrentPlayer(state);
  var currentScores = state.get('playerScores');
  currentScores = currentScores.set(playerIndex, Scorer.recordBall(currentScores.get(playerIndex), parsedInput));
  var newState = state.set('playerScores', currentScores);
  if (Scorer.isEndOfGame(newState.get('playerScores').last())) {
    newState = newState.set('gameState', 'complete');
    newState = newState.set('finalScores', Immutable.List(_.map(currentScores.toJS(), function(scoreLine){
        return Scorer.score(scoreLine);
    })));
  } else if(findCurrentPlayer(newState) === -1) {
    newState = newState.set('frame', newState.get('frame') + 1);
  }
  return newState;
}


function findCurrentPlayer(state) {
  return _.findIndex(state.get('playerScores').toJS(), function(score) {
      if(state.get('frame') < 10) {
        return score.length < (state.get('frame') * 2);
      } else {
        return !Scorer.isEndOfGame(score);
      }
    });
}

exports.isCompletedState = function(state) {
  return state.get('gameState') === 'complete';
};

exports.newGameState = function() {
  return Immutable.Map({gameState: 'setup'});
};

exports.process = function(line, state) {
    switch (state.get('gameState')) {
      case "setup":
        var newState = processSetup(line, state);
        console.log('Enter pins knocked down for each roll by each player hitting enter after each roll: ');
        return newState;
      case "in progress":
        return processGame(line, state);
    }
};

exports.run = function () {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  var state = exports.newGameState();
  console.log('Please enter number of players: ');
  rl.on('line', function (line) {
    try {
      state = exports.process(line, state);
    } catch (e) {
      console.log(e.message);
      console.log('Please re-enter correct value: ');
      return state;
    }
    if(exports.isCompletedState(state)) {
      console.log('Game Complete!');
      console.log('Final Scores:');
      _.forEach(state.get('finalScores').toJS(), function (score) {console.log(score);});
      process.exit();
    }
  });
};