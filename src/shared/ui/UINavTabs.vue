<script setup lang="ts">
type Tab = {
  value: string
  label: string
}

const { tabs, modelValue } = defineProps<{
  tabs: Tab[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleTabClick = (selectedTab: string) => {
  if (selectedTab !== modelValue) {
    emit('update:modelValue', selectedTab)
  }
}
</script>

<template>
  <ul class="nav nav-pills outline-active">
    <li v-for="tab in tabs" :key="tab.value" class="nav-item">
      <a
        class="nav-link"
        :class="{ active: tab.value === modelValue }"
        href="#"
        @click.prevent="handleTabClick(tab.value)"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>
</template>
