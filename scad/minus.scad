include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="NotoSans:style=Bold";

box_cherry(0.5)
	dsa_row(4)
	bar_support()
	legend("-", [-0.4, 1], 6)
	legend("_", [-0.4, -0.9], 5)
	key();
