<template>
  <div class="vars">
    <div v-for="(value, index) in vars" :key="index" class="vars__item">
      <span class="vars__item--title">{{index}}</span>
      <input type="text" v-model="vars[index]" class="vars__item--value" />
    </div>
    <div class="vars__borders">
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">x от</span>
        <input type="text" v-model="borders.xMin" class="vars__item--value" />
      </div>
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">x до</span>
        <input type="text" v-model="borders.xMax" class="vars__item--value" />
      </div>
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">y от</span>
        <input type="text" v-model="borders.yMin" class="vars__item--value" />
      </div>
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">y до</span>
        <input type="text" v-model="borders.yMax" class="vars__item--value" />
      </div>
    </div>
  </div>
</template>

<script>
import { borders } from '../../utils';
export default {
  name: 'second',
  data() {
    return {
      vars: {
        a: '',
        b: '',
      },
      borders,
    };
  },
  created() {
    this.$bus.$on('start-draw', this.sendData);
  },
  beforeDestroy() {
    this.$bus.$off('start-draw', this.sendData);
  },
  methods: {
    sendData() {
			this.$bus.$emit('draw-func', {data: this.vars, func: this.drawFunction})
		},
		drawFunction(data, ctx){
			console.log(ctx.canvas)
		}
  },
};
</script>

<style lang="scss">
</style>