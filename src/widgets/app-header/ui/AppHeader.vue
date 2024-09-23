<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { RoutesNames } from '@/shared/constants/router'
import AuthenticatedNav from './AuthenticatedNav.vue'
import UnauthenticatedNav from './UnauthenticatedNav.vue'

const sessionStore = useSessionStore()
</script>

<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <RouterLink class="navbar-brand" :to="{ name: RoutesNames.home }">conduit</RouterLink>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: RoutesNames.home }">Home</RouterLink>
        </li>
        <AuthenticatedNav v-if="sessionStore.isAuthenticated" :user="sessionStore.user!" />
        <UnauthenticatedNav v-else-if="sessionStore.isAnonymous" />
      </ul>
    </div>
  </nav>
</template>
