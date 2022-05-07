<template>
  <div v-cloak id="works" :class="{ CommonPage }">
    <h1>Coming soon...</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'CommonLayout1',
  computed: mapState([
    'CommonPage'
  ])
}
</script>

<style lang="scss" scoped>
#works {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  >h1 {
    color: rgba(#FFFFFF, .8);
    font-family: 'Jost', sans-serif;
    font-size: 4.0rem;
  }
}
</style>
