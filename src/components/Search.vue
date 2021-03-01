<template>
  <v-app>
    <v-container>
      <v-card>
        <p>ここでは動画を表示しています</p>
      </v-card>
      <v-virtual-scroll :items="results" :item-height="300">
        <template v-slot:default="{item}">
          <v-list-item @click="$router.push({ path: '/video', query: { videoid: item.videoid } })" >
              <v-img max-width="400" max-height="300" v-bind:src="item.pic"></v-img>
              <p>{{item.title}}</p>
              <p>{{item.desc}}</p>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-container>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import Video from './Video.vue'
Vue.use(VueYoutube)
const apikey = 'AIzaSyDxS2jKXrE89JE0q2Gmw80CVFu38pxhL6k'
let result, lang
export default {
  props: {
    apikey
  },
  components: {
    Video
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
