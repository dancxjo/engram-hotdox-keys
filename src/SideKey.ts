import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class SideKey extends TransformedKey {
    constructor(protected base: Key) {
        super(base, ["1_5u()"]);
    }
}