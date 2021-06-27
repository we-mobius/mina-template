(self["webpackChunkmina_template"] = self["webpackChunkmina_template"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Styles/style.css */ "./src/statics/styles/style.css");
/* harmony import */ var _we_mobius_mobius_ui_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @we-mobius/mobius-ui/css */ "../node_modules/@we-mobius/mobius-ui/src/statics/styles/static.css");
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/external/event.js");
/* harmony import */ var MobiusUI__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! MobiusUI */ "../node_modules/@we-mobius/mobius-ui/src/helpers/app.js");
/* harmony import */ var MobiusJS__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! MobiusJS */ "../node_modules/@we-mobius/mobius-js/src/main.js");
/* harmony import */ var Interface_app_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Interface/app.js */ "./src/interface/app.js");





 // initConfig()

(0,MobiusJS__WEBPACK_IMPORTED_MODULE_2__.initTheme)({
  isAutoToggle: () => 'open'
});
MobiusUtils__WEBPACK_IMPORTED_MODULE_3__.completeStateRD.subscribe(() => {
  console.log('[Application] initialize start!');
  const appContainerRD = (0,MobiusUI__WEBPACK_IMPORTED_MODULE_4__.makeAppContainerRD)('mobius-app', {
    className: 'mobius-app'
  });
  (0,MobiusUI__WEBPACK_IMPORTED_MODULE_4__.runApp)(appContainerRD, Interface_app_js__WEBPACK_IMPORTED_MODULE_5__.appTemplateRD);
  console.log('[Application] initialize ended!');
});

/***/ }),

/***/ "./src/interface/app.js":
/*!******************************!*\
  !*** ./src/interface/app.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "appTemplateRD": () => (/* binding */ appTemplateRD)
/* harmony export */ });
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediators.js");
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js");
/* harmony import */ var MobiusUI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! MobiusUI */ "../node_modules/lit-html/lit-html.js");

 // export const appTemplateRD = makeComponentWithReplay(
//   [],
//   () => {
//     console.log('[appTemplateRD]')
//     return html`
//       <div>Welcome to use Mobius Template.</div>
//     `
//   }
// )

const appTemplateRD = (0,MobiusUtils__WEBPACK_IMPORTED_MODULE_0__.replayWithLatest)(1, MobiusUtils__WEBPACK_IMPORTED_MODULE_1__.Data.of(MobiusUI__WEBPACK_IMPORTED_MODULE_2__.html`
  <div>Welcome to use Mobius Template, enjoy!</div>
`));

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/statics/styles/style.css":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/statics/styles/style.css ***!
  \**********************************************************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.id, "/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */\n@-webkit-keyframes spin{to{transform:rotate(360deg)}}\n@keyframes spin{to{transform:rotate(360deg)}}@-webkit-keyframes ping{75%,to{transform:scale(2);opacity:0}}@keyframes ping{75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes pulse{50%{opacity:.5}}@keyframes pulse{50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:none;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";line-height:1.5}body{font-family:system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';font-family:inherit;line-height:inherit}code{font-size:1em;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}body,p{margin:0}a{color:inherit;text-decoration:inherit}object,svg{display:block;vertical-align:middle}.static{position:static}.relative{position:relative}*{--tw-shadow:0 0 #0000;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59, 130, 246, 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./src/statics/styles/style.css":
/*!**************************************!*\
  !*** ./src/statics/styles/style.css ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var api = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./src/statics/styles/style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.id, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/index.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map