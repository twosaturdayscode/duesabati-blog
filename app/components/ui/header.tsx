import { NavLink } from '@remix-run/react'
import { useMemo, useRef, useState } from 'react'
import { config } from '~/config'
import { twJoin as join } from 'tailwind-merge'
import { useOnClickOutside } from '~/hooks/use-on-click-outside'

export function Header() {
  const menu = useMemo(() => Object.entries(config.menu), [])

  return (
    <div className="sticky top-0 z-20 flex w-full flex-col items-center justify-center">
      <header className="animate-fade-in relative flex h-[4.5rem] w-full shrink-0 items-center justify-between border-b-2 border-stone-400 border-opacity-20 bg-orange-50 bg-opacity-80 px-4 backdrop-blur-md sm:px-8 md:h-[5.5rem]">
        <a
          className="animate-fade-in rotate-scale-in flex items-center outline-none transition-colors duration-200 hover:text-stone-600"
          aria-label="Duesabati"
          href="/"
        >
          <span className="text-3xl font-black text-stone-700">Duesabati</span>
        </a>
        <div className="z-10 flex items-center">
          <MenuButton />

          <ul className="hidden w-full space-x-3 md:mr-20 md:flex">
            {menu.map(([key, { icon: Icon, path, label }]) => (
              <NavItem key={key} to={path} end={path === '/'}>
                <Icon className="mr-2 h-5 w-5 stroke-current stroke-2" />
                <span className="capitalize">{label}</span>
              </NavItem>
            ))}
          </ul>
          {/* <a
            className="link-component group ml-5 hidden select-none items-center whitespace-nowrap rounded-xl bg-stone-800 px-4 py-2 font-medium text-orange-50 shadow-sm shadow-stone-600/5 outline-none transition duration-200 hover:bg-stone-700 hover:shadow-lg hover:shadow-stone-600/10 md:flex"
            href="/request"
            target="_self"
          >
            <span>Contact me</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1.5 h-5 w-5 rotate-180 stroke-current stroke-2"
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
          </a> */}
        </div>
      </header>
    </div>
  )
}

interface NavItemProps {
  to: string
  end?: boolean
  children: React.ReactNode
}

function NavItem(props: NavItemProps) {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) =>
        `group flex h-10 cursor-pointer select-none items-center whitespace-nowrap rounded-xl bg-opacity-20 text-base font-medium text-stone-800 transition-colors duration-300 hover:bg-stone-400/20 ${
          isActive && 'bg-stone-400'
        }`
      }
      end={props.end}
    >
      <div className="flex h-full w-full items-center px-3.5 outline-none">
        {props.children}
      </div>
    </NavLink>
  )
}

function MenuButton() {
  const [state, setState] = useState<'open' | 'closed'>('closed')
  const toggle = () => setState(s => (s === 'open' ? 'closed' : 'open'))

  const menu = useMemo(() => Object.entries(config.menu), [])
  const ref = useRef(null)

  useOnClickOutside(ref, () => setState('closed'))

  return (
    <div
      ref={ref}
      onClick={toggle}
      className="inline-flex select-none items-center md:hidden"
    >
      <div
        className={join(
          'flex h-10 w-10 items-center justify-center rounded-xl transition duration-200',
          state === 'open' && 'bg-stone-400 bg-opacity-20'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={join(
            'h-5 w-5 stroke-current stroke-[2.5] transition duration-200',
            state === 'open' && 'rotate-90'
          )}
        >
          <path
            d="M3.5 6.5H20.5"
            className={join(
              state == 'open' &&
                'origin-center -translate-x-1 translate-y-1 rotate-45 transition duration-200'
            )}
          />
          <path
            d="M3.5 17.5H20.5"
            className={join(
              state == 'open' &&
                'origin-center -translate-x-1 -translate-y-1 -rotate-45 transition duration-200'
            )}
          />
        </svg>
      </div>

      {state === 'open' && (
        <ul className="absolute left-0 right-0 top-16 z-40 mx-3 flex origin-top-right flex-col space-y-0.5 overflow-hidden rounded-xl bg-white px-3.5 py-3 shadow-lg shadow-stone-600/10 before:!content-none">
          {menu.map(([key, { icon: Icon, path, label }]) => (
            <NavItem key={key} to={path} end={path === '/'}>
              <Icon className="mr-2 h-5 w-5 stroke-current stroke-2" />
              <span className="capitalize">{label}</span>
            </NavItem>
          ))}
        </ul>
      )}
    </div>
  )
}
