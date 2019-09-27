<template>
  <div class="fuzzy">
    <div class="loading-container" v-if="loading">
      <ytang-loading></ytang-loading>
    </div>
    <ul class="g-list" v-if="hasResult">
      <li
        class="g-list-item"
        v-for="(item, index) in resultList"
        :key="index"
        @click="$_search_selectItem(item[0])"
      >
        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-if="noResult">没有结果...</div>
  </div>
</template>

<script>
  import ytangLoading from 'base/loading/loading';
  import {getResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'fuzzy',
    data() {
      return {
        resultList: [],
        loading: true
      };
    },
    mixins: [searchMixin],
    props: {
      information: {
        type: String,
        default: ''
      }
    },
    components: {
      ytangLoading
    },
    watch: {
      information(val) {
        this.getSearchResult(val);
      }
    },
    computed: {
      hasResult() {
        return !this.loading && this.resultList.length;
      },
      noResult() {
        return !this.loading && !this.resultList.length;
      }
    },
    methods: {
      getSearchResult(info) {
        if (!info) {
          return;
        }
        this.loading = true;
        getResult(info).then(data => {
          if (data) {
            this.resultList = data;
          }
          this.loading = false;
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .loading-container{
    width: 100%;
    padding-top: 30%;
  }
  .g-list{
    margin-left: 10px;
  }
  .no-result{
    padding: 10px;
  }
</style>
