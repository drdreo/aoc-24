/*
    Checks if a number is negative.
 */
export const isNegative = (num: number) => num < 0;

/*
    Checks if a number is positive or zero.
 */
export const isPositive = (num: number) => num >= 0;

export function numDigits(x: number): number {
  return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
}
