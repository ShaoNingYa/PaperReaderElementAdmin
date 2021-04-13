<template>
  <div class="block">
    <el-timeline v-loading="loading_history" element-loading-text="正在加载待办历史...">
      <el-timeline-item v-for="his_one in defaultHistoryList" color="#698eff" :timestamp="his_one.date" placement="top">
        <el-card>
          <el-button
            type="primary"
            plain
            icon="el-icon-edit"
            size="mini"
            style="margin-bottom: 10px"
            @click="push_cur_data(his_one.data)"
          >使用此历史待办
          </el-button>
          <div v-for="todo_one in his_one.data" class="todo_one">
            <span v-if="todo_one.done === true" style="color: #88e200;" class="todo_one_status">已完成 </span>
            <span v-else style="color: firebrick;" class="todo_one_status">未完成 </span>
            <el-tooltip placement="left-end">
              <div slot="content">
                <div class="todo_one_add" @click="push_cur_data_one(todo_one)">添加到今日待办中</div>
              </div>
              <span style="padding-left: 6px; ">{{ todo_one.text }}</span>
              <!--              display: inline-block; width: calc(100% - 50px)-->
            </el-tooltip>
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { todolist_get_history } from '@/api/study_manage'

export default {
  name: 'TodoHistory',
  data() {
    return {
      defaultHistoryList: [{ text: 'loading...', done: false }],
      loading_history: true

    }
  },
  mounted() {
    this.get_todo_list_history()
  },
  methods: {
    get_todo_list_history() {
      todolist_get_history({ token: this.$store.getters.token }).then(response => {
        // console.log(response.data)
        this.defaultHistoryList = response.data
        this.loading_history = false
      })
    },
    push_cur_data(data_one) {
      // console.log(data_one)
      this.$emit('dataChange', data_one)
    },
    push_cur_data_one(data_one_item) {
      // console.log(data_one_item)
      this.$emit('dataAddOne', data_one_item)
    }
  }
}
</script>

<style scoped>
.todo_one {
  /*border-bottom: solid 1px #e0dede;*/
  border-radius: 3px;
  transition: 0.5s;
  padding: 2px;
  /*cursor: pointer;*/
}

.todo_one:hover {
  background: #c4c4c4;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}

.todo_one_status {
  /*border-right: solid 1px #e0dede;*/
  width: 50px;
  border: solid 1px #e0dede;
  display: inline-block;
  text-align: center;
  color: #698eff;
}

.todo_one_add {
  cursor: pointer;
  opacity: 0.5;
  transition: 0.5s;
}

.todo_one_add:hover {
  opacity: 1;
}
</style>
