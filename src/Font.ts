import { openSync, Font } from "fontkit";
import mkdirp from "mkdirp";
import { get } from "https";
import { Parse } from "unzip-stream";
import { createWriteStream } from "fs";
import { join, parse } from "path";
import Debug from "debug";

const debug = Debug("font");

export class Typeface {
    protected fetchedFont?: Font = undefined;
    static readonly fetchedFonts: Promise<Typeface[]> = Typeface.fetchFonts();

    get font(): Font {
        if (!this.fetchedFont) {
            throw new Error("Font not loaded");
        }
        return this.fetchedFont;
    }

    protected static async fetchFonts(): Promise<Typeface[]> {
        return Promise.all([
//            Typeface.fromGoogle("Noto Sans", "Bold"),
            Typeface.fromGoogle("Noto Sans Symbols", "VariableFont_wght"),
            Typeface.fromGoogle("Noto Sans Symbols 2", "Regular"),
        ]);
    }

    static async fromGoogle(
        fontName: string,
        weight = "Regular"
    ): Promise<Typeface> {
        debug(`Fetching font ${fontName}`);
        mkdirp("fonts");

        return new Promise(async (resolve, reject) => {
            const fontfileName = `${fontName.replace(/\s+/g, "")}-${weight}.ttf`;

            const request = get(
                `https://fonts.google.com/download?family=${fontName}`,
                (response) => {
                    response.pipe(Parse()).on("entry", (entry) => {
                        const file = parse(entry.path);
                        debug({ fontfileName, ...file });
                        const filename = join("fonts", file.base);
                        if (
                            file.base === fontfileName
                        ) {
                            entry.pipe(createWriteStream(filename)).on("finish", () => {
                                debug(`Fetched font ${fontName}`);
                                resolve(new Typeface(filename));
                            });
                        } else {
                            entry.autodrain();
                        }
                    });
                }
            );
            request.on("error", reject);
        });
    }

    constructor(filename: string) {
        this.fetchedFont = openSync(filename);
    }

    getScadSpecifier(style = ""): string {
        const name = this.font.postscriptName ?? this.font.familyName;
        const nameWithoutStyle = name.replace(/\-?(Bold|Regular|Medium)$/g, ''); 
        return `${nameWithoutStyle}:style=${style}`;
    }

    supportsCharacter(character: string): boolean {
        const char = character.codePointAt(0);
        if (!char || character.length !== 1) {
            throw new Error("Character must be a single character");
        }
        return this.font.hasGlyphForCodePoint(char);
    }

    supports(characters: string): boolean {
        return [...characters].every((c) => this.supportsCharacter(c));
    }
}
