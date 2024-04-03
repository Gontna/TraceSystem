<template>
  <div class="w-1/1 mt-3 mb-10">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ name: 'shopList' }">运营商管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>

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
      <h4>编辑</h4>
      <br>
      <br>
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

      <el-form-item label="运营商名称" prop="ShopName">
        <el-input v-model="formData.ShopName" clearable/>
      </el-form-item>
      <el-form-item label="运营商姓名" prop="LeaderName">
        <el-input v-model="formData.LeaderName" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="负责人" prop="JobName">
        <el-input v-model="formData.JobName" clearable/>
      </el-form-item>
      <el-form-item label="联系方式" prop="Phone">
        <el-input v-model="formData.Phone" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="添加时间" prop="AddDate">

        <el-date-picker
            v-model="formData.AddDate"
            clearable
            format="YYYY/MM/DD"
            placeholder="请选择添加时间"
            type="date"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <br>
      <br>
      <el-form-item label="运营商地址" prop="Addr">
        <el-input v-model="formData.Addr" clearable style="width: 41em
        ;"/>
      </el-form-item>
      <br>
      <br>
      <br>
      <el-form-item>
        <el-button type="info" @click="reset">取消</el-button>
        <el-button style="background-color: #00bd77;color: #fff" @click="submitUpload(ruleFormRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import {ArrowRight, Plus} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from 'vue'
import {useRouter} from "vue-router";
import {ElMessage, FormInstance, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {addAndEditShopInfo} from "@/api/shop.ts";
import {useShopStore} from "@/store/shop.ts";

const shopStore = useShopStore()
const ruleFormRef = ref<FormInstance>()
const upload = ref<UploadInstance>()
const router = useRouter()
const formData = ref({
  ShopName: '',
  LeaderName: '',
  CreateDate: '',
  ImgUrl: '',
  Phone: '',
  Addr: '',
  AddDate: '',
  JobName: '',
  ShopId: 0,
  File: null,


})
const form_rules = reactive({
  ShopName: [
    {required: true, message: '请输入运营商名称', trigger: 'blur'}
  ],
  LeaderName: [
    {required: true, message: '请输入负责人名称', trigger: 'blur'}
  ],
  Phone: [
    {
      required: true,
      message: '手机号格式错误',
      trigger: 'blur',
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    }
  ],
  Addr: [
    {required: true, message: '请输入地址', trigger: 'blur'}
  ],
  AddDate: [
    {required: true, message: '请输入时间', trigger: 'blur'}
  ],
  JobName: [
    {required: true, message: '请输入职务', trigger: 'blur'}
  ],


})
onMounted(() => {
  formData.value = shopStore.data
})
const reset = () => {
  router.push({name: 'shopList'})
}

const submitUpload = async (formEl: FormInstance | undefined) => {

  if (!formEl) return
  let file = new FormData();
  //@ts-ignore
  file.append('Filedata', formData.value.File)
  //@ts-ignore
  await formEl.validate((valid, fields) => {
    if (valid) {
      addAndEditShopInfo(formData.value, file).then((res: any) => {
        if (res.retCode === 0) {
          router.push({path: '/system/shop/success/1'})
        }
      }).catch((err: any) => {
        ElMessage.error(err.retMst)
      })
    }
  })
}


function fileChange(file: any) {

  formData.value.File = file['raw']


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

<style>


.el-checkbox__label {
  color: #c9c9cd;
}

.el-checkbox__inner {
  border-radius: 50%;
}

.el-checkbox__inner::after {
  transform: translate(-50%, -50%) scale(1) !important;
  width: 4px;
  height: 4px;
  border-radius: 50% !important;
  background-color: var(--el-color-white);
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transition: transform 0.15s ease-in;
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

.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: var(--el-color-primary);
}
</style>
<style scoped>

</style>