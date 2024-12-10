import { runSolution } from "../helpers/solution.ts";
import { checkIfCalculationIsPossible, OPERATORS_A, parseDataIntoCalculations } from "./a.ts";

const OPERATORS_B = ["+", "*", "||"];
OPERATORS_A.length = 0;
OPERATORS_A.push(...OPERATORS_B);

/** provide your solution as the return of this function */
export async function day7b(data: string[]) {
    const calculations = parseDataIntoCalculations(data);
    let total = 0;
    for (let calc of calculations) {
        const isPossible = checkIfCalculationIsPossible(calc.result, calc.operands);
        if (isPossible) {
            total += calc.result;
        }
    }
    return total;
}

if (import.meta.main) await runSolution(day7b, import.meta.url);
