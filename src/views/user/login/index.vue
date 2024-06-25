<script setup lang="ts">
import { ref } from 'vue'

defineOptions({ name: 'Login' })

const form = ref({
  username: '',
  password: ''
})
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="title">用户中心🤗</div>
      <a-form :model="form" labelAlign="left" :labelCol="{ span: 5 }">
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="form.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="form.password" />
        </a-form-item>
        <div class="register">新用户注册</div>
        <a-button type="primary">登录</a-button>
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

      .register {
        text-align: right;
        color: #1677ff;
        font-size: 14px;
        cursor: pointer;
      }

      .ant-btn {
        width: 100%;
        margin-top: 24px;
      }
    }
  }
}
</style>
