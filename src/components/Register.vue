<template>
  <v-app>
    <div>
      <h1>Register</h1>
      <sample-component></sample-component>
      <input type="email" name="email" placeholder="email" v-model="email"/>
      <input type="password" name="password" placeholder="password" v-model="password"/>
      <br>
      <button @click="register">Register</button>
    </div>
  </v-app>
</template>

<script>
import auth from '@/srv/auth'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      const response = await auth.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data)
    }
  }
}
</script>

<style scoped>

</style>
