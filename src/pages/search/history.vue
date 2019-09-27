<template>
  <div class="history">
    <h4 class="history-title">历史搜索</h4>
    <ul class="g-list">
      <li
        class="g-list-item"
        v-for="(item, index) in historyList"
        :key="index"
        @click="$_search_selectItem(item)"
      >
        <span class="g-list-text ytang-span">{{item}}</span>
        <i
          class="iconfont icon-delete ytang-close"
          @click.stop="removeItem(item)"
        ></i>
      </li>
    </ul>
    <div class="clear-box" @click="showConfirm">
      <i class="iconfont icon-clear"></i>
      <span class="clear-box-text">清空历史记录</span>
    </div>
  </div>
</template>

<script>
  import storage from 'assets/js/storage';
  import {SEARCH_HISTORY_KEYWORD_KEY} from 'pages/search/config';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'history',
    data() {
      return {
        historyList: []
      };
    },
    mixins: [searchMixin],
    created() {
      this.getHistory();
    },
    methods: {
      getHistory() {
        this.historyList = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
      },
      removeItem(key) {
        this.historyList = this.historyList.filter(value => {
          return key !== value;
        });
        storage.set(SEARCH_HISTORY_KEYWORD_KEY, this.historyList);
        setTimeout(() => {
          this.$emit('remove-item', key);
        }, 100);
      },
      showConfirm() {
        this.$emit('show-confirm');
      },
      clear() {
        storage.clear(SEARCH_HISTORY_KEYWORD_KEY);
      },
      update() {
        this.getHistory();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .history{
    width: 100%;
    background-color: #fff;
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    &-title{
      padding-left: 10px;
      height: 34px;
      line-height: 34px;
      font-size: $font-size-l;
      font-weight: bold;
    }
    .clear-box{
      width: 70%;
      height: 40px;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      color: #686868;
      margin-top: 30px;
      margin-bottom: 30px;
      &-text{
        padding-left: 5px;
      }
    }
    .ytang-span{
      padding-left: 10px;
    }
    .ytang-close{
      padding-right: 10px;
    }
  }
</style>
