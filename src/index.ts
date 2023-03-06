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

const letters = 'BCDEFGIJKLMNOPRSTUVWXY'.split('');
const numberSymbols = '*|=~+<>^&%'.split('');

const keys: Key[] = [
    ...['A', 'H'].map(letter => new BumpKey(new Level1Key(letter))),
    new SideKey(new Level1Key('Z')),
    new SideKey(new Level1Key('Q')),

    ...letters.map(letter => new Level1Key(letter)),

    ...numberSymbols.map((symbol, i) => new Level2Key(`${i}`, symbol)),
    new Level2Key('\'', '(', 'apostrophe'),
    new Level2Key('\\"', ')', 'quote'),
    new Level2Key(',', ';', 'comma'),
    new Level2Key('.', ':', 'period'),
    new Level2Key('-', '_', 'minus'),
    new Level2Key('?', '!', 'question'),
    new Level2Key('/', '\\', 'slash'),
    new Level2Key('`', '@', 'backtick'),
    new Level2Key('#', '$', 'hash'),
    new Spacebar(),
    new ExtraTallKey(new PlainSymbolKey("⎈", 'helm_tall')),
    new ExtraTallKey(new PlainSymbolKey("↵", 'return')),
    new ExtraTallKey(new PlainSymbolKey("⌫", 'backspace')),
    new SideKey(new PlainSymbolKey("⇧", 'shift_left')),
    new SideKey(new PlainSymbolKey("⇧", 'shift_right')),
    new SideKey(new PlainSymbolKey("↹", 'tab')),
    new SideKey(new PlainSymbolKey("⇬", 'capslock')),
    new SideKey(new Level2Key('[', '{', 'bracket_left')),
    new SideKey(new Level2Key(']', '}', 'bracket_right')),
    new AlternateFontKey(new PlainSymbolKey("⎇", 'alt')),
    new MiddleKey(new AlternateFontKey(new Level1Key('⎄', 'compose1'))),
    new MiddleKey(new Level1Key('⇮', 'compose2')),
    new MiddleKey(new Level1Key('⇞', 'pageup')),
    new MiddleKey(new Level1Key('⇟', 'pagedown')),
    new Level1Key('𝑓₁', 'layer1'),
    new Level1Key('𝑓₂', 'layer2'),
    new Level1Key('𝑓₃', 'layer3'),
    new PlainSymbolKey('↖', 'home'),
    new PlainSymbolKey('↘', 'end'),
    new PlainSymbolKey('↑', 'up'),
    new PlainSymbolKey('↓', 'down'),
    new PlainSymbolKey('→', 'right'),
    new PlainSymbolKey('←', 'left'),
    new PlainSymbolKey('⇧', 'shift'),
    new PlainSymbolKey('⇮', 'altgr'),
    new PlainSymbolKey('⎋', 'escape'),
    new PlainSymbolKey('⌦', 'delete'),
    new PlainSymbolKey('⎀', 'insert'),
    new PlainSymbolKey('⎈', 'helm'),
    new PlainSymbolKey('⌃', 'control'),
    new PlainSymbolKey('❖', 'super'),
    new PlainSymbolKey('⌘', 'command'),
    new PlainSymbolKey('⌥', 'option'),
];

if (!existsSync('./scad')) {
    mkdirSync('./scad');
}

for (const key of keys) {
    key.writeScadFile();
}