;require('./../../runtime');require('./../../vendors');(wx["webpackChunkmina_template"] = wx["webpackChunkmina_template"] || []).push([["pages/home/home"],{

/***/ "./src/mina/pages/home/home.js":
/*!*************************************!*\
  !*** ./src/mina/pages/home/home.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var MINA_common_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MINA/common/index.js */ "../node_modules/@we-mobius/mobius-mina/src/es/theme.js");

const {
  themeRD
} = (0,MINA_common_index_js__WEBPACK_IMPORTED_MODULE_0__.getThemeService)('app');
Page({
  data: {
    message: 'Hello, MINA template! Home page!',
    theme: ''
  },
  onLoad: function (options) {
    console.log('[page launch] home');
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
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/mina/pages/home/home.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=home.js.map