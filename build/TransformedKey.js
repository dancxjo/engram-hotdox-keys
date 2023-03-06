"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformedKey = void 0;
const Key_1 = require("./Key");
class TransformedKey extends Key_1.Key {
    constructor(base, extraTransformations = []) {
        super();
        this.base = base;
        this.extraTransformations = extraTransformations;
        this.id = base.id;
    }
    get header() {
        return this.base.header;
    }
    get transformations() {
        return [
            ...this.base.transformations,
            ...this.extraTransformations
        ];
    }
    get coda() {
        return this.base.coda;
    }
}
exports.TransformedKey = TransformedKey;
