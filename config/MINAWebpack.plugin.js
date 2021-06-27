import webpack from 'webpack'
import path from 'path'
import fs from 'fs'
import { cwd } from 'process'

const { EntryPlugin, MultiEntryPlugin } = webpack
const isArray = tar => Object.prototype.toString.call(tar) === '[object Array]'
const isObject = tar => Object.prototype.toString.call(tar) === '[object Object]'

// refer: https://github.com/listenzz/MyMina

const MINADir = path.resolve(cwd(), './src/mina')

const itemToPlugin = (context, item, name) => {
  if (Array.isArray(item)) {
    return new MultiEntryPlugin(context, item, name)
  }
  return new EntryPlugin(context, item, name)
}

export const grabEntries = (context) => {
  console.log('[grabEntries] start!')

  const entries = {}

  // 遍历各级目录，解析 [dirname].json 文件
  const classifyFiles = (startPath, jsons = [], css = []) => {
    // ['components', 'pages', 'app.css', ...]
    const files = fs.readdirSync(startPath)
    files.forEach(item => {
      const filepath = path.resolve(startPath, item)
      if (filepath.endsWith('.json')) {
        jsons.push(filepath)
      }
      if (filepath.endsWith('.css')) {
        css.push(filepath)
      }
      if (fs.statSync(filepath).isDirectory()) {
        classifyFiles(filepath, jsons, css)
      }
    })
    return [jsons, css]
  }
  const [jsons, css] = classifyFiles(MINADir)
  // console.log(jsons, css)

  // 获取 pages 和 usingComponents 的值即页面或组件的路径
  // 遍历上一步获取到的路径，构建 entry 配置
  //   -> pages filename -> pages/[name]/[name].js
  //   -> components filename -> components/[name]/[name].js
  jsons.forEach(jsonpath => {
    const content = fs.readFileSync(jsonpath, 'utf8')
    const config = JSON.parse(content)
    const { pages, usingComponents } = config
    if (isArray(pages)) {
      pages.forEach(page => {
        const name = page.split('/').pop()
        entries[name] = entries[name] || {
          import: path.resolve(MINADir, `${page}.js`),
          filename: `${page}.js`,
          fullname: page
        }
      })
    }
    if (isObject(usingComponents)) {
      Object.values(usingComponents).forEach(component => {
        const name = component.split('/').pop()
        entries[name] = entries[name] || {
          import: path.resolve(MINADir, `${component}.js`),
          filename: `${component}.js`,
          fullname: component
        }
      })
    }
  })
  entries.app = entries.app || {
    import: './src/mina/app.js',
    filename: 'app.js',
    fullname: 'app'
  }

  css.forEach(item => {
    const relativePath = path.relative(MINADir, item)
    const { name } = path.parse(item)
    if (name.startsWith('_')) return
    entries[relativePath] = entries[relativePath] || {
      import: item,
      filename: relativePath,
      fullname: path.dirname(relativePath)
    }
  })

  console.log('entries -> ', entries)
  console.log('[grabEntries] complete!')
  return entries
}

export class MINAWebpackPlugin {
  constructor () {
    this.entries = {}
  }

  // apply 是每一个插件的入口
  applyEntry (compiler, done) {
    const { context, entry } = compiler.options
    console.log('[applyEntries] start!')

    try {
      this.entries = { ...entry, ...grabEntries(context) }
    } catch (e) {
      console.log(e)
    }

    Object.entries(this.entries)
      .filter(([name, detail]) => detail.import.endsWith('.js'))
      .map(([name, detail]) => {
        // ! './' is necessary
        detail.relativeToRoot = './' + path.relative(context, detail.import)
        return [name, detail]
      })
      .forEach(([name, detail]) => itemToPlugin(context, detail.relativeToRoot, detail.fullname).apply(compiler))

    Object.entries(this.entries)
      .filter(([name, detail]) => detail.import.endsWith('.css'))
      .map(([name, detail]) => {
        detail.relativeToRoot = './' + path.relative(context, detail.import)
        return [name, detail]
      })
      .forEach(([name, detail], idx) => itemToPlugin(context, detail.relativeToRoot, `__assets_chunk_name__${idx}`).apply(compiler))

    console.log('[applyEntries] complete!')

    if (done) {
      done()
    }
  }

  apply (compiler) {
    compiler.hooks.entryOption.tap('MINAWebpackPlugin', () => {
      this.applyEntry(compiler)
      return true
    })

    compiler.hooks.watchRun.tap('MINAWebpackPlugin', (compiler, done) => {
      this.applyEntry(compiler, done)
    })

    compiler.hooks.compilation.tap('MINAWebpackPlugin', compilation => {
      // beforeChunkAssets 事件在 compilation.createChunkAssets 方法之前被触发
      compilation.hooks.beforeChunkAssets.tap('MINAWebpackPlugin', () => {
        const chunks = [...compilation.chunks]
        compilation.chunks = new Set([...chunks.filter((chunk, idx) => {
          const { name } = chunk
          // 移除该 chunk, 使之不会生成对应的 asset，也就不会输出文件
          // 如果没有这一步，最后会生成  __assets_chunk_name__[idx].js 文件
          return name && !name.startsWith('__assets_chunk_name__')
        })])
      })
    })
  }
}
