import { ExtraTallKey } from "./ExtraTallKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { TransformedKey } from "./TransformedKey";

export class Spacebar extends ExtraTallKey {
    constructor() {
        super(new TransformedKey(new PlainSymbolKey("␣", 'space'), ["inverted()"]));
    }
}