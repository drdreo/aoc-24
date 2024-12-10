import { runSolution } from "../helpers/solution.ts";

export const OPERATORS_A = ["+", "*"];

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
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

export function parseDataIntoCalculations(data: string[]) {
    return data.map((line) => {
        let [result, operands] = line.split(":");
        operands = operands.slice(1);

        return {
            result: Number(result),
            operands: operands.split(" ").map(Number),
        };
    });
}

export function checkIfCalculationIsPossible(target: number, operands: number[]): boolean {
    for (const operator of OPERATORS_A) {
        if (operands.length === 1) {
            return operands[0] === target;
        }
        const [a, b, ...rest] = operands;
        const newOperands = [calculate(a, b, operator), ...rest];
        if (checkIfCalculationIsPossible(target, newOperands)) {
            console.log(`${a} ${operator} ${b}`);
            return true;
        }
    }
    return false;
}

function calculate(a: number, b: number, operator: string): number {
    switch (operator) {
        case "+":
            return a + b;
        case "*":
            return a * b;
        case "||":
            return Number(`${a}${b}`);
        default:
            throw Error(`wtf operator ${operator}`);
    }
}
if (import.meta.main) {
    await runSolution(day7a, import.meta.url);
}
