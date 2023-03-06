"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level2Key = void 0;
const Level1Key_1 = require("./Level1Key");
class Level2Key extends Level1Key_1.Level1Key {
    constructor(level1, level2, id) {
        super(level1, id);
        this.level1 = level1;
        this.level2 = level2;
    }
    get transformations() {
        return [
            `legend("${this.level1}", [0, 1], ${this.fontSize})`,
            `legend("${this.level2}", [0, -1], ${Math.floor(this.fontSize * 0.75)})`
        ];
    }
}
exports.Level2Key = Level2Key;
