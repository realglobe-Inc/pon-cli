'use strict'

const pon = require('pon')
const fs = require('fs')

module.exports = pon({
  writeFoo () {
    fs.writeFileSync(`${__dirname}/foo.txt`, 'This is foo')
  }
})

