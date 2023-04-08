import { linkSync, writeFileSync, lstatSync } from 'fs';
import { mkdirpSync as mkdirp } from "mkdirp";
import { ChildProcess, exec, execSync, spawn } from 'child_process';
import { Row, rowToNumber } from './Row';
import { Typeface } from './Font';

export abstract class Key {
    static rounding = false;
    abstract id: string;
    abstract transformations: string[];
    abstract row: Row;
    public font: string = 'DejaVu Sans:style=Bold';

    get header(): string {
        return `include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="${this.font}";\n`;
    }

    get necessaryCharacters(): string {
        return '';
    }

    async determineFont(): Promise<void> {
        const defaultFont = 'DejaVu Sans:style=Bold';
        const characters = this.necessaryCharacters;
        const fonts = await Typeface.fetchedFonts;
        for (const font of fonts) {
            if (font.supports(characters)) {
                this.font = font.getScadSpecifier('Bold') ?? defaultFont;
                return;
            }
        }

        this.font = defaultFont;
    }

    get coda(): string {
        return ``;
    }

    setFont(font: string): typeof this {
        this.font = font;
        return this;
    }

    getScad(): string {
        const transformations = [
            `box_cherry(0.5)`,
            `sa_row(${rowToNumber(this.row)})`,
            // `bar_support()`,
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

    async writeScadFile(): Promise<void> {
        if (!this.font) {
            await this.determineFont();
        }
        mkdirp('./scad');
        writeFileSync(`./scad/${this.id}.scad`, this.getScad());
    }

    private link(): void {
        try {
            mkdirp(`./rows/${this.row}`);
            linkSync(`./stl/${this.id}.stl`, `./rows/${this.row}/${this.id}.stl`);
        } catch (e) {
            // console.error(`Couldn't link ${this.row}/${this.id}`, e);
        }

    }

    convertSync(): void {
        try {
            mkdirp('./stl');
            execSync(`openscad-nightly -o ./stl/${this.id}.stl ./scad/${this.id}.scad`, { stdio: 'pipe' });
            this.link();
        } catch (e) {
            console.error(`Couldn't convert ${this.row}/${this.id}`, e);
        }
    }

    async convert(): Promise<void> {
        mkdirp('./stl');
        return new Promise((resolve, reject) => {
            const conversion = spawn(`openscad-nightly`, `-o ./stl/${this.id}.stl ./scad/${this.id}.scad`.split(/\s+/));
            conversion.on('close', (code) => {
                if (code !== 0) {
                    reject(new Error(`Openscad exited with code ${code}`));
                }
                
                this.link();
                resolve();
            });
        });
    }
}

