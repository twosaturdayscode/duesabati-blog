import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'

import { useLoaderData, useNavigation } from '@remix-run/react'
import { Spinner } from '~/components/ui/spinner'
import { BlogPostRow } from '~/components/shared/blog-post-row'

export const loader = async ({ context }: LoaderArgs) => {
  const posts = await context.services.notion.getPublishedPosts()

  return json({ posts })
}

export default function BlogIndexPage() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <main className="w-full min-w-0 max-w-4xl flex-1 px-6 py-12 pt-4 md:px-8">
      <header className="w-full py-10 text-center">
        <h1 className="mb-5 animate-fade-rotate-in-lg text-5xl font-bold">
          Blog
        </h1>
        <p className="animate-fade-rotate-in text-stone-500">
          It's more of a digital garden. You can read about web development and
          programming as well as thoughts and ideas about religion, work,
          philosophy and life in general.
        </p>
      </header>
      <hr className="mb-8 h-0.5 bg-stone-400/20" />
      <ul className="flex flex-col gap-5">
        {posts.map(p => (
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
    </main>
  )
}
