import { useEnsureAuthenticated } from '@/entities/session'
import { followUserApi, unfollowUserApi } from '../api/toggle-user-follow.api'

export const useToggleUserFollow = ({
  username,
  onToggled
}: {
  username: string
  onToggled: ({ following }: { following: boolean }) => void
}) => {
  const ensureAuthenticatedAction = useEnsureAuthenticated()

  const followUser = async () => {
    const { profile } = await followUserApi({ username })
    onToggled({ following: profile.following })
  }

  const unfollowUser = async () => {
    const { profile } = await unfollowUserApi({ username })
    onToggled({ following: profile.following })
  }

  return {
    followUser: ensureAuthenticatedAction(followUser),
    unfollowUser: ensureAuthenticatedAction(unfollowUser)
  }
}
