<template>
    <div class="navigation">
      <ul class="nav-list">
        <li class="nav-list-item" v-for="(item, index) in navlist" :key="index">
          <a :href="item.linlUrl" class="item-link">
            <img :src="item.picUrl" alt="image" class="item-img">
            <span class="item-text">{{item.text}}</span>
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
  import {NAVLIST} from './config';

  export default {
    name: 'Navigation',
    created() {
      this.navlist = NAVLIST;
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .nav-list{
    @include flex-center();
    flex-wrap: wrap;
    padding-top: 15px;
    padding-bottom: 7px;
    background: #fff;

    &-item{
      width: 20%;
      .item-link{
        @include flex-center(column);
      }
      .item-img{
        width: 60%;
      }
      .item-text{
        margin: 8px 0;
      }
    }
  }
</style>
