const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindColors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const themeColors = {
  primary: tailwindColors.indigo,
  secondary: tailwindColors.emerald,
  cancel: tailwindColors.slate,
  tertiary: tailwindColors.amber,
  success: tailwindColors.green,
  notice: tailwindColors.green,
  danger: tailwindColors.red,
  error: tailwindColors.red,
  warning: tailwindColors.yellow,
  alert: tailwindColors.yellow,
  "readable-content": tailwindColors.slate,
  background: tailwindColors.slate,
  "background-menu": '#fff',
  "body-contrast": '#fff'
}

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  safelist: [
    ...(['50','100','200','300','400','500','600','700','800']
      .flatMap(number => Object.keys(themeColors).map( (colorName) => `${colorName}-${number}`) )
      .flatMap(color => [`bg-${color}`, `text-${color}`, `border-${color}`])
      .flatMap(variant => [variant, `hover:${variant}`, `focus:${variant}`, `active:${variant}`, `placeholder:${variant}`])),
    "border-r-2", // For menu
    "font-thin","font-extralight","font-light","font-normal","font-medium","font-semibold","font-bold","font-extrabold","font-black",
    "w-full", "h-full" // For modal
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: themeColors,
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
    require('@tailwindcss/container-queries'),
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    })
  ]
}
