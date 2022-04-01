<template>
  <!--  <client-only placeholder="Loading...">-->
  <!-- 组件只会在客户端被渲染 -->
  <div class="relative">
    <UserCard />
<!--    <dayWord v-show="$route.name !== 'content-id'" />-->
<!--    <articleInfo v-show="$route.name !== 'content-id'" />-->
<!--    <Tag v-show="$route.name !== 'content-id'" />-->
<!--    <siteInfo v-show="$route.name !== 'content-id'" />-->
<!--    <component :is="renderCompToc" />-->
  </div>
<!--  </client-only>-->
</template>

<script setup>
import UserCard from './userCard'
</script>
