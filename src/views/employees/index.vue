<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportExcel"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showAddEmployees = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                  border-radius: 50%;
                "
              />
            </template>
          </el-table-column>
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handleCurrentChange"
            :page-size="page.size"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 添加员工弹窗 -->
    <add-employees
      :visible.sync="showAddEmployees"
      @add-success="getEmployeeList"
    ></add-employees>
  </div>
</template>

<script>
import { getEmployeeInfoList, delEmployee } from '@/api/employees'
import employess from '@/constant/employees.js'
import AddEmployees from './components/add-employees.vue'
const { exportExcelMapPath, hireType } = employess

export default {
  data() {
    return {
      employees: [],
      total: 0,
      page: {
        page: 1,
        size: 10
      },
      showAddEmployees: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      const { rows, total } = await getEmployeeInfoList(this.page)
      this.employees = rows
      this.total = total
      console.log(this.employees)
    },
    handleCurrentChange(val) {
      this.page.page = val
      this.getEmployeeList()
    },
    formOfEmployment(row, column, cellValue, index) {
      const findItem = employess.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployee(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    async exportExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeeInfoList({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)

      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
        multiHeader: [['手机号', '其他信息', '', '', '', '', '部门']],
        merges: ['A1:A2', 'B1:B2', 'G1:G2']
      })
    }
  },
  components: {
    AddEmployees
  }
}
</script>

<style scoped lang="less"></style>
