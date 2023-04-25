import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type {
  BlogPost,
  BlogPostPage,
  BlogService,
  GetPublishedPostsOptions,
} from '@/interfaces/blog'
import { Client as NotionClient, isFullPage } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import type { PageWithValidProperties } from '@/notion/validation'
import { validatePageProperties } from '@/notion/validation'
import type { Maybe } from 'pratica'
import { Nothing, head } from 'pratica'

interface NotionServiceConstructor {
  auth: string
  database_id: string
  kv: KVNamespace
}

export class NotionService implements BlogService {
  private database_id: string

  private notion: NotionClient
  private notionToMarkdown: NotionToMarkdown
  private kv: KVNamespace

  constructor({ auth, database_id, kv }: NotionServiceConstructor) {
    this.notion = new NotionClient({ auth })
    this.database_id = database_id
    this.notionToMarkdown = new NotionToMarkdown({ notionClient: this.notion })
    this.kv = kv
  }

  async getPublishedPosts(options?: GetPublishedPostsOptions) {
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

    const posts: BlogPost[] = results
      .filter((r): r is PageObjectResponse => isFullPage(r))
      .filter((p): p is typeof p & { properties: PageWithValidProperties } =>
        validatePageProperties(p.properties).isOk()
      )
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
          image: validProps.image.files[0].file.url,
          publishedAt: new Date(validProps['published-at'].date.start),
        }
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

    const markdown = await this.notionToMarkdown.pageToMarkdown(results[0].id)
    const content = this.notionToMarkdown.toMarkdownString(markdown)

    return head(
      results
        .filter((r): r is PageObjectResponse => isFullPage(r))
        .filter((p): p is typeof p & { properties: PageWithValidProperties } =>
          validatePageProperties(p.properties).isOk()
        )
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
            image: validProps.image.files[0].file.url,
            publishedAt: new Date(validProps['published-at'].date.start),
            content,
          }
        })
    )
  }

  async getPostsByTags(tags: string[]): Promise<BlogPost[]> {
    return []
  }
}
