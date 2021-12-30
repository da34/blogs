<template>
  <section
    class="steps relative bg-white p-7 before:bg-blue-950 before:w-[2px] before:absolute before:top-14 before:bottom-7 before:left-1/2"
  >
    <ul class="timeline space-y-12 ">
      <li
        v-for="i in 5"
        :key="i"
        style=""
        class="timeline-box hover:-translate-y-1 hover:shadow-[0_4px_0_0_#07beff] hover:before:border-4 duration-300 w-[47%] bg-gray-100 p-5 relative top-[-5%] odd:float-left even:float-right after:border-y-transparent after:border-solid after:border-[10px] after:top-5 odd:after:right-[-10px] even:after:left-[-10px] after:border-x-gray-100 after:absolute odd:after:border-r-0 even:after:border-l-0 before:bg-white before:absolute odd:before:right-[-8.1%] even:before:left-[-7.5%] before:top-6  before:absolute before:w-3 before:h-3 before:rounded-full before:border before:border-solid before:border-blue-950 before:border-2"
      >
        <p class="font-bold text-lg">
          2021-12-29
        </p>
        <p class="text-sm leading-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation .
        </p>
        <span class="absolute top-3 right-3 text-blue-950 text-9xl font-bold opacity-20">{{ i }}</span>
      </li>
      <p class="clear-both"></p>
    </ul>
  </section>
</template>

<script>
export default {
  layout: 'blog',
  transition: 'slide-in'
}
</script>

<style scoped>
</style>
