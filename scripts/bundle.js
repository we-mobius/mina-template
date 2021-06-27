import { emptyDirSync, rootResolvePath } from './utils.js'
import { getWebpackConfig } from '../webpack.config.js'
import webpack from 'webpack'

const BUILD_MODE = 'release'
const BUILD_TARGET_DES = 'release'

const empty = () => {
  return new Promise((resolve) => {
    emptyDirSync(rootResolvePath(BUILD_TARGET_DES))
    resolve()
  })
}

const pack = () => {
  return new Promise((resolve) => {
    webpack(getWebpackConfig({ mode: BUILD_MODE }))
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

// execute
empty()
  .then(() => pack())
  .then(() => {
    console.log(`${BUILD_MODE} Build Complete!!!`)
  })
