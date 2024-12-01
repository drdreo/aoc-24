/*
    * Array utility functions
 */

/**
 * Returns the smallest number and removes it from the array
 * @param list
 */
export function extractSmallestNumFromArray(list: number[]): number | undefined{
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