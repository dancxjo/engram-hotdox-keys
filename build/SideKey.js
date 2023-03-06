"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SideKey = void 0;
const TransformedKey_1 = require("./TransformedKey");
class SideKey extends TransformedKey_1.TransformedKey {
    constructor(base) {
        super(base, ["1_5u()"]);
        this.base = base;
    }
}
exports.SideKey = SideKey;
