<template>
  <div class="view-account">
    <!-- <div class="view-account-header"></div> -->
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-title">
          博客后台登录
        </div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="formInline.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <n-icon
                  size="18"
                  color="#808695"
                >
                  <User />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon
                  size="18"
                  color="#808695"
                >
                  <Lock />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item>
            <n-button
              type="primary"
              size="large"
              :loading="loading"
              block
              @click="handleSubmit"
            >
              登录
            </n-button>
          </n-form-item>
          <span
            class="cursor-pointer"
            @click="handleRegister"
          >
            Or 注册
          </span>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useUserStore} from '@/stores/modules/user';
import {useMessage} from 'naive-ui';
import httpEnum from '@/utils/http/httpType'
import {User, Lock} from '@icon-park/vue-next'

const formRef = ref(null);
const messagePro = useMessage();
const formInline = ref({
  username: '',
  password: '',
})
const loading = ref(false)

const rules = {
  username: {required: true, message: '请输入用户名', trigger: 'blur'},
  password: {required: true, message: '请输入密码', trigger: 'blur'},
};

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value.validate(async (errors) => {
    if (!errors) {
      handleLogin(formInline.value)
    }
  });
};

const handleLogin = async (params) => {
  // messagePro.loading('登录中...');
  loading.value = true;
  try {
    const {code, message} = await userStore.login(params);
    if (code === httpEnum.SUCCESS) {
      loginSucceed()
    } else {
      messagePro.info(message || '登录失败');
    }
  } finally {
    loading.value = false
  }
}

const loginSucceed = () => {
  const toPath = decodeURIComponent((route.query?.redirect || '/'))
  messagePro.success('登录成功！');
  router.replace(toPath).then((_) => {
    if (route.name === 'login') {
      router.replace('/');
    }
  });
}

function handleRegister() {
  console.log(1111111)
  router.push('/register')
}


// onMounted(() => {
//   //挂载在 window 方便与在js中使用
//   window.$loading = useLoadingBar();
//   window.$message = useMessage();
// });

</script>

<style lang="scss" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  justify-content: center;

  &-container {
    /* flex: 1; */
    padding: 32px 0;
    width: 384px;
    margin: 0 auto 200px;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-title {
      font-size: 20px;
      font-weight: 600;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url('../../assets/images/login.svg');
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }
  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
