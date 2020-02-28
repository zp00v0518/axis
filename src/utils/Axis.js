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
    this.centerX = x;
    this.centerY = y;
    this.circleRadius = 1;
    this.zoom = 10;
    this.baseStep = 5;
    this.drawStep = 0.2;
    this.curStep = this.baseStep * this.zoom;
  }
  setOrign(x, y) {
    this.centerX = x;
    this.centerY = y;
  }
  setZoom(num) {
    this.zoom = num <= 2 ? 2 : num;
    this.curStep = this.baseStep * this.zoom;
  }
  setBaseStep(num) {
    this.baseStep = num;
  }
  setDrawStep(num) {
    this.drawStep = num;
  }
  setCircleRadius(circleRadius) {
    this.circleRadius = circleRadius;
  }
  draw() {
    this.drawCenter();
    this.drawBaseLines();
  }
  drawCenter() {
    const { ctx, centerX, centerY, circleRadius, zoom } = this;
    ctx.beginPath();
    const radius = (circleRadius * zoom) / 6;
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
  drawBackgroundGrid() {
    const { curStep } = this;
    let x = this.centerY;
    let y = this.centerX;
    while (y > 0) {
      this.drawLines('y', (y -= curStep));
    }
    while (y < this.canvas.width) {
      this.drawLines('y', (y += curStep));
    }
    while (x > 0) {
      this.drawLines('x', null, (x -= curStep));
    }
    while (x < this.canvas.height) {
      this.drawLines('x', null, (x += curStep));
    }
  }
  drawBaseLines() {
    this.drawLines('x');
    this.drawLines('y');
    this.drawStepOnLine('x');
    this.drawStepOnLine('y');
  }
  drawLines(way, x = this.centerX, y = this.centerY) {
    const { ctx } = this;
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
    const { ctx, centerX, centerY, curStep, circleRadius, zoom } = this;
    let count = 1;
    let point;
    const radius = ((circleRadius / 2) * zoom) / 6;
    const general = [radius, 0, 2 * Math.PI];
    ctx.beginPath();
    if (way === 'y') {
      point = centerY - curStep;
      while (point > 0) {
        ctx.arc(centerX, point, ...general);
        ctx.arc(centerX, point + count * curStep * 2, ...general);
        point -= curStep;
        ++count;
      }
    } else if (way === 'x') {
      point = centerX - curStep;
      while (point > 0) {
        ctx.arc(point, centerY, ...general);
        ctx.arc(point + count * curStep * 2, centerY, ...general);
        point -= curStep;
        ++count;
      }
    }
    ctx.fill();
    ctx.closePath();
  }
}

export default Axis;
