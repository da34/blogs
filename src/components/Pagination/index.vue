<template>
  <ul class="pagination">
    <li class="pagination-item" title="上一页" @click="onAction(stateCurrent-1)">
      <svg-icon icon-class="arrow_left" />
    </li>
    <li v-if="stateCurrent > 3" class="pagination-item" @click="onAction(1)" title="01">
      01
    </li>
    <li v-if="stateCurrent > 4" class="pagination-item pagination-jump-prev" @click="onAction(stateCurrent-5)" title="向前5页">
      <span>•••</span>
      <svg-icon icon-class="arrow-double-left" />
    </li>
    <li
      v-for="page in pageList"
      :key="page"
      :title="padLocation(page, 0, 2, 0)"
      class="pagination-item"
      :class="stateCurrent === page && 'current solid-circle'"
      @click="stateCurrent = page"
    >
      {{ padLocation(page, 0, 2, 0) }}
    </li>
    <li v-if="stateCurrent < maxPage - 3" class="pagination-item pagination-jump-next" @click="onAction(stateCurrent+5)" title="向后5页">
      <span>•••</span>
      <svg-icon icon-class="arrow-double-right" />
    </li>
    <li v-if="stateCurrent < maxPage - 2" class="pagination-item" @click="onAction(maxPage)" :title="padLocation(maxPage, 0, 2, 0)">
      {{ padLocation(maxPage, 0, 2, 0) }}
    </li>
    <li class="pagination-item" @click="onAction(stateCurrent+1)">
      <svg-icon icon-class="arrow_right" />
    </li>
  </ul>
</template>

<script>
// import { scrollTo } from '@/utils/scroll-to'
import { padLocation } from '../../utils'

const calculatePage = (p, max) => {
  if (p < 1) { return 1 }
  if (p > max) { return max }
  return p
}

export default {
  name: 'Pagination',
  model: {
    prop: 'currentPage',
    event: 'change'
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      pageList: [], // 页码列表
      stateCurrent: this.currentPage
    }
  },
  computed: {
    maxPage () {
      return Math.ceil(this.total / this.limit)
    }
  },
  watch: {
    stateCurrent (val) {
      this.$emit('change', val)
      this.initPage(val)
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    padLocation,
    initPage (val = 1) {
      this.pageList = []
      const maxPage = this.maxPage - 2
      if (val < 3) {
        this.pageList = [1, 2, 3, 4, 5]
      } else if (val < maxPage) {
        this.pageList = [val - 2, val - 1, val, val + 1, val + 2]
      } else if (val >= maxPage) {
        val = maxPage
        this.pageList = [val - 2, val - 1, val, val + 1, val + 2]
      }
    },
    onAction (page) {
      this.stateCurrent = calculatePage(page, this.maxPage)
    }
  }
}
</script>

<style scoped lang="stylus">
.pagination
  padding 30px 0
  text-align center
  font-size $font-size-small
  display flex
  align-items center
  .pagination-item
    position: relative;
    cursor pointer
    padding 0 5px
    color $color-subsidiary
    font-weight 600
    transition all .3s
    min-width 30px
    margin-right 8px
    display: flex
    justify-content: center
    align-items: center
    user-select none
    &.current
      color $color-content
    &:hover
      color $color-content
    &:first-child
      padding-left 0
    svg
      font-size 20px
      color #000
      font-weight 600
  .pagination-jump-next, .pagination-jump-prev
    svg
      display none
    &:hover
      span
        display none
      svg
        display inline-block
        color $color-focus
</style>
