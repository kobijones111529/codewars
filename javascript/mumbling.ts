/*
 * https://www.codewars.com/kata/5667e8f4e3f572a8f2000039/javascript
 * Solved
 */

function accum(s: string): string {
  return s
    .split("")
    .map(
      (char, index) =>
        `${char.toUpperCase()}${char.toLowerCase().repeat(index)}`
    )
    .join("-");
}
