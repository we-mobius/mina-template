import { getThemeService } from 'MINA/common/index.js'

const { themeRD } = getThemeService('app')

Page({
  data: {
    message: 'Hello, MINA template! Home page!',
    theme: ''
  },

  onLoad: function (options) {
    console.log('[page launch] home')
    themeRD.subscribe(({ value }) => {
      this.setData({ theme: value })
    })
  }
})
