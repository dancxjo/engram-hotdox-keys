import { writeFileSync } from 'fs';

export abstract class Key {
    abstract id: string;
    abstract transformations: string[];

    get header(): string {
        return `include <../../KeyV2/includes.scad>;
        key_profile="dsa";
        row=0;
        stem_type="cherry";
        inset_legend_depth=1;
        `;
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