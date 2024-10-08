<script setup lang="ts">
import { ref } from 'vue'
import { ArticleFavoriteToggleButton } from '@/features/article/toggle-article-favorite'
import { AddCommentForm } from '@/features/comment/add-comment'
import { DeleteCommentButton } from '@/features/comment/delete-comment'
import { UserFollowToggleButton } from '@/features/user/toggle-user-follow'
import { ArticleMeta, getArticleApi, type Article } from '@/entities/article'
import { CommentList } from '@/entities/comment'
import { useApiRequest } from '@/shared/composables/useApiRequest'

const props = defineProps<{ slug: string }>()

const article = ref<Article>()

const getArticle = async () => {
  const response = await getArticleApi({ slug: props.slug })
  article.value = response.article
}

const { isLoading, executeRequest } = useApiRequest(getArticle)

executeRequest()

const handleArticleFavoriteToggle = ({
  favorited,
  favoritesCount
}: {
  favorited: boolean
  favoritesCount: number
}) => {
  article.value = Object.assign({}, article.value, { favorited, favoritesCount })
}

const handleUserFollowToggle = ({ following }: { following: boolean }) =>
  (article.value!.author.following = following)
</script>

<template>
  <div v-if="isLoading" class="article-page">
    <div class="container">Loading article...</div>
  </div>

  <div v-else-if="article" class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <ArticleMeta :author="article.author" :created-at="article.createdAt">
          <template v-if="true">
            <UserFollowToggleButton :profile="article.author" @toggle="handleUserFollowToggle" />
            &nbsp;&nbsp;
            <ArticleFavoriteToggleButton :article="article" @toggle="handleArticleFavoriteToggle">
              <template #favorite="{ favoritesCount }"
                >Favorite Post <span class="counter">({{ favoritesCount }})</span></template
              >
              <template #unfavorite="{ favoritesCount }"
                >Unfavorite Post <span class="counter">({{ favoritesCount }})</span></template
              >
            </ArticleFavoriteToggleButton>
          </template>
          <template v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i> Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </template>
        </ArticleMeta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <p>{{ article.body }}</p>
          <ul class="tag-list">
            <li v-for="tag in article.tagList" :key="tag" class="tag-default tag-pill tag-outline">
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta :author="article.author" :created-at="article.createdAt">
          <template v-if="true">
            <UserFollowToggleButton :profile="article.author" @toggle="handleUserFollowToggle" />
            &nbsp;&nbsp;
            <ArticleFavoriteToggleButton :article="article" @toggle="handleArticleFavoriteToggle">
              <template #favorite="{ favoritesCount }"
                >Favorite Post <span class="counter">({{ favoritesCount }})</span></template
              >
              <template #unfavorite="{ favoritesCount }"
                >Unfavorite Post <span class="counter">({{ favoritesCount }})</span></template
              >
            </ArticleFavoriteToggleButton>
          </template>
          <template v-else>
            <button class="btn btn-sm btn-outline-secondary">
              <i class="ion-edit"></i> Edit Article
            </button>
            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-danger">
              <i class="ion-trash-a"></i> Delete Article
            </button>
          </template>
        </ArticleMeta>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <AddCommentForm :article-slug="props.slug" />

          <CommentList :article-slug="props.slug">
            <template #commentActions="{ comment }">
              <DeleteCommentButton :article-slug="props.slug" :comment-id="comment.id" />
            </template>
          </CommentList>
        </div>
      </div>
    </div>
  </div>
</template>
