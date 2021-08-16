<template>
  <div class="flex flex-col justify-center page-container h-full">
    <div class="text-center">
      <img src="~@/assets/images/exception/404.svg" alt=""/>
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，你访问的页面不存在</h1>
      <n-button type="info" @click="goHome">回到首页</n-button>
    </div>
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
import {useRouter} from 'vue-router';

const router = useRouter();

function goHome() {
  router.push('/');
}

</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  border-radius: 4px;
  padding: 50px 0;
  .text-center {
    h1 {
      color: #666;
      padding: 20px 0;
    }
  }

  img {
    width: 350px;
    margin: 0 auto;
  }
}
</style>
