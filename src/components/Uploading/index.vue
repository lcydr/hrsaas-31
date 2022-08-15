<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      action="#"
      :http-request="onRequest"
      list-type="picture-card"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// id: AKIDykHZOxGJ5apmRpvjHTO1NSJuGMAgvvWq
// key:92f15tQfcIhx6zcz6wWqvlMiaLr8AwSl
var cos = new COS({
  SecretId: 'AKIDykHZOxGJ5apmRpvjHTO1NSJuGMAgvvWq',
  SecretKey: '92f15tQfcIhx6zcz6wWqvlMiaLr8AwSl'
})
console.log(cos)
export default {
  name: 'Uploading',
  data() {
    return {
      loading: false,
      previewImgDialog: false,
      imgUrl: '',
      fileList: []
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      // console.log('我们自己发送请求')
      this.loading = true
      cos.putObject(
        {
          Bucket: 'newcreated-1313341636' /* 必须 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          // console.log(err || data)
          if (err || data.statusCode != 200) {
            return this.$message.error('上传失败，刷新重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialog = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      // 现在上传的图片
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('选择的图片不能超过2mb')
        return false
      }
      // console.log('上传前的检测')
    }
  }
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}

.custom-upload {
  width: 149px;
  height: 149px;
  overflow: hidden;
}
</style>
