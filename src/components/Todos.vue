<template>
  <div class="container">

    <h1>{{ title }}</h1>

    <div class="holder todo">
      <form @submit.prevent="addTodos">

        <input type="text" placeholder="Enter a thing to do..." v-model="newTodo" v-validate="'min:1'" name="todo">

        <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('todo')">{{ errors.first('todo') }}</p>
        </transition>

      </form>

      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in openTodos" :key='data.id'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="completeTodos(data.id)"></i>
            <i class="fa fa-minus-circle" v-on:click="removeTodos(data.id)"></i>
          </li>
        </transition-group>
      </ul>
      <h2>{{ countTodos }} Total</h2>
    </div>

    <div class="holder done">
      <p>These items are done:</p>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li class="done" v-for="(data, index) in doneTodos" :key='data.id'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="uncompleteTodos(data.id)"></i>
            <i class="fa fa-minus-circle" v-on:click="removeTodos(data.id)"></i>
          </li>
        </transition-group>
      </ul>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Todos',
    data() {
      return {
        newTodo: '',
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
      },
      ...mapState([
        'title',
        'todos'
      ]),
      ...mapGetters([
        'countTodos'
      ])
    },
    methods: {
      // ...mapMutations([
      //   'ADD_TODO'
      // ]),
      ...mapActions([
        'removeTodo',
        'completeTodo',
        'uncompleteTodo',
        'addTodo'
      ]),
      addTodos: function(todo) {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log(todo);
            this.addTodo(this.newTodo)
            // this.ADD_TODO(this.newTodo)
            this.newTodo = ''
          } else {
            console.log("not valid");
          }
        })
      },
      removeTodos: function(id) {
        this.removeTodo(id)
      },
      completeTodos: function(id) {
        this.completeTodo(id)
      },
      uncompleteTodos: function(id) {
        this.uncompleteTodo(id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Todos.css" scoped>

</style>
