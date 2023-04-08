include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVu Sans:style=Bold";

rounded()
	box_cherry(0.5)
	sa_row(3)
	legend("T", [0, 0], 5)
	legend("↓", [0.8, 1.1], 4.5)
	key();
