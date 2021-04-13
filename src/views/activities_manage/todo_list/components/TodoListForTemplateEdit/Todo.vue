<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input v-model="todo.text" placeholder="请输入内容" class="template_item_one">
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
  </li>
</template>

<script>
export default {
  name: 'Todo',
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    todo: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo)
    },
    editTodo({ todo, value }) {
      this.$emit('editTodo', { todo, value })
    },
    toggleTodo(todo) {
      this.$emit('toggleTodo', todo)
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit(e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  }
}
</script>
<style lang="scss">
.template_item_one {
  background: rgba(0,0,0,0);
  border: none;
  width: 100%;
  font-size: 2vmin;
  line-height: 50%;
  //padding: 2px;
  padding: 0 2px 2px 2px;
  text-indent: 1vw;
  transition: 0.5s;
}
.template_item_one:focus {
  text-indent: 2vw;
  border-radius: 3px;
  color: #ff0000;
}
</style>
