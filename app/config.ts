import { HomeIcon, UserIcon, ChatBubbleIcon } from '~/components/icons'

export const config = {
  menu: {
    home: {
      label: 'home',
      path: '/home',
      icon: HomeIcon,
    },
    blog: {
      label: 'blog',
      path: 'blog',
      icon: ChatBubbleIcon,
    },
    about: {
      label: 'about',
      path: '/about-me',
      icon: UserIcon,
    },
  },
}

export const CommonCacheControl = {
  'Cache-Control':
    'public, max-age=600, s-maxage=86400, stale-while-revalidate=31556952',
}
