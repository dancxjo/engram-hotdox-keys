"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level1Key = void 0;
const Key_1 = require("./Key");
class Level1Key extends Key_1.Key {
    constructor(level1, id) {
        super();
        this.level1 = level1;
        this.fontSize = 6;
        this.id = id || level1;
    }
    get transformations() {
        return [`legend("${this.level1}", [0, 0], ${this.fontSize})`];
    }
}
exports.Level1Key = Level1Key;
