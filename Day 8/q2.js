const { getInputs, log, sumArray, unique, getPermutations } = require('../utils')
const { getSegmentsAndOutputs } = require('./q1')
const { get, sort, split, reduce, forEach, toInt, join, values, map, filter } = require('@rybr/lenses')

//1 => 2 chars
//7 => 3 chars
//4 => 4 chars
//2 => 5 chars
//3 => 5 chars
//5 => 5 chars
//6 => 6 chars
//9 => 6 chars
//0 => 6 chars
//8 => 7 chars

SEGMENT_IDS = ['012456', '25', '02346', '02356', '1235', '01356', '013456', '025', '0123456', '012356']

const SEGMENT_IDS_MAP = SEGMENT_IDS.reduce((acc, id, i) => {
  acc[id] = `${i}`
  return acc
}, {})

const getBlackSheep = (arr1, arr2) => {
  const unique = {}

  arr1.forEach(key => {
    unique[key] = unique[key] || 0
    unique[key] = unique[key] + 1
  })
  arr2.forEach(key => {
    unique[key] = unique[key] || 0
    unique[key] = unique[key] + 1
  })

  return Object.entries(unique)
    .filter(([key, count]) => count === 1)
    .map(([key, val]) => key)
}

const isValidHash = (segments, letterToNum) => {
  return segments
    .map(combo =>
      combo
        .map(letter => letterToNum[letter])
        .sort()
        .join('')
    )
    .every(id => SEGMENT_IDS.includes(id))
}

module.exports = {
  run: () => {
    get(
      getSegmentsAndOutputs(false),
      map(({ segments, outputs }) =>
        get(
          segments,
          sort((a, b) => a.length - b.length),
          segments => {
            //1-7 -> 0
            const hashStart = getBlackSheep(segments[0], segments[1])[0]

            const reducedCombinations = 'abcdefg'.replace(hashStart, '').split('')

            const allPossibleHash = getPermutations(reducedCombinations).map(row =>
              [hashStart, ...row].reduce((acc, letter, i) => {
                acc[letter] = `${i}`
                return acc
              }, {})
            )

            return allPossibleHash.find(hash => isValidHash(segments, hash))
          },
          //log,
          hash => {
            return outputs
              .map(combo =>
                combo
                  .map(letter => hash[letter])
                  .sort()
                  .join('')
              )
              .map(segmentId => SEGMENT_IDS_MAP[segmentId])
              .join('')
          }
        )
      ),
      map(numberStr => parseInt(numberStr)),
      //log,
      sumArray,
      log
    )
  },
}
