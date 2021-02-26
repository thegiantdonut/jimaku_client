<template>
  <v-app>
    <v-container>
      <div class="flex">
        <img class="item" v-bind:src="pic">
        <router-link class="title"  :to="{ path: 'video', query: { videoid: videoid }}">{{ title }}</router-link>
        <p class="description">{{desc}}</p>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'vid',
  props: ['title', 'pic', 'desc', 'videoid']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex{
    display: flex;
    padding-top: 50px;
}
.title{
  padding-left:40px;
  font-size:40px;
}
.description{
  display:block
}
</style>
