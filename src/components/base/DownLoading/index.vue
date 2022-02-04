<template>
  <div ref="loadingRef">
    加载中...
  </div>
</template>
<script>
export default {
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
      stateCurrent: this.currentPage
    }
  },
  watch: {
    stateCurrent (val) {
      this.$emit('change', val)
    }
  },
  mounted () {
    const callback = (entries, observer) => {
      console.log(entries)
    }
    this.observer = new IntersectionObserverEntry(callback, {
      rootMargin: '0px',
      threshold: 0
    })
  },
  methods: {
    onAction () {
      this.stateCurrent++
    }
  }
}
</script>

<style scoped>

</style>
