const { getRawInput, log, sumArray } = require('../../utils')
const { get, sort } = require('@rybr/lenses')
const { formatInput, genDirStruct, setDirSizes } = require('./q1')

module.exports = {
  run: () => {
    get(
      getRawInput(`./2022/Day 7/input.txt`),
      formatInput,
      genDirStruct,
      // log,
      setDirSizes,
      // log,
      'sizes',
      sort((a, b) => b - a),
      // log,
      sizes => sizes.filter(size => size >= 30000000 - (70000000 - sizes[0])),
      sizes => sizes[sizes.length - 1],
      // log,
      log
    )
  },
}
