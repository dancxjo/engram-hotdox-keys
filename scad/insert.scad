include <../../KeyV2/includes.scad>;
$inset_legend_depth = 0.97;
$font="DejaVu Sans:style=bold";

$font = "Noto Sans Symbols:style=bold";
box_cherry(0.5)
	dsa_row(4)
	bar_support()
	legend("⎀", [0, 0], 8)
	key();
