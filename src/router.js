import Vue from 'vue'
import Router from 'vue-router'
const Content = () => import(/* webpackChunkName: "content" */ './views/Content')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'content',
      component: Content
    },
  ]
})
