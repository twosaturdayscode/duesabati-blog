import { Badge } from '~/components/ui/badge'
import { SimpleDate } from '~/components/ui/simple-date'

interface BlogPostCardProps {
  url: string
  title: string
  description: string
  image: string
  tags: string[]
  publishedAt: Date
}

export function BlogPostCard(props: BlogPostCardProps) {
  return (
    <article>
      <div className="group relative aspect-[15/8] flex-shrink-0 overflow-hidden rounded-2xl bg-orange-600 bg-opacity-[0.15] text-stone-200 shadow-lg shadow-stone-600/[0.03] transition duration-200 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:bg-stone-400 after:bg-opacity-0 after:transition-colors after:duration-200 after:content-[''] hover:scale-[0.99] hover:shadow-md hover:shadow-stone-600/5 hover:after:bg-opacity-5">
        <a
          href={`blog/${props.url}`}
          className="flex h-full w-full items-center justify-center outline-none"
          aria-label={props.title}
        >
          <div className="select-none overflow-hidden p-6">
            <img
              className="h-full w-full overflow-hidden"
              src={props.image}
              alt={props.title}
              width="1920"
              height="1024"
            />
          </div>
        </a>
      </div>
      <div className="px-1.5">
        <div className="mt-3 flex justify-between">
          <div>
            <SimpleDate date={props.publishedAt} />
          </div>

          <ul className="flex gap-2">
            {props.tags.map(t => (
              <Badge key={t}>{t}</Badge>
            ))}
          </ul>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          <a
            href={`blog/${props.url}`}
            className="outline-none transition-colors duration-200 hover:text-orange-600 hover:text-opacity-70"
          >
            {props.title}
          </a>
        </h3>

        <p className="mt-2 text-stone-600">
          <a href={`blog/${props.url}`} className="outline-none">
            {props.description}
          </a>
        </p>
      </div>
    </article>
  )
}
