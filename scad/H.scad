include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(3)
	legend("H", [0, 0], 5)
	bump()
	legend("←", [0.8, 1.1], 4.5)
	key();
