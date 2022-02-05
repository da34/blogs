<template>
  <div class="view-account">
    <!-- <div class="view-account-header"></div> -->
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-title">
          博客后台注册
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
          <n-form-item path="confirmPwd">
            <n-input
              v-model:value="formInline.confirmPwd"
              type="password"
              placeholder="请输入确认密码"
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
              注册
            </n-button>
          </n-form-item>
          <span
            class="cursor-pointer"
            @click="handleLogin"
          >
            Or 登录
          </span>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {register} from '@/api/user';
import {useMessage} from 'naive-ui';
import httpEnum from '@/utils/http/httpType'
import {User, Lock} from '@icon-park/vue-next'

const formRef = ref(null);
const messagePro = useMessage();
const formInline = ref({
  username: '',
  password: '',
  confirmPwd: ''
})
const loading = ref(false)

const rules = {
  username: {required: true, message: '请输入用户名', trigger: 'blur'},
  password: {required: true, message: '请输入密码'},
  confirmPwd: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ],
};

// 校验两次密码
function validatePasswordStartWith (rule, value) {
  return (
    formInline.value.password &&
    formInline.value.password.startsWith(value) &&
    formInline.value.password.length >= value.length
  )
}
function validatePasswordSame (rule, value) {
  return value === formInline.value.password
}

const router = useRouter();
const route = useRoute();

const handleSubmit = (e) => {
  e.preventDefault();
  formRef.value.validate(async (errors) => {
    if (!errors) {
      await handleRegister(formInline.value)
    }
    console.log(errors)
  });
};

const handleRegister = async (params) => {
  loading.value = true;
  try {
    const {code, message} = await register(params);
    if (code === httpEnum.SUCCESS) {
      registerSucceed()
    } else {
      messagePro.info(message || '注册失败');
    }
  } finally {
    loading.value = false
  }
}

const registerSucceed = () => {
  messagePro.success('注册成功，即将返回登录');
  handleLogin()
}

function handleLogin() {
  router.push('/login')
}

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
