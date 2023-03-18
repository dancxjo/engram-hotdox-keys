import { ExtraTallKey } from "./ExtraTallKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { TransformedKey } from "./TransformedKey";

export class Spacebar extends ExtraTallKey {
    constructor(row = 5) {
        super(new TransformedKey(new PlainSymbolKey("␣", row, 'space'), ["inverted()"]));
    }
}