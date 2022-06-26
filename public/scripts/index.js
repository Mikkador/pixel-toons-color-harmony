import { ColorRgb } from './color.js';

let harmonyFunc;

const analogous = (color) => {
  const colors = [color];
  for (let i = 1; i <= 2; i++) {
    const newCol = color.copy();
    newCol.h += 10 * i;
    colors.push(newCol);
  }
  for (let i = 1; i <= 2; i++) {
    const newCol = color.copy();
    newCol.h -= 10 * i;
    colors.push(newCol);
  }
  return colors;
};

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

const choices = [monochromatic, complementary, analogous];

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

const outputIds = ['r', 'g', 'b', 'h', 's', 'l', 'v', 'hex'];
const functionOutputs = {
  'rgb': (color) => color.rgbCss(),
  'hsl': (color) => color.hslCss(),
  'hsv': (color) => color.hsvCss(),
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
  outputHarmony(() => harmonyFunc(color));
};

const setHarmonyChoice = () => {
  const selector = document.getElementById('harmonies');
  for (const choice of choices) {
    const opt = document.createElement('option');
    opt.value = choice.name;
    opt.innerHTML = choice.name;
    selector.appendChild(opt);
  }
  selector.oninput = () => {
    const value = selector.value;
    harmonyFunc = choices.find((choice) => choice.name === value);
    const input = document.getElementById('color-input');
    outputColor(input.value);
  };
  harmonyFunc = monochromatic;
};

const pickColor = () => {
  const input = document.getElementById('color-input');
  input.oninput = () => {
    outputColor(input.value);
  };
};

window.onload = () => {
  setHarmonyChoice();
  pickColor();
};

