<template>
  <div class="w-1/1 mt-3 mb-10">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/system/account' }">账号设置</el-breadcrumb-item>
      <el-breadcrumb-item>编辑</el-breadcrumb-item>

    </el-breadcrumb>
  </div>
  <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow">
    <el-form
        ref="ruleFormRef"
        :before-upload="beforeAvatarUpload"
        :inline="true"
        :model="formData"
        :rules="form_rules" accept="image/jpeg,image/gif,image/png"
        class="demo-form-inline"
        label-position=left
        label-width="6em">
      <el-form-item label="账号头像" prop="file">
        <el-upload
            ref="upload"
            :auto-upload="false"
            :limit="1"
            :on-change="fileChange"
            :on-exceed="handleExceed"
            class="avatar-uploader"
            list-type="picture"
        >
          <el-icon class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>


      </el-form-item>
      <br>

      <el-form-item label="账号" prop="UserName">
        <el-input v-model="formData.UserName" clearable/>
      </el-form-item>
      <el-form-item label="密码" prop="UserPwd">
        <el-input v-model="formData.UserPwd" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="名称" prop="NickName">
        <el-input v-model="formData.NickName" clearable/>
      </el-form-item>
      <el-form-item label="联系方式" prop="Phone">
        <el-input v-model="formData.Phone" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="所属部门" prop="DepName">
        <el-input v-model="formData.DepName" clearable/>
      </el-form-item>
      <el-form-item label="添加时间" prop="CreateDate">
        <el-date-picker
            v-model="formData.CreateDate"
            clearable
            format="YYYY/MM/DD"
            placeholder="请选择添加时间"
            type="date"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <br>
      <br>
      <el-form-item label="权限设置" prop="MenuIds">
        <div class="px-2" style="border:2px #eeeff3 solid;width: 40em;height: 2.5em;
    border-radius: 4px;">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="产品管理" value="1"/>
            <el-checkbox label="申请溯源码" value="2"/>
            <el-checkbox label="上传管理" value="3"/>
            <el-checkbox label="仓库管理" value="4"/>
            <el-checkbox label="运营商管理" value="5"/>
          </el-checkbox-group>
        </div>

      </el-form-item>
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
import {ArrowRight, Plus} from '@element-plus/icons-vue'
import {ElMessage, FormInstance, genFileId, UploadInstance, UploadProps, UploadRawFile} from 'element-plus'
import {onMounted, reactive, ref} from 'vue'
import {addAndEditAccount,} from "@/api/accountSetting.ts";
import {useRouter} from "vue-router";
import {useAccountStore} from "@/store/account.ts";

const upload = ref<UploadInstance>()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const accountStore = useAccountStore()
var checkList = ref()
const formData = ref({
  UserName: '',
  UserPwd: '',
  NickName: '',
  Phone: '',
  DepName: '',
  CreateDate: '',
  MenuIds: '',
  UserId: 0,
  File: null
})

const form_rules = reactive({
  //表单验证规则
  UserName: [
    {required: true, message: '请输入账号', trigger: 'blur'}
  ],
  UserPwd: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ],
  Phone: [
    {
      required: true,
      message: '手机号格式错误',
      trigger: 'blur',
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    }
  ],
  NickName: [
    {required: true, message: '请输入名称', trigger: 'blur'}
  ],
  DepName: [
    {required: true, message: '请输入所属部门', trigger: 'blur'}
  ],
  CreateDate: [
    {required: true, message: '请输入创建日期', trigger: 'blur'}
  ],
  MenuIds: [
    {required: true, message: '请选择权限', trigger: 'blur'}
  ],

})

onMounted(() => {
  formData.value = accountStore.data
  checkList.value = accountStore.checkList

})

const reset = () => {

}
const submitUpload = async (formEl: FormInstance | undefined) => {
  formData.value.MenuIds = checkList.value.join(',')

  if (!formEl) return
  let file = new FormData();
  //@ts-ignore
  file.append('Filedata', formData.value.File)
  await formEl.validate((valid) => {
    if (valid) {
      addAndEditAccount(formData.value, file).then((res: any) => {
        if (res.retCode === 0) {
          router.push({path: '/system/account/success/' + 1})
        }
      }).catch((err: any) => {
        ElMessage({
          type: 'error',
          message: err.retMsg
        })
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