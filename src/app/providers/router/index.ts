import { createRouter, createWebHistory } from 'vue-router'
import { RoutesPaths } from '@/shared/constants/router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: RoutesPaths.home, name: 'home', component: () => import('@/pages/home') },
    {
      path: RoutesPaths.login,
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      path: RoutesPaths.register,
      name: 'register',
      component: () => import('@/pages/register')
    },
    {
      path: RoutesPaths.settings,
      name: 'settings',
      component: () => import('@/pages/settings')
    },
    {
      path: `${RoutesPaths.editor}/:slug`,
      name: 'editor',
      component: () => import('@/pages/editor')
    },
    {
      path: `${RoutesPaths.article}/:slug`,
      name: 'article',
      component: () => import('@/pages/article')
    },
    {
      path: `${RoutesPaths.profile}/:slug`,
      name: 'profile',
      component: () => import('@/pages/profile')
    }
  ]
})
