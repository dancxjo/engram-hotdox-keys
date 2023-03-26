import { ExtraTallKey } from "./ExtraTallKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { Row } from "./Row";
import { TransformedKey } from "./TransformedKey";

export class Spacebar extends TransformedKey {
    constructor(row: Row = Row.Thumbs) {
        super(new ExtraTallKey(new PlainSymbolKey("␣", row, 'space')), ['inverted()']);
        this.font = 'Noto Sans Symbols 2';
    }

    get header() {
        return super.header + '\n$inverted_dish=true; $dish_type="sideways cylindrical";\n';
    }
}