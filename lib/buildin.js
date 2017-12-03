/**
 * Define buildin tasks
 * @function buildin
 * @returns {Object}
 */
'use strict'

const init = require('pon-task-init')
const ponRunner = require('pon-runner')

/** @lends buildin */
function buildin (options = {}) {
  const {cwd = process.cwd()} = options
  return ponRunner({
    'init': init({cwd})
  })
}

module.exports = buildin