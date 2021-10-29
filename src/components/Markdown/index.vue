<template>
  <VMdPreview ref="preview" :text="value" />
</template>
<script>
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// 代码高亮
import Prism from 'prismjs'

// emoji
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

// todo-list
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index'
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css'

// code line
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index'

// copy code
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import { mapMutations } from 'vuex'

VMdPreview.use(vuepressTheme, {
  Prism
})

VMdPreview.use(createEmojiPlugin())
VMdPreview.use(createTodoListPlugin())
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createCopyCodePlugin())

export default {
  components: { VMdPreview },
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
