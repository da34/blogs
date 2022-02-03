<template>
  <NSpace vertical>
    <NGrid class="flex items-center">
      <NGi span="18">
        <NInput
          v-model:value="article.title"
          class="w-screen"
          size="large"
          type="text"
          placeholder="输入文章标题"
        />
      </NGi>
      <NGi
        class="ml-3"
        span="1"
      >
        <NButton
          type="primary"
          @click="publicClick"
        >
          发布
        </NButton>
      </NGi>
    </NGrid>

    <!--markdown-->
    <Markdown v-model:text="article.content" />

    <!--发布NDrawer-->
    <NDrawer
      v-model:show="show"
      width="45%"
      placement="right"
    >
      <NDrawerContent title="发布文章">
        <NForm
          class="mt-5"
          label-placement="left"
          :model="article"
        >
          <NGrid
            :cols="2"
            :x-gap="30"
          >
            <NFormItemGi label="文章封面">
              <MUpload v-model:file-url="article.firstPicture">
                <NIcon size="30">
                  <Upload />
                </NIcon>
                <p class="mt-3">
                  上传图片
                </p>
              </MUpload>
            </NFormItemGi>
            <NFormItemGi label="编辑摘要">
              <NInput
                v-model:value="article.contentOutline"
                type="textarea"
                show-count
                :rows="5"
                maxlength="80"
                minlength="30"
              />
            </NFormItemGi>
            <NFormItemGi
              :span="2"
              label="添加分类"
            >
              <NSelect
                v-model:value="article.categoryId"
                placeholder="请选择分类"
                :options="categoryOption"
              />
            </NFormItemGi>
            <NFormItemGi
              :span="2"
              label="添加标签"
            >
              <NSelect
                v-model:value="article.tagsId"
                multiple
                placeholder="请选择标签"
                :options="tagsOption"
              />
            </NFormItemGi>
            <NFormItemGi label="置顶">
              <NSwitch v-model:value="article.isTop" />
            </NFormItemGi>
            <NFormItemGi label="评论">
              <NSwitch v-model:value="article.isCommentOpen" />
            </NFormItemGi>
          </NGrid>
        </NForm>
        <template #footer>
          <NButton
            class="mr-4"
            @click="cancelCallback"
          >
            取消
          </NButton>
          <NButton
            type="primary"
            @click="submitCallback"
          >
            确定并发布
          </NButton>
        </template>
      </NDrawerContent>
    </NDrawer>
  </NSpace>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import {useMessage} from 'naive-ui'
import {Upload} from '@icon-park/vue-next'
import Markdown from '@/components/Markdown/index.vue'
import {getTagList} from '@/api/tag';
import {getArticleById} from '@/api/article';
import MUpload from '@/components/Upload/index.vue'
import {usePublic} from './composables/usePubilc';
import { getCategories } from '@/api/category';

const message = useMessage()
const route = useRoute()
const tagsOption = ref()
const categoryOption = ref()
const show = ref(false)
const { id } = route.params

// 发布逻辑
const {article, submitCallback, cancelCallback, setArticle} = usePublic(show)

// 获取标签和分类
const fetchState = async() => {
  const tags = await getTagList()
  const categories = await getCategories()
  tagsOption.value = tags.list.map(tag => {
    return {label: tag.name, value: tag.id}
  })
  categoryOption.value = categories.list.map(cate => {
    return {label: cate.name, value: cate.id}
  })
}

onMounted(async () => {
  // 有id 才获取文章
  if (id) {
    await getArticle(id)
  }
  await fetchState()
})

async function getArticle(id) {
  const data = await getArticleById(id)
  data.tagsId = data.tags.map(tag => tag.id)
  data.categoryId = data.category?.id
  setArticle(data)
}

function publicClick() {
  if (!article.value.title) {
    message.warning('标题不能为空')
    return
  }
  if (!article.value.content) {
    message.warning('内容不能为空')
    return
  }
  show.value = true
}

function formatTags(tags) {
  return tags.map(tag => tag.name)
}

</script>

<style scoped lang="scss">
:deep .n-dialog.n-modal {
  width: 600px !important;
}
</style>
