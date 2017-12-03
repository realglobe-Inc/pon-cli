/**
 * Define CLI Runner
 * @function runnable
 * @param {string} cwd - Working directory
 * @returns {CLIRunner} Runner instance
 */
'use strict'
const {Ponfile} = require('ponfile')

/**
 * Runner implementation for CLI
 */
class CLIRunner extends Ponfile {
  constructor (cwd, options = {}) {
    super(cwd, options)
    const s = this
    s.reservedTaskNames = [].concat(options.reservedTaskNames || [])
    console.log('s.reservedTaskNames', s.reservedTaskNames,)
  }

  run (...patterns) {
    return Promise.resolve(
      super.run(...arguments)
    ).then((result) => {
      const isEmpty = Object.keys(result).length === 0
      if (isEmpty) {
        const specified = patterns.length > 1 ? patterns : patterns[0]
        console.warn(`No task found for: ${JSON.stringify(specified)}`)
      }
      return result
    })
  }

  registerTasks (tasks) {
    const s = this
    console.log('!!!s.reservedTaskNames', s.reservedTaskNames)
    const conflict = Object.keys(tasks).find((taskName) => s.reservedTaskNames.includes(taskName))
    if (conflict) {
      throw new Error(`You can not define task with name: ${conflict} because it is reserved`)
    }
    return super.registerTasks(tasks)
  }
}

module.exports = (cwd) => new CLIRunner(cwd)
