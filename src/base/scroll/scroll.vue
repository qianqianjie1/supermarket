<template>
  <swiper :options="swiperOption" ref='swiper'>
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading/loading';
  import {PULL_DOWN_HEIGHT, PULL_DOWN_TEXT_INIT, PULL_DOWN_TEXT_START, PULL_DOWN_TEXT_ING, PULL_DOWN_TEXT_END, PULL_UP_TEXT_INIT, PULL_UP_HEIGHT, PULL_UP_TEXT_START, PULL_UP_TEXT_ING, PULL_UP_TEXT_END} from './config';

  export default {
    name: 'Scroll',
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      finished: {
        type: [Array, Object]
      },
      pullDown: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      }
    },
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    watch: {
      finished() {
        this.updataScroll();
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.pulling = false;
        this.pullDownText = PULL_DOWN_TEXT_INIT;
        this.pullUpText = PULL_UP_TEXT_INIT;
        this.swiperOption = {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          setWrapperSize: true,
          scrollbar: {
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            hide: true
          },
          on: {
            sliderMove: this.scroll,
            touchEnd: this.touchEnd,
            transitionEnd: this.scrollEnd
          }
        };
      },
      updataScroll() {
        this.$nextTick(() => {
          this.$refs.swiper && this.$refs.swiper.swiper.update();
        });
      },
      scrollToTop(speed, runCallbacks) {
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
      },
      scroll() {
        const swiper = this.$refs.swiper.swiper;
        this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);
        if (this.pulling) {
          return;
        }
        if (swiper.translate > 0) {
          if (!this.pullDown) {
            return;
          }
          if (swiper.translate > PULL_DOWN_TEXT_END) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (swiper.isEnd) {
          if (!this.pullUp) {
            return;
          }
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));

          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      scrollEnd() {
        const swiper = this.$refs.swiper.swiper;

        this.$emit('scroll-end', swiper.translate, swiper, this.pulling);
      },
      touchEnd() {
        if (this.pulling) {
          return;
        }

        const swiper = this.$refs.swiper.swiper;
        if (swiper.translate > 0) {
          if (!this.pullDown) {
            return;
          }
          this.pulling = true;
          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);
          swiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down-fun', this.pullDownFun);
        } else if (swiper.isEnd) {
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;
          if (isPullUp) { // 上拉
            if (!this.pullUp) {
              return;
            }
            this.pulling = true;
            swiper.allowTouchMove = false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true; // 定住不给回弹
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
            this.$emit('pull-up-fun', this.pullUpEnd);
          }
        }
      },
      pullDownFun() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
        setTimeout(() => {
          this.$emit('pull-down-transition-end');
        }, swiper.params.speed);
      },
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        console.log('ture');
      }
    }
  };

</script>
<style lang="scss" scoped>
  .swiper-container{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .swiper-slide{
    height: auto;
  }

  .mine-scroll-pull-up,
  .mine-scroll-pull-down {
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mine-scroll-pull-down {
    bottom: 100%;
    height: 80px;
  }

  .mine-scroll-pull-up {
    top: 100%;
    height: 30px;
  }
</style>
