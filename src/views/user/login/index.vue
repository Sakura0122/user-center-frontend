<script setup lang="ts">
import { ref } from 'vue'
import { loginApi } from '@/api/user'
import type { LoginParams } from '@/api/user/type'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { message } from 'ant-design-vue'

defineOptions({ name: 'Login' })

const router = useRouter()
const userStore = useUserStore()

const form = ref<LoginParams>({
  userAccount: '',
  userPassword: ''
})
const formRef = ref()
const login = () => {
  formRef.value.validate().then(async () => {
    const res = await loginApi(form.value)
    userStore.setUserInfo(res.data)
    message.success('登录成功')
    router.push('/')
  })
}
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="title">用户登录🤗</div>
      <a-form ref="formRef" :model="form" labelAlign="left" :labelCol="{ span: 6 }">
        <a-form-item
          label="账号"
          name="userAccount"
          :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
        >
          <a-input placeholder="请输入账号" v-model:value="form.userAccount" />
        </a-form-item>
        <a-form-item
          label="密码"
          name="userPassword"
          :rules="[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, message: '密码长度不能小于8位', trigger: 'blur' }
          ]"
        >
          <a-input-password placeholder="请输入密码" v-model:value="form.userPassword" />
        </a-form-item>
        <div class="nav">
          <span @click="$router.push('/register')">新用户注册</span>
        </div>
        <a-button type="primary" @click="login">登录</a-button>
      </a-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100vh;
  background: url('@/assets/images/login_bg.png') 100% 100%;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 32px;

    .title {
      font-size: 33px;
      font-weight: 600;
      line-height: 44px;
    }

    .ant-form {
      width: 328px;
      margin-top: 24px;

      .nav {
        text-align: right;
        color: #1677ff;
        font-size: 14px;

        span {
          cursor: pointer;
        }
      }

      .ant-btn {
        width: 100%;
        margin-top: 24px;
      }
    }
  }
}
</style>
