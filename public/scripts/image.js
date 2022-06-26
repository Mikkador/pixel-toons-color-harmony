/*
Useful mixin functions for working with ImageData class. Created to avoid complications in working with pixel color array
 */

import { ColorRgb } from './color.js';

//The number is four, because we use RGBA as our main format
const colorParameterCount = 4;

//Set color to a pixel with (i, j) coordinates
const setPixelColor = (i, j, { r, g, b, alpha }) => {
  const position = this.getPixelPosition(i, j);

  const colorArray = [r, g, b, alpha];
  for (let i = 0; i < colorArray.length; i++) {
    this.data[position + i] = colorArray[i];
  }
};

//Get color of a pixel with (i, j) coordinates
const getPixelColor = (i, j) => {
  const position = this.getPixelPosition(i, j);

  const colorArray = [];
  for (let i = 0; i < colorParameterCount; i++) {
    colorArray[i] = this.data[position + i];
  }
  return new ColorRgb(...colorArray);
};

//Get array index of a pixel with (i, j) coordinates
const getPixelPosition = (i, j) => i * this.width * colorParameterCount + j * colorParameterCount;

const mixin = {
  setPixelColor,
  getPixelPosition,
  getPixelColor
};

const applyImageMixin = (imageData) => {
  Object.assign(imageData, mixin);
};

export { applyImageMixin };
