<template>
  <swiper :options="swiperOption" ref='swiper'>
    <div class="loading-pulldown" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from 'base/loading/loading';
  import {PULL_DOWN_HEIGHT, PULL_DOWN_TEXT_INIT, PULL_DOWN_TEXT_START, PULL_DOWN_TEXT_ING, PULL_DOWN_TEXT_END, PULL_UP_HEIGHT, PULL_UP_TEXT_INIT, PULL_UP_TEXT_START, PULL_UP_TEXT_ING, PULL_UP_TEXT_END} from './config';

  export default {
    name: 'Scroll',
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      finished: {
        type: Boolean
      },
      pullDown: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pulling: false,
        pullDownText: PULL_DOWN_TEXT_INIT,
        swiperOption: {
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
            touchEnd: this.touchEnd
          }
        }
      };
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
    methods: {
      updataScroll() {
        this.$refs.swiper && this.$refs.swiper.swiper.update();
      },
      scroll() {
        if (this.pulling) {
          return;
        }
        const swiper = this.$refs.swiper.swiper;
        if (swiper.translate > 0) {
          if (!this.pullDown) {
            return;
          }
          this.pulling = true;
          if (swiper.translate > PULL_DOWN_TEXT_END) {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          }
        }
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
          swiper.allowTouchMove = false; // 禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(PULL_DOWN_HEIGHT);
          swiper.params.virtualTranslate = true; // 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING);
          this.$emit('pull-down-fun', this.pullDownFun);
        }
      },
      pullDownFun() {
        const swiper = this.$refs.swiper.swiper;
        this.pulling = false;
        this.$refs.pullDownLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
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

  .loading-pulldown{
    position: absolute;
    width: 100%;
    height: 80px;
    left: 0;
    bottom: 100%;
  }
</style>
