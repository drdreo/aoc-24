import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";
import { GardenAnalyzer, Region } from "./garden-analyzer.ts";

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
  console.log(data);
  const garden = convertLinesTo2DMatrix(data);
  const analyzer = new GardenAnalyzer(garden);
  const regions = analyzer.findRegions();
  console.log(regions);
  const price = calculatePrice(regions);
  return price;
}

export function calculatePrice(regions: Region[]): number {
  let price = 0;
  for (const region of regions) {
    price += region.area * region.perimeter;
  }
  return price;
}

if (import.meta.main) await runSolution(day12a, import.meta.url);
