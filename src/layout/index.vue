<template>
  <my-header />
  <side-menu />
  <content />
</template>

<script>
import MyHeader from "./header";
import SideMenu from "./side-menu";
import Content from "./content";
export default {
  name: "index",
  components: {Content, SideMenu, MyHeader}
}
</script>

<style scoped>

</style>
