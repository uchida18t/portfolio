<template>
  <header class="header">
    <div class="header_icon" :class="{ 'header_icon-active': isHeaderMenu }" @click="toggleHeaderMenu">
      <span v-for="item in 3" :key="item" class="header_icon-line" />
    </div>
    <nav class="header_nav" :class="{ 'header_nav-active': isHeaderMenu }">
      <ul class="header_nav-container">
        <li v-for="(item, key) in headerLineup" :key="key" class="header_nav-item" @click="toggleHeaderMenu">
          <nuxt-link :to="item.url">
            {{ item.type }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: mapState([
    'isHeaderMenu',
    'headerLineup'
  ]),
  methods: mapMutations([
    'toggleHeaderMenu'
  ])
}
</script>

<style lang="scss" scoped>
@keyframes iconLine {
  0%, 100% { transform: scale(.86 ,1) }
  50% { transform: scale(1.16 ,1) }
}
.header {
  display: flex;
  flex-flow: row wrap;
  justify-content: right;
  align-items: center;
  width: 100%;
  min-height: $headerHeight;
  padding: 0 20px;
  background-image: linear-gradient(to right, rgba(#000000, .94), rgba(#0b005f, .94));
  box-shadow: 0 6px 20px rgba(#000000, .16);
  position: relative;
  top: 0;
  left: 0;
  z-index: 100;
  &_icon {
    padding: 4px;
    cursor: pointer;
    transition: transform, .3s, box-shadow .3s;
    &-line {
      display: block;
      width: 32px;
      height: 4px;
      background-color: rgba(#FFFFFF, 1);
      border-radius: 40px;
      @for $i from 1 through 3 {
        &:nth-of-type(#{$i}) {
          transition: all .5s;
          animation: iconLine 2s #{$i * .2}s ease-out infinite;
          @if $i == 2 { transition: all .2s; margin: 5px 0; }
        }
      }
    }
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 50px rgba(#000000, .7);
      .header_icon-line {
        animation: none;
      }
    }
    &-active {
      .header_icon-line {
        animation: none;
        @for $i from 1 through 3 {
          &:nth-of-type(#{$i}) {
            @if $i == 1 { transform: translateY(9px) rotate(-45deg); }
            @if $i == 2 { opacity: 0; }
            @if $i == 3 { transform: translateY(-9px) rotate(45deg); }
          }
        }
      }
    }
  }
  &_nav {
    position: fixed;
    bottom: 0;
    right: 0;
    width: $headerNavW;
    overflow-y: scroll;
    transform: translateX(100%);
    transition: transform .2s ease-out;
    &-container {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      align-items: center;
      min-height: calc(100vh - $headerHeight);
    }
    &-item {
      margin: auto;
      width: calc(100% - 8px);
      position: relative;
      transform: translateY(50%);
      opacity: 0;
      overflow: hidden;
      &::before, &::after {
        content: "";
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        border-radius: 5px;
        transition: all .3s ease-in;
        pointer-events: none;
      }
      &::before {
        top: 0;
        left: 0;
        border-top: 2px solid rgba(#1900da, .8);
        border-left: 2px solid rgba(#1900da, .8);
      }
      &::after {
        bottom: 0;
        right: 0;
        border-bottom: 2px solid rgba(#1900da, .8);
        border-right: 2px solid rgba(#1900da, .8);
      }
      >a {
        display: block;
        width: 100%;
        padding: 24px 0;
        text-align: center;
        color: #FFFFFF;
        font-family: 'Jost', sans-serif;
        font-size: 1.6rem;
        opacity: .75;
        transition: transform .3s ease-out, opacity .2s;
      }
      &:hover {
        &::before, &::after {
          width: 100%;
          height: 100%;
        }
        >a {
          transform: scale(1.16);
          opacity: 1;
        }
      }
    }
    &-active {
      transform: none;
      .header_nav-item {
        transform: none;
        opacity: 1;
        transition: transform .3s .4s ease-out, opacity .5s .4s;
      }
    }
  }
}
</style>
