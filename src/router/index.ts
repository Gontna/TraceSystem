import {createRouter, createWebHashHistory} from 'vue-router'

// 导入路由页面的配置
import routes from './router'


// 路由参数配置
const index = createRouter({
    // 使用hash(createWebHashHistory)模式，(createWebHistory是HTML5历史模式，支持SEO)
    history: createWebHashHistory(),
    routes: routes,
})
index.beforeEach((to, _, next) => {
    // @ts-ignore
    window.document.title = to.meta.title
    next()
})
export default index
