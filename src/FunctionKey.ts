import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class FunctionKey extends TransformedKey {
    constructor(protected base: Key, protected level3: string, protected fontSize3 = 4.5) {
        super(base, [`legend("${level3}", [0.8, 1.1], ${fontSize3})`]);
    }

    size3(size: number): Key {
        this.fontSize3 = size;
        return this;
    }
}