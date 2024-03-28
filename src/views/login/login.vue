<template>
  <el-button type="primary" @click="router.push({name:'home'})">登录</el-button>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>


<style scoped>

</style>