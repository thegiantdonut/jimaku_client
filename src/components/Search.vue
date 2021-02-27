<template>
  <v-app>
    <li id="result" v-for="res in results" v-bind:key="res.title">
      <vid :title="res.title" :desc="res.desc" :pic="res.pic" :videoid="res.videoid"> </vid>
    </li>
  </v-app>
</template>

<script>
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
  },
  onRowClick: function () {
  }
}
</script>

<style scoped>
h1{
  font-size:111px
}
.v-text-field{
      width: 800px;
}
#wrapper{
  padding:0px,100px
}
#id{
  padding-left:1001px
}
</style>
