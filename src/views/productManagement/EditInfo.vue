@@ -0,0 +1,268 @@
<template>
    <div class="w-1/1 mt-3 mb-10">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/system/product' }">产品类型</el-breadcrumb-item>
            <el-breadcrumb-item>编辑</el-breadcrumb-item>

        </el-breadcrumb>
    </div>
    <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow">
        <el-form ref="ruleFormRef" :model="formData" :rules="form_rules" class="demo-form-inline"
                 inline
                 label-position=left
                 label-width="6em"
                 style="text-align: left">
            <h4>编辑产品</h4>
            <br>
            <br>
            <!--            <el-form-item class="long" label="产品图片" prop="ProUrl">-->
            <!--                <template #default="scope">-->
            <!--                    <el-avatar :size="50" :src='scope.row.ProUrl'/>-->
            <!--                </template>-->
            <!--            </el-form-item>-->
            <el-form-item v-if="csimg_url" class="long first_img" label="产品图片" prop="ProUrl">

                <el-image
                        style="width: 100px; height: 100px"
                        :src="formData.ProUrl"
                        fit="cover"
                ></el-image>
                <el-button type="primary" plain @click="csimg_url=false" style="margin-left: 2px">编辑图像</el-button>
            </el-form-item>
            <el-form-item v-else class="long leave" label="产品图片" prop="file">

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
                <el-input v-model="formData.saveDate" :value="timeChange(formData.saveDate)"></el-input>
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
                    <el-input v-model.number="formData.LevTwo" :disabled="detection"></el-input>
                    <span>—</span>
                </el-form-item>

                <el-form-item class="small" prop="LevThree">
                    <el-input v-model.number="formData.LevThree"></el-input>
                </el-form-item>

            </el-form-item>

            <br>
            <br>
            <el-form-item>
                <el-button type="info" @click="reset">取消</el-button>
                <el-button style="color: #fff;background-color: #00bd77" @click="editProInfo(ruleFormRef)">保存
                </el-button>
            </el-form-item>
        </el-form>


    </div>
    <div id="tableData"></div>
</template>

<script lang="ts" setup>
import {ArrowRight, Plus} from '@element-plus/icons-vue'
import {computed, onBeforeMount, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {addProInfo} from "@/api/ProductInfo.ts";
import {ElMessage, FormInstance, genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";

// let tranparent=ref(fa)
let csimg_url = ref()
onBeforeMount(() => {
    if (formData.ProUrl != 'null') {
        csimg_url.value = true
    } else csimg_url.value = false
})

const upload = ref<UploadInstance>()
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
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const formData = reactive({
    ProId: router.currentRoute.value.params.ProId,
    ProNetCon: router.currentRoute.value.params.ProNetCon,
    ProJx: router.currentRoute.value.params.ProJX,
    ProName: router.currentRoute.value.params.ProName,
    ProRegOwner: router.currentRoute.value.params.ProRegOwner,
    ProRegNo: router.currentRoute.value.params.ProRegNo,
    MainContent: router.currentRoute.value.params.MainContent,
    ProSpec: router.currentRoute.value.params.ProSpec,
    saveDate: router.currentRoute.value.params.SaveDate,
    ProLevel: router.currentRoute.value.params.ProLevel,
    LevOne: 1,
    LevTwo: router.currentRoute.value.params.LevTwo,
    LevThree: router.currentRoute.value.params.LevThree,
    file: null,
    ProUrl: router.currentRoute.value.params.ProUrl,
})
let detection = computed(() => {
    return formData.ProLevel == 2 ? true : false
})
watch(detection, (newvalue) => {
    if (newvalue) {
        formData.LevTwo = '0'
    }
})
const reset = () => {
    router.back()
}
// 包装等级
const prolev = [{
    value: '2',
    label: '2'
}, {
    value: '3',
    label: '3'
}]
const data = ref()
const getData = () => {
    //api获取数据
    // getProInfo().then((res: any) => {
    //     if (res.retCode === 0) {
    //         //@ts-ignore
    //         data.value = res.retData.info[router.currentRoute.value.params.index]
    //
    //         // formData.Operator = data.value.Operator
    //         // formData.ProName = data.value.ProductName
    //         // formData.ProNum = data.value.ProNum
    //         // formData.Spec = data.value.Spec
    //         // formData.ProId = data.value.ProductId
    //     }
    //     //@ts-ignore
    // }).catch(err => {
    //     data.value = []
    //     ElMessage({
    //         type: 'error',
    //         message: err.retMsg
    //     })
    // }).finally(() => {
    // })
}
const editProInfo = async (formEl: FormInstance | undefined) => {
    console.log(formEl)
    if (!formEl) return
    let file = new FormData();
    file.append('Filedata', formData.file)
    //@ts-ignore
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(typeof formData.ProId)
            addProInfo({
                ProId: formData.ProId,
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
                file
                //@ts-ignore
            }).then(res => {
                if (res.retCode === 0) {
                    router.push({path: '/system/product/success/' + 1})
                }
                //@ts-ignore
            }).catch(err => {
                data.value = []
                ElMessage({
                    type: 'error',
                    message: err.retMsg
                })

            }).finally()
        }
    })
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

// 转换时间函数
const timeChange = (time) => {
    let data = new Date(time);
    return `${data.getFullYear()}/${data.getMonth() + 1}/${data.getDate()}`
}
</script>


<style scoped>
.long /deep/ .el-form-item__label {
    width: 8em !important;
}

.first_img /deep/ .el-form-item__content {
    align-items: end;
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