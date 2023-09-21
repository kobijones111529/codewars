/**
 * https://www.codewars.com/kata/59eb1e4a0863c7ff7e000008/javascript
 * WIP
 */

/**
 * @param {string} valuesStr
 * @param {string} opsStr
 * @returns {number}
 */
function solve(valuesStr, opsStr) {
  const values = valuesStr.split('').map((char) => {
    switch (char) {
      case 't': return true
      case 'f': return false
      default: throw new Error('Invalid value')
    }
  })
  const ops = opsStr.split('').map((char) => {
    switch (char) {
      case '&': return and
      case '|': return or
      case '^': return xor
      default: throw new Error('Invalid operator')
    }
  })

  const trues = generateCombinations(ops.length).reduce(
    (trues, combination) => {
      return trues + (reduce(values, ops, combination) ? 1 : 0)
    },
    0
  )

  return trues
}

/**
 * @param {boolean[]} values
 * @param {((a: boolean, b: boolean) => boolean)[]} ops
 * @param {number[]} combination
 * @returns {boolean}
 */
function reduce(values, ops, combination) {
  const valuesCpy = [...values]
  const opsCopy = [...ops]
  for (const opId of combination) {
    const op = opsCopy[opId]
    const [a, b] = valuesCpy.splice(opId, 2)
    valuesCpy.splice(opId, 0, op(a, b))
    opsCopy.splice(opId, 1)
  }

  return valuesCpy[0]
}

/**
 * @param {number} length
 * @returns {number[][]}
 */
function generateCombinations(length) {
  let combinations = [[0]]
  for (let n = 1; n < length; n++) {
    combinations = combinations.reduce(
      /**
       * @param {number[][]} combinations
       * @param {number[]} combination
       * @returns {number[][]}
       */
      (combinations, combination) => {
        for (let i = combination[0]; i < n + 1; i++) {
          combinations.push([i, ...combination])
        }
        return combinations
      },
      []
    )
  }
  return combinations
}

/**
 * @param {boolean} a
 * @param {boolean} b
 */
function and(a, b) {
  return a && b
}

/**
 * @param {boolean} a
 * @param {boolean} b
 */
function or(a, b) {
  return a || b
}

/**
 * @param {boolean} a
 * @param {boolean} b
 */
function xor(a, b) {
  return a !== b
}

console.log(solve('ttftff', '|&^&&'))

// 110100


// 0 &  0 &  0  &  0   &  0    // 1111
// 0 & (0 &  0) &  0   &  0    // 2111
// 0 & (0 &  0  &  0)  &  0    // 2211
// 0 &  0 & (0  &  0)  &  0    // 3111
// 0 & (0 & (0  &  0)) &  0    // 3211
// 0 & (0 &  0  &  0   &  0)   // 2221
// 0 & (0 & (0  &  0)  &  0)   // 3221
// 0 &  0 & (0  &  0   &  0)   // 3311
// 0 & (0 & (0  &  0   &  0))  // 3321
// 0 &  0 &  0  & (0   &  0)   // 4111
// 0 & (0 &  0) & (0   &  0)   // 4211
// 0 & (0 &  0  & (0   &  0))  // 4221
// 0 &  0 & (0  & (0   &  0))  // 4311
// 0 & (0 & (0  & (0   &  0))) // 4321


// 1 |  1 &  0  ^  1   &  0    & 0     // 00000 4 0
// 1 | (1 &  0) ^  1   &  0    & 0     // 10000 4 0
// 1 | (1 &  0  ^  1)  &  0    & 0     // 11000 4 0
// 1 | (1 &  0  ^  1   &  0)   & 0     // 11100 4 0
// 1 | (1 &  0  ^  1   &  0    & 0)    // 11110 0 1
// 1 |  1 & (0  ^  1)  &  0    & 0     // 20000 4 0
// 1 | (1 & (0  ^  1)) &  0    & 0     // 21000 4 0
// 1 | (1 & (0  ^  1)  &  0)   & 0     // 21100 4 0
// 1 | (1 & (0  ^  1)  &  0    & 0)    // 21110 0 1
// 1 |  1 & (0  ^  1   &  0)   & 0     // 22000 4 0
// 1 | (1 & (0  ^  1   &  0))  & 0     // 22100 4 0
// 1 | (1 & (0  ^  1   &  0)   & 0)    // 22110 0 1
// 1 |  1 & (0  ^  1   &  0    & 0)    // 22200 1 0
// 1 | (1 & (0  ^  1   &  0    & 0))   // 22210 0 1
// 1 |  1 &  0  ^ (1   &  0)   & 0     // 30000 4 0
// 1 | (1 &  0) ^ (1   &  0)   & 0     // 31000 4 0
// 1 | (1 &  0  ^ (1   &  0))  & 0     // 31100 4 0
// 1 | (1 &  0  ^ (1   &  0)   & 0)    // 31110 0 1
// 1 |  1 & (0  ^ (1   &  0))  & 0     // 32000 4 0
// 1 | (1 & (0  ^ (1   &  0))) & 0     // 32100 4 0
// 1 | (1 & (0  ^ (1   &  0))  & 0)    // 32110 0 1
// 1 |  1 & (0  ^ (1   &  0)   & 0)    // 32200 1 0
// 1 | (1 & (0  ^ (1   &  0)   & 0))   // 32210 0 1
// 1 |  1 &  0  ^ (1   &  0    & 0)    // 33000 2 0
// 1 | (1 &  0) ^ (1   &  0    & 0)    // 33100 2 1
// 1 | (1 &  0  ^ (1   &  0    & 0))   // 33110 0 1
// 1 |  1 & (0  ^ (1   &  0    & 0))   // 33200 1 0
// 1 | (1 & (0  ^ (1   &  0    & 0)))  // 33210 0 1
// 1 |  1 &  0  ^  1   & (0    & 0)    // 40000 3 0
// 1 | (1 &  0) ^  1   & (0    & 0)    // 41000 3 0
// 1 | (1 &  0  ^  1)  & (0    & 0)    // 41100 3 0
// 1 | (1 &  0  ^  1   & (0    & 0))   // 41110 0 1
// 1 |  1 & (0  ^  1)  & (0    & 0)    // 42000 3 0
// 1 | (1 & (0  ^  1)) & (0    & 0)    // 42100 3 0
// 1 | (1 & (0  ^  1)  & (0    & 0))   // 42110 0 1
// 1 |  1 & (0  ^  1   & (0    & 0))   // 42200 1 0
// 1 | (1 & (0  ^  1   & (0    & 0)))  // 42210 0 1
// 1 |  1 &  0  ^ (1   & (0    & 0))   // 43000 2 0
// 1 | (1 &  0) ^ (1   & (0    & 0))   // 43100 2 1
// 1 | (1 &  0  ^ (1   & (0    & 0)))  // 43110 0 1
// 1 |  1 & (0  ^ (1   & (0    & 0)))  // 43200 1 0
// 1 | (1 & (0  ^ (1   & (0    & 0)))) // 43210 0 1


// [1, 2, 5, 14, 42, 132, 492]

// [1]
// [1, 1]
// [1, 2, 2]
// [1, 3, 5 , 5]
// [1, 4, 9 , 14, 14]
// [1, 5, 14, 28, 42 , 42]
// [1, 6, 20, 48, 90 , 132, 132]
// [1, 7, 27, 75, 165, 297, 429, 492]

// 11 1
// 21 1

// 111 1
// 211 2
// 221
// 311 2
// 321

// 1111 1
// 2111 3
// 2211
// 2221
// 3111 5
// 3211
// 3221
// 3311
// 3321
// 4111 5
// 4211
// 4221
// 4311
// 4321

// 11111 1
// 21111 4
// 22111
// 22211
// 22221
// 31111 9 (4 + 5)
// 32111
// 32211
// 32221
// 33111
// 33211
// 33221
// 33311
// 33321
// 41111 14
// 42111
// 42211
// 42221
// 43111
// 43211
// 43221
// 43311
// 43321
// 44111
// 44211
// 44221
// 44311
// 44321
// 51111 14
// 52111
// 52211
// 52221
// 53111
// 53211
// 53221
// 53311
// 53321
// 54111
// 54211
// 54221
// 54311
// 54321
