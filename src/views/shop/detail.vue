<template>
  <div class="w-1/1 mt-3 mb-6">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/system/shop' }">运营商管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ shopStore.data.ShopName }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="w-1/1 h-20/22 px-5 pt-5 bg-white rounded-md shallow p-4 flex flex-col justify-center items-center ">
    <div class="w-1/1  pt-2 flex flex-row justify-center items-between">
      <el-form class="w-1/1 px-3">
        <div class="w-1/1 ">
          <div class="flex items-center">
            <div style="font-size: 14px">筛选:</div>
            <button
                v-for="(item,index) in buttonText" :key="index"
                :class="activate==index?'active':''"
                style="  margin: 0 0.5em; width: 5em; height: 1.7em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter"
                @click="queryChange(index)">
              {{ item }}
            </button>

            <el-date-picker
                v-model="query.outDate"
                clearable
                format="YYYY/MM/DD"
                placeholder="请选择添加时间"
                type="date"
                value-format="YYYY-MM-DD"
                @change="calendarChange"
            />

          </div>


        </div>
      </el-form>
    </div>
    <div class="px-3 w-1/1 flex-1" style="min-height:0;">
      <el-table id="tableData" :data="data"
                :header-cell-style="rowClass"
                class="rounded-lg mt-4"
                fit

                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="UserId" width="60"/>
        <el-table-column align="center" label="产品名称" prop="ProName">
          <template #default="scope">
            {{ scope.row.ProName ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="批次编号" property="BatchCode">
          <template #default="scope">
            {{ scope.row.BatchCode ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="登记证号" property="ProRegNo">
          <template #default="scope">
            {{ scope.row.ProRegNo ?? '1' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="登记证持有人" property="ProRegOwner">
          <template #default="scope">
            {{ scope.row.ProRegOwner ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品数" prop="BoxCodeCount">
          <template #default="scope">
            {{ scope.row.BoxCodeCount }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请时间" prop="ProduceDate">
          <template #default="scope">
            {{ scope.row.ProduceDate }}
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
            :page-count="pageInfo.totalPage"
            :page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background class="mt-2" layout=" prev, pager, next, jumper, sizes" small
            @size-change="pageSizeChange"
            @current-change="currPageChange"/>
      </div>
    </div>

  </div>

</template>

<script lang="ts" setup>

import {ArrowRight} from "@element-plus/icons-vue";
import {useShopStore} from "@/store/shop.ts";
import {onMounted, reactive, ref} from 'vue'
import {getProCoudeInfoByShopId} from "@/api/shop.ts";
import {ElLoading, ElMessage} from "element-plus";

const shopStore = useShopStore()
const activate = ref(-1)

const data = ref([])
const buttonText = ['近一周', '近一月', '近三月']
let pageInfo = reactive({
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalPage: 1,  //总页数
})

const query = reactive({
  shopId: '',
  timeType: '',
  outDate: '',
})
onMounted(() => {
  getData()
})
const getData = async () => {
  query.shopId = shopStore.data.ShopId.toString()
  let loading = ElLoading.service()

  await getProCoudeInfoByShopId(query, pageInfo).then(res => {

    if (res.retCode == 0) {
      data.value = res.retData.info
      pageInfo.totalPage = res.retData.totalPage
      loading.close()
    }
  }).catch(err => {
    data.value = []
    ElMessage.info(err.retMsg)
    loading.close()
  })
}
const calendarChange = () => {
  if (query.outDate == null) {
    query.outDate = ''
  }
  console.log(query.outDate)
  getData()
}
const queryChange = (index: number) => {

  if (activate.value == index) {
    activate.value = -1
  } else {
    activate.value = index
  }
  query.timeType = index + 1
  // getData()
}

const multi_del = (value: any) => {
  del_target_cache.value = value

}
const mult_del_handler = () => {
}
const pageSizeChange = (pageSize: number) => {
  pageInfo.pageSize = pageSize
  //翻页器大小改变事件
  getData()
}
const currPageChange = (index: number) => {
  pageInfo.currentPage = index
  //翻页事件
  getData()
}
const rowClass = (row: any,) => {

  if (row.columnIndex === 9) {
    return {background: '#F0F5FF', color: '#5fa8e5'}
  } else {
    return {background: '#F0F5FF', color: '#606266'}
  }

}
</script>


<style scoped>
.active {
  background: #279cff !important;
  color: white !important;
}

.unactive {
  margin: 0 0.5em;
  width: 5em;
  height: 1.7em;
  background-color: #b1b2b7;
  border-radius: 3px;
  color: #fff;
  font-weight: lighter
}
</style>

<style>
.el-button:focus {
  background: #279cff !important;
  color: white !important;
  font-weight: bold;

  border-color: #01a8f9 !important;
}

</style>
<style>
.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: var(--el-color-primary);
}

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  font-weight: normal;
  font-size: small;
  color: #8c939d;
}
</style>