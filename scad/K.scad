include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="NotoSans:style=Bold";

box_cherry(0.5)
	dsa_row(4)
	bar_support()
	legend("K", [0, 0], 5)
	key();
