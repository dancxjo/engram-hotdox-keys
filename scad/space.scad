include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="DejaVu Sans:style=Bold";

$inverted_dish=true; $dish_type="sideways cylindrical";

box_cherry(0.5)
	dsa_row(4)
	bar_support()
	legend("␣", [0, 0], 8)
	2uh()
	stabilized(vertical=true, type="cherry_stabilizer")
	rotated()
	inverted()
	key();
