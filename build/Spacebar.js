"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spacebar = void 0;
const ExtraTallKey_1 = require("./ExtraTallKey");
const PlainSymbolKey_1 = require("./PlainSymbolKey");
const TransformedKey_1 = require("./TransformedKey");
class Spacebar extends ExtraTallKey_1.ExtraTallKey {
    constructor() {
        super(new TransformedKey_1.TransformedKey(new PlainSymbolKey_1.PlainSymbolKey("␣", 'space'), ["inverted()"]));
    }
}
exports.Spacebar = Spacebar;
