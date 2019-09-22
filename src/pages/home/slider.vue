<template>
  <div class="swiper-wrapper">
    <ytang-loading v-if="!sliders.length"></ytang-loading>
    <ytang-slider
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <swiper-slide
        v-for="(item,index) in sliders"
        :key="index"
      >
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt="图片" class="slider-img">
        </a>
      </swiper-slide>
    </ytang-slider>
  </div>
</template>

<script>
  import ytangSlider from 'base/slider/index';
  import ytangLoading from 'base/loading/loading';
  import {sliderOptions} from './config';
  import {swiperSlide} from 'vue-awesome-swiper';
  import {getHomeSlider} from 'api/home';

  export default {
    name: 'Slider',
    data() {
      return {
        sliders: [],
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination
      };
    },
    components: {
      ytangSlider,
      swiperSlide,
      ytangLoading
    },
    methods: {
      getSliders() {
        getHomeSlider().then(data => {
          this.sliders = data;
        });
      }
    },
    created() {
      this.getSliders();
    }
  };
</script>

<style lang="scss" scoped>
  .swiper-wrapper{
    width: 100%;
    height: 183px;

    .slider-link{
      display: block;
    }
    .slider-link,.slider-img{
      width: 100%;
      height: 100%;
    }
  }
</style>
