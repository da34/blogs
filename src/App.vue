<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <router-view/>
    </n-message-provider>
  </n-loading-bar-provider>
</template>

<script setup>
import {NLoadingBarProvider, NMessageProvider,} from 'naive-ui'
</script>

<style>
</style>
