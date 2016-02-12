var exports = module.exports = {};
var Scorer = require('./Scorer');
var Parser = require('./Parser');
var Immutable = require('immutable');
var _ = require('lodash');

function processSetup(line, state) {
  var players = parseInt(line);
  var playerScores = Immutable.List();
  for(var i = 0; i < players; i++) {
    playerScores = playerScores.push('');
  }
  return state.set('gameState', 'in progress').set('playerScores', playerScores).set('frame', 1);
}

function findCurrentPlayer(state) {
  return _.findIndex(state.get('playerScores').toJS(), (score) => {
    if(state.get('frame') < 10) {
      return score.length < (state.get('frame') * 2);
    } else {
      return !Scorer.isEndOfGame(score)
    }
  });
}

function processGame(line, state) {
  var parsedInput = Parser.parseBallInput(line);
  var playerIndex = findCurrentPlayer(state);
  var currentScores = state.get('playerScores');
  currentScores = currentScores.set(playerIndex, Scorer.recordBall(currentScores.get(playerIndex), parsedInput));
  var newState = state.set('playerScores', currentScores);
  if (Scorer.isEndOfGame(newState.get('playerScores').last())) {
    newState = newState.set('gameState', 'complete');
    newState = newState.set('finalScores', Immutable.List(_.map(currentScores.toJS(), (scoreLine) => {
        return Scorer.score(scoreLine);
    })));
  } else if(findCurrentPlayer(newState) == -1) {
    newState = newState.set('frame', newState.get('frame') + 1);
  }
  return newState;
}

exports.isCompletedState = function(state) {
  return state.get('gameState') === 'complete';
};

exports.newGameState = function() {
  return Immutable.Map({gameState: 'setup'});
};

exports.process = function(line, state) {
  try {
    switch (state.get('gameState')) {
      case "setup":
        return processSetup(line, state);
      case "in progress":
        return processGame(line, state);
    }
  } catch (e) {
    console.log(e);
    console.log('Please re-enter ball');
    return state;
  }
};
