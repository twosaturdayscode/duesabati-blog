interface ReadTimeCounterProps {
  minutes: number
}

export function ReadTimeCounter(props: ReadTimeCounterProps) {
  return (
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
        ></path>
        <path
          className="fill-current text-orange-50"
          d="M14 10.75h-4s-.719-.11-.719-.75.719-.75.719-.75h4a.75.75 0 1 1 0 1.5Z"
        ></path>
        <path
          className="origin-center fill-current text-orange-50 transition duration-300"
          d="M10.53 4.47c.141.14.22.331.22.53v5c0 .563-.543.75-.75.75a.75.75 0 0 1-.75-.75V5a.75.75 0 0 1 1.28-.53Z"
          style={{ transform: 'rotate(0deg)' }}
        ></path>
      </svg>
      <div className="inline-flex items-center">
        <div className="relative inline-block h-5 w-3 overflow-hidden">
          <div
            className="ease relative left-0 right-0 top-0 transition duration-300"
            style={{ transform: 'translateY(0rem)' }}
          >
            <div>7</div>
            <div>6</div>
            <div>5</div>
            <div>4</div>
            <div>3</div>
            <div>2</div>
            <div>1</div>
            <div>0</div>
          </div>
        </div>
        <span>min read</span>
      </div>
    </time>
  )
}
