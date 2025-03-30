<template>
  <div>
    <h1>Todo App</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new todo" />

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ completed: todo.completed }" @click="toggleCompletion(todo.id)">
          {{ todo.title }}
        </span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { todo_backend } from '../agent';

export default {
  setup() {
    const todos = ref([]);
    const newTodo = ref('');

    const fetchTodos = async () => {
      todos.value = await todo_backend.getTodos();
    };

    const addTodo = async () => {
      if (newTodo.value.trim().length === 0) {
        return;
      }
      await todo_backend.addTodo(newTodo.value);
      newTodo.value = '';
      fetchTodos();
    };

    const toggleCompletion = async (id) => {
      await todo_backend.toggleTodoCompletion(id);
      fetchTodos();
    };

    const deleteTodo = async (id) => {
      await todo_backend.deleteTodo(id);
      fetchTodos();
    };

    onMounted(fetchTodos);

    return {
      todos,
      newTodo,
      addTodo,
      toggleCompletion,
      deleteTodo,
    };
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>