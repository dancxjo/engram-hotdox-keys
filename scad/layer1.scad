include <../../KeyV2/includes.scad>;
$stem_type="rounded_cherry";
$inset_legend_depth = 4;
$font="DejaVu Sans:style=bold";

rounded()
	sa_row(5)
	legend("ƒ₁", [0, 0], 5)
	key();