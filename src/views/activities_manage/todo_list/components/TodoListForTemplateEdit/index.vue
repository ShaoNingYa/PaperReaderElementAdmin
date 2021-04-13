<template>
  <section class="todoapp">
    <section v-show="todos.length" class="main">
      <ul class="todo-list">
        <todo
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :todo="todo"
          @toggleTodo="toggleTodo"
          @editTodo="editTodo"
          @deleteTodo="deleteTodo"
        />
      </ul>
    </section>
    <label>
      <input class="new-todo" autocomplete="off" placeholder="添加一个（回车确定）" @keyup.enter="addTodo" style="padding: 0 0 0 2vmin">
    </label>
  </section>
</template>

<script>
import Todo from './Todo.vue'

const STORAGE_KEY = 'todos'
const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}
const defalutList = []
export default {
  components: { Todo },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  props: {
    todos: {
      type: Array,
      default: defalutList
    }
  },
  data() {
    return {
      visibility: 'all',
      filters
      // todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      // todos: defalutList
    }
  },
  computed: {
    allChecked() {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining() {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    },
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.todos.push({
          text,
          done: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
      this.$emit('dataChange')
    },
    toggleTodo(val) {
      val.done = !val.done
      this.setLocalStorage()
      this.$emit('dataChange')
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
      this.setLocalStorage()
      this.$emit('dataChange')
    },
    editTodo({ todo, value }) {
      todo.text = value
      this.setLocalStorage()
      this.$emit('dataChange')
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.todos.forEach(todo => {
        todo.done = done
        this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
@import './index.scss';
.new-todo {
  transition: 0.5s;
}
.new-todo:focus {
  background: #a7a7a7;
  border-radius: 3px;
}
</style>
<style>
input::-webkit-input-placeholder {
  color: #dcdcdc;
}

input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #dcdcdc;
}

input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #dcdcdc;
}

input:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #dcdcdc;
}
</style>
