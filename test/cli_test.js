/**
 * Test case for cli.
 * Runs with mocha.
 */
'use strict'

const cli = require('../lib/cli.js')
const assert = require('assert')
const co = require('co')

describe('cli', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Cli', () => co(function * () {
    yield cli('writeFoo', {
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })
  }))

  it('List tasks', () => co(function * () {
    yield cli({
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })
  }))

  it('List tasks with list option', () => co(function * () {
    yield cli({
      cwd: `${__dirname}/../misc/mock/mock-project-01`,
      list: "w"
    })
  }))
})

/* global describe, before, after, it */
