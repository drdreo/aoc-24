import { assert } from "@std/assert";

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
export function reduceToNumberDifferences(list: number[]): number[] {
    return list.reduce((acc, num, i) => {
        if (i < list.length - 1) {
            acc.push(list[i + 1] - num);
        }
        return acc;
    }, [] as number[]);
}

/**
 * Returns the average number of the array.
 * example:
 *  - [1,2,3]   --> 2
 *  - [-2,2]    --> 0
 * @param list
 */
export function reduceToAverage(list: number[]): number {
    return list.reduce((acc, num) => acc + num, 0) / list.length;
}


export function getMedianValue(list: number[]): number {
    list.sort((a, b) => a - b);
    return getMiddleValue(list);
}

export function getMiddleValue(list: number[]): number {
    assert(list.length > 0, "List must have at least one element");
    const half = Math.floor(list.length / 2);
    return list[half];
}