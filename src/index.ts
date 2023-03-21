import { existsSync, mkdirSync } from "fs";

import { AlternateFontKey } from "./AlternateFontKey";
import { BumpKey } from "./BumpKey";
import { ExtraTallKey } from "./ExtraTallKey";
import { Key } from "./Key";
import { Level1Key } from "./Level1Key";
import { Level2Key } from "./Level2Key";
import { MiddleKey } from "./MiddleKey";
import { PlainSymbolKey } from "./PlainSymbolKey";
import { SideKey } from "./SideKey";
import { Spacebar } from "./Spacebar";

const row2 = 'BYOULDWV'.split('');
const row3 = 'CIETSN'.split('');
const row4 = 'GXJKRMFP'.split('');
const numberSymbols = '*|=~+<>^&%'.split('');

const bottomRow = 5;
const thumbKeyRow = 0;
const tallMiddleKeyRow = 0;

const keys: Key[] = [
    ...['A', 'H'].map(letter => new BumpKey(new Level1Key(letter, 3))),
    new SideKey(new Level1Key('Z', 2)),
    new SideKey(new Level1Key('Q', 3)),

    ...row2.map(letter => new Level1Key(letter, 2)),
    ...row3.map(letter => new Level1Key(letter, 3)),
    ...row4.map(letter => new Level1Key(letter, 4)),

    ...numberSymbols.map((symbol, i) => new Level2Key(`${i}`, symbol, 1)),
    new Level2Key('\'', '(', 2, 'apostrophe'),
    new Level2Key('\\"', ')', 2, 'quote'),
    new Level2Key(',', ';', 3, 'comma'),
    new Level2Key('.', ':', 3, 'period'),
    new Level2Key('-', '_', 4, 'minus'),
    new Level2Key('?', '!', 4, 'question'),
    new Level2Key('/', '\\\\', bottomRow, 'slash'),
    new Level2Key('@', '`', bottomRow, 'at'),
    new Level2Key('#', '$', bottomRow, 'hash'),
    new Spacebar(thumbKeyRow),
    new ExtraTallKey(new AlternateFontKey(new PlainSymbolKey("⎈", thumbKeyRow, 'helm_tall'))),
    new ExtraTallKey(new PlainSymbolKey("↵", thumbKeyRow, 'return')),
    new ExtraTallKey(new PlainSymbolKey("⌫", thumbKeyRow, 'backspace').size(5)), // Glyph is quite large
    new SideKey(new PlainSymbolKey("⇧", 4, 'shift_left')),
    new SideKey(new PlainSymbolKey("⇧", 4, 'shift_right')),
    new SideKey(new Level2Key("⇥", '⇤', 2, 'tab')),
    new SideKey(new PlainSymbolKey("⇬", 3, 'capslock')),
    new SideKey(new Level2Key('[', '{', 1, 'bracket_left')),
    new SideKey(new Level2Key(']', '}', 1, 'bracket_right')),
    new AlternateFontKey(new PlainSymbolKey("⎇", thumbKeyRow, 'alt')),
    new MiddleKey(new AlternateFontKey(new PlainSymbolKey('⎄', tallMiddleKeyRow, 'compose1'))),
    new MiddleKey(new PlainSymbolKey('⇮', tallMiddleKeyRow, 'compose2')),
    new MiddleKey(new PlainSymbolKey('⇞', tallMiddleKeyRow, 'pageup')),
    new MiddleKey(new PlainSymbolKey('⇟', tallMiddleKeyRow, 'pagedown')),
    new Level1Key('ƒ₁', bottomRow, 'layer1'),
    new Level1Key('ƒ₂', bottomRow, 'layer2'),
    new Level1Key('ƒ₃', bottomRow, 'layer3'),
    new PlainSymbolKey('↖', 1, 'home'),
    new PlainSymbolKey('↘', 1, 'end'),
    new PlainSymbolKey('↑', bottomRow, 'up'),
    new PlainSymbolKey('↓', bottomRow, 'down'),
    new PlainSymbolKey('→', bottomRow, 'right'),
    new PlainSymbolKey('←', bottomRow, 'left'),
    new PlainSymbolKey('⇧', thumbKeyRow, 'shift'),
    new PlainSymbolKey('⇮', thumbKeyRow, 'altgr'),
    new AlternateFontKey(new PlainSymbolKey('⎋', thumbKeyRow, 'escape')),
    new PlainSymbolKey('⌦', thumbKeyRow, 'delete').size(5), // Glyph is quite large
    new AlternateFontKey(new PlainSymbolKey('⎀', thumbKeyRow, 'insert')),
    new AlternateFontKey(new PlainSymbolKey('⎈', bottomRow, 'helm')),
    new PlainSymbolKey('⌃', thumbKeyRow, 'control'),
    new PlainSymbolKey('❖', thumbKeyRow, 'super'),
    new PlainSymbolKey('⌘', thumbKeyRow, 'command'),
    new PlainSymbolKey('⌥', thumbKeyRow, 'option'),
];

if (!existsSync('./scad')) {
    mkdirSync('./scad');
}

for (const key of keys) {
    key.writeScadFile();
}