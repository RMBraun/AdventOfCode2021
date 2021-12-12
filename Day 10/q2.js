const { getInputs, log, sumArray } = require('../utils')
const { get, reduce, map, filter, split, sort } = require('@rybr/lenses')

const { getChunks, getInvalidClose, OPEN_CLOSE_MAP } = require('./q1')

const CLOSE_TO_POINTS_MAP = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const getClosingBrackets = chunk => {
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
        openers = []
        break
      }
    }
  }

  return openers
    .reverse()
    .map(opener => OPEN_CLOSE_MAP[opener])
    .join('')
}

const calculateScore = closingBrackets =>
  get(
    closingBrackets,
    split(''),
    reduce((acc, bracket) => acc * 5 + CLOSE_TO_POINTS_MAP[bracket], 0)
  )

module.exports = {
  run: () => {
    get(
      getChunks(),
      //   log,
      map(chunk => getClosingBrackets(chunk)),
      filter(closingBrackets => closingBrackets != ''),
      //   log,
      map(closingBrackets => calculateScore(closingBrackets)),
      //   log,
      sort((a, b) => a - b),
      //   log,
      scores => scores[Math.floor(scores.length / 2)],
      log
    )
  },
}
