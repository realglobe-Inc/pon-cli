/**
 * Pon cli handler
 * @function cli
 */
'use strict'

const co = require('co')
const argx = require('argx')
const ponfile = require('ponfile')

/** @lends cli */
function cli (name, options) {
  let args = argx(arguments)
  options = args.pop('object') || {}
  name = args.shift('string')
  let {
    cwd = process.cwd(),
    list = false
  } = options
  return co(function * () {
    let runner = ponfile(cwd)
    if (list) {
      let pattern = typeof list === 'string' ? list : null
      return cli.list(runner.tasks, { pattern })
    }
    if (name) {
      return Promise.resolve(runner.run(name)).then((results) => {
        let isEmpty = Object.keys(results).length === 0
        if (isEmpty) {
          console.warn(`No task found for name: "${name}"`)
        }
        return results
      })
    }
    let hasDefault = !!runner.tasks.default
    if (hasDefault) {
      return runner.run('default')
    } else {
      return cli.list(runner.tasks)
    }
  })
}

Object.assign(cli, {
  list (tasks, options = {}) {
    let { pattern } = options
    console.log('')
    for (let taskName of Object.keys(tasks)) {
      if (pattern) {
        let skip = String(pattern).trim().split(',').some((pattern) => !taskName.match(pattern))
        if (skip) {
          continue
        }
      }
      let task = tasks[ taskName ]
      let description = task.description
      console.log('    ' + (description ? [ taskName, description ].join(' - ') : taskName))
    }
    console.log('')
  }
})

module.exports = cli
