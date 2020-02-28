<template>
  <div class="vars">
    <div v-for="(value, index) in vars" :key="index" class="vars__item">
      <span class="vars__item--title">{{index}}</span>
      <input type="number" v-model="vars[index]" class="vars__item--value" />
    </div>
    <div class="vars__borders"></div>
  </div>
</template>

<script>
import { borders } from '../../utils';
import mixin from './mixin';

export default {
  name: 'first',
  mixins: [mixin],
  data() {
    return {
      vars: {
        a: 3,
      },
      borders,
    };
  },
  methods: {
    drawFunction(data, axis) {
      const { ctx, zoom, drawStep, centerX, centerY, curStep } = axis;
      const { vars } = data;
      const maxX = parseFloat(vars.a);
      const minX = 0 - vars.a;
      const yFunc = x => x * x;
      axis.setColor({ stroke: 'blue' });
      ctx.lineWidth = 0.2 * zoom;
      ctx.beginPath();
      for (let i = minX; i <= maxX + drawStep / 2; i += drawStep) {
        const x = i * curStep + centerX;
        const y = -yFunc(i) * curStep + centerY;
        ctx[i ? 'lineTo' : 'moveTo'](x, y);
      }
      ctx.stroke();
    },
  },
};
</script>

<style lang="scss">
.vars {
  &__item {
    font-size: 16px;
    margin: 10px 0;
    display: flex;
    &--title {
      font-weight: 700;
      margin-right: 10px;
      min-width: 30px;
      display: flex;
      align-items: center;
    }
    &--value {
      height: 1.5em;
      padding: 0 5px;
      width: 50%;
      flex-grow: 2;
    }
  }
  &__borders {
    display: flex;
    flex-wrap: wrap;
    &__item {
      max-width: 40%;
      margin: 5px;
    }
  }
}
</style>