<template>
  <div class="w-1/1 h-1/1 rounded-md shallow bg-white p-4 flex flex-col justify-center items-center ">
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
    <div class="px-3 w-1/1 flex-1" style="min-height:0;">
      <el-table id="tableData" :data="data" :header-cell-style="rowClass"
                class="rounded-lg"
                fit
                @selection-change="multi_del">
        <el-table-column align="center" type="selection"/>
        <el-table-column align="center" label="序号" prop="UserId" width="60"/>
        <el-table-column align="center" label="用户账号" prop="UserName">
          <template #default="scope">
            {{ scope.row.UserName ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户密码" property="UserPwd">
          <template #default="scope">
            {{ scope.row.UserPwd ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="用户名称" property="NickName">
          <template #default="scope">
            {{ scope.row.NickName ?? '1' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="联系方式" property="Phone">
          <template #default="scope">
            {{ scope.row.Phone ?? '-' }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="权限" property="Spec">
          <template #default="scope">
            <el-button link size="small" type="primary" @click="detail(scope.row.UserId,scope.row.UserLevel)">查看
            </el-button>

          </template>
        </el-table-column>
        <el-table-column align="center" label="所属部门" prop="DepName">
          <template #default="scope">
            {{ scope.row.DepName }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加时间" prop="CreateDate">
          <template #default="scope">
            {{ scope.row.CreateDate }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作 ">
          <template #default="scope">
            <el-button size="small" type="primary" @click="editTarget(scope.$index)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteTarget(scope.row.UserId,scope.row.UserLevel)">删除
            </el-button>
          </template>
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
            :page-count="pageInfo.totalCount"
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
import {h, onMounted, reactive, ref} from "vue";
import {delUserInfo, getMenuById, getUserInfoList,} from "@/api/accountSetting.ts";
import {ElCheckbox, ElCheckboxGroup, ElLoading, ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {hint} from "@/components/hint.ts";

const router = useRouter() //路由实例,用于路由跳转


//列表中用户数据
const data = ref([])
//查询参数
const query = ref({
  keyName: ''
})
//翻页器默认参数
let pageInfo = reactive({
  currentPage: 1, //当前页码
  pageSize: 10, //每页显示条目数
  totalCount: 1,  //总数居
})

const getUserInfo = () => {
  //获取用户信息列表
  let loading = ElLoading.service()
  getUserInfoList(pageInfo, query.value.keyName).then((res: any) => {
    if (res.retCode === 0) {
      //渲染列表并更新翻页器信息
      data.value = res.retData.info
      console.log(data.value)
      pageInfo.totalCount = res.retData.totalPage
      loading.close()
    }
  }).catch((err: any) => {
    data.value = []
    ElMessage({
      type: 'error',
      message: err.retMsg

    })
    loading.close()
  })
}
const search = () => {
  getUserInfo()
}
const appendInfo = () => {
  router.push({name: 'createAccount'})
}
const checkList = ref([])
const detail = (UserId: number, UserLevel: string) => {
  //查看用户权限

  getMenuById(UserId, UserLevel).then((res: any) => {
    if (res.retCode === 0) {
      checkList.value = Array.from(res.retData.info, ({MenuId}) => MenuId.toString())

    }
  })
  ElMessageBox({

    message: () =>
        h(ElCheckboxGroup, {
          modelValue: checkList.value,
          //@ts-ignore
          "onUpdate:modelValue": (val) => (checkList.value = val),
        }, () => [
          h(ElCheckbox, {value: '1', disabled: true}, () => '产品管理'),
          h(ElCheckbox, {value: '2', disabled: true}, () => '申请溯源码'),
          h(ElCheckbox, {value: '3', disabled: true}, () => '上传管理'),
          h(ElCheckbox, {value: '4', disabled: true}, () => '仓库管理'),
          h(ElCheckbox, {value: '5', disabled: true}, () => '运营商管理'),
        ]),
    showConfirmButton: false,
    center: true,
  })

}

const delInfo = async (userId: number, userLevel: string) => {
  hint()
  await delUserInfo(userId, userLevel).then((res: any) => {
    if (res.retCode === 0) {
      hint()
      getUserInfo()
    }
  }).catch((err: any) => {
    ElMessage({
      type: 'error',
      message: err.retMsg
    })
  })
}
const deleteTarget = async (userId: number, userLevel: string) => {
  //删除用户信息
  ElMessageBox.confirm(
      '是否删除该产品',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
      }
  ).then(() => {
    delInfo(userId, userLevel)

  })

}

const editTarget = (index: number) => {
  router.push({path: '/system/account/edit/' + index})
  //编辑
}
let del_target_cache = ref([])
const multi_del = (value: any) => {
  del_target_cache.value = value

}

const mult_del_handler = () => {
  let del_target = Object.entries(del_target_cache.value).map(([_, item]) => {
    // @ts-ignore
    return {userId: item.UserId, userLevel: item.UserLevel}
  })

  if (del_target.length === 0) {
    ElMessage.error('请先选择要删除的条目!')
    return;
  }
  if (del_target.length === 1) {
    deleteTarget(del_target[0].userId, del_target[0].userLevel)
  } else {
    ElMessageBox.confirm(
        '是否删除设备',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          center: true,
        }
    ).then(() => {
      let loading = ElLoading.service()
      let req_list = []
      for (let item of del_target) {
        req_list.push(delUserInfo(item.userId, item.userLevel))
      }

      Promise.all(req_list).then(res_list => {
        let err_list = []
        for (let index in res_list) {
          if (res_list[index].retCode === -1) {
            err_list.push(del_target[index])
          }
        }
        loading.close()
        if (err_list.length) {
          ElMessage({
            type: 'error',
            message: '删除设备失败: ',
            duration: 5000
          })
        } else {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          getUserInfo()
        }
        getUserInfo()

      }).catch((err: any) => {
        loading.close()
        ElMessage({
          type: 'error',
          message: err.retMsg
        })
      })
    })

  }
}

const pageSizeChange = () => {
  //翻页器大小改变事件
  getUserInfo()
}
const currPageChange = () => {
  //翻页事件
  getUserInfo()
}
const rowClass = (row: any,) => {

  if (row.columnIndex === 9) {
    return {background: '#F0F5FF', color: '#5fa8e5'}
  } else {
    return {background: '#F0F5FF', color: '#606266'}
  }

}

onMounted(() => {
  getUserInfo()
})
</script>

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
<style scoped>

</style>