import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { RoutesNames, RoutesPaths } from '@/shared/constants/router'

declare module 'vue-router' {
  interface RouteMeta {
    accessLevel?: 'authenticated' | 'anonymous' | 'public'
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: RoutesPaths.home,
    name: 'home',
    component: () => import('@/pages/home'),
    meta: {
      accessLevel: 'public'
    }
  },
  {
    path: RoutesPaths.login,
    name: 'login',
    component: () => import('@/pages/login'),
    meta: {
      accessLevel: 'anonymous'
    }
  },
  {
    path: RoutesPaths.register,
    name: 'register',
    component: () => import('@/pages/register'),
    meta: {
      accessLevel: 'anonymous'
    }
  },
  {
    path: RoutesPaths.settings,
    name: 'settings',
    component: () => import('@/pages/settings'),
    meta: {
      accessLevel: 'authenticated'
    }
  },
  {
    path: `${RoutesPaths.editor}/:slug?`,
    name: 'editor',
    component: () => import('@/pages/editor'),
    meta: {
      accessLevel: 'authenticated'
    }
  },
  {
    path: `${RoutesPaths.article}/:slug`,
    name: 'article',
    component: () => import('@/pages/article'),
    props: true,
    meta: {
      accessLevel: 'public'
    }
  },
  {
    path: `${RoutesPaths.profile}/:username`,
    name: 'profile',
    component: () => import('@/pages/profile'),
    props: true,
    meta: {
      accessLevel: 'public'
    }
  }
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore()

  if (to.meta.accessLevel === 'authenticated' && sessionStore.isAnonymous) {
    next({ name: RoutesNames.login })
  } else if (to.meta.accessLevel === 'anonymous' && sessionStore.isAuthenticated) {
    next({ name: RoutesNames.home })
  } else {
    next()
  }
})
