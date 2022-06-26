const getColor = (string) => {
  const r = parseInt(string.substr(1, 2), 16);
  const g = parseInt(string.substr(3, 2), 16);
  const b = parseInt(string.substr(5, 2), 16);
  return { r, g, b };
};

const toHsl = (color) => {
  const r1 = color.r / 255;
  const g1 = color.g / 255;
  const b1 = color.b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const delta = max - min;
  let hue;
  if (delta === 0) {
    hue = 0;
  } else if (max === r1) {
    hue = 60 * (((g1 - b1) / delta) % 6);
  } else if (max === g1) {
    hue = 60 * (((b1 - r1) / delta) + 2);
  } else {
    hue = 60 * (((r1 - g1) / delta) + 4);
  }
  const lightness = (max + min) / 2;
  let saturation;
  if (delta === 0) {
    saturation = 0;
  } else {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
  }
  return { hue, saturation, lightness };
};

const monochromatic = (color) => {
  color.saturation /= 2;
  console.log(color);
};

window.onload = () => {
  const picker = document.getElementById('pick-color');
  const output = document.getElementById('pick-output');
  const hslOutput = document.getElementById('hsl-output');
  picker.oninput = () => {
    const color = getColor(picker.value);
    output.innerText = `${color.r} ${color.g} ${color.b}`;
    console.log(toHsl(color));
    monochromatic(toHsl(color));
    const hsl = toHsl(color);
    hslOutput.style.backgroundColor = `hsl(${hsl.hue}, ${hsl.saturation * 100}%, ${hsl.lightness * 100}%`;
  };
};
