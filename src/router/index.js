import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../components/Main.vue'

const router = createRouter({
  history: createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/vueHelp',
      name: 'HomeView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
