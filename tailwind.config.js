const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
        hand: ['Caveat', ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        mark: 'inset 0 -.5em 0 0 #fdc890',
      },
      animation: {
        'fade-rotate-in-lg': 'fade-rotate-in-lg .5s ease forwards',
        'fade-rotate-in': 'fade-rotate-in .5s ease forwards',
        'scale-in-rotate': 'scale-in-rotate 2.5s ease forwards',
        'fade-blur-in': 'fade-blur-in .8s ease-out forwards',
        'fade-slide-in': 'fade-slide-in .5s ease forwards',
      },
      keyframes: {
        'fade-rotate-in-lg': {
          '0%': {
            opacity: 0,
            transform: 'rotate(2deg) translateY(1.25rem)',
          },

          to: {
            opacity: 1,
            transform: 'rotate(0) translateY(0)',
          },
        },

        'fade-rotate-in': {
          '0%': {
            opacity: 0,
            transform: 'rotate(3deg) translateY(1.75rem)',
          },
          to: {
            opacity: 1,
            transform: 'rotate(0) translateY(0)',
          },
        },

        'scale-in-rotate': {
          '0%': {
            transform: 'rotate(-2deg) scale(.95)',
          },
          to: {
            transform: 'rotate(-2deg) scale(1)',
          },
        },

        'fade-blur-in': {
          '0%': {
            opacity: 0,
            filter: 'blur(.25rem)',
          },
          to: {
            opacity: 1,
            filter: 'blur(0)',
          },
        },

        'fade-slide-in': {
          '0%': {
            opacity: 0,
            transform: 'translateY(1.25rem)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': value => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        }
      )
    }),
  ],
}
