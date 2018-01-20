/**
 * Pon cli handler
 * @function cli
 */
'use strict'

const argx = require('argx')
const defineBuildin = require('./buildin')
const runnable = require('./runnable')

/** @lends cli */
async function cli (name, options) {
  const args = argx(arguments)
  options = args.pop('object') || {}
  const names = args.remain()
  const {
    cwd = process.cwd(),
    list = false,
    prefixless = false,
  } = options

  const [firstTask] = names
  const buildinRunner = defineBuildin({cwd})
  if (buildinRunner.hasTask(firstTask)) {
    return buildinRunner.run(firstTask)
  }

  const runner = runnable(cwd, {
    prefixer: prefixless ? () => null : ({taskName}) => `[${taskName}] `,
    reservedTaskNames: Object.keys(buildinRunner.tasks)
  })
  if (list) {
    const pattern = typeof list === 'string' ? list : null
    const {doc = {},} = runner
    return cli.list(runner.tasks, {pattern, doc})
  }
  if (names && names.length > 0) {
    const results = []
    for (const name of names) {
      const result = await Promise.resolve(runner.run(name))
      results.push(result)
    }
    return results
  }

  {
    const {PON_TASK_NAMES} = process.env
    if (PON_TASK_NAMES) {
      const names = PON_TASK_NAMES.split(',')
      const results = []
      for (const name of names) {
        const result = await Promise.resolve(runner.run(name))
        results.push(result)
      }
      return results
    }
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
    const {pattern, doc,} = options
    const taskDocs = doc && doc.tasks || {}
    console.log('')
    const taskNames = Object.keys(tasks)
    for (const taskName of taskNames.sort()) {
      if (pattern) {
        const skip = String(pattern).trim().split(',').some((pattern) => !taskName.match(pattern))
        if (skip) {
          continue
        }
      }
      const task = tasks[taskName]
      const {description = taskDocs[taskName]} = task
      console.log([
        taskName.padEnd(24),
        description || `Call \`${taskName.split(/\//g).reduce((taskName, component) =>
          taskName + (/^\d+$/.test(component) ? `[${component}]` : `.${component}`)
        )}()\``,
      ].join(' # ').trim())
    }
  }
})

module.exports = cli
