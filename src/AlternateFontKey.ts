import { Key } from "./Key";
import { TransformedKey } from "./TransformedKey";

export class AlternateFontKey extends TransformedKey {
    get header(): string {
        return `${this.base.header}\n$font = "Noto Sans Symbols:style=bold";`;
    }
}