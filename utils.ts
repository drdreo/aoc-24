import * as path from "jsr:@std/path";

export async function runSolution(
  solution: (data: string[]) => any,
  dir: string,
) {
  const data = await readData(dir);
  const answer = await solution(data);
  console.log("%cYour Answer:", "background-color: #0476D0;", answer);
}

export async function readData(fullPath: string) {
  const puzzle = fullPath.split("/").slice(-2).join("/").split(".")[0];
  const dataSet = "sample";
  const [day, part] = puzzle
    .split("/")
    .map((x, i) => (i === 0 ? +x.split("-")[1] : x)) as [number, "a" | "b"];
  const fileName = `${import.meta.dirname!}/${
    createFileName(day, part, dataSet)
  }`;
  return cleanData(await Deno.readTextFile(fileName));
}

function createFileName(day: number, part: "a" | "b", dataSet?: string) {
  return path.join(
    `day-${day}`,
    `${part}.data${dataSet ? `.${dataSet}` : ""}.txt`,
  );
}

function cleanData(fileContent: string): string[] {
  return fileContent.split("\n").map((x) => x.replace("\r", "").trim());
}
