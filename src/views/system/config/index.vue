<template>
  <NCard>
    <NTabs justify-content="space-evenly" class="w-2/5 m-auto">
      <NTabPane name="qiniu" tab="七牛云配置" >
        <QiNiu class="mt-5" />
      </NTabPane>
      <NTabPane name="email" tab="邮箱配置">
        <Email/>
      </NTabPane>
    </NTabs>
  </NCard>
</template>

<script setup>
import {ref} from 'vue'
import {NTabs,NTabPane,NCard} from 'naive-ui'
import QiNiu from './qiniu.vue'
import Email from './email.vue'
</script>
