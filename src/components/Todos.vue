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
          <li v-for="(data, index) in todos" :key='index'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="markDone(index)"></i>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="holder done">
      <p>These items are done:</p>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li class="done" v-for="(data, index) in done" :key='index'>
            {{ data.todo }}
            <i class="fa fa-check-circle" v-on:click="remove(index)"></i>
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
          { "todo": "Finish Onboarding" },
          { "todo": "Learn Vue" }
        ],
        done: [
          { "todo": "thing 1" },
          { "todo": "thing 2" }
        ]
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
      markDone(id) {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Todos.css" scoped>

</style>
