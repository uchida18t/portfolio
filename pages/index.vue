<template>
  <section v-cloak id="top" class="top" :class="{ CommonPage }">
    <div class="top_container">
      <ul>
        <li v-for="item in slides" :key="item">
          <picture>
            <img :src="`/images/top/${item}.jpg`" :alt="item">
          </picture>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'CommonLayout1',
  data () {
    return {
      slides: ['slide1', 'slide2', 'slide3', 'slide4'],
      activeSlide: undefined
    }
  },
  computed: mapState([
    'CommonPage'
  ])
}
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #FFFFFF;
  h1 {
    font-size: 2.6rem;
  }
}
</style>
