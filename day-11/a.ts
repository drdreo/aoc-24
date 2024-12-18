import { runSolution } from "../helpers/solution.ts";
import { StoneVisitorSlow } from "./StoneVisitorSlow.ts";

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  const seq = data[0].split(" ");
  console.log(...seq);
  const stoneDude = new StoneVisitorSlow(seq);

  console.time("day11a");
  const BLINKS = 6;
  for (let i = 0; i < BLINKS; i++) {
    stoneDude.blink();
  }

  console.timeEnd("day11a");

  return stoneDude.length;
}

if (import.meta.main) await runSolution(day11a, import.meta.url);
