import { Key } from "./Key";
import { Level1Key } from "./Level1Key";
import { Row } from "./Row";

export class Level2Key extends Level1Key {
    protected fontSize2: number | undefined = undefined;
    constructor(protected level1: string, protected level2: string, row = Row.Unknown, id?: string) {
        super(level1, row, id);
    }

    get transformations(): string[] {
        const fontSize2 = this.fontSize2 ?? Math.floor(this.fontSize * 0.85);
        return [
            `legend("${this.level1}", [-0.4, 1], ${this.fontSize})`,
            `legend("${this.level2}", [-0.4, -0.9], ${fontSize2})`
        ];
    }

    size2(size: number): Key {
        this.fontSize2 = size;
        return this;
    }

}