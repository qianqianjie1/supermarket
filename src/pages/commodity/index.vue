<template>
  <div class="home-commodity">commodity</div>
</template>

<script>
  export default {
    name: 'Commodity'
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

 .home-commodity{
   position: absolute;
   top: 0;
   left: 0;
   z-index: $product-z-index;
   width: 100%;
   height: 100%;
   background-color: $bgc-theme;
 }
</style>
