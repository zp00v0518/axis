<template>
  <div class="chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Axis from '../utils/Axis';

export default {
  name: 'Chart',
  data() {
    return {
      ctx: null,
      canvas: null,
      axis: null,
      timerId: null,
      drawData: null,
      drawFunc: null,
    };
  },
  created() {
    this.$bus.$on('draw-func', this.drawMathFunc);
  },
  methods: {
    drawMathFunc(event) {
      const { data, func } = event;
      this.drawData = data;
      this.drawFunc = func;
      this.draw();
    },
    setSize() {
      this.canvas = this.$refs.canvas;
      const parent = this.canvas.parentElement;
      const styles = parent.getBoundingClientRect();
      this.canvas.setAttribute('width', styles.width + 'px');
      this.canvas.setAttribute('height', styles.height + 'px');
    },
    draw() {
      const { ctx, canvas, axis } = this;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawBackground();
      this.axis.setColor({ stroke: 'red' });
      axis.draw();
      this.axis.resetColor();
      if (this.drawFunc) {
        this.drawFunc(this.drawData, this.axis);
      }
    },
    drawBackground() {
      this.axis.setColor({ stroke: '#F0F0F2' });
      this.axis.ctx.lineWidth = 0.2 * this.axis.zoom;
      this.axis.drawBackgroundGrid();
    },
    zoomingCanvas(event) {
      const { wheelDelta } = event;
      const { axis } = this;
      const zoom = axis.zoom;
      const zoomStep = 1;
      if (wheelDelta < 0) {
        axis.setZoom(zoom + zoomStep);
      } else {
        axis.setZoom(zoom - zoomStep);
      }
      this.draw();
    },
    init() {
      this.canvas = this.$refs.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.setSize();
      if (!this.axis) {
        this.axis = new Axis(this.ctx);
      }
      this.axis.setOrign(this.canvas.width / 2, this.canvas.height / 2);
      this.axis.setCircleRadius(3);
    },
    handlerResize() {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.timerId = setTimeout(() => {
        this.init();
        this.draw();
      }, 250);
    },
  },
  mounted() {
    this.init();
    this.draw();
    window.addEventListener('resize', this.handlerResize);
    this.canvas.addEventListener('wheel', this.zoomingCanvas);
  },
};
</script>

<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
