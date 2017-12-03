/**
 * Test case for runnable.
 * Runs with mocha.
 */
'use strict'

const runnable = require('../lib/runnable.js')
const {ok} = require('assert')

describe('runnable', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Runnable', async () => {
    let caught
    try {
      runnable({
        init: () => console.log('init!')
      }, {
        reservedTaskNames: ['init']
      })
    } catch (e) {
      caught = e
    }
    ok(caught)
  })
})

/* global describe, before, after, it */
