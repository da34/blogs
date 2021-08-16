<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NMessageProvider>
        <slot/>
      </NMessageProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>

<script setup>
import {NLoadingBarProvider, NMessageProvider, NDialogProvider} from 'naive-ui'
</script>

<style scoped>

</style>
