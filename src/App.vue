<template>
  <div id="app" class="g-container">
    <div class="g-view-container">
      <router-view></router-view>
    </div>
    <div class="g-footer-container">
      <com-tabbar/>
    </div>
  </div>
</template>

<script>
  import ComTabbar from 'components/tabbar';

  export default {
    name: 'App',
    components: {
      ComTabbar
    }
  };
</script>
