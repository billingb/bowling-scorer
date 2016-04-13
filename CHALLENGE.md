# Challenge specifics

## Overview
Create a 10-pin bowling scorer in the language of your choice. A good summary of the game of
bowling is available at (https://en.wikipedia.org/wiki/Ten-pin_bowling#Scoring). This exercise is intended to take 2-8
hours.

## Basic functionality
First create an application to calculate the score of a single player game. The input is integers entered interactively
on the command line (or another UI) representing the pins knocked down by each roll. Once the game is
complete stop accepting input and display the score. Make sure to prevent invalid input.

### Test cases
The following should inputs should score correctly:
* entering "0" 20 times results in a score of 0
* entering "10" 12 times results in a score of 300
* entering "7" followed by "7" should not be allowed (there are only 10 pins)

## Multiplayer functionality
Extend the implementation to allow for multiple players. Players take turns frame by frame, assign rolls correctly.

## Goals for exercies
1. Determine you can write code that can be executed on employers machine
1. Provide a small code sample we can jointly review
