import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type {
  BlogPost,
  BlogPostPage,
  BlogService,
  GetPublishedPostsOptions,
} from '@/interfaces/blog'
import { BlogPostSchema } from '@/interfaces/blog'
import { Client as NotionClient, isFullPage } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { ValidProperties } from '@/notion/validation'
import { validatePageProperties } from '@/notion/validation'
import type { Maybe } from 'pratica'
import { Nothing, head } from 'pratica'

interface NotionServiceConstructor {
  auth: string
  database_id: string
  kv: KVNamespace
  r2: R2Bucket
}

export class NotionService implements BlogService {
  private database_id: string

  private notion: NotionClient
  private notionToMarkdown: NotionToMarkdown
  private kv: KVNamespace
  private r2: R2Bucket

  constructor({ auth, database_id, kv, r2 }: NotionServiceConstructor) {
    this.notion = new NotionClient({ auth })
    this.database_id = database_id
    this.notionToMarkdown = new NotionToMarkdown({ notionClient: this.notion })
    this.kv = kv
    this.r2 = r2
  }

  async getPublishedPosts(options?: GetPublishedPostsOptions) {
    const cachedResults = await this.kv.get('blog:all-posts', 'json')

    if (cachedResults != null)
      return BlogPostSchema.array().parse(cachedResults)

    const { results } = await this.notion.databases.query({
      database_id: this.database_id,
      filter: {
        property: 'status',
        select: {
          equals: 'published',
        },
      },
      sorts: [
        {
          property: 'published-at',
          direction: 'descending',
        },
      ],
      page_size: options?.size !== 'all' ? options?.size : undefined,
    })

    await Promise.all(
      results
        .filter((r): r is PageObjectResponse => isFullPage(r))
        .filter((p): p is typeof p & { properties: ValidProperties } =>
          validatePageProperties(p.properties).isOk()
        )
        .map(async p => {
          const notionImage = p.properties.image.files[0]

          const cachedImage = await this.r2.head(encodeURI(notionImage.name))

          if (!cachedImage) {
            const fetchedImageResponse = await fetch(notionImage.file.url)
            const fetchedImage = await fetchedImageResponse.text()

            return await this.r2.put(encodeURI(notionImage.name), fetchedImage)
          }

          return null
        })
    )

    const posts: BlogPost[] = await Promise.all(
      results
        .filter((r): r is PageObjectResponse => isFullPage(r))
        .filter((p): p is typeof p & { properties: ValidProperties } =>
          validatePageProperties(p.properties).isOk()
        )
        .filter(async p => {
          const isImageCached = await this.r2.head(
            encodeURI(p.properties.image.files[0].name)
          )
          return Boolean(isImageCached)
        })
        .map(p => {
          const validProps = { ...p.properties }

          return {
            id: p.id,
            title: validProps.title.rich_text.map(r => r.plain_text).join(' '),
            description: validProps.description.rich_text
              .map(r => r.plain_text)
              .join(' '),
            status: 'published',
            tags: validProps.tags.multi_select.map(m => m.name),
            slug: validProps.slug.formula.string,
            image: `https://cdn.twosaturday.space/${encodeURI(
              validProps.image.files[0].name
            )}`,
            publishedAt: new Date(validProps['published-at'].date.start),
          }
        })
    )

    this.kv.put('blog:all-posts', JSON.stringify(posts), {
      expirationTtl: 60 * 60 * 24,
    })

    return posts
  }

  async getPostBySlug(slug: string): Promise<Maybe<BlogPostPage>> {
    const { results } = await this.notion.databases.query({
      database_id: this.database_id,
      filter: {
        property: 'slug',
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    })

    if (results.length === 0) return Nothing

    return head(
      await Promise.all(
        results
          .filter((r): r is PageObjectResponse => isFullPage(r))
          .filter((p): p is typeof p & { properties: ValidProperties } =>
            validatePageProperties(p.properties).isOk()
          )
          .map(async p => {
            const validProps = { ...p.properties }
            const markdown = await this.notionToMarkdown.pageToMarkdown(
              results[0].id
            )
            const content = this.notionToMarkdown.toMarkdownString(markdown)

            return {
              id: p.id,
              title: validProps.title.rich_text
                .map(r => r.plain_text)
                .join(' '),
              description: validProps.description.rich_text
                .map(r => r.plain_text)
                .join(' '),
              status: 'published',
              tags: validProps.tags.multi_select.map(m => m.name),
              slug: validProps.slug.formula.string,
              image: validProps.image.files[0].file.url,
              publishedAt: new Date(validProps['published-at'].date.start),
              content,
            }
          })
      )
    )
  }

  async getPostsByTags(tags: string[]): Promise<BlogPost[]> {
    return []
  }
}
