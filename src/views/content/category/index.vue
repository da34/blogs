<template>
  <NGrid
    x-gap="24"
    :cols="6"
  >
    <NGi :span="2">
      <NCard
        title="管理分类"
      >
        <NForm
          ref="formDataRef"
          class="mt-5"
          label-placement="left"
          :model="formData"
          :rules="rules"
        >
          <NFormItem
            label="分类名"
            path="name"
          >
            <NInput
              v-model:value="formData.name"
              placeholder="请输入分类名"
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
        title="所有分类"
      >
        <NSpace>
          <NTag
            v-for="category in categories"
            :key="category.id"
            class="cursor-pointer"
            closable
            @click="handleClick(category)"
            @close.stop="handleClose(category)"
          >
            {{ category.name }}
          </NTag>
        </NSpace>
      </NCard>
    </NGi>
  </NGrid>
</template>
<script>
export default {name: 'ContentCategoryList'}
</script>
<script setup>
import {ref, onMounted} from 'vue'
import {getCategories, delCategory, createCategory, editCategory} from '@/api/category';
import {useDialog} from 'naive-ui';

const defaultVal = () => ({
  name: null,
  id: null
})

const categories = ref([])
const formDataRef = ref(null)
const formData = ref(defaultVal())
const dialog = useDialog()

const rules = {
  name: {
    required: true,
    message: '请输入分类名',
    trigger: ['input']
  }
}

onMounted(async () => {
  fetchCategories()
})

async function fetchCategories() {
  const {list} = await getCategories({pageSize: 99})
  categories.value = list
}

function handleClose(category) {
  dialog.warning({
    title: '警告',
    content: '你确定删除吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      await delCategory(category.id)
      fetchCategories()
    }
  })
}

function handleClick(category) {
  formData.value = category
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
      formData.value.id ? await editCategory(data) : await createCategory(data)
      handleDef()
      await fetchCategories()
    }
  })
}

</script>

<style scoped>

</style>
