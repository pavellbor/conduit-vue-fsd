import { inject, provide, type Ref } from 'vue'
import type { ArticlePreview } from './article.types'

type ArticlesDeps = {
  renderArticleActions: (
    article: ArticlePreview,
    onUpdate: (article: ArticlePreview) => void
  ) => void
}

const ARTICLES_DEPS_KEY = 'articlesDeps'

export const useProvideArticlesDeps = ({ renderArticleActions }: ArticlesDeps) => {
  provide(ARTICLES_DEPS_KEY, { renderArticleActions })
}

export const useArticles = ({ articles }: { articles: Ref<ArticlePreview[]> }) => {
  const deps = inject(ARTICLES_DEPS_KEY) as ArticlesDeps

  if (!deps) {
    throw new Error(
      'Articles dependencies are not provided. Make sure to call useProvideArticlesDeps.'
    )
  }

  const updateArticle = (article: ArticlePreview) => {
    const articleIndex = articles.value.findIndex((item) => item.slug === article.slug)

    articles.value = [
      ...articles.value.slice(0, articleIndex),
      article,
      ...articles.value.slice(articleIndex + 1)
    ]
  }

  return { renderArticleActions: deps.renderArticleActions, updateArticle }
}
