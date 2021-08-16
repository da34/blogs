<template>
  <NConfigProvider>
    <Application>
      <router-view/>
    </Application>
  </NConfigProvider>
</template>

<script setup>
import Application from "@/components/Application/Application.vue";
import {NConfigProvider} from 'naive-ui'
</script>
