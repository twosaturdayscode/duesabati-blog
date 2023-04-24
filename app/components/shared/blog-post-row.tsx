import { Badge } from '~/components/ui/badge'
import { SimpleDate } from '~/components/ui/simple-date'

interface BlogPostRowProps {
  url: string
  title: string
  description: string
  image: string
  tags: string[]
  publishedAt: Date
}

export function BlogPostRow(props: BlogPostRowProps) {
  const postUrl = `blog/${props.url}`

  return (
    <article className="group flex animate-fade-slide-in flex-row gap-5">
      <div
        className="relative hidden h-32 shrink-0 overflow-hidden rounded-2xl bg-purple-600 bg-opacity-10 px-7 py-3 shadow-lg shadow-stone-600/[0.03] transition duration-200 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-stone-400 after:bg-opacity-0 after:transition-colors after:duration-200 after:content-[''] group-hover:scale-[0.99] group-hover:after:bg-opacity-5
       sm:block"
      >
        <a
          href={postUrl}
          className="flex h-full w-full items-center justify-center outline-none"
          aria-label={props.title}
        >
          <div className="aspect-[15/8] h-full w-full select-none overflow-hidden">
            <img
              className="fill-stone-700 stroke-stone-700"
              src={props.image}
              alt="Building the Changelog"
              style={{ objectFit: 'contain', color: '#302C2B' }}
              width="1920"
              height="1024"
            />
          </div>
        </a>
      </div>
      <div>
        <div className="flex flex-row items-center gap-2">
          {props.tags.map(t => (
            <Badge url={`/tags/${t}`} key={t}>
              {t}
            </Badge>
          ))}
        </div>
        <a href={postUrl} className="group">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{props.title}</h3>
            <span> - </span>
            <SimpleDate date={props.publishedAt} />
          </div>
          <p className="text-stone-600">{props.description}</p>
          <div className="mt-3 flex flex-row items-center text-orange-300">
            <span className="font-medium group-hover:underline">Read more</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="ml-0.5 h-4 w-4 stroke-current"
            >
              <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </a>
      </div>
    </article>
  )
}
