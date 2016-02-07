var should = require('chai').should();
var Parser = require('../src/Parser');
var _ = require('lodash');


describe('Engine', function () {
  it('should throw an exception on invalid input', function() {
    _.forEach(['-1', '11', 'j', '-'], function (input) {
      should.Throw(function () {Parser.parseBallInput(input);}, Error, 'Invalid input:');
    });
  });
});