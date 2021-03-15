/* eslint-disable no-undef */
import { replayWithLatest, Data } from 'MobiusUtils'
import { html, makeComponentWithReplay } from 'MobiusUI'

const author = replayWithLatest(1, Data.of('cigaret'))

// app.js
App({
  onLaunch (options) {
    console.log('[app lunch]')
    author.subscribe(({ value }) => {
      console.warn(value)
    })
    // Do something initial when launch.ggg
  },
  onShow (options) {
    // Do something when show.
  },
  onHide () {
    // Do something when hide.
  },
  onError (msg) {
    console.log(msg)
  },
  globalData: 'I am global data!'
})

// xxx.js
const appInstance = getApp()
console.log(appInstance.globalData) // I am global data
