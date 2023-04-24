interface SimpleDateProps {
  date: Date | string
}

export function SimpleDate(props: SimpleDateProps) {
  return (
    <time className="text-sm font-medium text-stone-500">
      {new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(props.date))}
    </time>
  )
}
