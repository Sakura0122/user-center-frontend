<script setup lang="ts">
import { ref } from 'vue'
import { registerApi } from '@/api/user'
import type { RegisterParams } from '@/api/user/type'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'Login' })

const router = useRouter()

const form = ref<RegisterParams>({
  userAccount: '',
  userPassword: '',
  checkPassword: ''
})
const formRef = ref()
const register = () => {
  formRef.value.validate().then(async () => {
    const { userAccount, userPassword, checkPassword } = form.value
    if (!/^[a-zA-Z0-9]+$/.test(userAccount)) return message.error('账号只能包含字母和数字')
    if (userPassword !== checkPassword) return message.error('两次密码不一致')

    await registerApi(form.value)
    message.success('注册成功')
    router.push('/login')
  })
}
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="title">用户注册🤗</div>
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
        <a-form-item
          label="确认密码"
          name="checkPassword"
          :rules="[{ required: true, message: '请再次输入密码', trigger: 'blur' }]"
        >
          <a-input-password placeholder="请再次输入密码" v-model:value="form.checkPassword" />
        </a-form-item>
        <div class="nav">
          <span @click="$router.push('/login')">已有账号，去登录</span>
        </div>
        <a-button type="primary" @click="register">注册</a-button>
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
