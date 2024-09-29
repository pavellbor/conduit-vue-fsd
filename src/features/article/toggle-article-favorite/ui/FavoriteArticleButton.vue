<script setup lang="ts">
defineProps<{ favoritesCount: number }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="btn btn-outline-primary btn-sm" @click="$emit('click')">
    <i class="ion-heart"></i> <slot :favoritesCount="favoritesCount">{{ favoritesCount }}</slot>
  </button>
</template>
