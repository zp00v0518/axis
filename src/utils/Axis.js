import Color from './Color';
class Axis extends Color {
  constructor(ctx, x = 0, y = 0, options) {
    super(ctx);
    if (!ctx) {
      console.log('CTX is requierd');
      return;
    }
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = 1;
  }
  setOrign(x, y) {
    this.x = x;
    this.y = y;
  }
  setCenterSize(size) {
    this.size = size;
  }
  draw() {
    this.drawCenter();
  }
  drawCenter() {
    const { ctx, x, y, size } = this;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}

export default Axis;
