/**
 * https://www.codewars.com/kata/52597aa56021e91c93000cb0/javascript
 * Solved
 */

/**
 * @param {any[]} arr
 * @returns {any[]}
 */
function moveZeros(arr) {
  return [
    ...arr.filter(x => x !== 0),
    ...arr.filter(x => x === 0)
  ]
}
