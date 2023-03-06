"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
const fs_1 = require("fs");
class Key {
    get header() {
        return `include <../includes.scad>;
        $font = "Noto Sans";
        key_profile="dsa";
        row=3;
        stem_type="cherry";
        `;
    }
    get coda() {
        return ``;
    }
    getScad() {
        return [
            this.header,
            [
                ...this.transformations,
                'key();'
            ].join('\n\t'),
            this.coda
        ].join('\n');
    }
    writeScadFile() {
        (0, fs_1.writeFileSync)(`./scad/${this.id}.scad`, this.getScad());
    }
}
exports.Key = Key;
