'use srict';

const fs = require('fs');
var readHeaders = require('./lib/file-reader.js');
var colors = require('./lib/read-colors.js');

var bitMap = fs.readFileSync(__dirname + '/img/' + process.argv[2]);
var bitMapData = readHeaders(bitMap);
console.log(bitMapData);

//TRANSFORM PICKER
var argv = process.argv[3];
var transform;
if (argv === 'nonpinvert'){
  transform = invertTransform;
}
else if (argv === 'nonpgreyscale'){
  transform = greyScaleTransform;
}
else if (argv === 'pinvert'){
  transform = invertTransformPalette;
}
else if (argv === 'pgreyscale'){
  transform = paletteGreyScaleTransform;
}
else if (argv === 'pbluescale'){
  transform = paletteBlueScale;
}
else if (argv === 'npbluescale'){
  transform = nonPaletteBlueScale;
}

//NON-PALETTE INVERT
function invertTransform(){
  for (var i = bitMapData.pixelArrayStartAddress; i < bitMapData.size - 4; i += 4){
    var invertedColorsObj = colors.invertColors(colors.readColors(i, bitMap));
    colors.writeColors(i, bitMap, invertedColorsObj);
    // console.log(invertedColorsObj);
  }
}

//PALETTE-INVERT
function invertTransformPalette(){
  for (var i = 54; i < bitMapData.pixelArrayStartAddress; i += 4){
    var invertedColorsObj = colors.invertColors(colors.readColors(i, bitMap));
    colors.writeColors(i, bitMap, invertedColorsObj);
    // console.log(invertedColorsObj);
  }
}

//GREYSCALE-NONPALETTE
function greyScaleTransform(){
  for (var i = bitMapData.pixelArrayStartAddress; i < bitMapData.size - 4; i += 4){
    var greyScaleColorObj = colors.greyScale(colors.readColors(i, bitMap));
    colors.writeColors(i, bitMap, greyScaleColorObj);
    // console.log(greyScaleColorObj);
  }
}

//PALETTE GREYSCALE
function paletteGreyScaleTransform(){
  for (var i = 54; i < bitMapData.pixelArrayStartAddress; i += 4){
    var greyScaleColorObj = colors.greyScale(colors.readColors(i, bitMap));
    colors.writeColors(i, bitMap, greyScaleColorObj);
    // console.log(greyScaleColorObj);
  }
}

//PALETTE BLUESCALE
function paletteBlueScale(){
  for (var i = 54; i < bitMapData.pixelArrayStartAddress; i += 4){
    var blueScaleObj = colors.blueScale(colors.readColors(i, bitMap));
    colors.writeColors(i, bitMap, blueScaleObj);
  }
}

//NON-PALETTE BLUE SCALE
function nonPaletteBlueScale(){
  for (var i = bitMapData.pixelArrayStartAddress; i < bitMapData.size -4; i += 4){
    var blueScaleObj = colors.blueScale(colors.readColors(i, bitMap));
    colors.writeColors(i, bitMap, blueScaleObj);
  }
}

transform();
fs.writeFileSync(__dirname + '/output/' + process.argv[2], bitMap);
