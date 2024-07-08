import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UserInfo } from '@/api/user/type'
import { getUserInfoApi } from '@/api/user'

const useUserStore = defineStore('user', () => {
  const createUserInfo = () => {
    return {
      avatarUrl: '',
      createTime: '',
      email: '',
      gender: 0,
      id: '',
      isDelete: 0,
      phone: '',
      updateTime: '',
      userAccount: '',
      userPassword: '',
      userRole: 0,
      userStatus: 0,
      username: ''
    }
  }
  const userInfo = ref<UserInfo>(createUserInfo())
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    setUserInfo(res.data)
  }
  const setUserInfo = (data: UserInfo) => {
    userInfo.value = data
  }
  const clearUserInfo = () => {
    userInfo.value = createUserInfo()
  }

  return { userInfo, getUserInfo, setUserInfo, clearUserInfo }
})

export default useUserStore
