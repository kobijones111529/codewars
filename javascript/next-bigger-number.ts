/*
 * https://www.codewars.com/kata/55983863da40caa2c900004e/javascript
 * Solved
 */

function nextBigger(n: number): number {
  const digits = [...n.toString()].map((digit) => Number(digit));
  const result = partialReduceRight(
    digits,
    ({ prev, foundDigits }, currDigit, index) => {
      if (prev && currDigit < prev.value) {
        const nextBiggest =
          [...foundDigits]
            .filter(([digit]) => digit > digits[index])
            .reduce(
              (min: [number, number] | null, curr) =>
                min && min[0] < curr[0] ? min : curr,
              null
            )?.[1] || prev.index;
        return {
          done: true,
          value: { found: true, index, nextBiggest },
        };
      }
      if (prev && !foundDigits.has(prev.value))
        foundDigits.set(prev.value, prev.index);
      return {
        done: false,
        value: {
          found: false as const,
          prev: { value: currDigit, index },
          foundDigits,
        },
      };
    },
    {
      found: false as const,
      prev: null as { value: number; index: number } | null,
      foundDigits: new Map() as Map<number, number>,
    }
  );
  if (!result.found) return -1;
  const { index, nextBiggest } = result;
  [digits[index], digits[nextBiggest]] = [digits[nextBiggest], digits[index]];
  return Number(
    [
      ...digits.slice(0, index + 1),
      ...digits.slice(index + 1).reverse()
    ].join("")
  );
}

function partialReduceRight<T, U, V>(
  array: T[],
  callbackfn: (
    previousValue: U,
    currentValue: T,
    currentIndex: number,
    array: T[]
  ) => { value: U; done: false } | { value: V; done: true },
  initialValue: U
): U | V {
  let accumulator = initialValue;
  for (let i = array.length - 1; i >= 0; i--) {
    const { done, value } = callbackfn(accumulator, array[i], i, array);
    if (done) return value;
    accumulator = value;
  }
  return accumulator;
}
