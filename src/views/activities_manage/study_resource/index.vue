<template>
  <div style="height: 2000px">
    <el-tabs :tab-position="tabPosition" :stretch="true" style="height: 2000px">
      <el-tab-pane label="推荐系统01">
        <div class="content_show" style="height: 5000px; width: 100%; background: rebeccapurple"/>
      </el-tab-pane>
      <el-tab-pane label="推荐系统02">
        <div style="height: 5000px; width: 100%; background: red"/>
      </el-tab-pane>
      <el-tab-pane label="推荐系统03">
        <div style="height: 5000px; width: 100%; background: rosybrown"/>
      </el-tab-pane>
      <el-tab-pane label="推荐系统04">
        <div style="height: 5000px; width: 100%; background: royalblue"/>
      </el-tab-pane>
    </el-tabs>
    <BackToTop></BackToTop>
  </div>

</template>

<script>
import BackToTop from '@/views/study_manage/study_resource/components/BackToTop'

export default {
  components: { BackToTop },
  data() {
    return {
      tabPosition: 'left'
    }
  }
}
</script>
<style scoped>
.tab-container {
  margin: 30px;
}

.el-tabs__nav-scroll {
  position: fixed;
  top: 1000px;
}
</style>
