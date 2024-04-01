<template>
    <div class="w-1/1 h-1/1 rounded-md shallow bg-white p-4 flex flex-col justify-center items-center ">
        <div class="w-1/1 pt-4 flex flex-row justify-center items-between">
            <el-form class="w-1/1 px-3">
                <div class="w-1/1 flex flex-row justify-between items-start">
                    <el-form-item class="search">
                        <el-input v-model.trim.lazy="query"

                                  placeholder="输入查询">
                            <template #append>
                                <el-button style="color: #ffffff;background-color: #2b9cfa;border-radius: 0 5px 5px 0; "
                                           @click="search_keyword">查询
                                </el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button style="background-color: #00bd77;color: #fff" @click="append">新增</el-button>
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
                <el-table-column align="center" label="序号" prop="ProId" width="60">
                    <template #default="scope">
                        {{ scope.row.ProId ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品图片" prop="ProductName">
                    <template #default="scope">
                        {{ scope.row.ProductName ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品名称" prop="ProName">
                    <template #default="scope">
                        {{ scope.row.ProName ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="登记证号" property="ProRegNo">
                    <template #default="scope">
                        {{ scope.row.ProRegNo ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="登记证持有人" property="ProRegOwner">
                    <template #default="scope">
                        {{ scope.row.ProRegOwner ?? '1' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="产品规格" property="ProSpec">
                    <template #default="scope">
                        {{ scope.row.ProSpec ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="增加时间" property="SaveDate">
                    <template #default="scope">
                        {{ timeChange(scope.row.SaveDate) ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="包装等级" prop="ProLevel">
                    <template #default="scope">
                        {{ scope.row.ProLevel ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="净含量" prop="ProNetCon">
                    <template #default="scope">
                        {{ scope.row.ProNetCon ?? '-' }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="包装比例" prop="ProLev">
                    <template #default="scope">
                        {{ scope.row.LevOne }}:{{ scope.row.LevTwo }}:{{ scope.row.LevThree }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作 ">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="editTarget(scope.row.ProId)">编辑</el-button>
                        <el-button size="small" style="margin-left: 5px" type="danger"
                                   @click="deleteTarget(scope.row.ProId)">删除
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
                        :page-size="pageInfo.pageSize"
                        :page-sizes="[10, 20, 30, 40]"
                        :total="pageInfo.total"
                        :page-count="pageInfo.count"
                        background class="mt-2" layout=" prev, pager, next, jumper, sizes" small
                        @size-change="pageSizeChange"
                        @current-change="currPageChange"/>
            </div>

        </div>
    </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {delProInfo, getProByName, getProInfo} from "@/api/ProductInfo.ts";
import {ElLoading, ElMessage, ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";
import {hint} from "@/components/hint.ts";

// import 'element-plus/theme-chalk/el-message.css'
// import 'element-plus/theme-chalk/el-message-box.css'


const router = useRouter()
let query = ref('') //查询参数
let turnfiler = ref(false)//是否开启查询，默认关闭
let data = ref([])
//翻页器信息
let pageInfo = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 30,
    count: 1,
})
const getData = async () => {
    let loading = ElLoading.service()
    //api获取数据
    await getProInfo(query.value, pageInfo.currentPage, pageInfo.pageSize, turnfiler.value).then((res: any) => {
        if (res.retCode === 0) {
            // console.log(res)
            data.value = res.retData.info
            pageInfo.count = res.retData.totalPage
            loading.close()
        }
        //@ts-ignore
    }).catch(err => {
        data.value = []
        ElMessage({
            type: 'error',
            message: err.retMsg
        })
        loading.close()
    }).finally(() => {

    })

}
const queryPro = async (query: string) => {
    //@ts-ignore
    await getProByName(query, pageInfo.currentPage, pageInfo.pageSize).then(res => {
        if (res.retCode === 0) {
            data.value = res.retData.info
            pageInfo.count = res.retData.totalPage
        }
    }).catch(
        data.value = []
    ).finally()
}
const delData = async (ProId: any) => {
    //@ts-ignore
    await delProInfo({ProId: ProId}).then(res => {
        if (res.retCode === 0) {
            hint()
            getData()
        }
    }).catch()
}

onMounted(() => {
    getData()
})


const search_keyword = () => {
    //开启查询，与翻页器有关
    turnfiler.value = true
    //搜索数据
    queryPro(query.value)
}
const append = () => {
    router.push({path: '/system/product/appendInfo'})
}

const deleteItem = ref(false)
const deleteTarget = (index: number) => {
    //删除
    deleteItem.value = true
    ElMessageBox.confirm(
        '是否删除该产品',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            center: true,
            customClass: 'shade',
        }
    ).then(() => {
        delData(index)
    })
}
const editTarget = (index: number) => {
    router.push({path: '/system/product/editInfo/' + index})
    //编辑
}
let del_target_cache = ref([])
const multi_del = (value: any) => {
    del_target_cache.value = value
    console.log(del_target_cache)
}

const mult_del_handler = () => {
    let del_target = Object.entries(del_target_cache.value).map(([_, item]) => {
        // @ts-ignore
        return item.ProId
    })
    console.log(del_target)
    if (del_target.length === 0) {
        ElMessage.error('请先选择要删除的条目!')
        return;
    }
    if (del_target.length === 1) {
        deleteTarget(del_target[0])
    } else {
        ElMessageBox.confirm(
            '是否删除产品',
            {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true,
            }
        ).then(() => {
            let loading = ElLoading.service()
            let req_list = []
            for (let item of del_target) {
                req_list.push(delProInfo({ProId: item}))
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
                    for (let item of err_list) {
                        ElMessage({
                            type: 'error',
                            message: '删除设备失败,设备ID : ' + err_list[item],
                            duration: 5000
                        })
                    }
                } else {
                    ElMessage({
                        type: 'success',
                        message: '删除成功'
                    })
                    getData()
                }
                getData()
                //@ts-ignore
            }).catch(res => {
                loading.close()
                ElMessage({
                    type: 'error',
                    message: '服务器错误'
                })
            })
        })

    }
}


const pageSizeChange = (pageSize: number) => {
    pageInfo.pageSize = pageSize
    getData()
}
const currPageChange = (index: number) => {
    pageInfo.currentPage = index
    getData()
}
const rowClass = (row: any,) => {

    if (row.columnIndex === 8) {
        return {background: '#F0F5FF', color: '#5fa8e5'}
    } else {
        return {background: '#F0F5FF', color: '#606266'}
    }

}

// 转换时间函数
const timeChange = (time) => {
    let data = new Date(time);
    return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`
}
/////////////////////////////////////////////////
</script>


<style scoped>

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

</style>