include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVuSans:style=Bold";

rounded()
	box_cherry(0.5)
	sa_row(2)
	legend("Y", [0, 0], 5)
	key();
