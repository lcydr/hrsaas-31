<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <TreeTools :treeNode="company" :isRoot="true"></TreeTools>
        <!-- 树形 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <TreeTools :treeNode="data"></TreeTools>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsAPI } from '@/api/departments.js'
import { transListToTree } from '@/utils/index'
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
      }
    }
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsAPI()
      this.treeData = transListToTree(res.depts, '')
    }
  },
  components: {
    TreeTools
  }
}
</script>

<style scoped lang="scss">
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
