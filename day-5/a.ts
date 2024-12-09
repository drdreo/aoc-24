import { getMiddleValue } from "../helpers/array.ts";
import { runSolution } from "../helpers/solution.ts";

/** provide your solution as the return of this function */
if (import.meta.main) {
    await runSolution(day5a, import.meta.url);
}

export async function day5a(data: string[]) {
    const ruleEnd = data.indexOf("");
    const ruleset = data.slice(0, ruleEnd);
    const graph = buildRuleGraph(ruleset);
    const pages = data.slice(ruleEnd + 1).map((pages) => pages.split(",").map(Number));
    const validPages = pages.filter((p) => isValidOrder(graph, p));
    const middles = validPages.map(getMiddleValue);
    return middles.reduce((acc, num) => acc + num, 0);
}

export function buildRuleGraph(rules: string[]): Map<number, Set<number>> {
    const graph = new Map<number, Set<number>>();
    for (const rule of rules) {
        const [a, b] = rule.split("|").map(Number);
        if (!graph.has(a)) graph.set(a, new Set());
        if (!graph.has(b)) graph.set(b, new Set());
        graph.get(a)!.add(b);
    }
    return graph;
}

export function isValidOrder(graph: Map<number, Set<number>>, pageOrder: number[]): boolean {
    const pagePositions = new Map(pageOrder.map((page, index) => [page, index]));

    for (const [a, after] of graph.entries()) {
        if (!pagePositions.has(a)) {
            continue;
        }

        for (const b of after) {
            if (!pagePositions.has(b)) {
                continue;
            }
            if ((pagePositions.get(a) ?? -1) >= (pagePositions.get(b) ?? -1)) {
                return false;
            }
        }
    }
    return true;
}
