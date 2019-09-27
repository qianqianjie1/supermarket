<template>
  <div class="content-wrapper">
    <div class="content-loading" v-if="isLoading">
      <div class="loading-wrapper">
        <ytang-loading></ytang-loading>
      </div>
    </div>
    <ytang-scroll
      ref="scroll"
      @scroll-end="listenerScrolled"
    >
      <div class="content-container">
        <div class="content" v-if="contentList.banner">
          <a :href="contentList.banner.linkUrl" class="content-banner">
            <img @load="updateScroll" :src="contentList.banner.picUrl" alt="banner" class="content-banner-img">
          </a>
        </div>
        <div
          class="content-section"
          v-for="(section, index) in contentList.data"
          :key="index"
        >
          <h4 class="section-title">{{section.name}}</h4>
          <ul
            class="section-ul"
          >
            <li
              class="item-link"
              v-for="(item, ind) in section.itemList"
              :key="ind"
            >
              <a :href="item.linkUrl">
                <p class="item-pic" v-if="item.picUrl">
                  <img v-lazy="item.picUrl" alt="image" class="item-img" />
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </ytang-scroll>
    <div class="g-backtop-container especial-position">
      <ytang-back-top :visible="isVisible" @back-top="backToTop"></ytang-back-top>
    </div>
  </div>
</template>

<script>
  import {getCategoryContent} from 'api/category';
  import ytangScroll from 'base/scroll/scroll';
  import ytangBackTop from 'base/backTop';
  import ytangLoading from 'base/loading/loading';
  export default {
    name: 'Content',
    props: {
      curId: {
        type: String,
        default: ''
      }
    },
    components: {
      ytangScroll,
      ytangBackTop,
      ytangLoading
    },
    data() {
      return {
        isLoading: true,
        isVisible: false,
        contentList: {}
      };
    },
    watch: {
      curId(value) {
        this.isLoading = true;
        this.getContent(value).then(() => {
          this.isLoading = false;
        });
      }
    },
    methods: {
      getContent(id) {
        return getCategoryContent(id).then(data => {
          return new Promise(resolve => {
            if (data) {
              console.log(data);
              this.contentList = data;
              resolve();
            }
          });
        });
      },
      updateScroll() {
        this.$refs.scroll && this.$refs.scroll.updataScroll();
      },
      listenerScrolled(translate, swiper) {
        this.isVisible = translate < 0 && -translate > swiper.height;
      },
      backToTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .content-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    .content-container{
      padding: 10px;
    }
    .content{
      margin-bottom: 12px;
      &-banner{
        display: block;
        &-img{
          width: 100%;
        }
      }
    }
    .content-section{
      margin-bottom: 12px;
      .section-title{
        height: 28px;
        line-height: 28px;
        color: #080808;
        font-weight: bold;
      }
      .section-ul{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 10px 10px 0;
        .item-link{
          width: (100% / 3);
          .item-pic{
            position: relative;
            width: 80%;
            padding-bottom: 80%;
            margin: 0 auto;
            .item-img{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }
          }
          .section-name{
            height: 36px;
            line-height: 36px;
            text-align: center;
            @include ellipsis();
          }
        }
      }
    }
  }
  .content-loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: $category-popup-z-index;
    @include flex-center();
    .loading-wrapper{
      width: 50%;
      padding: 30px 0;
      background-color: $modal-bgc;
      border-radius: 4px;
    }
  }
  .especial-position{
    bottom: $tabbar-height - 40px;
  }
</style>
