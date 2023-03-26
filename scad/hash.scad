include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

rounded()
	box_cherry(0.5)
	sa_row(2)
	bar_support()
	legend("#", [-0.4, 1], 5)
	legend("$", [-0.4, -0.9], 4)
	1_5uh()
	rotated()
	key();
