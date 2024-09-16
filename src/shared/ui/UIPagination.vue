<script setup lang="ts">
const { currentPage, pageCount } = defineProps<{
  currentPage: number
  pageCount: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
}>()

const selectPage = (page: number) => emit('update:currentPage', page)

const getActiveClass = (page: number) => (page === currentPage ? 'active' : '')
</script>

<template>
  <ul class="pagination">
    <li
      v-for="pageNumber in pageCount"
      :key="pageNumber"
      class="page-item"
      :class="getActiveClass(pageNumber)"
    >
      <a class="page-link" href="#" @click.prevent="selectPage(pageNumber)">{{ pageNumber }}</a>
    </li>
  </ul>
</template>
