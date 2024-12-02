import {parseArgs} from "@std/cli/parse-args";

export async function runSolution(
    solution: (data: string[]) => any,
    dir: string,
) {
    const dataset = getDatasetNameFromFlags();
    const data = await readData(dir, dataset);
    const answer = await solution(data);

    const isAnswerArray = Array.isArray(answer);
    console.log("%cYour Answer:", "background-color: #0476D0;", ...(isAnswerArray ? answer : [answer]));
}

export async function readData(fullPath: string, datasetName = "") {
    const path = new URL(fullPath.split("/").slice(0, -1).join("/")).pathname.substring(1);

    const puzzle = fullPath.split("/").slice(-2).join("/").split(".")[0];
    const [_, part] = puzzle
        .split("/")
        .map((x, i) => (i === 0 ? +x.split("-")[1] : x)) as [number, "a" | "b"];
    const fileName = `${path}/${createFileName(part, datasetName)}`;
    const fileContent = await Deno.readTextFile(fileName);
    if (!fileContent) {
        throw new Error(`File is empty: ${fileName}`);
    }
    return cleanData(fileContent);
}

function createFileName(part: "a" | "b", dataSet?: string) {
    return `${part}.data${dataSet ? `.${dataSet}` : ""}.txt`;
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