/**
 * https://www.codewars.com/kata/520446778469526ec0000001/train/javascript
 * Solved
 */

/** */
function sameStructure(arr1: any[], arr2: any[]): boolean {
  let pairs: [any[], any[]][] = [[arr1, arr2]]

  while (pairs.length > 0) {
    const newPairs: [any[], any[]][] = []

    for (const [left, right] of pairs) {
      if (left.length !== right.length) {
        return false
      }

      for (const i of left.keys()) {
        const leftIsArray = Array.isArray(left[i])
        if (leftIsArray !== Array.isArray(right[i])) {
          return false
        } else if (leftIsArray) {
          newPairs.push([left[i], right[i]])
        }
      }
    }

    pairs = newPairs
  }

  return true
}
