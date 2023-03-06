import { Level1Key } from "./Level1Key";

export class Level2Key extends Level1Key {
    constructor(protected level1: string, protected level2: string, id?: string) {
        super(level1, id);
    }

    get transformations(): string[] {
        return [
            `legend("${this.level1}", [0, 1], ${this.fontSize})`,
            `legend("${this.level2}", [0, -1], ${this.fontSize} * 0.8)`
        ];
    }
}