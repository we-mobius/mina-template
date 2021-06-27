;require('./../../runtime');require('./../../vendors');(wx["webpackChunkmina_template"] = wx["webpackChunkmina_template"] || []).push([["pages/me/me"],{

/***/ "./src/mina/pages/me/me.js":
/*!*********************************!*\
  !*** ./src/mina/pages/me/me.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var MINA_common_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MINA/common/index.js */ "../node_modules/@we-mobius/mobius-mina/src/es/theme.js");

const {
  themeRD
} = (0,MINA_common_index_js__WEBPACK_IMPORTED_MODULE_0__.getThemeService)('app');
Page({
  data: {
    message: 'Hello, MINA template! Me page!',
    theme: ''
  },
  onLoad: function (options) {
    console.log('[page launch] me');
    themeRD.subscribe(({
      value
    }) => {
      this.setData({
        theme: value
      });
    });
  }
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/mina/pages/me/me.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=me.js.map