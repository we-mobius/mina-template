import { getThemeService } from 'MINA/common/index.js'

const { themeRD } = getThemeService('app')

Page({
  data: {
    message: 'Hello, MINA template! Me page!',
    theme: ''
  },
  onLoad: function (options) {
    console.log('[page launch] me')
    themeRD.subscribe(({ value }) => {
      this.setData({ theme: value })
    })
  }
})
