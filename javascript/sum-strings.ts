/*
 * https://www.codewars.com/kata/5324945e2ece5e1f32000370/javascript
 * Solved
 */

function sumStrings(a: string, b: string): string {
  let result = "";
  let carry = 0;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const fstDigit = i >= a.length ? 0 : Number(a[a.length - 1 - i]);
    const sndDigit = i >= b.length ? 0 : Number(b[b.length - 1 - i]);
    const sum = fstDigit + sndDigit + carry;
    result = `${sum % 10}${result}`;
    carry = Math.floor(sum / 10);
  }
  return `${carry}${result}`.replace(/^[0]+/, "");
}
