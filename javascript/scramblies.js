/**
 * https://www.codewars.com/kata/55c04b4cc56a697bb0000048/javascript
 * Solved
 */

/**
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
function scramble(str1, str2) {
  while (str2.length > 0) {
    const char = str2[0]
    const str1Count = count(str1, char)
    const str2Count = count(str2, char)
    if (str1Count < str2Count) {
      return false
    } else {
      const regex = new RegExp(char, 'g')
      str1 = str1.replace(regex, '')
      str2 = str2.replace(regex, '')
    }
  }

  return true
}

/**
 * @param {string} str
 * @param {string} char
 */
function count(str, char) {
  let count = 0
  for (const c of str) {
    if (c === char) count++
  }
  return count
}
