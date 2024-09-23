<script setup lang="ts">
import { ArticleGlobalFeed, ArticlePersonalFeed } from '@/entities/article'
import { useArticlesFeedStore } from '../model/toggle-articles-feed.store'
import { FeedType } from '../model/toggle-articles-feed.type'
import FeedToggle from './ArticlesFeedToggle.vue'

const articlesFeedStore = useArticlesFeedStore()
</script>

<template>
  <FeedToggle />
  <ArticlePersonalFeed v-if="articlesFeedStore.feed.type === FeedType.YOUR_FEED" />
  <ArticleGlobalFeed v-else-if="articlesFeedStore.feed.type === FeedType.GLOBAL_FEED" />
  <ArticleGlobalFeed
    v-else-if="articlesFeedStore.feed.type === FeedType.TAG_FEED && articlesFeedStore.feed.payload"
    :tag="articlesFeedStore.feed.payload"
  />
</template>
