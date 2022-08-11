<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="dialogVisible = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="tableData">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                layout="sizes,prev,pager,next"
                :total="total"
                :page-size="pagesize"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :page-sizes="[3, 5, 10, 15]"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="getCompanyInfoData.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="getCompanyInfoData.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="getCompanyInfoData.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  v-model="getCompanyInfoData.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 新增角色弹窗 -->
    <el-dialog
      title="新增角色"
      :visible.sync="dialogVisible"
      width="50%"
      @close="dialogClose"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRules"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRole } from '@/api/role'
import { getCompanyInfo } from '@/api/setting'
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      pagesize: 3,
      page: 1,
      dialogVisible: false,
      addRoleForm: {
        name: '',
        description: ''
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      getCompanyInfoData: {}
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    // 分页
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
      // console.log(this.tableData)
    },
    handleCurrentChange(val) {
      // console.log(val)
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      // console.log(val)
      this.pagesize = val
      this.getRoles()
    },
    // 弹窗
    onClose() {
      this.dialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRole(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false

      this.getRoles()
    },
    // 监听对话框关闭
    dialogClose() {
      // 前置： 只能重置有校验的表单
      this.$refs.form.resetFields()
      this.addRoleFrom.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
      // console.log(res)
      this.getCompanyInfoData = res
      console.log(this.getCompanyInfoData)
    }
  }
}
</script>

<style scoped lang="less"></style>
