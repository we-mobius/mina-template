;require('./runtime');require('./vendors');(wx["webpackChunkmina_template"] = wx["webpackChunkmina_template"] || []).push([["app"],{

/***/ "./src/mina/app.js":
/*!*************************!*\
  !*** ./src/mina/app.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediators.js");
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js");
/* harmony import */ var MINA_common_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MINA/common/index.js */ "../node_modules/@we-mobius/mobius-mina/src/es/theme.js");


(0,MINA_common_index_js__WEBPACK_IMPORTED_MODULE_0__.getThemeService)('app');
const whisperRD = (0,MobiusUtils__WEBPACK_IMPORTED_MODULE_1__.replayWithLatest)(1, MobiusUtils__WEBPACK_IMPORTED_MODULE_2__.Data.of('The owner is looking for a job as a product manager | business manager.\n\nFor a quickest preview of his info, check https://www.cigaret.world'));
App({
  onLaunch(options) {
    console.log('[app launch]');
    whisperRD.subscribe(({
      value: whisper
    }) => {
      console.log(whisper);
    });
  },

  onError(error) {
    console.log('[app] unhandled error occured ', error);
  },

  onPageNotFound({
    path,
    isEntryPage
  }) {
    console.log(`[app] page '${path}' is not found ${isEntryPage ? ' is entry page.' : ''}`);
  },

  onUnhandledRejection({
    reason
  }) {
    console.log('[app] unhandled rejection caught ', reason);
  }

});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/mina/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app.js.map