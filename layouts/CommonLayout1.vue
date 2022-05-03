<template>
  <div id="CommonLayout1" class="layout1">
    <CommonSwitch />
    <CommonHeader />
    <div class="layout1_base" :class="{ 'layout1_base-slided': isHeaderMenu }">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'isHeaderMenu'
  ])
}
</script>

<style lang="scss" scoped>
.layout1 {
  background-color: #000000;
  overflow: hidden;
  &_base {
    height: calc(100vh - $headerHeight);
    background-color: $black;
    box-shadow: inset -5px 0 14px rgba(#000000, .6);
    transition: all .2s ease-out;
    &-slided {
      transform: translateX($headerNavW * -1);
    }
  }
}
</style>
