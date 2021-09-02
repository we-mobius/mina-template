import {
  themeDriverScopeManager, pageDriverScopeManager
} from 'MINA/common/index'
import { liftPipeAtom } from 'MobiusUtils'

const PAGENAME = 'home'
const { outputs: { theme } } = themeDriverScopeManager.scope('app')
const {
  inputs: { data },
  outputs: { load }
} = pageDriverScopeManager.scope(PAGENAME, {
  name: PAGENAME,
  data: {
    message: 'Hello, MINA template! Home page!',
    theme: ''
  }
})
load.subscribeValue(options => {
  console.log(`[page launch] ${PAGENAME}`, options)
})
liftPipeAtom(theme, theme => ({ theme }), data)
