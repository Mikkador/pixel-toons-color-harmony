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
    const a = this._s * Math.min(this._l, 1 - this._l);
    const f = (n) => {
      const k = (n + this._h / 30) % 12;
      const color = this._l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    this._hex = `#${f(0)}${f(8)}${f(4)}`;
    this.fromHex();
  }

  fromHsv() {
    const i = Math.floor(this._h * 6);
    const f = this._h * 6 - i;
    const p = this._v * (1 - this._s);
    const q = this._v * (1 - f * this._s);
    const t = this._v * (1 - (1 - f) * this._s);
    switch (i % 6) {
      case 0: this._r = this._v, this._g = t, this._b = p; break;
      case 1: this._r = q, this._g = this._v, this._b = p; break;
      case 2: this._r = p, this._g = this._v, this._b = t; break;
      case 3: this._r = p, this._g = q, this._b = this._v; break;
      case 4: this._r = t, this._g = p, this._b = this._v; break;
      case 5: this._r = this._v, this._g = p, this._b = q; break;
    }
    this._r = Math.round(this._r * 255);
    this._g = Math.round(this._g * 255);
    this._b = Math.round(this._b * 255);
    this._hex = `#${this._r.toString(16)}${this._g.toString(16)}${this._b.toString(16)}`;
    this.fromRgb();
  }

  copy() {
    return new ColorRgb(this._hex);
  }

  rgbCss() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  hslCss() {
    return `hsl(${this.h}, ${this.s}, ${this.l})`;
  }

  hsvCss() {
    return `hsv(${this.h}, ${this.s}, ${this.v})`;
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
