export default function NotFound() {
  return (
    <main className="flex flex-auto items-center justify-center">
      <div className="flex animate-fade-slide-in flex-col items-center opacity-0">
        <div className="mb-8 h-64 w-64 select-none overflow-hidden">
          <img
            className="h-full w-full overflow-hidden"
            src="/assets/curiosity.png"
            alt="Curiosity"
            width="512"
            height="512"
          />
        </div>
        <span className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-orange-300 bg-opacity-80 px-2 py-0.5 text-center text-sm font-medium">
          Error 404
        </span>
        <h1 className="mb-1.5 mt-3 text-center text-5xl font-bold tracking-tight">
          Page not found
        </h1>
        <h2 className="text-center text-lg text-stone-600">
          That's pretty strange.
        </h2>
        <a
          href="/home"
          className="group mt-8 h-10 cursor-pointer select-none rounded-xl bg-stone-800 px-4 text-base font-medium text-orange-50 shadow-sm shadow-stone-600/5 outline-none transition duration-200 after:flex-1 after:content-[''] hover:bg-stone-700 hover:shadow-lg hover:shadow-stone-600/10"
        >
          <span className="flex h-full w-full items-center justify-center whitespace-nowrap">
            <span className="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1.5 h-5 w-5 stroke-current stroke-2"
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
            </span>
            <span>Back home</span>
          </span>
        </a>
      </div>
    </main>
  )
}
