import { twMerge as merge } from 'tailwind-merge'

interface BadgeProps {
  children: React.ReactNode
  url?: string
  className?: string
}

export function Badge(props: BadgeProps) {
  const styles = merge(
    'mb-2 inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-stone-400/20 px-2 py-0.5 text-center text-sm font-medium text-stone-600',
    props.className
  )

  return props.url ? (
    <a href={props.url}>
      <span className={styles}>{props.children}</span>
    </a>
  ) : (
    <span className={styles}>{props.children}</span>
  )
}
