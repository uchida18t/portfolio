<template>
  <section v-cloak id="top" class="top" :class="{ CommonPage }">
    <div class="top_container">
      <ul class="top_container-slides active1">
        <li v-for="item in 4" :key="item" class="top_container-slide already">
          <picture class="top_container-slide-pic">
            <source :srcset="`/portfolio/images/top/slide${item}.webp`" type="image/webp">
            <img :src="`/portfolio/images/top/slide${item}.jpg`" :alt="`slide${item}`">
          </picture>
        </li>
      </ul>
      <div class="top_container-text">
        <h2>ダミーダミー</h2>
      </div>
      <div class="top_container-operation">
        <div class="top_container-operation-btn top_container-operation-prev" @click="changeSlide('prev')" />
        <p class="top_container-operation-value">
          <span v-if="activeSlide === 1" class="dummy_value-prev">{{ activeSlide + 3 }}</span>
          <span v-else class="dummy_value-prev">{{ activeSlide - 1 }}</span>
          <span class="value-current">{{ activeSlide }}</span>/4
          <span v-if="activeSlide === 4" class="dummy_value-next">{{ activeSlide - 3 }}</span>
          <span v-else class="dummy_value-next">{{ activeSlide + 1 }}</span>
        </p>
        <div class="top_container-operation-btn top_container-operation-next" @click="changeSlide('next')" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'CommonLayout1',
  data () {
    return {
      activeSlide: 1
    }
  },
  computed: mapState([
    'CommonPage'
  ]),
  watch: {
    activeSlide () {
      // const parentSlides = document.querySelectorAll('.top_container-slides')
      // const slides = document.querySelectorAll('.top_container-slide')
      // const cloneSlide = slides[0].cloneNode(true)
      // parentSlides.appendChild(cloneSlide)
    }
  },
  // mounted () {
  //   const parentSlides = document.querySelectorAll('.top_container-slides')
  //   const slides = document.querySelectorAll('.top_container-slide')
  //   slides.forEach((slide, index) => { })
  // },
  methods: {
    changeSlide (dir) {
      const btns = document.querySelectorAll('.top_container-operation-btn')
      const value = document.querySelector('.top_container-operation-value')
      btns.forEach(btn => btn.classList.add('changing'))
      value.classList.add(`changing_to-${dir}`)
      if (dir === 'prev') {
        setTimeout(() => {
          if (this.activeSlide === 1) {
            this.activeSlide = 4
          } else {
            this.activeSlide--
          }
          value.classList.remove(`changing_to-${dir}`)
          btns.forEach(btn => btn.classList.remove('changing'))
        }, 300)
      } else if (dir === 'next') {
        setTimeout(() => {
          if (this.activeSlide < 4) {
            this.activeSlide++
          } else {
            this.activeSlide = 1
          }
          value.classList.remove(`changing_to-${dir}`)
          btns.forEach(btn => btn.classList.remove('changing'))
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes changingToPrev {
  50%, 100% { transform: translateY(100%); opacity: 0; }
}
@keyframes changingToNext {
  50%, 100% { transform: translateY(-100%); opacity: 0; }
}
.top {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #FFFFFF;
  &_container {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-column-gap: 20px;
    column-gap: 20px;
    align-items: center;
    margin: auto;
    max-width: 1200px;
    width: calc(100% - 60px);
    padding-bottom: 48px;
    position: relative;
    &-slides {
      align-self: center;
      max-height: 100%;
      border-radius: 4px;
      filter: drop-shadow(5px 5px 12px rgba(#000000, .4));
      position: relative;
      &::before {
        content: "";
        display: block;
        padding-top: 75%;
      }
    }
    &-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &-pic {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }
    }
    &-slides {
      $slides: slide1, slide2, slide3, slide4;
      $length: length($slides);
      // @for $activeNumber from 1 through $length {
      //   &.active#{$activeNumber} {
      //     @for $i from 1 through $length {
      //       >.top_container-slide:nth-of-type(#{$i}) {
      //         transform: translate3d(calc(#{$i - $activeNumber}px * 8), calc(#{$i - $activeNumber}px * 8), 0);
      //         opacity: #{1 - ($activeNumber * .2)};
      //         &.already {
      //           z-index: calc(5 - #{$activeNumber});
      //         }
      //       }
      //     }
      //   }
      // }
      &.active1 {
        @for $i from 1 through $length {
          >.top_container-slide:nth-of-type(#{$i}) {
            transform: translate3d(calc(#{$i - 1}px * 8), calc(#{$i - 1}px * 8), 0);
            opacity: #{1 - ($i * .2)};
            &.already {
              z-index: calc(5 - #{$i});
            }
          }
        }
      }
    }
    &-text {
      align-self: start;
      max-height: 100%;
      position: relative;
      h2 {
        font-size: 32px;
      }
    }
    &-operation {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 0;
      right: 0;
      width: 60%;
      height: 48px;
      user-select: none;
      &-btn {
        width: 44px;
        height: calc(100% - 10px);
        position: relative;
        cursor: pointer;
        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 11px;
          height: 11px;
          border-top: 2px solid rgba(#FFFFFF, .5);
          border-left: 2px solid rgba(#FFFFFF, .5);
          transition: all .3s;
        }
        &:hover::before {
          border-top: 2px solid rgba(#FFFFFF, 1);
          border-left: 2px solid rgba(#FFFFFF, 1);
        }
        &.changing {
          pointer-events: none;
        }
      }
      &-prev {
        &::before {
          transform: translate(-40%, -20%) rotate(-45deg);
        }
        &:hover::before {
          transform: translate(-40%, -20%) rotate(-45deg) scale(1.1);
        }
      }
      &-next {
        &::before {
          transform: translate(-60%, -20%) rotate(135deg);
        }
        &:hover::before {
          transform: translate(-60%, -20%) rotate(135deg) scale(1.1);
        }
      }
      &-value {
        color: rgba(#FFFFFF, .5);
        font-family: 'Jost', sans-serif;
        font-weight: 300;
        font-size: 1.6rem;
        letter-spacing: .04em;
        position: relative;
        overflow: hidden;
        >span {
          display: inline-block;
          margin-right: 3px;
          color: rgba(#FFFFFF, .7);
          font-weight: 300;
          font-size: 4.0rem;
          &.value-current {
            min-width: 23px;
          }
          &.dummy_value-prev, &.dummy_value-next {
            position: absolute;
            left: 0;
            opacity: 0;
          }
          &.dummy_value-prev {
            bottom: 100%;
          }
          &.dummy_value-next {
            top: 100%;
          }
        }
        &.changing_to-prev >span {
          &.value-current {
            transition: all .3s ease-out;
            transform: translateY(100%);
            opacity: 0;
          }
          &.dummy_value-prev {
            transition: all .3s ease-out;
            transform: translateY(100%);
            opacity: 1;
          }
        }
        &.changing_to-next >span {
          &.value-current {
            transition: all .3s ease-out;
            transform: translateY(-100%);
            opacity: 0;
          }
          &.dummy_value-next {
            transition: all .3s ease-out;
            transform: translateY(-100%);
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
