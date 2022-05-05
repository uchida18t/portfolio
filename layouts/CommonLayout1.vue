<template>
  <div id="CommonLayout1" class="layout1">
    <CommonHeader />
    <div class="layout1_base" :class="{ 'layout1_base-slided': isHeaderMenu }">
      <div class="layout1_base-credit">
        <p>©2022 Teruya Uchida All rights reserved.</p>
      </div>
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
    padding: 40px;
    background-color: $black;
    box-shadow: inset -5px 0 14px rgba(#000000, .6);
    transition: all .2s ease-out;
    position: relative;
    &-credit {
      position: absolute;
      bottom: 16px;
      right: 16px;
      >p {
        color: rgba(#FFFFFF, .7);
        font-family: 'Jost', sans-serif;
        font-size: 1.1rem;
        letter-spacing: .04em;
      }
    }
    &-slided {
      transform: translateX($headerNavW * -1);
    }
  }
}
</style>
