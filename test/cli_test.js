/**
 * Test case for cli.
 * Runs with mocha.
 */
'use strict'

const cli = require('../lib/cli.js')
const assert = require('assert')

describe('cli', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Cli', async () => {
    await cli('writeFoo', {
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })
  })

  it('List tasks', async () => {
    await cli({
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })

    await cli('hogehoge', {
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })

    await cli('writeFoo', {
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })
  })

  it('List tasks with list option', async () => {
    await cli({
      cwd: `${__dirname}/../misc/mock/mock-project-01`,
      list: 'w'
    })
    await cli({
      cwd: `${__dirname}/../misc/mock/mock-project-01`,
      list: true
    })
  })

  it('List tasks with prefix-less', async () => {
    await cli({
      cwd: `${__dirname}/../misc/mock/mock-project-01`,
      prefixless: true,
      list: true,
    })
  })

  // https://github.com/realglobe-Inc/pon/issues/13
  it('Warning with not existing task', async () => {
    await cli('invalid01', {
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })
    await cli('invalid02', {
      cwd: `${__dirname}/../misc/mock/mock-project-01`
    })
  })

  it('Run init task', async () => {
    await cli('init', {
      cwd: `${__dirname}/../tmp/testing-init`
    })
  })

})

/* global describe, before, after, it */
