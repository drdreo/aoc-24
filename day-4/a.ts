import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
    const matrix = convertLinesTo2DMatrix(data);
    let wordCount = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const char = matrix[i][j];
            if (char === "X") {
                // const locations = getCloseCharacterLocations(matrix, i, j, "M");
                wordCount += checkForWord(matrix, i, j);
            }
        }
    }
    return wordCount;
}

await runSolution(day4a, import.meta.url);

function checkForWord(matrix: string[][], x: number, y: number): number {
    let wordCount = 0;
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1], // left, right, up, down
        [-1, -1],
        [1, 1],
        [1, -1],
        [-1, 1], // diagonals
    ];
    for (const [dx, dy] of directions) {
        // check if close locations result into XMAS
        let word = "";
        let nx = x;
        let ny = y;
        for (let i = 0; i < 3; i++) {
            nx += dx;
            ny += dy;
            if (nx >= 0 && ny >= 0 && nx < matrix.length && ny < matrix[nx].length) {
                word += matrix[nx][ny];
            }
        }

        if (word === "MAS") {
            wordCount++;
        }
    }
    return wordCount;
}
