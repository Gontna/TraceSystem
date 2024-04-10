<template>
  <div class="w-1/1 h-1/4 rounded-md shallow bg-white p-4 mb-5 flex
  items-center ">
    <el-form ref="ruleFormRef"
             :inline="true"
             :model="formData"
             :rules="form_rules"
             class="demo-form-inline"
             label-position=left label-width="7em"
             style="min-width: 660px"
    >
      <el-form-item class="small2" label="产品名称:" prop="proId">
        <el-select
            v-model="formData.proId"
            filterable
            placeholder=""
            style="width: 16em"
            validate-event

        >
          <el-option
              v-for="item in data_proId_proName"
              :key="item.ProId"
              :label="item.ProName"
              :value="item.ProId"
              @click="formData.levOneCount=item.LevOne;formData.levTwoCount=item.LevTwo;formData.levThreeCount=item.LevThree"
          />


        </el-select>
      </el-form-item>
      <el-form-item label="申请人:" prop="applyName">
        <el-input v-model="formData.applyName"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item class="small2" label="一级包装码" prop="levOneCount">
        <el-input v-model.number="formData.levOneCount"></el-input>
      </el-form-item>
      <el-form-item label="二级包装码" prop="levTwoCount">
        <el-input v-model.number="formData.levTwoCount"></el-input>
      </el-form-item>
      <el-form-item label="三级包装码" prop="levThreeCount">
        <el-input v-model.number="formData.levThreeCount"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button style="width: 14.3em" type="info" @click="add_apply(ruleFormRef)">申请</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="w-1/1 h-5/7 rounded-md shallow bg-white px-4 flex-row justify-between items-center"
       style="min-height:0;">
    <div class="w-1/1 h-1/7 pt-4 px-4  flex items-center" style="min-height:40px ">
      <el-form-item class="content conter" label="筛选:">
        <button
            v-for="(item,index) in ButtonText" :key="index"
            :class="activate==index?'active':''"
            style="margin: 0 0.5em; width: 5em; height: 2em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.7em"
            @click="queryChange(index)">
          {{ item }}
        </button>
      </el-form-item>

      <el-form-item class="content conter" label="文件状态:">
        <button
            v-for="(item,index) in filetd" :key="index"
            :class="activate1==index?'active':''"
            style="margin: 0 0.5em; width: 5em; height: 2em;background-color: #b1b2b7;border-radius: 3px; color: #fff;font-weight: lighter;line-height: 1.7em"
            @click="queryChange1(index)">
          {{ item }}
        </button>
      </el-form-item>

      <el-form-item class="mx-5" label="申请人:">
        <el-input v-model="query.applyName" @blur="blur" @keydown.enter="queryChange2()"></el-input>
      </el-form-item>
      <el-form-item class="mx-5">
        <el-date-picker
            v-model="query.applyDate"
            clearable
            format="YYYY/MM/DD"
            placeholder=""
            style="width: 9em;"
            type="date"
            value-format="YYYY-MM-DD"
            @change="change"

        ></el-date-picker>
      </el-form-item>
    </div>
    <div class="px-3 w-1/1 flex-1" style="min-height:0;">
      <el-table id="tableData" ref="table"
                :data="data"
                :header-cell-style="rowClass"
                :height="height"
                class="rounded-lg "
                fit
                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="TraceId" width="60">
          <template #default="scope">
            {{ scope.row.TraceId ?? '-' }}
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

        <el-table-column align="center" label="登记证持有人" prop="ProRegOwner">
          <template #default="scope">
            {{ scope.row.ProRegOwner }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="包装等级" prop="ProLevel">
          <template #default="scope">
            {{ scope.row.ProLevel }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请时间" prop="ApplyDate">
          <template #default="scope">
            {{ timeChange(scope.row.ApplyDate) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="申请人" prop="ApplyName">
          <template #default="scope">
            {{ scope.row.ApplyName }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="文件状态" prop="IsDown">
          <template #default="scope">
                        <span :class="{green: scope.row.IsDown=='1',blue:scope.row.IsDown=='2'}">{{
                            scope.row.IsDown == '1' ? '未下载' : '已下载'
                          }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" prop="TraceId">
          <template #default="scope">
            <el-button size="small" style="background-color: #00ba73" type="primary" @click="down(scope.row.TraceId)">
              下载
            </el-button>
            <el-button size="small" style="margin-left: 5px" type="danger"
                       @click="deleteTarget(scope.row.TraceId)">删除
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="w-1/1 px-4 flex flex-row justify-between items-center" style="min-height:0;">
      <div>
        <el-button link type="primary" @click="mult_del_handler()">批量删除</el-button>
      </div>
      <div class="flex-1"></div>
      <div>
        <el-pagination
            :current-page="query.currentPage"
            :page-count="pageInfo.totalPage"
            :page-size="query.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background class="mt-2" layout=" prev, pager, next, jumper, sizes" small
            @size-change="pageSizeChange"
            @current-change="currPageChange"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, reactive, ref, toRaw} from "vue";
import {ElMessage, ElMessageBox, FormInstance} from "element-plus";
import {Add_Ayyly, Delete, download, get_source_codeList, getSelectProName} from '@/api/tracingsourcecode.ts'
import {hint} from "@/components/hint.ts";


const ruleFormRef = ref<FormInstance>()
const ButtonText = [
  '近一周',
  '近一月',
  '近三月']
const filetd = ['未下载', '已下载']
const activate = ref(-1)
const activate1 = ref(-1)
const data = ref([])
let data_proId_proName = ref([
  {
    ProName: '',
    ProId: '',
    LevOne: '',
    LevTwo: '',
    LevThree: '',

  }
])
const table = ref();

const form_rules = reactive({
  proId: [
    {required: true, message: '请选择产品名称', trigger: 'change'}
  ],
  applyName: [
    {required: true, message: '请输入申请人', trigger: 'blur'}
  ],
  levOneCount: [
    {required: true, message: '请输入包装码', trigger: 'blur'}
  ],
  levTwoCount: [
    {required: true, message: '请输入包装码', trigger: 'blur'}
  ],
  levThreeCount: [
    {required: true, message: '请输入包装码', trigger: 'blur'}
  ],

})
const get_proname = async () => {
  //获取下拉菜单产品名称
  getSelectProName().then((res: any) => {
    if (res.retCode === 0) {
      data_proId_proName.value = res.retData.info
    }
  })

}
const down = (down: number | string) => {
  download(down).then((res: any) => {
    // download1(res.retData.filePath);
    const iframe = document.createElement("iframe");
    iframe.src = res.retData.filePath;
    iframe.style.display = "none"; // 防止影响页面
    iframe.style.height = String(0); // 防止影响页面
    document.body.appendChild(iframe); // 必写，iframe挂在到dom树上才会发请求
    const timer = setInterval(() => {
      //@ts-ignore
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      if (iframeDoc.readyState == 'complete' || iframeDoc.readyState == 'interactive') {
        //@ts-ignore
        document.body.removeAttribute(iframe);

        hint('下载成功')
        getData(query)
        clearInterval(timer)

      }
    }, 1000);
  });
}


let timeType = '1'
const query = reactive({
  // timeType: '1',
  applyDate: '',
  isDown: '',
  applyName: '',
  currentPage: 1,
  pageSize: 10,
})
const formData = ref({
  file: null,
  proId: '',
  applyName: '',
  levThreeCount: '',
  levOneCount: '',
  levTwoCount: '',
  timeType: '1',
  applyDate: '',
  isDown: '',
  currentPage: '1',
  PageSize: '10',
})
let pageInfo = reactive({
  totalPage: 1,  //总数居
})
onMounted(() => {
  getData(query);
  get_proname()
})
const getData = (query: object) => {
  // query, pageInfo


  get_source_codeList(timeType, query).then((res: any) => {
    // console.log(res)

    if (res.retCode === 0) {
      console.log(res)
      data.value = res.retData.info
      pageInfo.totalPage = res.retData.totalPage
    }
  }).catch((err: any) => {
    data.value = []
    pageInfo.totalPage = 1
    ElMessage.info(err.retMsg)
  })
}
const add_apply = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      Add_Ayyly(formData.value.proId, formData.value.applyName, formData.value.levThreeCount, formData.value.levOneCount, formData.value.levTwoCount).then((res: any) => {
        console.log(res)
        if (res.retCode == 0) {
          hint('申请成功')
          getData(query)

        }
      }).catch((err: any) => {
        ElMessage.error(err.retMsg)
      })
    }
  })

}


const queryChange = (index: number) => {

  if (activate.value == index) {
    activate.value = -1
    timeType = ''
  } else {
    activate.value = index
    timeType = (index + 1).toString()
  }

  getData(query)
}
const queryChange1 = (index: number) => {

  if (activate1.value == index) {
    activate1.value = -1
    query.isDown = ''
  } else {
    activate1.value = index
    query.isDown = (index + 1).toString()
  }

  getData(query)
}
const queryChange2 = () => {
  getData(query)
}
const change = () => {
  getData(query)
}
const blur = () => {
  getData(query)
}
const deleteTarget = (traceid: number | string) => {
  ElMessageBox.confirm(
      '是否删除该产品',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
      }).then(() => {

    Delete(traceid).then((_: any) => {
      getData(query)
    }).catch((err: any) => {
      ElMessage.info(err.retMsg)
    });

  })

}


let del_target_cache = ref([])
const multi_del = (value: any) => {
  // console.log(value)
  del_target_cache.value = value
}
const mult_del_handler = () => {
  let promises = [];
  for (let i of del_target_cache.value) {
    //@ts-ignore
    promises.push(Delete(toRaw(i).TraceId));
  }
  Promise.all(promises).then(() => {
    getData(query)
  })
}
const pageSizeChange = (pageSize: number) => {
  query.pageSize = pageSize
  getData(query)
  //翻页器大小改变事件

}
const currPageChange = (index: number) => {
  query.currentPage = index
  getData(query)
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

<style scoped>
.active {
  background: #279cff !important;
  color: white !important;
}

.small2 {
  width: 283px;
}

.conter {
  align-items: center;
}

.green {
  color: #00ba73;
}

.blue {
  color: #409eff;
}

.shade {
  width: 50px !important;
}


.big-icon {
  width: 50px;
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
}

.shade-123 {
  height: 200px;
}


.shade-123 i {
  width: 60px !important;
  height: 60px !important;
  /*height: 50px !important;*/
}

.shade-123 .el-icon svg {
  width: 60px !important;
  height: 60px !important;
}

.shade-123 .el-message-box__headerbtn {
  width: 60px !important;
  height: 60px !important;
}

.btn123 {
  text-align: center;
  width: 80px;
  height: 40px;
  background-color: var(--el-color-primary);
}
</style>