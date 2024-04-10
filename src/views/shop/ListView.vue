<template>

  <div class="w-1/1 h-1/13 rounded-md shallow bg-white p-4  flex flex-col justify-center items-center ">
    <div class="w-1/1 pt-4 flex flex-row justify-center items-between">
      <el-form class="w-1/1 px-3">
        <div class="w-1/1 flex flex-row justify-between items-start">
          <el-form-item class="search">
            <el-input v-model.trim.lazy="query.keyName"
                      placeholder="输入查询">
              <template #append>
                <el-button style="color: #ffffff;background-color: #2b9cfa;border-radius: 0 5px 5px 0; "
                           @click="search()">查找
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="background-color: #00bd77;color: #fff" @click="appendInfo">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

  <div class="flex w-1/1 h-1/1 justify-start flex-wrap  min-w-1100px mt-3  "
       style="overflow: auto;max-height: 70vh;max-height: 70vh"
  >
    <div v-for="(item,index) in data" :key="index"
         class=" flex-1  m-4 bg-white h-40 rounded-xl"
         style="width: 38vh;min-width: 38vh;max-width: 38vh"
         @click.stop="toDetail(item)">
      <div class="flex justify-between">
        <div class=" w-30 h-6  rounded-br-xl  rounded-tl-xl"
             style="text-align: center;color: #fff;background-color: #279cff;font-size: 14px;overflow: hidden">
          {{ item.ShopName }}
        </div>

        <div class="mr-2">
          <el-button link type="primary" @click="editInfo(item,$event)">编辑</el-button>
          <el-button link type="danger" @click="delInfo(item.ShopId,$event)">删除</el-button>
        </div>

      </div>
      <div class="flex ">
        <div class="px-3 pt-3 pb-2 pl-5 flex items-center justify-center">
          <el-avatar :size="50" :src='item.ImgUrl'/>
          <div class="mx-3">
            <p>{{ item.LeaderName }}</p>
            <p style="color:#c3c3c3;font-size: 14px">负责人:{{ item.JobName }}</p>
          </div>
        </div>
      </div>
      <div class="w-1/1 px-5" style="color:#c3c3c3;font-size: 14px">
        <p> 联系方式:{{ item.Phone }}</p>
        <p style="overflow:hidden; white-space: nowrap;
        text-overflow: ellipsis;">地址:{{ item.Addr }}</p>

      </div>
    </div>

  </div>


  <div class="w-1/1 px-4  flex flex-row justify-between items-center" style="min-height:0;">

    <div class="flex-1"></div>
    <div>
      <el-pagination

          :current-page="pageInfo.currentPage"
          :page-count="pageInfo.totalPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[12, 24, 36]"
          background class="mt-2" layout=" prev, pager, next, jumper, sizes" small
          @size-change="pageSizeChange"
          @current-change="currPageChange"/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {delShopInfo, getShopInfoList} from "@/api/shop.ts";
import {ElLoading, ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {useShopStore} from "@/store/shop.ts";

const shopStore = useShopStore()
const router = useRouter()
const data = ref([{
  ShopName: '',
  LeaderName: '',
  JobName: '',
  Addr: '',
  Phone: '',
  ShopId: 0,
  ImgUrl: ''
}])
//查询参数
const query = ref({
  keyName: ''
})
//翻页器信息
let pageInfo = reactive({
  currentPage: 1, //当前页码
  pageSize: 12, //每页显示条目数
  totalPage: 1,  //总页数
})
onMounted(() => {
  getData()
})
const getData = async () => {
  let loading = ElLoading.service()
  await getShopInfoList(query.value.keyName, pageInfo).then((res: any) => {

    if (res.retCode === 0) {
      data.value = res.retData.info
      pageInfo.totalPage = res.retData.totalPage
      loading.close()
    }
  })
}
const search = () => {
  getData()
}
const toDetail = (row: any) => {
  shopStore.data = row
  router.push({name: 'shopDetail'})
}
const editInfo = (row: any, event: any) => {
  event.stopPropagation()
  shopStore.data = row
  shopStore.data['File'] = null
  router.push({path: '/system/shop/edit'})
}
const appendInfo = () => {
  router.push({name: 'appendShop'})
}
const delInfo = (shopId: number, event: any) => {
  event.stopPropagation()
  ElMessageBox.confirm(
      '是否删除该产品',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
      }
  ).then(() => {
    delShopInfo(shopId).then((res: any) => {
      if (res.retCode === 0) {
        ElMessage.success('删除成功')
      }
      getData()
    }).catch((err: any) => {
      ElMessage.error(err.retMsg)
    })
  })


}

const pageSizeChange = (pageSize: number) => {
  pageInfo.pageSize = pageSize
  getData()
}
const currPageChange = (index: number) => {
  pageInfo.currentPage = index
  getData()
}
// ////////////////////////////////////////////////
// const height = ref('400px')
// const getAutoHeight = () => {
//   let el = document.querySelector("#tableData"),
//       //@ts-ignore
//       elParent = el.parentNode,
//       pt = getStyle(elParent, "paddingTop"),
//       pb = getStyle(elParent, "paddingBottom");
//   nextTick(() => {
//     //@ts-ignore
//     height.value = elParent.clientHeight - (pt + pb) + "px";
//   });
// }
// const getStyle = (obj: any, attr: any) => {
//   // 兼容IE浏览器
//   let result = obj.currentStyle
//       ? obj.currentStyle[attr].replace("px", "")
//       //@ts-ignore
//       : document.defaultView
//           .getComputedStyle(obj, null)[attr].replace("px", "");
//   return Number(result);
// }
// onMounted(() => {
//   getAutoHeight()
//   window.onresize = function () {
//     getAutoHeight();
//   };
// })
//
// /////////////////////////////////////////////////
</script>
<style>

</style>


<style scoped>
.card-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

.card-context {
  flex: 1;
  width: 320px;
  min-width: 320px;
  max-width: 320px;
  height: 100px;
  margin: 10px;
  border: solid 3px pink;
}

.card-context.no-border {
  border: none;
}
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