import {
  create,
  NForm,
  NFormItem,
  NInput,
  NIcon,
  NCheckbox,
  NButton,
  NLoadingBarProvider,
  NMessageProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
} from 'naive-ui';

const naive = create({
  components: [
    NForm,
    NFormItem,
    NInput,
    NIcon,
    NCheckbox,
    NButton,
    // NLoadingBarProvider,
    // NMessageProvider,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
  ],
});

export function setupNaive(app) {
  app.use(naive);
}
