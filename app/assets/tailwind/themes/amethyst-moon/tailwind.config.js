const tailwindColors = require('tailwindcss/colors')
const { generateConfig } = require('../default.config')

const themeColors = {
  primary: tailwindColors.indigo,
  secondary: tailwindColors.emerald,
  tertiary: tailwindColors.sky,
  cancel: tailwindColors.slate,
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

module.exports = generateConfig(themeColors)