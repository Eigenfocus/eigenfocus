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

// https://tailcolor.com/?color=383A56
const noirNavy = {
  "50": "#ebebee",
  "100": "#d7d8dd",
  "200": "#afb0bb",
  "300": "#88899a",
  "400": "#606178",
  "500": "#383a56",
  "600": "#2d2e45",
  "700": "#222334",
  "800": "#161722",
  "900": "#0b0c11"
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
  "50": "#ece6e6",
  "100": "#d8cccc",
  "200": "#b19999",
  "300": "#8b6666",
  "400": "#643333",
  "500": "#3d0000",
  "600": "#310000",
  "700": "#250000",
  "800": "#180000",
  "900": "#0c0000"
}

const noirGreen = {
  "50": "#e6f2f2",
  "100": "#cce4e4",
  "200": "#99caca",
  "300": "#66afaf",
  "400": "#339595",
  "500": "#007a7a",
  "600": "#006262",
  "700": "#004949",
  "800": "#003131",
  "900": "#001818"
}

const noirBrown = {
  "50": "#f2ece6",
  "100": "#e4d8cc",
  "200": "#cab199",
  "300": "#af8b66",
  "400": "#956433",
  "500": "#7a3d00",
  "600": "#623100",
  "700": "#492500",
  "800": "#311800",
  "900": "#180c00"
}

const noirPurple = {
  "50": "#eee9ee",
  "100": "#dcd3de",
  "200": "#baa7bc",
  "300": "#977a9b",
  "400": "#754e79",
  "500": "#522258",
  "600": "#421b46",
  "700": "#311435",
  "800": "#210e23",
  "900": "#100712"
}

const themeColors = {
  primary: invertColorIndexes(noirNavy),
  secondary: invertColorIndexes(noirGreen),
  tertiary: invertColorIndexes(noirPurple),
  cancel: invertColorIndexes(noirBrown),
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
        sm: '0.95rem',
        DEFAULT: '0.145rem',
        md: '0.275rem',
        lg: '0.45rem',
        xl: '0.55rem',
        '2xl': '0.85rem',
        '3xl': '1.3rem',
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
