import { parseArgs } from "jsr:@std/cli/parse-args";
import { join } from "jsr:@std/path";

export async function runSolution(
    solution: (data: string[]) => any,
    dir: string,
) {
    const dataset = getDatasetNameFromFlags();
    const data = await readData(dir, dataset);
    const answer = await solution(data);
    console.log("%cYour Answer:", "background-color: #0476D0;", answer);
}

export async function readData(fullPath: string, datasetName = "") {
    const puzzle = fullPath.split("/").slice(-2).join("/").split(".")[0];
    const [day, part] = puzzle
        .split("/")
        .map((x, i) => (i === 0 ? +x.split("-")[1] : x)) as [number, "a" | "b"];
    const fileName = `${import.meta.dirname!}/${createFileName(day, part, datasetName)}`;
    const fileContent = await Deno.readTextFile(fileName);
    if(!fileContent) {
        throw new Error(`File is empty: ${fileName}`);
    }
    return cleanData(fileContent);
}

function createFileName(day: number, part: "a" | "b", dataSet?: string) {
    return join(
        `day-${day}`,
        `${part}.data${dataSet ? `.${dataSet}` : ""}.txt`,
    );
}

function cleanData(fileContent: string): string[] {
    return fileContent.split("\n").map((x) => x.replace("\r", "").trim());
}

function getDatasetNameFromFlags(): string | undefined {
    const flags = parseArgs(Deno.args, {
        string: ["dataset"],
    });
    return flags.dataset;
}