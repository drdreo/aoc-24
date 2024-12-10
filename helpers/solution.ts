import { assert } from "@std/assert";
import { parseArgs } from "@std/cli/parse-args";

export async function runSolution(
    solution: (data: string[]) => any,
    dir: string,
) {
    const dataset = getDatasetNameFromFlags();
    console.log(`%cRunning ${dataset ?? ""} solution for ${dir}`, "background-color: #333; color: white;");
    const data = await readData(dir, dataset);
    const answer = await solution(data);

    const isAnswerArray = Array.isArray(answer);
    const answerColor = dataset === "sample" ? "#0476D0" : "red";
    const answerType = dataset === "sample" ? "Sample Answer" : "Answer";
    console.log(`%c${answerType}:`, `background-color: ${answerColor};`, ...(isAnswerArray ? answer : [answer]));
}

export async function readData(fullPath: string, datasetName = "") {
    const path = new URL(fullPath.split("/").slice(0, -1).join("/")).pathname.substring(1);

    const puzzle = fullPath.split("/").slice(-2).join("/").split(".")[0];
    const [_, part] = puzzle
        .split("/")
        .map((x, i) => (i === 0 ? +x.split("-")[1] : x)) as [number, "a" | "b"];
    const fileName = `${path}/${createFileName(part, datasetName)}`;
    const fileContent = await Deno.readTextFile(fileName);
    assert(fileContent, "File is empty");
    return cleanData(fileContent);
}

function createFileName(part: "a" | "b", dataSet?: string) {
    return `${part}.data${dataSet ? `.${dataSet}` : ""}.txt`;
}

function cleanData(fileContent: string): string[] {
    return fileContent.split("\n").map((x) => x.replace("\r", "").trim());
}

function getDatasetNameFromFlags(): "sample" | undefined {
    const flags = parseArgs(Deno.args, {
        string: ["real"],
    });
    console.log(flags);
    return typeof flags.real === "string" ? undefined : "sample";
}
