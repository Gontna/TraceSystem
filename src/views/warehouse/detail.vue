<template>
  <div class="w-1/1 mt-3 mb-6">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/system/warehouse' }">仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ wareHouseStore.data.ProName }}</el-breadcrumb-item>

    </el-breadcrumb>
  </div>

  <div class="w-1/1 h-8/9 rounded-md shallow bg-white p-4 flex flex-col justify-center items-center ">
    <div class="w-1/1 h-1/10 px-4  flex items-center" style="min-height:40px ">
      <el-form-item class="content " label="">
        <span class="text-16px">筛选:</span>
        <button
            v-for="(item,index) in FilterButtonText" :key="index"
            :class="FilterActivate==index?'active':''"
            style="margin: 0 0.5em; width: 5em; height: 2em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.7em"
            @click="filterQueryChange(index)">
          {{ item }}
        </button>
      </el-form-item>
      <el-form-item class="content ml-5" label="">
        <span class="text-16px">动作内容:</span>
        <button
            v-for="(item,index) in StateButtonText" :key="index"
            :class="StateActive==index?'active':''"
            style="margin: 0 0.5em; width: 5em; height: 2em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.7em"
            @click="stateQueryChange(index)">
          {{ item }}
        </button>
      </el-form-item>
      <el-form-item class="mx-5" label="批次编号:">
        <el-input v-model="query.outBatchCode" @change="search"/>
      </el-form-item>
      <el-form-item class="mx-5">
        <el-date-picker
            v-model="query.outDate"
            clearable
            format="YYYY/MM/DD"
            placeholder=""
            style="width: 9em;"
            type="date"
            value-format="YYYY-MM-DD"
            @change="search"
        ></el-date-picker>

      </el-form-item>
    </div>
    <div class="px-3 w-1/1 flex-1" style="min-height:0;">
      <el-table id="tableData" :data="data" :header-cell-style="rowClass"
                :height="height"
                class="rounded-lg "
                fit

                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="ProId" width="60"/>
        <el-table-column align="center" label="产品名称" prop="ProName">
          <template #default="scope">
            {{ scope.row.ProName ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="登记证号" property="ProRegNo">
          <template #default="scope">
            {{ scope.row.ProRegNo ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="运营商" property="ShopName">
          <template #default="scope">
            {{ scope.row.ShopName ?? '1' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="批次编号" property="OutBatchCode">
          <template #default="scope">
            {{ scope.row.OutBatchCode ?? '-' }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="包装等级" prop="ProLevel">
          <template #default="scope">
            {{ scope.row.ProLevel }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="动作产品数" prop="BottleCodeCount">
          <template #default="scope">
            {{ scope.row.BottleCodeCount }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="动作盒数" prop="HeMaCodeCount">
          <template #default="scope">
            {{ scope.row.HeMaCodeCount }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="动作箱数" prop="BoxCodeCount">
          <template #default="scope">
            {{ scope.row.BoxCodeCount }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="动作内容" prop="CodeStata">
          <template #default="scope">
            <span v-show="scope.row.CodeState==1" class="inline-block w-3.5em h-1.7em"
                  style="border:1.5px #71bcff solid;border-radius: 4px;background-color: #d8edff;color: #71bcff">
              入库
            </span>
            <div v-show="scope.row.CodeState==2" class="inline-block w-3.5em h-1.7em"
                 style="border:1.5px #d6d6d9 solid;border-radius: 4px;background-color: #f5f5f5;color: #c3c4c7">出库
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作 ">
          <template #default="scope">
            <el-button size="small" type="danger" @click="deleteTarget(scope.row.OutBatchCode,scope.row.codeState)">删除
            </el-button>
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
import {useWareHouseStore} from "@/store/warehouse.ts";
import {nextTick, onMounted, reactive, ref} from "vue";
import {DelProCodeInfo, getProInfoByProId} from "@/api/warehouse.ts";
import {ElMessage} from "element-plus";
import {hint} from "@/components/hint.ts";

const wareHouseStore = useWareHouseStore()
const data = ref([])
const FilterActivate = ref(-1)
const FilterButtonText = ['近一周', '近一月', '近三月']
const StateActive = ref(-1)
const StateButtonText = ['入库', '出库']
let pageInfo = reactive({
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalPage: 1,  //总页数
})
const query = ref({
  proId: '',
  timeType: '',
  codeState: '',
  outDate: '',
  outBatchCode: ''

})
onMounted(() => {
  query.value.proId = wareHouseStore.data.ProId
  getData()
})
const getData = () => {
  getProInfoByProId(query.value, pageInfo).then((res: any) => {
    if (res.retCode === 0) {
      data.value = res.retData.info

    }
  }).catch((err: any) => {
    data.value = []
    ElMessage.error(err.retMsg)
  })
}
const filterQueryChange = (index: number) => {
  if (index === FilterActivate.value) {
    FilterActivate.value = -1
    query.value.timeType = ''
    getData()
  } else {
    FilterActivate.value = index
    query.value.timeType = (index + 1).toString()
    getData()
  }
}
const stateQueryChange = (index: number) => {
  if (index === StateActive.value) {
    StateActive.value = -1
    query.value.codeState = ''
    getData()
  } else {
    StateActive.value = index
    query.value.codeState = (index + 1).toString()
    getData()
  }
}
const search = () => {
  if (!query.value.outDate) {
    query.value.outDate = ''
  }
  getData()
}
const deleteTarget = (outBatchCode: string, codeState: string) => {
  DelProCodeInfo(outBatchCode, codeState).then((res: any) => {
    if (res.retCode === 0) {
      hint('删除成功')
      getData()
    }
  }).catch((err: any) => {
    ElMessage.error(err.retMsg)
  })
}
let del_target_cache = ref([])
const multi_del = (value: any) => {
  del_target_cache.value = value

}
const mult_del_handler = () => {
}
const pageSizeChange = (pageSize: number) => {
  pageInfo.pageSize = pageSize
  //翻页器大小改变事件

}
const currPageChange = (index: number) => {
  pageInfo.currentPage = index
  //翻页事件


}
const rowClass = (row: any,) => {

  if (row.columnIndex === -1) {
    return {background: '#F0F5FF', color: '#5fa8e5'}
  } else {
    return {background: '#F0F5FF', color: '#606266'}
  }

}
const timeChange = (time: any) => {
  let data = new Date(time);
  return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`
}


////////////////////////////////////////////////
const height = ref('400px')
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
  getAutoHeight()
  window.onresize = function () {
    getAutoHeight();
  };
})

/////////////////////////////////////////////////

</script>


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
<style scoped>
.active {
  background: #279cff !important;
  color: white !important;
}

</style>