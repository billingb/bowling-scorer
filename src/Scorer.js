var exports = module.exports = {};
var _ = require('lodash');

exports.recordBall = function(scoreLine, pinsDown) {
  var frameBall = scoreLine.length % 2;
  if(frameBall === 1) { //The second ball in the frame
    var ball1 = scoreLine.slice(-1);
    var frameScore = parseInt(ball1) + parseInt(pinsDown);
    if(frameScore > 10) {
      throw new Error('More pins knocked down then available, please recount');
    } else if(frameScore === 10) {
      return scoreLine + '/';
    }
  }
  if(pinsDown === 'x' || pinsDown === 'X' || pinsDown === '10') {
    return scoreLine + 'x ';
  } else {
    return scoreLine + pinsDown;
  }
};

exports.score = function(scoreLine) {
  var nextBall = 0;
  var nextNextBall = 0;
  var score = 0;
  for(var i = (scoreLine.length - 1); i >= 0; i--) {
    var ball = scoreLine.charAt(i);
    var ballTotalPoints;
    var ballPointValue;
    if(ball === ' ') {
      continue;
    } else if(_.includes(['x', 'X'], ball)) {
      ballTotalPoints = 10 + nextBall + nextNextBall;
      ballPointValue = 10;
    } else if(ball === '/') {
      ballPointValue = 10 - parseInt(scoreLine.charAt(i - 1));
      ballTotalPoints = ballPointValue + nextBall;
    } else {
      ballTotalPoints = parseInt(ball);
      ballPointValue = ballTotalPoints;
    }

    if(i < 20) { //Extra frames add in, but do not count directly toward score
      score += ballTotalPoints;
    }
    nextNextBall = nextBall;
    nextBall = ballPointValue;
  }
  return score;
};

exports.isEndOfGame = function(scoreLine) {
  if(scoreLine.length < 20 ||
    (scoreLine.length === 20 && (scoreLine.slice(-1) === '/' || scoreLine.slice(-1) === ' ')) ||
    (scoreLine.length === 21 && (scoreLine.slice(-3, -1) === 'x ')) ||
    (scoreLine.length === 22 && (scoreLine.slice(-4) === 'x x '))) {
    return false;
  }
  return true;
};