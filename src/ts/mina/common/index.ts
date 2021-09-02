// Mobius flavor Base Library for MINA development
import { makeScopeManager } from 'MobiusUtils'
import {
  themeDriver,
  appDriver, pageDriver
} from 'MobiusMINA'

export * from 'MobiusMINA'

export const themeDriverScopeManager = makeScopeManager(themeDriver)
export const appDriverScopeManager = makeScopeManager(appDriver)
export const pageDriverScopeManager = makeScopeManager(pageDriver)
