<template>
  <div class="category">
    <div class="g-header-container">
      <category-header-bar></category-header-bar>
    </div>
    <div class="g-content-container">
      <div class="left-tab">
        <category-tab
          @hasSwitchTab="receiveCurId"
        >
        </category-tab>
      </div>
      <div class="right-content">
        <category-content :curId="curId"></category-content>
      </div>
    </div>
  </div>
</template>

<script>
  import categoryHeaderBar from './header';
  import categoryContent from './content';
  import categoryTab from './tab';
  export default {
    name: 'CategoryHeader',
    data() {
      return {
        curId: ''
      };
    },
    methods: {
      receiveCurId(id) {
        this.curId = id;
      }
    },
    components: {
      categoryHeaderBar,
      categoryTab,
      categoryContent
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .category {
    overflow:hidden;
    width:100%;
    height:100%;
    background-color: $bgc-theme;
  }
  .g-content-container{
    display: flex;

    .left-tab{
      width: 80px;
      height: 100%;
      overflow: hidden;
    }
    .right-content{
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
