"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlainSymbolKey = void 0;
const Level1Key_1 = require("./Level1Key");
class PlainSymbolKey extends Level1Key_1.Level1Key {
    constructor() {
        super(...arguments);
        this.fontSize = 8;
    }
}
exports.PlainSymbolKey = PlainSymbolKey;
