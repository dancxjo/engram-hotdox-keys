include <../../KeyV2/includes.scad>;
$stem_type="box_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

$font = "Noto Sans Symbols:style=bold";
sa_row(4)
	legend("⎋", [0, 0], 8)
	2uh()
	stabilized(vertical=true, type="cherry_stabilizer")
	rotated()
	key();
