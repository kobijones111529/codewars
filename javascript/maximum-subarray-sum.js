/**
 * https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c/javascript
 */

/**
 * @param {number[]} arr
 * @returns {number}
 */
function maxSequence(arr) {
  return arr.reduce(
    ({ sum, max }, value) => {
      const nextSum = sum + value
      return { sum: Math.max(0, nextSum), max: Math.max(nextSum, max) }
    },
    { sum: 0, max: 0 }
  ).max
}
