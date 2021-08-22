<template>
  <div class="tableAction">
    <div class="flex items-center justify-center">
      <template v-for="(action, index) in getActions" :key="`${index}-${action.label}`">
        <NButton v-bind="action" class="mx-2">{{ action.label }}</NButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import {computed, toRaw} from 'vue'
import {NButton} from 'naive-ui'

const props = defineProps({
  actions: {
    type: Array,
    default: null,
    required: true,
  },
  style: {
    type: String,
    default: 'button',
  },
  select: {
    type: Function,
    default: () => {
    }
  },
})

const actionType =
    props.style === 'button' ? 'default' : props.style === 'text' ? 'primary' : 'default';
const actionText =
    props.style === 'button' ? undefined : props.style === 'text' ? true : undefined;


const getActions = computed(() => {
  return (toRaw(props.actions) || [])
      .map((action) => {
        const {popConfirm} = action;
        //需要展示什么风格，自己修改一下参数
        return {
          size: 'small',
          text: actionText,
          type: actionType,
          ...action,
          ...(popConfirm || {}),
          onConfirm: popConfirm?.confirm,
          onCancel: popConfirm?.cancel,
          enable: !!popConfirm,
        };
      });
});

</script>
