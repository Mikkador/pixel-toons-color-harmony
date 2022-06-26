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
  let h;
  if (delta === 0) {
    h = 0;
  } else if (max === r1) {
    h = 60 * (((g1 - b1) / delta) % 6);
  } else if (max === g1) {
    h = 60 * (((b1 - r1) / delta) + 2);
  } else {
    h = 60 * (((r1 - g1) / delta) + 4);
  }
  const l = (max + min) / 2;
  let s;
  if (delta === 0) {
    s = 0;
  } else {
    s = delta / (1 - Math.abs(2 * l - 1));
  }
  return { h, s, l };
};

const toHsv = (color) => {
  const r1 = color.r / 255;
  const g1 = color.g / 255;
  const b1 = color.b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  const delta = max - min;
  let h;
  if (delta === 0) {
    h = 0;
  } else if (max === r1) {
    h = 60 * (((g1 - b1) / delta) % 6);
  } else if (max === g1) {
    h = 60 * (((b1 - r1) / delta) + 2);
  } else {
    h = 60 * (((r1 - g1) / delta) + 4);
  }
  const v = max;
  let s;
  if (max === 0) {
    s = 0;
  } else {
    s = delta / max;
  }
  return { h, s, v };
};

const monochromatic = (color) => {
  color.v += 0.15;
  return color;
};

function hsvToHsl({ h, s, v }) {
  const l = (2 - s) * v / 2;

  if (l !== 0) {
    if (l === 1) {
      s = 0;
    } else if (l < 0.5) {
      s = s * v / (l * 2);
    } else {
      s = s * v / (2 - l * 2);
    }
  }

  return { h, s, l };
}

const complementary = (color) => {
  color.h -= 180;
  return color;
};

window.onload = () => {
  const picker = document.getElementById('pick-color');
  const output = document.getElementById('pick-output');
  const hslOutput = document.getElementById('hsl-output');
  picker.oninput = () => {
    const color = getColor(picker.value);
    output.innerText = `${color.r} ${color.g} ${color.b}`;
    const hsv = complementary(toHsv(color));
    const hsl = hsvToHsl(hsv);
    hslOutput.style.backgroundColor = `hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`;
  };
};
