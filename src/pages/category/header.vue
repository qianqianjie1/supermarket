<template>
  <div class="category-header">
    <ytang-navsearchbar>
      <ytang-search
        showFake
        :placeholder="value"
        @click.native="goSearch"
        slot="center"
      ></ytang-search>
    </ytang-navsearchbar>
  </div>
</template>

<script>
  import ytangNavsearchbar from 'base/navSearchBar/index';
  import {HEADER_SEARCH_PLACEHOLDER} from './config';
  import ytangSearch from 'base/searchBar';
  export default {
    name: 'categoryHeader',
    components: {
      ytangNavsearchbar,
      ytangSearch
    },
    created() {
      this.value = HEADER_SEARCH_PLACEHOLDER;
    },
    methods: {
      goSearch() {
        this.$router.push('/search');
      }
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
