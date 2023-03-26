include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="DejaVu Sans:style=bold";

box_cherry(0.5)
	sa_row(4)
	bar_support()
	legend("/", [-0.4, 1], 5)
	legend("\\", [-0.4, -0.9], 4)
	1_5uh()
	rotated()
	key();
