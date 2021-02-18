<template>
  <div class="pagination">
    <Page
      :total="total"
      @on-change="currentChange"
      :page-size="pageSize" />
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
