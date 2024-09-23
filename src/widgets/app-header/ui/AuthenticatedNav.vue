<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { User } from '@/entities/session'
import { RoutesNames } from '@/shared/constants/router'

defineProps<{ user: User }>()
</script>

<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="{ name: RoutesNames.editor }">
      <i class="ion-compose"></i>&nbsp;New Article
    </RouterLink>
  </li>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="{ name: RoutesNames.settings }">
      <i class="ion-gear-a"></i>&nbsp;Settings
    </RouterLink>
  </li>
  <li class="nav-item">
    <RouterLink
      class="nav-link"
      :to="{
        name: RoutesNames.profile,
        params: { username: user.username }
      }"
    >
      <img :src="user.image" class="user-pic" />
      {{ user.username }}
    </RouterLink>
  </li>
</template>
