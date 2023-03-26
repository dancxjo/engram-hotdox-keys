import { linkSync, writeFileSync, lstatSync } from 'fs';
import { mkdirpSync as mkdirp } from "mkdirp";
import { ChildProcess, exec, execSync } from 'child_process';
import { Row, rowToNumber } from './Row';

export abstract class Key {
    static rounding = false;
    abstract id: string;
    abstract transformations: string[];
    abstract row: Row;
    get header(): string {
        return `include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";\n`;
    }

    get coda(): string {
        return ``;
    }

    getScad(): string {

        const transformations = [
            `box_cherry(0.5)`,
            `sa_row(${rowToNumber(this.row)})`,
            `bar_support()`,
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

    writeScadFile(): void {
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
            exec(`openscad-nightly -o ./stl/${this.id}.stl ./scad/${this.id}.scad`, (err, stdOut, stdErr) => {
                if (err) {
                    reject(err);
                }

                this.link();
                resolve();
            });
        });
    }
}

