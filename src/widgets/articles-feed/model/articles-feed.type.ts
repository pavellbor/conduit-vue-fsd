export enum FeedType {
  YOUR_FEED = 'Your Feed',
  GLOBAL_FEED = 'Global Feed',
  TAG_FEED = 'Tag Feed'
}

export type Feed = { name: string; type: FeedType; requireAuth?: boolean }
