<template>
  <v-md-preview :text="value" />
</template>
<script>

import { mapMutations } from 'vuex'

export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isArticle: {
      type: Boolean,
      default: false
    }
  },
  // mounted () {
  //   // eslint-disable-next-line nuxt/no-env-in-hooks
  //   if (process.client && this.isArticle) {
  //     this.$nextTick(() => {
  //       const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3')
  //       const titles = Array.from(anchors).filter(title => !!title.textContent.trim())
  //
  //       if (!titles.length) {
  //         this.setNowToc([])
  //         return
  //       }
  //
  //       const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort()
  //
  //       const tocs = titles.map(el => ({
  //         title: el.textContent,
  //         lineIndex: el.getAttribute('data-v-md-line'),
  //         indent: hTags.indexOf(el.tagName)
  //       }))
  //
  //       this.setNowToc(tocs)
  //     })
  //   }
  // },
  methods: {
    ...mapMutations('modules/content', [
      'setNowToc'
    ])
  }
}
</script>
<style lang="stylus" scoped>

</style>
