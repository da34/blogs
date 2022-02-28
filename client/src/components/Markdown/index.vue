<template>
  <v-md-preview :text="value" />
</template>
<script>
import Vue from 'vue'

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

// 内容定位
import createAlignPlugin from '@kangc/v-md-editor/lib/plugins/align'

VMdPreview.use(vuepressTheme, {
  Prism
})

VMdPreview.use(createEmojiPlugin())
VMdPreview.use(createTodoListPlugin())
VMdPreview.use(createLineNumbertPlugin())
VMdPreview.use(createCopyCodePlugin())
VMdPreview.use(createAlignPlugin())

Vue.use(VMdPreview)
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
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
