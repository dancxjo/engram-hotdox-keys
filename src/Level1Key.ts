import { Key } from "./Key";
import { Row } from "./Row";

export class Level1Key extends Key {
    protected fontSize = 5;
    readonly id: string;

    constructor(protected level1: string, public row = Row.Unknown, id?: string) {
        super();
        this.id = id || level1;
    }

    get necessaryCharacters(): string {
        return this.level1;
    }

    get transformations(): string[] {
        return [
            `legend("${this.level1}", [0, 0], ${this.fontSize})`
        ];
    }

    size(size: number): Key {
        this.fontSize = size;
        return this;
    }
}