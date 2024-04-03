<template>
  <div class="w-1/1 h-1/1 flex justify-between items-center ">
    <div>logo占位</div>
    <div class="flex items-center mr-4">
      <el-badge class="mr-4" is-dot>
        <el-button :icon="Bell" circle plain type="info" @click="logout"/>
      </el-badge>


      <el-dropdown class="mr-2">
    <span class="el-dropdown-link flex justify-between items-center">
       <el-avatar :size="35" :src="userStore.userInfo.HeadUrl" class="mr-2" @error="errorHandler">
        <div v-if="userStore.userInfo.HeadUrl ==null">User
        </div>
      </el-avatar>
       {{ userStore.userInfo.NickName }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button :icon="SwitchButton" circle plain type="info" @click="logout"/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {ArrowDown, Bell, SwitchButton} from "@element-plus/icons-vue";
import {useUsersStore} from "@/store/user.ts";
import {useRouter} from "vue-router";
import Cookies from "js-cookie";
import {ElMessage} from "element-plus";

const router = useRouter()
const userStore = useUsersStore()
const errorHandler = () => false
const logout = () => {
  ElMessageBox.confirm(
      '是否退出系统?',
      {
        confirmButtonText: '退出登录',
        cancelButtonText: '取消',
        center: true,
      }
  ).then(() => {
    ElMessage.success('退出成功')
    userStore.$reset()
    Cookies.remove('LOCAL_KEY')
    localStorage.clear()
    router.push({path: '/login'})
  })

}
</script>

<style>
.el-badge__content.is-dot {
  height: 12px;
  width: 12px;

}

.el-badge__content.is-fixed.is-dot {
  right: 10px;
}

.el-badge__content.is-dot {

  top: 4px
}

.el-badge__content.is-dot {

}
</style>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>