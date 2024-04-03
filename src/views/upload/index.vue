<template>
  <div class="w-1/1 h-1/4 rounded-md shallow bg-white p-4 mb-5 flex
  items-center ">
    <el-upload
        ref="upload"
        :auto-upload="false"
        :limit="5"
        :on-change="fileChange"
        :on-exceed="handleExceed"
        class="upload-demo flex "
        drag
        multiple
    >
      <el-icon class="el-icon--upload">
        <upload-filled/>
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此区域,或<em>点击上传</em>
        <p style="font-size:  13px;color: #8c939d">最多上传5个附件,每个附件大小不超过3M</p>
      </div>
    </el-upload>
  </div>
  <div class="w-1/1 h-5/7 rounded-md shallow bg-white p-4 flex flex-col justify-center items-center ">
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

import {UploadFilled} from '@element-plus/icons-vue'
import {genFileId, UploadInstance, UploadProps, UploadRawFile} from "element-plus";

const upload = ref<UploadInstance>()
const formData = ref({
  file: null
})

function fileChange(file: any) {
  console.log(file)
  formData.value.file = file['raw']


}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
</script>


<style scoped>
.upload-demo {
  width: 40vh;
  height: 200px;
}
</style>