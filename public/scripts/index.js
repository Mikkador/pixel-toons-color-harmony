import { ColorRgb } from './color.js';

const monochromatic = (color) => {
  const newCol = color.copy();
  newCol.v += 0.15;
  return newCol;
};

const complementary = (color) => {
  const newCol = color.copy();
  newCol.h -= 180;
  return newCol;
};

const outputIds = ['r', 'g', 'b', 'h', 's', 'l', 'v', 'hex'];
const functionOutputs = {
  'rgb': (color) => color.rgbCss(),
  'hsl': (color) => color.hslCss(),
  'hsv': (color) => color.hsvCss(),
};

const outputColor = (hex) => {
  //const output = document.getElementById('pick-output');
  const hslOutput = document.getElementById('hsl-output');
  const color = new ColorRgb(hex);
  outputIds.forEach((id) => {
    const element = document.getElementById(id);
    element.innerText = color[id];
  });
  for (const [id,func] of Object.entries(functionOutputs)) {
    const element = document.getElementById(id);
    element.innerText = func(color);
  }
  const newCol = complementary(color);
  hslOutput.style.backgroundColor = newCol.hslCss();
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

