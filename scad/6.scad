include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(1)
	legend("6", [-0.4, 1], 5)
	legend(">", [-0.4, -1], 4)
	key();
