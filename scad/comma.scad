include <../../KeyV2/includes.scad>;
        key_profile="dsa";
        row=3;
        stem_type="rounded_cherry";
        inset_legend_depth=0.75;
        
legend(",", [0, 1], 5)
	legend(";", [0, -1], 3)
	key();
