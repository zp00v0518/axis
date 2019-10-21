import Color from './Color';
class Axis extends Color {
  constructor(ctx, x = 0, y = 0) {
    super(ctx);
    if (!ctx) {
      console.log('CTX is requierd');
      return;
    }
    this.ctx = ctx;
    this.canvas = this.ctx.canvas;
    this.x = x;
    this.y = y;
    this.size = 1;
    this.zoom = 5;
    this.baseStep = 5;
    this.curStep = this.baseStep * this.zoom;
  }
  setOrign(x, y) {
    this.x = x;
    this.y = y;
  }
  setZoom(num) {
    this.zoom = num <= 0 ? 1 : num;
    this.curStep = this.baseStep * this.zoom;
  }
  setStep(num) {
    this.baseStep = num;
  }
  setCenterSize(size) {
    this.size = size;
  }
  draw() {
    this.drawCenter();
    this.drawBaseLines();
  }
  drawCenter() {
    const { ctx, x, y, size } = this;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  drawBaseLines() {
    this.drawLines('x');
    this.drawLines('y');
    this.drawStepOnLine('x');
    this.drawStepOnLine('y');
  }
  drawLines(way) {
    const { ctx, x, y } = this;
    ctx.beginPath();
    if (way === 'x') {
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
    } else if (way === 'y') {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
    }
    ctx.stroke();
    ctx.closePath();
  }
  drawStepOnLine(way) {
    const { ctx, x, y, curStep, size } = this;
    let count = 1;
    let point;
    const general = [size / 1.5, 0, 2 * Math.PI];
    ctx.beginPath();
    if (way === 'y') {
      point = y - curStep;
      while (point > 0) {
        ctx.arc(x, point, ...general);
        ctx.arc(x, point + count * curStep * 2, ...general);
        point -= curStep;
        ++count;
      }
    } else if (way === 'x') {
      point = x - curStep;
      while (point > 0) {
        ctx.arc(point, y, ...general);
        ctx.arc(point + count * curStep * 2, y, ...general);
        point -= curStep;
        ++count;
      }
    }
    ctx.fill();
    ctx.closePath();
  }
}

export default Axis;
