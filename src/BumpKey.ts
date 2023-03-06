import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class BumpKey extends TransformedKey {
    constructor(protected base: Key) {
        super(base, ["bump()"]);
    }
}