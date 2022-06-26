export class ColorRgb {
  constructor(hex) {
    this.hex = hex;
    this.r = parseInt(hex.substr(1, 2), 16);
    this.g = parseInt(hex.substr(3, 2), 16);
    this.b = parseInt(hex.substr(5, 2), 16);
    this.toHslv();
  }

  toHslv() {
    const r1 = this.r / 255;
    const g1 = this.g / 255;
    const b1 = this.b / 255;
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
    this.h = h;
    this.s = s;
    this.l = l;
    this.v = max;
  }

  copy() {
    const col = new ColorRgb('');
    col.r = this.r;
    col.b = this.b;
    col.g = this.g;
    col.toHslv();
    return col;
  }

  rgbCss() {
    return `rgb(${this.r}, ${this.g}, ${this.b}`;
  }

  hslCss() {
    return `hsl(${this.h}, ${this.s * 100}%, ${this.l * 100}%)`;
  }

  hsvCss() {
    return `hsv(${this.h}, ${this.s * 100}%, ${this.v * 100}%)`;
  }
}
