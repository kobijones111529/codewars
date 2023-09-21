/**
 * https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/javascript
 * WIP
 */

/**
 * @param {any[][]} array
 */
function snail(array) {
  const len = array.length

  for (let n = 0; n < len - 1; n += 1) {
    for (let i = n; i < len - n - 1; i++) {
      console.log(array[n][i])
    }
    for (let i = n; i < len - n - 1; i++) {
      console.log(array[i][len - 1 - n])
    }
    for (let i = n; i < len - n - 1; i++) {
      console.log(array[len - 1 - n][len - 1 - i])
    }
    for (let i = n; i < len - n - 1; i++) {
      console.log(array[len - 1 - i][n])
    }
  }

  if (array.length % 2 === 1) {
    console.log(array[Math.floor(len / 2)][Math.floor(len / 2)])
  }
}

// const array = [
//   [1 , 2 , 3 , 4],
//   [12, 13, 14, 5],
//   [11, 16, 15, 6],
//   [10, 9 , 8 , 7]
// ]
const array = [
  [1, 2, 3],
  [8, 9, 4],
  [7, 6, 5]
]

snail(array)
