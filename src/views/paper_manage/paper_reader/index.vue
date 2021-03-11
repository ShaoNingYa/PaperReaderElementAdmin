<template>
  <div class="paper_reader_content">
    <iframe v-if="showPdf" id="previewPdf" :src="reader_path + fileUrl" />
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'DashboardAdmin',
  components: {},
  data() {
    return {
      reader_path: process.env.VUE_APP_BASE_API + 'statics/paper_viewer/index.html?file=',
      // reader_path: '/static/paper_viewer/index.html?file=',
      fileUrl: process.env.VUE_APP_BASE_API + 'statics/paper_file_save/' + this.$route.params.path + '#page=' + this.$route.params.page + '&user_Token=' + this.$store.getters.token + '&paper_ID=' + this.$route.params.id,
      showPdf: true,
      centerDialogVisible: true
    }
  },
  mounted() {
    // 实现APP的高度占满全屏
    $('.paper_reader_content').height($(window).height())
    $('.app-main').height($(window).height() - 85)
    window.onresize = () => {
      return (() => {
        $('.paper_reader_content').height($(window).height())
        $('.app-main').height($(window).height() - 85)
      })()
    }
    // 监听键盘事件
    this.$nextTick(function() {
      document.addEventListener('keyup', function(e) {
        if (e.keyCode === 27) {
          // window.history.go(-1)  // 实现ESC退出论文阅读，并返回上一页
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
.app-wrapper {
    overflow-y:hidden;
}
.el-row {
  margin-bottom: 20px;
  height: 100%;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
  height: 100%;
}
.is-fullscreen {
  overflow: hidden;
}
.paper_reader_content {
  position: absolute;
  background: #1f2d3d;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
}
iframe {
  width: 100%;
  height: 100%;
}
</style>
