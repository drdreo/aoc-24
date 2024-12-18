import { uniqueBy } from "../helpers/array.ts";
import { convertLinesTo2DMatrix, Point } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";
import { Antenna, findAntennas, visualizePoints } from "./a.ts";

let MATRIX_SIZE = 0;

const seenPoints = new Set<string>();

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
  const matrix = convertLinesTo2DMatrix(data);
  MATRIX_SIZE = matrix.length;
  console.log({MATRIX_SIZE});
  const antennas = findAntennas(matrix);
  const antinodes = findAntinodes(antennas);

  // visualizePoints(matrix, antinodes);
  return antinodes.length;
}

export function findAntinodes(antennas: Antenna[]): Point[] {
  // todo, group by frequency

  const antennaGroups = Object.groupBy(antennas, ({ frequency }) => frequency);
  const antinodes = [];
  for (const [_, group] of Object.entries(antennaGroups)) {
    if (!group || group.length < 2) continue;

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const p1 = { x: group[i].x, y: group[i].y };
        const p2 = { x: group[j].x, y: group[j].y };

        antinodes.push(...calculateAntinodes(p1, p2));
      }
    }
  }

  return uniqueBy(antinodes, ({ x, y }) => `${x},${y}`);
}

function calculateAntinodes(p1: Point, p2: Point): Point[] {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return [
    ...calculatePointsOnLine(p1, dx, dy),
    ...calculatePointsOnLine(p1, -dx, -dy),
  ];
}

function calculatePointsOnLine(start: Point, stepX: number, stepY: number): Point[] {
  const points = [];

  let { x, y } = start;
  let isValid = true;
  while (isValid) {
    const nP = { x: Math.round(x), y: Math.floor(y) };
    if (isValidAntinode(nP)) {
      points.push(nP);
      x += stepX;
      y += stepY;
    } else {
      isValid = false;
    }
  }

  return points;
}

export function isValidAntinode(point: Point): boolean {
  const { x, y } = point;
  return x >= 0 && y >= 0 && x < MATRIX_SIZE && y < MATRIX_SIZE;
}

if (import.meta.main) await runSolution(day8b, import.meta.url);
