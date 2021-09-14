<template>
  <div class="view-account">
    <!-- <div class="view-account-header"></div> -->
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-title">
          博客后台
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
                  <!--                   <AccountCircleFilled />-->
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-toggle
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon
                  size="18"
                  color="#808695"
                >
                  <!--                   <LockOutlined />-->
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
        </n-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import {useMessage} from 'naive-ui';
import httpEnum from '@/utils/http/http-type'
// import { AccountCircleFilled, LockOutlined } from '@vicons/material'

const formRef = ref(null);
const messagePro = useMessage();
const formInline = ref({
  username: 'admin',
  password: 'Qq7531356+',
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
      const {username, password} = formInline.value;
      messagePro.loading('登录中...');
      loading.value = true;
      const params = {
        username,
        password,
      };
      const { code, message } = await userStore.login(params);
      console.log(code, message)
      if (code === httpEnum.SUCCESS) {
        loading.value = false
        const toPath = decodeURIComponent((route.query?.redirect || '/'))
        messagePro.success('登录成功！');
        router.replace(toPath).then((_) => {
          if (route.name === 'login') {
            router.replace('/');
          }
        });
      } else {
        messagePro.info(message || '登录失败');
      }
    }
  });
};


</script>

<style lang="scss" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    /* flex: 1; */
    padding: 32px 0;
    width: 384px;
    margin: 0 auto;
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
