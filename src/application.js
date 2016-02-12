#!/usr/bin/env node
var readline = require('readline');
var BowlingScorer = require('./Engine');
var _ = require('lodash');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

var state = BowlingScorer.newGameState();
rl.on('line', function(line){
    state = BowlingScorer.process(line, state);
    if(BowlingScorer.isCompletedState(state)) {
      console.log('Game Complete!');
      console.log('Final Scores:');
      _.forEach(state.get('finalScores').toJS(), (score) => {console.log(score);});
      process.exit();
    }
});