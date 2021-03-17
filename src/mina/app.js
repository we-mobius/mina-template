import { replayWithLatest, Data } from 'MobiusUtils'

const whisperRD = replayWithLatest(1, Data.of('The owner is looking for a job as a product manager | business manager.\n\nFor a quickest preview of his info, check https://www.cigaret.world'))

App({
  onLaunch(options) {
    console.log('[app launch]')
    whisperRD.subscribe(({ value: whisper }) => {
      console.log(whisper)
    })
  }
})
