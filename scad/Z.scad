include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVu Sans:style=Bold";

rounded()
	box_cherry(0.5)
	sa_row(2)
	legend("Z", [0, 0], 5)
	1_5u()
	key();
