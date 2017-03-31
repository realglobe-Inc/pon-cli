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
    cwd = process.cwd()
  } = options
  return co(function * () {
    let pon = ponfile(cwd)
    if (name) {
      return pon.run(name)
    }
    let hasDefault = !!pon.tasks.default
    if (hasDefault) {
      return pon.run('default')
    } else {
      return cli.list(pon.tasks)
    }
  })
}

Object.assign(cli, {
  list (tasks) {
    console.log('Available tasks:')
    console.log('')
    for (let taskName of Object.keys(tasks)) {
      let task = tasks[ taskName ]
      let description = task.description
      console.log('    ' + (description ? [ taskName, description ].join(' - ') : taskName))
    }
    console.log('')
  }
})

module.exports = cli
