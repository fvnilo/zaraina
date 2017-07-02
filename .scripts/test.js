'use strict';

const spawn = require('cross-spawn');
const chalk = require('chalk');

const args = [
  'node_modules/tape/bin/tape',
  'src/**/*.test.ts'
].filter(Boolean)

const process = spawn('ts-node tape', args, { stdio: 'inherit' })

process.on('error', () => {
  console.error(chalk.red('Executing the tests failed. Do you have `ts-node` installed globally?'));
})
