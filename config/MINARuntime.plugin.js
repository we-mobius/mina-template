/**
 * refer: https://juejin.cn/post/6844903864097832967#heading-10
 * derived from https://github.com/tinajs/mina-webpack/blob/master/packages/mina-runtime-webpack-plugin/index.js
 */
import path from 'path'
import { ConcatSource } from 'webpack-sources'
import webpack from 'webpack'

const { JavascriptModulesPlugin } = webpack.javascript

function ensurePosix (filepath) {
  if (path.sep !== '/') {
    return filepath.split(path.sep).join('/')
  }

  return filepath
}

function requiredPath (pathStr) {
  if (path.isAbsolute(pathStr)) {
    return pathStr
  } else {
    // we don't need path.sep check tests in windows
    return './' + pathStr
  }
};

// function isRuntimeExtracted (compilation) {
//   return [...compilation.chunks].some(chunk => {
//     return chunk.isOnlyInitial() && chunk.hasRuntime() && !chunk.hasEntryModule()
//   })
// }

function script ({ dependencies }) {
  return ';' + dependencies.map(file => `require('${requiredPath(file)}');`).join('')
}

export class MINARuntimePlugin {
  constructor (options = {}) {
    this.runtime = options.runtime || ''
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('MinaRuntimePlugin', compilation => {
      // if (!isRuntimeExtracted(compilation)) {
      //   throw new Error(
      //     [
      //       'Please reuse the runtime chunk to avoid duplicate loading of javascript files.',
      //       "Simple solution: set `optimization.runtimeChunk` to `{ name: 'runtime.js' }` .",
      //       'Detail of `optimization.runtimeChunk`: https://webpack.js.org/configuration/optimization/#optimization-runtimechunk .'
      //     ].join('\n')
      //   )
      // }

      const injectDeps = (source, renderContext) => {
        const dependencies = []
        const startChunk = renderContext.chunk
        if (!startChunk.hasEntryModule()) {
          return source
        }

        startChunk.groupsIterable.forEach(group => {
          group.chunks.forEach(chunk => {
            /**
               * assume output.filename is chunk.name here
               */
            const filename = ensurePosix(path.relative(path.dirname(startChunk.name), chunk.name))

            if (chunk === startChunk || ~dependencies.indexOf(filename)) {
              return
            }
            dependencies.push(filename)
          })
        })
        console.log(`【MinaRuntimePlugin】 chunk: ${startChunk.name}, deps: `, dependencies)

        source = new ConcatSource(script({ dependencies }), source)
        return source
      }
      JavascriptModulesPlugin.getCompilationHooks(compilation).renderChunk.tap(
        'MinaRuntimePlugin',
        (source, renderContext) => injectDeps(source, renderContext)
      )
    })
  }
}
