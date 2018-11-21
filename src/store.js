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
    }
  },
  actions: {}
});
