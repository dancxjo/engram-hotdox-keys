import { ExtraTallKey } from "./ExtraTallKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { TransformedKey } from "./TransformedKey";

export class Spacebar extends ExtraTallKey {
    constructor(row = 5) {
        super(new PlainSymbolKey("␣", row, 'space'));
    }

    get header() {
        return super.header + '\n$dish_type = "cylindrical";\n';
    }
}