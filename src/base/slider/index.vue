<template>
  <div class="ytang-slider">
    <swiper :options="swiperOption" :key="keyId">
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
      data: {
        type: Array,
        default() {
          return [];
        }
      },
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
        keyId: Math.random()
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.swiperOption = {
          watchOverflow: true,
          direction: this.direction,
          autoplay: this.interval ? {
            autoplay: true,
            disableOnInteraction: false
          } : false,
          slidesPerView: 1,
          loop: this.data.length <= 1 ? false : this.loop,
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null
          }
        };
      }
    },
    watch: {
      data(newData) {
        if (newData.length === 0) {
          return;
        }
        this.swiperOption.loop = newData.length <= 1 ? false : this.loop;
        this.keyId = Math.random();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .ytang-slider,.swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
