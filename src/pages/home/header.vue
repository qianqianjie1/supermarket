<template>
  <ytang-navsearchbar class="navbar">
    <i class="iconfont icon-scan" slot="left"></i>
    <div slot="center">搜索框</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </ytang-navsearchbar>
</template>

<script>
  import ytangNavsearchbar from 'base/navSearchBar/index';

  export default {
    name: 'HomeHeader',
    components: {
      ytangNavsearchbar
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .navbar{
    &.ytang-navsearchbar {
      background-color: transparent;
    }

    .iconfont{
      color: $icon-color-default;
      font-style: $icon-font-size;
    }
  }
</style>
