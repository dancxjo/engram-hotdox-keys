include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="DejaVu Sans:style=bold";

box_cherry(0.5)
	dsa_row(1)
	bar_support()
	legend("7", [-0.4, 1], 5)
	legend("^", [-0.4, -0.9], 4)
	key();
