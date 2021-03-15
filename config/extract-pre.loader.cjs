
// export default function main (source) {
//   return source
//     .replace(/from "(.*)cssWithMappingToString.js";/g, 'from "css-loader/dist/runtime/cssWithMappingToString.js";')
//     .replace(/from "(.*)api.js";/g, 'from "css-loader/dist/runtime/api.js";')
// }

module.exports = function (source) {
  const newSource = source.replace(/require\("(.*)"\);/g, 'require("css-loader/dist/runtime/api.js")')
  // ! css-loader@5 使用 es6 模块，暂时不能正常工作
  // const newSource = source
  //   .replace(/from "(.*)cssWithMappingToString.js";/g, 'from "css-loader/dist/runtime/cssWithMappingToString.js";')
  //   .replace(/from "(.*)api.js";/g, 'from "css-loader/dist/runtime/api.js";')
  // ! hot reload 太麻烦了

  // let css
  // // css = source.match(/exports\.push\(\[module.id, "(.*)", ""]\);/)[1]

  // try {
  //   // eslint-disable-next-line no-eval
  //   const evaled = eval(newSource)
  //   console.log('[evaled] -> ')
  //   console.log(evaled)
  //   css = evaled[0][1]
  // } catch (e) {
  //   console.log('[error] -> ')
  //   console.log(e)
  // }

  // console.log('[css]')
  // console.log(css)

  return newSource
}
