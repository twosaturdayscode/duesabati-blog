import type { LoaderArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { LinkIcon } from '~/components/icons/link-icon'
import { Badge } from '~/components/ui/badge'
import { SimpleDate } from '~/components/ui/simple-date'
import { BackButton } from '~/routes/_main.blog.$slug/back-button'
import invariant from 'tiny-invariant'
import { MarkdownContent } from '~/routes/_main.blog.$slug/markdown-content'
import { CommonCacheControl } from '~/config'

export async function loader({ params, context }: LoaderArgs) {
  invariant(params.slug)

  const page = await context.services.notion.getPostBySlug(params.slug)

  return page.cata({
    Nothing: () => {
      throw new Response('Not Found', {
        status: 404,
      })
    },
    Just: p =>
      json(
        { page: p },
        {
          headers: {
            ...CommonCacheControl,
          },
        }
      ),
  })
}

export default function BlogPostPage() {
  const { page } = useLoaderData<typeof loader>()

  const readingTime = Math.floor(page.content.split(' ').length / 183)

  return (
    <main className="block w-full max-w-screen-lg flex-auto px-4 sm:px-8">
      <section className="relative mx-auto mb-12 mt-14 flex max-w-screen-lg flex-auto animate-fade-slide-in flex-col opacity-0 sm:mb-36 sm:mt-20">
        <aside className="aside-component sm:absolute sm:bottom-0 sm:left-0 sm:top-0 sm:w-52">
          <div className="sm:sticky sm:top-40 sm:pb-28">
            <BackButton />
            <div className="mt-6 flex space-x-5 sm:mt-0 sm:flex sm:flex-col sm:space-x-0">
              <div className="flex gap-3">
                {page.tags.map(t => (
                  <span key={t} className="sm:hidden">
                    <Badge>{t}</Badge>
                  </span>
                ))}
              </div>
              <span className="block sm:mt-[6.75rem]">
                <SimpleDate date={new Date()} />
              </span>
              <time className="hidden items-center text-sm font-medium text-stone-400 sm:mt-4 sm:flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="mr-1.5 h-4 w-4 fill-current"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16.001A8 8 0 0 0 10 18Z"
                    clipRule="evenodd"
                  />
                  <path
                    className="fill-current text-orange-50"
                    d="M14 10.75h-4s-.719-.11-.719-.75.719-.75.719-.75h4a.75.75 0 1 1 0 1.5Z"
                  />
                  <path
                    className="origin-center fill-current text-orange-50 transition duration-300"
                    d="M10.53 4.47c.141.14.22.331.22.53v5c0 .563-.543.75-.75.75a.75.75 0 0 1-.75-.75V5a.75.75 0 0 1 1.28-.53Z"
                    style={{ transform: 'rotate(0deg)' }}
                  />
                </svg>
                <div className="inline-flex items-center">
                  <div className="relative inline-block h-5 w-3 overflow-hidden">
                    <div className="ease relative left-0 right-0 top-0 transition duration-300">
                      <div>{readingTime}</div>
                    </div>
                  </div>
                  <span>min read</span>
                </div>
              </time>
            </div>
          </div>
        </aside>

        <article className="sm:pl-52">
          <div className="flex gap-3">
            {page.tags.map(t => (
              <span key={t} className="hidden sm:inline-flex">
                <Badge>{t}</Badge>
              </span>
            ))}
          </div>

          <h1 className="my-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {page.title}
          </h1>

          <MarkdownContent markdown={page.content} />

          <div className="mt-12 block text-xs font-medium uppercase text-stone-500">
            {' '}
            Share this post{' '}
          </div>
          <div className="mt-3 flex space-x-3">
            <a
              className="inline-flex select-none items-center whitespace-nowrap rounded-xl bg-stone-800 px-4 py-2 font-medium text-orange-50 shadow-sm shadow-stone-600/5 outline-none transition duration-200 hover:bg-stone-700 hover:shadow-lg hover:shadow-stone-600/10"
              href={`https://twitter.com/intent/tweet?text=https%3A%2F%2Fquill.do%2Fblog%2Fbuilding-the-changelog`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 18"
                className="mr-1.5 h-5 w-5 fill-current"
              >
                <path d="m22 2.12799c-.8083.36413-1.6798.60642-2.5899.71441.9321-.56211 1.6455-1.45374 1.9851-2.514271-.8716.51919-1.8393.899931-2.8648 1.103451-.8248-.883314-1.9974-1.43158-3.2951-1.43158-2.4922 0-4.5102 2.03384-4.5102 4.54257 0 .35444.0385.70057.1154 1.03423-3.75002-.19106-7.07532-1.99923-9.30088-4.750248-.38628.670098-.610352 1.453738-.610352 2.284438 0 1.57557.794552 2.96839 2.005622 3.7811-.73956-.02216-1.43514-.22983-2.045487-.56627v.05677c0 2.20275 1.554737 4.04141 3.620847 4.45671-.37803.1039-.77806.1606-1.19046.1606-.29142 0-.57185-.0304-.85091-.0817.57598 1.8041 2.24207 3.1193 4.2147 3.1581-1.54649 1.2198-3.48888 1.9466-5.60585 1.9466-.365658 0-.721694-.0221-1.07773-.065 2.0015 1.2931 4.37278 2.0421 6.92002 2.0421 8.29878 0 12.84068-6.9267 12.84068-12.9327 0-.19937-.0041-.3932-.0124-.58841.8812-.63549 1.6455-1.43712 2.2503-2.34952z"></path>
              </svg>
              <span>Twitter</span>
            </a>
            <button
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
              className="inline-flex select-none items-center whitespace-nowrap rounded-xl bg-stone-800 px-4 py-2 font-medium text-orange-50 shadow-sm shadow-stone-600/5 outline-none transition duration-200 hover:bg-stone-700 hover:shadow-lg hover:shadow-stone-600/10"
            >
              <LinkIcon className="mr-1.5 h-5 w-5" />
              <span>Link</span>
            </button>
          </div>
        </article>
      </section>
    </main>
  )
}
