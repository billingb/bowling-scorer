var exports = module.exports = {};

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
