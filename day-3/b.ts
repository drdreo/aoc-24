import { logger } from "../helpers/logger.ts";
import { runSolution } from "../helpers/solution.ts";
let enabled = true;

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
    let total = 0;
    for (const line of data) {
        const res = processMultiplication(line);
        logger.log('result', res)
        total += res;
    }
    return total;
}

function processMultiplication(memory: string) {
    const regex = /(?:do\(\)|don't\(\)|mul\((\d+),(\d+)\))/g;
    let result = 0;

    memory.replace(regex, (match, a, b) => {
        switch (match) {
            case 'do()':
                enabled = true;
                break;
            case 'don\'t()':
                enabled = false;
                break;
            default:
                if (enabled) {
                    result += parseInt(a) * parseInt(b);
                }
                break;
        }
        return match;
    });

    return result;
}


if (import.meta.main) {
    await runSolution(day3b, import.meta.url);

    logger.print();
}

