<template>
  <div class="app-container">
    <transition name="el-zoom-in-center">
      <div v-if="!hidden_col" class="tag-group">
        <span class="tag-group__title">因宽度过小，隐藏：</span>
        <el-tag type="info" effect="plain"> 日期</el-tag>
        <el-tag type="info" effect="plain"> 官网</el-tag>
        <el-tag type="info" effect="plain"> 举办地</el-tag>
        <el-tag type="info" effect="plain"> 标签</el-tag>
      </div>
    </transition>
    <el-table ref="filterTable" :data="conferenceAll" style="width: 100%">
      <el-table-column
        v-if="hidden_col && hidden_can_date"
        prop="date"
        label="日期"
        column-key="date"
        width="180"
        show-overflow-tooltip
      />
      <el-table-column prop="title" label="会议" width="100" show-overflow-tooltip/>
      <el-table-column prop="year" label="年份" width="80"/>
      <el-table-column v-if="hidden_col && hidden_can_link" label="官网" width="200" show-overflow-tooltip>
        <template slot-scope="{row}">
          <a :href="row.link" target="_blank">{{ row.link }}</a>
        </template>
      </el-table-column>
      <el-table-column
        v-if="hidden_col && hidden_can_place"
        prop="place"
        label="举办地"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column prop="deadline" label="Deadline" width="150" show-overflow-tooltip/>
      <el-table-column prop="deadline" label="倒计时" width="80" show-overflow-tooltip>
        <template slot-scope="{row}">
          <CountDown :end="parseTime(row.deadline)" :start="0"/>
        </template>
      </el-table-column>
      <el-table-column v-if="hidden_col && hidden_can_sub" prop="sub" label="标签" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag type="success" disable-transitions>{{ scope.row.sub }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchConferenceList } from '@/api/paper_manage'
import CountDown from '@/components/TimeCountDown/count-down.vue'
import $ from 'jquery'

export default {
  name: 'ComplexTable',
  components: { CountDown },
  data() {
    return {
      conferenceAll: null,
      label_sub: null,
      hidden_col: false,
      hidden_can_date: true,
      hidden_can_place: true,
      hidden_can_link: true,
      hidden_can_year: true,
      hidden_can_sub: true
    }
  },
  created() {
    this.getConferenceData()
  },
  mounted() {
    // 实现APP的高度占满全屏
    this.hidden_col = $(window).width() > 1000
    window.onresize = () => {
      return (() => {
        this.hidden_col = $(window).width() > 1000
      })()
    }
  },
  methods: {
    getConferenceData() {
      fetchConferenceList({}).then(response => {
        this.label_sub = response.sub_label
        this.conferenceAll = response.data
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    parseTime(param) {
      const date = new Date(param)
      return date.getTime()
    },
    is_outOfDate(param) {
      const date = new Date(param)
      const now = new Date()
      return date > now
    },
    func() {
      console.log('时间到了')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin-left: 5px;
}
</style>
