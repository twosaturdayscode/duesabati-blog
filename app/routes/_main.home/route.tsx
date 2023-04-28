import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { Hero } from './hero'
import { useLoaderData } from '@remix-run/react'
import { BlogPostCard } from '~/routes/_main.home/blog-post-card'
import { BlogPostRow } from '~/components/shared/blog-post-row'
import { CommonCacheControl } from '~/config'

export const loader = async ({ context }: LoaderArgs) => {
  const posts = await context.services.notion.getPublishedPosts({ size: 5 })

  return json(
    { posts },
    {
      headers: {
        ...CommonCacheControl,
      },
    }
  )
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <main className="mx-auto flex max-w-screen-lg flex-auto flex-col px-4 pb-36 sm:px-8">
      <Hero />

      <div className="animate-fade-slide-in opacity-0 animation-delay-300">
        <h2 className="mb-4 text-3xl font-bold">Latest posts</h2>
        <div className="flex flex-col gap-14">
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 sm:grid-cols-2">
            {posts.slice(0, 2).map(p => (
              <BlogPostCard
                key={p.id}
                title={p.title}
                description={p.description}
                image={p.image}
                url={p.slug}
                tags={p.tags}
                publishedAt={new Date(p.publishedAt)}
              />
            ))}
          </div>

          <ul className="flex flex-col gap-5">
            {posts.slice(2).map(p => (
              <BlogPostRow
                key={p.id}
                title={p.title}
                description={p.description}
                image={p.image}
                url={p.slug}
                tags={p.tags}
                publishedAt={new Date(p.publishedAt)}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
