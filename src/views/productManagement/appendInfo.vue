<template>
  <div class="w-1/1 mt-3 mb-10">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{path:'/system/product'}">产品类型</el-breadcrumb-item>
      <el-breadcrumb-item>新增</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
  <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow">
    <el-form ref="ruleFormRef" :model="formData" :rules="form_rules" class="demo-form-inline"
             inline
             label-position=left
             label-width="6em"
             style="text-align: left">
      <h4>新增产品</h4>
      <br>
      <br>
      <el-form-item class="long leave" label="产品图片" prop="file">
        <el-upload
            ref="upload"
            :auto-upload="false"
            :limit="1"
            :on-change="fileChange"
            :on-exceed="handleExceed"
            class="avatar-uploader"
        >
          <el-icon class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
        <span class="text-slate-400 ml-3">尺寸316*316，小于100k</span>

      </el-form-item>
      <br>
      <el-form-item class="long" label="产品名称" prop="ProName">
        <el-input v-model="formData.ProName"></el-input>
      </el-form-item>
      <el-form-item class="long" label="登记证持有人" prop="ProRegOwner">
        <el-input v-model="formData.ProRegOwner"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item class="long" label="登记证号" prop="ProRegNo">
        <el-input v-model="formData.ProRegNo"></el-input>
      </el-form-item>
      <el-form-item class="long" label="主要成分" prop="MainContent">
        <el-input v-model="formData.MainContent"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item class="long" label="产品规格" prop="ProSpec">
        <el-input v-model="formData.ProSpec"></el-input>
      </el-form-item>
      <el-form-item class="long" label="净含量" prop="ProNetCon">
        <el-input v-model="formData.ProNetCon"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item class="long" label="增加时间" prop="saveDate">
        <el-input v-model="formData.saveDate"></el-input>
      </el-form-item>
      <el-form-item class="long" label="剂型" prop="ProJx">
        <el-input v-model="formData.ProJx"></el-input>
      </el-form-item>
      <br>
      <br>
      <el-form-item class="long" label="包装等级" prop="ProLevel">
        <el-select
            v-model.number="formData.ProLevel"
            auto
            clearable
            filterable
            @change="selectChange"
        >
          <el-option v-for="item in prolev"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value"
          >
          </el-option>

        </el-select>
      </el-form-item>
      <el-form-item class="long" label="包装比例" required>

        <el-form-item class="small" prop="LevOne">
          <el-input
              v-model="formData.LevOne"
              :disabled="true"
              placeholder="1">
          </el-input>
          <span>—</span>
        </el-form-item>


        <el-form-item class="small" prop="LevTwo">
          <el-input v-model.number="formData.LevTwo"></el-input>
          <span>—</span>
        </el-form-item>

        <el-form-item class="small" prop="LevThree">
          <el-input v-model.number="formData.LevThree"></el-input>
        </el-form-item>

      </el-form-item>
      <!--            <el-form-item label="包装比例" prop="Lev" class="long small">-->
      <!--                —-->
      <!--            </el-form-item>-->
      <br>
      <br>
      <el-form-item>
        <el-button type="info" @click="reset">取消</el-button>
        <el-button style="color: #fff;background-color: #00bd77" @click="addOrEditProduct(ruleFormRef)">新增
        </el-button>
      </el-form-item>
    </el-form>


  </div>
  <div id="tableData"></div>
</template>

<script lang="ts" setup>
import {ElMessage, FormInstance, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {ArrowRight, Plus} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {addProInfo} from "@/api/ProductInfo.ts";

const upload = ref<UploadInstance>()
const ruleFormRef = ref<FormInstance>()

const router = useRouter()
const formData = reactive({
  ProNetCon: '',
  ProJx: '',
  ProName: '',
  ProRegOwner: '',
  ProRegNo: '',
  MainContent: '',
  ProSpec: '',
  saveDate: '',
  ProLevel: '',
  LevOne: 1,
  LevTwo: '',
  LevThree: '',
  file: null
})
const form_rules = reactive({
  ProName: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  ProRegOwner: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  ProRegNo: [
    {required: true, message: '请输入数字', trigger: 'blur', pattern: /^-?\d+\.?\d*$/}
  ],
  Spec: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  MainContent: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  ProSpec: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  saveDate: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  ProNetCon: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  ProJx: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  ProLevel: [
    {required: true, message: '该字段不得为空', trigger: 'blur'}
  ],
  LevOne: [
    {required: true, message: '请输入数字', trigger: 'blur'}
  ],
  LevTwo: [
    {required: true, message: '请输入数字', trigger: 'blur'}
  ],
  LevThree: [
    {required: true, message: '请输入数字', trigger: 'blur'}
  ],
})
const addOrEditProduct = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  //@ts-ignore
  await formEl.validate((valid, fields) => {
    if (valid) {
      addProInfo({
        ProId: 0,
        ProName: formData.ProName,
        SaveDate: formData.saveDate,
        ProRegNo: formData.ProRegNo,
        ProSpec: formData.ProSpec,
        // LevOne: formData.LevOne,
        LevTwo: formData.LevTwo,
        LevThree: formData.LevThree,
        MainContent: formData.MainContent,
        ProLevel: formData.ProLevel,
        ProRegOwner: formData.ProRegOwner,
        ProNetCon: formData.ProNetCon,
        ProJX: formData.ProJx,
        //@ts-ignore
      }).then(res => {
        if (res.retCode === 0) {
          router.push({path: '/system/product/success/0'})
        }
        //@ts-ignore
      }).catch(err => {
        console.log(formData)
        ElMessage({
          type: 'error',
          message: err.retMsg
        })
      })
    }
  })
}
const reset = () => {
  router.back()
}
const selectChange = () => {

}

function fileChange(file: any) {

  formData.file = file['raw']
}


const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
// 包装等级
const prolev = [{
  value: '2',
  label: '2'
}, {
  value: '3',
  label: '3'
}]

</script>

<style scoped>
/*.long /deep/ div{*/
/*    width: 8em!important;*/
/*}*/
.long /deep/ .el-form-item__label {
  width: 8em !important;
}

.small {
  margin: 0px;
}

.small /deep/ .el-input {
  width: 63px;
}

.leave /deep/ .el-form-item__content {
  /*display: flex;*/
  align-items: flex-start;
}
</style>
<style>
.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
  font-weight: 400;
  color: #c1c8cc;
}

.el-breadcrumb__inner, .el-breadcrumb__item.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #2b9cfa;
  font-weight: bolder;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  background-color: #f6f6f6;
}

.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  background-color: #f6f6f6;
}
</style>