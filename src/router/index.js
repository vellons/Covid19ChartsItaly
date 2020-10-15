import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from '../components/Index'
import Error404 from '../components/Error404'
import Home from '../components/Home'
import Info from '../components/Info'


const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '*',
      name: 'error404',
      component: Error404,
    },
    {
      path: '/',
      component: Index,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'info',
          name: 'info',
          component: Info,
        },
      ]
    },
  ]
});

export default router;
