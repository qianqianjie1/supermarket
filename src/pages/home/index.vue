<template>
  <div class="home">
    <div class="g-header-container">
      <home-header></home-header>
    </div>
    <ytang-scroll
      :finished="finished"
      pullDown
      @pull-down-fun="pullToRefresh"
    >
      <home-slider></home-slider>
      <home-nav></home-nav>
      <home-seal @loaded="getFinished"></home-seal>
    </ytang-scroll>
    <div class="g-backtop-container"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import HomeHeader from './header';
  import HomeSlider from './slider';
  import HomeNav from './navigation';
  import HomeSeal from './hotseal';
  import ytangScroll from 'base/scroll/scroll';
  export default {
    name: 'Home',
    components: {
      HomeHeader,
      HomeSlider,
      ytangScroll,
      HomeNav,
      HomeSeal
    },
    data() {
      return {
        finished: false
      };
    },
    methods: {
      getFinished(data) {
        if (data === 'finished') {
          this.finished = true;
        }
      },
      pullToRefresh(end) { // 定时器模拟加载数据
        setTimeout(() => {
          console.log('刷新成功');
          end();
        }, 1000);
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
