'use strict';

var expect = require('chai').expect;
var readHeaders = require(__dirname + '/../lib/file-reader.js');
var fs = require('fs');
var bitmap = fs.readFileSync(__dirname + '/../img/palette-bitmap.bmp');

describe('Testing for the porperties inside of the headers', function(){
  it('should return the "string" value properties of the bit map headers', function(done){
    var bitMapData = readHeaders(bitmap);
    expect(bitMapData).to.have.property('headField');
    expect(bitMapData).to.have.property('size');
    expect(bitMapData).to.have.property('pixelArrayStartAddress');
    expect(bitMapData).to.have.property('bitMapWidth');
    expect(bitMapData).to.have.property('bitMapHeight');
    expect(bitMapData).to.have.property('bitsPerPixel');
    expect(bitMapData).to.have.property('horRes');
    expect(bitMapData).to.have.property('compressionMethod');
    expect(bitMapData).to.have.property('colorsInPalette');
    expect(bitMapData).to.have.property('imageSize');
    done();
  });
});

var colors = require(__dirname + '/../lib/read-colors.js');

describe('Testing for my readColors function', ()=>{
  it('Should take a mock array and return RGBA values for the first 4 indicies', ()=>{
    var mockArray = new Buffer([1, 2, 3, 4]);
    var rgba = {
      r: 1,
      g: 2,
      b: 3,
      a: 4
    };
    expect(colors.readColors(0, mockArray)).to.eql(rgba);
  });
});

describe('Testing my invert colors function', ()=>{
  it('Should take in a colors object and subtract 255 from each property', ()=>{
    var colorsObj = {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
    var expectedObj = {
      r: 255,
      g: 255,
      b: 255,
      a: 255
    };
    expect(colors.invertColors(colorsObj)).to.eql(expectedObj);
  });
});

describe('Testing my greyScale function', ()=>{
  it('Should take in a colors object and multiply every number by 0.5', ()=>{
    var colorsObj = {
      r: 10,
      g: 10,
      b: 10,
      a: 10
    };
    var expectedObj = {
      r: 5,
      g: 5,
      b: 5,
      a: 5
    };
    expect(colors.greyScale(colorsObj)).to.eql(expectedObj);
  });
});

describe('Testing my blue scale function', ()=>{
  it('Should take in a colors object and multiply every blue property by 2', ()=>{
    var colorsObj = {
      r: 10,
      g: 10,
      b: 10,
      a: 10
    };
    var expectedObj = {
      r: 10,
      g: 10,
      b: 5,
      a: 10
    };
    expect(colors.blueScale(colorsObj)).to.eql(expectedObj);
  });
});
