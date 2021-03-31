<template>
  <div class="dashboard-editor-container todo_list">
    <TimeClock />
    <todo-list :is_edit="true" :todos="defaultList" @dataChange="dataChange" />
  </div>
</template>

<script>
import TodoList from './components/TodoList'
// import TimeClock from './components/TimeClock'
import { todolist_get_today, todolist_update_today } from '@/api/study_manage'
import TimeClock from '@/views/study_manage/todo_list/components/TimeClock'

export default {
  name: 'DashboardAdmin',
  components: {
    TimeClock,
    TodoList
  },
  data() {
    return {
      defaultList: [
        { text: 'loading...', done: false },
        { text: 'loading...', done: false },
        { text: 'loading...', done: false },
        { text: 'loading...', done: false },
        { text: 'loading...', done: false },
        { text: 'loading...', done: false }
      ],
      activeName: '1',
      dataChangeFlag: true
    }
  },
  watch: {},
  mounted() {
    this.get_todo_list_today()
  },
  methods: {
    get_todo_list_today() {
      todolist_get_today({ token: this.$store.getters.token }).then(response => {
        // console.log(response.date, response.data)
        this.defaultList = response.data
        this.dataChangeFlag = true
      })
    },
    update_todo_list_today() {
      todolist_update_today({ token: this.$store.getters.token, data: this.defaultList }).then(response => {
        console.log('数据更新成功，接下来进行刷新')
        this.get_todo_list_today()
      })
    },
    dataChange() {
      this.update_todo_list_today()
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

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.el-collapse {

}
.el-collapse-item {
  text-indent: 10px;
}

</style>
<style>
.el-collapse-item__content {
  padding-bottom: 0;
}
.todo_list .is-active {
  color: #5c5959;
  font-size: 20px;
}
</style>
