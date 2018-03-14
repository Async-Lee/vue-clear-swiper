import Vue from 'vue'
import Router from 'vue-router'
import VueClearSwiper from '@/components/VueClearSwiper'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueClearSwiper',
      component: VueClearSwiper
    }
  ]
})
