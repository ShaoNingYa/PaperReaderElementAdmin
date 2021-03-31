<template>
  <div>
    <TimeClock />
    <todo-list :is_edit="true" :todos="defaultList" @dataChange="dataChange" />
  </div>
</template>

<script>
import TodoList from './components/TodoList'
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
      defaultList: [{ text: 'loading...', done: false }],
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
        // console.log('数据更新成功，接下来进行刷新')
        this.get_todo_list_today()
      })
    },
    dataChange() {
      this.update_todo_list_today()
    }
  }
}
</script>

<style lang="scss" scoped></style>
