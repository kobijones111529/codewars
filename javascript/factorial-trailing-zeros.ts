/*
 * https://www.codewars.com/kata/52f787eb172a8b4ae1000a34/train/javascript
 * Solved
 */

function zeros(n: number): number {
  let sum = 0;
  while (n >= 5) {
    const order = Math.floor(Math.log(n) / Math.log(5));
    const pow = Math.pow(5, order);
    sum += (pow - 1) / 4;
    n -= pow;
  }
  return sum;
}
