# bowling-scorer
- [Intro](#intro)
- [Quick Start](#quick-start)
- [Full Development Instructions](#full-development-instructions)
- [Development Thoughts](#development-thoughts)

# Intro
A javascript utility to score a bowling game interactively. Created for a challenge provided as part of the interview
process for a software engineering position.

# Quick Start
*for full instructions see the "Full Installation Instructions" at the bottom of this page*
## Prerequisites
* node.js **version 4 or newer** (this project uses ES6)

## Running the utility
* `npm install` to fetch the dependencies
* `npm start`

## Working on the project

### Workspace Setup
* Run `npm install` to fetch the dependencies

### Linting
* Run `npm run lint`

### Unit Testing
* Run `npm test` or `npm test:watch`

# Full Development Instructions

## Install node.js
This program requires the node.js JavaScript runtime and node package manager (npm). A good beginners guide for
these technologies is available at <https://nodejs.org/en/about/>. There are a few options for installing the
runtime:
* (Mac OS X and Linux): Install node using nvm (node version manager): <https://github.com/creationix/nvm>. This option
 is nice because it allows you to switch versions. If using nvm install a 4.x version, preferably 4.3.1 which this
 code has been tested against.
* (Mac OS X): Install node by downloading the pre-built binary available at <https://nodejs.org/en/>. A nice
tutorial is available at <http://coolestguidesontheplanet.com/installing-node-js-on-osx-10-10-yosemite/>
* (Linux): Many linux distros have packages available through a package manager. Details on installing using a package
manager can be found at <https://nodejs.org/en/download/package-manager/>
* (Linux): Node.js provides pre-built tarball on the webpage <https://nodejs.org/en/>, this is a good guide to this
and some other options for installing on linux (ubuntu focused): <http://www.hostingadvice.com/how-to/install-nodejs-ubuntu-14-04/#standard-binary-packages>

After installing make sure node and npm are on the path by running `node -v` and `npm -v`. If either of these commands
fails then something went wrong in the installation. Recheck that the node and npm executables are in place and you have
added them to your path.

## Installing application dependencies
After NPM is installed execute `npm install` to install all the dependencies for this application.

## Running the program
To run the program execute `npm run exec`

## Testing
This application was written using test driven development (TDD) with the Mocha test framework (<https://mochajs.org/>)
and the Chai Assertion Library (<http://chaijs.com/>). The tests are all written using the should syntax provided by
Chai. There are unit and acceptance tests, with the acceptance tests in a file Acceptance_spec.js and all other spec
file containing unit tests. To run the tests execute `npm test`. To run the tests in watch mode, so they will re-run
whenever a file is changed, execute `npm run test:watch`

## Linting
When developing on this application the linter, jshint (<http://jshint.com/docs/>) should be run to help keep the
code clean. JSHint can be run by executing `npm run lint`

# Development Thoughts
## ES6 (ES2015)
This is the second application I have had the opportunity to use the new ES6 standard for. I wanted to take this
opportunity to learn more about the new language features that have been introduced and start getting comfortable
with those features. I still have some inconsistency in using the new features and figuring out how they best fit,
for instnace I use the arrow functions in the code (=> syntax) but in the tests I wrote the older syntax in
the it and describe lines.

## Functional Style, Immutable.js
I wanted to use a functional style in this program as I have been learning Clojure lately and really like the
function paradigm. I decided to use Immutable.js (<https://facebook.github.io/immutable-js/>) to get Clojure style
data structures that are much safer to write functional code with since they prevent accidental side effects.