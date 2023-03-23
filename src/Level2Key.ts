import { Level1Key } from "./Level1Key";
import { Row } from "./Row";

export class Level2Key extends Level1Key {
    constructor(protected level1: string, protected level2: string, row = Row.Unknown, id?: string) {
        super(level1, row, id);
    }

    get transformations(): string[] {
        return [
            `legend("${this.level1}", [-0.4, 1], ${this.fontSize})`,
            `legend("${this.level2}", [-0.4, -0.9], ${Math.floor(this.fontSize * 0.85)})`
        ];
    }
}