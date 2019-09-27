<template>
  <div class="hot-search">
    <h4 class="hot-search-title">热门搜索</h4>
    <div class="loading-container" v-if="!hotKeywords.length">
      <ytang-loading></ytang-loading>
    </div>
    <ul class="hot-content">
      <li
        class="hot-content-item"
        v-for="(item, index) in hotKeywords"
        :key="index"
        @click="$_search_selectItem(item.hotWord)"
      >{{item.hotWord}}</li>
    </ul>
  </div>
</template>

<script>
  import ytangLoading from 'base/loading/loading';
  import {getHotSearch} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'hotSearch',
    data() {
      return {
        hotKeywords: []
      };
    },
    mixins: [searchMixin],
    created() {
      this.getHotSearchKeyword().then(() => {
        this.$emit('updateScroll');
      });
    },
    methods: {
      getHotSearchKeyword() {
        return getHotSearch().then(data => {
          return new Promise(resolve => {
            if (data) {
              console.log(data);
              this.hotKeywords = data;
              resolve();
            }
          });
        });
      }
    },
    components: {
      ytangLoading
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .hot-search{
    padding-left: 10px;
    background-color: #fff;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    margin-bottom: 10px;
    .loading-container{
      padding: 12px 0;
    }
    &-title{
      height: 34px;
      line-height: 34px;
      font-size: $font-size-l;
      font-weight: bold;
    }
    .hot-content{
      display: flex;
      flex-wrap: wrap;
      &-item{
        padding: 8px;
        background-color: #f0f2f5;
        border-radius: 4px;
        margin: 0 10px 10px 0;
        color: #686868;
      }
    }
  }
</style>
