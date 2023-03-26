include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

box_cherry(0.5)
	sa_row(4)
	bar_support()
	legend("K", [0, 0], 5)
	key();
