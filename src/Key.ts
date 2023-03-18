import { writeFileSync } from 'fs';

export abstract class Key {
    abstract id: string;
    abstract transformations: string[];
    abstract row: number;

    get header(): string {
        return `include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$font="DejaVu Sans:style=bold";\n`;
    }
    
    get coda(): string {
        return ``;
    }

    getScad(): string {   
        return [
            this.header, 
            [
                `oem_row(${this.row})`,
                ...this.transformations, 
                'key();'
            ].join('\n\t'), 
            this.coda
        ].join('\n');
    }

    writeScadFile(): void {
        writeFileSync(`./scad/${this.id}.scad`, this.getScad());
    }
}