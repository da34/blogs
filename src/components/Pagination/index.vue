<template>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    hide: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 7
    },
    autoScroll: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentPage () {
      return this.$store.getters.page
    }
  },
  methods: {
    currentChange (index) {
      this.$emit('currentChange', index)
    }
  }
}
</script>

<style scoped lang="stylus">
.pagination
  padding 30px 0
  text-align center
  @media (max-width 992px)
    padding 10px 0 20px
</style>
