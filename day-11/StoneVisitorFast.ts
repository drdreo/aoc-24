// runs out of heap memory
export class StoneVisitorFast {
  stones: string[] = [];
  cache: Map<string, string[]> = new Map();

  constructor(initSequence: string[]) {
    this.stones = initSequence;
  }

  get length(): number {
    return this.stones.length;
  }

  blink(): void {
    const newStones: string[] = [];
    for (const stone of this.stones) {
      const transformed = this.visit(stone);
      newStones.push(...transformed);
    }
    this.stones = newStones;
  }

  visit(num: string): string[] {
    if (this.cache.has(num)) {
      return this.cache.get(num)!;
    }

    let result: string[];
    if (num === "0") {
      result = ["1"];
    } else if (num.length % 2 === 0) {
      const half = num.length / 2;
      const first = num.slice(0, half);
      const second = String(Number(num.slice(half)));
      result = [first, second];
    } else {
      result = [String(Number(num) * 2024)];
    }

    this.cache.set(num, result);
    return result;
  }
}
