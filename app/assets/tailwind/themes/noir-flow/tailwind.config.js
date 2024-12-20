const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindColors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')


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
  "50": "#efecf7",
  "100": "#e0daef",
  "200": "#c1b4df",
  "300": "#a18fce",
  "400": "#8269be",
  "500": "#6344ae",
  "600": "#4f368b",
  "700": "#3b2968",
  "800": "#281b46",
  "900": "#140e23"
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
  "50": "#ebedf3",
  "100": "#d7dae8",
  "200": "#afb6d0",
  "300": "#8691b9",
  "400": "#5e6da1",
  "500": "#36488a",
  "600": "#2b3a6e",
  "700": "#202b53",
  "800": "#161d37",
  "900": "#0b0e1c"
}

//https://tailcolor.com/?color=40a994
const pastelGreen = {
  "50": "#ecf6f4",
  "100": "#d9eeea",
  "200": "#b3ddd4",
  "300": "#8ccbbf",
  "400": "#66baa9",
  "500": "#40a994",
  "600": "#338776",
  "700": "#266559",
  "800": "#1a443b",
  "900": "#0d221e"
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
const noirBlack = {
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
  cancel: lightRose,
  success: pastelGreen,
  notice: pastelGreen,
  danger: lightRose,
  error: lightRose,
  warning: arid,
  alert: arid,
  "readable-content": constantColor('#fff'),
  background: invertColorIndexes(noirBlack),
  "background-menu": noirBlack["700"],
  "body-contrast": noirBlack["600"]
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
