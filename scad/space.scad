include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

$inverted_dish=true; $dish_type="sideways cylindrical";

sa_row(5)
	legend("␣", [0, 0], 8)
	inverted()
	2uh()
	stabilized(vertical=true, type="cherry_stabilizer")
	key();
