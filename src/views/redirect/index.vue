<template>
  <div>11111111111111</div>
</template>
<script>
import {defineComponent, onBeforeMount, onMounted} from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  export default defineComponent({
    name: 'Redirect',
    setup() {
      const route = useRoute();
      const router = useRouter();
      onBeforeMount(() => {
        const { params, query } = route;
        const { path } = params;
        router.replace({
          path: '/' + (Array.isArray(path) ? path.join('/') : path),
          query,
          params
        });
      });
      // return <NEmpty />;
    },
  });
</script>
