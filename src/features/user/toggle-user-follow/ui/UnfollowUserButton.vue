<script setup lang="ts">
defineProps<{ username: string }>()
defineEmits<{ (e: 'click'): void }>()
</script>

<template>
  <button class="btn btn-sm btn-secondary action-btn" @click="$emit('click')">
    <i class="ion-plus-round"></i>
    &nbsp; Unfollow {{ username }}
  </button>
</template>
