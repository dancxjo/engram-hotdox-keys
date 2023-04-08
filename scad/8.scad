include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="DejaVuSans:style=Bold";

rounded()
	box_cherry(0.5)
	sa_row(1)
	legend("8", [-0.4, 1], 5)
	legend("&", [-0.4, -0.9], 4)
	key();
