import {runSolution} from "../helpers/solution.ts";

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
    let safeReports = 0;
    for (const l of data) {
        const line = l.split(" ").map(Number);
        if (isLineSafe(line)) {
            safeReports++;
        }
    }

    return [safeReports, "safe reports"];
}

await runSolution(day2a, import.meta.url);

// The levels are either all increasing or all decreasing.
// Any two adjacent levels differ by at least one and at most three.
function isLineSafe(line: number[]) {
    const isIncreasing = line[0] < line[1];

    for (let i = 0; i < line.length - 1; i++) {
        const abs = Math.abs(line[i] - line[i + 1]);
        console.log(abs);
        if (!isIncreasing) {
            if (line[i] < line[i + 1] || abs > 3 || abs < 1) {
                return false;
            }
        } else {
            if (line[i] > line[i + 1] || abs > 3 || abs < 1) {
                return false;
            }
        }
    }

    return true;
}
