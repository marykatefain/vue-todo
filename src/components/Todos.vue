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
          <li v-for="(data, index) in openTodos" :key='index'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="markDone(index)"></i>
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="holder done">
      <p>These items are done:</p>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li class="done" v-for="(data, index) in doneTodos" :key='index'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="markTodo(index)"></i>
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
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
          { "todo": "Finish Onboarding", "done": false },
          { "todo": "Learn Vue", "done": false },
          { "todo": "thing 1", "done": true },
          { "todo": "thing 2", "done": true }
        ],
      }
    },
    computed: {
      openTodos: function() {
        return this.todos.filter(function(todo){
          return todo.done == false;
        });
      },
      doneTodos: function() {
        return this.todos.filter(function(todo){
          return todo.done == true;
        });
      }
    },
    methods: {
      addTodo() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.todos.push({todo: this.todo})
            this.todo = '';
          } else {
            console.log("not valid");
          }
        })
      },
      remove(id) {
        this.todos.splice(id, 1);
      },
      markDone(id) {
        this.todos[id].done = true;
        console.log(this.todos[id].done);
      },
      markTodo(id) {
        this.todos[id].done = false;
        console.log("todo")
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Todos.css" scoped>

</style>
