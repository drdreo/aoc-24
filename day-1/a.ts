import { assert } from "@std/assert";
import { extractSmallestNumFromArray } from "../helpers/array.ts";
import { runSolution } from "../helpers/solution.ts";

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
    const list1 = [];
    const list2 = [];

    for (let i = 0; i < data.length; i++) {
        const line = data[i].split("  ");
        list1.push(parseInt(line[0]));
        list2.push(parseInt(line[1]));
    }

    assert(list1.length === list2.length, "Lists are not the same length");

    let distances = 0;
    const length = list1.length;
    for (let i = 0; i < length; i++) {
        const smallest1 = extractSmallestNumFromArray(list1);
        const smallest2 = extractSmallestNumFromArray(list2);
        if (!smallest1 || !smallest2) {
            throw new Error("Could not extract smallest number from list");
        }

        distances += Math.abs(smallest1 - smallest2);
    }

    return distances;
}

await runSolution(day1a, import.meta.url);
