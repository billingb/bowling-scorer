var exports = module.exports = {};
var _ = require('lodash');

const VALID_INPUT = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '/', 'x', 'X'];

exports.parseBallInput = function(line) {
  var input = line.trim();
  if (!_.includes(VALID_INPUT, input)) {
    throw new Error("Invalid input: " + input);
  }
  return input;
};