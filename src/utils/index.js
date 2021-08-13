import { h } from 'vue';
import { NIcon } from 'naive-ui';

/**
 * render 图标
 * */
export function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}