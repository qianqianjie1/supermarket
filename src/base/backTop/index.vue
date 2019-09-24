<template>
    <transition name="backtop" class="ytang-backtop">
      <a
        href="javascript:;"
        class="ytang-backtop-link"
        v-show="visible"
        @click="backToTop"
      >
        <i class="iconfont icon-backtop"></i>
      </a>
    </transition>
</template>

<script>
  export default {
    name: 'BackTop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backToTop() {
        this.$emit('back-top');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .ytang-backtop{
    &-link{
      overflow: hidden;
      width: 45px;
      height: 45px;
      @include flex-center();

      background-color: rgba(0, 0, 0, 0.6);
      border: none;
      border-radius: 50%;

      .iconfont {
        color: #fff;
        font-size: 38px;
      }
    }
  }

  .backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
