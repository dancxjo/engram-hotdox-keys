import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class ExtraTallKey extends TransformedKey {
    constructor(protected base: Key) {
        super(base, [
            "2uh()",
            `stabilized(vertical=true, type="cherry_stabilizer")`,
            "rotated()",
        ]);
    }
}