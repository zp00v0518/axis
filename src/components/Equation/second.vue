<template>
  <div class="vars">
    <div v-for="(value, index) in vars" :key="index" class="vars__item">
      <span class="vars__item--title">{{index}}</span>
      <input type="text" v-model="vars[index]" class="vars__item--value" />
    </div>
    <div class="vars__borders">
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">x от</span>
        <input type="text" v-model="borders.minX" class="vars__item--value" />
      </div>
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">x до</span>
        <input type="text" v-model="borders.maxX" class="vars__item--value" />
      </div>
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">y от</span>
        <input type="text" v-model="borders.minY" class="vars__item--value" />
      </div>
      <div class="vars__item vars__borders__item">
        <span class="vars__item--title">y до</span>
        <input type="text" v-model="borders.maxY" class="vars__item--value" />
      </div>
    </div>
  </div>
</template>

<script>
import { borders } from '../../utils';
import mixin from './mixin';

export default {
  name: 'second',
  mixins: [mixin],
  data() {
    return {
      vars: {
        a: 2,
        b: 3,
        c: 2,
      },
      borders,
    };
  },
  methods: {
    drawFunction(data, axis) {
      const { ctx, zoom, drawStep, centerX, centerY, curStep } = axis;
      const { vars, borders } = data;
      const { minX, maxX } = borders;
      function yFunc(x, vars) {
        const { a, b, c } = vars;
        return a * Math.sqrt(x, 2) + b * x + c;
      }
      axis.setColor({ stroke: 'blue' });
      ctx.lineWidth = 0.2 * zoom;
      ctx.beginPath();
      for (let i = minX; i <= maxX; i += drawStep) {
        const x = i * curStep + centerX;
        const y = yFunc(i, vars) * curStep + centerY;
        ctx[i ? 'lineTo' : 'moveTo'](x, y);
      }
      ctx.stroke();
    },
  },
};
</script>

<style lang="scss">
</style>