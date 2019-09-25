<template>
  <div class="category-header">
    <ytang-navsearchbar>
      <span slot="center">搜索框</span>
      <i class="iconfont icon-msg" slot="right"></i>
    </ytang-navsearchbar>
  </div>
</template>

<script>
  import ytangNavsearchbar from 'base/navSearchBar/index';
  export default {
    name: 'categoryHeader',
    components: {
      ytangNavsearchbar
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .category-header{
    .ytang-navsearchbar{
      background: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
