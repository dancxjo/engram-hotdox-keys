import { existsSync, linkSync, writeFileSync } from 'fs';
import { mkdirpSync as mkdirp } from "mkdirp";
import { execSync } from 'child_process';

export abstract class Key {
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
        return [
            this.header, 
            [
                `sa_row(${this.row})`,
                ...this.transformations, 
                'key();'
            ].join('\n\t'), 
            this.coda
        ].join('\n');
    }

    writeScadFile(): void {
        mkdirp('./scad');
        writeFileSync(`./scad/${this.id}.scad`, this.getScad());
    }

    convertToStl(): void {
        mkdirp('./stl');
        execSync(`openscad-nightly -o ./stl/${this.id}.stl ./scad/${this.id}.scad`);
        mkdirp(`./rows/${this.row}`);
        if (!existsSync('./rows/${this.row}/${this.id}.stl')) {
            linkSync(`./stl/${this.id}.stl`, `./rows/${this.row}/${this.id}.stl`);
        }
    }
}