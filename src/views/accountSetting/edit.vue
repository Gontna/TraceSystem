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
        :inline="true"
        :model="formData"
        :rules="form_rules"
        class="demo-form-inline" label-position=left
        label-width="6em">
      <el-form-item label="账号头像" prop="file">
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


      </el-form-item>
      <br>

      <el-form-item label="账号" prop="userName">
        <el-input v-model="formData.userName" clearable/>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input v-model="formData.userPwd" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="名称" prop="nickName">
        <el-input v-model="formData.nickName" clearable/>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="formData.phone" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="所属部门" prop="depName">
        <el-input v-model="formData.depName" clearable/>
      </el-form-item>
      <el-form-item label="添加时间" prop="createDate">
        <el-input v-model="formData.createDate" clearable/>
      </el-form-item>
      <br>
      <br>
      <el-form-item label="权限设置" prop="menuIds">
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
import {addAndEditAccount, getMenuById, getUserInfoList} from "@/api/accountSetting.ts";
import {useRouter} from "vue-router";

const upload = ref<UploadInstance>()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const data = ref({
  UserName: '',
  UserPwd: '',
  NickName: '',
  Phone: '',
  DepName: '',
  CreateDate: '',
  MenuIds: '',
  UserId: 0,
  File: null,
  UserLevel: ''
})
var checkList = ref()
const formData = ref({
  userName: '',
  userPwd: '',
  nickName: '',
  phone: '',
  depName: '',
  createDate: '',
  menuIds: '',
  userId: 0,
  file: null
})

const form_rules = reactive({
  //表单验证规则
  userName: [
    {required: true, message: '请输入账号', trigger: 'blur'}
  ],
  userPwd: [
    {required: true, message: '请输入密码', trigger: 'blur'}
  ],
  phone: [
    {
      required: true,
      message: '手机号格式错误',
      trigger: 'blur',
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    }
  ],
  nickName: [
    {required: true, message: '请输入名称', trigger: 'blur'}
  ],
  depName: [
    {required: true, message: '请输入所属部门', trigger: 'blur'}
  ],
  createDate: [
    {required: true, message: '请输入创建日期', trigger: 'blur'}
  ],
  menuIds: [
    {required: true, message: '请选择权限', trigger: 'blur'}
  ],

})
const pageInfo = {
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalCount: 1,  //总数居
}
const query = {
  keyName: ''
}
onMounted(() => {
  getData()
})

const getData = () => {
  //api获取数据
  getUserInfoList(pageInfo, query.keyName).then((res: any) => {
    if (res.retCode === 0) {
      //@ts-ignore
      data.value = res.retData.info[router.currentRoute.value.params.index]
      formData.value.userName = data.value.UserName
      formData.value.userPwd = data.value.UserPwd
      formData.value.phone = data.value.Phone
      formData.value.nickName = data.value.NickName
      formData.value.depName = data.value.DepName
      formData.value.createDate = data.value.CreateDate
      formData.value.userId = data.value.UserId
      getMenuById(data.value.UserId, data.value.UserLevel).then((res: any) => {
        if (res.retCode === 0) {
          checkList.value = Array.from(res.retData.info, ({MenuId}) => MenuId.toString())

        }
      })

    }

  }).catch((err: any) => {

    ElMessage({
      type: 'error',
      message: err.retMsg
    })
  }).finally(() => {
  })

}
const reset = () => {

}
const submitUpload = async (formEl: FormInstance | undefined) => {
  formData.value.menuIds = checkList.value.join(',')

  if (!formEl) return
  let file = new FormData();
  //@ts-ignore
  file.append('Filedata', formData.value.file)
  await formEl.validate((valid) => {
    if (valid) {
      addAndEditAccount(formData.value, file).then((res: any) => {
        if (res.retCode === 0) {
          router.push({path: '/system/account/success'})
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
  formData.value.file = file['raw']


}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
</script>