const tailwindColors = require('tailwindcss/colors')
const { generateConfig } = require('../default.config')

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

let config = generateConfig(themeColors)

config.theme.extend.borderRadius = {
  none: '0px',
  sm: '0.075rem',
  DEFAULT: '0.125rem',
  md: '0.25rem',
  lg: '0.375rem',
  xl: '0.5rem',
  '2xl': '0.75rem',
  '3xl': '1rem',
  full: '9999px',
}

module.exports = config
