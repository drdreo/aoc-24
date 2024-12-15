import { convertLinesTo2DMatrix, Point } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
  const map = convertLinesTo2DMatrix(data).map((row) => row.map(Number)) as number[][];
  const trailHeads = getTrailHeadsFromMap(map);

  for (let y of map) {
    console.log(...y);
  }
  console.log(trailHeads);

  let scores = 0;
  for (const trailHead of trailHeads) {
    const score = getScoreForTrailHead(map, trailHead);
    console.log(score);
    scores += score;
  }

  return scores;
}

function getTrailHeadsFromMap(map: number[][]) {
  const trailHeads = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 0) {
        trailHeads.push({ y, x });
      }
    }
  }
  return trailHeads;
}

function getScoreForTrailHead(map: number[][], trailHead: Point): number {
  return moveToTop(map, trailHead);
}

function moveToTop(
  map: number[][],
  currentPoint: Point,
  visited: Set<string> = new Set(),
  paths: Set<string> = new Set(),
): number {
  // Create a unique key for the current point
  const pointKey = `${currentPoint.x},${currentPoint.y}`;

  // Check if the point is within the map boundaries
  if (
    currentPoint.x < 0 ||
    currentPoint.x >= map[0].length ||
    currentPoint.y < 0 ||
    currentPoint.y >= map.length ||
    visited.has(pointKey)
  ) {
    return paths.size;
  }

  const currentLoc = map[currentPoint.y][currentPoint.x];

  // Create new sets to avoid modifying the original
  const newVisited = new Set(visited);
  newVisited.add(pointKey);

  // If current location is a peak, record the path
  if (currentLoc === 9) {
    // Create a path signature based on the visited points
    const pathSignature = Array.from(newVisited).sort().join("|");
    paths.add(pathSignature);
  }

  // Possible movement directions (up, down, left, right)
  const directions = [
    { x: 0, y: 1 }, // down
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 }, // right
    { x: -1, y: 0 }, // left
  ];

  for (const dir of directions) {
    const newPoint = {
      x: currentPoint.x + dir.x,
      y: currentPoint.y + dir.y,
    };

    // Additional conditions:
    // 1. Point is within map
    // 2. New location is exactly one higher than current location
    if (
      newPoint.x >= 0 &&
      newPoint.x < map[0].length &&
      newPoint.y >= 0 &&
      newPoint.y < map.length &&
      map[newPoint.y][newPoint.x] === currentLoc + 1
    ) {
      // Recursively explore the path
      moveToTop(map, newPoint, newVisited, paths);
    }
  }

  // Return the number of unique peaks reached
  return paths.size;
}

if (import.meta.main) await runSolution(day10a, import.meta.url);
