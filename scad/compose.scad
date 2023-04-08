include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="NotoSansSymbols:style=Bold";

rounded()
	box_cherry(0.5)
	sa_row(4)
	legend("⎄", [0, 0], 5)
	key();
