<script setup lang="ts">
defineProps<{ favoritesCount: number }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="btn btn-primary btn-sm pull-xs-right" @click="$emit('click')">
    <i class="ion-heart"></i> {{ favoritesCount }}
  </button>
</template>
