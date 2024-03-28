<template>
  <div class="w-1/1 h-1/1 rounded-md shallow bg-white p-4 flex flex-col justify-center items-center ">
    <div class="w-1/1 pt-4 flex flex-row justify-center items-between">
      <el-form class="w-1/1 px-3">
        <div class="w-1/1 flex flex-row justify-between items-start">
          <el-form-item class="search">
            <el-input v-model.trim.lazy="query.keyName"

                      placeholder="输入查询">
              <template #append>
                <el-button style="color: #ffffff;background-color: #2b9cfa;border-radius: 0 5px 5px 0; "
                           @click="">查找
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="background-color: #00bd77;color: #fff" @click="">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="px-3 w-1/1 flex-1" style="min-height:0;">
      <el-table id="tableData" :data="data" :header-cell-style="rowClass" :height="height"
                class="rounded-lg"
                fit
                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="ProductId" width="60"/>
        <el-table-column align="center" label="用户账号" prop="ProductName">
          <template #default="scope">
            {{ scope.row.ProductName ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户密码" property="Operator">
          <template #default="scope">
            {{ scope.row.Operator ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名称" property="ProNum">
          <template #default="scope">
            {{ scope.row.ProLen ?? '1' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系方式" property="ProLen">
          <template #default="scope">
            {{ scope.row.ProNum ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限" property="Spec">
          <template #default="scope">
            <el-button link size="small" type="primary" @click="detail(scope.$index)">查看</el-button>

          </template>
        </el-table-column>
        <el-table-column align="center" label="所属部门" prop="CreateDate">
          <template #default="scope">
            {{ scope.row.CreateDate }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加事件" prop="CreateDate">
          <template #default="scope">
            {{ scope.row.CreateDate }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作 ">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editTarget(scope.$index)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteTarget(scope.row.ProductId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="w-1/1 px-4 flex flex-row justify-between items-center" style="min-height:0;">
      <div>
        <el-button link type="primary" @click="mult_del_handler">批量删除</el-button>
      </div>
      <div class="flex-1"></div>
      <div>
        <el-pagination
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :total="pageInfo.total"
            background class="mt-2" layout=" prev, pager, next, jumper, sizes" small
            @size-change="pageSizeChange"
            @current-change="currPageChange"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {getAutoHeight} from "@/utils/utils.ts";

const data = ref([])
const query = ref({
  keyName: ''
})
let pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 30,
})
const detail = (index: any) => {
  //查看用户权限
  console.log(index)
}
const editTarget = (index: any) => {
  //编辑用户信息
  console.log(index)
}
const deleteTarget = (index: any) => {
  //删除用户信息
  console.log(index)
}

const multi_del = () => {

}
const mult_del_handler = () => {
  //批量删除
}
const pageSizeChange = () => {
  //翻页器大小改变事件
}
const currPageChange = () => {
  //翻页事件
}
const rowClass = (row: any,) => {

  if (row.columnIndex === 9) {
    return {background: '#F0F5FF', color: '#5fa8e5'}
  } else {
    return {background: '#F0F5FF', color: '#606266'}
  }

}

const height = ref('200px')
onMounted(() => {
  getAutoHeight()
  window.onresize = function () {
    getAutoHeight();
  };
})
</script>


<style scoped>

</style>