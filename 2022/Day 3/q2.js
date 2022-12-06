const { getRawInput, log, sumArray } = require('../../utils')
const { get, split, map, replace, reduce, concat, sort } = require('@rybr/lenses')
const { getPriority } = require('./q1')

module.exports = {
  run: () => {
    get(
      getRawInput(`./2022/Day 3/input.txt`),
      concat('\n'),
      split('\n'),
      reduce(
        (acc, curr, i) => {
          if (i !== 0 && i % 3 === 0) {
            acc.groups.push(acc.group)
            acc.group = [new Set(curr)]
          } else {
            acc.group.push(new Set(curr))
          }

          return acc
        },
        {
          group: [],
          groups: [],
        }
      ),
      'groups',
      map(group =>
        get(
          group,
          sort((a, b) => a.size - b.size),
          ([a, b, c]) => [...a].find(char => b.has(char) && c.has(char))
        )
      ),
      map(getPriority),
      sumArray,
      log
    )
  },
}
