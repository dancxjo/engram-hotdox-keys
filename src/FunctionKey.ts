import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class FunctionKey extends TransformedKey {
    constructor(protected base: Key, protected level3: string) {
        super(base, [`legend("${level3}", [0.75, 1], 3)`]);
    }
}