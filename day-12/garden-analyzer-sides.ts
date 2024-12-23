type Point = [number, number];

export type Region = { area: number; sides: number; type: string };

export class GardenAnalyzerSides {
  private visited: Set<string> = new Set();

  constructor(private grid: string[][]) {
  }

  findRegions() {
    const regions: Region[] = [];

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (!this.visited.has(`${y},${x}`)) {
          const cells = this.floodFill(y, x);
          if (cells.length > 0) {
            const type = this.grid[y][x];
            const sides = this.countSides(cells);
            regions.push({
              type,
              area: cells.length,
              sides,
            });
          }
        }
      }
    }

    return regions;
  }

  private floodFill(row: number, col: number): Point[] {
    const cells: Point[] = [];
    const queue: Point[] = [[row, col]];
    const type = this.grid[row][col];

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      const key = `${r},${c}`;

      if (this.visited.has(key)) continue;
      this.visited.add(key);
      cells.push([r, c]);

      const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;

        if (
          this.isValidCell(nr, nc) &&
          this.grid[nr][nc] === type &&
          !this.visited.has(`${nr},${nc}`)
        ) {
          queue.push([nr, nc]);
        }
      }
    }
    return cells;
  }

  private countSides(cells: Point[]): number {
    // Create a set of boundary edges
    const boundaries = new Set<string>();
    const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const cellSet = new Set(cells.map(([r, c]) => `${r},${c}`));

    // Find all boundary edges
    for (const [row, col] of cells) {
      for (const [dr, dc] of dirs) {
        const nr = row + dr;
        const nc = col + dc;
        if (
          !cellSet.has(`${nr},${nc}`)
        ) {
          // Track edge direction for this boundary
          boundaries.add(`${row},${col},${dr},${dc}`);
        }
      }
    }

    // Count continuous sides by following edges
    let sides = 0;
    const visited = new Set<string>();

    for (const edge of boundaries) {
      if (visited.has(edge)) continue;

      // Follow this edge until direction changes
      // Traverse the boundary starting from this edge
      let currentEdge = edge;
      while (currentEdge) {
        visited.add(currentEdge);
        const [r, c, dr, dc] = currentEdge.split(",").map(Number);

        // Look for the next valid edge
        let foundNext = false;
        for (const [nR, nC] of dirs) {
          const nextEdge = `${r + nR},${c + nC},${dr},${dc}`;
          if (boundaries.has(nextEdge) && !visited.has(nextEdge)) {
            currentEdge = nextEdge;
            foundNext = true;
            break;
          }
        }

        // If no valid next edge is found, stop the traversal
        if (!foundNext) {
          currentEdge = null;
        }
      }

      sides++;
    }

    return sides;
  }

  private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.grid.length &&
      col >= 0 && col < this.grid[0].length;
  }
}
