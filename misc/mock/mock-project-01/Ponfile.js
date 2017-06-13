'use strict'

const ponRunner = require('pon-runner')
const fs = require('fs')

module.exports = ponRunner({
  writeFoo () {
    fs.writeFileSync(`${__dirname}/foo.txt`, 'This is foo')
  },
  a () {
    console.log('This is A')
  },
  b () {
    console.log('This is B')
  },

  invalid01: [ '__invalid_pointer_01__', () => {} ],
  invalid02: [ '__invalid_pointer_02__' ]
}).bind()

