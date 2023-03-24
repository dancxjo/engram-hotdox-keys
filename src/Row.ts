export enum Row {
    Numbers = 'numbers',
    AboveHome = 'above-home',
    Home = 'home',
    BelowHome = 'below-home',
    Mods = 'mods',
    Thumbs = 'thumbs',
    Unknown = 'unknown'
}

export function rowToNumber(row: Row): number {
    switch(row) {
        case Row.Numbers: return 0;
        case Row.AboveHome: return 1;
        case Row.Home: return 2;
        case Row.BelowHome: return 3;
        case Row.Mods: return 4;
        case Row.Thumbs: return 4;
        default: return 5;
    }
}