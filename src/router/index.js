import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Video from '@/components/Video'
import Search from '@/components/Search'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
