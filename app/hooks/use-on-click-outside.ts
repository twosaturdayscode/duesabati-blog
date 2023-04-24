import type { RefObject } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

type Handler = (event: MouseEvent | TouchEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler
) {
  const savedHandler = useRef(handler)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        (event.target instanceof Node && ref.current.contains(event.target))
      )
        return

      savedHandler.current(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref])
}
