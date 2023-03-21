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
import { FunctionKey } from "./FunctionKey";

const row2 = 'BYOULWV'.split('');
const row3 = 'CIEN'.split('');
const row4 = 'GXJKRMFP'.split('');
const numberSymbols = '*|=~+<>^&%'.split('');

const bottomRow = 5;
const thumbKeyRow = 0;
const tallMiddleKeyRow = 0;

export const keys: Key[] = [
    // Letter keys
    new BumpKey(new Level1Key('A', 3)),
    new FunctionKey(new BumpKey(new Level1Key('H', 3)), '←'),
    new FunctionKey(new Level1Key('T', 3), '↓'),
    new FunctionKey(new Level1Key('S', 3), '→'),
    new FunctionKey(new Level1Key('D', 2), '↑'),
    new SideKey(new Level1Key('Z', 2)),
    new SideKey(new Level1Key('Q', 3)),

    ...row2.map(letter => new Level1Key(letter, 2)),
    ...row3.map(letter => new Level1Key(letter, 3)),
    ...row4.map(letter => new Level1Key(letter, 4)),

    // Row 1
    ...numberSymbols.map((symbol, i) => new Level2Key(`${i}`, symbol, 1)),
    new Level2Key('⌃', '⌘', 1, 'helm_swap'),     // Swap control and command for the helm key
    new AlternateFontKey(new Level2Key('⎉', '⎊', 1, 'pause')),         // Pause and break
    
    // Central punctuation
    new Level2Key('\'', '(', 2, 'apostrophe'),
    new Level2Key('\\"', ')', 2, 'quote'),
    new Level2Key(',', ';', 3, 'comma'),
    new Level2Key('.', ':', 3, 'period'),
    new Level2Key('-', '_', 4, 'minus'),
    new Level2Key('?', '!', 4, 'question'),

    // Middle keys
    new MiddleKey(new Level2Key('/', '\\\\', 4, 'slash')),
    new MiddleKey(new Level2Key('@', '`', 2, 'at')),
    new MiddleKey(new Level2Key('#', '$', 2, 'hash')),
    new MiddleKey(new AlternateFontKey(new PlainSymbolKey('⎙', 4, 'prscr'))),

    // Thumb keys (extra tall)
    new Spacebar(thumbKeyRow),
    new ExtraTallKey(new PlainSymbolKey("↵", thumbKeyRow, 'return')),	
    new ExtraTallKey(new PlainSymbolKey("⌫", thumbKeyRow, 'backspace').size(5)), // Glyph is quite large
    new ExtraTallKey(new AlternateFontKey(new PlainSymbolKey('⎋', thumbKeyRow, 'escape'))),

    // Thumb keys (normal height)
    new PlainSymbolKey('⇧', thumbKeyRow, 'shift_left'),
    new PlainSymbolKey('⇧', thumbKeyRow, 'shift_right'),
    new PlainSymbolKey('⇞', thumbKeyRow, 'pageup'),
    new PlainSymbolKey('⇟', thumbKeyRow, 'pagedown'),
    new PlainSymbolKey('↖', thumbKeyRow, 'home'),
    new PlainSymbolKey('↘', thumbKeyRow, 'end'),
    new PlainSymbolKey('⌦', thumbKeyRow, 'delete').size(5), // Glyph is quite large
    new AlternateFontKey(new PlainSymbolKey('⎀', thumbKeyRow, 'insert')),
    
    // Side keys
    new SideKey(new PlainSymbolKey("⇧", 4, 'shift_pseudo_left')),
    new SideKey(new PlainSymbolKey("⇧", 4, 'shift_pseudo_right')),
    new SideKey(new Level2Key("⇥", '⇤', 2, 'tab')),
    new SideKey(new PlainSymbolKey("⇬", 3, 'capslock')),
    new SideKey(new Level2Key('[', '{', 1, 'bracket_left')),
    new SideKey(new Level2Key(']', '}', 1, 'bracket_right')),
    
    // Bottom row
    new Level2Key('ƒ₁', 'qw', bottomRow, 'layer1'),
    new Level2Key('ƒ₂', 'en', bottomRow, 'layer2'),
    new Level2Key('ƒ₁', 'qw', bottomRow, 'layer1_right'),
    new Level2Key('ƒ₂', 'en', bottomRow, 'layer2_right'),

    // Two helm keys (opposite pinkies)
    new AlternateFontKey(new PlainSymbolKey('⎈', bottomRow, 'helm')),
    new AlternateFontKey(new PlainSymbolKey('⌃', bottomRow, 'control')),

    // Two super keys (opposite thumbs)
    new PlainSymbolKey('❖', bottomRow, 'super'),
    new AlternateFontKey(new PlainSymbolKey('⎄', bottomRow, 'compose').size(5)), // RGUI

    // Two alt keys (opposite thumbs)
    new AlternateFontKey(new PlainSymbolKey("⎇", bottomRow, 'alt')),
    new AlternateFontKey(new PlainSymbolKey("⇮", bottomRow, 'altgr')),
];

keys.sort((a, b) => a.row - b.row || a.id.localeCompare(b.id));