<template>
  <div class="dashboard-editor-container">
    <h3>论文阅读历史</h3>
    <div style="width: 100%; margin-top: -10px; margin-bottom: 20px;">
      <el-tooltip v-if="isOpenInside" class="item" effect="dark" content="会在内部打开论文" placement="right">
        <el-tag v-if="isOpenInside" type="success">内部打开</el-tag>
      </el-tooltip>
      <el-tooltip v-if="!isOpenInside" class="item" effect="dark" content="通过新页面打开论文" placement="right">
        <el-tag v-if="!isOpenInside" type="warning">外链打开</el-tag>
      </el-tooltip>
    </div>
    <el-dialog :title="show_detail_paper_id" :visible.sync="centerDialogVisible" width="500px" center>
      <div class="chart-container">
        <chart height="100%" width="100%" :data="data_history_paper_detail"/>
      </div>
    </el-dialog>
    <el-row :gutter="8">
      <el-col :span="24" style="margin-bottom:30px;">
        <div class="block">
          <el-timeline>
            <el-timeline-item v-for="his_one in data_history_paper" :timestamp="his_one.paper_data" placement="top">
              <el-card>
                <el-button type="text" @click="showPaperDetail(his_one.paper_id)">
                  {{ decodeURIComponent(his_one.paper_title) }}
                </el-button>
                <el-popover
                  trigger="click"
                  placement="right"
                >
                  <template v-if="isOpenInside">
                    <router-link :to="getPathByPaper(his_one.paper_path, 1, his_one.paper_id)">
                      <el-button type="warning">从头开始</el-button>
                    </router-link>
                    <router-link :to="getPathByPaper(his_one.paper_path, his_one.paper_page, his_one.paper_id)">
                      <el-button type="success">继续阅读</el-button>
                    </router-link>
                  </template>
                  <template v-if="!isOpenInside">
                    <a :href="getPathByPaper_href(his_one.paper_path, 1, his_one.paper_id)" target="_blank">
                      <el-button type="warning">从头开始</el-button>
                    </a>
                    <a
                      :href="getPathByPaper_href(his_one.paper_path, his_one.paper_page, his_one.paper_id)"
                      target="_blank"
                    >
                      <el-button type="success">继续阅读</el-button>
                    </a>
                  </template>
                  <el-button slot="reference" style=""><small style="color: #7b7d86">上次读到第
                    <strong>{{ his_one.paper_page }}</strong> 页</small></el-button>
                </el-popover>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { paper_read_history, paper_one_history } from '@/api/paper_manage'
import Chart from '@/components/Charts/Keyboard_history'
import { mapState } from 'vuex'

export default {
  name: 'DashboardAdmin',
  components: { Chart },
  data() {
    return {
      data_history_paper: [],
      data_history_paper_detail: [],
      // isOpenInside: true,
      centerDialogVisible: false,
      show_detail_paper_id: null
    }
  },
  watch: {
    centerDialogVisible(val, oldVal) {
      if (val === false) {
        this.data_history_paper_detail = []
      }
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    getPathByPaper(paper_path, paper_page, paper_id) {
      return '/paper/paper_reader/' + paper_path + '/' + paper_page + '/' + paper_id
    },
    getPathByPaper_href(paper_path, paper_page, paper_id) { // #page=10&user_ID=1&paper_ID=27
      const href_path = process.env.VUE_APP_BASE_API + 'statics/paper_viewer/index.html?file='
      const fileUrl = process.env.VUE_APP_BASE_API + 'statics/paper_file_save/' + paper_path + '#page=' + paper_page
      const ID_param = '&user_Token=' + this.$store.getters.token + '&paper_ID=' + paper_id
      return href_path + fileUrl + ID_param
    },
    getHistory() {
      paper_read_history({ token: this.$store.getters.token }).then(response => {
        this.data_history_paper = response.data
      })
    },
    showPaperDetail(paper_id) {
      this.show_detail_paper_id = paper_id
      paper_one_history({ token: this.$store.getters.token, paper_id: paper_id }).then(response => {
        this.data_history_paper_detail = response.data
        this.show_detail_paper_id = response.paper_name
        this.centerDialogVisible = true
      })
    }
  },
  computed: {
    ...mapState({
      isOpenInside: state => state.settings.isOpenInside
    })
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

.el-card__body {
  padding: 15px;
}

.el-button {
  margin-right: 3px;
  margin-left: 3px;
}

.his_title {
  word-wrap: break-word;
  color: #7b7d86;
  margin-bottom: 10px;
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
  //height: calc(100vh - 300px);
}
</style>
