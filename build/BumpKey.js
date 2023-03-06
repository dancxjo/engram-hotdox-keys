"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BumpKey = void 0;
const TransformedKey_1 = require("./TransformedKey");
class BumpKey extends TransformedKey_1.TransformedKey {
    constructor(base) {
        super(base, ["bump()"]);
        this.base = base;
    }
}
exports.BumpKey = BumpKey;
