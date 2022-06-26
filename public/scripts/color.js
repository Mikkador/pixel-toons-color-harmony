export class ColorRgb {
  constructor(hex) {
    this._hex = hex;
    this.fromHex();
    this.fromRgb();
  }

  fromHex() {
    this._r = parseInt(this._hex.substr(1, 2), 16);
    this._g = parseInt(this._hex.substr(3, 2), 16);
    this._b = parseInt(this._hex.substr(5, 2), 16);
  }

  fromRgb() {
    const r1 = this._r / 255;
    const g1 = this._g / 255;
    const b1 = this._b / 255;
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
    this._h = h;
    this._s = s;
    this._l = l;
    this._v = max;
  }

  fromHsl() {
    const newL = this.l / 100;
    const a = this.s * Math.min(newL, 1 - newL) / 100;
    const f = (n) => {
      const k = (n + this.h / 30) % 12;
      const color = newL - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    this._hex = `#${f(0)}${f(8)}${f(4)}`;
    this.fromHex();
  }

  fromHsv() {

  }

  copy() {
    return new ColorRgb(this._hex);
  }

  rgbCss() {
    return `rgb(${this._r}, ${this._g}, ${this._b}`;
  }

  hslCss() {
    return `hsl(${this._h}, ${this._s * 100}%, ${this._l * 100}%)`;
  }

  hsvCss() {
    return `hsv(${this._h}, ${this._s * 100}%, ${this._v * 100}%)`;
  }

  set hex(value) {
    this._hex = value;
    this.fromHex();
  }

  get hex() {
    return this._hex;
  }

  set r(value) {
    this._r = value;
    this.fromRgb();
  }

  get r() {
    return Math.round(this._r);
  }

  set g(value) {
    this._g = value;
    this.fromRgb();
  }

  get g() {
    return Math.round(this._g);
  }

  set b(value) {
    this._b = value;
    this.fromRgb();
  }

  get b() {
    return Math.round(this._b);
  }

  set h(value) {
    this._h = value;
    this.fromHsl();
  }

  get h() {
    return Math.round(this._h);
  }

  set s(value) {
    this._s = value;
    this.fromHsl();
  }

  get s() {
    return Math.round(this._s * 100) + '%';
  }

  set l(value) {
    this._l = value;
    this.fromHsl();
  }

  get l() {
    return Math.round(this._l * 100) + '%';
  }

  set v(value) {
    this._v = value;
    this.fromHsv();
  }

  get v() {
    return Math.round(this._v * 100) + '%';
  }
}
