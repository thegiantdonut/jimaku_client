<template>
  <v-app>
    <vid :title="title" :desc="desc" :pic="pic" :videoid="videoid"> </vid>
  </v-app>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import vid from './VideoBox'
Vue.use(VueYoutube)
const apikey = 'AIzaSyBriX23hQ124vGeyo4_NOVwvgLlPkKxDqQ'

let result, lang
export default {
  components: {
    vid
  },
  data () {
    return {
      title: 'test',
      desc: 'desc',
      pic: 'picurl',
      videoid: 'videoid'
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
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
                this.title = result.items[0].snippet.title
                this.desc = result.items[0].snippet.description.slice(0, 100)
                this.pic = result.items[0].snippet.thumbnails.medium.url
                this.videoid = result.items[0].id
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
</style>
