import { logger } from "../helpers/logger.ts";
import { runSolution } from "../helpers/solution.ts";

const REGEX_OP = /mul\(\d+,\d+\)/gmi;

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
    let total = 0;
    for (const line of data) {
        const regRes = getValidOps(line);
        if (!regRes) {
            logger.log("Could not parse", line);
        }
        for (let res of regRes) {
            const result = getOpsResult(res[0]);
            total += result;
            logger.log(res[0], result, total);
        }
    }
    return total;
}

if (import.meta.main) {
    await runSolution(day3a, import.meta.url);
}

// logger.print();

export function getValidOps(line: string) {
    return line.matchAll(REGEX_OP);
}

export function getOpsResult(op: string) {
    const nums = op.match(/\d+/g);
    if (!nums) {
        throw new Error("Could not parse numbers from " + op);
    }
    return parseInt(nums[0]) * parseInt(nums[1]);
}
