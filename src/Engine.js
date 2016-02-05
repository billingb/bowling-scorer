var exports = module.exports = {};
var _ = require('lodash');

const VALID_INPUT = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '/', 'x', 'X'];

function parse(line) {
  var input = line.trim();
  if (!_.includes(VALID_INPUT, input)) {
    throw new Error("Invalid input: " + input);
  }
  return input;
}

exports.process = function(line, state) {
  var parsedInput = parse(line);
  var newState = state.set('score', parsedInput);
  return newState;
};
