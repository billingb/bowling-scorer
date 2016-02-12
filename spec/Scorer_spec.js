/* jshint expr:true */

var should = require('chai').should();
var Scorer = require('../src/Scorer.js');
var _ = require('lodash');


describe('Scorer', function () {
  describe('Recording', function () {
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

    it('has an error if the first ball is entered as a spare(/)', function () {
      var currentScore = '3561';
      should.Throw(function () {
        Scorer.recordBall(currentScore, '/');
      }, Error);
    });
  });

  describe('Scoring', function () {
    it('Should score an all 0 game as 0', function () {
      var score = '00000000000000000000';
      Scorer.score(score).should.eql(0);
    });

    it('Should score all open frames correctly', function () {
      var score = '22222222222222222222';
      Scorer.score(score).should.eql(40);
    });

    it('Should score strikes correctly', function () {
      var score = 'x x x 222';
      Scorer.score(score).should.eql(2+2+2+14+22+30);
    });

    it('Should score spares correctly', function () {
      var score = '3/6/x 2/22';
      Scorer.score(score).should.eql(2+2+12+20+20+16);
    });

    it('Should correctly score a 300 game which requires scoring extra frames correctly', function () {
      var score = 'x x x x x x x x x x x x ';
      Scorer.score(score).should.eql(300);
    });

    it('Should correctly score a spare in last frame', function () {
      var score = '0000000000000000000/5';
      Scorer.score(score).should.eql(15);
    });

    it('Should correctly score a spare followed by a strike in last frame', function () {
      var score = '000000000000000000x 5/';
      Scorer.score(score).should.eql(20);
    });
  });

  describe('Is end of game?', function () {
    it('Should return false when the game is not over', function () {
      var score = '222';
      Scorer.isEndOfGame(score).should.be.false;
    });

    it('Should return true when 10 frames with last frame open', function () {
      var score = '22222222222222222222';
      Scorer.isEndOfGame(score).should.be.true;
    });

    it('Should return false when 10 frames with last frame closed with spare and no extra balls', function () {
      var score = '0000000000000000000/';
      Scorer.isEndOfGame(score).should.be.false;
    });

    it('Should return true when 10 frames with last frame spare and one extra balls', function () {
      var score = '0000000000000000000/2';
      Scorer.isEndOfGame(score).should.be.true;
    });

    it('Should return true when 10 frames with last frame spare and extra ball strike', function () {
      var score = '0000000000000000000/x ';
      Scorer.isEndOfGame(score).should.be.true;
    });

    it('Should return false when 10 frames with last frame strike and no extra balls', function () {
      var score = '000000000000000000x ';
      Scorer.isEndOfGame(score).should.be.false;
    });

    it('Should return false when 10 frames with last frame strike and one extra balls', function () {
      var score = '000000000000000000x 3';
      Scorer.isEndOfGame(score).should.be.false;
    });

    it('Should return false when 10 frames with last frame closed with strike and extra ball strike', function () {
      var score = '000000000000000000x x ';
      Scorer.isEndOfGame(score).should.be.false;
    });

    it('Should return true when 10 frames with last frame three strike', function () {
      var score = '000000000000000000x x x ';
      Scorer.isEndOfGame(score).should.be.true;
    });

    it('Should return true when 10 frames with last frame strike and two extra balls', function () {
      var score = '000000000000000000x 33';
      Scorer.isEndOfGame(score).should.be.true;
    });
  });
});