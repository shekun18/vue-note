import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/notebooks'
    },
    {
      path: '/login',
      component: ()=>import('./views/login')
    },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'notebooks',
          component: ()=> import('./views/notebooks')
        },
        {
          path: 'notes',
          component: () => import('./views/notes')
        },
        {
          path: 'trash',
          component: () => import('./views/trash')
        },
        {
          path: 'summary',
          component: () => import('./views/summary')
        },
        {
          path: 'chart',
          component: () => import('./views/chart/chart')
        },
        {
          path: '403',
          component: ()=> import('./components/403')
        },
        {
          path: '*',
          component: ()=> import('./components/404')
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
