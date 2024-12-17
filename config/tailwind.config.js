const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  safelist: [
    ...(['notice','alert','error','success','warning']
      .flatMap(color => [`bg-${color}`, `text-${color}`, `border-${color}`])
      .flatMap(t => [t, `hover:${t}`, `focus:${t}`, `active:${t}`])),
    ...(['50','100','200','300','400','500','600','700','800']
      .flatMap(number => [`indigo-${number}`, `slate-${number}`, `emerald-${number}`, `sky-${number}`])
      .flatMap(color => [`bg-${color}`, `text-${color}`, `border-${color}`])
      .flatMap(variant => [variant, `hover:${variant}`, `focus:${variant}`, `active:${variant}`])),
    ...(['50','100','200','300','400','500','600','700','800']
      .flatMap(number => [`primary-${number}`, `secondary-${number}`, `tertiary-${number}`])
      .flatMap(color => [`bg-${color}`, `text-${color}`, `border-${color}`])
      .flatMap(variant => [variant, `hover:${variant}`, `focus:${variant}`, `active:${variant}`])),
    "border-r-2",
    "font-thin","font-extralight","font-light","font-normal","font-medium","font-semibold","font-bold","font-extrabold","font-black",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      gray: colors.gray,
      sky: colors.sky,
      emerald: colors.emerald,
      indigo: colors.indigo,
      slate: colors.slate,
      red: colors.red,
      yellow: colors.yellow,
      primary: colors.indigo,
      secondary: colors.emerald,
      tertiary: colors.slate,
      success: colors.green["500"],
      notice: colors.green["500"],
      danger: colors.red["500"],
      error: colors.red["500"],
      warning: colors.yellow["500"],
      alert: colors.yellow["500"],
      white: '#fff',
      body: colors.slate["500"]
    },
    extend: {
      zIndex: {
        999999: '999999',
        99999: '99999',
        9999: '9999',
        999: '999',
        99: '99',
        9: '9',
        1: '1',
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries')
  ]
}
