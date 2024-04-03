import {createRouter, createWebHashHistory} from 'vue-router'

// 导入路由页面的配置
import routes from './router'
import Cookies from "js-cookie";
import {useUsersStore} from "@/store/user.ts";


// 路由参数配置
const index = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHashHistory(),
    routes: routes,
})
index.beforeEach((to, _, next) => {
    // @ts-ignore
    //渲染页面标题
    window.document.title = to.meta.title
    next()

})
//路由守卫,做路由跳转判断
index.beforeEach((to, _, next) => {
    //获取用户信息
    const userStore = useUsersStore()

    const time = new Date().getTime()
    const overtime = 8 * 60 * 60 * 1000
    const startTime = localStorage.getItem('START_TIME') || '0'
    if (time - +startTime > overtime) {
        //登录状态超出时长
        userStore.$reset()
        Cookies.remove('LOCAL_KEY')
        localStorage.clear()
    }
    if (!to.path.endsWith('login') && !userStore.userInfo.UserName) {
        //未登录时跳转到登录页
        next('/login')
    } else {
        // localStorage.setItem('path', to.path)
        next()
    }
})
export default index
