import { ExtraTallKey } from "./ExtraTallKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { Row } from "./Row";
import { TransformedKey } from "./TransformedKey";

export class Spacebar extends ExtraTallKey {
    constructor(row: Row = Row.Thumbs) {
        super(new TransformedKey(new PlainSymbolKey("␣", row, 'space'), ['inverted()']));
    }

    get header() {
        return super.header + '\n$inverted_dish=true; $dish_type="sideways cylindrical";\n';
    }
}