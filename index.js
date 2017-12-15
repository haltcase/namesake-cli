#!/usr/bin/env node

'use strict'

const chalk = require('chalk')
const chunk = require('even-chunks')
const meow = require('meow')
const namesake = require('namesake')
const ora = require('ora')
const table = require('text-table')

const { log, error } = console

const help = chalk`
  {bold Usage}: {yellow namesake} [word] [options]

    Generate a list of words that just so happen to also
    be available as npm package names.

    Optionally, you can use any word as input to find
    related words and terms.

  {bold Options}:

    -l, --limit   <n>  Limit the number of results returned (defaults to 50)
    -h, --help         Show this help message
    -v, --version      Output the {yellow namesake} version number
  \n
`

const { input, flags } =
  meow({ description: false, help }, {
    alias: {
      l: 'limit',
      h: 'help',
      v: 'version'
    }
  })

flags.limit = Number(flags.limit) || 50

const word = input[0]
const text = word
  ? `finding available package names related to '${word}'...`
  : `finding available package names...`

const spinner = ora({
  text,
  spinner: {
    interval: 100,
    frames: ['◜', '◠', '◝', '◞', '◡', '◟']
  }
}).start()

namesake(word, flags)
  .then(names => {
    spinner.stop()

    const chunked = chunk(
      names,
      Math.floor(names.length / 3),
      chunk.PRIORITIZE_FIRST
    )

    const header = !!word
      ? `Available package names related to '${word}':\n`
      : `Some available package names:\n`

    log('')
    log(header)
    log(table(chunked))
  })
  .catch(err => {
    const { stack, message } = err
    spinner.fail(`Oops! -> ${message}`)
    error(stack.slice(stack.indexOf('\n')))
    process.exit(1)
  })
