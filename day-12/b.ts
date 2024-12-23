import { convertLinesTo2DMatrix } from "../helpers/matrix.ts";
import { runSolution } from "../helpers/solution.ts";
import { GardenAnalyzerSides, Region } from "./garden-analyzer-sides.ts";

/** provide your solution as the return of this function */
export async function day12b(data: string[]) {
  console.log(data);
  const garden = convertLinesTo2DMatrix(data);
  const analyzer = new GardenAnalyzerSides(garden);
  const regions = analyzer.findRegions();
  console.log(regions);
  const price = calculatePrice(regions);
  return price;
}

export function calculatePrice(regions: Region[]): number {
  let price = 0;
  for (const region of regions) {
    price += region.area * region.sides;
  }
  return price;
}

if (import.meta.main) await runSolution(day12b, import.meta.url);
