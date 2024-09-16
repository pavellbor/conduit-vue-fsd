<script setup lang="ts">
import ArticlesFeed from './ArticlesFeed.vue'
import TagList from './TagList.vue'
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
          <ArticlesFeed />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <TagList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
