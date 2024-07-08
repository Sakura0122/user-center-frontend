import router from '@/router/index'
import useUserStore from '@/stores/modules/user'

/** 免登录白名单 */
const whiteList = ['/login', '/register', '/404']

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore()
  document.title = `${to.meta.title}`
  if (userStore.userInfo?.id) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    //用户未登录判断
    if (whiteList.includes(to.path)) {
      next()
    } else {
      try {
        await userStore.getUserInfo()
        next({ ...to, replace: true })
      } catch (e) {
        await userStore.clearUserInfo()
        next({ path: '/login' })
      }
    }
  }
})
