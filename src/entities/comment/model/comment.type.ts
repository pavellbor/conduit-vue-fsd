export type Comment = {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Author
}

export type Author = {
  username: string
  bio: string
  image: string
  following: boolean
}
