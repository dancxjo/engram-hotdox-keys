#!/bin/bash
WHEREAMI=$(dirname $0)

mkdir -p stl_by_row 
cd stl_by_row

mkdir -p 1
cd 1
ln -sf ../../stl/{bracket_left,1,2,3,4,5,home,end,6,7,8,9,0,bracket_right}.stl ./ 
cd ..

mkdir -p 2
cd 2
ln -sf ../../stl/{tab,B,Y,O,U,apostrophe,pageup,pagedown,quote,L,D,W,V,Z}.stl ./
cd ..

mkdir -p 3
cd 3
ln -sf ../../stl/{capslock,C,I,E,A,comma,period,H,T,S,N,Q}.stl ./
cd ..

mkdir -p 4
cd 4
ln -sf ../../stl/{shift_left,G,X,J,K,minus,compose1,compose2,question,R,M,F,P,shift_right}.stl ./
cd ..

mkdir -p 5
cd 5
ln -sf ../../stl/{helm,layer1,layer2,left,up,down,right,hash,backtick,slash}.stl ./
cd ..

mkdir -p 0
cd 0
ln -sf ../../stl/{alt,altgr,backspace,command,control,delete,end,escape,helm_tall,insert,return}.stl ./
cd ..

cd $WHEREAMI