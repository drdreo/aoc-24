import { Stone } from "./stone.ts";

export class StoneVisitorSlow {
  stones: Stone[] = [];

  constructor(initSequence: string[]) {
    this.stones = initSequence.map((num, pos) => new Stone(pos, num));
  }

  get length(): number {
    return this.stones.length;
  }

  print(): string[] {
    return this.stones.map((stone) => stone.num);
  }

  blink(): void {
    for (let i = this.stones.length - 1; i >= 0; i--) {
      this.visit(this.stones[i]);
    }
  }

  visit(stone: Stone): void {
    if (stone.num == "0") {
      stone.num = "1";
    } else if (stone.num.length % 2 === 0) {
      const half = stone.num.length / 2;
      const first = stone.num.slice(0, half);
      const second = stone.num.slice(half);
      stone.num = first;
      this.generateStone(stone.pos + 1, String(Number(second)));
    } else {
      stone.num = "" + Number(stone.num) * 2024;
    }
  }

  generateStone(pos: number, num: string) {
    this.stones.splice(pos, 0, new Stone(pos, num));
    // fix indexes
    for (let i = pos + 1; i < this.stones.length; i++) {
      this.stones[i].pos++;
    }
  }
}
