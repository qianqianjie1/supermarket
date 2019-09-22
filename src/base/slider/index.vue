<template>
  <div class="ytang-slider">
    <swiper :options="swiperOption">
      <slot></slot>
      <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper} from 'vue-awesome-swiper';

  export default {
    name: 'Slider',
    components: {
      swiper
    },
    props: {
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return [
            'horizontal',
            'vertical'
          ].indexOf(value) > -1;
        }
      },
      interval: {
        type: Number,
        default: 3000,
        validator(value) {
          return value >= 0;
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        swiperOption: {
          watchOverflow: true,
          direction: this.direction,
          autoplay: this.interval ? {
            autoplay: true,
            disableOnInteraction: false
          } : false,
          slidesPerView: 1,
          loop: this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
  .ytang-slider,.swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
