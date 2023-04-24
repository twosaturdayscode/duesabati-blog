import { useState } from 'react'
import { animated, useTransition, easings } from '@react-spring/web'

interface TooltipProps {
  children: React.ReactNode
  message: string
}

export function Tooltip(props: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const transition = useTransition(showTooltip, {
    from: {
      opacity: 0,
      scale: 0.95,
    },
    enter: {
      opacity: 1,
      scale: 1,
    },
    leave: {
      opacity: 0,
      scale: 0.9,
    },
    config: {
      easing: easings.easeInOutCubic,
      duration: 200,
    },
  })

  return (
    <div className="relative inline-flex select-none items-center">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {props.children}
      </div>
      {transition((style, isOpen) =>
        isOpen ? (
          <animated.div
            className="z-30 flex min-w-min origin-top flex-col whitespace-nowrap rounded-xl bg-stone-800 px-3 py-1 text-sm text-orange-50 shadow-md shadow-stone-600/5"
            style={{
              position: 'absolute',
              left: '-16px',
              top: '44px',
              ...style,
            }}
          >
            {props.message}
          </animated.div>
        ) : null
      )}
    </div>
  )
}
