#!/usr/bin/env node
var readline = require('readline');
var BowlingScorer = require('./Engine');
var Immutable = require('immutable');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


var state = Immutable.Map({});

rl.on('line', function(line){
    state = BowlingScorer.process(line, state);
    console.log(state);
});