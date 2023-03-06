"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlternateFontKey = void 0;
const TransformedKey_1 = require("./TransformedKey");
class AlternateFontKey extends TransformedKey_1.TransformedKey {
    get header() {
        return `${this.base.header}\n$font = "Noto Sans Symbols";`;
    }
}
exports.AlternateFontKey = AlternateFontKey;
