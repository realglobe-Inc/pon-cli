'use strict'

const ponRunner = require('pon-runner')
const fs = require('fs')

module.exports = ponRunner({
  writeFoo () {
    fs.writeFileSync(`${__dirname}/foo.txt`, 'This is foo')
  }
}).bind()

