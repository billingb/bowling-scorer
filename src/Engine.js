var exports = module.exports = {};
var _ = require('lodash');
var Scorer = require('./Scorer');
var Parser = require('./Parser');



exports.process = function(line, state) {
  try {
    var parsedInput = Parser.parseBallInput(line);
    var newState = state.set('score', Scorer.recordBall(state.get('score'), parsedInput));
    if (Scorer.isEndOfGame(newState.get('score'))) {
      console.log('Game Completed!')
      console.log('Game Score: ' + Scorer.score(newState.get('score')));
      newState = newState.set('completed', true);
    }
    return newState;
  } catch (e) {
    console.log(e);
    console.log('Please re-enter ball');
    return state;
  }
};
