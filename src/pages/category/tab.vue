<template>
  <ytang-scroll :scrollbar="false">
    <ul class="tab-ul">
      <li
        class="tab-ul-item"
        v-for="(item, index) in tabList"
        :key="index"
        :class="{'tabStyle': curId === item.id}"
        @click="switchTab(item.id)"
      >
        {{item.name}}
      </li>
    </ul>
  </ytang-scroll>
</template>

<script>
  import {categoryNames} from './config.js';
  import ytangScroll from 'base/scroll/scroll';
  export default {
    name: 'tab',
    data() {
      return {
        curId: ''
      };
    },
    created() {
      this.init();
      this.switchTab(this.tabList[0].id);
    },
    components: {
      ytangScroll
    },
    methods: {
      init() {
        this.tabList = categoryNames;
      },
      switchTab(tabId) {
        if (this.curId === tabId) {
          return;
        }
        this.curId = tabId;
        this.$emit('hasSwitchTab', tabId);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  $tab-item-height: 46px;
  .tab-ul{
    width: 100%;

    &-item{
      height: $tab-item-height;
      background-color: #fff;
      border-right: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      color: #080808;
      font-size: $font-size-l;
      font-weight: bold;
      text-align: center;
      line-height: $tab-item-height;
      @include ellipsis();
      &:last-child {
        border-bottom: none;
      }
    }
    .tabStyle{
      background: none;
      border-right: none;
      color: #f23030;
    }
  }
</style>
