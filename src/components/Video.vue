<template>
  <v-app>
    <v-container>
      <v-row>
      <v-col>
      <v-card>
      <youtube videoid="lG0Ys-2d4MA" ref="youtube" :resize="true" @playing="playing" :playerVars="playerVars"/>
      </v-card>
      </v-col>
      <v-col>
        <v-card elevation="16">
          <v-virtual-scroll
          :items="captionlists"
          :item-height="50"
          height="350"
          >
          <template v-slot:default="{item}">
            <v-list-item @click="clicked(item.time)">
              <v-list-item-content>
                <v-list-item-title>{{ item.original }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.translated }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          </v-virtual-scroll>
          </v-card>
        </v-col>
        </v-row>
        <v-row>
        <v-col>
        <v-card id="captionbox">
          <v-card-title>{{captionbox[0].original}}</v-card-title>
          <v-card-subtitle>{{captionbox[0].translated}}</v-card-subtitle>
        </v-card>
        </v-col>
        </v-row>
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
      playerVars: {
        // controls: 0,
        showinfo: 0,
        modestbranding: 1,
        fs:0
      },
      videoid: 'asnQGz7BdfI',
      // for vueyoutube
      captionlists: [],
      captionbox: [
        { original: '',
          translated: '',
        }
      ],
      
    }
  },
  mounted () {
    this.GetSubtitle()
  },
  methods: {
    clicked(t){
      this.$refs.youtube.player.seekTo(t);
    },
    playing () {
      setInterval(() => {
        return this.$refs.youtube.player.getCurrentTime().then(result => {
          let temp = 99999999
          for(let i=0;i < this.captionlists.length;i++){
            if(this.captionlists[i].time < result + 0.5){
              temp = i
            }else{
              break
            }
          }
          if(temp===99999999){
            this.captionbox[0].original = ''
            this.captionbox[0].translated = ''
          }else{
            this.captionbox[0].original = this.captionlists[temp].original
            this.captionbox[0].translated = this.captionlists[temp].translated
          }
          
        })
      }, 200);
    },
    GetSubtitle () { 
      let id = this.$route.query.videoid
      this.captionlists = []
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
            //    original: result.transcript.text[i]._text, translated: res})
            //  })
            this.captionlists.push({
              index: i,
              time: result.transcript.text[i]._attributes.start,
              original: result.transcript.text[i]._text,
              translated: 'test'})
          }
        })
    }
  },
}
</script>

<style scoped>
</style>
