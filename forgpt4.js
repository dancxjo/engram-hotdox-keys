var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
System.register("Row", [], function (exports_1, context_1) {
    "use strict";
    var Row;
    var __moduleName = context_1 && context_1.id;
    function rowToNumber(row) {
        switch (row) {
            case Row.Numbers: return 1;
            case Row.AboveHome: return 2;
            case Row.Home: return 3;
            case Row.BelowHome: return 4;
            case Row.Mods: return 4;
            case Row.Thumbs: return 4;
            default: return 1;
        }
    }
    exports_1("rowToNumber", rowToNumber);
    return {
        setters: [],
        execute: function () {
            (function (Row) {
                Row["Numbers"] = "numbers";
                Row["AboveHome"] = "above-home";
                Row["Home"] = "home";
                Row["BelowHome"] = "below-home";
                Row["Mods"] = "mods";
                Row["Thumbs"] = "thumbs";
                Row["Unknown"] = "unknown";
            })(Row || (Row = {}));
            exports_1("Row", Row);
        }
    };
});
System.register("Font", ["fontkit", "mkdirp", "https", "unzip-stream", "fs", "path", "debug"], function (exports_2, context_2) {
    "use strict";
    var fontkit_1, mkdirp_1, https_1, unzip_stream_1, fs_1, path_1, debug_1, debug, Typeface;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (fontkit_1_1) {
                fontkit_1 = fontkit_1_1;
            },
            function (mkdirp_1_1) {
                mkdirp_1 = mkdirp_1_1;
            },
            function (https_1_1) {
                https_1 = https_1_1;
            },
            function (unzip_stream_1_1) {
                unzip_stream_1 = unzip_stream_1_1;
            },
            function (fs_1_1) {
                fs_1 = fs_1_1;
            },
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (debug_1_1) {
                debug_1 = debug_1_1;
            }
        ],
        execute: function () {
            debug = debug_1.default("font");
            Typeface = class Typeface {
                get font() {
                    if (!this.fetchedFont) {
                        throw new Error("Font not loaded");
                    }
                    return this.fetchedFont;
                }
                static fetchFonts() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return Promise.all([
                            Typeface.fromGoogle("Noto Sans", "Bold"),
                            Typeface.fromGoogle("Noto Sans Symbols", "VariableFont_wght"),
                            Typeface.fromGoogle("Noto Sans Symbols 2", "Regular"),
                        ]);
                    });
                }
                static fromGoogle(fontName, weight = "Regular") {
                    return __awaiter(this, void 0, void 0, function* () {
                        debug(`Fetching font ${fontName}`);
                        mkdirp_1.default("fonts");
                        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                            const fontfileName = `${fontName.replace(/\s+/g, "")}-${weight}.ttf`;
                            const request = https_1.get(`https://fonts.google.com/download?family=${fontName}`, (response) => {
                                response.pipe(unzip_stream_1.Parse()).on("entry", (entry) => {
                                    const file = path_1.parse(entry.path);
                                    debug(Object.assign({ fontfileName }, file));
                                    const filename = path_1.join("fonts", file.base);
                                    if (file.base === fontfileName) {
                                        entry.pipe(fs_1.createWriteStream(filename)).on("finish", () => {
                                            debug(`Fetched font ${fontName}`);
                                            resolve(new Typeface(filename));
                                        });
                                    }
                                    else {
                                        entry.autodrain();
                                    }
                                });
                            });
                            request.on("error", reject);
                        }));
                    });
                }
                constructor(filename) {
                    this.fetchedFont = undefined;
                    this.fetchedFont = fontkit_1.openSync(filename);
                }
                getScadSpecifier(style = "") {
                    var _a;
                    const name = (_a = this.font.postscriptName) !== null && _a !== void 0 ? _a : this.font.familyName;
                    const nameWithoutStyle = name.replace(/\-?(Bold|Regular|Medium)$/g, '');
                    return `${nameWithoutStyle}:style=${style}`;
                }
                supportsCharacter(character) {
                    const char = character.codePointAt(0);
                    if (!char || character.length !== 1) {
                        throw new Error("Character must be a single character");
                    }
                    return this.font.hasGlyphForCodePoint(char);
                }
                supports(characters) {
                    return [...characters].every((c) => this.supportsCharacter(c));
                }
            };
            exports_2("Typeface", Typeface);
            Typeface.fetchedFonts = Typeface.fetchFonts();
        }
    };
});
System.register("Key", ["fs", "mkdirp", "child_process", "Row", "Font"], function (exports_3, context_3) {
    "use strict";
    var fs_2, mkdirp_2, child_process_1, Row_1, Font_1, Key;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (fs_2_1) {
                fs_2 = fs_2_1;
            },
            function (mkdirp_2_1) {
                mkdirp_2 = mkdirp_2_1;
            },
            function (child_process_1_1) {
                child_process_1 = child_process_1_1;
            },
            function (Row_1_1) {
                Row_1 = Row_1_1;
            },
            function (Font_1_1) {
                Font_1 = Font_1_1;
            }
        ],
        execute: function () {
            Key = class Key {
                constructor() {
                    this.font = 'DejaVu Sans:style=Bold';
                }
                get header() {
                    return `include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.9;
$font="${this.font}";\n`;
                }
                get necessaryCharacters() {
                    return '';
                }
                determineFont() {
                    var _a;
                    return __awaiter(this, void 0, void 0, function* () {
                        const defaultFont = 'DejaVu Sans:style=Bold';
                        const characters = this.necessaryCharacters;
                        const fonts = yield Font_1.Typeface.fetchedFonts;
                        for (const font of fonts) {
                            if (font.supports(characters)) {
                                this.font = (_a = font.getScadSpecifier('Bold')) !== null && _a !== void 0 ? _a : defaultFont;
                                return;
                            }
                        }
                        this.font = defaultFont;
                    });
                }
                get coda() {
                    return ``;
                }
                setFont(font) {
                    this.font = font;
                    return this;
                }
                getScad() {
                    const transformations = [
                        `box_cherry(0.5)`,
                        `sa_row(${Row_1.rowToNumber(this.row)})`,
                        `bar_support()`,
                        // `upside_down()`,
                        ...this.transformations,
                        'key();'
                    ];
                    if (Key.rounding) {
                        transformations.unshift('rounded()');
                    }
                    return [
                        this.header,
                        transformations.join('\n\t'),
                        this.coda
                    ].join('\n');
                }
                writeScadFile() {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!this.font) {
                            yield this.determineFont();
                        }
                        mkdirp_2.mkdirpSync('./scad');
                        fs_2.writeFileSync(`./scad/${this.id}.scad`, this.getScad());
                    });
                }
                link() {
                    try {
                        mkdirp_2.mkdirpSync(`./rows/${this.row}`);
                        fs_2.linkSync(`./stl/${this.id}.stl`, `./rows/${this.row}/${this.id}.stl`);
                    }
                    catch (e) {
                        // console.error(`Couldn't link ${this.row}/${this.id}`, e);
                    }
                }
                convertSync() {
                    try {
                        mkdirp_2.mkdirpSync('./stl');
                        child_process_1.execSync(`openscad-nightly -o ./stl/${this.id}.stl ./scad/${this.id}.scad`, { stdio: 'pipe' });
                        this.link();
                    }
                    catch (e) {
                        console.error(`Couldn't convert ${this.row}/${this.id}`, e);
                    }
                }
                convert() {
                    return __awaiter(this, void 0, void 0, function* () {
                        mkdirp_2.mkdirpSync('./stl');
                        return new Promise((resolve, reject) => {
                            const conversion = child_process_1.spawn(`openscad-nightly`, `-o ./stl/${this.id}.stl ./scad/${this.id}.scad`.split(/\s+/));
                            conversion.on('close', (code) => {
                                if (code !== 0) {
                                    reject(new Error(`Openscad exited with code ${code}`));
                                }
                                this.link();
                                resolve();
                            });
                        });
                    });
                }
            };
            exports_3("Key", Key);
            Key.rounding = false;
        }
    };
});
System.register("TransformedKey", ["Key"], function (exports_4, context_4) {
    "use strict";
    var Key_1, TransformedKey;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (Key_1_1) {
                Key_1 = Key_1_1;
            }
        ],
        execute: function () {
            TransformedKey = class TransformedKey extends Key_1.Key {
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
                get row() {
                    return this.base.row;
                }
            };
            exports_4("TransformedKey", TransformedKey);
        }
    };
});
System.register("BumpKey", ["TransformedKey"], function (exports_5, context_5) {
    "use strict";
    var TransformedKey_1, BumpKey;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (TransformedKey_1_1) {
                TransformedKey_1 = TransformedKey_1_1;
            }
        ],
        execute: function () {
            BumpKey = class BumpKey extends TransformedKey_1.TransformedKey {
                constructor(base) {
                    super(base, ["bump()"]);
                    this.base = base;
                }
            };
            exports_5("BumpKey", BumpKey);
        }
    };
});
System.register("ExtraTallKey", ["TransformedKey"], function (exports_6, context_6) {
    "use strict";
    var TransformedKey_2, ExtraTallKey;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (TransformedKey_2_1) {
                TransformedKey_2 = TransformedKey_2_1;
            }
        ],
        execute: function () {
            ExtraTallKey = class ExtraTallKey extends TransformedKey_2.TransformedKey {
                constructor(base) {
                    super(base, [
                        "2uh()",
                        `stabilized(vertical=true, type="cherry_stabilizer")`,
                        "rotated()",
                    ]);
                    this.base = base;
                }
            };
            exports_6("ExtraTallKey", ExtraTallKey);
        }
    };
});
System.register("FunctionKey", ["TransformedKey"], function (exports_7, context_7) {
    "use strict";
    var TransformedKey_3, FunctionKey;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (TransformedKey_3_1) {
                TransformedKey_3 = TransformedKey_3_1;
            }
        ],
        execute: function () {
            FunctionKey = class FunctionKey extends TransformedKey_3.TransformedKey {
                constructor(base, level3, fontSize3 = 4.5) {
                    super(base, [`legend("${level3}", [0.8, 1.1], ${fontSize3})`]);
                    this.base = base;
                    this.level3 = level3;
                    this.fontSize3 = fontSize3;
                }
                get necessaryCharacters() {
                    return this.base.necessaryCharacters + this.level3;
                }
                size3(size) {
                    this.fontSize3 = size;
                    return this;
                }
            };
            exports_7("FunctionKey", FunctionKey);
        }
    };
});
System.register("Level1Key", ["Key", "Row"], function (exports_8, context_8) {
    "use strict";
    var Key_2, Row_2, Level1Key;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (Key_2_1) {
                Key_2 = Key_2_1;
            },
            function (Row_2_1) {
                Row_2 = Row_2_1;
            }
        ],
        execute: function () {
            Level1Key = class Level1Key extends Key_2.Key {
                constructor(level1, row = Row_2.Row.Unknown, id) {
                    super();
                    this.level1 = level1;
                    this.row = row;
                    this.fontSize = 5;
                    this.id = id || level1;
                }
                get necessaryCharacters() {
                    return this.level1;
                }
                get transformations() {
                    return [
                        `legend("${this.level1}", [0, 0], ${this.fontSize})`
                    ];
                }
                size(size) {
                    this.fontSize = size;
                    return this;
                }
            };
            exports_8("Level1Key", Level1Key);
        }
    };
});
System.register("Level2Key", ["Level1Key", "Row"], function (exports_9, context_9) {
    "use strict";
    var Level1Key_1, Row_3, Level2Key;
    var __moduleName = context_9 && context_9.id;
    return {
        setters: [
            function (Level1Key_1_1) {
                Level1Key_1 = Level1Key_1_1;
            },
            function (Row_3_1) {
                Row_3 = Row_3_1;
            }
        ],
        execute: function () {
            Level2Key = class Level2Key extends Level1Key_1.Level1Key {
                constructor(level1, level2, row = Row_3.Row.Unknown, id) {
                    super(level1, row, id);
                    this.level1 = level1;
                    this.level2 = level2;
                    this.fontSize2 = undefined;
                }
                get necessaryCharacters() {
                    return super.necessaryCharacters + this.level2;
                }
                get transformations() {
                    var _a;
                    const fontSize2 = (_a = this.fontSize2) !== null && _a !== void 0 ? _a : Math.floor(this.fontSize * 0.85);
                    return [
                        `legend("${this.level1}", [-0.4, 1], ${this.fontSize})`,
                        `legend("${this.level2}", [-0.4, -0.9], ${fontSize2})`
                    ];
                }
                size2(size) {
                    this.fontSize2 = size;
                    return this;
                }
            };
            exports_9("Level2Key", Level2Key);
        }
    };
});
System.register("MiddleKey", ["TransformedKey"], function (exports_10, context_10) {
    "use strict";
    var TransformedKey_4, MiddleKey;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (TransformedKey_4_1) {
                TransformedKey_4 = TransformedKey_4_1;
            }
        ],
        execute: function () {
            MiddleKey = class MiddleKey extends TransformedKey_4.TransformedKey {
                constructor(base) {
                    super(base, ["1_5uh()", "rotated()"]);
                    this.base = base;
                }
            };
            exports_10("MiddleKey", MiddleKey);
        }
    };
});
System.register("PlainSymbolKey", ["Level1Key"], function (exports_11, context_11) {
    "use strict";
    var Level1Key_2, PlainSymbolKey;
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (Level1Key_2_1) {
                Level1Key_2 = Level1Key_2_1;
            }
        ],
        execute: function () {
            PlainSymbolKey = class PlainSymbolKey extends Level1Key_2.Level1Key {
                constructor() {
                    super(...arguments);
                    this.fontSize = 8;
                }
            };
            exports_11("PlainSymbolKey", PlainSymbolKey);
        }
    };
});
System.register("SideKey", ["TransformedKey"], function (exports_12, context_12) {
    "use strict";
    var TransformedKey_5, SideKey;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (TransformedKey_5_1) {
                TransformedKey_5 = TransformedKey_5_1;
            }
        ],
        execute: function () {
            SideKey = class SideKey extends TransformedKey_5.TransformedKey {
                constructor(base) {
                    super(base, ["1_5u()"]);
                    this.base = base;
                }
            };
            exports_12("SideKey", SideKey);
        }
    };
});
System.register("Spacebar", ["ExtraTallKey", "PlainSymbolKey", "Row", "TransformedKey"], function (exports_13, context_13) {
    "use strict";
    var ExtraTallKey_1, PlainSymbolKey_1, Row_4, TransformedKey_6, Spacebar;
    var __moduleName = context_13 && context_13.id;
    return {
        setters: [
            function (ExtraTallKey_1_1) {
                ExtraTallKey_1 = ExtraTallKey_1_1;
            },
            function (PlainSymbolKey_1_1) {
                PlainSymbolKey_1 = PlainSymbolKey_1_1;
            },
            function (Row_4_1) {
                Row_4 = Row_4_1;
            },
            function (TransformedKey_6_1) {
                TransformedKey_6 = TransformedKey_6_1;
            }
        ],
        execute: function () {
            Spacebar = class Spacebar extends TransformedKey_6.TransformedKey {
                constructor(row = Row_4.Row.Thumbs) {
                    super(new ExtraTallKey_1.ExtraTallKey(new PlainSymbolKey_1.PlainSymbolKey("␣", row, 'space')), ['inverted()']);
                    this.font = 'Noto Sans Symbols 2';
                }
                get header() {
                    return super.header + '\n$inverted_dish=true; $dish_type="sideways cylindrical";\n';
                }
            };
            exports_13("Spacebar", Spacebar);
        }
    };
});
System.register("layout", ["BumpKey", "ExtraTallKey", "Level1Key", "Level2Key", "MiddleKey", "PlainSymbolKey", "SideKey", "Spacebar", "FunctionKey", "Row"], function (exports_14, context_14) {
    "use strict";
    var BumpKey_1, ExtraTallKey_2, Level1Key_3, Level2Key_1, MiddleKey_1, PlainSymbolKey_2, SideKey_1, Spacebar_1, FunctionKey_1, Row_5, rows, numberSymbols, keys, fontsDetermined;
    var __moduleName = context_14 && context_14.id;
    return {
        setters: [
            function (BumpKey_1_1) {
                BumpKey_1 = BumpKey_1_1;
            },
            function (ExtraTallKey_2_1) {
                ExtraTallKey_2 = ExtraTallKey_2_1;
            },
            function (Level1Key_3_1) {
                Level1Key_3 = Level1Key_3_1;
            },
            function (Level2Key_1_1) {
                Level2Key_1 = Level2Key_1_1;
            },
            function (MiddleKey_1_1) {
                MiddleKey_1 = MiddleKey_1_1;
            },
            function (PlainSymbolKey_2_1) {
                PlainSymbolKey_2 = PlainSymbolKey_2_1;
            },
            function (SideKey_1_1) {
                SideKey_1 = SideKey_1_1;
            },
            function (Spacebar_1_1) {
                Spacebar_1 = Spacebar_1_1;
            },
            function (FunctionKey_1_1) {
                FunctionKey_1 = FunctionKey_1_1;
            },
            function (Row_5_1) {
                Row_5 = Row_5_1;
            }
        ],
        execute: function () {
            rows = {
                [Row_5.Row.AboveHome]: "BYOULWV".split(""),
                [Row_5.Row.Home]: "CIEN".split(""),
                [Row_5.Row.BelowHome]: "GXJKRMFP".split(""),
            };
            numberSymbols = "*|=~+<>^&%".split("");
            exports_14("keys", keys = [
                // Letter keys
                new BumpKey_1.BumpKey(new Level1Key_3.Level1Key("A", Row_5.Row.Home)),
                new FunctionKey_1.FunctionKey(new BumpKey_1.BumpKey(new Level1Key_3.Level1Key("H", Row_5.Row.Home)), "←"),
                new FunctionKey_1.FunctionKey(new Level1Key_3.Level1Key("T", Row_5.Row.Home), "↓"),
                new FunctionKey_1.FunctionKey(new Level1Key_3.Level1Key("S", Row_5.Row.Home), "→"),
                new FunctionKey_1.FunctionKey(new Level1Key_3.Level1Key("D", Row_5.Row.AboveHome), "↑"),
                new SideKey_1.SideKey(new Level1Key_3.Level1Key("Z", Row_5.Row.AboveHome)),
                new SideKey_1.SideKey(new Level1Key_3.Level1Key("Q", Row_5.Row.Home)),
                ...rows[Row_5.Row.AboveHome].map((letter) => new Level1Key_3.Level1Key(letter, Row_5.Row.AboveHome)),
                ...rows[Row_5.Row.Home].map((letter) => new Level1Key_3.Level1Key(letter, Row_5.Row.Home)),
                ...rows[Row_5.Row.BelowHome].map((letter) => new Level1Key_3.Level1Key(letter, Row_5.Row.BelowHome)),
                // Row Row.Numbers
                ...numberSymbols.map((symbol, i) => new Level2Key_1.Level2Key(`${i}`, symbol, Row_5.Row.Numbers)),
                new Level2Key_1.Level2Key("⌃", "⌘", Row_5.Row.Numbers, "helm_swap").size(7),
                new Level2Key_1.Level2Key("⎉", "⎊", Row_5.Row.Numbers, "pause"),
                // Central punctuation
                new Level2Key_1.Level2Key("'", "(", Row_5.Row.AboveHome, "apostrophe"),
                new Level2Key_1.Level2Key('\\"', ")", Row_5.Row.AboveHome, "quote"),
                new Level2Key_1.Level2Key(",", ";", Row_5.Row.Home, "comma"),
                new Level2Key_1.Level2Key(".", ":", Row_5.Row.Home, "period"),
                new Level2Key_1.Level2Key("-", "_", Row_5.Row.BelowHome, "minus").size(6),
                new Level2Key_1.Level2Key("?", "!", Row_5.Row.BelowHome, "question"),
                // Middle keys
                new MiddleKey_1.MiddleKey(new Level2Key_1.Level2Key("/", "\\\\", Row_5.Row.BelowHome, "slash")),
                new MiddleKey_1.MiddleKey(new Level2Key_1.Level2Key("@", "`", Row_5.Row.AboveHome, "at").size2(6)),
                new MiddleKey_1.MiddleKey(new Level2Key_1.Level2Key("#", "$", Row_5.Row.AboveHome, "hash")),
                new MiddleKey_1.MiddleKey(new PlainSymbolKey_2.PlainSymbolKey("⎙", Row_5.Row.BelowHome, "prscr").setFont('NotoSansSymbols:style=bold')),
                // Thumb keys (extra tall)
                new Spacebar_1.Spacebar(Row_5.Row.Thumbs),
                new ExtraTallKey_2.ExtraTallKey(new PlainSymbolKey_2.PlainSymbolKey("↵", Row_5.Row.Thumbs, "return")),
                new ExtraTallKey_2.ExtraTallKey(new PlainSymbolKey_2.PlainSymbolKey("⌫", Row_5.Row.Thumbs, "backspace").setFont('NotoSansSymbols2:style=bold')),
                new ExtraTallKey_2.ExtraTallKey(new PlainSymbolKey_2.PlainSymbolKey("⎋", Row_5.Row.Thumbs, "escape").setFont('NotoSansSymbols:style=bold')),
                // Thumb keys (normal height)
                new PlainSymbolKey_2.PlainSymbolKey("⇧", Row_5.Row.Thumbs, "shift_left"),
                new PlainSymbolKey_2.PlainSymbolKey("⇧", Row_5.Row.Thumbs, "shift_right"),
                new PlainSymbolKey_2.PlainSymbolKey("⇞", Row_5.Row.Thumbs, "pageup"),
                new PlainSymbolKey_2.PlainSymbolKey("⇟", Row_5.Row.Thumbs, "pagedown"),
                new PlainSymbolKey_2.PlainSymbolKey("↖", Row_5.Row.Thumbs, "home"),
                new PlainSymbolKey_2.PlainSymbolKey("↘", Row_5.Row.Thumbs, "end"),
                new PlainSymbolKey_2.PlainSymbolKey("⌦", Row_5.Row.Thumbs, "delete").setFont('NotoSansSymbols2:style=bold'),
                new PlainSymbolKey_2.PlainSymbolKey("⎀", Row_5.Row.Thumbs, "insert"),
                // Side keys
                new SideKey_1.SideKey(new PlainSymbolKey_2.PlainSymbolKey("⇧", Row_5.Row.BelowHome, "shift_pseudo_left")),
                new SideKey_1.SideKey(new PlainSymbolKey_2.PlainSymbolKey("⇧", Row_5.Row.BelowHome, "shift_pseudo_right")),
                new SideKey_1.SideKey(new Level2Key_1.Level2Key("⇥", "⇤", Row_5.Row.AboveHome, "tab")),
                new SideKey_1.SideKey(new PlainSymbolKey_2.PlainSymbolKey("⇬", Row_5.Row.Home, "capslock")),
                new SideKey_1.SideKey(new Level2Key_1.Level2Key("[", "{", Row_5.Row.Numbers, "bracket_left").size(4)),
                new SideKey_1.SideKey(new Level2Key_1.Level2Key("]", "}", Row_5.Row.Numbers, "bracket_right").size(4)),
                // Bottom row
                new Level1Key_3.Level1Key("ƒ₁", Row_5.Row.Mods, "layer1"),
                new Level1Key_3.Level1Key("ƒ₂", Row_5.Row.Mods, "layer2"),
                new Level1Key_3.Level1Key("qw", Row_5.Row.Mods, "qwerty").size(4),
                new Level1Key_3.Level1Key("ƒ₃", Row_5.Row.Mods, "layer3"),
                // Two helm keys (opposite pinkies)
                new PlainSymbolKey_2.PlainSymbolKey("⎈", Row_5.Row.Mods, "helm"),
                new PlainSymbolKey_2.PlainSymbolKey("⌃", Row_5.Row.Mods, "control"),
                // Two super keys (opposite thumbs)
                new PlainSymbolKey_2.PlainSymbolKey("❖", Row_5.Row.Mods, "super"),
                new PlainSymbolKey_2.PlainSymbolKey("⎄", Row_5.Row.Mods, "compose").size(5),
                // Two alt keys (opposite thumbs)
                new PlainSymbolKey_2.PlainSymbolKey("⎇", Row_5.Row.Mods, "alt"),
                new PlainSymbolKey_2.PlainSymbolKey("⇮", Row_5.Row.Mods, "altgr"),
            ]);
            exports_14("fontsDetermined", fontsDetermined = Promise.all(keys.map((key) => key.determineFont())));
            keys.sort((a, b) => Row_5.rowToNumber(a.row) - Row_5.rowToNumber(b.row) || a.id.localeCompare(b.id));
        }
    };
});
System.register("process", ["cli-progress", "layout", "debug"], function (exports_15, context_15) {
    "use strict";
    var cli_progress_1, layout_1, debug_2, debug;
    var __moduleName = context_15 && context_15.id;
    function processKeysSync(inclusionPattern = /.+/) {
        return __awaiter(this, void 0, void 0, function* () {
            const filteredKeys = layout_1.keys.filter(key => inclusionPattern.test(key.id));
            const bar = new cli_progress_1.SingleBar({
                clearOnComplete: false,
                hideCursor: false,
                format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
            }, cli_progress_1.Presets.shades_grey);
            bar.start(filteredKeys.length, 0, { task: filteredKeys[0].id });
            for (const [i, key] of filteredKeys.entries()) {
                bar.update(i, { task: `Working on ${key.id}...` });
                yield key.writeScadFile();
                key.convertSync();
                bar.increment();
            }
            bar.stop();
        });
    }
    exports_15("processKeysSync", processKeysSync);
    function processKeys(inclusionPattern = /.+/, batchSize = 5) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const filteredKeys = layout_1.keys.filter(key => inclusionPattern.test(key.id));
            const errors = [];
            const jobs = {};
            const jobQueue = {};
            let converted = 0;
            const bars = new cli_progress_1.MultiBar({
                clearOnComplete: false,
                hideCursor: false,
                format: '{bar} {value}/{total} | ETA: {eta}s | {percentage}% | {task}',
            }, cli_progress_1.Presets.shades_grey);
            const scad = bars.create(filteredKeys.length, 0, { task: filteredKeys[0].id });
            const stl = bars.create(filteredKeys.length, 0, { task: 'Converting to STL' }, {
                format: `{bar} {value}/{total} | ETA: {eta}s | {percentage}% | Processing: {jobsInQueue}/${batchSize} | Queued: {jobsLeft} | {task}`,
            });
            for (const [i, key] of filteredKeys.entries()) {
                scad.update(i, { task: `${key.id}.scad` });
                yield key.writeScadFile();
                scad.increment();
                stl.update(0, {
                    task: `Preparing ${key.id}`,
                    jobsInQueue: Object.keys(jobQueue).length,
                    jobsLeft: Object.keys(jobs).length,
                });
                jobs[key.id] = (() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        stl.update(converted, {
                            task: `Converting ${key.id}...`,
                        });
                        yield key.convert();
                        delete jobQueue[key.id];
                    }
                    catch (e) {
                        errors.push(e instanceof Error ? e : new Error(JSON.stringify(e)));
                    }
                    converted++;
                    stl.update(converted, {
                        task: `Finished ${key.id}.stl`,
                    });
                }));
            }
            const timer = setInterval(() => {
                const jobsLeft = Object.keys(jobs).length;
                const jobsInQueue = Object.keys(jobQueue).length;
                stl.update(converted, {
                    jobsInQueue,
                    jobsLeft,
                });
                debug(`Jobs left: ${jobsLeft}, Jobs in queue: ${jobsInQueue}`);
                if (jobsLeft === 0 && jobsInQueue === 0) {
                    debug(`Finished processing ${filteredKeys.length} keys.`);
                    errors.forEach(error => console.error(error));
                    clearInterval(timer);
                    bars.stop();
                    resolve();
                    return;
                }
                if (jobsInQueue >= batchSize) {
                    debug(`Job queue is full. Waiting...`);
                    return;
                }
                debug(`Starting next job...`);
                const nextJobKey = Object.keys(jobs)[0];
                const nextJob = jobs[nextJobKey];
                if (!nextJob) {
                    debug(`No more jobs to start. Waiting...`);
                    return;
                }
                debug(`Starting job ${nextJobKey}...`);
                delete jobs[nextJobKey];
                jobQueue[nextJobKey] = nextJob();
            }, 1000);
        }));
    }
    exports_15("processKeys", processKeys);
    return {
        setters: [
            function (cli_progress_1_1) {
                cli_progress_1 = cli_progress_1_1;
            },
            function (layout_1_1) {
                layout_1 = layout_1_1;
            },
            function (debug_2_1) {
                debug_2 = debug_2_1;
            }
        ],
        execute: function () {
            debug = debug_2.default('process');
        }
    };
});
System.register("index", ["yargs/yargs", "yargs/helpers", "process", "Key", "os", "layout"], function (exports_16, context_16) {
    "use strict";
    var yargs_1, helpers_1, process_1, Key_3, os_1, layout_2, options;
    var __moduleName = context_16 && context_16.id;
    function main() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            Key_3.Key.rounding = (_a = options.rounding) !== null && _a !== void 0 ? _a : false;
            const pattern = options.match ? new RegExp(options.match) : undefined;
            yield layout_2.fontsDetermined.then(() => console.log('Fonts determined'));
            const willProcess = options.sync ? process_1.processKeysSync(pattern) : process_1.processKeys(pattern, options.batchSize);
            yield willProcess;
        });
    }
    return {
        setters: [
            function (yargs_1_1) {
                yargs_1 = yargs_1_1;
            },
            function (helpers_1_1) {
                helpers_1 = helpers_1_1;
            },
            function (process_1_1) {
                process_1 = process_1_1;
            },
            function (Key_3_1) {
                Key_3 = Key_3_1;
            },
            function (os_1_1) {
                os_1 = os_1_1;
            },
            function (layout_2_1) {
                layout_2 = layout_2_1;
            }
        ],
        execute: function () {
            options = yargs_1.default(helpers_1.hideBin(process.argv))
                .option('match', {
                alias: 'm',
                type: 'string',
                description: 'Only convert keys that match the given pattern'
            })
                .option('rounding', {
                alias: 'r',
                type: 'boolean',
                description: 'Enable rounding (slows down conversion time drastically)'
            })
                .option('sync', {
                alias: 's',
                type: 'boolean',
                default: false,
                description: 'Run conversion asynchronously'
            })
                .option('batchSize', {
                alias: 'b',
                type: 'number',
                default: Math.floor(os_1.cpus().length - 1),
                description: 'Number of keys to convert at once'
            })
                .parseSync();
            main().catch(e => console.error(e)).finally(() => console.log('Done!'));
        }
    };
});
