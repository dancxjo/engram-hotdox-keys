include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="DejaVu Sans:style=bold";

box_cherry(0.5)
	dsa_row(3)
	bar_support()
	legend("A", [0, 0], 5)
	bump()
	key();
