<template>
  <div class="container">
    <div class="holder">

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
            <i class="fa fa-minus-circle" v-on:click="remove(index)"></i>
          </li>
        </transition-group>
      </ul>
      <p>These are your to do items!</p>
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
        this.todos.splice(id,1);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./Todos.css" scoped>

</style>
