var should = require('chai').should();
var Engine = require('../src/Engine.js');
var Immutable = require('immutable');
var _ = require('lodash');


describe('Engine', function () {
  it('should set the first roll in the score line', function () {
    var state = Immutable.Map({});
    Engine.process('5', state).get('score').should.eql('5');
  });

  it('should throw an exception on invalid input', function() {
    var state = Immutable.Map({});
    _.forEach(['-1', '11', 'j', '-'], function (input) {
      should.Throw(function () {Engine.process(input, state);}, Error, 'Invalid input:');
    });
  });
});