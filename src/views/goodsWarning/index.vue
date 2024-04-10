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
                           @click="getData">查找
                </el-button>
              </template>
            </el-input>
          </el-form-item>


        </div>
      </el-form>
    </div>
    <div class="px-3 w-1/1 flex-1" style="min-height:0;">
      <el-table id="tableData" :data="data" :header-cell-style="rowClass"
                :height="height"
                class="rounded-lg "
                fit

                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="ScanCodeId" width="60"/>
        <el-table-column align="center" label="产品名称" prop="ProName">
          <template #default="scope">
            {{ scope.row.ProName ?? '-' }}
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
        <el-table-column align="center" label="批号" property="BatchCode">
          <template #default="scope">
            {{ scope.row.BatchCode ?? '-' }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="产品应处位置" prop="Destination">
          <template #default="scope">
            {{ scope.row.Destination }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品实际位置" prop="RealAddr">
          <template #default="scope">
            {{ scope.row.RealAddr }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="预警时间" prop="ScanDate">
          <template #default="scope">
            {{ timeChange(scope.row.ScanDate) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作 ">
          <template #default="scope">

            <el-button size="small" type="danger" @click="deleteTarget(scope.row.ScanCodeId)">删除
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
import {nextTick, onMounted, reactive, ref} from 'vue'
import {delScanCodeInfo, getScanCodeInfo} from "@/api/goodswarning.ts";
import {ElMessage, ElMessageBox} from "element-plus";
import {hint} from "@/components/hint.ts";

const data = ref([])
const query = ref({
  keyName: ''
})
let pageInfo = reactive({
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalPage: 1,  //总页数
})
onMounted(() => {
  getData()
})
const getData = () => {
  getScanCodeInfo(query.value.keyName, pageInfo).then((res: any) => {
    if (res.retCode === 0) {
      data.value = res.retData.info
    }
  }).catch((err: any) => {
    data.value = []
    ElMessage.error(err.retMsg)
  })
}
const delInfo = (scanCodeId: number) => {
  delScanCodeInfo(scanCodeId).then((res: any) => {
    if (res.retCode === 0) {
      ElMessage.success('删除成功')
      getData()
    }
  }).catch((err: any) => {
    ElMessage.error(err.retMsg)
  })
}
const deleteTarget = (scanCodeId: number) => {
  ElMessageBox.confirm(
      '是否删除该产品',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
      }
  ).then(() => {
    hint('删除成功')
    delInfo(scanCodeId)
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
  getData()
}
const currPageChange = (index: number) => {
  pageInfo.currentPage = index
  //翻页事件
  getData()

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


<style scoped>

</style>
<style>

.el-message-box {

  width: 120vh;
  height: 30vh;
  border-radius: 2vh;

}

.el-message-box__content {
  margin: 5vh 0;
  font-size: 2rem;
}

.el-message-box__message p {
  line-height: 30px;
}

.el-message-box__btns .el-button {
  width: 10vh;
  margin: 0 3vh;
}
</style>