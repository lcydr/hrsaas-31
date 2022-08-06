<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <!-- 头部 -->
        <TreeTools
          :treeNode="company"
          :isRoot="true"
          @add="dialogVisible = true"
        ></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools
              :treeNode="data"
              @remove="loadDepts"
              @add="showAddDept"
              @edit="showEdit"
            ></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <AddDept
      ref="addDepts"
      :visible.sync="dialogVisible"
      :currentNode="currentNode"
      @addDeps="addDeps"
    ></AddDept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsAPI } from '@/api/departments.js'
import { transListToTree } from '@/utils/index'
import AddDept from './components/add-dept.vue'
export default {
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: {
        name: '传智教育',
        manager: '负责人'
      },
      dialogVisible: false,
      currentNode: {},
      loading: true
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      this.loading = true
      const res = await getDeptsAPI()
      // console.log(res)
      this.treeData = transListToTree(res.depts, '')
      this.loading = false
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    addDeps() {
      this.loadDepts()
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDepts.getDeptById(val.id)
    }
  },
  components: {
    TreeTools,
    AddDept
  }
}
</script>

<style scoped lang="scss">
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
