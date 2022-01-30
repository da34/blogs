<template>
  <v-md-preview class="w-full" :text="value" />
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
<style lang="stylus">
.vuepress-markdown-body p {
  margin: 10px 0!important;
}

@media (max-width: 419px) {
  .vuepress-markdown-body div[class*=v-md-pre-wrapper-] {
    /* margin: 0.85rem -1.5rem; */
    margin 0 !important
    border-radius: 0;
  }
}
</style>
