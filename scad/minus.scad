include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

rounded()
	sa_row(4)
	legend("-", [-0.4, 1], 5)
	legend("_", [-0.4, -0.9], 3)
	key();