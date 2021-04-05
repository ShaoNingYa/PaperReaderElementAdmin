<template>
  <div class="app-container main_content">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="搜索标题"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加论文
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        v-if="false"
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="60px"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.paper_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年份" width="60px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.paper_data }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="false" label="上传时间" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.paper_data_upload | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="会议"
        width="70px"
        align="center"
        :filters="all_conference"
        :filter-method="filterConference"
      >
        <template slot-scope="{row}">
          <span>{{ row.paper_conference }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="{row}">
          <router-link :to="getPathByPaper(row.paper_path, 1, row.paper_id)">  <!--row.paper_history-->
            {{ row.paper_title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="阅读记录" width="110px" align="center">
        <template slot-scope="{row}">

          <el-popover v-if="row.paper_history.page>0" trigger="click" placement="right">
            <template>
              <router-link :to="getPathByPaper(row.paper_path, 1, row.paper_id)">
                <el-button type="warning">从头开始</el-button>
              </router-link>
              <router-link :to="getPathByPaper(row.paper_path, row.paper_history.page, row.paper_id)">  <!--row.paper_history-->
                <el-button type="success">继续阅读</el-button>
              </router-link>
            </template>
            <el-tag slot="reference" style="cursor: pointer" type="success"><small style="color: #7b7d86">第
              <strong>{{ row.paper_history.page }}</strong> 页</small></el-tag>
          </el-popover>
          <el-tag v-if="!row.paper_history.page>0" type="info">未开始</el-tag>

        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    <el-pagination-->
    <!--      v-show="total>0"-->
    <!--      :page-sizes="[10, 20, 30, 40]"-->
    <!--      :page-size="100"-->
    <!--      layout="sizes, prev, pager, next"-->
    <!--      :total="total"-->
    <!--      :page.sync="listQuery.page"-->
    <!--      :limit.sync="listQuery.limit"-->
    <!--      @pagination="getList"-->
    <!--      @size-change="handleSizeChange"-->
    <!--    />-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="80px"
        style="width: 500px; margin-left:50px;"
      >
        <template v-if="!paper_upload_process">
          <el-upload
            class="upload-demo"
            :action="paper_upload_api"
            :limit="1"
            :on-success="upload_success"
            :data="paper_upload_file"
          >
            <el-button size="small" type="primary">先上传PDF</el-button>
          </el-upload>
        </template>
        <template v-if="paper_upload_process">
          <el-form-item label="论文题目" prop="r_title">
            <el-input v-model="temp.name" />
          </el-form-item>
          <el-form-item label="论文作者">
            <el-input v-model="temp.author" />
          </el-form-item>
          <el-form-item label="论文会议" prop="r_conference">
            <el-select v-model="temp.conference" placeholder="选择会议">
              <el-option
                v-for="paper_one in paper_conference_choice"
                :label="paper_one['conference_name']"
                :value="paper_one['conference_id']"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="论文年份" prop="r_year">
            <el-input v-model="temp.conference_year" />
          </el-form-item>
        </template>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <div style="width: 100%; height: 50px" />
  </div>
</template>

<script>
import { fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchMyPaperList, updatePaper, fetchConferenceListForPaperUpload, fetchConferenceIdByName } from '@/api/paper_manage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import $ from 'jquery'
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: {},
  directives: { waves },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      all_conference: null,
      total: 0,
      listLoading: true,
      listQuery: {
        token: this.$store.getters.token
      },
      temp: {
        id: undefined,
        name: '',
        author: '',
        conference: '',
        conference_year: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改信息',
        create: '添加论文'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        // r_file: [{ required: true, message: '请上传文件' }],
        // r_conference: [{ required: true, message: '所属会议一定要填' }],
        // r_title: [{ required: true, message: '论文标题一定要填' }],
        // r_year: [{ required: true, message: '论文年份一定要填', trigger: 'blur' }]
      },
      downloadLoading: false,
      isOpenInside: true,
      paper_upload_api: process.env.VUE_APP_BASE_API + 'paper/paper_upload_file/',
      paper_conference_choice: [],
      paper_upload_file: {
        token: this.$store.getters.token
      },
      paper_upload_process: false
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    // 实现APP的高度占满全屏
    $('.main_content').height($(window).height() - 100)
    $('.app-main').height($(window).height() - 85)
    window.onresize = () => {
      return (() => {
        $('.main_content').height($(window).height() - 100)
        $('.app-main').height($(window).height() - 85)
      })()
    }
    window.addEventListener('scroll', this.scrollHandle, true) // 监听 监听元素是否进入/移出可视区域
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchMyPaperList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.all_conference = response.data.all_conference
        this.listLoading = false
        // Just to simulate the time of the request
        // setTimeout(() => {
        //   this.listLoading = false
        // }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 表头过滤器 start
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterConference(value, row) {
      return row.paper_conference === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 表头过滤器 end
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        author: '',
        conference: '',
        conference_year: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.paper_upload_process = false
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      updatePaper(this.temp).then(() => {
        // this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '添加成功',
          message: '添加论文成功',
          type: 'success',
          duration: 2000
        })
        this.paper_upload_process = !this.paper_upload_process
        this.getList()
      })
    },
    handleUpdate(row) {
      this.temp_data = Object.assign({}, row) // copy obj
      fetchConferenceListForPaperUpload().then(response => {
        this.paper_conference_choice = response.data
      })
      this.temp.id = this.temp_data.paper_id
      this.temp.name = this.temp_data.paper_title
      this.temp.author = this.temp_data.paper_author
      fetchConferenceIdByName(this.temp_data.paper_conference).then(response => {
        this.temp.conference = response.id
      })
      this.temp.conference_year = this.temp_data.paper_data
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.paper_upload_process = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      updatePaper(this.temp).then(() => {
        // this.list.unshift(this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '更新成功',
          message: '更新论文数据成功',
          type: 'success',
          duration: 2000
        })
        this.paper_upload_process = !this.paper_upload_process
        this.getList()
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getPathByPaper(paper_path, paper_page, paper_id) {
      return '/paper/paper_reader/' + paper_path + '/' + paper_page + '/' + paper_id
    },
    upload_success(response, file, fileList) {
      if (response !== 'fail') {
        this.temp.id = response.id
        this.paper_upload_process = !this.paper_upload_process
        fetchConferenceListForPaperUpload().then(response => {
          this.paper_conference_choice = response.data
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main_content {
  overflow-y: scroll;
}
</style>
