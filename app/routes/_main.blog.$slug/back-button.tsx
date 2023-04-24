export function BackButton() {
  return (
    <a
      className="group inline-flex select-none items-center whitespace-nowrap font-medium text-stone-800 outline-none transition duration-200 hover:text-stone-600"
      href="/blog"
      target="_self"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-1.5 h-5 w-5 stroke-current stroke-2 text-stone-400 group-hover:text-stone-600"
      >
        <path
          className="opacity-0 transition duration-200 group-hover:opacity-100"
          d="M18.5 12H4.5"
        ></path>
        <path
          className="transition duration-200 group-hover:translate-x-[-5px]"
          d="M14.75 5.25L8 12L14.75 18.75"
        ></path>
      </svg>
      <span>Back</span>
    </a>
  )
}
