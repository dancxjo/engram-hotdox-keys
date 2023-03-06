include <../includes.scad>;
        $font = "Noto Sans";
        key_profile="dsa";
        row=3;
        stem_type="cherry";
        
$font = "Noto Sans Symbols";
legend("⎄", [0, 1], 6)
	legend("⇮", [0, -1], 6 * 0.8)
	1_5uh()
	key();
