<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane :lazy="true">
        <span slot="label"><i class="el-icon-date" /> 今天 ~ {{ date_show[0] }}</span>
        <badminton_one_day :one-day="1" />
      </el-tab-pane>
      <el-tab-pane :lazy="true">
        <span slot="label"><i class="el-icon-date" /> 明天 ~ {{ date_show[1] }}</span>
        <badminton_one_day :one-day="2" />
      </el-tab-pane>
      <el-tab-pane :lazy="true">
        <span slot="label"><i class="el-icon-date" /> 后天 ~ {{ date_show[2] }}</span>
        <badminton_one_day :one-day="3" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import badminton_one_day from '@/views/activities_manage/badminton_manage/components/badminton_one_day'

export default {
  name: 'BadmintonManage',
  components: {
    badminton_one_day
  },
  data() {
    return {
      date_show: ['2020-04-08', '2020-04-09', '2020-04-10'],
      data_all: {
        data_one: {},
        data_two: {},
        data_three: {}
      }
    }
  },
  mounted() {
    this.init_date()
  },
  methods: {
    dateFormat: function(date) {
      // var date = new Date(time)
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
		 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
		 * */
      var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // 拼接
      return year + '-' + month + '-' + day// + ' ' + hours + ':' + minutes + ':' + seconds
    },
    init_date() {
      const nowDate = new Date()
      const nowDate_1 = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000)
      const nowDate_2 = new Date(nowDate_1.getTime() + 24 * 60 * 60 * 1000)
      this.date_show = [this.dateFormat(nowDate), this.dateFormat(nowDate_1), this.dateFormat(nowDate_2)]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
