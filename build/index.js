"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const AlternateFontKey_1 = require("./AlternateFontKey");
const BumpKey_1 = require("./BumpKey");
const ExtraTallKey_1 = require("./ExtraTallKey");
const Level1Key_1 = require("./Level1Key");
const Level2Key_1 = require("./Level2Key");
const MiddleKey_1 = require("./MiddleKey");
const PlainSymbolKey_1 = require("./PlainSymbolKey");
const SideKey_1 = require("./SideKey");
const Spacebar_1 = require("./Spacebar");
const letters = 'BCDEFGIJKLMNOPRSTUVWXY'.split('');
const numberSymbols = '*|=~+<>^&%'.split('');
const keys = [
    ...['A', 'H'].map(letter => new BumpKey_1.BumpKey(new Level1Key_1.Level1Key(letter))),
    new SideKey_1.SideKey(new Level1Key_1.Level1Key('Z')),
    new SideKey_1.SideKey(new Level1Key_1.Level1Key('Q')),
    ...letters.map(letter => new Level1Key_1.Level1Key(letter)),
    ...numberSymbols.map((symbol, i) => new Level2Key_1.Level2Key(`${i}`, symbol)),
    new Level2Key_1.Level2Key('\'', '(', 'apostrophe'),
    new Level2Key_1.Level2Key('"', ')', 'quote'),
    new Level2Key_1.Level2Key(',', ';', 'comma'),
    new Level2Key_1.Level2Key('.', ':', 'period'),
    new Level2Key_1.Level2Key('-', '_', 'minus'),
    new Level2Key_1.Level2Key('?', '!', 'question'),
    new Level2Key_1.Level2Key('/', '\\', 'slash'),
    new Level2Key_1.Level2Key('`', '@', 'backtick'),
    new Level2Key_1.Level2Key('#', '$', 'hash'),
    new Spacebar_1.Spacebar(),
    new ExtraTallKey_1.ExtraTallKey(new PlainSymbolKey_1.PlainSymbolKey("⎈", 'helm_tall')),
    new ExtraTallKey_1.ExtraTallKey(new PlainSymbolKey_1.PlainSymbolKey("↵", 'return')),
    new ExtraTallKey_1.ExtraTallKey(new PlainSymbolKey_1.PlainSymbolKey("⌫", 'backspace')),
    new SideKey_1.SideKey(new PlainSymbolKey_1.PlainSymbolKey("⇧", 'shift_left')),
    new SideKey_1.SideKey(new PlainSymbolKey_1.PlainSymbolKey("⇧", 'shift_right')),
    new SideKey_1.SideKey(new PlainSymbolKey_1.PlainSymbolKey("↹", 'tab')),
    new SideKey_1.SideKey(new PlainSymbolKey_1.PlainSymbolKey("⇬", 'capslock')),
    new SideKey_1.SideKey(new Level2Key_1.Level2Key('[', '{', 'bracket_left')),
    new SideKey_1.SideKey(new Level2Key_1.Level2Key(']', '}', 'bracket_right')),
    new AlternateFontKey_1.AlternateFontKey(new PlainSymbolKey_1.PlainSymbolKey("⎇", 'alt')),
    new MiddleKey_1.MiddleKey(new AlternateFontKey_1.AlternateFontKey(new Level2Key_1.Level2Key('⎄', '⇮', 'compose1'))),
    new MiddleKey_1.MiddleKey(new AlternateFontKey_1.AlternateFontKey(new Level2Key_1.Level2Key('⎄', '⇮', 'compose2'))),
    new AlternateFontKey_1.AlternateFontKey(new Level1Key_1.Level1Key('𝑓₁', 'layer1')),
    new AlternateFontKey_1.AlternateFontKey(new Level1Key_1.Level1Key('𝑓₂', 'layer2')),
    new AlternateFontKey_1.AlternateFontKey(new Level1Key_1.Level1Key('𝑓₃', 'layer3')),
    new PlainSymbolKey_1.PlainSymbolKey('↖', 'home'),
    new PlainSymbolKey_1.PlainSymbolKey('↘', 'end'),
    new PlainSymbolKey_1.PlainSymbolKey('↑', 'up'),
    new PlainSymbolKey_1.PlainSymbolKey('↓', 'down'),
    new PlainSymbolKey_1.PlainSymbolKey('→', 'right'),
    new PlainSymbolKey_1.PlainSymbolKey('←', 'left'),
    new PlainSymbolKey_1.PlainSymbolKey('⇧', 'shift'),
    new PlainSymbolKey_1.PlainSymbolKey('⇮', 'altgr'),
    new PlainSymbolKey_1.PlainSymbolKey('⎋', 'escape'),
    new PlainSymbolKey_1.PlainSymbolKey('⌦', 'delete'),
    new PlainSymbolKey_1.PlainSymbolKey('⎀', 'insert'),
    new PlainSymbolKey_1.PlainSymbolKey('⎈', 'helm'),
    new PlainSymbolKey_1.PlainSymbolKey('⌃', 'control'),
    new PlainSymbolKey_1.PlainSymbolKey('❖', 'super'),
    new PlainSymbolKey_1.PlainSymbolKey('⌘', 'command'),
    new PlainSymbolKey_1.PlainSymbolKey('⌥', 'option'),
];
if (!(0, fs_1.existsSync)('./scad')) {
    (0, fs_1.mkdirSync)('./scad');
}
for (const key of keys) {
    key.writeScadFile();
}
