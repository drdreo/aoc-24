/**
 * Converts a string array to a 2D matrix
 * @param lines
 * @example
 * convertLinesTo2DMatrix([
 * 'abc',
 * 'def',
 * ]);
 * // returns [['a', 'b', 'c'], ['d', 'e', 'f']]
 */
export function convertLinesTo2DMatrix(lines: string[]) {
    return lines.map((l) => l.split("")).filter((l) => l.length > 0);
}

export function getCloseCharacterLocations(
    matrix: string[][],
    x: number,
    y: number,
    character: string,
): number[][] | undefined {
    const locations: number[][] = []; // x,y coordinates
    if (x < 0 || y < 0 || x >= matrix.length || y >= matrix[x].length) {
        throw Error(`Invalid coordinates [${x}][${y}]`);
    }

    // deno-fmt-ignore
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // left, right, up, down
        [-1, -1], [1, 1], [1, -1], [-1, 1] // diagonals
    ];

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < matrix.length && ny < matrix[nx].length && matrix[nx][ny] === character) {
            locations.push([nx, ny]);
        }
    }

    return locations.length > 0 ? locations : undefined;
}

export function getDistanceBetweenPoints(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export type Point = {
    x: number;
    y: number;
};
