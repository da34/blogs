<template>
  <div v-if="$fetchState.pending" class="content-wrap flex">
    <!--    <a-skeleton active :title="false" :paragraph="{ rows: 4, width: '100%' }"/>-->
  </div>
  <section v-else class="bg-white">
    <div class="md:p-8 pb-0 p-5">
      <div class="">
        <h1 class="md:text-4xl text-xl title font-bold">
          {{ article.title }}
        </h1>
        <div class="text-gray-400 flex space-x-5 md:mt-5 mt-2">
          <span>{{ article.createdAt | formatDate('YYYY年MM月DD日') }}</span>
          <span>阅读：{{ article.views }}</span>
        </div>
      </div>
      <img
        v-if="article.firstPicture"
        :src="article.firstPicture"
        class="mt-5"
      >
    </div>
    <div class="blog-post">
      <Markdown :value="article.content" :is-article="true" />
      <div class="md:p-10 p-5">
        <div v-if="article.shareStatement" class="p-6 bg-gray-100 rounded-xl text-center">
          本作品采用
          <a href="https://creativecommons.org/licenses/by/4.0/deed.zh" target="_blank">知识共享署名-相同方式共享 4.0 国际许可协议</a>
          进行许可
        </div>
        <div class="flex justify-between items-center mt-2">
          <p>
            最后编辑于：{{ article.updatedAt | formatDate('YYYY年MM月DD日') }}
          </p>
          <div v-if="article.tags.length" class="flex items-center">
            <BaseSvgIcon icon-class="tag" class="mr-2" />
            <span v-for="(tag) in article.tags" :key="tag.name" class="tag">
              <!--            <a-divider v-if="i !== 0" type="vertical"/>-->
              {{ tag.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <Comments v-if="article.commentDisabled" class="md:px-10 px-5" :content-id="$route.params.id" />
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'Content',
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
<style scoped lang="stylus">
.desc
  text-omit(2)
.title
  text-omit(2)

@media (min-width: 768px)
  .desc
    text-omit(3)
</style>
