include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(3)
	legend("Q", [0, 0], 5)
	1_5u()
	key();
