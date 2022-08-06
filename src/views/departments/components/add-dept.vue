<template>
  <el-dialog
    :title="changeDept"
    :visible="visible"
    width="50%"
    @close="onClose"
  >
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      label-width="100px"
      ref="form"
      :model="fromData"
      :rules="fromRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="fromData.name" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="fromData.code" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="fromData.manager"
          style="width: 100%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="fromData.introduce"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="onSave">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getDeptsAPI,
  addDep,
  getDeptByIdApi,
  editDeptByIdApi
} from '@/api/departments'
import { getEmployeesApi } from '@/api/employees'
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  data() {
    // 部门名称
    const checkDeptName = async (rules, value, callback) => {
      if (this.fromData.id) {
        // 编辑
        const { depts } = await getDeptsAPI()
        const filtersDepts = depts.filter(
          (item) =>
            item.pid === this.fromData.pid && item.id !== this.fromData.id
        )
      } else {
        if (!this.currentNode.children) return callback()
        // 1.判断value 是否和添加的同级部门是否重复（获取到同级部门）
        // console.log(this.currentNode)
        const isRepeat = this.currentNode.children.some(
          (item) => item.name === value
        )
        // 2.如果重复了callback(new Error('部门重复'))
        isRepeat ? callback(new Error('部门重复')) : callback()
      }
    }
    // 部门编码
    const checkDeptCode = async (rules, value, cb) => {
      const { depts } = await getDeptsAPI()
      let isRepeat
      if (this.fromData.id) {
        isRepeat = depts
          .filter((item) => item.id !== this.fromData.id)
          .some((item) => item.code === value)
      } else {
        isRepeat = depts.some((item) => item.code === value)
      }
      isRepeat ? cb(new Error('部门编码重复')) : cb()
    }
    return {
      dialogVisible: true,
      employees: [],
      fromData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      fromRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '部门名称不能为空', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getEmployeesApi()
  },

  methods: {
    // 获取员工列表
    async getEmployeesApi() {
      const res = await getEmployeesApi()
      // console.log(res)
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.fromData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    // 点击添加确认
    async onSave() {
      await this.$refs.form.validate()
      try {
        if (this.fromData.id) {
          await editDeptByIdApi(this.fromData)
          this.onClose()
          this.$emit('addDeps')
          this.$message.success('编辑成功')
        } else {
          // 发送请求
          this.fromData.pid = this.currentNode.id
          // console.log(this.fromData)
          await addDep(this.fromData)
          this.onClose()
          console.log('增加成功')
          this.$message.success('增加成功')
          this.$emit('addDeps')
        }
      } catch (error) {
        this.$message.error('增加成功')
      }
    },
    async getDeptById(id) {
      this.fromData = await getDeptByIdApi(id)
      console.log(this.fromData.id)
    }
  },
  computed: {
    changeDept() {
      return this.fromData.id ? '编辑部门' : '添加部门'
    }
  }
}
</script>

<style scoped></style>
