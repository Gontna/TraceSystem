<template>
  <div class="w-1/1 mt-3 mb-10">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/system/shop' }">{{ crumbs }}运营商信息</el-breadcrumb-item>
      <el-breadcrumb-item>{{ crumbs }}</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
  <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow flex flex-col justify-center items-center">
    <div>
      <div class="flex flex-col justify-center items-center">
        <img alt="" src="/Subtract.png" style="width: 5em">
        <span class="text-lg font-bold m-7">{{ text }}成功</span>
      </div>
      <div>
        <el-button style="width: 146px" type="primary" @click="">查看信息详情</el-button>
        <el-button plain style="border: 2px solid #b5b5b5" @click="router.push({path: '/system/shop'})">
          返回运营商管理({{ seconds }}s)
        </el-button>
      </div>
    </div>
  </div>
  <div id="tableData"></div>
</template>

<script lang="ts" setup>
import {ArrowRight} from '@element-plus/icons-vue'
import {onBeforeMount, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const seconds = ref(3)
const text = ref('新增')
const crumbs = ref('添加')
onBeforeMount(() => {
  //@ts-ignore
  if (router.currentRoute.value.params.flag == 1) {
    text.value = '保存'
    crumbs.value = '编辑'
  }
})
const countTime = () => {
  seconds.value = 3
  let timer = setInterval(function () {
    if (seconds.value > 0) {
      seconds.value -= 1
    } else {
      //时间结束后操作
      clearInterval(timer)
      router.push({path: '/system/shop'})
    }
  }, 1000)
}
countTime()

</script>


<style scoped></style>