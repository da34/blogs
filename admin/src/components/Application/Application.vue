<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <DialogContent />
      <NMessageProvider>
        <MessageContent />
        <slot />
      </NMessageProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script setup>
import {NLoadingBarProvider, NMessageProvider, NDialogProvider} from 'naive-ui'
import MessageContent from '@/components/MessageContent/index.vue'
import DialogContent from '@/components/DialogContent/index.vue'
</script>

<style scoped>

</style>
