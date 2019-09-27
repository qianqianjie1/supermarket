<template>
  <transition name="searchChange">
    <div class="search">
      <div class="g-header-container">
        <ytang-navsearchbar>
          <i
            class="iconfont icon-back"
            slot="left"
            @click="goBack"
          ></i>
          <ytang-search
            :placeholder="value"
            @search="search"
            slot="center"
          ></ytang-search>
        </ytang-navsearchbar>
      </div>
      <div class="g-content-container">
        <ytang-scroll ref="scroll">
          <search-hot v-show="!information" @updateScroll="updateScroll"></search-hot>
          <search-history
            ref="history"
            @show-confirm="showConfirm"
            @remove-item="updateScroll"
            v-show="!information"
          ></search-history>
          <search-fuzzy
            :information="information"
            v-show="information"
          ></search-fuzzy>
        </ytang-scroll>
      </div>
      <search-confirm
        ref="confirmDom"
        @confirm="clearAllSearchHistorys"
      ></search-confirm>
    </div>
  </transition>
</template>

<script>
  import ytangNavsearchbar from 'base/navSearchBar/index';
  import ytangSearch from 'base/searchBar';
  import searchHistory from './history';
  import searchFuzzy from './fuzzy';
  import ytangScroll from 'base/scroll/scroll';
  import searchHot from './hotSearch';
  import searchConfirm from 'base/confirm';
  import {HEADER_SEARCH_PLACEHOLDER} from '../home/config';
  export default {
    name: 'Search',
    data() {
      return {
        information: ''
      };
    },
    components: {
      ytangNavsearchbar,
      ytangSearch,
      ytangScroll,
      searchHot,
      searchHistory,
      searchConfirm,
      searchFuzzy
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      search(info) {
        this.information = info;
      },
      showConfirm() {
        this.$refs.confirmDom.show();
      },
      clearAllSearchHistorys() {
        this.$refs.history.clear();
        this.$refs.history.update();
      },
      updateScroll() {
        this.$refs.scroll.updataScroll();
      }
    },
    created() {
      this.value = HEADER_SEARCH_PLACEHOLDER;
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .search{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }
  .searchChange-enter-active,
  .searchChange-leave-active {
    transition: all 0.3s;
  }
  .searchChange-enter,
  .searchChange-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>
