import {reduceToAverage, reduceToNumberDifferences} from "../helpers/array.ts";
import {Logger} from "../helpers/logger.ts";
import {isNegative, isPositive} from "../helpers/numbers.ts";
import {runSolution} from "../helpers/solution.ts";

const myLogger = new Logger("Mine");
const claudeLogger = new Logger("Claude");

/** provide your solution as the return of this function */
// wrong result ==> 423, off by 3
export async function day2b(data: string[]) {
    let safeReports = 0;

    for (const [lIdx, l] of data.entries()) {
        const line = l.split(" ").map(Number);
        const differences = reduceToNumberDifferences(line);

        if (isLineSafe(differences)) {
            safeReports++;
            myLogger.log(`Line ${lIdx}: ${line.join(",")} - SAFE (original)`);
            continue;
        }

        // Find indices of invalid transitions
        const isIncreasing = reduceToAverage(differences) >= 0;
        const badIndices = differences
            .map((diff, i) => (isValidTransition(diff, isIncreasing) ? -1 : i))
            .filter((index) => index !== -1);

        // first check index
        let badIdx = badIndices[0];
        let originalLine = [...line];
        let fixedLine = line.toSpliced(badIdx, 1);
        if (isLineSafe(reduceToNumberDifferences(fixedLine))) {
            myLogger.log(
                `Line ${lIdx}: ${originalLine.join(",")} - SAFE`,
            );

            safeReports++;
            continue;
        }

        if (badIdx + 1 < line.length) {
            //then check index +1
            originalLine = [...line];
            fixedLine = line.toSpliced(badIdx + 1, 1);
            if (isLineSafe(reduceToNumberDifferences(fixedLine))) {
                myLogger.log(
                    `Line ${lIdx}: ${originalLine.join(",")} - SAFE`,
                );

                safeReports++;
                continue;
            }
        }

        myLogger.log(`Line ${lIdx}: ${originalLine.join(",")} - UNSAFE`);
    }

    return [safeReports, "safe reports"];
}

// FUCK YOU CLAUDE WITH BRUTE FORCING, right result ==> 426
export async function claude2b(data: string[]) {
    let safeReports = 0;

    for (const [index, line] of data.entries()) {
        const nums = line.split(" ").map(Number);
        const differences = reduceToNumberDifferences(nums);

        // Check if original line is safe
        if (isLineSafe(differences)) {
            safeReports++;
            claudeLogger.log(`Line ${index}: ${nums} - SAFE (original)`);
            continue;
        }

        // Try removing each element
        let foundSafeVersion = false;
        for (let i = 0; i < nums.length; i++) {
            const modifiedLine = nums.toSpliced(i, 1);
            const modifiedDifferences = reduceToNumberDifferences(modifiedLine);

            if (isLineSafe(modifiedDifferences)) {
                safeReports++;
                claudeLogger.log(`Line ${index}: ${nums} - SAFE`);
                foundSafeVersion = true;
                break;
            }
        }

        if (!foundSafeVersion) {
            claudeLogger.log(`Line ${index}: ${nums} - UNSAFE`);
        }
    }

    return [safeReports, "safe reports"];
}

await runSolution(day2b, import.meta.url);
// await runSolution(claude2b, import.meta.url);

// await myLogger.saveToFile();
// myLogger.print();

// myLogger.compare(claudeLogger);

// Conditions for a safe line:
// - The levels are either all increasing or all decreasing.
// - Any two adjacent levels differ by at least one and at most three.
function isLineSafe(differences: number[]) {
    return differences.every(isValidDiff) && isMonotonic(differences);
}

function isValidDiff(diff: number): boolean {
    return 0 < Math.abs(diff) && Math.abs(diff) <= 3;
}

function isValidTransition(diff: number, isIncreasing: boolean): boolean {
    return isIncreasing ? 0 < diff && diff <= 3 : -3 <= diff && diff < 0;
}

function isMonotonic(differences: number[]) {
    return differences.every(isNegative) || differences.every(isPositive);
}