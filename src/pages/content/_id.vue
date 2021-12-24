<template>
  <div v-if="$fetchState.pending" class="content-wrap flex">
    <a-skeleton active :title="false" :paragraph="{ rows: 4, width: '100%' }"/>
  </div>
  <section v-else class="bg-white">
    <div class="p-10 pt-8 pb-0">
      <div class="mb-5">
        <h1 class="text-4xl font-bold">
          {{ article.title }}
        </h1>
        <div class="text-gray-400 flex space-x-5">
          <span>{{ article.createdAt | formatDate('YYYY年MM月DD日') }}</span>
          <span>阅读：{{ article.views }}</span>
        </div>
      </div>
      <img
        v-if="article.firstPicture"
        :src="article.firstPicture"
      >
    </div>
    <div class="article-content">
      <Marked :value="article.content" :is-article="true"/>
      <div class="p-10">
        <div v-if="article.shareStatement" class="p-6 bg-gray-100 rounded-xl text-center">
          本作品采用
          <a href="https://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
          进行许可
        </div>
        <div v-if="article.tags.length" class="tags">
          <svg-icon icon-class="tag"/>
          <span v-for="(tag, i) in article.tags" :key="tag.name">
            <a-divider v-if="i !== 0" type="vertical"/>{{ tag.name }}
          </span>
        </div>
        <p class="mt-5">最后编辑于：{{ article.updatedAt | formatDate('YYYY年MM月DD日') }}</p>
      </div>
    </div>
    <Comments class="px-10" v-if="article.commentDisabled" :content-id="$route.params.id"/>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import 'ant-design-vue/lib/skeleton/style/index.css'
import Marked from '@/components/Markdown'
import Comments from '@/components/Comments'

export default {
  name: 'Content',
  components: {
    Marked,
    Comments
  },
  layout: 'blog',
  scrollToTop: true,
  transition: 'slide-out',
  data () {
    return {
      article: {}
    }
  },
  async fetch () {
    const { id } = this.$route.params
    const { data } = await this.$axios.get(`contents/${id}`)
    this.article = data.result
  },
  head () {
    return {
      title: `${this.article.title}-${this.site.name}`,
      meta: [
        {
          hid: 'content',
          vmid: 'description',
          content: this.article.content?.slice(0, 50)
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'site'
    ]),
    ...mapState('modules/front', [
      'renderCompToc'
    ])
  },
  watch: {
    '$fetchState.pending' (oldVal, newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.setRenderCompToc('Toc')
        })
      }
    }
  },
  activated () {
    this.$nextTick(() => {
      if (!this.$fetchState.pending) {
        this.setRenderCompToc('Toc')
      }
    })
  },
  deactivated () {
    this.setRenderCompToc('')
  },
  methods: {
    ...mapMutations('modules/front', [
      'setRenderCompToc'
    ])
  }
}
</script>
