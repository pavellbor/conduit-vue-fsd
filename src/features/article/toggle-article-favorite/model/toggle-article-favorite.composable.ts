import { useEnsureAuthenticated } from '@/entities/session'
import { favoriteArticleApi, unfavoriteArticleApi } from '../api/toggle-article-favorite.api'

export const useToggleArticleFavorite = ({
  slug,
  onToggled
}: {
  slug: string
  onToggled: ({ favorited, favoritesCount }: { favorited: boolean; favoritesCount: number }) => void
}) => {
  const ensureAuthenticatedAction = useEnsureAuthenticated()

  const favoriteArticle = async () => {
    const {
      article: { favorited, favoritesCount }
    } = await favoriteArticleApi({ slug })
    onToggled({ favorited, favoritesCount })
  }

  const unfavoriteArticle = async () => {
    const {
      article: { favorited, favoritesCount }
    } = await unfavoriteArticleApi({ slug })
    onToggled({ favorited, favoritesCount })
  }

  return {
    favoriteArticle: ensureAuthenticatedAction(favoriteArticle),
    unfavoriteArticle: ensureAuthenticatedAction(unfavoriteArticle)
  }
}
