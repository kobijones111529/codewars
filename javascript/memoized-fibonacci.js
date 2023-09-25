/*
 * https://www.codewars.com/kata/529adbf7533b761c560004e5/javascript
 * Solved
 */

/**
 * @param {number} n
 * @returns {number}
 */
function fibonacci(n) {
  if (n < 2) return n;

  if (this.cache === undefined) {
    /** @type {Map<number, number>} */
    this.cache = new Map();
  }

  const cached = this.cache.get(n);
  if (cached === undefined) {
    const result = fibonacci(n - 1) + fibonacci(n - 2);
    this.cache.set(n, result);
    return result;
  } else {
    return cached;
  }
}
