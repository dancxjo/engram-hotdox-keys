include <../includes.scad>;
        $font = "Noto Sans";
        key_profile="dsa";
        row=3;
        stem_type="cherry";
        
legend("-", [0, 1], 6)
	legend("_", [0, -1], 6 * 0.8)
	key();
