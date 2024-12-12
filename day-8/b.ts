import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";
import { Antenna, findAntennas, visualizeAntinodes } from "./a.ts";

let MATRIX_SIZE = 0;

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
    const matrix = convertLinesTo2DMatrix(data);
    MATRIX_SIZE = matrix.length;
    const antennas = findAntennas(matrix);
    const antinodes = findAntinodes(antennas);

    visualizeAntinodes(matrix, antinodes);
    return antinodes.length;
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

                // Find extended antinodes
                const newAntinodes = findExtendedAntinodes(antenna1, antenna2);
                antinodes.push(...newAntinodes);
            }
        }
    }

    // Remove duplicate antinodes
    // Remove duplicate antinodes
    return antinodes;
}

function findExtendedAntinodes(
    antenna1: Antenna,
    antenna2: Antenna,
): Antenna[] {
    const explored = new Set<string>();

    const vectorX = antenna2.x - antenna1.x;
    const vectorY = antenna2.y - antenna1.y;

    function exploreAntinodes(start: Antenna, end: Antenna): Antenna[] {
           // First antinode by subtracting the vector from start
        const antinode1: Antenna = {
            x: start.x - vectorX,
            y: start.y - vectorY,
            frequency: start.frequency,
        };

        // Second antinode by adding the vector to end
        const antinode2: Antenna = {
            x: end.x + vectorX,
            y: end.y + vectorY,
            frequency: end.frequency,
        };

        const results: Antenna[] = [];

        // Explore and validate both antinodes
        [antinode1, antinode2].forEach((antinode) => {
            const key = `${antinode.x},${antinode.y},${antinode.frequency}`;

            // Ensure we haven't explored this antinode before
            if (explored.has(key) || !isValidAntinode(antinode)) return;
            explored.add(key);

            // Add to results if valid
            results.push(antinode);

            // Recursively explore from the new antinodes
            results.push(
                ...exploreAntinodes(start, antinode),
                ...exploreAntinodes(antinode, end),
            );
        });

        return results;
    }

    return exploreAntinodes(antenna1, antenna2);
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

if (import.meta.main) await runSolution(day8b, import.meta.url);
