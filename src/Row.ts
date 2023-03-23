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
        case Row.Numbers: return 1;
        case Row.AboveHome: return 2;
        case Row.Home: return 3;
        case Row.BelowHome: return 4;
        case Row.Mods: return 5;
        case Row.Thumbs: return 5;
        default: return 0;
    }
}