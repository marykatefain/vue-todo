import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: 'My To Do List',
    todos: [
      { "id": 0, "todo": "Thing 1", "done": false, "active": true },
      { "id": 1, "todo": "Thing 2", "done": false, "active": true },
      { "id": 2, "todo": "Thing 3", "done": true, "active": true },
      { "id": 3, "todo": "Thing 4", "done": true, "active": true }
    ],
  },
  getters: {
    countTodos: state => {
      return state.todos.length
    }
  },
  mutations: {
    ADD_TODO: (state, todo) => {
      state.todos.push({
        id: state.todos.length,
        todo: todo,
        done: false,
        active: true
      })
      console.log(state);
    },
    REMOVE_TODO: (state, id) => {
      state.todos[id].active = false;
    },
    COMPLETE_TODO: (state, id) => {
      state.todos[id].done = true;
    },
    UNCOMPLETE_TODO: (state, id) => {
      state.todos[id].done = false;
    }
  },
  actions: {
    addTodo: (context, todo) => {
      context.commit("ADD_TODO", todo)
    },
    removeTodo: (context, id) => {
      context.commit("REMOVE_TODO", id)
    },
    completeTodo: (context, id) => {
      context.commit("COMPLETE_TODO", id)
    },
    uncompleteTodo: (context, id) => {
      context.commit("UNCOMPLETE_TODO", id)
    }
  }
});
