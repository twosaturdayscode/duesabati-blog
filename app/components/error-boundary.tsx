import { isRouteErrorResponse, useRouteError } from '@remix-run/react'

interface ErrorBoundaryProps {
  error: unknown
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  if (isRouteErrorResponse(props.error)) {
    return (
      <div>
        <h1>
          {props.error.status} {props.error.statusText}
        </h1>
        <p>{props.error.data}</p>
      </div>
    )
  } else if (props.error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{props.error.message}</p>
        <p>The stack trace is:</p>
        <pre>{props.error.stack}</pre>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
