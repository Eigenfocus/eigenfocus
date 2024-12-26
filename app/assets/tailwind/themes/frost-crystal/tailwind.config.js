const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindColors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const paleBlue = {
  "50": "#ebeef4",
  "100": "#d8ddea",
  "200": "#b1bbd4",
  "300": "#899abf",
  "400": "#6278a9",
  "500": "#3b5694",
  "600": "#2f4576",
  "700": "#233459",
  "800": "#18223b",
  "900": "#0c111e"
}

const themeColors = {
  primary: tailwindColors.sky,
  secondary: tailwindColors.teal,
  tertiary: tailwindColors.cyan,
  cancel: tailwindColors.slate,
  success: tailwindColors.teal,
  notice: tailwindColors.teal,
  danger: tailwindColors.rose,
  error: tailwindColors.rose,
  warning: tailwindColors.amber,
  alert: tailwindColors.amber,
  "readable-content": paleBlue,
  background: tailwindColors.blue,
  "background-menu": tailwindColors.blue["50"],
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
      borderRadius: {
        none: '0px',
        sm: '0.75rem',
        DEFAULT: '0.125rem',
        md: '0.25rem',
        lg: '0.375rem',
        xl: '0.5rem',
        '2xl': '0.75rem',
        '3xl': '1rem',
        full: '9999px',
      }
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
