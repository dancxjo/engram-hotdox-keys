include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

rounded()
	box_cherry(0.5)
	sa_row(2)
	bar_support()
	legend("W", [0, 0], 5)
	key();
