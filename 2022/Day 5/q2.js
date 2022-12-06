const { getRawInput, log } = require('../../utils')
const { get, split, map, reduce, matchAll, values, join } = require('@rybr/lenses')

module.exports = {
  run: () => {
    get(
      getRawInput(`./2022/Day 5/input.txt`),
      split(' 1   2   3   4   5   6   7   8   9 \n\n'),
      ([crateRows, moves]) => ({
        moves: [...moves.matchAll(/move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/gm)].map(match => ({
          count: parseInt(match.groups.count),
          from: match.groups.from,
          to: match.groups.to,
        })),
        columns: [...crateRows.matchAll(/(?<id>\[\w\]|\s{4})/gm)].reduce((acc, { groups: { id } }, i) => {
          const value = id.trim().replace('[', '').replace(']', '')

          if (value) {
            const index = (i % 9) + 1
            acc[index] = acc[index] || []
            acc[index].unshift(value)
          }

          return acc
        }, {}),
      }),
      ({ moves, columns }) => {
        moves.forEach(({ count, from, to }) => {
          columns[to].push(...columns[from].splice(-count, count))
        })

        return columns
      },
      values(),
      map(column => column.pop()),
      join(''),
      log
    )
  },
}
