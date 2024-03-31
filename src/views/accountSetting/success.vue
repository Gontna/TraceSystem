<template>
  <div class="w-1/1 mt-3 mb-10">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/system/account' }">新增账号</el-breadcrumb-item>
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
        <el-button plain style="border: 2px solid #b5b5b5" @click="router.push({path: '/system/account'})">
          返回账号管理({{ seconds }}s)
        </el-button>
      </div>
    </div>
  </div>
  <div id="tableData"></div>
</template>

<script lang="ts" setup>
import {ArrowRight} from '@element-plus/icons-vue'
import {ref} from "vue";
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
      router.push({path: '/system/account'})
    }
  }, 1000)
}
countTime()

</script>


<style scoped></style>