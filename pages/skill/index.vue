<template>
  <div v-cloak id="top" :class="{ CommonPage }">
    <h1>This is an SKILL page.</h1>
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
#top {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
