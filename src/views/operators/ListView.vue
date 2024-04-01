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
                           @click="search">查找
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button style="background-color: #00bd77;color: #fff" @click="appendInfo()">新增</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

  <div class="flex flex-wrap w-1/1 h-12/13 max-h-157   mt-3  " style="overflow:auto ">
    <div v-for="(item,index) in data" :key="index"
         class=" flex-1 w-80 min-w-80 max-w-80 m-4 bg-white h-38 rounded-xl  ">
      <div class="flex justify-between">
        <div class=" w-30 h-6  rounded-br-xl  rounded-tl-xl"
             style="text-align: center;color: #fff;background-color: #279cff;font-size: 14px">
          {{ item.ShopName }}
        </div>
        <div class="mr-2">
          <el-button link type="primary">编辑</el-button>
          <el-button link type="danger">删除</el-button>
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


</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getShopInfoList} from "@/api/shop.ts";
import {ElLoading} from "element-plus";
import {useRouter} from "vue-router";

const router = useRouter()
const data = ref([{
  ShopName: '',
  LeaderName: '',
  JobName: '',
  Addr: '',
  Phone: '',
  ShopId: '',
  ImgUrl: ''
}])
const query = ref({
  keyName: ''
})
onMounted(() => {
  getData()
})
const getData = () => {
  getShopInfoList(query.value.keyName).then((res: any) => {
    let loading = ElLoading.service()
    if (res.retCode === 0) {
      data.value = res.retData.info
      console.log(data.value)
      loading.close()
    }
  })
}
const search = () => {
  getData()
}
const appendInfo = () => {
  router.push({name: 'appendShop'})
}

onMounted(() => {

})

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