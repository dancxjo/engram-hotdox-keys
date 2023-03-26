include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="NotoSansSymbols:style=Bold";

box_cherry(0.5)
	dsa_row(2)
	bar_support()
	legend("B", [0, 0], 5)
	key();
