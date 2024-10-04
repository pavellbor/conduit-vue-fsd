import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { FeedType } from './articles-feed.type'

export const useArticlesFeedStore = defineStore('articlesFeed', () => {
  const feed = reactive<{
    type: FeedType
    payload?: string
  }>({
    type: FeedType.GLOBAL_FEED
  })

  const setFeed = (type: FeedType, payload?: string) => {
    feed.type = type
    feed.payload = payload
  }

  return { feed, setFeed }
})
