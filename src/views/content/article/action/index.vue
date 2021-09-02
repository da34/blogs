<template>
  <NSpace vertical>
    <NGrid class="flex items-center">
      <NGi span="18">
        <NInput class="w-screen" v-model:value="article.title" size="large" type="text" placeholder="输入文章标题"/>
      </NGi>
      <NGi class="ml-3" span="1">
        <NButton type="primary" @click="publicClick">发布</NButton>
      </NGi>
    </NGrid>

    <!--markdown-->
    <MarkDown v-model:text="article.content" />

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
            ref="formRef"
        >
          <NGrid :cols="2" :x-gap="30">
            <NFormItemGi label="文章封面">
              <MUpload v-model:file-url="article.firstPicture">
                <NIcon size="30">
                  <Upload/>
                </NIcon>
                <p class="mt-3">上传图片</p>
              </MUpload>
            </NFormItemGi>
            <NFormItemGi label="编辑摘要">
              <NInput
                  type="textarea"
                  show-count
                  :rows="5"
                  maxlength="80"
                  minlength="30"
                  v-model:value="article.contentOutline"
              />
            </NFormItemGi>
            <NFormItemGi :span="2" label="添加标签">
              <NSelect
                  multiple
                  placeholder="请选择标签"
                  :options="tagsOption"
                  v-model:value="article.tag"
              />
            </NFormItemGi>
            <NFormItemGi label="文章类型">
              <NRadioGroup v-model:value="article.type">
                <NSpace>
                  <NRadioButton :value="0">article</NRadioButton>
                  <NRadioButton :value="1">page</NRadioButton>
                </NSpace>
              </NRadioGroup>
            </NFormItemGi>
            <NFormItemGi label="置顶">
              <NSwitch v-model:value="article.isTop"/>
            </NFormItemGi>

            <NFormItemGi label="评论">
              <NSwitch v-model:value="article.commentDisabled"/>
            </NFormItemGi>
            <NFormItemGi label="版权">
              <NSwitch v-model:value="article.shareStatement"/>
            </NFormItemGi>
          </NGrid>
        </NForm>
        <template #footer>
          <NButton @click="cancelCallback" class="mr-4">取消</NButton>
          <NButton @click="submitCallback" type="primary">确定并发布</NButton>
        </template>
      </NDrawerContent>
    </NDrawer>
  </NSpace>
</template>

<script setup>
import {ref, reactive} from 'vue'
import MarkDown from '@/components/Markdown/index.vue'
import {allTag} from "@/api/web/tag";
import {useMessage} from 'naive-ui'
import {Upload} from '@icon-park/vue-next'
import MUpload from '@/components/Upload/index.vue'
import {usePubilc} from "./composables/usePubilc";



const tagsOption = ref()
const show = ref(false)

// 发布逻辑
const {article, submitCallback, cancelCallback} = usePubilc(show)

// 获取标签
const fetchState = async() => {
  const data = await allTag()
  tagsOption.value = data.map(tag => {
    return {label: tag.name, value: tag.id}
  })
}

fetchState()

const message = useMessage()
// const article = reactive({
//   title: '',
//   content: ''
// })



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

</script>

<style scoped lang="scss">

#vditor {
  min-height: calc(100vh - 180px);
}

:deep .n-dialog.n-modal {
  width: 600px !important;
}
</style>
