include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="DejaVu Sans:style=bold";

rounded()
	box_cherry(0.5)
	sa_row(3)
	bar_support()
	legend("⇬", [0, 0], 8)
	1_5u()
	key();
