<template>
  <el-container class="w-1/1  h-1/1 " style=" background-color: #f4faff;">
    <el-header class="bg-white shallow z-2">

      <Logout></Logout>
    </el-header>
    <el-container>
      <el-aside class="bg-white shallow pt-4" width="220px">
        <Sider>
          <template #default="scope">
            {{ scope.item.text }}
          </template>
        </Sider>

      </el-aside>
      <el-main class=" h-1/1 transparent">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Sider from '@/components/sider.vue'
import Logout from '@/components/logout.vue'
</script>


<style scoped>
.shallow {
  box-shadow: rgba(234, 243, 250.24) 0px 3px 8px;
}
</style>
<style>


</style>