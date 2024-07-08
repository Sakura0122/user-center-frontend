<script setup lang="ts">
import { ref } from 'vue'
import type { UserInfo } from '@/api/user/type'
import { updateUserApi } from '@/api/user'
import { message } from 'ant-design-vue'

const emit = defineEmits<{
  update: []
}>()

const open = ref(false)
const createUser = () => {
  return {
    id: '',
    avatarUrl: '',
    email: '',
    gender: 0,
    phone: '',
    userRole: 0,
    userStatus: 0,
    username: ''
  }
}
const user = ref<UserInfo>(createUser())
const showModal = (userInfo: UserInfo) => {
  user.value = JSON.parse(JSON.stringify(userInfo))
  open.value = true
}

const handleOk = async () => {
  await updateUserApi(user.value)
  message.success('修改成功！')
  emit('update')
  open.value = false
}

const handleCancel = () => {
  user.value = createUser()
}

defineExpose({
  showModal
})
</script>

<template>
  <a-modal v-model:open="open" title="编辑信息" @ok="handleOk" @cancel="handleCancel">
    <a-form :model="user" :label-col="{ style: { width: '100px' } }" :wrapper-col="{ span: 14 }">
      <a-form-item label="用户名">
        <a-input v-model:value="user.username" />
      </a-form-item>
      <a-form-item label="头像">
        <a-input v-model:value="user.avatarUrl" />
      </a-form-item>
      <a-form-item label="邮箱">
        <a-input v-model:value="user.email" />
      </a-form-item>
      <a-form-item label="电话">
        <a-input v-model:value="user.phone" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="scss"></style>
