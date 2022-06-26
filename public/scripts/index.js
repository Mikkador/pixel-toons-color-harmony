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

const outputColor = (hex) => {
  const output = document.getElementById('pick-output');
  const hslOutput = document.getElementById('hsl-output');
  const color = new ColorRgb(hex);
  output.innerText = `${color.r} ${color.g} ${color.b}`;
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

