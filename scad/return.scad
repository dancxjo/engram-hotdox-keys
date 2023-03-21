include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

sa_row(5)
	legend("↵", [0, 0], 8)
	2uh()
	stabilized(type="cherry_stabilizer", veritcal=true)
	key();
