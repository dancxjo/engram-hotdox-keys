import { writeFileSync } from 'fs';

export abstract class Key {
    abstract id: string;
    abstract transformations: string[];

    get header(): string {
        return `include <../includes.scad>;\n$font = "Noto Sans";`;
    }
    
    get coda(): string {
        return ``;
    }

    getScad(): string {   
        return [
            this.header, 
            [
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