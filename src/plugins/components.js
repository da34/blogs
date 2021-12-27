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
