<template>
  <section v-cloak id="top" class="top" :class="{ CommonPage }">
    <div class="top_container">
      <ul id="topSlides" class="top_container-slides">
        <li v-for="(item, key) in allSlides" :key="key" class="top_container-slide">
          <picture class="top_container-slide-pic">
            <source :srcset="`/portfolio/images/top/${item}.webp`" type="image/webp">
            <img :src="`/portfolio/images/top/${item}.jpg`" :alt="`${item}`">
          </picture>
        </li>
      </ul>
      <div id="topTexts" class="top_container-text" :class="`top_container-text${activeSlide}`">
        <template v-if="activeSlide === 1">
          <div class="top_container-text-inner" :class="`top_container-text${activeSlide}-inner`">
            <h2>
              <span
                v-for="(item, key, index) in mvText1"
                :key="index"
                :style="{ animationDelay: `${Math.round(key * .1 * 10) / 10}s` }"
              >{{ item }}</span><br>
              <span
                v-for="(item, key, index) in mvText2"
                :key="index"
                :style="{ animationDelay: `${Math.round(key * .1 * 10) / 10}s` }"
              >{{ item }}</span>
            </h2>
            <nuxt-link to="/contact/" class="btn1">
              Contact me!
            </nuxt-link>
          </div>
        </template>
        <template v-if="activeSlide === 2">
          <div class="top_container-text-inner" :class="`top_container-text${activeSlide}-inner`">
            <dl :class="`top_container-text${activeSlide}-grid`">
              <template v-for="(item, key) in about">
                <dt v-if="item[0].length < 8" :key="item[0]" class="normal jost">
                  {{ item[0] }}
                </dt>
                <dt v-else :key="item[0]" class="smaller jost">
                  {{ item[0] }}
                </dt>
                <dd
                  :key="item[1]"
                  :class="{ jost: item[2] }"
                  :style="{ animationDelay: `${Math.round((key * .6 + .5) * 10) / 10}s` }"
                >{{ item[1] }}</dd>
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
              <li
                v-for="(item, key) in skill"
                :key="item[1]"
                :class="`top_container-text${activeSlide}-item`"
                :style="{ animationDelay: `${key * .2}s` }"
              >
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
      <div id="topOperation" class="top_container-operation">
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
      allSlides: ['slide1', 'slide2', 'slide3', 'slide4'],
      activeSlide: 1,
      mvText1: 'Hello.',
      mvText2: 'I\'m Teruya Uchida.',
      about: [
        ['Job', 'Frontend Dev.', true],
        ['Weight', '62kg', true],
        ['Recent Hobby', '節約、ムーミン、ピアノ', false],
        ['Weakness', '朝、寒さ、イケイケの美容院', false]
      ],
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
    activeSlide (newValue, oldValue) {
      const parentSlides = document.getElementById('topSlides')
      const texts = document.getElementById('topTexts')
      const topOperation = document.getElementById('topOperation')
      if (
        newValue === oldValue - 1 ||
        (oldValue === 1 && newValue === this.allSlides.length - 2)
      ) {
        // slide -----------------------------------------
        const cloneAllSlides = this.allSlides
        const prevCloneSlide = cloneAllSlides[cloneAllSlides.length - 3]
        cloneAllSlides.pop()
        cloneAllSlides.unshift(prevCloneSlide)
        this.allSlides = cloneAllSlides
        parentSlides.classList.remove('is_changing-prev')
        texts.classList.remove('is_changing-prev')
        topOperation.classList.remove('is_changing-prev')
      } else if (
        newValue === oldValue + 1 ||
        (oldValue === this.allSlides.length - 2 && newValue === 1)
      ) {
        // slide -----------------------------------------
        const cloneAllSlides = this.allSlides
        const nextCloneSlide = cloneAllSlides[2]
        cloneAllSlides.shift()
        cloneAllSlides.push(nextCloneSlide)
        this.allSlides = cloneAllSlides
        parentSlides.classList.remove('is_changing-next')
        texts.classList.remove('is_changing-next')
        topOperation.classList.remove('is_changing-next')
      }
    }
  },
  mounted () {
    const cloneAllSlides = this.allSlides
    const prevCloneSlide = this.allSlides[this.allSlides.length - 1]
    const nextCloneSlide = this.allSlides[0]
    cloneAllSlides.unshift(prevCloneSlide)
    cloneAllSlides.push(nextCloneSlide)
    this.allSlides = cloneAllSlides
  },
  methods: {
    changeSlide (dir) {
      const parentSlides = document.getElementById('topSlides')
      const texts = document.getElementById('topTexts')
      const topOperation = document.getElementById('topOperation')
      if (dir === 'prev') {
        parentSlides.classList.add('is_changing-prev')
        texts.classList.add('is_changing-prev')
        topOperation.classList.add('is_changing-prev')
        setTimeout(() => {
          if (this.activeSlide === 1) {
            this.activeSlide = this.allSlides.length - 2
          } else {
            this.activeSlide--
          }
        }, 400)
      } else if (dir === 'next') {
        parentSlides.classList.add('is_changing-next')
        texts.classList.add('is_changing-next')
        topOperation.classList.add('is_changing-next')
        setTimeout(() => {
          if (this.activeSlide === this.allSlides.length - 2) {
            this.activeSlide = 1
          } else {
            this.activeSlide++
          }
        }, 400)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");
// line awesome -----------------------
.lab {
  &.la-html5, &.la-css3-alt, &.la-sass, &.la-js-square, &.la-vuejs, &.la-gulp {
    font-family: 'Line Awesome Brands';
    &::before {
      font-family: 'Line Awesome Brands';
    }
  }
  &.la-nuxtjs {
    font-family: 'Poppins', sans-serif;
    &::before {
      content: "NUXTJS";
      font-family: 'Poppins', sans-serif;
    }
  }
}
// -----------------------
#top {
  @include cloakIn;
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
    $slides: slide1, slide2, slide3, slide4;
    $length: length($slides);
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
      opacity: 1;
      box-shadow: 4px 4px 6px rgba(#000000, .5);
      user-select: none;
      pointer-events: none;
      transform-style: preserve-3d;
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
      &:first-of-type {
        filter: brightness(1);
        transform: translate3d(-12px, -12px, 0);
        opacity: 0;
        z-index: #{$length + 1};
      }
      &:last-of-type {
        filter: brightness(0);
        transform: translate3d(#{$length * 12}px, #{$length * 12}px, 0);
        opacity: 0;
        z-index: 0;
      }
      @for $i from 2 through $length + 1 {
        &:nth-of-type(#{$i}) {
          filter: brightness(#{1.52 - ($i * .26)});
          transform: translate3d(#{($i - 2) * 12}px, #{($i - 2) * 12}px, 0);
          z-index: #{$length + 2 - $i};
        }
      }
    }
    &-slides {
      &.is_changing-prev {
        >.top_container-slide {
          &:first-of-type {
            transition: transform .4s ease-out, opacity .4s ease-out;
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
          &:nth-of-type(#{$length + 1}) {
            transition: transform .4s ease-out, opacity .4s ease-out;
            transform: translate3d(#{$length * 12}px, #{$length * 12}px, 0);
            opacity: 0;
          }
          &:last-of-type {
            filter: brightness(1);
            transform: translate3d(-12px, -12px, 0);
          }
          @for $i from 2 through $length {
            &:nth-of-type(#{$i}) {
              transition: filter .4s ease-out, transform .4s ease-out;
              filter: brightness(#{1.26 - ($i * .26)});
              transform: translate3d(#{($i - 1) * 12}px, #{($i - 1) * 12}px, 0);
            }
          }
        }
      }
      &.is_changing-next {
        >.top_container-slide {
          &:first-of-type {
            filter: brightness(0);
            transform: translate3d(#{$length * 12}px, #{$length * 12}px, 0);
          }
          &:nth-of-type(2) {
            transition: transform .4s ease-out, opacity .4s ease-out;
            transform-origin: bottom left;
            transform: translate3d(-12px, -12px, 0);
            opacity: 0;
          }
          &:last-of-type {
            transition: filter .4s ease-out, transform .4s ease-out, opacity .4s ease-out;
            filter: brightness(#{1.26 - ($length * .26)});
            transform: translate3d(#{($length - 1) * 12}px, #{($length - 1) * 12}px, 0);
            opacity: 1;
          }
          @for $i from 3 through $length + 1 {
            &:nth-of-type(#{$i}) {
              transition: filter .4s ease-out, transform .4s ease-out;
              filter: brightness(#{1.78 - ($i * .26)});
              transform: translate3d(#{($i - 3) * 12}px, #{($i - 3) * 12}px, 0);
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
      transition: opacity 1.2s .2s;
      &1 {
        align-items: flex-start;
        padding: 3% 6%;
        &-inner {
          >h2 {
            >span {
              display: inline-block;
              white-space: pre;
              font-family: 'Jost', sans-serif;
              font-weight: 400;
              font-size: 6.2rem;
              letter-spacing: .04em;
              line-height: 1.2;
              text-shadow: 6px 6px 12px rgba(#000000, .7);
              @include text1In;
            }
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
            @include text2In;
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
          @include text3In;
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
      &.is_changing-prev {
        opacity: 0;
        transition: opacity .35s;
        >.top_container-text-inner {
          transition: transform .35s;
          transform: translateX(8%);
        }
      }
      &.is_changing-next {
        opacity: 0;
        transition: opacity .3s;
        >.top_container-text-inner {
          transition: transform .3s;
          transform: translateX(-8%);
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
        user-select: none;
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
      }
      &.is_changing-prev {
        cursor: pointer;
        >.top_container-operation-btn {
          pointer-events: none;
        }
        .value-current {
          transition: all .3s ease-out;
          transform: translateY(100%);
          opacity: 0;
        }
        .dummy_value-prev {
          transition: all .3s ease-out;
          transform: translateY(100%);
          opacity: 1;
        }
      }
      &.is_changing-next {
        cursor: pointer;
        >.top_container-operation-btn {
          pointer-events: none;
        }
        .value-current {
          transition: all .3s ease-out;
          transform: translateY(-100%);
          opacity: 0;
        }
        .dummy_value-next {
          transition: all .3s ease-out;
          transform: translateY(-100%);
          opacity: 1;
        }
      }
    }
  }
}
</style>
