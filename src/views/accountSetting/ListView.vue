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
                      :height="height"
                      class="rounded-lg "
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
                        <el-button link size="small" type="primary"
                                   @click="detail(scope.row.UserId,scope.row.UserLevel)">查看
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
                        {{ timeChange(scope.row.CreateDate) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作 ">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="editTarget(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger"
                                   @click="deleteTarget(scope.row.UserId,scope.row.UserLevel)">删除
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
import {h, nextTick, onMounted, reactive, ref} from "vue";
import {delUserInfo, getMenuById, getUserInfoList,} from "@/api/accountSetting.ts";
import {ElCheckbox, ElCheckboxGroup, ElLoading, ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {hint} from "@/components/hint.ts";
import {useAccountStore} from "@/store/account.ts";

const router = useRouter() //路由实例,用于路由跳转
const accountStore = useAccountStore()

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
    totalPage: 1,  //总数居
})
onMounted(() => {
    getUserInfo()
})

const getUserInfo = () => {
    //获取用户信息列表
    let loading = ElLoading.service()
    getUserInfoList(pageInfo, query.value.keyName).then((res: any) => {
        if (res.retCode === 0) {
            //渲染列表并更新翻页器信息
            data.value = res.retData.info
            pageInfo.totalPage = res.retData.totalPage
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
    //调用获取用户信息函数
    getUserInfo()
}
const appendInfo = () => {
    //路由跳转到新增页面
    router.push({name: 'createAccount'})
}
//权限列表数组
const checkList = ref([])
const detail = (UserId: number, UserLevel: string) => {
    //获取用户权限

    getMenuById(UserId, UserLevel).then((res: any) => {
        if (res.retCode === 0) {
            //@ts-ignore
            //根据MenuId查找所选用户权限
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
                h(ElCheckbox, {value: '1',}, () => '产品管理'),
                h(ElCheckbox, {value: '2',}, () => '申请溯源码'),
                h(ElCheckbox, {value: '3',}, () => '上传管理'),
                h(ElCheckbox, {value: '4',}, () => '仓库管理'),
                h(ElCheckbox, {value: '5',}, () => '运营商管理'),
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

const editTarget = (row: any) => {
    //使用pinia暂时存储选中用户信息
    accountStore.data = row
    accountStore.data['File'] = null

    getMenuById(row.UserId, row.UserLevel).then((res: any) => {
        if (res.retCode === 0) {
            //@ts-ignore
            //根据MenuId查找所选用户权限
            accountStore.checkList = Array.from(res.retData.info, ({MenuId}) => MenuId.toString())
        }
    })

    router.push({path: '/system/account/edit'})
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

const pageSizeChange = (pageSize: number) => {
    pageInfo.pageSize = pageSize
    //翻页器大小改变事件
    getUserInfo()
}
const currPageChange = (index: number) => {
    pageInfo.currentPage = index
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