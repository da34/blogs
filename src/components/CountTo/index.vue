<template>
  <span>{{ value }}</span>
</template>

<script setup>
import {defineProps, ref, computed, unref, onMounted} from 'vue'
import {useTransition, TransitionPresets} from '@vueuse/core'
import {ceil} from 'lodash-es'

const props = defineProps({
  startVal: {
    type: Number,
    default: 0
  },
  endVal: {
    type: Number,
    default: 2021
  }
})
const source = ref(props.startVal)
let outputValue = useTransition(source);

const value = computed(() => unref(ceil(outputValue.value)))

onMounted(() => {
  start();
});

function start() {
  outputValue = useTransition(source, {
    duration: 1500,
    transition: TransitionPresets.easeInOutCubic,
  })
  source.value = props.endVal;
}
</script>

<style scoped>

</style>
