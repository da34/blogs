<template>
  <div class="article-wrapper text-lg">
    <ArticleList :articleList="list" />
  </div>
</template>

<script setup>
// import {definePageMeta} from 'nuxt3/dist/pages/runtime';
definePageMeta({
  // layout: 'blog',
  // layoutTransition: 'slide-in'
})
const list = useState('list', () => [])
</script>
