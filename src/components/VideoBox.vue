<template>
  <v-app>
    <v-container>
    <v-row>
      <v-col>
        <v-img v-bind:src="pic"></v-img>
        </v-col>
        <v-col>
        <router-link :to="{ path: 'video', query: { videoid: videoid }}">{{ title }}</router-link>
        <p>{{desc}}</p>
        </v-col>
    </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'vid',
  props: ['title', 'pic', 'desc', 'videoid']
}
</script>

<style scoped>

</style>
