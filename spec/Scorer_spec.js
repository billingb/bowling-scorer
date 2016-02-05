var should = require('chai').should();
var Scorer = require('../src/Scorer.js');
var _ = require('lodash');


describe('Scorer', function () {
  it('Add numbers 0-9 to score when rolled', function () {
    var currentScore = '35x ';
    _.forEach(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], (pinsDown) =>
      Scorer.recordBall(currentScore, pinsDown).should.eql(currentScore + pinsDown)
    );
  });

  it('Records a strike for the frame if the first ball is a strike (x, X, 10)', function () {
    var currentScore = '';
    _.forEach(['x', 'X', '10'], (pinsDown) =>
      Scorer.recordBall(currentScore, pinsDown).should.eql('x ')
    );
  });

  it('Records a spare for the frame if the second ball closes the frame', function () {
    var currentScore = '346';
    Scorer.recordBall(currentScore, '4').should.eql('346/');
  });

  it('has an error if second ball knocks down more pins then are remaining', function () {
    var currentScore = '35617';
    should.Throw(function () {
      Scorer.recordBall(currentScore, 4);
    }, Error);
  });
});