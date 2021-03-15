/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./src/mina/pages/home/home.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line no-undef
Page({
  data: {
    text: 'This is page data.',
    message: 'Hello, MINA template! Home page!!'
  },
  onLoad: function (options) {// 页面创建时执行
  },
  onShow: function () {// 页面出现在前台时执行
  },
  onReady: function () {// 页面首次渲染完毕时执行
  },
  onHide: function () {// 页面从前台变为后台时执行
  },
  onUnload: function () {// 页面销毁时执行
  },
  onPullDownRefresh: function () {// 触发下拉刷新时执行
  },
  onReachBottom: function () {// 页面触底时执行
  },
  onShareAppMessage: function () {// 页面被用户分享时执行
  },
  onPageScroll: function () {// 页面滚动时执行
  },
  onResize: function () {// 页面尺寸变化时执行
  },

  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index);
    console.log(item.pagePath);
    console.log(item.text);
  },

  // 事件响应函数
  viewTap: function () {
    this.setData({
      text: 'Set some data for updating view.'
    }, function () {// this is setData callback
    });
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
});
/******/ })()
;
//# sourceMappingURL=home.js.map