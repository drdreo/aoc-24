import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";
import { findGuardLocation, walkUntilObstacle } from "./a.ts";

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
    const matrix = convertLinesTo2DMatrix(data);
    console.time("Loop time");
    const loopPositions = findLoopObstructionPositions(matrix);
    console.timeEnd("Loop time");
    return loopPositions.length;
}
function findLoopObstructionPositions(originalMatrix: string[][]): [number, number][] {
    const loopPositions: [number, number][] = [];
    const guardLocation = findGuardLocation(originalMatrix);

    for (let y = 0; y < originalMatrix.length; y++) {
        for (let x = 0; x < originalMatrix[y].length; x++) {
            // Skip guard's starting position
            if (x === guardLocation[0] && y === guardLocation[1]) continue;

            // Skip existing obstructions
            if (originalMatrix[y][x] === "#") continue;

            // Modify the original matrix in-place instead of creating a copy
            originalMatrix[y][x] = "#";

            const isLooping = simulateGuardMovement(originalMatrix, guardLocation);

            if (isLooping) {
                loopPositions.push([x, y]);
            }

            // Restore the original state
            originalMatrix[y][x] = ".";
        }
    }

    return loopPositions;
}

function simulateGuardMovement(matrix: string[][], initialLocation: [number, number, number]): boolean {
    let currentLocation = [...initialLocation] as [number, number, number];
    const visitedStates = new Set<string>();
    let runCount = 0;

    while (runCount < 10_000) { // Use a fixed, known good max iteration count
        const stateKey = `${currentLocation[0]},${currentLocation[1]},${currentLocation[2]}`;

        if (visitedStates.has(stateKey)) {
            return true;
        }

        visitedStates.add(stateKey);

        const result = walkUntilObstacle(matrix, currentLocation);

        if (result.exited) break;

        currentLocation = result.newLocation;
        runCount++;
    }

    return false;
}

if (import.meta.main) {
    await runSolution(day6b, import.meta.url);
}
