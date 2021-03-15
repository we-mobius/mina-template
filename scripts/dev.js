import { emptyDirSync, rootResolvePath, copyFileSync } from './utils.js'

import webpack from 'webpack'
import path from 'path'
import WebpackDevServer from 'webpack-dev-server'
import webpackHotMiddleware from 'webpack-hot-middleware'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { getWebpackConfig } from '../webpack.config.js'
import { argv } from 'process'

const BUILD_TYPE = argv[2] ? argv[2].split('=')[1] : ''

const BUILD_MODE = 'development'
const BUILD_TARGET_DES = 'dev'
const resolvePathInDes = (...paths) => path.join(BUILD_TARGET_DES, ...paths)
emptyDirSync(rootResolvePath(BUILD_TARGET_DES))

// ref: https://github.com/webpack/webpack-dev-server/blob/master/examples/api/simple/server.js
// ref: https://webpack.js.org/configuration/dev-server/
const webpackConfig = getWebpackConfig({ mode: BUILD_MODE })
console.info('【webpackConfig】' + JSON.stringify(webpackConfig))
const devServerOptions = Object.assign({}, {
  headers: { 'Access-Control-Allow-Origin': '*' },
  https: true,
  writeToDisk: true,
  compress: true,
  port: 3000,
  open: true, // browser extension development do not need to open the page
  hot: true,
  clientLogLevel: 'trace',
  watchOptions: {
    aggregateTimeout: 1000
    // ignored: /node_modules/
  },
  disableHostCheck: true
})
console.info('【devServerOptions】' + JSON.stringify(devServerOptions))

const [minaConfig, webConfig] = webpackConfig

let hotMiddleware
const startWeb = () => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webConfig)
    hotMiddleware = webpackHotMiddleware(compiler, {
      // path: '/__webpack_hmr',
      // path: rootResolvePath('__webpack_hmr'),
      // path: 'http://localhost:3000/__webpack_hmr',
      log: false,
      heartbeat: 2000
    })

    compiler.hooks.compilation.tap('compilation', compilation => {
      // refer: https://github.com/jantimon/html-webpack-plugin
      HtmlWebpackPlugin.getHooks(compilation).afterEmit.tapAsync(
        'html-webpack-plugin-after-emit',
        (data, callback) => {
          hotMiddleware.publish({ action: 'reload' })
          callback()
        }
      )
    })

    // webpack 打包结束之后 copy 必要的静态文件
    compiler.hooks.done.tap('MobiusCopyPlugin', stats => {
      copyFileSync(
        rootResolvePath('src/statics/images/thoughts-daily.png'),
        rootResolvePath(resolvePathInDes('statics/images/thoughts-daily.png'))
      )
      copyFileSync(
        rootResolvePath('src/statics/images/beian.png'),
        rootResolvePath(resolvePathInDes('statics/images/beian.png'))
      )
      console.log('【MobiusCopyPlugin】 extra files copyed!')
    })

    const server = new WebpackDevServer(
      compiler,
      {
        ...devServerOptions,
        // quiet: true,
        before (app, ctx) {
          app.use(hotMiddleware)
          ctx.middleware.waitUntilValid(() => {
            resolve()
          })
        }
      }
    )

    server.listen(devServerOptions.port, '127.0.0.1', () => {
      console.info(`Starting server on http://localhost:${devServerOptions.port}`)
    })
  })
}

const startMINA = () => {
  return new Promise((resolve, reject) => {
    const compiler = webpack(minaConfig)

    compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
      console.log('【MINA】', 'compiling...')
      // hotMiddleware.publish({ action: 'compiling' })
      done()
    })

    compiler.watch({}, (err, stats) => {
      if (err) {
        console.log(err)
        return
      }

      console.log('assets -> ')
      console.log(Object.keys(stats.compilation.assets))

      console.log('【MINA】 compiled!')

      resolve()
    })
  })
}

const start = () => {
  let childTask = []
  if (BUILD_TYPE === 'web') {
    childTask = [startWeb()]
  } else if (BUILD_TYPE === 'mina') {
    childTask = [startMINA()]
  } else {
    childTask = [startWeb(), startMINA()]
  }

  Promise.all(childTask)
    .catch(err => {
      console.error(err)
    })
}

start()
