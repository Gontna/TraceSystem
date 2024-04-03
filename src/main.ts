import {createApp} from 'vue'
import './style.css'
import {createPinia} from "pinia";
import App from './App.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import 'virtual:windi.css'
import router from './router/index'
import '@/assets/fonticon/iconfont.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn
})
app.use(pinia)
app.use(router)
app.mount('#app')
