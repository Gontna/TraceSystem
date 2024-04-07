<template>
    <div class="w-1/1 h-1/4 rounded-md shallow bg-white p-4 mb-5 flex
  items-center ">
        <el-upload
                ref="upload"
                :auto-upload="false"
                :limit="5"
                :on-change="fileChange"
                :on-exceed="handleExceed"
                class="this flex  "
                drag
                multiple
        >
            <el-icon class="el-icon--upload">
                <upload-filled/>
            </el-icon>
            <div class="el-upload__text">
                将文件拖到此区域,或<em>点击上传</em>
                <p style="font-size:  13px;color: #8c939d">最多上传5个附件,每个附件大小不超过3M</p>
            </div>
        </el-upload>
        <el-form ref="ruleFormRef"
                 :inline="true"
                 :model="formData"
                 class="demo-form-inline"
                 label-position=left label-width="6em"
                 style="min-width: 660px"
        >
            <el-form-item label="产品名称:" prop="ProName">
                <el-select
                        v-model="value"
                        placeholder=""
                        style="width: 16em"
                >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    />


                </el-select>
            </el-form-item>
            <el-form-item label="批号:" prop="batchCode">
                <el-input v-model="formData.BatchCode"></el-input>
            </el-form-item>
            <br>
            <br>
            <el-form-item label="生产日期" prop="createDate">
                <el-date-picker
                        v-model="formData.CreateDate"
                        clearable
                        format="YYYY/MM/DD"
                        placeholder=""
                        type="date"
                        value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
            <el-form-item label=" ">
                <el-button style="width: 14.3em" type="info">上传</el-button>
            </el-form-item>
        </el-form>
    <el-upload
        ref="upload"
        :auto-upload="false"
        :limit="5"
        :on-change="fileChange"
        :on-exceed="handleExceed"
        class="this flex  "
        drag
        multiple
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此区域,或<em>点击上传</em>
        <p style="font-size:  13px;color: #8c939d">最多上传5个附件,每个附件大小不超过3M</p>
      </div>
    </el-upload>
    <el-form ref="ruleFormRef"
             :inline="true"
             :model="formData"
             class="demo-form-inline"
             label-position=left label-width="6em"
             style="min-width: 660px"
    >
      <el-form-item label="产品名称:" prop="ProName">
        <el-select
            v-model="formData.ProId"
            filterable
            placeholder=""
            style="width: 16em"
        >
          <el-option
              v-for="item in options"
              :key="item.ProId"
              :label="item.ProName"
              :value="item.ProId"
          >
          </el-option>


        </el-select>
      </el-form-item>
      <el-form-item label="批号:" prop="batchCode">
        <el-input v-model="formData.BatchCode"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="生产日期" prop="createDate">
        <el-date-picker
            v-model="formData.ProduceDate"
            clearable
            format="YYYY/MM/DD"
            placeholder=""
            type="date"
            value-format="YYYY-MM-DD"></el-date-picker>
      </el-form-item>
      <el-form-item label=" ">
        <el-button style="width: 14.3em" type="info">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="w-1/1 h-5/7 rounded-md shallow bg-white px-4 flex-row justify-between items-center" style="min-height:0;">
    <div class="w-1/1 h-1/7 pt-4 px-4  flex items-center" style="min-height:40px ">
      <el-form-item class="content " label="">
        <span class="text-16px">筛选:</span>
        <button
            v-for="(item,index) in ButtonText" :key="index"
            :class="activate==index?'active':''"
            style="margin: 0 0.5em; width: 5em; height: 2em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.7em"
            @click="queryChange(index)">
          {{ item }}
        </button>
      </el-form-item>


      <el-form-item class="mx-5" label="批次编号:">
        <el-input v-model="query.batchCode" @change="search"/>
      </el-form-item>
      <el-form-item class="mx-5">
        <el-date-picker
            v-model="query.produceDate"
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
    <div class="w-1/1 h-5/7 rounded-md shallow bg-white px-4 flex-row justify-between items-center"
         style="min-height:0;">
        <div class="w-1/1 h-1/7 pt-4 px-4  flex items-center" style="min-height:40px ">
            <el-form-item class="content" label="筛选:">
                <button
                        v-for="(item,index) in ButtonText" :key="index"
                        :class="activate==index?'active':''"
                        style="margin: 0 0.5em; width: 5em; height: 2em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.7em"
                        @click="queryChange(index)">
                    {{ item }}
                </button>
            </el-form-item>
                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="BatchId" width="60"/>
        <el-table-column align="center" label="上传日期" prop="ProduceDate">
          <template #default="scope">
            {{ timeChange(scope.row.ProduceDate) ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="产品名称" property="ProName">
          <template #default="scope">
            {{ scope.row.ProName ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="登记证号" property="ProRegNo">
          <template #default="scope">
            {{ scope.row.ProRegNo ?? '-' }}
          </template>
        </el-table-column>

            <el-form-item class="mx-5" label="批次编号:">
                <el-input v-model="query.BatchCode"/>
            </el-form-item>
            <el-form-item class="mx-5">
                <el-date-picker
                        v-model="query.createDate"
                        clearable
                        format="YYYY/MM/DD"
                        placeholder=""
                        style="width: 9em;"
                        type="date"
                        value-format="YYYY-MM-DD"
                ></el-date-picker>
            </el-form-item>
        </div>
        <div class="px-3 w-1/1 flex-1" style="min-height:0;">
            <el-table id="tableData" :data="data"
                      :header-cell-style="rowClass"
                      :height="height"
                      class="rounded-lg "
                      fit

                      @selection-change="multi_del">
                <el-table-column align="center" type="selection"/>
                <el-table-column align="center" label="序号" prop="BatchId" width="60"/>
                <el-table-column align="center" label="上传日期" prop="CreateDate">
                    <template #default="scope">
                        {{ timeChange(scope.row.CreateDate) ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品名称" property="ProName">
                    <template #default="scope">
                        {{ scope.row.ProName ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="登记证号" property="ProRegNo">
                    <template #default="scope">
                        {{ scope.row.ProRegNo ?? '-' }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="批次编号" prop="BatchCode">
                    <template #default="scope">
                        {{ scope.row.BatchCode }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="包装等级" prop="ProLevel">
                    <template #default="scope">
                        {{ scope.row.ProLevel }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="箱数" prop="BoxCodeCount">
                    <template #default="scope">
                        {{ scope.row.BoxCodeCount }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="盒数" prop="HeMaCodeCount">
                    <template #default="scope">
                        {{ scope.row.HeMaCodeCount }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="产品数" prop="CodeCount">
                    <template #default="scope">
                        {{ scope.row.CodeCount }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="包装比例" prop="Prolev">
                    <template #default="scope">
                        {{ scope.row.LevOne }}:{{ scope.row.LevTwo }}:{{ scope.row.LevThree }}
                    </template>
                </el-table-column>

                <el-table-column align="center" label="上传装填" prop="active">
                    <span style="color: #00bd77">已入库</span>
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
import {nextTick, onMounted, reactive, ref} from "vue";

import {UploadFilled} from '@element-plus/icons-vue'
import {ElMessage, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {getProBatchInfo} from "@/api/upload.ts";
import {getInfo} from "@/api/ProductInfo.ts";

const upload = ref<UploadInstance>()
const ButtonText = ['近一周', '近一月', '近三月']
const activate = ref(-1)
const data = ref([])
const options = [
    {
        value: '1',
        label: '选项1'
    },
    {
        value: '2',
        label: '选项2'
    },
const options = ref([
  {
    ProId: '1',
    ProName: '选项1'
  },


])
//查询参数
const query = reactive({
    timeType: '',
    BatchCode: '',
    createDate: ''
  timeType: '',
  batchCode: '',
  produceDate: ''
})
//上传的表单信息
const formData = ref({
    file: null,
    BatchCode: '',
    CreateDate: '',
  file: null,
  ProId: '',
  BatchCode: '',
  ProduceDate: '',
})
//翻页器信息
let pageInfo = reactive({
    currentPage: 1, //当前页码
    pageSize: 10, //每页显示条目数
    totalPage: 1,  //总数居
})
onMounted(() => {
    getData()
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalPage: 1,  //总页数
})
onMounted(() => {
  //获取表单中下拉选项数据
  getInfo().then((res: any) => {
    if (res.retCode === 0) {
      options.value = res.retData.info
    }
  }).catch((err: any) => {
    ElMessage.error(err.retMsg)
  })
  //获取table数据
  getData()
})
const getData = () => {
    getProBatchInfo(query, pageInfo).then((res: any) => {
        if (res.retCode === 0) {
            data.value = res.retData.info
        }
    }).catch((err: any) => {
        ElMessage.info(err.retMsg)
    })
    }
  }).catch((err: any) => {
    data.value = []
    ElMessage.info(err.retMsg)
  })
}
//查询函数
const search = () => {
  //清空日期时把null变成 ''
  if (!query.produceDate) {
    query.produceDate = ''
  }
  getData()
}

//上传文件相关
function fileChange(file: any) {
    console.log(file)
    formData.value.file = file['raw']


}

//按钮样式控制与查询
const queryChange = (index: number) => {

    if (activate.value == index) {
        activate.value = -1
    } else {
        activate.value = index
    }
    query.timeType = (index + 1).toString()
    // getData()
  if (activate.value == index) {
    activate.value = -1
    query.timeType = ''
    getData()
  } else {
    activate.value = index
    query.timeType = (index + 1).toString()
    getData()
  }

}
//控制文件上传数量
const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
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
const height = ref('380px')
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
.active {
    background: #279cff !important;
    color: white !important;
}

</style>
<style>
.el-icon-upload {
    font-size: 30px;
    margin: 0 2px;
}

.el-upload .el-upload-dragger {
    width: 35vh;
    height: 18vh;
    padding: 0 40px;
}

.this el-upload-list, .this .el-upload-list--text {
    width: 15vh;
}

.content .el-form-item__content {
    min-height: 40px;
    min-width: 252px;
  min-height: 40px;
  min-width: 252px;
}
</style>