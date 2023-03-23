import { ExtraTallKey } from "./ExtraTallKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { TransformedKey } from "./TransformedKey";

export class Spacebar extends ExtraTallKey {
    constructor(row = 5) {
        super(new TransformedKey(new PlainSymbolKey("␣", row, 'space'), ['inverted()']));
    }

    get header() {
        return super.header + '\n$inverted_dish=true; $dish_type="sideways cylindrical";\n';
    }
}