/*
 * https://www.codewars.com/kata/5279f6fe5ab7f447890006a7/javascript
 * Solved
 */

function pickPeaks(arr: number[]): { pos: number[]; peaks: number[] } {
  const { pos } = arr.reduce(
    ({ pos, i, j }, _, k, arr) => {
      if (j === null) return { pos, i, j: k };
      if (i === null) return { pos, i: j, j: k };
      if (arr[j] > Math.max(arr[k], arr[i]))
        return { pos: [...pos, j], i: k - 1, j: k };

      [i, j] = arr[i] < arr[j] ? [i, j] : [j, j + 1];
      return { i, j: arr[j] < arr[k] ? k : j, pos };
    },
    {
      pos: [] as number[],
      i: null as number | null,
      j: null as number | null,
    }
  );
  return { pos, peaks: pos.map((i) => arr[i]) };
}
