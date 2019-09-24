<template>
  <ytang-navsearchbar class="navbar" v-show="isVisible">
    <i class="iconfont icon-scan" slot="left"></i>
    <div slot="center">搜索框</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </ytang-navsearchbar>
</template>

<script>
  import ytangNavsearchbar from 'base/navSearchBar/index';

  export default {
    name: 'HomeHeader',
    data() {
      return {
        isVisible: true
      };
    },
    components: {
      ytangNavsearchbar
    },
    methods: {
      show() {
        this.isVisible = true;
      },
      hide() {
        this.isVisible = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .navbar{
    &.ytang-navsearchbar {
      background-color: transparent;
      transition: background-color .5s;
    }
    &.header-transition{
      background-color: $header-bgc-translucent;
    }
    .iconfont{
      color: $icon-color-default;
      font-style: $icon-font-size;
    }
  }
</style>
