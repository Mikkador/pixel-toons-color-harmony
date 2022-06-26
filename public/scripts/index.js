import { ColorRgb } from './color.js';

const monochromatic = (color) => {
  let val = color._v;
  const colors = [];
  while (val <= 1) {
    const newCol = color.copy();
    newCol.v = val;
    val += 0.15;
    colors.push(newCol);
  }
  val = color._v - 0.15;
  while (val > 0.5) {
    const newCol = color.copy();
    newCol.v = val;
    val -= 0.15;
    colors.push(newCol);
  }
  return colors;
};

const complementary = (color) => {
  const newCol = color.copy();
  newCol.h -= 180;
  newCol.h = Math.abs(newCol.h);
  return [color, newCol];
};

const outputIds = ['r', 'g', 'b', 'h', 's', 'l', 'v', 'hex'];
const functionOutputs = {
  'rgb': (color) => color.rgbCss(),
  'hsl': (color) => color.hslCss(),
  'hsv': (color) => color.hsvCss(),
};

const getColorElement = (color) => {
  const element = document.createElement('div');
  element.style = `background-color: ${color.rgbCss()};width: 50px;height: 50px;`;
  element.innerText = color.hex;
  return element;
};

const outputHarmony = (func) => {
  const colors = func();
  const harmonyContainer = document.getElementById('harmony-output');
  harmonyContainer.innerHTML = '';
  colors.forEach((color) => {
    harmonyContainer.append(getColorElement(color));
  });
};

const outputColor = (hex) => {
  const color = new ColorRgb(hex);
  outputIds.forEach((id) => {
    const element = document.getElementById(id);
    element.innerText = color[id];
  });
  for (const [id,func] of Object.entries(functionOutputs)) {
    const element = document.getElementById(id);
    element.innerText = func(color);
  }
  outputHarmony(() => monochromatic(color));
};

const pickColor = () => {
  const input = document.getElementById('color-input');
  input.oninput = () => {
    outputColor(input.value);
  };
};

window.onload = () => {
  pickColor();
};

