import { rootResolvePath } from '../scripts/utils.js'
import { getMobiusConfig } from './mobius.config.js'
import { getProductionLoaders } from './loaders.config.js'
import { getProductionPlugins } from './plugins.config.js'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

import path from 'path'
import { cwd } from 'process'

const ROOT = cwd()
const PATHS = {
  src: rootResolvePath('src'),
  output: rootResolvePath('dist')
}

const reusedConfigs = {
  mode: 'production',
  optimization: {
    minimize: true,
    providedExports: true,
    usedExports: true,
    sideEffects: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_debugger: true,
            drop_console: true
          },
          format: {
            comments: false
          }
        }
      })
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      automaticNameDelimiter: '~',
      chunks: 'all',
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      defaultSizeTypes: ['javascript', 'unknown'],
      minChunks: 1,
      minSize: 30000,
      enforceSizeThreshold: 50000,
      minRemainingSize: 0,
      name: false,
      usedExports: true,
      cacheGroups: {
        default: false,
        libs: {
          name: 'libs',
          test: (module, chunks) => {
            if (/src\\libs/.test(module.context)) {
              console.log('【splitChunks】 libs', module.context)
              return true
            }
          },
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
          priority: 0
        },
        common: {
          name: 'common',
          test: (module, chunks) => {
            if (/src\\mina\\common/.test(module.context)) {
              console.log('【splitChunks】 common', module.context)
              return true
            }
          },
          chunks: 'all',
          reuseExistingChunk: true,
          enforce: true,
          priority: 0
        },
        vendors: {
          test: (module, chunks) => {
            if (/node_modules/.test(module.context)) {
              // console.log('【splitChunks】 vendors', module.context)
              return true
            }
          },
          name: 'vendors',
          chunks: 'all',
          priority: 1000
        }
      }
    }
  },
  devtool: 'source-map'
  // devtool: 'hidden-nosources-source-map'
}

// minaConfig:
//   -> remove htmlWebpackPlugin for mina entry
//   -> minaConfig.output.globalObject = 'wx'
//   -> copy extra assets
//   -> custom *.css loader rules
const MINA_OUTPUT_PATH = path.resolve(PATHS.output, './mina')
const minaConfig = {
  ...reusedConfigs,
  output: {
    path: MINA_OUTPUT_PATH,
    globalObject: 'wx'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            // refer: https://webpack.docschina.org/loaders/file-loader/
            loader: 'file-loader',
            options: {
              name: (resourcePath) => {
                console.log(`【resourcePath】 CSS to file: start -> ${resourcePath}`)
                // resourcePath
                //   -> D:\Files\CodeSpace\mobius-project-workspace\mina-template\src\mina\pages\test\test.css
                // relativePath
                //   -> pages\test\test.css
                const relativePath = path.relative(rootResolvePath('src/mina'), resourcePath)
                // parsed
                //   -> { root: '', dir: 'pages\\test', base: 'test.css', ext: '.css', name: 'test' }
                const { dir, name } = path.parse(relativePath)
                // finally
                //  -> pages\test\test.wxss
                const out = `${dir}\\${name}.wxss`
                console.log(`【resourcePath】 CSS to file: out -> ${out}`)
                return out
              }
            }
          },
          'extract-loader',
          // refer: https://webpack.js.org/loaders/css-loader/
          {
            loader: path.resolve(ROOT, './config/extract-pre.loader.cjs')
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              import: true
            }
          },
          'postcss-loader'
        ],
        sideEffects: true
      },
      {
        oneOf: [...getProductionLoaders()]
      }
    ]
  },
  plugins: [
    // do not use htmlWebpackPlugin
    ...getProductionPlugins().slice(2),
    // CopyPlugin configurations: https://github.com/webpack-contrib/copy-webpack-plugin
    new CopyPlugin([
      {
        from: './src/statics/images/',
        // to 可以写相对 webpack.config.output.path 的路径，比如 './statics/images/'
        // 但 CopyPlugin 插件的文档中没有明确说明 to 最终路径的计算规则
        // 所以我个人推荐手动计算绝对路径，如下
        to: path.resolve(MINA_OUTPUT_PATH, './statics/images/'),
        toType: 'dir'
      },
      {
        from: './src/statics/favicons/',
        // to 可以写相对 webpack.config.output.path 的路径，比如 './statics/favicons/'
        // 但 CopyPlugin 插件的文档中没有明确说明 to 最终路径的计算规则
        // 所以我个人推荐手动计算绝对路径，如下
        to: path.resolve(MINA_OUTPUT_PATH, './statics/favicons/'),
        toType: 'dir'
      },
      {
        from: './src/mina',
        // to 可以写相对 webpack.config.output.path 的路径，比如 './mina'
        // 但 CopyPlugin 插件的文档中没有明确说明 to 最终路径的计算规则
        // 所以我个人推荐手动计算绝对路径，如下
        to: MINA_OUTPUT_PATH,
        toType: 'dir',
        ignore: ['**/*.js', '**/*.css']
      },
      {
        from: './src/mina/workers',
        to: path.resolve(MINA_OUTPUT_PATH, './workers'),
        toType: 'dir'
      }
    ])
  ]
}

// webConfig:
const WEB_OUTPUT_PATH = path.resolve(PATHS.output, './web')
const webConfig = {
  ...reusedConfigs,
  output: {
    filename: '[name].[contenthash:7].js',
    path: WEB_OUTPUT_PATH,
    publicPath: getMobiusConfig().publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 添加在 CSS 文件中引用的其它资源路径的前面，可用于配置 CDN，不如 file-loader 设置的 publicPath 优先
              // publicPath: 'https://cdn.cigaret.world/'
            }
          },
          'css-loader',
          'postcss-loader'
        ],
        sideEffects: true
      },
      {
        oneOf: [...getProductionLoaders()]
      }
    ]
  },
  plugins: [
    ...getProductionPlugins().splice(0, 2),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:10].css',
      chunkFilename: 'styles/[id].[contenthash:10].css'
    }),
    // CopyPlugin configurations: https://github.com/webpack-contrib/copy-webpack-plugin
    new CopyPlugin([
      {
        from: './src/statics/favicons/',
        // to 可以写相对 webpack.config.output.path 的路径，比如 './statics/favicons/'
        // 但 CopyPlugin 插件的文档中没有明确说明 to 最终路径的计算规则
        // 所以我个人推荐手动计算绝对路径，如下
        to: path.resolve(WEB_OUTPUT_PATH, './statics/favicons/'),
        toType: 'dir'
      },
      {
        from: './src/statics/images/',
        // to 可以写相对 webpack.config.output.path 的路径，比如 './statics/images/'
        // 但 CopyPlugin 插件的文档中没有明确说明 to 最终路径的计算规则
        // 所以我个人推荐手动计算绝对路径，如下
        to: path.resolve(WEB_OUTPUT_PATH, './statics/images/'),
        toType: 'dir'
      },
      {
        from: './src/statics/styles/fonts/',
        to: path.resolve(WEB_OUTPUT_PATH, './statics/styles/fonts/'),
        toType: 'dir'
      }
    ])
  ]
}

export const getProductionConfig = () => ([{
  target: 'web',
  entry: () => {
    // return grabEntries(cwd())
    return {}
  },
  ...minaConfig
}, {
  target: 'web',
  entry: {
    // NOTE: entry sort matters style cascading
    static: './src/static.js',
    index: './src/index.js'
  },
  ...webConfig
}])
