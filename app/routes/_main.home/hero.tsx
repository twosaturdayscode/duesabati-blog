import { Tooltip } from '~/components/ui'

export function Hero() {
  return (
    <header className="mb-12 mt-12 flex w-full shrink-0 sm:mb-14 sm:mt-24">
      <div className="relative flex w-full justify-between sm:items-center">
        <div>
          <h1 className="mb-3 animate-fade-rotate-in-lg text-4xl font-bold tracking-tight text-stone-700 sm:text-5xl">
            Ciao! I'm Ali
          </h1>
          <h2 className="max-w-sm animate-fade-rotate-in text-lg text-stone-600 opacity-0 animation-delay-100">
            a{' '}
            <mark className="font-medium shadow-mark">
              full-stack web developer
            </mark>{' '}
            with a feel for{' '}
            <mark className="font-medium shadow-mark">UX/UI design</mark> and a
            passion for{' '}
            <mark className="font-medium shadow-mark">
              domain driven design
            </mark>
            .{' '}
          </h2>
          <div className="mt-8 flex items-center space-x-3 !font-normal">
            <Tooltip message="Twitter">
              <span className="flex w-full cursor-pointer items-center justify-center">
                <a
                  className="inline-flex h-auto select-none items-center whitespace-nowrap rounded-xl bg-stone-400 bg-opacity-30 px-2.5 py-2 font-medium outline-none transition duration-200 hover:bg-opacity-50"
                  href="https://twitter.com/2saturdayscode"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 18"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="m22 2.12799c-.8083.36413-1.6798.60642-2.5899.71441.9321-.56211 1.6455-1.45374 1.9851-2.514271-.8716.51919-1.8393.899931-2.8648 1.103451-.8248-.883314-1.9974-1.43158-3.2951-1.43158-2.4922 0-4.5102 2.03384-4.5102 4.54257 0 .35444.0385.70057.1154 1.03423-3.75002-.19106-7.07532-1.99923-9.30088-4.750248-.38628.670098-.610352 1.453738-.610352 2.284438 0 1.57557.794552 2.96839 2.005622 3.7811-.73956-.02216-1.43514-.22983-2.045487-.56627v.05677c0 2.20275 1.554737 4.04141 3.620847 4.45671-.37803.1039-.77806.1606-1.19046.1606-.29142 0-.57185-.0304-.85091-.0817.57598 1.8041 2.24207 3.1193 4.2147 3.1581-1.54649 1.2198-3.48888 1.9466-5.60585 1.9466-.365658 0-.721694-.0221-1.07773-.065 2.0015 1.2931 4.37278 2.0421 6.92002 2.0421 8.29878 0 12.84068-6.9267 12.84068-12.9327 0-.19937-.0041-.3932-.0124-.58841.8812-.63549 1.6455-1.43712 2.2503-2.34952z"></path>
                  </svg>
                </a>
              </span>
            </Tooltip>
          </div>
        </div>

        <div className="absolute right-56 top-12 hidden w-56 scale-95 animate-scale-in-rotate select-none whitespace-pre font-hand text-2xl text-stone-400 md:block">
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[400ms]">
            Every{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[500ms]">
            great{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[600ms]">
            design{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[700ms]">
            begins{' '}
          </span>
          <br />
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[800ms]">
            with{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[900ms]">
            an{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[1000ms]">
            even{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[1100ms]">
            better{' '}
          </span>
          <span className="animate-fade-blur-in opacity-0 blur-sm animation-delay-[1200ms]">
            story{' '}
          </span>
        </div>
      </div>
    </header>
  )
}
