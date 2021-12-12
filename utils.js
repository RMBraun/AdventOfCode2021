const { get, reduce, values } = require('@rybr/lenses')
const fs = require('fs')

const getRawInput = path => fs.readFileSync(path, 'utf8')

const getInputs = path => getRawInput(path).split('\n')

const sumArray = array => array.reduce((acc, curr) => acc + curr, 0)

const log = x => console.log(x) || x

const unique = array =>
  get(
    array,
    reduce((acc, curr) => {
      acc[curr] = curr
      return acc
    }, {}),
    values()
  )

const getPermutations = permutation => {
  var length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i]
      p = permutation[i]
      permutation[i] = permutation[k]
      permutation[k] = p
      ++c[i]
      i = 1
      result.push(permutation.slice())
    } else {
      c[i] = 0
      ++i
    }
  }
  return result
}

module.exports = {
  getInputs,
  getRawInput,
  sumArray,
  log,
  unique,
  getPermutations,
}
