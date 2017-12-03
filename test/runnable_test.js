/**
 * Test case for runnable.
 * Runs with mocha.
 */
'use strict'

const runnable = require('../lib/runnable.js')
const assert = require('assert')

describe('runnable', function () {
  this.timeout(3000)

  before(async () => {

  })

  after(async () => {

  })

  it('Runnable', async () => {
    try {
      runnable({
        init: () => console.log('init!')
      }, {
        reservedTaskNames: 'init'
      })
    } catch (e) {
      console.error(e)
    }
  })
})

/* global describe, before, after, it */
