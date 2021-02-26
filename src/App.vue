<template>
  <div id="app">
    <v-app>
      <v-toolbar dense>
            <v-toolbar-title>Jimaku</v-toolbar-title>
            <v-text-field
                    v-model="key1"
                    hide-details
                    filled
                    rounded
                    dense
                    single-line
                    v-on:keydown.enter="search"
                    append-icon="mdi-magnify" class="shrink mx-4">
            </v-text-field>
            <v-btn @click="search" rounded>Go</v-btn>
        </v-toolbar>
      <router-view ref="cld"></router-view>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import router from './router'

Vue.use(Vuetify)

export default ({
  name: 'app',
  data: function () {
    return {
      key1: ''
    }
  },
  methods: {
    search (event) {
      if (event.keyCode === 13 || event.keyCode === undefined) {
        router.push({ name: 'search', query: {q: this.key1} })
      }
    }
  }
})

</script>

<style scoped>
.v-text-field{
  width: 800px;
  left:200px;
}
#go-button{
  right:100px;
}
</style>

<style>

</style>
