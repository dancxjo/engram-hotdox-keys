import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class ExtraTallKey extends TransformedKey {
    constructor(protected base: Key) {
        super(base, [
            "2uh()",
            "veritcally_stabilized(type=\"cherry_stabilizer\")"
        ]);
    }
}