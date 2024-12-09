import { getMiddleValue } from "../helpers/array.ts";
import { runSolution } from "../helpers/solution.ts";
import { buildRuleGraph, isValidOrder } from "./a.ts";

await runSolution(day5b, import.meta.url);

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
    const ruleEnd = data.indexOf("");
    const ruleset = data.slice(0, ruleEnd);
    const graph = buildRuleGraph(ruleset);
    const pages = data.slice(ruleEnd + 1).map((pages) => pages.split(",").map(Number));
    const invalidPages = pages.filter((p) => !isValidOrder(graph, p));
    console.log(invalidPages);
    const sortedPages = invalidPages.map((p) => topologicalSort(graph, p));
    console.log(sortedPages);
    const middles = sortedPages.map(getMiddleValue);
    return middles.reduce((acc, num) => acc + num, 0);
}

function topologicalSort(graph: Map<number, Set<number>>, invalidPage: number[]): number[] {
    const inDegree = new Map<number, number>();
    const allNodes = new Set(invalidPage);

    // Initialize in-degree for all nodes
    for (const node of allNodes) {
        inDegree.set(node, 0);
    }

    // Calculate in-degrees
    for (const [_, neighbors] of graph.entries()) {
        for (const neighbor of neighbors) {
            // Only count if both nodes are in invalidSequence
            if (invalidPage.includes(neighbor)) {
                inDegree.set(neighbor, (inDegree.get(neighbor) ?? 0) + 1);
            }
        }
    }

    // Queue for nodes with no incoming edges
    // Find starting nodes (zero incoming connections)
    const queue = [...graph.keys()].filter(
        (node) => (inDegree.get(node) ?? 0) === 0,
    );

    const sortedOrder: number[] = [];
    console.log(queue);

    while (queue.length > 0) {
        const current = queue.shift()!;
        // Only add if it's in the original invalid pages
        if (allNodes.has(current)) {
            sortedOrder.push(current);
        }

        // Reduce in-degree for neighbors
        for (const neighbor of invalidPage) {
            if (graph.get(current)?.has(neighbor)) {
                const degree = inDegree.get(neighbor) ?? 0;
                inDegree.set(neighbor, degree - 1);

                if (degree === 1) {
                    queue.push(neighbor);
                }
            }
        }
    }

    // If not all nodes were sorted, there's a cycle
    return sortedOrder.length === invalidPage.length ? sortedOrder : [];
}
