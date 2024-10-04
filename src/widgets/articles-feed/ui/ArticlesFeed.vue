<script setup lang="ts">
import { h } from 'vue'
import { ArticleFavoriteToggleButton } from '@/features/article/toggle-article-favorite'
import {
  ArticleGlobalFeed,
  ArticlePersonalFeed,
  useProvideArticlesDeps,
  type ArticlePreview
} from '@/entities/article'
import { useArticlesFeedStore } from '../model/articles-feed.store'
import { FeedType } from '../model/articles-feed.type'
import FeedToggle from './ArticlesFeedToggle.vue'

const articlesFeedStore = useArticlesFeedStore()

const renderArticleActions = (
  article: ArticlePreview,
  onUpdate: (article: ArticlePreview) => void
) => {
  return h(ArticleFavoriteToggleButton, {
    class: 'pull-xs-right',
    article,
    onToggle: ({ favorited, favoritesCount }) => onUpdate({ ...article, favorited, favoritesCount })
  })
}

useProvideArticlesDeps({
  renderArticleActions
})
</script>

<template>
  <FeedToggle />
  <ArticlePersonalFeed v-if="articlesFeedStore.feed.type === FeedType.YOUR_FEED">
    <!-- <template #articleActions="{ article, updateArticle }">
      <ArticleFavoriteToggleButton
        class="pull-xs-right"
        :article="article"
        @toggle="
          ({ favorited, favoritesCount }) =>
            updateArticle({ ...article, favorited, favoritesCount })
        "
      />
    </template> -->
  </ArticlePersonalFeed>
  <ArticleGlobalFeed v-else :filters="{ tag: articlesFeedStore.feed.payload }">
    <!-- <template #articleActions="{ article, updateArticle }">
      <ArticleFavoriteToggleButton
        class="pull-xs-right"
        :article="article"
        @toggle="
          ({ favorited, favoritesCount }) =>
            updateArticle({ ...article, favorited, favoritesCount })
        "
      />
    </template> -->
  </ArticleGlobalFeed>
</template>
