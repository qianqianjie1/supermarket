<template>
    <div class="ytang-loading" :class="{'loading-inline': inline}">
      <span class="ytang-loading-img" v-if="indicator === 'on'">
        <slot><img src="./loading.gif" alt="loading"></slot>
      </span>
      <span class="ytang-loading-text" v-if="loadingText">{{loadingText}}</span>
    </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      indicator: {
        type: String,
        default: 'on',
        validator(value) {
          return ['on', 'off'].indexOf(value) > -1;
        }
      },
      text: {
        type: String,
        default: '加载中...'
      },
      inline: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        loadingText: this.text
      };
    },
    watch: {
      text(text) {
        this.loadingText = text;
      }
    },
    methods: {
      setText(text) {
        this.loadingText = text;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .ytang-loading{
    width: 100%;
    height: 100%;
    @include flex-center(column);

    &.loading-inline{
      flex-direction: row;

      .ytang-loading-img ~ .ytang-loading-text{
        margin-top: 0;
        margin-left: 6px;
      }
    }
  }
  .ytang-loading-img ~ .ytang-loading-text{
    margin-top: 6px;
    margin-left: 0;
  }
</style>
