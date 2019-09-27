<template>
  <transition name="confirm">
    <div class="layout-wrapper" v-show="visible">
      <div class="confirm-wrapper">
        <p class="title" v-if="title">{{title}}</p>
        <p class="content">{{content}}</p>
        <div class="btn-wrapper">
          <button class="btn cancel" @click="cancelFun">{{cancel}}</button>
          <button class="btn confirm" @click="confirmFun">{{confirm}}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'confirm',
    data() {
      return {
        visible: false
      };
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
        type: String,
        default: '您确定要清除吗？'
      },
      cancel: {
        type: String,
        default: '我在想想'
      },
      confirm: {
        type: String,
        default: '心意已决'
      }
    },
    methods: {
      hide() {
        this.visible = false;
      },
      show() {
        this.visible = true;
      },
      cancelFun() {
        this.hide();
        this.$emit('cancel');
      },
      confirmFun() {
        this.hide();
        this.$emit('confirm');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .layout-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-popup-z-index;
    @include flex-center();
    background-color: $modal-bgc;
    .confirm-wrapper{
      overflow: hidden;
      width: 88%;
      background-color: #fff;
      border-radius: 10px;
      font-size: 16px;
      .title{
        padding: 15px;
        font-size: 18px;
        text-align: center;
        @include ellipsis();
        & + .content {
          border-top: 1px solid #e3e5e9;
          padding-top: 20px;
          padding-bottom: 20px;
        }
      }
      .content{
        padding: 40px 15px;
        text-align: center;
        line-height: 1.5;
      }
      .btn-wrapper{
        display: flex;
        .btn{
          flex: 1;
          height: 44px;
          line-height: 44px;
          background: none;
          border: none;
        }
        .confirm{
          background-color: #f23030;
          color: #fff;
        }
        .cancel{
          border-top: 1px solid #e3e5e9;
        }
      }
    }
  }
</style>
