include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="NotoSansSymbols:style=bold";

box_cherry(0.5)
	dsa_row(4)
	bar_support()
	legend("⎋", [0, 0], 8)
	2uh()
	stabilized(vertical=true, type="cherry_stabilizer")
	rotated()
	key();
