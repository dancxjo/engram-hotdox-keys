import { Level1Key } from "./Level1Key";

export class Level2Key extends Level1Key {
    constructor(protected level1: string, protected level2: string, row = 0, id?: string) {
        super(level1, row, id);
    }

    get transformations(): string[] {
        return [
            `legend("${this.level1}", [-0.4, 1], ${this.fontSize})`,
            `legend("${this.level2}", [-0.4, -1], ${Math.floor(this.fontSize * 0.9)})`
        ];
    }
}