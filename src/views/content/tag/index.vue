<template>
  <NGrid
    x-gap="24"
    :cols="6"
  >
    <NGi :span="2">
      <NCard
        title="管理标签"
      >
        <NForm
          ref="formDataRef"
          class="mt-5"
          label-placement="left"
          :model="formData"
          :rules="rules"
        >
          <NFormItem
            label="标签名"
            path="name"
          >
            <NInput
              v-model:value="formData.name"
              placeholder="请输入标签名"
            />
          </NFormItem>
          <NFormItem>
            <NSpace>
              <NButton
                v-if="formData.id == null"
                type="primary"
                @click="handleAction"
              >
                保存
              </NButton>
              <NButton
                v-if="formData.id !== null"
                type="primary"
                @click="handleAction"
              >
                更新
              </NButton>
              <NButton
                v-if="formData.id !== null"
                dashed
                @click="handleDef"
              >
                返回添加
              </NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </NCard>
    </NGi>
    <NGi :span="4">
      <NCard
        title="所有标签"
      >
        <NSpace>
          <NTag
            v-for="tag in tags"
            :key="tag.id"
            class="cursor-pointer"
            closable
            @click="handleClick(tag)"
            @close.stop="handleClose(tag)"
          >
            {{ tag.name }}
          </NTag>
        </NSpace>
      </NCard>
    </NGi>
  </NGrid>
</template>
<script>
export default {name: 'ContentTagList'}
</script>
<script setup>
import {ref, onMounted} from 'vue'
import {getTagList, delTag, createTag, editTag} from '@/api/web/tag';
import {useDialog} from 'naive-ui';

const defaultVal = () => ({
  name: null,
  id: null
})

const tags = ref([])
const formDataRef = ref(null)
const formData = ref(defaultVal())
const titleType = ref('new')
const dialog = useDialog()

const rules = {
  name: {
    required: true,
    message: '请输入标签名',
    trigger: ['input']
  }
}

onMounted(async () => {
  fetchTags()
})

async function fetchTags() {
  const {list} = await getTagList({pageSize: 99})
  tags.value = list
}

function handleClose(tag) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await delTag(tag.id)
      fetchTags()
    }
  })
}

function handleClick(tag) {
  formData.value = tag
}

function handleDef() {
  formData.value = defaultVal()
}

function handleAction() {
  const data = {
    id: formData.value.id,
    name: formData.value.name
  }
  formDataRef.value.validate(async (errors) => {
    if (!errors) {
      formData.value.id ? await editTag(data) : await createTag(data)
      handleDef()
      await fetchTags()
    }
  })
}

</script>

<style scoped>

</style>
