
<script>
export default {
  created() {
    this.$bus.$on('start-draw', this.sendData);
  },
  beforeDestroy() {
    this.$bus.$off('start-draw', this.sendData);
  },
  methods: {
    sendData() {
      const data = {
        vars: this.vars,
        borders: this.borders,
      };
      this.$bus.$emit('draw-func', { data, func: this.drawFunction });
    },
  },
};
</script>
