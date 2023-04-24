import type { Maybe } from 'pratica'

export interface BlogPost {
  id: string
  slug: string
  image: string
  tags: string[]
  title: string
  publishedAt: Date
  description: string
  status: 'published' | 'draft'
}

export interface BlogPostPage extends BlogPost {
  content: string
}

export interface GetPublishedPostsOptions {
  page?: number
  size?: number | 'all'
}

export interface BlogService {
  /**
   * A paginated function that returns a list of only published posts
   */
  getPublishedPosts(options?: GetPublishedPostsOptions): Promise<BlogPost[]>

  /** Retrive a list of posts with specific tags */
  getPostsByTags(tags: string[]): Promise<BlogPost[]>

  /** Get a single post by slug */
  getPostBySlug(slug: string): Promise<Maybe<BlogPostPage>>
}
