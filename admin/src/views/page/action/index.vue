<template>
  <NSpace vertical>
    <NGrid class="flex items-center">
      <NGi span="18">
        <NInput
          v-model:value="page.title"
          class="w-screen"
          size="large"
          type="text"
          placeholder="输入页面名称"
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
    <Markdown v-model:text="page.text" />

    <!--发布NDrawer-->
    <NDrawer
      v-model:show="show"
      width="25%"
      placement="right"
    >
      <NDrawerContent title="发布页面">
        <NForm
          class="mt-5"
          label-placement="left"
          :model="page"
        >
          <NGrid
            :cols="1"
            :x-gap="30"
          >
            <NFormItemGi label="路径">
              <NInput
                v-model:value="page.path"
                type="text"
              />
            </NFormItemGi>
            <NFormItemGi label="排序">
              <n-input-number
                v-model:value="page.order"
              />
            </NFormItemGi>
            <NFormItemGi label="开启评论">
              <NSwitch v-model:value="page.allowComment" />
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
import Markdown from '@/components/Markdown/index.vue'
import {getContentById} from '@/api/content';
import {usePublic} from './composables/usePubilc';

const message = useMessage()
const route = useRoute()
const show = ref(false)
const { id } = route.params

// 发布逻辑
const {page, submitCallback, cancelCallback, setArticle} = usePublic(show)

onMounted(async () => {
  // 有id 才获取文章
  if (id) {
    await getPageById(id)
  }
})

async function getPageById(id) {
  const data = await getContentById(id)
  setArticle(data)
}

function publicClick() {
  if (!page.value.title) {
    message.warning('名称不能为空')
    return
  }
  if (!page.value.text) {
    message.warning('内容不能为空')
    return
  }
  show.value = true
}

</script>

<style scoped lang="scss">
:deep(.n-dialog.n-modal) {
  width: 600px !important;
}
</style>
