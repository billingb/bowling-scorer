/* jshint expr:true */
require('chai').should();
var Engine = require('../src/Engine.js');
var Immutable = require('immutable');

describe('Engine', function () {
  it('should initialize a new game', function () {
    Engine.newGameState().toObject().should.eql({gameState: 'setup'});
  });

  it('reports completed game when game complete', function () {
    Engine.isCompletedState(Immutable.Map({gameState: 'complete'})).should.be.true;
  });

  it('returns false for completed game when game not complete', function () {
    Engine.isCompletedState(Immutable.Map({gameState: 'in progress'})).should.be.false;
  });

  it('should set number of players and frame 1 for first input after game initialized', function () {
    var expectedState = {gameState: 'in progress', playerScores: ['', '', ''], frame: 1};
    Engine.process('3', Engine.newGameState()).toJS().should.eql(expectedState);
  });

  it('should set the first roll in the score line when game in progress', function () {
    var state = Engine.process('3', Engine.newGameState());
    Engine.process('5', state).get('playerScores').get(0).should.eql('5');
  });

  it('should add score to the last player that has not bowled this frame', function () {
    var initState = Immutable.Map({gameState: 'in progress', playerScores: Immutable.List(['x ', '2', '']), frame: 1});
    var state1 = Engine.process('5', initState);
    state1.get('playerScores').get(1).should.eql('25');
  });

  it('should add the scores and increment the frame when the last player in the frame bowls', function () {
    var initState = Immutable.Map({gameState: 'in progress', playerScores: Immutable.List(['x ', '22', '5']), frame: 1});
    var state1 = Engine.process('5', initState);
    state1.get('playerScores').get(2).should.eql('5/');
    state1.get('frame').should.eql(2);
  });

  it('should add score to the last player that has not bowled this frame for 10th frame', function () {
    var initState = Immutable.Map({gameState: 'in progress',
      playerScores: Immutable.List(['x x x x x x x x x x x ', '222222222222222222']), frame: 10});
    var state1 = Engine.process('5', initState);
    state1.get('playerScores').get(0).should.eql('x x x x x x x x x x x 5');
  });

  it('should mark game complete and add final scores when final player finishes game', function () {
    var initState = Immutable.Map({gameState: 'in progress',
      playerScores: Immutable.List(['x x x x x x x x x x x x ', '2222222222222222222']), frame: 10});
    var state1 = Engine.process('5', initState);
    state1.get('gameState').should.eql('complete');
    state1.get('finalScores').toJS().should.eql([300, 43]);
  });
});