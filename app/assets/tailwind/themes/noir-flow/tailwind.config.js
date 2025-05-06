const tailwindColors = require('tailwindcss/colors')
const { generateConfig } = require('../default.config')

// https://tailcolor.com/

function invertColorIndexes(original) {
  return {
    "50": original["900"],
    "100": original["800"],
    "200": original["700"],
    "300": original["600"],
    "400": original["500"],
    "500": original["400"],
    "600": original["300"],
    "700": original["200"],
    "800": original["100"],
    "900": original["50"]
  };
}

function constantColor(color) {
  return {
    "50": color,
    "100": color,
    "200": color,
    "300": color,
    "400": color,
    "500": color,
    "600": color,
    "700": color,
    "800": color,
    "900": color
  };
}

// https://tailcolor.com/?color=383A56
const noirNavy = {
  "50": "#f0f0f7",
  "100": "#e1e2ee",
  "200": "#c3c4dd",
  "300": "#a6a7cd",
  "400": "#8889bc",
  "500": "#6a6cab",
  "600": "#555689",
  "700": "#404167",
  "800": "#2a2b44",
  "900": "#151622"
}

// https://tailcolor.com/?color=242529
const noirBlack = {
  "50": "#e9e9ea",
  "100": "#d3d3d4",
  "200": "#a7a8a9",
  "300": "#7c7c7f",
  "400": "#505154",
  "500": "#242529",
  "600": "#1d1e21",
  "700": "#161619",
  "800": "#0e0f10",
  "900": "#070708"
}

const noirRed = {
  "50": "#f8ebeb",
  "100": "#f1d8d8",
  "200": "#e3b0b0",
  "300": "#d58989",
  "400": "#c76161",
  "500": "#b93a3a",
  "600": "#942e2e",
  "700": "#6f2323",
  "800": "#4a1717",
  "900": "#250c0c"
}

const noirGreen = {
  "50": "#e6f6f6",
  "100": "#cceded",
  "200": "#99dbdb",
  "300": "#66c9c9",
  "400": "#33b7b7",
  "500": "#00a5a5",
  "600": "#008484",
  "700": "#006363",
  "800": "#004242",
  "900": "#002121"
}

const noirBrown = {
  "50": "#f8f4ef",
  "100": "#f1e8df",
  "200": "#e3d1bf",
  "300": "#d5ba9f",
  "400": "#c7a37f",
  "500": "#b98c5f",
  "600": "#94704c",
  "700": "#6f5439",
  "800": "#4a3826",
  "900": "#251c13"
}

const noirPurple = {
  "50": "#f6edf8",
  "100": "#eedbf0",
  "200": "#ddb6e2",
  "300": "#cb92d3",
  "400": "#ba6dc5",
  "500": "#a949b6",
  "600": "#873a92",
  "700": "#652c6d",
  "800": "#441d49",
  "900": "#220f24"
}

const themeColors = {
  primary: invertColorIndexes(noirPurple),
  secondary: invertColorIndexes(noirGreen),
  tertiary: invertColorIndexes(noirNavy),
  cancel: invertColorIndexes(noirNavy),
  success: invertColorIndexes(noirGreen),
  notice: invertColorIndexes(noirGreen),
  danger: invertColorIndexes(noirBrown),
  error: invertColorIndexes(noirRed),
  warning: invertColorIndexes(noirBrown),
  alert: invertColorIndexes(noirBrown),
  "readable-content": {
    "50": "rgba(255, 255, 255, 0.5)",
    "100": "rgba(255, 255, 255, 0.6)",
    "200": "rgba(255, 255, 255, 0.7)",
    "300": "rgba(255, 255, 255, 0.8)",
    "400": "rgba(255, 255, 255, 0.85)",
    "500": "rgba(255, 255, 255, 0.9)",
    "600": "rgba(255, 255, 255, 0.92)",
    "700": "rgba(255, 255, 255, 0.94)",
    "800": "rgba(255, 255, 255, 0.98)",
    "900": "rgba(255, 255, 255, 1)"
  },
  background: invertColorIndexes(noirBlack),
  "background-menu": noirBlack["700"],
  "body-contrast": noirBlack["600"]
}

let config = generateConfig(themeColors)

config.theme.extend.borderRadius = {
  none: '0px',
  sm: '0.095rem',
  DEFAULT: '0.145rem',
  md: '0.275rem',
  lg: '0.45rem',
  xl: '0.55rem',
  '2xl': '0.85rem',
  '3xl': '1.3rem',
  full: '9999px',
}

module.exports = config