<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/entities/session'
import { RoutesNames } from '@/shared/constants/router'
import { useArticlesFeedStore } from '../model/articles-feed.store'
import { FeedType, type Feed } from '../model/articles-feed.type'

const sessionStore = useSessionStore()
const articlesFeedStore = useArticlesFeedStore()

const feeds = computed<Feed[]>(() => {
  const items = [
    { name: 'Your Feed', type: FeedType.YOUR_FEED, requireAuth: true },
    { name: 'Global Feed', type: FeedType.GLOBAL_FEED }
  ]

  if (articlesFeedStore.feed.type === FeedType.TAG_FEED && articlesFeedStore.feed.payload) {
    items.push({ name: `#${articlesFeedStore.feed.payload}`, type: FeedType.TAG_FEED })
  }

  return items
})

const router = useRouter()

const onSelectFeed = (feed: Feed) => {
  if (feed.requireAuth && !sessionStore.isAuthenticated) {
    router.push({ name: RoutesNames.login })
  } else {
    articlesFeedStore.setFeed(feed.type)
  }
}
</script>

<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li v-for="feed in feeds" :key="feed.type" class="nav-item">
        <a
          class="nav-link"
          :class="{ active: feed.type === articlesFeedStore.feed.type }"
          href=""
          @click.prevent="onSelectFeed(feed)"
        >
          {{ feed.name }}
        </a>
      </li>
    </ul>
  </div>
</template>
