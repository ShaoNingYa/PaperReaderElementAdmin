<template>
  <div class="block">
    <el-timeline v-loading="loading_template" element-loading-text="正在加载待办模板...">
      <el-timeline-item
        v-for="his_one in defaultTemplateList"
        color="#0bbd87"
        :timestamp="his_one.title"
        placement="top"
      >
        <el-card>
          <div class="panel_show">
            <el-button
              type="success"
              plain
              icon="el-icon-thumb"
              size="mini"
              style="margin-bottom: 10px; "
              @click="push_cur_data(his_one.data)"
            >使用
            </el-button>
            <el-button
              type="warning"
              plain
              icon="el-icon-edit"
              size="mini"
              style="margin-bottom: 10px; float: right"
              @click="edit_cur_template(his_one)"
            />
            <el-button
              type="danger"
              plain
              icon="el-icon-delete"
              size="mini"
              style="margin-bottom: 10px; float: right"
              @click="del_cur_template(his_one)"
            />
            <div v-for="todo_one in his_one.data" class="todo_one">
              <span style="color: #d9d766;" class="todo_one_status">TODO </span>
              <el-tooltip placement="left-end">
                <div slot="content"><div class="todo_one_add" @click="push_cur_data_one(todo_one)">添加到今日待办中</div></div>
                <span style="padding-left: 6px">{{ todo_one.text }}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="panel_edit" />
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-dialog
      :title="templateName"
      :visible.sync="dialogVisibleForEdit"
      width="80%"
    >
      <!--      :before-close="handleClose"-->
      <ToDoTemplateEdit :todos="dataWillEdit" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_cur_template">取 消</el-button>
        <el-button type="primary" @click="update_cur_template">确 定</el-button>
        <!--        <el-button @click="update_cur_template">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { todolist_get_template, todolist_update_template } from '@/api/study_manage'
import ToDoTemplateEdit from '@/views/study_manage/todo_list/components/TodoListForTemplateEdit'

export default {
  name: 'TodoTemplate',
  components: {
    ToDoTemplateEdit
  },
  data() {
    return {
      defaultTemplateList: [{ text: 'loading...', done: false }],
      dialogVisibleForEdit: false,
      loading_template: true,
      dataWillEdit: [],
      templateName: '未命名模板'
    }
  },
  watch: {
    dialogVisibleForEdit: {
      handler(val, val_old) {
        if (val_old) {
          this.get_todo_list_template()
        }
      }
    }
  },
  mounted() {
    this.get_todo_list_template()
  },
  methods: {
    get_todo_list_template() {
      todolist_get_template({ token: this.$store.getters.token }).then(response => {
        // console.log(response.data)
        this.defaultTemplateList = response.data
        this.loading_template = false
      })
    },
    push_cur_data(data_one) {
      // console.log(data_one)
      this.$emit('dataChange', data_one)
    },
    push_cur_data_one(data_one_item) {
      // console.log(data_one_item)
      this.$emit('dataAddOne', data_one_item)
    },
    edit_cur_template(data_one) {
      this.dialogVisibleForEdit = true
      this.templateName = '' + data_one.title
      this.dataWillEdit = data_one.data
      // console.log('编辑' + data_one)
    },
    update_cur_template() {
      this.dialogVisibleForEdit = false
      todolist_update_template({
        token: this.$store.getters.token,
        title: this.templateName,
        data: this.dataWillEdit
      }).then(response => {
        this.get_todo_list_template()
        console.log('更新成功')
      })
    },
    cancel_cur_template() {
      this.dialogVisibleForEdit = false
      this.get_todo_list_template()
      console.log('取消更新')
    },
    del_cur_template() {
      // this.get_todo_list_template()
      console.log('删除此模板')
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
