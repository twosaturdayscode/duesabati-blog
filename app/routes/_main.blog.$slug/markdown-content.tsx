import Markdown from 'markdown-to-jsx'

interface MarkdownContentProps {
  markdown: string
}

export function MarkdownContent(props: MarkdownContentProps) {
  return (
    <Markdown
      options={{
        overrides: {
          p: {
            component: 'p',
            props: {
              className: 'py-3',
            },
          },
        },
      }}
    >
      {props.markdown}
    </Markdown>
  )
}
