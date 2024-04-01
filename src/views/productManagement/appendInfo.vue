<template>
    <div class="w-1/1 mt-3 mb-10">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{path:'/system/product'}">产品类型</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>

        </el-breadcrumb>
    </div>
    <div class="w-1/1 h-17/19 px-20 pt-8 bg-white rounded-md shallow">
        <el-form ref="ruleFormRef" :model="formData" :rules="form_rules" class="demo-form-inline"
                 style="text-align: left"
                 inline
                 label-position=left
                 label-width="6em">
            <h4>新增产品</h4>
            <br>
            <br>
            <el-form-item label="产品图片" prop="file" class="long leave">
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
            <el-form-item label="产品名称" prop="ProName" class="long">
                <el-input v-model="formData.ProName"></el-input>
            </el-form-item>
            <el-form-item label="登记证持有人" prop="ProRegOwner" class="long">
                <el-input v-model="formData.ProRegOwner"></el-input>
            </el-form-item>
            <br>
            <br>
            <el-form-item label="登记证号" prop="ProRegNo" class="long">
                <el-input v-model="formData.ProRegNo"></el-input>
            </el-form-item>
            <el-form-item label="主要成分" prop="MainContent" class="long">
                <el-input v-model="formData.MainContent"></el-input>
            </el-form-item>
            <br>
            <br>
            <el-form-item label="产品规格" prop="ProSpec" class="long">
                <el-input v-model="formData.ProSpec"></el-input>
            </el-form-item>
            <el-form-item label="净含量" prop="ProNetCon" class="long">
                <el-input v-model="formData.ProNetCon"></el-input>
            </el-form-item>
            <br>
            <br>
            <el-form-item label="增加时间" prop="saveDate" class="long">
                <el-input v-model="formData.saveDate"></el-input>
            </el-form-item>
            <el-form-item label="剂型" prop="ProJx" class="long">
                <el-input v-model="formData.ProJx"></el-input>
            </el-form-item>
            <br>
            <br>
            <el-form-item label="包装等级" prop="ProLevel" class="long">
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
            <el-form-item label="包装比例" required class="long">

                <el-form-item prop="LevOne" class="small">
                    <el-input
                            placeholder="1"
                            v-model="formData.LevOne"
                            :disabled="true">
                    </el-input>
                    <span>—</span>
                </el-form-item>


                <el-form-item prop="LevTwo" class="small">
                    <el-input v-model.number="formData.LevTwo"></el-input>
                    <span>—</span>
                </el-form-item>

                <el-form-item prop="LevThree" class="small">
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
import {ElMessage, FormInstance} from "element-plus";
import {ArrowRight, Plus} from '@element-plus/icons-vue'
import {nextTick, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {addProInfo} from "@/api/ProductInfo.ts";

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
    CreateDate: [
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
    console.log(router.query)
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

////////////////////////////////////////////////
const height = ref('200px')
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
// 包装等级
const prolev = [{
    value: '2',
    label: '2'
}, {
    value: '3',
    label: '3'
}]
/////////////////////////////////////////////////
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