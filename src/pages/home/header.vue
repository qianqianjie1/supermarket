<template>
  <ytang-navsearchbar class="navbar" v-show="isVisible">
    <i class="iconfont icon-scan" slot="left"></i>
    <ytang-search
      showFake
      :placeholder="value"
      @click.native="goSearch"
      slot="center"
    ></ytang-search>
    <i class="iconfont icon-msg" slot="right"></i>
  </ytang-navsearchbar>
</template>

<script>
  import ytangNavsearchbar from 'base/navSearchBar/index';
  import ytangSearch from 'base/searchBar';
  import {HEADER_SEARCH_PLACEHOLDER} from './config';
  export default {
    name: 'HomeHeader',
    data() {
      return {
        isVisible: true
      };
    },
    created() {
      this.value = HEADER_SEARCH_PLACEHOLDER;
    },
    components: {
      ytangNavsearchbar,
      ytangSearch
    },
    methods: {
      show() {
        this.isVisible = true;
      },
      hide() {
        this.isVisible = false;
      },
      goSearch() {
        this.$router.push('/search');
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
