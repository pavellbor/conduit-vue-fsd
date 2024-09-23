<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { RoutesPaths } from '@/shared/constants/router'
</script>

<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="RoutesPaths.login">Sign in</RouterLink>
  </li>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="RoutesPaths.register">Sign up</RouterLink>
  </li>
</template>
