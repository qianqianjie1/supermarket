<template>
  <div class="home-seal">
    <h3 class="home-seal-title">热卖推荐</h3>
    <div class="seal-loading" v-if="!sealList.length">
      <ytang-loading></ytang-loading>
    </div>
    <ul class="home-seal-list" v-else>
      <li
        class="list-link"
        v-for="(item, index) in sealList"
        :key="index"
      >
        <router-link :to="{name: 'home-commodity', params:{id: item.baseinfo.itemId}}" class="list-link-a">
          <div class="list-link-imgdiv">
            <img v-lazy="item.baseinfo.picUrlNew" alt="image" class="list-link-img">
          </div>
          <p class="list-link-name">{{item.name.shortName}}</p>
          <p class="list-link-originPrice"><del>¥{{item.price.origPrice}}</del></p>
          <p class="list-link-info">
            <span class="info-price">¥<strong class="info-price-num">{{item.price.actPrice}}</strong></span>
            <span class="info-count">{{item.remind.soldCount}}件已售</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getHomeSeal} from 'api/home';
  import ytangLoading from 'base/loading/loading';

  export default {
    name: 'HotSeal',
    components: {
      ytangLoading
    },
    data() {
      return {
        sealList: [],
        curPage: 1,
        totalPage: 1
      };
    },
    created() {
      this.getSealList();
    },
    methods: {
      update() {
        return this.getSealList();
      },
      getSealList() {
        if (this.curPage > this.totalPage) {
          return Promise.reject(new Error('没有更多了'));
        }
        return getHomeSeal(this.curPage).then(data => {
          return new Promise(resolve => {
            if (data) {
              this.curPage++;
              this.totalPage = data.totalPage;
              this.sealList = this.sealList.concat(data.itemList);
              this.$emit('loaded', this.sealList);
              resolve();
            }
          });
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .home-seal{
    .seal-loading{
      padding-top: 100px;
    }
    &-title{
      position: relative;
      width: 100%;
      padding: 10px 0;
      font-size: $font-size-l;
      text-align: center;

      &:before,
      &:after{
        content: '';
        position: absolute;
        top: 50%;
        width: 40%;
        height: 1px;
        background-color: #ddd;
      }
      &:before{
        left: 0;
      }
      &:after{
        right: 0;
      }
    }
    &-list{
      @include flex-between();
      flex-wrap: wrap;
      .list-link{
        width: 49%;
        background-color: #fff;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
        margin-bottom: 8px;
        &-a{
          display: block;
        }
        &-imgdiv{
          position: relative;
          width: 100%;
          padding-top: 100%;
          margin-bottom: 5px;
        }
        &-img{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        &-name {
          height: 36px;
          padding: 0 5px;
          margin-bottom: 8px;
          line-height: 1.5;
          @include multiline-ellipsis();
        }
        &-originPrice {
          padding: 0 5px;
          margin-bottom: 8px;
          color: #ccc;
        }

        &-info {
          @include flex-between();
          padding: 0 5px;
          margin-bottom: 8px;

          .info-price {
            color: #e61414;
            &-num{
              font-size: 20px;
            }
          }

          .info-count {
            color: #999;
          }
        }
      }
    }
  }
</style>
