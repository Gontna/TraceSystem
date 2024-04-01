@@ -0,0 +1,85 @@
<template>
    <div class="w-1/1 mt-3 mb-10">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/system/product' }">产品类型</el-breadcrumb-item>
            <el-breadcrumb-item>{{ crumbs }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow flex flex-col justify-center items-center">
        <div>
            <div class="flex flex-col justify-center items-center">
                <img alt="" src="../../../public/Subtract.png" style="width: 5em">
                <span class="text-lg font-bold m-7">{{ text }}成功</span>
            </div>
            <div>
                <el-button style="width: 146px" type="primary" @click="">查看产品详情</el-button>
                <el-button plain style="border: 2px solid #b5b5b5" @click="router.push({path: '/system/product'})">
                    返回产品目录({{ seconds }}s)
                </el-button>
            </div>
        </div>
    </div>
    <div id="tableData"></div>
</template>

<script lang="ts" setup>
import {ArrowRight} from '@element-plus/icons-vue'
import {nextTick, onMounted, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const seconds = ref(3)
const text = ref('添加')
const crumbs = ref('添加')
const countTime = () => {
    seconds.value = 3
    let timer = setInterval(function () {
        if (seconds.value > 0) {
            seconds.value -= 1
        } else {
            //时间结束后操作
            clearInterval(timer)
            router.push({path: '/system/product'})
        }
    }, 1000)
}
countTime()
////////////////////////////////////////////////
const height = ref('200px')
const getAutoHeight = () => {
    let el = document.querySelector("#tableData"),
        //@ts-ignore
        elParent = el.parentNode,
        pt = getStyle(elParent, "paddingTop"),
        pb = getStyle(elParent, "paddingBottom");
    nextTick(() => {
        //@ts-ignore
        height.value = elParent.clientHeight - (pt + pb) + "px";
    });
}
const getStyle = (obj: any, attr: any) => {
    // 兼容IE浏览器
    let result = obj.currentStyle
        ? obj.currentStyle[attr].replace("px", "")
        //@ts-ignore
        : document.defaultView
            .getComputedStyle(obj, null)[attr].replace("px", "");
    return Number(result);
}
onMounted(() => {
    //@ts-ignore
    if (router.currentRoute.value.params.flag == 1) {
        text.value = '保存'
        crumbs.value = '编辑'
    }
    getAutoHeight()
    window.onresize = function () {
        getAutoHeight();
    };
})

/////////////////////////////////////////////////
</script>


<style scoped></style>