<script setup lang="ts">
import ArticleList from './ArticlesFeed/ArticleList.vue'
</script>

<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item">
        <a class="nav-link" href="">Your Feed</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="">Global Feed</a>
      </li>
    </ul>
  </div>

  <ArticleList />
</template>
