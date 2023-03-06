"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleKey = void 0;
const TransformedKey_1 = require("./TransformedKey");
class MiddleKey extends TransformedKey_1.TransformedKey {
    constructor(base) {
        super(base, ["1_5uh()"]);
        this.base = base;
    }
}
exports.MiddleKey = MiddleKey;
