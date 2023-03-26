include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="NotoSansSymbols:style=Bold";

box_cherry(0.5)
	dsa_row(3)
	bar_support()
	legend("C", [0, 0], 5)
	key();
