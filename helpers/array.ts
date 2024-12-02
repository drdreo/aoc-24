/*
 * Array utility functions
 */

/**
 * Returns the smallest number and removes it from the array
 * @param list
 */
export function extractSmallestNumFromArray(list: number[]): number | undefined {
    let smallest = list[0];
    let index = 0;

    for (let i = 1; i < list.length; i++) {
        if (list[i] < smallest) {
            smallest = list[i];
            index = i;
        }
    }

    list.splice(index, 1);
    return smallest;
}

/**
 * Count of a provided number contained in an array
 * @param num
 * @param list
 */
export function countNumInArray(num: number, list: number[]): number {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i] === num) {
            count++;
        }
    }
    return count;
}

/**
 * Converts a number array to contain the differences of adjacent items.
 * example:
 *  - [1,2,3]   --> [1,1]
 *  - [5,3]     --> [-2]
 * @param list
 */
export function reduceToNumberDifferences( list: number[]): number[] {
    return list.reduce((acc, num, i) => {
        if (i < list.length - 1) {
            acc.push(list[i + 1] - num);
        }
        return acc;
    }, [] as number[]);
}
