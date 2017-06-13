/**
 * Define CLI Runner
 * @function runnable
 * @param {string} cwd - Working directory
 * @returns {CLIRunner} Runner instance
 */
'use strict'
const { Ponfile } = require('ponfile')

/**
 * Runner implementation for CLI
 */
class CLIRunner extends Ponfile {
  run (...patterns) {
    return Promise.resolve(
      super.run(...arguments)
    ).then((result) => {
      let isEmpty = Object.keys(result).length === 0
      if (isEmpty) {
        let specified = patterns.length > 1 ? patterns : patterns[ 0 ]
        console.warn(`No task found for: ${JSON.stringify(specified)}`)
      }
      return result
    })
  }
}

module.exports = (cwd) => new CLIRunner(cwd)
