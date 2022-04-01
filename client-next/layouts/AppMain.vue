<template>
  <div class="xl:max-w-screen-xl relative m-auto mt-20">
    <div class="w-[950px] max-w-full relative">
      <NuxtPage/>
    </div>
    <div class="absolute top-0 right-0 w-[19rem] hidden xl:block">
      <SideInfo />
    </div>
  </div>
</template>

<script setup>
import SideInfo from './SideInfo';
</script>
