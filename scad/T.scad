include <../../KeyV2/includes.scad>;
$stem_type="box_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(2)
	legend("T", [0, 0], 5)
	legend("↓", [0.8, 1.1], 4.5)
	key();
