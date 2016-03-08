'use strict';

var colors = {};

colors.readColors = function(index, bitMap){
  let colorsObj = {};
  colorsObj.r = bitMap.readUInt8(index);
  colorsObj.g = bitMap.readUInt8(index + 1);
  colorsObj.b = bitMap.readUInt8(index + 2);
  colorsObj.a = bitMap.readUInt8(index + 3);
  return colorsObj;
};

colors.invertColors = function(colorsObj){
  var colorsList = ['r', 'g', 'b', 'a'];
  colorsList.forEach(function(curr){
    var currentColor = colorsObj[curr];
    colorsObj[curr] = 255 - currentColor;
  });
  return colorsObj;
};

colors.greyScale = function(colorsObj){
  var colorsList = ['r', 'g', 'b', 'a'];
  colorsList.forEach(function(curr){
    var currentColor = colorsObj[curr];
    colorsObj[curr] = currentColor * 0.5;
  });
  return colorsObj;
};

colors.blueScale = function(colorsObj){
  var blueList = ['b'];
  blueList.forEach(function(curr){
    var currentColor = colorsObj[curr];
    colorsObj[curr] = currentColor * 0.5;
  });
  return colorsObj;
};

colors.writeColors = function(index, bitMap, colorsObj){
  bitMap.writeUInt8(colorsObj.r, index);
  bitMap.writeUInt8(colorsObj.g, index + 1);
  bitMap.writeUInt8(colorsObj.b, index + 2);
  bitMap.writeUInt8(colorsObj.a, index + 3);
  return bitMap;
};

module.exports = colors;
