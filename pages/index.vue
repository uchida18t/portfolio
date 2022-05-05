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
      <div class="top_container-text" :class="`top_container-text${activeSlide}`">
        <template v-if="activeSlide === 1">
          <div class="top_container-text-inner" :class="`top_container-text${activeSlide}-inner`">
            <h2>Hello.<br>I'm Teruya Uchida.</h2>
            <nuxt-link to="/contact/" class="btn1">
              Contact me!
            </nuxt-link>
          </div>
        </template>
        <template v-if="activeSlide === 2">
          <div class="top_container-text-inner" :class="`top_container-text${activeSlide}-inner`">
            <dl :class="`top_container-text${activeSlide}-grid`">
              <template v-for="item in about">
                <dt v-if="item[0].length < 8" :key="item[0]" class="normal jost">
                  {{ item[0] }}
                </dt>
                <dt v-else :key="item[0]" class="smaller jost">
                  {{ item[0] }}
                </dt>
                <dd :key="item[1][0]" :class="{ jost: item[1][1].jost }">
                  {{ item[1][0] }}
                </dd>
              </template>
            </dl>
            <nuxt-link to="/about/" class="btn1">
              Learn more
            </nuxt-link>
          </div>
        </template>
        <template v-if="activeSlide === 3">
          <div class="top_container-text-inner" :class="`top_container-text${activeSlide}-inner`">
            <ul :class="`top_container-text${activeSlide}-flex`">
              <li v-for="(item, key) in skill" :key="key" :class="`top_container-text${activeSlide}-item`">
                <i :class="`${item[0]} ${item[1]}`" />
              </li>
            </ul>
            <nuxt-link to="/skill/" class="btn1">
              Learn more
            </nuxt-link>
          </div>
        </template>
        <template v-if="activeSlide === 4">
          <div class="top_container-text-inner" :class="`top_container-text${activeSlide}-inner`">
            <p>Coming Soon</p>
            <nuxt-link to="/works/" class="btn1">
              Learn more
            </nuxt-link>
          </div>
        </template>
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
      activeSlide: 1,
      about: {
        a1: ['Weight', ['62kg', { jost: true }]],
        a2: ['Job', ['Frontend Dev.', { jost: true }]],
        a3: ['Recent Hobby', ['節約、ムーミン', { jost: false }]],
        a4: ['Weakness', ['朝、寒さ、イケイケの美容院', { jost: false }]]
      },
      skill: [
        ['lab', 'la-html5'], ['lab', 'la-css3-alt'], ['lab', 'la-sass'], ['lab', 'la-js-square'],
        ['lab', 'la-vuejs'], ['lab', 'la-nuxtjs'], ['lab', 'la-gulp']
      ]
    }
  },
  computed: mapState([
    'CommonPage'
  ]),
  watch: {
    // isChanging (newValue) {
    //   const textInner = document.querySelector('.top_container-text-inner')
    //   if (newValue === true) {
    //     textInner.classList.add('is_changing')
    //   } else {
    //     textInner.classList.remove('is_changing')
    //   }
    // },
    activeSlide (newValue, oldValue) {
      const parentSlides = document.querySelector('.top_container-slides')
      const slides = document.querySelectorAll('.top_container-slide')
      if (
        newValue === oldValue - 1 ||
        (oldValue === 1 && newValue === slides.length)
      ) {
        const cloneSlide = slides[slides.length - 1].cloneNode(true)
        parentSlides.removeChild(slides[slides.length - 1])
        parentSlides.prepend(cloneSlide)
      } else if (
        newValue === oldValue + 1 ||
        (oldValue === slides.length && newValue === 1)
      ) {
        const cloneSlide = slides[0].cloneNode(true)
        parentSlides.removeChild(slides[0])
        parentSlides.appendChild(cloneSlide)
      }
    }
  },
  // mounted () {
  //   // const parentSlides = document.querySelectorAll('.top_container-slides')
  //   // const slides = document.querySelectorAll('.top_container-slide')
  //   // slides.forEach((slide, index) => { })
  // },
  methods: {
    changeSlide (dir) {
      const btns = document.querySelectorAll('.top_container-operation-btn')
      const value = document.querySelector('.top_container-operation-value')
      const textInner = document.querySelector('.top_container-text-inner')
      btns.forEach(btn => btn.classList.add('changing'))
      value.classList.add(`changing_to-${dir}`)
      if (dir === 'prev') {
        textInner.classList.add('is_changing-prev')
        setTimeout(() => {
          if (this.activeSlide === 1) {
            this.activeSlide = 4
          } else {
            this.activeSlide--
          }
          value.classList.remove(`changing_to-${dir}`)
          btns.forEach(btn => btn.classList.remove('changing'))
          textInner.classList.remove('is_changing-prev')
        }, 300)
      } else if (dir === 'next') {
        textInner.classList.add('is_changing-next')
        setTimeout(() => {
          if (this.activeSlide < 4) {
            this.activeSlide++
          } else {
            this.activeSlide = 1
          }
          value.classList.remove(`changing_to-${dir}`)
          btns.forEach(btn => btn.classList.remove('changing'))
          textInner.classList.remove('is_changing-next')
        }, 300)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");
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
      user-select: none;
      pointer-events: none;
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
            // opacity: #{1 - ($i * .2)};
            &.already {
              z-index: calc(5 - #{$i});
            }
          }
        }
      }
    }
    &-text {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-self: stretch;
      max-height: 100%;
      position: relative;
      &1 {
        align-items: flex-start;
        padding: 3% 6%;
        &-inner {
          // background-color: rgba(#FFFFFF, .1);
          >h2 {
            font-family: 'Jost', sans-serif;
            font-weight: 400;
            font-size: 6.2rem;
            letter-spacing: .04em;
            line-height: 1.2;
            text-shadow: 6px 6px 12px rgba(#000000, .7);
            & + .btn1 {
              @include btn1(220);
              margin: 56px auto 0;
            }
          }
        }
      }
      &2 {
        align-items: flex-start;
        padding: 2.5% 6%;
        &-grid {
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-gap: 24px 68px;
          gap: 24px 68px;
          >dt, >dd {
            align-self: center;
          }
          >dt {
            font-family: 'Jost', sans-serif;
            font-size: 3.2rem;
            position: relative;
            &::before, &::after {
              content: "";
              display: block;
              position: absolute;
              top: 50%;
              right: -16px;
              width: 3px;
              height: 3px;
              border-radius: 50%;
              background-color: #FFFFFF;
            }
            &::before {
              transform: translateY(calc(-50% - 4px));
            }
            &::after {
              transform: translateY(calc(-50% + 4px));
            }
            &.smaller {
              font-size: 2.1rem;
            }
          }
          >dd {
            font-size: 2.4rem;
            line-height: 1.4;
            &.jost {
              font-family: 'Jost', sans-serif;
            }
          }
          & + .btn1 {
            @include btn1(180, 18);
            margin: 40px auto 0;
          }
        }
      }
      &3 {
        align-items: center;
        padding: 2.5% 6%;
        &-flex {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-evenly;
          align-items: center;
          margin: auto;
          max-width: 540px;
          & + .btn1 {
            @include btn1(180, 18);
            margin: 24px auto 0;
          }
        }
        &-item {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
          align-self: stretch;
          transition: transform .2s ease-out;
          >i {
            font-size: 11.0rem;
            &::before {
              font-size: inherit;
            }
            &.la-nuxtjs {
              font-size: 2.2rem;
            }
          }
          &:hover {
            transform: scale(1.16);
          }
        }
      }
      &4 {
        align-items: center;
        padding: 2.5% 6%;
        p {
          font-family: 'Jost', sans-serif;
          font-size: 3.2rem;
          & + .btn1 {
            @include btn1(180, 18);
            margin: 36px auto 0;
          }
        }
      }
      &-inner {
        opacity: 0;
        @include slideFadeIn;
        &.is_changing-prev {
          @include prevSlideOut;
        }
        &.is_changing-next {
          @include nextSlideOut;
        }
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
        font-family: 'Jost', sans-serif;
        font-weight: 300;
        font-size: 1.6rem;
        letter-spacing: .04em;
        position: relative;
        overflow: hidden;
        @include blinking;
        >span {
          display: inline-block;
          margin-right: 3px;
          color: rgba(#FFFFFF, .7);
          font-family: inherit;
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
