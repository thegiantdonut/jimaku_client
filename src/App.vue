<template>
  <div id="app">
    <v-app>
      <v-toolbar dense>
            <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">Jimaku</v-toolbar-title>
            <v-switch :label="`Dark Theme`" v-model="darktheme" @change="goDark"></v-switch>
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
  theme: {
    dark: true,
  },
  data: function () {
    return {
      key1: '',
      apikey: 'AIzaSyDfgzWTkTn_xzB56TuhaLcxtvbggR2uows',
      darktheme: false
    }
  },
  methods: {
    search (event) {
      if (event.keyCode === 13 || event.keyCode === undefined) {
        this.$vuetify.theme.dark = true
        router.push({ name: 'search', query: {q: this.key1} })
      }
    },
    goDark(){
        this.$vuetify.theme.dark = this.darktheme
    }
  },
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
