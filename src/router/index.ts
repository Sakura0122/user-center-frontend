import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/user/login/index.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/user/register/index.vue')
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/user',
      children: [
        {
          path: '/user',
          component: () => import('@/views/admin/user/index.vue')
        }
      ]
    }
  ]
})

export default router
