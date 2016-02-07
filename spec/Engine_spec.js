require('chai').should();
var Engine = require('../src/Engine.js');
var Immutable = require('immutable');


describe('Engine', function () {
  it('should set the first roll in the score line', function () {
    var state = Immutable.Map({score: '', completed: false});
    Engine.process('5', state).get('score').should.eql('5');
  });
});