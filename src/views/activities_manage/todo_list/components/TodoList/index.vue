<template>
  <section class="todoapp">
    <!-- header -->
    <!--    <header class="header">-->
    <!--      <input class="new-todo" autocomplete="off" placeholder="添加一个待办事项（回车确定）" @keyup.enter="addTodo">-->
    <!--    </header>-->
    <!-- main section -->
    <section v-show="todos.length" class="main">
 <!--      <input
        id="toggle-all"
        :checked="allChecked"
        class="toggle-all"
        type="checkbox"
        @change="toggleAll({ done: !allChecked })"
      > -->
      <!-- <label for="toggle-all" /> -->
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
    <input v-if="is_edit" class="new-todo" autocomplete="off" placeholder="添加一个待办事项（回车确定）" @keyup.enter="addTodo">
    <!--    &lt;!&ndash; footer &ndash;&gt;-->
    <!--    <footer v-show="todos.length" class="footer">-->
    <!--      <span class="todo-count">-->
    <!--        <strong>{{ remaining }}</strong>-->
    <!--        {{ remaining | pluralize('item') }} left-->
    <!--      </span>-->
    <!--      <ul class="filters">-->
    <!--        <li v-for="(val, key) in filters" :key="key">-->
    <!--          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>-->
    <!--        </li>-->
    <!--      </ul>-->
    <!--      &lt;!&ndash; <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">-->
    <!--        Clear completed-->
    <!--      </button> &ndash;&gt;-->
    <!--    </footer>-->
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
    },
    is_edit: {
      type: Boolean,
      default: false
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
