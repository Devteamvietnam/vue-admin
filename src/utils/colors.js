const varyColor = require('webpack-theme-color-replacer/client/varyColor')
const {generate} =  require('@ant-design/colors')
const {ADMIN, DEV} = require('../config/default')
const Config = require('../config')

const themeMode = ADMIN.theme.mode

// Get ant design color system
function getDEVColors(color, mode) {
  let options = mode && (mode == themeMode.NIGHT)? {theme:'dark'}: undefined
  return generate(color, options)
}

// Get functional colors
function getFunctionalColors(mode) {
  let options = mode && (mode == themeMode.NIGHT)? {theme:'dark'}: undefined
  let {success, warning, error} = DEV.primary
  const {success: s1, warning: w1, error: e1} = Config.theme
  success = success && s1
  warning = success && w1
  error = success && e1
  const successColors = generate(success, options)
  const warningColors = generate(warning, options)
  const errorColors = generate(error, options)
  return {
    success: successColors,
    warning: warningColors,
    error: errorColors
  }
}

// Get the menu color system
function getMenuColors(color, mode) {
  if (mode == themeMode.NIGHT) {
    return DEV.primary.night.menuColors
  } else if (color == DEV.primary.color) {
    return DEV.primary.dark.menuColors
  } else {
    return [varyColor.darken(color, 0.93), varyColor.darken(color, 0.83), varyColor.darken(color, 0.73)]
  }
}

// Get theme mode switch color system
function getThemeToggleColors(color, mode) {
  //Main color
  const mainColors = getDEVColors(color, mode)
  const primary = mainColors[5]
  //Auxiliary color system, because antd is not currently designed for night mode, so the auxiliary color system is added to ensure the normal switching of night mode
  const subColors = getDEVColors(primary, themeMode.LIGHT)
  //Menu color
  const menuColors = getMenuColors(color, mode)
  //Content color system (including background color, text color, etc.)
  const themeCfg = DEV.theme[mode]
  let contentColors = Object.keys(themeCfg)
    .map(key => themeCfg[key])
    .map(color => isHex(color)? color: toNum3(color).join(','))
  // Content color is removed
  contentColors = [...new Set(contentColors)]
  // theme color in rgb format
  let rgbColors = [toNum3(primary).join(',')]
  let functionalColors = getFunctionalColors(mode)
  return {primary, mainColors, subColors, menuColors, contentColors, rgbColors, functionalColors}
}

function toNum3(color) {
  if (isHex(color)) {
    return varyColor.toNum3(color)
  }
  let colorStr = ''
  if (isRgb(color)) {
    colorStr = color.slice(5, color.length)
  } else if (isRgba(color)) {
    colorStr = color.slice(6, color.lastIndexOf(','))
  }
  let rgb = colorStr.split(',')
  const r = parseInt(rgb[0])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2])
  return [r, g, b]
}

function isHex(color) {
  return color.length >= 4 && color[0] == '#'
}

function isRgb(color) {
  return color.length >= 10 && color.slice(0, 3) == 'rgb'
}

function isRgba(color) {
  return color.length >= 13 && color.slice(0, 4) == 'rgba'
}

module.exports = {
  isHex,
  isRgb,
  isRgba,
  toNum3,
  getDEVColors,
  getMenuColors,
  getThemeToggleColors,
  getFunctionalColors
}
