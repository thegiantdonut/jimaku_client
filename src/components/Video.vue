<template>
  <v-app>
    <v-container>
      <div id="wrapper">
        <youtube videoid="lG0Ys-2d4MA" ref="youtube"/>
        <v-btn @click="go" dark>Fetch</v-btn>
        <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="100"
        :show-select="true"
        :single-select="true"
        :fixed-header="true"
        @click:row="onRowClick"
        ></v-data-table>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueYoutube from 'vue-youtube'
import translate from 'translate'
const convert = require('xml-js')
Vue.use(VueYoutube)
Vue.use(Vuetify)
translate.engine = 'google'
translate.key = 'AIzaSyBriX23hQ124vGeyo4_NOVwvgLlPkKxDqQ'

export default {
  data () {
    return {
      headers: [
        { text: 'Time', value: 'time', width: 100 },
        { text: 'Original', value: 'original' },
        { text: 'Translation', value: 'trans' }
      ],
      items: [],
      videourl: 'https://www.youtube.com/watch?v=asnQGz7BdfI',
      videoid: 'asnQGz7BdfI',
      dark: true
    }
  },
  methods: {
    go () {
      let id = this.$route.query.videoid
      this.items = []
      this.$refs.youtube.player.loadVideoById(id)
      const lang = 'en'
      let result
      fetch(`http://video.google.com/timedtext?type=list&v=${id}`)
        .then(response => response.text())
        .then(text => {
          result = convert.xml2json(text, {compact: true, spaces: 4})
        })

      fetch(`http://video.google.com/timedtext?type=track&v=${id}&lang=${lang}`)
        .then(response => response.text())
        .then(text => {
          result = convert.xml2json(text, {compact: true, spaces: 4})
          result = JSON.parse(result)
          console.log(result)
          for (let i = 0; i < result.transcript.text.length; i++) {
            // translate(result.transcript.text[i]._text, 'ja')
            //  .then((res) => {
            //    this.items.push({time: result.transcript.text[i]._attributes.start,
            //    original: result.transcript.text[i]._text, trans: res})
            //  })
            this.items.push({
              time: result.transcript.text[i]._attributes.start,
              original: result.transcript.text[i]._text,
              trans: 'test'})
          }
        })
    }
  },
  beforeMount () {
  },
  onRowClick: function () {
  }
}
</script>

<style scoped>
h1{
  font-size:111px
}
#wrapper{
  padding:0px,100px
}
</style>
