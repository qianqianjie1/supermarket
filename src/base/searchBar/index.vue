<template>
  <div class="ytang-search">
    <i class="iconfont icon-search"></i>
    <div
      class="ytang-search-input"
      v-if="showFake"
    >{{placeholder}}</div>
    <input
      v-if="!showFake"
      type="text"
      :placeholder="placeholder"
      v-model="information"
      class="ytang-search-input"
      ref="input"
    >
    <i class="iconfont icon-close"
       v-show="information"
       @click='reset'
    ></i>
  </div>
</template>

<script>
  import {throttle} from 'assets/js/util';
  export default {
    name: 'searchBar',
    data() {
      return {
        information: ''
      };
    },
    props: {
      placeholder: {
        type: String,
        default: '请您输入'
      },
      showFake: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clear() {
        this.information = '';
      },
      focus() {
        this.$refs.input && this.$refs.input.focus();
      },
      reset() {
        this.clear();
        this.focus();
      }
    },
    watch: {
      information: throttle(function () {
        this.$emit('search', this.information);
      })
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  $search-box-height: 30px;
  .ytang-search{
    width: 100%;
    display: flex;
    align-items: center;
    height: $search-box-height;
    padding: 0 7px;
    background-color: #fff;
    border-radius: $search-box-height / 2;
    &-input{
      @include ellipsis();
      padding-left: 5px;
      flex: 1;
    }
    .iconfont {
      color: $icon-color;
      font-size: $icon-font-size-sm;
      font-weight: bold;
    }
  }
</style>
