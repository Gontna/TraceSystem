import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {join} from "path";
import AutoImport from 'unplugin-auto-import/vite'
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
    plugins: [
        vue(),
        WindiCSS(),
        //Element plus 按需引入
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    // @路径别名
    resolve: {
        alias: {
            '@': join(__dirname, "src"),
        }
    }
})
