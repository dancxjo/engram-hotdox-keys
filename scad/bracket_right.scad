include <../../KeyV2/includes.scad>;
$stem_type="box_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(0)
	legend("]", [-0.4, 1], 4)
	legend("}", [-0.4, -0.9], 3)
	1_5u()
	key();
