import { Key } from "./Key";
import { Row } from "./Row";

export class TransformedKey extends Key {
    readonly id: string;

    constructor(protected base: Key, public extraTransformations: string[] = []) {
        super();
        this.id = base.id;
    }
    
    get header(): string {
        return this.base.header;
    }
    
    get transformations(): string[] {
        return [
            ...this.base.transformations,
            ...this.extraTransformations
        ];
    }
    
    get coda(): string {
        return this.base.coda;
    }    

    get row(): Row {
        return this.base.row;
    }
}