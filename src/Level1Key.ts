import { Key } from "./Key";

export class Level1Key extends Key {
    protected fontSize = 5;
    readonly id: string;

    constructor(protected level1: string, id?: string) {
        super();
        this.id = id || level1;
    }


    get transformations(): string[] {
        return [`legend("${this.level1}", [0, 0], ${this.fontSize})`];
    }
}