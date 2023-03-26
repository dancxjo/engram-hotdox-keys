include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="NotoSansSymbols:style=bold";

box_cherry(0.5)
	dsa_row(4)
	bar_support()
	legend("⎙", [0, 0], 8)
	1_5uh()
	rotated()
	key();
