<template>
    <v-app>
      <v-toolbar dense>
        <v-row >
          <v-col>
            <v-toolbar-title style="cursor: pointer" @click="$router.push('/')">Jimaku</v-toolbar-title>
          </v-col>
          <v-col>
            <v-switch :label="`Dark Theme`" v-model="darktheme" @change="goDark"></v-switch>
          </v-col>
          <v-col cols=6>
            <v-text-field
                    v-model="key1"
                    hide-details
                    filled
                    rounded
                    dense
                    single-line
                    v-on:keydown.enter="search">
            </v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="search" rounded>Go</v-btn>
          </v-col>
          <v-col>
          </v-col>
        </v-row>
        </v-toolbar>
      <router-view ref="cld"></router-view>
    </v-app>
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

</style>

<style>

</style>
