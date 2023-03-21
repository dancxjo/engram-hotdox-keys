include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(5)
	legend("qwerty", [-0.4, 1], 2)
	legend("engram", [-0.4, -1], 1)
	key();
