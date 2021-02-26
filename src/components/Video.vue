<template>
  <v-app>
    <v-container>
      <div id="wrapper">
        <youtube videoid="lG0Ys-2d4MA" ref="youtube"/>
          <virtual-list style="height: 360px; overflow-y: auto;" 
            :data-key="'uid'"
            :data-sources="items"
            :data-component="itemComponent"
          />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueYoutube from 'vue-youtube'
import translate from 'translate'
import VirtualList from 'vue-virtual-scroll-list'

const convert = require('xml-js')
Vue.use(VueYoutube)
Vue.use(Vuetify)
Vue.component('virtual-list', VirtualList)
translate.engine = 'google'
translate.key = 'AIzaSyDxS2jKXrE89JE0q2Gmw80CVFu38pxhL6k'
// AIzaSyBriX23hQ124vGeyo4_NOVwvgLlPkKxDqQ
export default {
  data () {
    return {
      headers: [
        { text: 'Time', value: 'time', width: 100 },
        { text: 'Original', value: 'original' },
        { text: 'Translation', value: 'trans' }
      ],
      items: [],
      itemComponent: Item,
        itemo: [{uid: 'unique_1', text: 'abc'}, {uid: 'unique_2', text: 'xyz'}, ...],
      videourl: 'https://www.youtube.com/watch?v=asnQGz7BdfI',
      videoid: 'asnQGz7BdfI',
      dark: true
    }
  },
  mounted () {
    this.go()
  },
  methods: {
    go () {
      console.log('go is called')
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
