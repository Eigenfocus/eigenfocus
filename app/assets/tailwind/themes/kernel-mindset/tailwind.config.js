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

//https://tailcolor.com/?color=4B4376
const deepPurple = {
  "50": "#f4f2fc",
  "100": "#e8e5f9",
  "200": "#d1cbf3",
  "300": "#bab1ec",
  "400": "#a397e6",
  "500": "#8c7de0",
  "600": "#7064b3",
  "700": "#544b86",
  "800": "#38325a",
  "900": "#1c192d"
}

//https://tailcolor.com/?color=AE445A
const smoothWine = {
  "50": "#f7ecef",
  "100": "#efdade",
  "200": "#dfb4bd",
  "300": "#ce8f9c",
  "400": "#be697b",
  "500": "#ae445a",
  "600": "#8b3648",
  "700": "#682936",
  "800": "#461b24",
  "900": "#230e12"
}

// https://tailcolor.com/?color=445aae
const deepBlue = {
  "50": "#edf2f9",
  "100": "#dbe5f2",
  "200": "#b7cbe5",
  "300": "#92b2d9",
  "400": "#6e98cc",
  "500": "#4a7ebf",
  "600": "#3b6599",
  "700": "#2c4c73",
  "800": "#1e324c",
  "900": "#0f1926"
}

//https://tailcolor.com/?color=40a994
const pastelGreen = {
  "50": "#ebf9f7",
  "100": "#d8f4ee",
  "200": "#b0e9dd",
  "300": "#89ddcd",
  "400": "#61d2bc",
  "500": "#3ac7ab",
  "600": "#2e9f89",
  "700": "#237767",
  "800": "#175044",
  "900": "#0c2822"
}

//https://tailcolor.com/?color=E8BCB9
const lightRose = {
  "50": "#fdf8f8",
  "100": "#faf2f1",
  "200": "#f6e4e3",
  "300": "#f1d7d5",
  "400": "#edc9c7",
  "500": "#e8bcb9",
  "600": "#ba9694",
  "700": "#8b716f",
  "800": "#5d4b4a",
  "900": "#2e2625"
}

//https://tailcolor.com/?color=a99440
const arid = {
  "50": "#f6f4ec",
  "100": "#eeead9",
  "200": "#ddd4b3",
  "300": "#cbbf8c",
  "400": "#baa966",
  "500": "#a99440",
  "600": "#877633",
  "700": "#655926",
  "800": "#443b1a",
  "900": "#221e0d"
}

// https://tailcolor.com/?color=3C3D37
const kernelBlack = {
  "50": "#ececeb",
  "100": "#d8d8d7",
  "200": "#b1b1af",
  "300": "#8a8b87",
  "400": "#63645f",
  "500": "#3c3d37",
  "600": "#30312c",
  "700": "#242521",
  "800": "#181816",
  "900": "#0c0c0b"
}
const themeColors = {
  primary: invertColorIndexes(deepBlue),
  secondary: invertColorIndexes(deepPurple),
  tertiary: invertColorIndexes(pastelGreen),
  cancel: invertColorIndexes(arid),
  success: invertColorIndexes(pastelGreen),
  notice: invertColorIndexes(pastelGreen),
  danger: invertColorIndexes(arid ),
  error: invertColorIndexes(arid  ),
  warning: invertColorIndexes(arid),
  alert: invertColorIndexes(arid),
  "readable-content": constantColor('#fff'),
  background: invertColorIndexes(kernelBlack),
  "background-menu": kernelBlack["700"],
  "body-contrast": kernelBlack["600"]
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