import {assert} from "@std/assert";
import {countNumInArray} from "../helpers/array.ts";
import {runSolution} from "../helpers/solution.ts";

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
    const list1 = [];
    const list2 = [];

    for (let i = 0; i < data.length; i++) {
        const line = data[i].split("  ");
        list1.push(parseInt(line[0]));
        list2.push(parseInt(line[1]));
    }

    assert(list1.length === list2.length, "Lists are not the same length");

    let similarity = 0;

    for(let entry of list1){
        const count = countNumInArray(entry, list2);
        similarity += count * entry;
    }


    return similarity;
}

await runSolution(day1b, import.meta.url);
