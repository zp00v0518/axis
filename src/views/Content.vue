<template>
  <div class="content">
    <div class="content__control">
      <Control/> 
    </div>
    <div class="content__chart">
      <Chart/>
    </div>
  </div>
</template>

<script>
import Control from "../components/Control";
import Chart from "../components/Chart";

export default {
  name: "Content",
  components: { Control, Chart }
};
</script>

<style lang="scss">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  &__control{
    border: 1px solid;
    width: 20%;
    min-width: 200px;
  }
  &__chart{
    border: 1px solid;
    flex-grow: 2;
    width: 80%;
  }
}
</style>