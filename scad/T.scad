include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(3)
	legend("T", [0, 0], 5)
	legend("↓", [0.75, 1], 3)
	key();
