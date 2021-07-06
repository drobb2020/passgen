#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const log = console.log;
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program.version("1.0.1").description("Simple Node.js Password Generator");

program
  .option("-l, --length <number>", "length of password", "12")
  .option("-s, --save", "Save password to passwords.txt")
  .option("-nn, --no-numbers", "remove numbers from generated password")
  .option("-ns, --no-symbols", "remove symbols from generated password")
  .parse();

const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Save generated password to file
if (save) {
  savePassword(generatedPassword)
}

// Copy to clipboard
clipboardy.write(generatedPassword)

// Output generated password
log(chalk.blue('Generated Password: ') + chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'))
