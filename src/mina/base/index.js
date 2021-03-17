// Mobius flavor Base Library for MINA development
import { replayWithLatest, Data } from 'MobiusUtils'

export const makeThemeService = () => {
  // initial current theme state when first called
  const initialTheme = wx.getSystemInfoSync().theme

  const themeRD = replayWithLatest(1, Data.of(initialTheme))

  // update theme state when theme change happen
  wx.onThemeChange(({ theme }) => {
    themeRD.triggerValue(theme)
  })

  return {
    themeRD
  }
}

const themeServices = {}
export const getThemeService = (scope) => {
  themeServices[scope] = themeServices[scope] || makeThemeService()
  return themeServices[scope]
} 