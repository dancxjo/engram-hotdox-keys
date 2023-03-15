include <../../KeyV2/includes.scad>;
        key_profile="dsa";
        row=0;
        stem_type="cherry";
        inset_legend_depth=1;
        
legend(".", [0, 1], 5)
	legend(":", [0, -1], 3)
	key();
