include <../../KeyV2/includes.scad>;
$inset_legend_depth = 4;
$font="NotoSansSymbols2:style=Bold";

rounded()
	box_cherry(0.5)
	sa_row(4)
	bar_support()
	legend("⌦", [0, 0], 8)
	key();
