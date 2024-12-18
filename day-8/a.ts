import {convertLinesTo2DMatrix, Point} from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";

export interface Antenna {
    frequency: string;
    x: number;
    y: number;
}

let MATRIX_SIZE = 0;

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
    const matrix = convertLinesTo2DMatrix(data);
    MATRIX_SIZE = matrix.length;
    const antennas = findAntennas(matrix);
    const antinodes = findAntinodes(antennas);

    visualizePoints(matrix, antinodes);
    return antinodes.length;
}

if (import.meta.main) await runSolution(day8a, import.meta.url);

export function findAntennas(matrix: string[][]): Antenna[] {
    const antennas: Antenna[] = [];

    matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
            // Consider any non-dot character as an antenna
            if (cell !== ".") {
                antennas.push({
                    frequency: cell,
                    x,
                    y,
                });
            }
        });
    });

    return antennas;
}

export function findAntinodes(antennas: Antenna[]): Antenna[] {
    const antinodes: Antenna[] = [];

    // Group antennas by their frequency
    const frequencyGroups = antennas.reduce((groups, antenna) => {
        if (!groups[antenna.frequency]) {
            groups[antenna.frequency] = [];
        }
        groups[antenna.frequency].push(antenna);
        return groups;
    }, {} as Record<string, Antenna[]>);

    // Check each frequency group for antinodes
    for (const [frequency, group] of Object.entries(frequencyGroups)) {
        // Check each pair of antennas with the same frequency
        for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
                const antenna1 = group[i];
                const antenna2 = group[j];

                // Calculate the antinodes
                const antinodePositions = findAntinodesBetweenAntennas(antenna1, antenna2).filter(isValidAntinode);
                antinodes.push(...antinodePositions);
            }
        }
    }

    // Remove duplicate antinodes
    return Array.from(new Set(antinodes.map(({ x, y }) => `{"x":${x},"y":${y}, "frequency": -1}`))).map((a) =>
        JSON.parse(a)
    );
}

export function findAntinodesBetweenAntennas(a1: Antenna, a2: Antenna): Antenna[] {
    console.log(a1, a2);
    const dx = a2.x - a1.x;
    const dy = a2.y - a1.y;

    const antinode1: Antenna = {
        frequency: a1.frequency,
        x: a1.x - dx,
        y: a1.y - dy,
    };
    const antinode2: Antenna = {
        frequency: a2.frequency,
        x: a2.x + dx,
        y: a2.y + dy,
    };

    return [antinode1, antinode2];
}

export function isValidAntinode(antinode: Antenna): boolean {
    const { x, y } = antinode;
    return x >= 0 && y >= 0 && x < MATRIX_SIZE && y < MATRIX_SIZE;
}

export function visualizePoints(matrix: string[][], points: Point[]) {
    const m = matrix.map((row) => row.slice());
    points.forEach(({ x, y }) => {
        m[y][x] = "#";
    });

    m.forEach((row) => {
        console.log(row.join(""));
    });
}
