import { runSolution } from "../helpers/solution.ts";

function calcChecksum(disk: (string | number)[]): number {
  return disk.reduce<number>((acc, val, currentIndex) => {
    if (val === "." || typeof val === "string") {
      return acc;
    }
    return acc + val * currentIndex;
  }, 0);
}

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  const diskMap = data[0];
  const disk: (string | number)[] = [];
  let fileId = 0;

  // generate real disk representation
  for (let i = 0; i < diskMap.length; i++) {
    const num = parseInt(diskMap[i], 10);
    // even ... file size
    // odd ... free space
    let rep: (string | number)[];
    if (i % 2 == 0) {
      rep = new Array(num).fill(fileId++);
    } else {
      rep = new Array(num).fill(".");
    }

    disk.push(...rep);
  }

  // Find all unique files and their locations
  const files: { id: number; locations: number[] }[] = [];
  const fileLocations: Map<number, number[]> = new Map();

  for (let i = 0; i < disk.length; i++) {
    const fileId = disk[i];
    if (typeof fileId === "number") {
      if (!fileLocations.has(fileId)) {
        fileLocations.set(fileId, []);
      }
      fileLocations.get(fileId)!.push(i);
    }
  }

  // Convert to array of file objects, sorted by descending file ID
  const sortedFiles = Array.from(fileLocations.entries())
    .map(([id, locations]) => ({ id, locations }))
    .sort((a, b) => b.id - a.id);

  // Defragmentation process
  for (const file of sortedFiles) {
    const fileSize = file.locations.length;
    const currentStart = file.locations[0];

    // Find the leftmost span of free spaces large enough
    let bestFreeStart = -1;
    for (let start = 0; start <= currentStart; start++) {
      // Check if there's a continuous span of free spaces
      let freeSpan = 0;
      let j;
      for (j = start; j < disk.length; j++) {
        if (disk[j] !== ".") break;
        freeSpan++;
      }

      // If we found a span large enough to fit the file
      if (freeSpan >= fileSize) {
        bestFreeStart = start;
        break;
      }
    }

    // If we found a suitable free space, move the file
    if (bestFreeStart !== -1) {
      // Clear the current file locations
      disk.fill(".", file.locations[0], fileSize);

      // Place the file in the new location
      disk.fill(file.id, bestFreeStart, bestFreeStart + fileSize);
    }
  }

  // console.log(...original);
  console.log(...disk);
  const checksum = calcChecksum(disk);
  return checksum;
}

await runSolution(day9a, import.meta.url);
