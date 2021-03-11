<template>
  <div class="dashboard-editor-container">
    <mindmap v-model="data_mindmap" :height="mindmap_height"></mindmap>
  </div>
</template>

<script>
import mindmap from '@hellowuxin/mindmap'
import $ from 'jquery'

export default {
  name: 'PaperShow',
  components: {
    mindmap
  },
  data() {
    return {
      data_mindmap: [{
        'name': '如何学习D3',
        'children': [
          {
            'name': '预备知识',
            'children': [
              { 'name': 'HTML & CSS' },
              { 'name': 'JavaScript' }
            ]
          },
          {
            'name': '安装',
            '_children': [
              { 'name': '折叠节点' }
            ]
          },
          {
            'name': '进阶',
            'left': true
          }
        ]
      }],
      mindmap_height: 500
    }
  },
  mounted() {
    // 实现APP的高度占满全屏
    this.mindmap_height = $(window).height()-85
    window.onresize = () => {
      return (() => {
        this.mindmap_height = $(window).height()-85
      })()
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
