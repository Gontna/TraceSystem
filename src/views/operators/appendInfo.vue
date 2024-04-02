<template>
  <div class="w-1/1 mt-3 mb-10">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ name: 'shopList' }">运营商管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增运营商</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
  <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow">
    <el-form
        ref="ruleFormRef"
        :inline="true"
        :model="formData"
        :rules="form_rules"
        class="demo-form-inline" label-position=left
        label-width="7em">
      <el-form-item label="账号头像" prop="file">
        <el-upload
            ref="upload"
            :auto-upload="false"
            :before-upload="beforeAvatarUpload"
            :limit="1"
            :on-change="fileChange"
            :on-exceed="handleExceed"
            accept="image/jpeg,image/gif,image/png"
            class="avatar-uploader"
            list-type="picture"
        >
          <el-icon class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>


      </el-form-item>
      <br>

      <el-form-item label="运营商名称" prop="shopName">
        <el-input v-model="formData.shopName" clearable/>
      </el-form-item>
      <el-form-item label="运营商姓名" prop="leaderName">
        <el-input v-model="formData.leaderName" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="负责人" prop="jobName">
        <el-input v-model="formData.jobName" clearable/>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="formData.phone" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="添加时间" prop="addDate">

        <el-date-picker
            v-model="formData.addDate"
            clearable
            format="YYYY/MM/DD"
            placeholder="请选择添加时间"
            type="date"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <br>
      <br>
      <el-form-item label="运营商地址" prop="addr">
        <el-input v-model="formData.addr" clearable style="width: 41em
        ;"/>
      </el-form-item>
      <br>
      <br>
      <br>
      <el-form-item>
        <el-button type="info" @click="reset">取消</el-button>
        <el-button style="background-color: #00bd77;color: #fff" @click="submitUpload(ruleFormRef)">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import {ArrowRight, Plus} from "@element-plus/icons-vue";
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {ElMessage, FormInstance, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {addAndEditShopInfo} from "@/api/shop.ts";

const ruleFormRef = ref<FormInstance>()
const upload = ref<UploadInstance>()
const router = useRouter()
const formData = ref({
  shopName: '',
  leaderName: '',
  sex: '',
  phone: '',
  addr: '',
  addDate: '',
  jobName: '',
  shopId: 0,
  file: null,


})
const form_rules = reactive({
  shopName: [
    {required: true, message: '请输入运营商名称', trigger: 'blur'}
  ],
  leaderName: [
    {required: true, message: '请输入负责人名称', trigger: 'blur'}
  ],
  phone: [
    {
      required: true,
      message: '手机号格式错误',
      trigger: 'blur',
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    }
  ],
  addr: [
    {required: true, message: '请输入地址', trigger: 'blur'}
  ],
  addDate: [
    {required: true, message: '请输入时间', trigger: 'blur'}
  ],
  jobName: [
    {required: true, message: '请输入职务', trigger: 'blur'}
  ],


})
const reset = () => {
  router.push({name: 'shopList'})
}

const submitUpload = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  let file = new FormData();
  //@ts-ignore
  file.append('Filedata', formData.value.file)
  //@ts-ignore
  await formEl.validate((valid, fields) => {
    if (valid) {
      addAndEditShopInfo(formData.value, file).then((res: any) => {
        if (res.retCode === 0) {
          ElMessage.success('添加成功')
        }
      }).catch((err: any) => {
        ElMessage.error(err.retMst)
      })
    }
  })
}


function fileChange(file: any) {

  formData.value.file = file['raw']


}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' || 'image/png' || 'image/png') {
    ElMessage.error('图片格式必须是JPG或PNG')
    return false
  } else if (rawFile.size / 1024 / 1024 / 1024 > 100) {
    ElMessage.error('图片尺寸小于100KB')
    return false
  }
  return true
}

</script>


<style scoped>

</style>