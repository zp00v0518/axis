<template>
  <div class="control">
    control
    <select v-model="activeId">
      <option :value="item.id" v-for="item in equation_list" :key="item.id">{{item.title}}</option>
    </select>
    <div v-if="activeId" class="control__main">
      <component :is="activeId" @get-data="getData"></component>
    </div>
    <div v-if="activeId" class="control__footer">
      <button type="button" class="control__footer--btn" @click="$bus.$emit('start-draw')">Применить</button>
    </div>
  </div>
</template>

<script>
import modules from './Equation';
import { equation_list } from '../utils';

export default {
  name: 'Control',
  components: { ...modules },
  data() {
    return {
      equation_list,
      activeId: null,
    };
  },
  methods: {
    getData(event) {
      console.log(event)
    }
  },
};
</script>

<style lang="scss">
.control{
  padding: 10px;
  &__main{
    margin-bottom: 20px;
  }
  &__footer{
    &--btn{
      padding: 0.5em;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
