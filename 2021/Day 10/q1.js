const { getInputs, log, sumArray } = require('../utils')
const { get, reduce, map } = require('@rybr/lenses')

const OPEN_CLOSE_MAP = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const CLOSE_TO_POINTS_MAP = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const getChunks = useTest => getInputs(`./Day 10/${useTest ? 'test' : ''}input.txt`).map(row => row.trim())

const getInvalidClose = chunk => {
  let openers = []
  let currentChar
  let lastOpener
  let invalidClose = ''

  for (let i = 0; i < chunk.length; i++) {
    currentChar = chunk.charAt(i)

    if (OPEN_CLOSE_MAP[currentChar] != null) {
      openers.push(currentChar)
    } else {
      lastOpener = openers.pop()

      if (OPEN_CLOSE_MAP[lastOpener] !== currentChar) {
        invalidClose = currentChar
        break
      }
    }
  }

  return invalidClose
}

module.exports = {
  run: () => {
    get(
      getChunks(false),
      //log,
      reduce((acc, chunk) => {
        const invalidClose = getInvalidClose(chunk)

        if (invalidClose) {
          acc.push(invalidClose)
        }

        return acc
      }, []),
      //log,
      map(closeChar => CLOSE_TO_POINTS_MAP[closeChar]),
      //log,
      sumArray,
      log
    )
  },
  OPEN_CLOSE_MAP,
  getChunks,
}
