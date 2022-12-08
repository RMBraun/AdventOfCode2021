const { getRawInput, log, sumArray } = require('../../utils')
const { get, split, filter } = require('@rybr/lenses')

const TYPES = {
  DIR: 'DIR',
  FILE: 'FILE',
}

const formatInput = rawInput =>
  get(
    rawInput,
    split('\n'),
    filter(cmd => !cmd.startsWith('$ ls') && !cmd.startsWith('dir'))
  )

const genDirStruct = commands => {
  const dir = {}
  const pathHistory = [dir]

  commands.forEach(cmd => {
    const parts = cmd.split(' ')
    const currentDir = pathHistory[pathHistory.length - 1]

    if (parts[0] === '$' && parts[1] === 'cd') {
      //back
      if (parts[2] === '..') {
        pathHistory.pop()
      }
      //forward
      else {
        currentDir[parts[2]] = currentDir[parts[2]] || { _type: TYPES.DIR }
        pathHistory.push(currentDir[parts[2]])
      }
    } else {
      currentDir[parts[1]] = {
        _type: TYPES.FILE,
        _size: parseInt(parts[0]),
      }
    }
  })

  return dir
}

const setDirSizes = (dir, sizes = []) => {
  dir._size = 0

  Object.entries(dir).forEach(([key, val]) => {
    if (typeof val === 'string') {
      return
    }

    if (val._size) {
      dir._size += val._size
    }

    if (val._type === TYPES.DIR) {
      const nested = setDirSizes(val, sizes)
      dir._size += nested.dir._size
    }
  })

  sizes.push(dir._size)

  return { dir, sizes }
}

module.exports = {
  TYPES,
  formatInput,
  genDirStruct,
  setDirSizes,
  run: () => {
    get(
      getRawInput(`./2022/Day 7/testinput.txt`),
      formatInput,
      genDirStruct,
      // log,
      setDirSizes,
      // log,
      'sizes',
      filter(size => size <= 100000),
      // log,
      sumArray,
      log
    )
  },
}
