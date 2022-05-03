<template>
  <section
    v-show="isShow"
    id="CommonSwitch"
    :class="{ switch: true, switching: $store.state.isSwitching }"
  >
    <div class="switch_text">
      <h1>{{ title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'TERUYA UCHIDA',
      required: false
    }
  },
  data () {
    return {
      isShow: true
    }
  },
  mounted () {
    setTimeout(this.start, 1600)
  },
  methods: {
    start () {
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
$black: #222222;
.switch {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  overflow: hidden;
}
h1 {
  font-family: 'Jost', sans-serif;
  font-weight: 300;
}
</style>
