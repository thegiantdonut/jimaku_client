<template>
  <v-app>
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
