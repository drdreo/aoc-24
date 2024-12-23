type Point = [number, number];

export type Region = { area: number; perimeter: number; type?: string };

export class GardenAnalyzer {
  private visited: Set<string> = new Set();

  constructor(private grid: string[][]) {
  }

  findRegions() {
    const regions: Region[] = [];

    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (!this.visited.has(`${y},${x}`)) {
          const type = this.grid[y][x];
          const { area, perimeter } = this.exploreRegion(y, x);
          regions.push({
            type,
            area,
            perimeter,
          });
        }
      }
    }

    return regions;
  }

  private exploreRegion(row: number, col: number): Region {
    const type = this.grid[row][col];
    const queue: Point[] = [[row, col]];
    let area = 0;
    let perimeter = 0;

    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      const key = `${r},${c}`;

      if (this.visited.has(key)) {
        continue;
      }

      this.visited.add(key);
      area++;

      // Check all 4 directions
      const dirs = [
        [0, 1], // right
        [0, -1], // left
        [1, 0], // up
        [-1, 0], // down
      ];

      for (const [dr, dc] of dirs) {
        const nr = r + dr;
        const nc = c + dc;

        if (this.isValidCell(nr, nc)) {
          if (this.grid[nr][nc] === type) {
            queue.push([nr, nc]);
          }
        } else {
          perimeter++;
        }

        // Count edge if neighbor is different type
        if (this.isValidCell(nr, nc) && this.grid[nr][nc] !== type) {
          perimeter++;
        }
      }
    }

    return { area, perimeter };
  }

  private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.grid.length &&
      col >= 0 && col < this.grid[0].length;
  }
}
