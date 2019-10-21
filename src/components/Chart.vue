<template>
  <div class="chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Axis from "../utils/Axis";

export default {
  name: "Chart",
  data() {
    return {
      ctx: null,
      canvas: null,
      axis: null
    };
  },
  methods: {
    setSize() {
      const parent = this.canvas.parentElement;
      const styles = parent.getBoundingClientRect();
      this.canvas.setAttribute("width", styles.width + "px");
      this.canvas.setAttribute("height", styles.height + "px");
    },
    draw() {
      const {ctx, canvas, axis} = this;
      ctx.clearRect(0,0,canvas.width, canvas.height)
      axis.draw();
    },
    zoomingCanvas(event){
      const {wheelDelta} = event;
      const {axis} = this;
      const zoom = axis.zoom;
      const zoomStep = 1;
      if (wheelDelta < 0 ){
        axis.setZoom(zoom + zoomStep);
      } else {
        axis.setZoom(zoom  - zoomStep);
      }
      this.draw();
    }
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.setSize();
    this.axis = new Axis(this.ctx);
    this.axis.setOrign(this.canvas.width / 2, this.canvas.height / 2);
    // this.axis.setColor({ fill: "red" });
    this.axis.setCenterSize(3);
    this.draw();
    window.addEventListener("resize", this.draw);
    this.canvas.addEventListener("wheel", this.zoomingCanvas);
  }
};
</script>

<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
