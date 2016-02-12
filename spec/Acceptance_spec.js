/* jshint expr:true */
require('chai').should();
var Engine = require('../src/Engine.js');
var _ = require('lodash');

describe('Acceptance E2E Tests', function () {
  it('should play a game with three players and different scoring', function () {
    var state = Engine.newGameState();
    state = Engine.process('3', state);
    //Player      1       2     3
    var input = ['x', '2', '2', '1', '9', //Frame 1
                 'x', '2', '2', '5', '/', //Frame 2
                 'x', '2', '2', '5', '/', //Frame 3
                 'x', '2' ,'2', '5', '/', //Frame 4
                 'x', '2' ,'2', '5', '/',//Frame 5
                 'x', '2' ,'2', '5', '/', //Frame 6
                 'x', '2' ,'2', '5', '/', //Frame 7
                 'x', '2' ,'2', '5', '/', //Frame 8
                 'x', '2' ,'2', '5', '/', //Frame 9
       'x', 'x', 'x', '2', '2', '5', '/', 'x']; //Frame 10
    state = _.reduce(input, (state, line) => {
        return Engine.process(line, state);
  }, state);
    Engine.isCompletedState(state).should.be.true;
    state.get('finalScores').get(0).should.eql(300);
    state.get('finalScores').get(1).should.eql(40);
    state.get('finalScores').get(2).should.eql(155);
  });
});