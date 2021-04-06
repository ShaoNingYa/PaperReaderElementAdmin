<template>
  <div class="main_content">
    <TimeClock/>
    <todo-list v-loading="loading_today" element-loading-text="正在加载今日待办..." :is_edit="true" :todos="defaultList"
               @dataChange="dataChange"/>
    <ToDoTemplate style="margin-top: 50px; width: 95%" @dataChange="dataChangeFrom" @dataAddOne="dataChangeFromOne"/>
    <todo-history style="margin-top: 50px; width: 95%" @dataChange="dataChangeFrom" @dataAddOne="dataChangeFromOne"/>
    <div class="placeholder_block"/>
    <transition name="el-fade-in-linear">
      <div v-if="is_sub_todo_show" v-loading="loading_today" class="sub_todo_show">
        <div v-for="todo_one in defaultList" class="todo_one">
          <el-checkbox v-model="todo_one.done" label="禁用">{{ todo_one.text }}</el-checkbox>
          <!--          <span style="padding-left: 6px">{{ todo_one.text }}</span>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import ToDoTemplate from '@/views/study_manage/todo_list/components/ToDoTemplate'
import { todolist_get_today, todolist_update_today } from '@/api/study_manage'
import TimeClock from '@/views/study_manage/todo_list/components/TimeClock'
import TodoHistory from '@/views/study_manage/todo_list/components/todoHistory'
import $ from 'jquery'

export default {
  name: 'DashboardAdmin',
  components: {
    TodoHistory,
    TimeClock,
    ToDoTemplate,
    TodoList
  },
  data() {
    return {
      defaultList: [{ text: 'loading...', done: false }],
      dataChangeFlag: true,
      is_sub_todo_show: false,
      loading_today: true
    }
  },
  watch: {},
  mounted() {
    this.get_todo_list_today()
    // 实现APP的高度占满全屏
    $('.main_content').height($(window).height())
    $('.app-main').height($(window).height() - 85)
    window.onresize = () => {
      return (() => {
        $('.main_content').height($(window).height())
        $('.app-main').height($(window).height() - 85)
      })()
    }
    window.addEventListener('scroll', this.scrollHandle, true) // 监听 监听元素是否进入/移出可视区域
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandle, true)
  },
  methods: {
    get_todo_list_today() {
      todolist_get_today({ token: this.$store.getters.token }).then(response => {
        // console.log(response.date, response.data)
        this.defaultList = response.data
        this.dataChangeFlag = true
        this.loading_today = false
      })
    },
    update_todo_list_today() { // 把有变化的数据上传到数据库并重新拉取
      todolist_update_today({ token: this.$store.getters.token, data: this.defaultList }).then(response => {
        // console.log('数据更新成功，接下来进行刷新')
        this.get_todo_list_today()
      })
    },
    dataChange() {
      this.update_todo_list_today()
    },
    dataChangeFrom(data) {
      this.defaultList = data
      this.update_todo_list_today()
    },
    dataChangeFromOne(data) {
      this.defaultList.push(data)
      this.update_todo_list_today()
    },
    scrollHandle() { // 监控组件移出可视区域
      const offset = $('.todoapp')[0].getBoundingClientRect()
      const offsetTop = offset.top
      const offsetBottom = offset.bottom
      this.is_sub_todo_show = !(offsetTop <= window.innerHeight && offsetBottom >= 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.main_content {
  overflow-y: scroll;
}

.placeholder_block {
  width: 100%;
  height: 100px;
  //background: red;
}

.sub_todo_show {
  display: inline-block;
  //min-height: 50px;
  max-height: 30%;
  max-width: 30%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  right: 30px;
  bottom: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: 1s;
  border-radius: 3px;
  overflow-x: hidden;
  text-overflow: ellipsis; /*内容超出宽度时隐藏超出部分的内容*/
  white-space: nowrap;
}
</style>
