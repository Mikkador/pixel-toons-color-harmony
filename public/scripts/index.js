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

window.onload = () => {
  const picker = document.getElementById('pick-color');
  const output = document.getElementById('pick-output');
  const hslOutput = document.getElementById('hsl-output');
  picker.oninput = () => {
    const color = new ColorRgb(picker.value);
    output.innerText = `${color.r} ${color.g} ${color.b}`;
    const newCol = complementary(color);
    hslOutput.style.backgroundColor = `hsl(${newCol.h}, ${newCol.s * 100}%, ${newCol.l * 100}%)`;
  };
};
