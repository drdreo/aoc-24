import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";

export const GUARD_DIR_CHARS = ["^", ">", "v", "<"];
export enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
}

let runCount = 0;
let walkedLocations = new Map<number, Set<number>>();

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
    const matrix = convertLinesTo2DMatrix(data);
    let guardLocation = findGuardLocation(matrix);
    matrix[guardLocation[1]][guardLocation[0]] = "."; // remove guard from matrix
    walkedLocations.set(guardLocation[0], new Set<number>([guardLocation[1]]));

    console.time("Loop time");
    while (true) {
        if (runCount++ > 10_000) {
            throw Error("Huuge loop detected");
        }
        const { exited, newLocation } = walkUntilObstacle(matrix, guardLocation);
        if (exited) {
            break;
        }
        guardLocation = newLocation;

        // await new Promise((r) => setTimeout(r, 500));
        // drawLab(matrix, guardLocation);
        // let walkedDistinctLocations = 0;
        // walkedLocations.forEach((set) => {
        //     walkedDistinctLocations += set.size;
        // });
        // console.log(`Walked locations: ${walkedDistinctLocations}`);
    }
    console.timeEnd("Loop time");

    let walkedDistinctLocations = 0;
    walkedLocations.forEach((set) => {
        walkedDistinctLocations += set.size;
    });
    return walkedDistinctLocations - 1;
}

if (import.meta.main) {
    await runSolution(day6a, import.meta.url);
}

// returns [x,y]
export function findGuardLocation(matrix: string[][]): [number, number, number] {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (GUARD_DIR_CHARS.includes(matrix[j][i])) {
                return [i, j, getDirectionFromGuard(matrix[j][i])];
            }
        }
    }
    throw Error("Guard not found");
}

export function walkUntilObstacle(matrix: string[][], guardLocation: [number, number, number]) {
    let [x, y, direction] = guardLocation;

    let [nx, ny] = moveInDirection(x, y, direction);
    walkedLocations.has(nx) ? walkedLocations.get(nx)!.add(ny) : walkedLocations.set(nx, new Set<number>([ny]));

    if (nx < 0 || ny < 0 || nx >= matrix.length || ny >= matrix[nx].length) {
        return {
            newLocation: [nx, ny, direction] as [number, number, number],
            exited: true,
        };
    }

    if (matrix[ny][nx] === "#") {
        // revert the move and rotate
        walkedLocations.get(nx)!.delete(ny);

        nx = x;
        ny = y;
        // changeDirection 90deg clockwise
        direction = (guardLocation[2] + 1) % 4;
    }
    return {
        newLocation: [nx, ny, direction] as [number, number, number],
        exited: false,
    };
}

export function getDirectionFromGuard(char: string): Direction {
    switch (char) {
        case "v":
            return Direction.Down;
        case "<":
            return Direction.Left;
        case ">":
            return Direction.Right;
        case "^":
            return Direction.Up;
        default:
            throw Error("Invalid guard character");
    }
}

export function moveInDirection(x: number, y: number, direction: Direction): [number, number] {
    switch (direction) {
        case Direction.Up:
            return [x, y - 1];
        case Direction.Right:
            return [x + 1, y];
        case Direction.Down:
            return [x, y + 1];
        case Direction.Left:
            return [x - 1, y];
        default:
            throw new Error("Invalid direction");
    }
}

export function drawLab(matrix: string[][], guardLocation: [number, number, number]) {
    const [x, y, direction] = guardLocation;
    // matrix[y][x] = GUARD_DIR_CHARS[direction];
    // console.clear();
    // console.log(matrix.map((l) => l.join("")).join("\n"));
    // matrix[y][x] = ".";

    // draw the guard in center, limit to 10x10
    const SIZE = 10;
    const startX = Math.max(0, x - SIZE);
    const startY = Math.max(0, y - SIZE);
    const endX = Math.min(matrix[0].length, x + SIZE);
    const endY = Math.min(matrix.length, y + SIZE);
    const guardChar = GUARD_DIR_CHARS[direction];
    // render X twice as big as Y to space it evenly
    matrix[y][x] = GUARD_DIR_CHARS[direction];
    const lab = matrix.slice(startY, endY).map((l) => l.slice(startX, endX).map((char) => char + " ").join("")).join(
        "\n",
    );
    matrix[y][x] = ".";

    console.clear();
    console.log(lab);
    console.log(`Guard: ${guardChar}`);
    console.log(`Guard position: ${x}, ${y}`);
}
