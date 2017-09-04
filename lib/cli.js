/**
 * Pon cli handler
 * @function cli
 */
'use strict'

const argx = require('argx')
const runnable = require('./runnable')

/** @lends cli */
async function cli (name, options) {
  const args = argx(arguments)
  options = args.pop('object') || {}
  const names = args.remain()
  const {
    cwd = process.cwd(),
    list = false,
    prefixless = false
  } = options
  const runner = runnable(cwd, {
    prefixer: prefixless ? () => null : ({taskName}) => taskName
  })
  if (list) {
    const pattern = typeof list === 'string' ? list : null
    return cli.list(runner.tasks, {pattern})
  }
  if (names && names.length > 0) {
    const results = []
    for (const name of names) {
      const result = await Promise.resolve(runner.run(name))
      results.push(result)
    }
    return results
  }
  const hasDefault = !!runner.tasks.default
  if (hasDefault) {
    return runner.run('default')
  } else {
    return cli.list(runner.tasks)
  }
}

Object.assign(cli, {
  list (tasks, options = {}) {
    const {pattern} = options
    console.log('')
    for (const taskName of Object.keys(tasks)) {
      if (pattern) {
        const skip = String(pattern).trim().split(',').some((pattern) => !taskName.match(pattern))
        if (skip) {
          continue
        }
      }
      const task = tasks[taskName]
      const {description} = task
      console.log('    ' + (description ? [taskName, description].join(' - ') : taskName))
    }
    console.log('')
  }
})

module.exports = cli
