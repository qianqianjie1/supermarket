<template>
  <div class="ytang-navsearchbar">
    <div class="ytang-navsearchbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="ytang-navsearchbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="ytang-navsearchbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <h1 class="ytang-navsearchbar-title" v-if="title">
      <span class="ytang-navsearchbar-text" v-text="title"></span>
    </h1>
  </div>
</template>

<script>
  export default {
    name: 'NavSearchBar',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .ytang-navsearchbar {
    position: relative;
    @include flex-between();
    height: 50px;
    background: #fff;

    &-left {
      margin-left: 10px;

      ~ .ytang-navsearchbar-right {
        position: static;
      }
    }

    &-center {
      flex: 1;
      margin: 0 auto;
    }

    &-right {
      position: absolute;
      @include flex-center();
      right: 0;
      margin-right: 10px;
    }

    &-title {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20%;
      right: 20%;
      @include flex-center();
      text-align: center;
    }

    &-text {
      font-size: 18px;
      width: 100%;
      line-height: 1.5;
      @include ellipsis();
    }
  }
</style>
