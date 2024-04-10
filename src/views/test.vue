<template>
  <el-row :gutter="20" class="min-w-1000px">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
  </el-row>
  <el-row :gutter="20" class="min-w-1000px">
    <el-col :span="18">
      <div class="grid-content ep-bg-purple"/>
    </el-col>
  </el-row>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  background-color: red;
  border-radius: 4px;
  min-height: 36px;
}
</style>
<script lang="ts" setup>
</script>