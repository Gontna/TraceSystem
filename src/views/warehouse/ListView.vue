<template>
  <div class="w-1/1 h-1/1 rounded-md shallow bg-white p-4 flex flex-col justify-center items-center ">
    <div class="w-1/1 pt-4 flex flex-row justify-center items-between">
      <el-form class="w-1/1 px-3">
        <div class="w-1/1 flex">
          <el-form-item class="search">
            <el-input v-model.trim.lazy="query.batchCode"
                      placeholder="输入查询">
              <template #append>
                <el-button style="color: #ffffff;background-color: #2b9cfa;border-radius: 0 5px 5px 0; "
                           @click="search">查找
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
        <el-table-column align="center" label="序号" prop="ProId" width="60"/>
        <el-table-column align="center" label="产品图片" prop="ImgUrl">
          <template #default="scope">
            <el-image
                :src="scope.row.ImgUrl"
                fit="cover"
                style="width: 50px; height: 50px"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称" property="ProName">
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

        <el-table-column align="center" label="包装等级" prop="ProLevel">
          <template #default="scope">
            {{ scope.row.ProLevel }}级
          </template>
        </el-table-column>
        <el-table-column align="center" label="箱数" prop="BoxCodeCount">
          <template #default="scope">
            {{ timeChange(scope.row.BoxCodeCount) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="盒数" prop="HeMaCodeCount">
          <template #default="scope">
            {{ timeChange(scope.row.HeMaCodeCount) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品数" prop="CodeCount">
          <template #default="scope">
            {{ timeChange(scope.row.CodeCount) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="记录" property="detail">
          <template #default="scope">
            <el-button link size="small" type="primary" @click="detail(scope.row)">查看
            </el-button>

          </template>
        </el-table-column>
        <el-table-column align="center" label="操作 ">
          <template #default="scope">

            <el-button size="small" type="success" @click="outBound(scope.row.BatchCode)">出库
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
  <el-dialog
      v-model="centerDialogVisible"
      align-center
      center
      style="border-radius: 2vh"
      width="400"
  >
    <el-form label-width="7em">
      <el-form-item label="运营商:">
        <el-select
            v-model="formData.shopId"
            filterable
            placeholder=""
            style="width: 15em"

        >
          <el-option
              v-for="item in options"
              :key="item.ShopId"
              :label="item.ShopName"
              :value="item.ShopId"

          ></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="出货地址:">
        <el-input v-model="formData.destination" style="width: 15em;"></el-input>
      </el-form-item>
      <el-form-item label="批次编号:">
        <el-input v-model="formData.batchCode" style="width: 15em;"></el-input>
      </el-form-item>
      <el-form-item label="出库数量:">
        <el-input v-model.number="formData.outCount" style="width: 15em;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="outBoundConfirm">出库</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref} from 'vue'
import {getProBatchInfo, ProOutBound} from "@/api/warehouse.ts";
import {ElForm, ElFormItem, ElInput, ElMessage} from "element-plus";

import {useRouter} from "vue-router";
import {getShopInfo} from "@/api/shop.ts";
import {useWareHouseStore} from "@/store/warehouse.ts";

const wareHouseStore = useWareHouseStore()
const router = useRouter()
const centerDialogVisible = ref(false)
const data = ref([])
const formData = ref({
  shopId: '',
  shopName: '',
  batchCode: '',
  destination: '',
  outCount: 0
})
const options = ref([
  {
    ShopId: '1',
    ShopName: '选项1'
  }
])
const query = reactive({
  batchCode: ''
})
onMounted(() => {
  getData()
})
const getData = () => {
  getProBatchInfo(query, pageInfo).then((res: any) => {

    if (res.retCode === 0) {
      data.value = res.retData.info
    }
  }).catch((err: any) => {
    data.value = []
    ElMessage.error(err.retMsg)

  })
}
const search = () => {
  getData()
}
const outBoundConfirm = () => {
  let temp = formData.value.shopId.toString()

  console.log(typeof temp)
  formData.value.shopName = options.value.filter(item => item.ShopId == formData.value.shopId)[0].ShopName
  console.log(formData.value)

  ProOutBound(formData.value).then((res: any) => {
    if (res.retCode === 0) {
      ElMessage.success('出库成功')
      centerDialogVisible.value = true
      formData.value.outCount = 0
      formData.value.shopName = ''
      formData.value.shopId = ''
      formData.value.batchCode = ''
      formData.value.destination = ''
    }
  }).catch((err: any) => {
    ElMessage.error(err.retMsg)
  })
}
let pageInfo = reactive({
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalPage: 1,  //总页数
})
const detail = (row: any) => {

  wareHouseStore.data = row
  router.push({name: 'warehouseDetail'})
}
let del_target_cache = ref([])
const multi_del = (value: any) => {
  del_target_cache.value = value

}
const outBound = async (BatchCode: string) => {
  formData.value.batchCode = BatchCode
  centerDialogVisible.value = true

  await getShopInfo().then((res: any) => {
    if (res.retCode === 0) {
      options.value = res.retData.info

    }
  }).catch((err: any) => {
    ElMessage.error(err.retMsg)
  })

  //
  // ElMessageBox({
  //   message: () =>
  //       h(ElForm, {labelWidth: '6em'}, () => [
  //         h(ElFormItem, {label: '运营商:'}, () => [
  //               h(ElSelect, {
  //                 modelValue: formData.value.shopId,
  //                 style: 'width:16em',
  //                 ref: 'selectView',
  //                 filterable: true,
  //                 placeholder: '',
  //
  //                 onChange(e) {
  //                   formData.value.shopId = e
  //                   console.log(formData.value.shopId)
  //                 },
  //               }, () => [
  //                 options.map(item => {
  //                   return h(ElOption, {
  //                     key: item.ProId,
  //                     value: item.ProId,
  //                     label: item.ProName,
  //                   }, () => [])
  //                 })
  //               ])
  //             ],
  //         ),
  //         h(ElFormItem, {label: '出货地址'}, () => [
  //           h(ElInput, {
  //             modelValue: formData.value.destination,
  //             onChange(value) {
  //               formData.value.destination = value
  //               console.log(value)
  //             },
  //           }, () => [])
  //         ]),
  //         h(ElFormItem, {label: '批次编号'}, () => [
  //           h(ElInput, {modelValue: formData.value.batchCode}, () => [])
  //         ]),
  //         h(ElFormItem, {label: '出库数量'}, () => [
  //           h(ElInput, {modelValue: formData.value.outCount}, () => [])
  //         ]),
  //       ])
  //   ,
  //   showConfirmButton: false,
  //   customClass: 'persdsd',
  //   center: true,
  // })
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
.persdsd {
  border-radius: 2vh;
}

.persdsd .el-message-box {
  width: 120vh;
  height: 35vh;
  border-radius: 2vh;

}

.persdsd .el-message-box__content {
  margin: 5vh 0;
  font-size: 1rem;
}

.persdsd .el-message-box__message p {
  line-height: 30px;
}

.persdsd .el-message-box__btns .el-button {
  width: 10vh;
  margin: 0 3vh;
}
</style>

<style scoped>

</style>