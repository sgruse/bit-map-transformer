'use strict';

var os = require('os');
var leOrBe = os.endianness();
var bitMapData = {};

function readHeaders(bitMap){
  if (leOrBe === 'LE'){
    bitMapData.headField = bitMap.toString('ascii', 0, 2);
    bitMapData.size = bitMap.readUInt32LE(2);
    bitMapData.pixelArrayStartAddress = bitMap.readUInt32LE(10);
    bitMapData.bitMapWidth = bitMap.readUInt32LE(18);
    bitMapData.bitMapHeight = bitMap.readUInt32LE(22);
    bitMapData.bitsPerPixel = bitMap.readUInt32LE(28);
    bitMapData.horRes = bitMap.readUInt32LE(38);
    bitMapData.verRes = bitMap.readUInt32LE(42);
    bitMapData.compressionMethod = bitMap.readUInt32LE(30);
    bitMapData.colorsInPalette = bitMap.readUInt32LE(46);
    bitMapData.imageSize = bitMap.readUInt32LE(34);
    return bitMapData;
  }
else if (leOrBe === 'BE'){
  bitMapData.headField = bitMap.toString('ascii', 0, 2);
  bitMapData.size = bitMap.readUInt32BE(2);
  bitMapData.pixelArrayStartAddress = bitMap.readUInt32BE(10);
  bitMapData.bitMapWidth = bitMap.readUInt32BE(18);
  bitMapData.bitMapHeight = bitMap.readUInt32BE(22);
  bitMapData.bitsPerPixel = bitMap.readUInt32BE(28);
  bitMapData.horRes = bitMap.readUInt32BE(38);
  bitMapData.verRes = bitMap.readUInt32BE(42);
  bitMapData.compressionMethod = bitMap.readUInt32BE(30);
  bitMapData.colorsInPalette = bitMap.readUInt32BE(46);
  bitMapData.imageSize = bitMap.readUInt32BE(34);
  return bitMapData;
}
}
module.exports = readHeaders;
