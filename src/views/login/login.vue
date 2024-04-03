<template>
  <div class="bg-line flex flex-col h-1/1 w-1/1 px-5">
    <div class="flex-1 flex flex-row justify-around items-center">
      <div class="flex-1 h-1/1 flex flex-row justify-end items-center">
        <img alt="" class="w-3/7" src="@/assets/img/computer.png"/>
      </div>

      <div class=" flex-1 flex flex-col justify-start items-center mr-5em">
        <div class="w-6/12  rounded-4xl  flex flex-col justify-center items-center py-2em"
             style="background-color: #fff">
          <div class="w-3/4">
            <div class="w-1/1 mt-1em  font-bold text-4xl   text-center">溯源系统</div>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules"
                     class="w-1/1 h-1/1 flex flex-col justify-center items-center "
                     label-position="top"
            >
              <div class="w-1/1 my-1em px-4 ">
                <div class="my-1em ">
                  <el-form-item class="item" label="账户" prop="account" style="color:#dcdfe6">
                    <el-input v-model="ruleForm.account" autocomplete="off" class="inputs" clearable
                              size="large" type="text"/>
                  </el-form-item>
                </div>
                <div>
                  <el-form-item class="item" label="密码" prop="pass">
                    <el-input v-model="ruleForm.pass" autocomplete="off" class="inputs" show-password
                              size="large"
                              type="password"
                              @keydown.enter="submitForm(ruleFormRef)"
                    />
                  </el-form-item>
                </div>
                <div class="w-1/1">
                  <el-form-item>
                    <el-form-item>
                      <el-checkbox v-model="checked"/>
                    </el-form-item>
                  </el-form-item>
                </div>
                <div class="mb-3em">
                  <el-form-item>
                    <el-button class="w-1/1 " size="large" type="primary"
                               @click="submitForm(ruleFormRef)">
                      登 录
                    </el-button>
                  </el-form-item>
                </div>
              </div>
            </el-form>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import router from '@/router'
import {ElLoading, ElMessage, FormInstance, FormRules} from 'element-plus'


import {Base64, decode} from 'js-base64'
import Cookies from 'js-cookie'
import {login} from '@/api/login';
import {useUsersStore} from "@/store/user.ts";

const userStore = useUsersStore()

const ruleFormRef = ref<FormInstance>()
const checked = ref() //是否记住密码
//////////////////////////////////////
//表单验证相关
//@ts-ignore
const checkAccount = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  } else {
    callback()
  }
}
//@ts-ignore
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
//////////////////////////////////////

const ruleForm = reactive({
  account: '',
  pass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{validator: validatePass, trigger: 'blur'}],
  account: [{validator: checkAccount, trigger: 'blur'}],
})

////////////////////////////////////
//如果勾选记住密码,则加密账号密码并到cookie

const queryLocalForm = () => {
  const localForm = Cookies.get('LOCAL_KEY')
  if (localForm) {
    checked.value = true
    try {
      const acc = JSON.parse(localForm).account
      const pass = JSON.parse(localForm).pass
      ruleForm.account = decode(acc)
      ruleForm.pass = decode(pass)
    } catch (error) {
      console.error('本地数据解析失败', error)
    }
  } else {
    checked.value = false
  }
}
onMounted(() => {
  queryLocalForm()
})
////////////////////////////////////

const submitForm = (formEl: FormInstance | undefined) => {

  if (!formEl) return;


  formEl.validate((valid) => {
    if (valid) {
      let loading = ElLoading.service()
      login(
          ruleForm.account,
          ruleForm.pass
      ).then((res: any) => {
        if (res.retCode === 0) {
          userStore.userInfo = res.retData.userInfo
          userStore.userInfo.UserPwd = ''

          ElMessage({
            type: 'success',
            message: '登录成功'
          })
          ///////////////////////////////
          //保存密码
          const params = {
            account: Base64.encode(ruleForm.account),
            pass: Base64.encode(ruleForm.pass)
          }
          if (checked.value) {

            const {account, pass} = params
            const localForm = {
              account,
              pass
            }
            Cookies.set('LOCAL_KEY', JSON.stringify(localForm))
          } else {
            Cookies.remove('LOCAL_KEY')
            Cookies.remove('START_TIME')
          }
          const data = '' + new Date().getTime()
          localStorage.setItem('START_TIME', data)

          setTimeout(() => {
            router.push({name: 'home'})
          }, 300)
        } else {
          ElMessage({
            type: 'error',
            message: '用户名或密码错误'
          })
        }

      }).catch(() => {
        ElMessage({
          type: 'error',
          message: '用户名或密码错误'
        })

      }).finally(() => {
        loading.close()
      })
    } else {
      ElMessage({
        type: 'error',
        message: '用户名或密码错误'
      })
      return false
    }
  })
}

</script>

<style>
.bg-line {
  background: rgb(131, 203, 255);
  background: linear-gradient(180deg, rgba(131, 203, 255, 1) 0%, rgba(231, 245, 255, 1) 97%);
}


</style>