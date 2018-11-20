<template>
  <div class="container">
    <div class="holder todo">
      <form @submit.prevent="addTodo">

        <input type="text" placeholder="Enter a thing to do..." v-model="todo" v-validate="'min:1'" name="todo">

        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('todo')">{{ errors.first('todo') }}</p>
        </transition>

      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in openTodos" :key='data.id'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="markDone(data.id)"></i>
            <i class="fa fa-minus-circle" v-on:click="remove(data.id)"></i>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="holder done">
      <p>These items are done:</p>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li class="done" v-for="(data, index) in doneTodos" :key='data.id'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="markTodo(data.id)"></i>
            <i class="fa fa-minus-circle" v-on:click="remove(data.id)"></i>
          </li>
        </transition-group>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Todos',
    data() {
      return {
        todo: '',
        todos: [
          { "id": 0, "todo": "Thing 1", "done": false, "active": true },
          { "id": 1, "todo": "Thing 2", "done": false, "active": true },
          { "id": 2, "todo": "Thing 3", "done": true, "active": true },
          { "id": 3, "todo": "Thing 4", "done": true, "active": true }
        ],
      }
    },
    computed: {
      openTodos: function() {
        return this.todos.filter(function(todo){
          return todo.done == false && todo.active;
        });
      },
      doneTodos: function() {
        return this.todos.filter(function(todo){
          return todo.done == true && todo.active;
        });
      }
    },
    methods: {
      addTodo() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.todos.push({
              id: this.todos.length,
              todo: this.todo,
              done: false,
              active: true
            })
            this.todo = '';
          } else {
            console.log("not valid");
          }
        })
      },
      remove(id) {
        this.todos[id].active = false;
      },
      markDone(id) {
        this.todos[id].done = true;
      },
      markTodo(id) {
        this.todos[id].done = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Todos.css" scoped>

</style>
