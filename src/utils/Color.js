class Color {
  constructor(ctx, fill = "black", stroke = "black") {
    this.ctx = ctx;
    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = stroke;
  }
  setColor({ fill, stroke }) {
    this.ctx.fillStyle = fill ? fill : this.ctx.fillStyle;
    this.ctx.strokeStyle = stroke ? stroke : this.ctx.strokeStyle;
  }
  resetColor(type) {
    const blackColor = "#000000";
    if (type !== undefined) {
      const key = type + "Style";
      this.ctx[key] = blackColor;
      return;
    }
    this.ctx.fillStyle = blackColor;
    this.ctx.strokeStyle = blackColor;
  }
}

export default Color;
