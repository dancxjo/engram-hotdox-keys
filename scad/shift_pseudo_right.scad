include <../../KeyV2/includes.scad>;
$stem_type="box_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(3)
	legend("⇧", [0, 0], 8)
	1_5u()
	key();
