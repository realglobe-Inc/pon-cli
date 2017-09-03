/**
 * CLI for pon
 * @module pon-cli
 */

'use strict'

const cli = require('./cli')

const lib = cli.bind(this)

Object.assign(lib, cli, {
  cli
})

module.exports = lib
