include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(4)
	legend("-", [-0.4, 1], 6)
	legend("_", [-0.4, -0.9], 5)
	key();
