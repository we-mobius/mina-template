import { appDriverScopeManager, updateDriver } from 'MINA/common/index'

console.log(wx.getSystemInfoSync())
console.log(wx.env)

updateDriver({ enableWeChatUpdate: true, enableMINAUpdate: true })

const {
  outputs: { launch, show, hide, error, pageNotFound, unhandledRejection }
} = appDriverScopeManager.scope('app')

launch.subscribeValue(options => {
  console.log('[app] launch', options)
})
show.subscribeValue(options => {
  console.log('[app] show', options)
})
hide.subscribeValue(() => {
  console.log('[app] hide')
})
error.subscribeValue(error => {
  console.log('[app] unhandled error occured ', error)
})
pageNotFound.subscribeValue(res => {
  const { path, isEntryPage } = res
  console.log(`[app] page '${path}' is not found ${isEntryPage ? ' is entry page.' : ''}`, res)
})
unhandledRejection.subscribeValue(res => {
  const { reason } = res
  console.log('[app] unhandled rejection caught ', reason, res)
})
