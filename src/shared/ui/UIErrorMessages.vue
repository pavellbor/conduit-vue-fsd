<script setup lang="ts">
defineProps<{ messages: string[] }>()
</script>

<template>
  <ul class="error-messages">
    <li v-for="message in messages" :key="message">{{ message }}</li>
  </ul>
</template>
