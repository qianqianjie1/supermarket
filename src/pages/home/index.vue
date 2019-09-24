<template>
  <div class="home">
    <div class="g-header-container">
      <home-header :class="{'header-transition': isTransition}" ref="header"></home-header>
    </div>
    <ytang-scroll
      :finished="finished"
      pullDown
      pullUp
      @pull-down-fun="pullToRefresh"
      @pull-up-fun="pullToLoadMore"
      @scroll-end="scrollEnd"
      @scroll="scroll"
      @pull-down-transition-end="transitionEnd"
      ref="scroll"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-seal @loaded="getFinished" ref="recommend"></home-seal>
    </ytang-scroll>
    <div class="g-backtop-container">
      <ytang-back-top
        :visible="isVisible"
        @back-top="backToTop"
      ></ytang-back-top>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import HomeNav from './navigation';
  import HomeSeal from './hotseal';
  import ytangScroll from 'base/scroll/scroll';
  import ytangBackTop from 'base/backTop';
  import {HEADER_TRANSITION_HEIGHT} from './config';
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      ytangScroll,
      HomeNav,
      HomeSeal,
      ytangBackTop
    },
    data() {
      return {
        isTransition: false,
        finished: [],
        isVisible: false
      };
    },
    methods: {
      transitionEnd() {
        this.$refs.header.show();
      },
      scroll(translate) {
        this.changeHeaderClassStaus(translate);
      },
      changeHeaderClassStaus(translate) {
        if (translate > 0) {
          this.$refs.header.hide();
          return;
        }

        this.$refs.header.show();
        this.isTransition = -translate > HEADER_TRANSITION_HEIGHT;
      },
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      scrollEnd(translate, swiper, pulling) {
        if (!pulling) {
          this.changeHeaderClassStaus(translate);
        }
        this.isVisible = translate < 0 && -translate > swiper.height;
      },
      getFinished(data) {
        this.finished = data;
      },
      pullToRefresh(end) {
        this.$refs.slider.update().then(end);
        // setTimeout(() => {
        //   console.log('刷新成功');
        //   end();
        // }, 1000);
      },
      pullToLoadMore(more) {
        this.$refs.recommend.update().then(() => {
          console.log('加载成功');
          more();
        }).catch(err => {
          if (err) {
            console.log(err);
          }
          more();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .home{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: $bgc-theme;
  }
</style>
