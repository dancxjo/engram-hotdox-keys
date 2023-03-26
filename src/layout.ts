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
import { Row, rowToNumber } from "./Row";

const rows = {
  [Row.AboveHome]: "BYOULWV".split(""),
  [Row.Home]: "CIEN".split(""),
  [Row.BelowHome]: "GXJKRMFP".split(""),
};
const numberSymbols = "*|=~+<>^&%".split("");

export const keys: Key[] = [
  // Letter keys
  new BumpKey(new Level1Key("A", Row.Home)),
  new FunctionKey(new BumpKey(new Level1Key("H", Row.Home)), "←"),
  new FunctionKey(new Level1Key("T", Row.Home), "↓"),
  new FunctionKey(new Level1Key("S", Row.Home), "→"),
  new FunctionKey(new Level1Key("D", Row.AboveHome), "↑"),
  new SideKey(new Level1Key("Z", Row.AboveHome)),
  new SideKey(new Level1Key("Q", Row.Home)),

  ...rows[Row.AboveHome].map((letter) => new Level1Key(letter, Row.AboveHome)),
  ...rows[Row.Home].map((letter) => new Level1Key(letter, Row.Home)),
  ...rows[Row.BelowHome].map((letter) => new Level1Key(letter, Row.BelowHome)),

  // Row Row.Numbers
  ...numberSymbols.map(
    (symbol, i) => new Level2Key(`${i}`, symbol, Row.Numbers)
  ),
  new Level2Key("⌃", "⌘", Row.Numbers, "helm_swap").size(7), // Swap control and command for the helm key
  new Level2Key("⎉", "⎊", Row.Numbers, "pause"), // Pause and break
  // Central punctuation
  new Level2Key("'", "(", Row.AboveHome, "apostrophe"),
  new Level2Key('\\"', ")", Row.AboveHome, "quote"),
  new Level2Key(",", ";", Row.Home, "comma"),
  new Level2Key(".", ":", Row.Home, "period"),
  new Level2Key("-", "_", Row.BelowHome, "minus").size(6), // Glyphs are faint
  new Level2Key("?", "!", Row.BelowHome, "question"),

  // Middle keys
  new MiddleKey(new Level2Key("/", "\\\\", Row.BelowHome, "slash")),
  new MiddleKey(new Level2Key("@", "`", Row.AboveHome, "at").size2(6)), // Backtick is too light to be seen
  new MiddleKey(new Level2Key("#", "$", Row.AboveHome, "hash")),
  new MiddleKey(new PlainSymbolKey("⎙", Row.BelowHome, "prscr").setFont('NotoSansSymbols:style=bold')), // Print screen

  // Thumb keys (extra tall)
  new Spacebar(Row.Thumbs),
  new ExtraTallKey(new PlainSymbolKey("↵", Row.Thumbs, "return")),
  new ExtraTallKey(new PlainSymbolKey("⌫", Row.Thumbs, "backspace").setFont('NotoSansSymbols2:style=bold')), // Glyph is quite large
  new ExtraTallKey(new PlainSymbolKey("⎋", Row.Thumbs, "escape").setFont('NotoSansSymbols:style=bold')),

  // Thumb keys (normal height)
  new PlainSymbolKey("⇧", Row.Thumbs, "shift_left"),
  new PlainSymbolKey("⇧", Row.Thumbs, "shift_right"),
  new PlainSymbolKey("⇞", Row.Thumbs, "pageup"),
  new PlainSymbolKey("⇟", Row.Thumbs, "pagedown"),
  new PlainSymbolKey("↖", Row.Thumbs, "home"),
  new PlainSymbolKey("↘", Row.Thumbs, "end"),
  new PlainSymbolKey("⌦", Row.Thumbs, "delete").setFont('NotoSansSymbols2:style=bold'),
  new PlainSymbolKey("⎀", Row.Thumbs, "insert"),
  // Side keys
  new SideKey(new PlainSymbolKey("⇧", Row.BelowHome, "shift_pseudo_left")),
  new SideKey(new PlainSymbolKey("⇧", Row.BelowHome, "shift_pseudo_right")),
  new SideKey(new Level2Key("⇥", "⇤", Row.AboveHome, "tab")),
  new SideKey(new PlainSymbolKey("⇬", Row.Home, "capslock")),
  new SideKey(new Level2Key("[", "{", Row.Numbers, "bracket_left").size(4)),
  new SideKey(new Level2Key("]", "}", Row.Numbers, "bracket_right").size(4)),

  // Bottom row
  new Level1Key("ƒ₁", Row.Mods, "layer1"),
  new Level1Key("ƒ₂", Row.Mods, "layer2"),
  new Level1Key("qw", Row.Mods, "qwerty").size(4),
  new Level1Key("ƒ₃", Row.Mods, "layer3"),

  // Two helm keys (opposite pinkies)
  new PlainSymbolKey("⎈", Row.Mods, "helm"),
  new PlainSymbolKey("⌃", Row.Mods, "control"),
  // Two super keys (opposite thumbs)
  new PlainSymbolKey("❖", Row.Mods, "super"),
  new PlainSymbolKey("⎄", Row.Mods, "compose").size(5), // RGUI
  // Two alt keys (opposite thumbs)
  new PlainSymbolKey("⎇", Row.Mods, "alt"),
  new PlainSymbolKey("⇮", Row.Mods, "altgr"),
];

export const fontsDetermined = Promise.all(keys.map((key) => key.determineFont()));

keys.sort(
  (a, b) => rowToNumber(a.row) - rowToNumber(b.row) || a.id.localeCompare(b.id)
);
