import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../../views/HomeView.vue'

const mockedRoutes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../../views/SearchView.vue')
  },
  {
    path: '/show/:id',
    name: 'show',
    component: () => import('../../views/ShowView.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../../views/FavoritesView.vue')
  }
]

export function createMockRouter() {
  return createRouter({
    history: createWebHistory(),
    routes: mockedRoutes
  })
}
