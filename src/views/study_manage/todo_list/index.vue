<template>
  <div class="dashboard-editor-container todo_list">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="2020年3月12日" name="1" class="title_content collapse-content">
        <todo-list :is_edit="true" :todos="defaultList" />
      </el-collapse-item>
      <el-collapse-item title="2020年3月11日" name="2" class="title_content">
        <todo-list :todos="defaultList" />
      </el-collapse-item>
      <el-collapse-item title="2020年3月10日" name="3" class="title_content">
        <todo-list :todos="defaultList" />
      </el-collapse-item>
      <el-collapse-item title="2020年3月9日" name="4" class="title_content">
        <todo-list :todos="defaultList" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import TodoList from './components/TodoList'

export default {
  name: 'DashboardAdmin',
  components: {
    TodoList
  },
  data() {
    return {
      defaultList: [
        { text: 'aaaaaa帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。', done: false },
        { text: 'fork this repository', done: false },
        { text: 'follow author', done: false },
        { text: 'vue-element-admin', done: true },
        { text: 'vue', done: true },
        { text: 'element-ui', done: true },
        { text: 'axios', done: true },
        { text: 'webpack', done: true }
      ],
      activeName: '1'
    }
  },
  methods: {

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
