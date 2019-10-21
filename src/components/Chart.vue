<template>
  <div class="chart">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Axis from '../utils/Axis';

export default {
  name: "Chart",
  data() {
    return {
      ctx: null,
      canvas: null,
      axis: null,
    };
  },
  methods: {
    setSize() {
      const parent = this.canvas.parentElement;
      const styles = parent.getBoundingClientRect();
      this.canvas.setAttribute("width", styles.width + "px");
      this.canvas.setAttribute("height", styles.height + "px");
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.setSize();
    this.axis = new Axis(this.ctx);
    this.axis.setOrign( this.canvas.width / 2,  this.canvas.height / 2 );
    this.axis.setColor({fill: 'red'})
    this.axis.setCenterSize(3);
    this.axis.draw();
  }
};
</script>

<style lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>
