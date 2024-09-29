<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArticleGlobalFeed } from '@/entities/article'
import UINavTabs from '@/shared/ui/UINavTabs.vue'

const props = defineProps<{ username: string }>()

type TabKey = 'my-articles' | 'favorited-articles'

type TabOption = {
  value: TabKey
  label: string
}

const tabOptions = ref<TabOption[]>([
  { value: 'my-articles', label: 'My Articles' },
  { value: 'favorited-articles', label: 'Favorited Articles' }
])

const selectedTab = ref<TabKey>('my-articles')

const filters = computed(() => {
  const key = selectedTab.value === 'my-articles' ? 'author' : 'favorited'
  return { [key]: props.username }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <UINavTabs v-model="selectedTab" :tabs="tabOptions" />
        </div>

        <ArticleGlobalFeed :filters="filters" />
      </div>
    </div>
  </div>
</template>
