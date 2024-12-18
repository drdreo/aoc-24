import {runSolution} from "../helpers/solution.ts";
import {StoneVisitorSlim} from "./StoneVisitorSlim.ts";

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  const seq = data[0].split(" ");
  console.log(...seq);
  const stoneDude = new StoneVisitorSlim(seq);

  console.time("day11b");
  const BLINKS = 75;
  console.log("Blinking", BLINKS, "times");
  for (let i = 0; i < BLINKS; i++) {
    stoneDude.blink();
    // const encoder = new TextEncoder();
    // const data = encoder.encode(`\rJS Heap Used (MB): ${(Deno.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`);
    // await Deno.stdout.write(data);
  }

  console.timeEnd("day11b");

  return stoneDude.length;
}

if (import.meta.main) {
  await runSolution(day11b, import.meta.url);
}
