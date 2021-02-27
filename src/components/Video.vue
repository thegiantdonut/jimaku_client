<template>
  <v-app>
    <v-container>
      <div id="wrapper">
        <youtube videoid="lG0Ys-2d4MA" ref="youtube"/>
        <v-card
        id="scroll"
        elevation="16"
        max-width="400"
        class="mx-auto"
        >
        <v-virtual-scroll
          
          :items="itemo"
          :item-height="65"
          height="600"
        >
          <template v-slot="{ item }">
            <v-list-item :key="item.id" :value="item.id">
              <v-list-item-content>
                <v-list-item-title>
                  {{ items[0].original }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ items[0].trans }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
        </v-card>
        <v-card id="captioncard" max-width = 640 min-height = 180>
          <v-card-title>{{captions[0].original}}</v-card-title>
          <v-card-subtitle>{{captions[0].translated}}</v-card-subtitle>
        </v-card>
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
      captions: [
        { original: 'this is original,this is original,this is original,this is originalthis is original,this is original,this is original',
          translated: 'これは訳文ですこれは訳文ですこれは訳文ですこれは訳文ですこれは訳文ですこれは訳文ですこれは訳文ですこれは訳文です',
        }
      ],
      currenttime: 90,
      videoid: 'asnQGz7BdfI',
      dark: true,
      itemo: Array.from({length: 50}, (x, i) => i+1).map(i => ({
      id: i,
    }))
    }
  },
  computed: {
    items () {
      return Array.from({ length: this.length }, (k, v) => v + 1)
    },
    length () {
      return 7000
    },
  },
  mounted () {
    this.go()
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
#captioncard{
  bottom : 550px
}
#scroll{
  display: flex;
  left:300px;
  bottom:370px;
  
}
</style>
