var should = require('chai').should();
var Parser = require('../src/Parser');
var _ = require('lodash');


describe('Parser', function () {
  describe('Ball Input', function () {
    it('should throw an exception on invalid input', function() {
      _.forEach(['-1', '11', 'j', '-'], function (input) {
        should.Throw(function () {Parser.parseBallInput(input);}, Error, 'Invalid input:');
      });
    });
  });

  describe('Parsing Whole Number', function () {
    it('parses a whole positive number greater then 0', function () {
      _.forEach([['1', 1], ['2', 2], ['131', 131]], function (input) {
        Parser.parseWholePositiveNumber(input[0]).should.eql(input[1]);
      });
    });

    it('throws an error when parsing numbers that are not whole and greater then 0', function () {
      _.forEach(['-1', '0', '1.5'], function (input) {
        should.Throw(function () {Parser.parseWholePositiveNumber(input);}, Error);
      });
    });
  });
});