<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/modules/user'
import { logoutApi } from '@/api/user'

defineOptions({ name: 'Layout' })

const userStore = useUserStore()

const items = ref([
  {
    key: '/user',
    label: '用户中心',
    title: '用户中心'
  }
])
const router = useRouter()
const handleMenuClick = ({ key }: { key: string }) => {
  router.push(key)
}

// 退出登录
const handleLogout = async () => {
  await logoutApi()
  userStore.clearUserInfo()
  router.push('/login')
}
</script>

<template>
  <a-layout>
    <a-layout-header>
      <div class="left">
        <img src="https://next.antdv.com/assets/logo.1ef800a8.svg" alt="" />
        <div class="title">用户中心</div>
      </div>
      <div class="right">
        <a-dropdown>
          <img class="avatar" :src="userStore.userInfo.avatarUrl" alt="" />
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <div @click="handleLogout">退出登录</div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider>
        <a-menu
          mode="inline"
          :items="items"
          :selected-keys="[$route.path]"
          @click="handleMenuClick"
        ></a-menu>
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.ant-layout {
  height: 100vh;

  .ant-layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid rgba(5, 5, 5, 0.06);

    .left {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        margin-right: 16px;
      }

      .title {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
        font-size: 18px;
      }
    }

    .right {
      height: 60px;
      display: flex;
      align-items: center;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }

  .ant-layout-sider {
    .ant-layout-sider-children {
      .ant-menu {
        height: 100%;
        overflow-y: auto;
      }
    }
  }

  .ant-layout-content {
    padding: 12px;
  }
}
</style>
