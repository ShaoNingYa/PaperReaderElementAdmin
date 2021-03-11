<template>
  <div class="dashboard-editor-container">
    <mindmap v-model="data_mindmap" :height="mindmap_height" />
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
        'name': '机器学习/算法面试考点',
        'children': [
          {
            'name': '数学基础',
            '_children': [
              {
                'name': '微积分',
                '_children': [
                  { 'name': '求导' },
                  { 'name': '梯度' },
                  { 'name': '偏微分' },
                  { 'name': '积分' }
                ]
              },
              {
                'name': '统计学，概率论',
                '_children': [
                  { 'name': '推断统计学和概率论的基本概念' },
                  { 'name': '高斯分布' },
                  { 'name': '贝叶斯公式' },
                  { 'name': '最小二乘法' },
                  { 'name': '线性回归' },
                  { 'name': '逻辑回归' }
                ]
              },
              {
                'name': '线性代数',
                '_children': [
                  { 'name': '向量' },
                  { 'name': '向量空间' },
                  { 'name': '向量投影' },
                  { 'name': '矩阵运算' },
                  { 'name': '特征值分解' },
                  { 'name': 'SVD分解' }
                ]
              }
            ]
          },
          {
            'name': '机器学习算法',
            '_children': [
              {
                'name': '处理分类问题常用算法',
                '_children': [
                  { 'name': '逻辑回归（工业界常用）' },
                  { 'name': '支持向量机' },
                  { 'name': '随机森林' },
                  { 'name': '朴素贝叶斯（NLP常用）' },
                  { 'name': '深度神经网络（视频、图片、语音等多媒体数据中使用）' },
                  { 'name': '决策树' }
                ]
              },
              {
                'name': '处理回归问题常用算法',
                '_children': [
                  { 'name': '线性回归' },
                  { 'name': '普通最小二乘回归' },
                  { 'name': '逐步回归' },
                  { 'name': '多元自适应回归样条' }
                ]
              },
              {
                'name': '处理聚类问题常用算法',
                '_children': [
                  { 'name': 'K均值' },
                  { 'name': '基于密度聚类' },
                  { 'name': 'LDA' }
                ]
              },
              {
                'name': '推荐系统的常用算法',
                '_children': [
                  { 'name': '协同过滤算法' },
                  { 'name': 'FM' }
                ]
              },
              {
                'name': '模型融合和提升的算法',
                '_children': [
                  { 'name': 'Bagging' },
                  { 'name': 'Adaboost' },
                  { 'name': 'GBDT' },
                  { 'name': 'GBRT' },
                  { 'name': 'Stacking' },
                  { 'name': 'Blending' },
                  { 'name': 'XGBoost' }
                ]
              },
              {
                'name': '其他重要算法',
                '_children': [
                  { 'name': 'EM算法' }
                ]
              }
            ]
          },
          {
            'name': '机器学习',
            '_children': [
              { 'name': 'Scikit-learn' },
              { 'name': 'Libsvm' },
              { 'name': 'Keras/Tensorflow' }
            ]
          },
          {
            'name': '深度学习'
          },
          {
            'name': '数据结构与算法',
            '_children': [
              { 'name': '查找' },
              { 'name': '哈希' },
              { 'name': '表达式，字符串' },
              { 'name': '堆与栈' },
              { 'name': '树' },
              { 'name': '排序' },
              { 'name': '高级算法' },
              { 'name': '链表' },
              { 'name': '数组' },
              { 'name': '动态规划' },
              { 'name': '遍历' }
            ]
          },
          {
            'name': '编程语言，工具和环境',
            '_children': [
              {
                'name': '编程语言',
                '_children': [
                  { 'name': 'Python' },
                  { 'name': 'Java' },
                  { 'name': 'C语言' },
                  { 'name': 'C++' }
                ]
              },
              {
                'name': '大数据相关',
                '_children': [
                  { 'name': 'Hadoop' },
                  { 'name': 'Spark' }
                ]
              },
              {
                'name': '数据挖掘',
                '_children': [
                  { 'name': 'Pandas' },
                  { 'name': 'Numpy' },
                  { 'name': 'Scipy' },
                  { 'name': 'Matplotlib' }
                ]
              },
              {
                'name': '交互式环境',
                '_children': [
                  { 'name': 'Ipython' },
                  { 'name': 'Notebook' }
                ]
              },
              { 'name': '数据分析' },
              { 'name': 'R' }
            ]
          },
          {
            'name': '自然语言处理',
            '_children': [
              { 'name': 'Word2vec' },
              { 'name': 'nltk' },
              { 'name': 'jieba' }
            ]
          },
          {
            'name': '计算机基础',
            '_children': [
              {
                'name': '操作系统',
                'children': [
                  { 'name': 'Linux' }
                ]
              },
              {
                'name': '计算机网络',
                'children': [
                  { 'name': 'XXX' }
                ]
              },
              { 'name': '数据库' }
            ]
          },
          {
            'name': '场景题'
          }
        ]
      }],
      mindmap_height: 500
    }
  },
  mounted() {
    // 实现APP的高度占满全屏
    this.mindmap_height = $(window).height() - 85
    window.onresize = () => {
      return (() => {
        this.mindmap_height = $(window).height() - 85
      })()
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
