import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import('@/views/user/login/index.vue')
    },
    {
      path: '/register',
      component: () => import('@/views/user/register/index.vue')
    }
  ]
})

export default router
