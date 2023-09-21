/**
 * https://www.codewars.com/kata/526571aae218b8ee490006f4/javascript
 * Solved
 */

/**
 * @param {number} n
 * @returns {number}
 */
function countBits(n) {
  let ones = 0
  while (n > 0) {
    ones += n % 2
    n = Math.floor(n / 2)
  }
  return ones
}
