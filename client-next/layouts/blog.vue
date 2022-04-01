<template>
  <div class="wrap">
    <VHeader/>
    <AppMain class="content"/>
    <VFooter/>
    <!--    <client-only placeholder="Loading...">-->
    <!--    <BaseBackTop />-->
    <!--    </client-only>-->
    <!--    <canvas class="canvas" />-->
    <slot></slot>
  </div>
</template>

<script setup>
import VHeader from './VHeader/index'
import VFooter from './VFooter'
import AppMain from './AppMain'
/* eslint-disable */
console.log('%c version 2.1', 'font-size:20pt;color:#FFA7A6')
console.log('%c 欢迎来到玉捷博客', 'font-size:20pt;color:#FFA7A6')
</script>

<style scoped>
.wrap {
  width: 100%;
}

.content {
  min-height: calc(100vh - 183px);
  padding-bottom: 50px;
  position: relative;
}
</style>
