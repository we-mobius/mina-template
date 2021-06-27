import { emptyDirSync, rootResolvePath } from './utils.js'
import { getWebpackConfig } from '../webpack.config.js'
import webpack from 'webpack'
import { argv } from 'process'

const BUILD_TYPE = argv[2] ? argv[2].split('=')[1] : ''

const BUILD_MODE = 'build'
const BUILD_TARGET_DES = 'build'
emptyDirSync(rootResolvePath(BUILD_TARGET_DES))

const webpackConfig = getWebpackConfig({ mode: BUILD_MODE })
console.info('【webpackConfig】' + JSON.stringify(webpackConfig))
const [minaConfig, webConfig] = webpackConfig

const packWeb = () => {
  return new Promise((resolve) => {
    webpack(webConfig)
      .run((err, stats) => {
        // @see https://webpack.js.org/api/node/#error-handling
        if (err) {
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          return
        }

        const info = stats.toJson()

        if (stats.hasErrors()) {
          console.error(info.errors)
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings)
        }

        resolve()
      })
  })
}

const packMINA = () => {
  return new Promise((resolve) => {
    webpack(minaConfig)
      .run((err, stats) => {
        // @see https://webpack.js.org/api/node/#error-handling
        if (err) {
          console.error(err.stack || err)
          if (err.details) {
            console.error(err.details)
          }
          return
        }

        const info = stats.toJson()

        if (stats.hasErrors()) {
          console.error(info.errors)
        }

        if (stats.hasWarnings()) {
          console.warn(info.warnings)
        }

        resolve()
      })
  })
}

const pack = () => {
  let childTask = []
  if (BUILD_TYPE === 'web') {
    childTask = [packWeb()]
  } else if (BUILD_TYPE === 'mina') {
    childTask = [packMINA()]
  } else {
    childTask = [packWeb(), packMINA()]
  }

  // execute
  Promise.all(childTask)
    .then(() => {
      console.log(`${BUILD_MODE} Build Complete!!!`)
    })
    .catch(err => {
      console.error(err)
    })
}

pack()
