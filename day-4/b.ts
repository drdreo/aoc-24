import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
    const matrix = convertLinesTo2DMatrix(data);
    let wordCount = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const char = matrix[i][j];
            if (char === "A") {
                // const locations = getCloseCharacterLocations(matrix, i, j, "M");
                wordCount += checkForWord(matrix, i, j);
            }
        }
    }
    return wordCount;
}

await runSolution(day4b, import.meta.url);

function checkForWord(matrix: string[][], x: number, y: number): number {
    let wordCount = 0;
    const directions = [
        [-1, -1],
        [1, 1],
        [1, -1],
        [-1, 1], // diagonals
    ];
    for (const [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < matrix.length && ny < matrix[nx].length && matrix[nx][ny] === "M") {
            nx += -2 * dx;
            ny += -2 * dy;
            if (nx >= 0 && ny >= 0 && nx < matrix.length && ny < matrix[nx].length && matrix[nx][ny] === "S") {
                wordCount++;
                console.log("found X-MAS at", x, y);
            }
        }
    }

    if (wordCount > 1) {
        return 1;
    }
    return 0;
}
