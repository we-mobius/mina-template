import { replayWithLatest, Data } from 'MobiusUtils'
import { getThemeService } from './base/index.js'

getThemeService('app')

const whisperRD = replayWithLatest(1, Data.of('The owner is looking for a job as a product manager | business manager.\n\nFor a quickest preview of his info, check https://www.cigaret.world'))

App({
  onLaunch(options) {
    console.log('[app launch]')
    whisperRD.subscribe(({ value: whisper }) => {
      console.log(whisper)
    })
  },
  onError(error) {
    console.log(`[app] unhandled error occured `, error)
  },
  onPageNotFound({ path, isEntryPage }) {
    console.log(`[app] page '${path}' is not found ${isEntryPage ? ' is entry page.' : ''}`)
  },
  onUnhandledRejection({ reason }) {
    console.log(`[app] unhandled rejection caught `, reason)
  }
})
