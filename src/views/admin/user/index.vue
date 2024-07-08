<script setup lang="ts">
import usePagination from '@/hooks/usePagination'
import { deleteUserApi, getUserListApi } from '@/api/user'
import { ref } from 'vue'
import type { UserInfo } from '@/api/user/type'
import type { ColumnProps } from 'ant-design-vue/es/table'
import { message, Modal } from 'ant-design-vue'

const columns: ColumnProps<UserInfo>[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '用户账号',
    dataIndex: 'userAccount',
    key: 'userAccount'
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    key: 'avatarUrl'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '电话',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'userRole'
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    key: 'userStatus'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime'
  },
  {
    title: '操作',
    key: 'action'
  }
]
const userList = ref<UserInfo[]>([])

const userName = ref('')
const { pagination } = usePagination(() => getUserData())
const getUserData = async () => {
  const res = await getUserListApi(userName.value)
  userList.value = res.data
}
getUserData()

const search = () => {
  pagination.value.current = 1
  getUserData()
}

const handleDelUser = (id: string) => {
  Modal.confirm({
    title: '确认删除该用户吗?',
    async onOk() {
      await deleteUserApi(id)
      getUserData()
      message.success('删除成功')
    }
  })
}
</script>

<template>
  <a-input-search v-model:value="userName" allowClear placeholder="请输入用户名" @search="search" />
  <a-table :dataSource="userList" :pagination :columns>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'avatarUrl'">
        <img class="avatar" :src="record.avatarUrl" alt="" />
      </template>
      <template v-if="column.key === 'userRole'">
        {{ record.userRole === 0 ? '普通用户' : '管理员' }}
      </template>
      <template v-if="column.key === 'userStatus'">
        {{ record.userStatus === 0 ? '启用' : '禁用' }}
      </template>
      <template v-else-if="column.key === 'tags'"></template>
      <template v-else-if="column.key === 'action'">
        <a-button type="link">编辑</a-button>
        <a-button type="link" @click="handleDelUser(record.id)">删除</a-button>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="scss">
.ant-input-search {
  width: 200px;
  margin-bottom: 12px;
}

.ant-table-wrapper {
  .ant-table-tbody {
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }

    .ant-btn {
      padding-left: 0;
    }
  }
}
</style>
