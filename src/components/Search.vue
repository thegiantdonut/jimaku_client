<template>
  <v-app>
    <v-container>
      <v-virtual-scroll :items="results" :item-height="300" height="1350">
        <template v-slot:default="{item}">
          <v-list-item @click="$router.push({ path: '/video', query: { videoid: item.videoid } })" >
              <v-img v-bind:src="item.pic"></v-img>
              <v-list-title>{{item.title}}</v-list-title>
              <v-list-subtitle>{{item.desc}}</v-list-subtitle>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-container>
  </v-app>
</template>

<script>
//<v-list v-for="res in results" v-bind:key="res.title">
      
     // </v-list>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import vid from './VideoBox'
Vue.use(VueYoutube)
const apikey = 'AIzaSyDxS2jKXrE89JE0q2Gmw80CVFu38pxhL6k'
let result, lang
export default {
  props: {
    apikey
  },
  components: {
    vid
  },
  data () {
    return {
      results: []
    }
  },
  clicked () {

  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.results = []
      let id = this.$youtube.getIdFromUrl(this.$route.query.q)
      if (id != null) {
        // its url
      }
      let query = this.$route.query.q
      lang = 'ja'
      fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey}&relevanceLanguage=${lang}&videoCaption=closedCaption&type=video&q=${query}`)
        .then(response => response.text())
        .then(text => {
          result = JSON.parse(text)
          for (let i = 0; i < result.items.length; i++) {
            let videoid = result.items[i].id.videoId
            fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apikey}&id=${videoid}&part=snippet`)
              .then(response => response.text())
              .then(text => {
                result = JSON.parse(text)
                this.results.push({
                  title: result.items[0].snippet.title,
                  desc: result.items[0].snippet.description.slice(0, 100),
                  pic: result.items[0].snippet.thumbnails.medium.url,
                  videoid: result.items[0].id
                })
              })
          }
        })
    }
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style scoped>

</style>
