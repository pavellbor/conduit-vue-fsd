<script setup lang="ts">
import {
  ArticleFeed,
  FeedType,
  useArticlesFeedStore
} from '@/features/article/toggle-articles-feed'
import { TagList } from '@/entities/tag'

const articlesFeedStore = useArticlesFeedStore()
</script>

<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <ArticleFeed />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <TagList @select-tag="articlesFeedStore.setFeed(FeedType.TAG_FEED, $event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
