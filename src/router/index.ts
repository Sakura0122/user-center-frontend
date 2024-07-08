import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/user/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: () => import('@/views/user/register/index.vue'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/user',
      children: [
        {
          path: '/user',
          component: () => import('@/views/admin/user/index.vue'),
          meta: {
            title: '用户管理'
          }
        }
      ]
    }
  ]
})

export default router
