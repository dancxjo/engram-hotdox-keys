import { existsSync, linkSync, writeFileSync } from 'fs';
import { mkdirpSync as mkdirp } from "mkdirp";
import { ChildProcess, exec } from 'child_process';

export abstract class Key {
    static rounding = false;
    abstract id: string;
    abstract transformations: string[];
    abstract row: number;
    get header(): string {
        return `include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";\n`;
    }

    get coda(): string {
        return ``;
    }

    getScad(): string {

        const transformations = [
            `sa_row(${this.row})`,
            ...this.transformations,
            'key();'
        ];

        if (Key.rounding) {
            transformations.unshift('rounding()');
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

    convertToStl(callback: () => unknown): ChildProcess {
        mkdirp('./stl');
        const child = exec(`openscad-nightly -o ./stl/${this.id}.stl ./scad/${this.id}.scad`, (err, stdOut, stdErr) => {
            if (!err) {
                mkdirp(`./rows/${this.row}`);
                if (!existsSync('./rows/${this.row}/${this.id}.stl')) {
                    linkSync(`./stl/${this.id}.stl`, `./rows/${this.row}/${this.id}.stl`);
                }
            }
            callback();
        });
        return child;
    }
}

