import Vue from 'vue'
import Router from 'vue-router'
import Catalog from '@/components/Catalog'
import Book from '@/components/Book'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/book/:id',
      name: 'Book',
      component: Book
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin
    }
  ]
})
