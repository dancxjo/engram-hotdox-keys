"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtraTallKey = void 0;
const TransformedKey_1 = require("./TransformedKey");
class ExtraTallKey extends TransformedKey_1.TransformedKey {
    constructor(base) {
        super(base, [
            "2uh()",
            "stabilized()"
        ]);
        this.base = base;
    }
}
exports.ExtraTallKey = ExtraTallKey;
