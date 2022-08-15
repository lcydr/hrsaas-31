<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formData.mobile" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native="onSave"
                  >更新</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情"><UserInfo></UserInfo></el-tab-pane>
          <el-tab-pane label="岗位信息"><Uploading></Uploading></el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetail, getUserDetailById } from '@/api/user'
import UserInfo from '@/views/employees/components/user-info.vue'
import Uploading from '@/components/Uploading/index.vue'
export default {
  data() {
    return {
      formData: {}
      // activeName: Cookies.get('employeeDetailTab') || 'account'
    }
  },

  created() {
    this.getUserDetail()
  },

  methods: {
    async getUserDetail() {
      const res = await getUserDetail(this.$route.params.id)
      console.log(res)
      this.formData = res
    },
    async onSave() {
      await getUserDetailById(this.formData)
      this.$message.success('更新成功')
    }
  },
  components: {
    UserInfo,
    Uploading
  }
}
</script>

<style scoped></style>
