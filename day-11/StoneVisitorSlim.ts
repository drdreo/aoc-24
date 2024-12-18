export class StoneVisitorSlim {
  stoneCounts: Map<number, number> = new Map();
  cache: Map<number, number[]> = new Map();

  constructor(initSequence: string[]) {
    for (const num of initSequence) {
      const n = Number(num);
      this.stoneCounts.set(n, (this.stoneCounts.get(n) || 0) + 1);
    }
  }

  get length(): number {
    let stones = 0;
    this.stoneCounts.forEach((count) => {
      stones += count;
    });
    return stones;
  }

  print(): number[] {
    return Array.from(this.stoneCounts.keys());
  }

  blink(): void {
    const newCounts: Map<number, number> = new Map();

    for (const [stone, count] of this.stoneCounts) {
      const transformed = this.visit(stone);

      for (const newStone of transformed) {
        newCounts.set(newStone, (newCounts.get(newStone) || 0) + count);
      }
    }

    this.stoneCounts = newCounts;
  }

  visit(num: number): number[] {
    if (this.cache.has(num)) {
      return this.cache.get(num)!;
    }

    let result: number[];
    const numS = String(num);
    if (numS === "0") {
      result = [1];
    } else if (numS.length % 2 === 0) {
      const half = numS.length / 2;
      const first = Number(numS.substring(0, half));
      const second = Number(numS.substring(half));
      result = [first, second];
    } else {
      result = [Number(num) * 2024];
    }

    this.cache.set(num, result);
    return result;
  }
}
