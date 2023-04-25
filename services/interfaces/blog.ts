import type { Maybe } from 'pratica'
import { z } from 'zod'

export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  image: z.string(),
  tags: z.array(z.string()),
  title: z.string(),
  publishedAt: z.coerce.date(),
  description: z.string(),
  status: z.union([z.literal('published'), z.literal('draft')]),
})

export type BlogPost = z.infer<typeof BlogPostSchema>

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
