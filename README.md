# engram-hotdox-keys
3d models for my hotdox76v2 mapped to Arno's Engram layout

## Links
* [Arno's Engram Layout](http://engram.dev)
* [Parametric Mechanical Keycap Library](https://github.com/rsheldiii/KeyV2)
* [HotDox](https://kono.store/products/ergodox-76-hot-dox-mechanical-keyboard-v2)


## Compiling
1. Generate the scad files using `npm start`
1. Copy the scad directory into the KeyV2 directory
1. Run `for f in ./*.scad; do openscad-nightly -o $(basename $f .scad).stl $f; done`