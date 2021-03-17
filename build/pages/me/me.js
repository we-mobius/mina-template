/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/mina/base/index.js":
/*!********************************!*\
  !*** ./src/mina/base/index.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeThemeService": () => (/* binding */ makeThemeService),
/* harmony export */   "getThemeService": () => (/* binding */ getThemeService)
/* harmony export */ });
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediator.js");
/* harmony import */ var MobiusUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! MobiusUtils */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js");
// Mobius flavor Base Library for MINA development

const makeThemeService = () => {
  // initial current theme state when first called
  const initialTheme = wx.getSystemInfoSync().theme;
  const themeRD = (0,MobiusUtils__WEBPACK_IMPORTED_MODULE_0__.replayWithLatest)(1, MobiusUtils__WEBPACK_IMPORTED_MODULE_1__.Data.of(initialTheme)); // update theme state when theme change happen

  wx.onThemeChange(({
    theme
  }) => {
    themeRD.triggerValue(theme);
  });
  return {
    themeRD
  };
};
const themeServices = {};
const getThemeService = scope => {
  themeServices[scope] = themeServices[scope] || makeThemeService();
  return themeServices[scope];
};

/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js":
/*!******************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAtom": () => (/* binding */ isAtom),
/* harmony export */   "BaseAtom": () => (/* binding */ BaseAtom)
/* harmony export */ });
/* harmony import */ var _functional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../functional.js */ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js");
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");



const isAtom = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isAtom

/**
 * !! please consider BaseMediator when add property or method to BaseAtom
 */
class BaseAtom {
  get isAtom () {
    return true
  }

  pipe (...args) {
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.pipe)(...args)(this)
  }

  compose (...args) {
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.compose)(...args)(this)
  }
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js":
/*!******************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isData": () => (/* binding */ isData),
/* harmony export */   "Data": () => (/* binding */ Data)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _meta_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../meta.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/meta.js");
/* harmony import */ var _mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mutation.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/mutation.atom.js");
/* harmony import */ var _base_atom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js");





const isData = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isData

class Data extends _base_atom_js__WEBPACK_IMPORTED_MODULE_1__.BaseAtom {
  constructor (value) {
    super()
    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(value)) {
      this._datar = value
    } else {
      this._datar = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(value)
    }
    this._consumers = new Set()
  }

  get type () {
    return 'DataAtom'
  }

  get isData () {
    return true
  }

  get isEmpty () {
    return this._datar.isEmpty
  }

  static of (value) {
    return new Data(value)
  }

  // Data.empty() <=> Data.of(VACUO)
  static empty () {
    return new Data(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.empty())
  }

  // Data 常规值
  get datar () { return this._datar }
  get value () { return this._datar.value }

  // Data 流式值
  // consumer:: a -> ()
  // subscribe :: (a -> ()) -> SubscribeController
  subscribe (consumer) {
    // 维护 consumer 列表
    // 保证数据 mutate 之后 notify/trigger consumer
    // unsubscribe 机制
    this._consumers.add(consumer)
    return {
      unsubscribe: () => {
        return this._consumers.delete(consumer)
      }
    }
  }

  trigger (datar) {
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(datar) && !(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(datar)) {
      throw (new TypeError('Data must be triggered with a Datar.'))
    }
    const _datar = datar || this.datar
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(_datar)) {
      this._consumers.forEach(consumer => {
        consumer(_datar)
      })
    }
  }

  triggerValue (value) {
    return this.trigger(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(value))
  }

  // Data 流式变更 1
  observe (mutation) {
    if (!(0,_mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__.isMutation)(mutation)) {
      throw (new TypeError('Data can only observe a Mutation!'))
    }
    return mutation.subscribe(mutator => {
      this.mutate(mutator)
    })
  }

  // Data 流式变更 2
  beObservedBy (mutation) {
    return mutation.observe(this)
  }

  // Data 常规变更
  // 接收 mutation -> mutation 执行数据变更 -> 保存 mutation 结果 -> 广播 mutation 结果
  // mutate :: Mutation -> Data
  // mutator :: Mutator -> Data
  // mutate :: f -> Data
  mutate (mutation) {
    let _mutator = null
    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(mutation)) {
      _mutator = mutation
    } else if ((0,_mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__.isMutation)(mutation)) {
      _mutator = mutation.mutator
    } else if ((0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(mutation)) {
      _mutator = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(mutation)
    } else {
      throw (new TypeError('Param of "mutate" must be a Mutation or a Mutator or a normal Function.'))
    }

    const _tempDatar = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(_mutator.run(this._datar)).fill(_mutator)

    // NOTE: If result of operation is TERMINATOR,
    // do not update the datar or trigger the subscribers
    if (!(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isTerminator)(_tempDatar.value)) {
      this._datar = _tempDatar
      this.trigger()
    }

    return this
  }

  // registerTrigger :: ((datar -> trigger(datar)) -> controller, options) -> controller
  // registerTrigger :: ((value -> trigger(mutator)) -> controller, options) -> controller
  registerTrigger (trigger, { forceWrap = false } = {}) {
    const _internalTriggerFunction = (...args) => {
      if (!(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(args[0]) || forceWrap) {
        args[0] = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(args[0])
      }
      return this.trigger(...args)
    }
    const controller = trigger(_internalTriggerFunction)
    return controller
  }
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/mutation.atom.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/mutation.atom.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMutation": () => (/* binding */ isMutation),
/* harmony export */   "Mutation": () => (/* binding */ Mutation)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _meta_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../meta.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/meta.js");
/* harmony import */ var _data_atom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js");
/* harmony import */ var _base_atom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js");





const isMutation = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isMutation

class Mutation extends _base_atom_js__WEBPACK_IMPORTED_MODULE_1__.BaseAtom {
  // mutation 其实是一个函数
  // mutation :: a -> a
  constructor (operation, options) {
    super()
    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(operation)) {
      this._mutator = operation
    } else if ((0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(operation)) {
      this._mutator = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(operation)
    } else {
      throw new TypeError('Param of Mutation constructor must be a Mutator or a Function.')
    }
    if (options) {
      this._options = options
    }
    this._consumers = new Set()
  }

  get type () {
    return 'MutationAtom'
  }

  get isMutation () {
    return true
  }

  get isEmpty () {
    return this._mutator.isEmpty
  }

  // operation :: (datar, datar) -> any
  // operation :: (value, datar) -> any
  // operation :: (datar, value) -> any
  // operation :: (value, value) -> any
  static of (operation) {
    return new Mutation(operation)
  }

  static empty () {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.empty())
  }

  static ofLift (operation, options) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.lift(operation, options), { isLifted: true, origin_operation: operation })
  }

  static ofLiftBoth (operation) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.liftBoth(operation), { isLifted: true, origin_operation: operation })
  }

  static ofLiftLeft (operation) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.liftLeft(operation), { isLifted: true, origin_operation: operation })
  }

  static ofLiftRight (operation) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.liftRight(operation), { isLifted: true, origin_operation: operation })
  }

  // Mutation 常规值
  get mutator () { return this._mutator }
  get operation () {
    if (this._options && this._options.isLifted) {
      return this._options.origin_operation
    } else {
      return this._mutator.operation
    }
  }

  // Mutation 流式值
  // consumer :: f -> ()
  // subscribe :: (f -> ()) -> SubscribeController
  subscribe (consumer) {
    // 维护 consumer 列表
    // 保证数据 mutate 之后 notify/trigger consumer
    // unsubscribe 机制
    this._consumers.add(consumer)
    return {
      unsubscribe: () => {
        return this._consumers.delete(consumer)
      }
    }
  }

  trigger (mutator) {
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(mutator) && !(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(mutator)) {
      throw (new TypeError('Mutation must be triggered with a Mutator.'))
    }
    const _mutator = mutator || this.mutator
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(_mutator)) {
      this._consumers.forEach(consumer => {
        consumer(_mutator)
      })
    }
  }

  triggerOperation (operation) {
    return this.trigger(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(operation))
  }

  // Mutation 流式变更 1
  observe (data) {
    if (!(0,_data_atom_js__WEBPACK_IMPORTED_MODULE_3__.isData)(data)) {
      throw (new TypeError('Mutation can only observe a Data!'))
    }
    return data.subscribe(datar => {
      this.mutate(datar)
    })
  }

  // Mutation 流式变更 2
  beObservedBy (data) {
    return data.observe(this)
  }

  // Mutation 常规变更
  // mutate :: Datar -> Mutation
  // mutate :: Data -> Mutation
  // mutate :: Any -> Mutation
  mutate (data) {
    let _datar = null
    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(data)) {
      _datar = data
    } else if ((0,_data_atom_js__WEBPACK_IMPORTED_MODULE_3__.isData)(data)) {
      _datar = data.datar
    } else {
      _datar = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(data)
    }

    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isTerminator)(_datar.value)) return this

    // 运行效果相当于：const _tempMutator = this._mutator.fill(_datar)
    // 但实际意义完全不同
    const _tempMutator = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(_datar.run(this._mutator)).fill(_datar)

    this._mutator = _tempMutator
    this.trigger()

    return this
  }

  // registerTrigger :: ((mutator -> trigger(mutator)) -> controller, options) -> controller
  // registerTrigger :: ((operation -> trigger(mutator)) -> controller, options) -> controller
  registerTrigger (trigger, { forceWrap = false } = {}) {
    const _internalTriggerFunction = (...args) => {
      if (!(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(args[0]) || forceWrap) {
        args[0] = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(args[0])
      }
      this.trigger(...args)
    }
    const controller = trigger(_internalTriggerFunction)
    return controller
  }
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/base.mediator.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/base.mediator.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMediator": () => (/* binding */ isMediator),
/* harmony export */   "BaseMediator": () => (/* binding */ BaseMediator)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _functional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../functional.js */ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js");



const isMediator = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isMediator

class BaseMediator {
  constructor (atom) {
    if (new.target === BaseMediator) {
      throw new Error('BaseMediator can not be instantiated!')
    }
    this._atom = atom
  }

  /***********************************************************
   *             Mediator's propertys and methods
   ***********************************************************/

  get isMediator () {
    return true
  }

  /***********************************************************
   *                Atom's propertys and methods
   ***********************************************************/

  get atom () {
    return this._atom
  }

  get isAtom () {
    return this._atom.isAtom
  }

  get isData () {
    return this._atom.isData
  }

  get isMutation () {
    return this._atom.isMutation
  }

  get isEmpty () {
    return this._atom.isEmpty
  }

  get datar () {
    if (this.isData) {
      return this._atom.datar
    } else {
      throw (new TypeError('There is no "datar" property on Mutation instance.'))
    }
  }

  get value () {
    if (this.isData) {
      return this._atom.value
    } else {
      throw (new TypeError('There is no "value" property on Mutation instance.'))
    }
  }

  get mutator () {
    if (this.isMutation) {
      return this._atom.mutator
    } else {
      throw (new TypeError('There is no "mutator" property on Data instance.'))
    }
  }

  get operation () {
    if (this.isMutation) {
      return this._atom.operation
    } else {
      throw (new TypeError('There is no "operation" property on Data instance.'))
    }
  }

  subscribe (...args) {
    return this._atom.subscribe(...args)
  }

  trigger (...args) {
    return this._atom.trigger(...args)
  }

  triggerValue (...args) {
    if (this.isData) {
      return this._atom.triggerValue(...args)
    } else {
      throw (new TypeError('There is no "triggerValue" method on Mutation instance.'))
    }
  }

  triggerOperation (...args) {
    if (this.isMutation) {
      return this._atom.triggerOperation(...args)
    } else {
      throw (new TypeError('There is no "triggerOperation" method on Data instance.'))
    }
  }

  observe (...args) {
    return this._atom.observe(...args)
  }

  beObservedBy (...args) {
    return this._atom.beObservedBy(...args)
  }

  mutate (...args) {
    return this._atom.mutate(...args)
  }

  registerTrigger (...args) {
    return this._atom.registerTrigger(...args)
  }

  pipe (...args) {
    // ! do not use:
    // ! return this._atom.pipe(...args)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.pipe)(...args)(this)
  }

  compose (...args) {
    // ! do not use:
    // ! return this._atom.compose(...args)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.compose)(...args)(this)
  }

  release () {
    this._atom = null
  }
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediator.js":
/*!****************************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediator.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isReplayMediator": () => (/* binding */ isReplayMediator),
/* harmony export */   "ReplayMediator": () => (/* binding */ ReplayMediator),
/* harmony export */   "replayWithoutLatest": () => (/* binding */ replayWithoutLatest),
/* harmony export */   "replayWithLatest": () => (/* binding */ replayWithLatest)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _atom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js");
/* harmony import */ var _base_mediator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.mediator.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/base.mediator.js");
/* harmony import */ var _functional_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functional.js */ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js");





const isReplayMediator = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isReplayMediator

class ReplayMediator extends _base_mediator_js__WEBPACK_IMPORTED_MODULE_1__.BaseMediator {
  constructor (atom, replayTime = 1) {
    super(atom)
    this._history = []
    this._consumers = []
    this.setReplayTime(replayTime)
    this._subscribeController = atom.subscribe(val => {
      this._history.push(val)
      this._setHistory()
    })
  }

  get type () {
    return 'ReplayMediator'
  }

  get isReplayMediator () {
    return true
  }

  static of (atom, options) {
    if (!(0,_atom_js__WEBPACK_IMPORTED_MODULE_2__.isAtom)(atom)) {
      throw (new TypeError('ReplayMediator can apply to an Atom (Data or Mutation) only.'))
    }
    if (isReplayMediator(atom)) {
      return atom
    }

    let _options = {}
    if ((0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(options)) {
      _options.replayTime = options
    } else if ((0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
      _options = {
        ..._options,
        ...options
      }
    }

    const { replayTime, autoTrigger = false } = _options

    const _mediator = new ReplayMediator(atom, replayTime)

    if (autoTrigger) {
      atom.trigger()
    }
    return _mediator
  }

  setReplayTime (replayTime) {
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(replayTime)) {
      throw (new TypeError('repalyTime is expected to be a Number.'))
    }
    this._replayTime = Math.floor(Math.abs(replayTime))
    this._setHistory()
  }

  _setHistory () {
    const t = this._history.length - this._replayTime
    this._history = this._history.slice(t >= 0 ? t : 0)
  }

  replayTo (consumer) {
    this._history.forEach(val => {
      consumer(val)
    })
  }

  replay () {
    this._consumers.forEach((consumer) => {
      this.replayTo(consumer)
    })
  }

  subscribe (consumer) {
    this._consumers.push(consumer)
    const subscribeController = this._atom.subscribe(consumer)
    this.replayTo(consumer)
    return subscribeController
  }

  // NOTE: important!!!
  // !!! important
  beObservedBy (...args) {
    return args[0].observe(this)
  }

  release () {
    this._subscribeController.unsubscribe()
    super.release()
  }
}

const replayWithoutLatest = (0,_functional_js__WEBPACK_IMPORTED_MODULE_3__.curryN)(2, (replayTime, atom) => {
  return ReplayMediator.of(atom, { replayTime, autoTrigger: false })
})
const replayWithLatest = (0,_functional_js__WEBPACK_IMPORTED_MODULE_3__.curryN)(2, (replayTime, atom) => {
  return ReplayMediator.of(atom, { replayTime, autoTrigger: true })
})


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/meta.js":
/*!*******************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/meta.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDatar": () => (/* binding */ isDatar),
/* harmony export */   "isMutator": () => (/* binding */ isMutator),
/* harmony export */   "isVoid": () => (/* binding */ isVoid),
/* harmony export */   "isTerminator": () => (/* binding */ isTerminator),
/* harmony export */   "isVacuo": () => (/* binding */ isVacuo),
/* harmony export */   "Void": () => (/* binding */ Void),
/* harmony export */   "VOID": () => (/* binding */ VOID),
/* harmony export */   "Terminator": () => (/* binding */ Terminator),
/* harmony export */   "TERMINATOR": () => (/* binding */ TERMINATOR),
/* harmony export */   "Vacuo": () => (/* binding */ Vacuo),
/* harmony export */   "VACUO": () => (/* binding */ VACUO),
/* harmony export */   "Datar": () => (/* binding */ Datar),
/* harmony export */   "Mutator": () => (/* binding */ Mutator)
/* harmony export */ });
/* harmony import */ var _internal_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/base.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _functional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functional.js */ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js");



// metas
// Terminator
// Vacuo
// Datar
// Mutator

const isDatar = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isDatar
const isMutator = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isMutator

const isVoid = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isVoid
const isTerminator = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isTerminator
const isVacuo = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(tar) && tar.isVacuo

/**
 *—————————————————————————————————————————————— Nothing Particle ————————————————————————————————————————————————————
 */
class Void {
  get isVoid () {
    return true
  }
}
const VOID = new Void()

/**
 *—————————————————————————————————————————————— Terminator Particle ————————————————————————————————————————————————————
 */
class Terminator {
  get isTerminator () {
    return true
  }
}
const TERMINATOR = new Terminator()

/**
 *—————————————————————————————————————————————— Vacuo Particle ————————————————————————————————————————————————————
 */
//  利用 JavaScript Function is also an Object 的特性
//  使 Vacuo 既能够作为 Datar.of() 也能作为 Mutator.of() 的参数
//    从而实现 Empty Datar 和 Empty Mutator
//  https://developer.chrome.com/docs/apps/contentSecurityPolicy/
//  因为要兼容浏览器扩展的执行环境，所以 class Vacuo extends Function 语法无法使用
const Vacuo = () => {
  const internalVacuo = function () {}
  Object.defineProperty(internalVacuo, 'isVacuo', {
    get: () => {
      return true
    }
  })
  Object.defineProperty(internalVacuo, 'isEmpty', {
    get: () => {
      return true
    }
  })
  return internalVacuo
}
const VACUO = Vacuo()

/**
 *—————————————————————————————————————————————— Datar Particle ————————————————————————————————————————————————————
 */
class Datar {
  constructor (value, mutator = VACUO) {
    if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(mutator) && !isMutator(mutator) && !isVacuo(mutator)) {
      throw (new TypeError('Only the Mutator or Vacuo type of particle is expected to be received as 2nd parameter of Datar particle constructor.'))
    }
    this.value = value
    this.mutator = mutator
  }

  static of (value) {
    return new Datar(value)
  }

  static empty () {
    return new Datar(VACUO)
  }

  get isDatar () {
    return true
  }

  get isEmpty () {
    return isVacuo(this.value)
  }

  fill (mutator) {
    if (!isMutator(mutator) && !isVacuo(mutator)) {
      throw (new TypeError('Only the Mutator or Vacuo type of particle is expected to be received by "fill" method of Datar particle.'))
    }
    this.mutator = mutator
    return this
  }

  // 很少用到，之所以存在是为了保证 Datar 和 Mutator 的对称性
  run (mutator = VACUO) {
    if (!isMutator(mutator) && !isVacuo(mutator)) {
      throw (new TypeError('Only the Mutator or Vacuo type of particle is expected to be received by "run" method of Datar particle.'))
    }
    return isMutator(mutator) ? mutator.operation : mutator
  }
}

const checkOperation = operation => {
  if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(operation)) {
    throw (new TypeError('operation must be the type of Function.'))
  }
}
// isValidOpTar(isValidOperationTarget) :: any -> Boolean
const isValidOpTar = tar => {
  return isDatar(tar) || isVacuo(tar)
}
/**
 *—————————————————————————————————————————————— Mutator Particle ————————————————————————————————————————————————————
 */
class Mutator {
  constructor (operation, datar = VACUO) {
    if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(datar) && !isValidOpTar(datar)) {
      throw (new TypeError('Only the Datar or Vacuo type of particle is expected to be received as 2nd parameter of Mutator particle constructor.'))
    }
    checkOperation(operation)
    this.operation = operation
    this.datar = datar
  }

  static of (operation) {
    return new Mutator(operation)
  }

  static empty () {
    return new Mutator(VACUO)
  }

  get isMutator () {
    return true
  }

  get isEmpty () {
    return isVacuo(this.operation)
  }

  static checkOperation (operation) {
    checkOperation(operation)
  }

  static isValidOpTar (tar) {
    return isValidOpTar(tar)
  }

  // lift dispatcher
  static lift (operation, options) {
    const { type } = options

    if (type === 'both') {
      return this.liftBoth(operation)
    } else if (type === 'left') {
      return this.liftLeft(operation)
    } else if (type === 'right') {
      return this.liftRight(operation)
    } else {
      throw (new TypeError(`"type" of lift must be one of "both" | "left" | "right", but receives "${type}"`))
    }
  }

  // Automatically unwrap both left & right param to value
  static liftBoth (operation) {
    checkOperation(operation)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.looseCurryN)(2, (prevDatar, datar, ...args) => {
      return operation(
        isValidOpTar(prevDatar) ? prevDatar.value : prevDatar,
        isValidOpTar(datar) ? datar.value : datar,
        ...args
      )
    })
  }

  // Automatically unwrap left param to value， keep right param Datar
  static liftLeft (operation) {
    checkOperation(operation)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.looseCurryN)(2, (prevDatar, datar, ...args) => {
      return operation(
        isValidOpTar(prevDatar) ? prevDatar.value : prevDatar,
        datar,
        ...args
      )
    })
  }

  // Automatically unwrap right param to value， keep left param Datar
  static liftRight (operation) {
    checkOperation(operation)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.looseCurryN)(2, (prevDatar, datar, ...args) => {
      return operation(
        prevDatar,
        isValidOpTar(datar) ? datar.value : datar,
        ...args
      )
    })
  }

  fill (datar) {
    if (!isValidOpTar(datar)) {
      throw (new TypeError('Only the Datar or Vacuo type of particle is expected to be received by "fill" method of Mutator particle.'))
    }
    this.datar = datar
    return this
  }

  run (datar = VACUO, ...args) {
    // 保证 Mutator 的 operation 接收到的两个必要参数都是合法的操作对象
    return this.operation(this.datar, isValidOpTar(datar) ? datar : Datar.of(datar), ...args)
  }
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js":
/*!****************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "argPlaceholder": () => (/* binding */ argPlaceholder),
/* harmony export */   "isArgPlaceholder": () => (/* binding */ isArgPlaceholder),
/* harmony export */   "looseCurryS": () => (/* binding */ looseCurryS),
/* harmony export */   "curryS": () => (/* binding */ curryS),
/* harmony export */   "internalLooseCurry": () => (/* binding */ internalLooseCurry),
/* harmony export */   "looseCurry": () => (/* binding */ looseCurry),
/* harmony export */   "internalCurry": () => (/* binding */ internalCurry),
/* harmony export */   "curry": () => (/* binding */ curry),
/* harmony export */   "internalCurryN": () => (/* binding */ internalCurryN),
/* harmony export */   "curryN": () => (/* binding */ curryN),
/* harmony export */   "internalLooseCurryN": () => (/* binding */ internalLooseCurryN),
/* harmony export */   "looseCurryN": () => (/* binding */ looseCurryN),
/* harmony export */   "composeL": () => (/* binding */ composeL),
/* harmony export */   "composeR": () => (/* binding */ composeR),
/* harmony export */   "pipeL": () => (/* binding */ pipeL),
/* harmony export */   "pipeR": () => (/* binding */ pipeR),
/* harmony export */   "compose": () => (/* binding */ compose),
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "memorize": () => (/* binding */ memorize),
/* harmony export */   "invoker": () => (/* binding */ invoker),
/* harmony export */   "looseInvoker": () => (/* binding */ looseInvoker),
/* harmony export */   "nAry": () => (/* binding */ nAry),
/* harmony export */   "looseNAry": () => (/* binding */ looseNAry),
/* harmony export */   "binary": () => (/* binding */ binary),
/* harmony export */   "looseBinary": () => (/* binding */ looseBinary),
/* harmony export */   "unary": () => (/* binding */ unary),
/* harmony export */   "looseUnary": () => (/* binding */ looseUnary),
/* harmony export */   "tap": () => (/* binding */ tap)
/* harmony export */ });
/* harmony import */ var _internal_base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/base.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
// use '../internal/base.js' instead of '../internal.js' to avoid ↓
//   - ReferenceError: Cannot access '***' before initialization
//   - because some of internal modules import the "../functional.js"


// NOTE: 重复实现了 boolean.js 中的 complement 以避免循环引用
const _complement = fn => compose(x => !x, fn)

const argPlaceholder = {
  // compatible with ramda.js
  '@@functional/placeholder': true,
  isArgPlaceholder: true
}
const isArgPlaceholder = placeholder =>
  (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(placeholder) && Object.prototype.hasOwnProperty.call(placeholder, 'isArgPlaceholder') && placeholder.isArgPlaceholder

// loose curry will pass all of the args it received to target function,
// even if the arg's num greater than initial N
const looseCurryS = (fn, ...args) => {
  if (args.length >= fn.length) {
    return fn(...args)
  } else {
    return (...args2) => curryS(fn, ...args, ...args2)
  }
}
const curryS = (fn, ...args) => {
  const targetNum = fn.length
  if (args.length >= targetNum) {
    return fn(...args.slice(0, targetNum))
  } else {
    return (...args2) => curryS(fn, ...args, ...args2)
  }
}

// loose curry will pass all of the args it received to target function,
// even if the arg's num greater than initial N
const internalLooseCurry = (fn, filled, ...args) => {
  let innerArgs = filled || []
  innerArgs = innerArgs.map(innerArg => isArgPlaceholder(innerArg) ? (args.length > 0 ? args.shift() : innerArg) : innerArg)
  innerArgs = innerArgs.concat(args)
  const targetNum = fn.length
  const validArgs = innerArgs.slice(0, targetNum)
  const validLen = validArgs.filter(_complement(isArgPlaceholder)).length
  if (validLen >= targetNum) {
    return fn(...innerArgs)
  } else {
    return (...extraArgs) => internalLooseCurry(fn, innerArgs, ...extraArgs)
  }
}
const looseCurry = (fn, ...args) => internalLooseCurry(fn, [], ...args)
const internalCurry = (fn, filled, ...args) => {
  let innerArgs = filled || []
  innerArgs = innerArgs.map(innerArg => isArgPlaceholder(innerArg) ? (args.length > 0 ? args.shift() : innerArg) : innerArg)
  innerArgs = innerArgs.concat(args)
  const targetNum = fn.length
  const validArgs = innerArgs.slice(0, targetNum)
  const validLen = validArgs.filter(_complement(isArgPlaceholder)).length
  if (validLen >= targetNum) {
    return fn(...validArgs)
  } else {
    return (...extraArgs) => internalCurry(fn, validArgs, ...extraArgs)
  }
}
const curry = (fn, ...args) => internalCurry(fn, [], ...args)

// loose curry will pass all of the args it received to target function,
// even if the arg's num greater than initial N
const internalCurryN = (n, fn, filled, ...args) => {
  let innerArgs = filled || []
  innerArgs = innerArgs.map(innerArg => isArgPlaceholder(innerArg) ? (args.length > 0 ? args.shift() : innerArg) : innerArg)
  innerArgs = innerArgs.concat(args)
  const validArgs = innerArgs.slice(0, n)
  const validLen = validArgs.filter(_complement(isArgPlaceholder)).length
  if (validLen >= n) {
    return fn(...validArgs)
  } else {
    return (...args2) => internalCurryN(n, fn, validArgs, ...args2)
  }
}
const curryN = (n, fn, ...args) => internalCurryN(n, fn, [], ...args)
// export const curry1 = (fn, ...args) => internalCurryN(1, fn, [], ...args) // just for consistency
// export const curry2 = (fn, ...args) => internalCurryN(2, fn, [], ...args)
// ...
const internalLooseCurryN = (n, fn, filled, ...args) => {
  let innerArgs = filled || []
  innerArgs = innerArgs.map(innerArg => isArgPlaceholder(innerArg) ? (args.length > 0 ? args.shift() : innerArg) : innerArg)
  innerArgs = innerArgs.concat(args)
  const validArgsLen = innerArgs.slice(0, n).filter(_complement(isArgPlaceholder)).length
  if (validArgsLen >= n) {
    return fn(...innerArgs)
  } else {
    return (...extraArgs) => internalLooseCurryN(n, fn, innerArgs, ...extraArgs)
  }
}
const looseCurryN = (n, fn, ...args) => internalLooseCurryN(n, fn, [], ...args)

// NOTE: 另外一种 compose 实现
// @see: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
// const compose = (...args) => value => args.reduceRight((acc, fn) => fn(acc), value)
// 本质是一个闭包，直觉上不喜欢（虽然能够带来一些调试上的好处）
//   -> @see: https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
// 下面这种更符合函数式思维，实现上更接近数学定义
const composeL = (...fns) => fns.reduce((g, f) => (...args) => f(g(...args)), fns.shift() || _internal_base_js__WEBPACK_IMPORTED_MODULE_0__.asIs)
const composeR = (...fns) => composeL(...fns.reverse())
const pipeL = composeL
const pipeR = composeR
const compose = composeR
const pipe = composeL

const memorize = (fn, hasher) => {
  const cache = {}
  hasher = hasher || ((...args) => JSON.stringify(args))
  return (...args) => {
    const hash = hasher(args)
    if (!cache[hash]) {
      cache[hash] = fn.apply(undefined, args)
    }
    return cache[hash]
  }
}

const invokerFactory = curryFn => (n, key) => curryFn(n, (...args) => {
  // curry function controlls how many args will be passed in
  const target = args[args.length - 1]
  if (!target[key]) throw Error(`Can not find "${key}" method in target.'`)
  if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(target[key])) throw Error(`"${key}" property in target is not a function.`)
  return target[key](...args.slice(0, args.length - 1))
})
const invoker = invokerFactory(curryN)
const looseInvoker = invokerFactory(looseCurryN)

const nAry = curry((n, fn) => curryN(n, fn))
const looseNAry = curry((n, fn) => looseCurryN(n, fn))
const binary = fn => curry((x, y) => fn(x, y)) // nAry(2, fn)
const looseBinary = fn => looseCurry((x, y, ...args) => fn(x, y, ...args)) // looseNAry(2, fn)
const unary = fn => x => fn(x)
const looseUnary = fn => (x, ...args) => fn(x, ...args)

const tap = fn => (...args) => {
  fn(...args)
  return args[0]
}
/*
                  arguments num controller & curry test
*/
// const add = (x, y, z) => { console.log(x, y, z) }
// unary(add)(1, 2, 3) // 1, undefined, undefined
// binary(add)(1, 2, 3) // 1, 2, undefined
// nAry(1, add)(1, 2, 3) // 1, undefined, undefined
// nAry(2, add)(1, 2, 3) // 1, 2, undefined
// nAry(3, add)(1, 2, 3) // 1, 2, 3
// looseUnary(add)(1, 2, 3) // 1, 2, 3
// looseBinary(add)(1, 2, 3) // 1, 2, 3
// looseNAry(1, add)(1, 2, 3) // 1, 2, 3
// looseNAry(2, add)(1, 2, 3) // 1, 2, 3
// looseNAry(3, add)(1, 2, 3) // 1, 2, 3

// const gg = (a, b) => {
//   console.warn(a, b)
// }

// const ff = (a, b) => {
//   curry(gg)(a)
// }

// ff(1)


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js":
/*!***********************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDefined": () => (/* binding */ isDefined),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isSymbol": () => (/* binding */ isSymbol),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "isNull": () => (/* binding */ isNull),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isMap": () => (/* binding */ isMap),
/* harmony export */   "isWeakMap": () => (/* binding */ isWeakMap),
/* harmony export */   "isSet": () => (/* binding */ isSet),
/* harmony export */   "isWeakSet": () => (/* binding */ isWeakSet),
/* harmony export */   "isRegExp": () => (/* binding */ isRegExp),
/* harmony export */   "isPromise": () => (/* binding */ isPromise),
/* harmony export */   "isAsyncFn": () => (/* binding */ isAsyncFn),
/* harmony export */   "isGeneratorFunction": () => (/* binding */ isGeneratorFunction),
/* harmony export */   "isAsyncGeneratorFunction": () => (/* binding */ isAsyncGeneratorFunction),
/* harmony export */   "isError": () => (/* binding */ isError),
/* harmony export */   "isEmptyStr": () => (/* binding */ isEmptyStr),
/* harmony export */   "isEmptyArr": () => (/* binding */ isEmptyArr),
/* harmony export */   "isEmptyObj": () => (/* binding */ isEmptyObj),
/* harmony export */   "isOutDated": () => (/* binding */ isOutDated),
/* harmony export */   "isWindow": () => (/* binding */ isWindow),
/* harmony export */   "isEventTarget": () => (/* binding */ isEventTarget),
/* harmony export */   "isObservable": () => (/* binding */ isObservable),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "asIs": () => (/* binding */ asIs),
/* harmony export */   "asUndefined": () => (/* binding */ asUndefined),
/* harmony export */   "asNull": () => (/* binding */ asNull),
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
const isDefined = variable => typeof variable !== 'undefined'

// @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types
const isBoolean = boo => Object.prototype.toString.call(boo) === '[object Boolean]'
const isString = str => Object.prototype.toString.call(str) === '[object String]'
const isNumber = num => Object.prototype.toString.call(num) === '[object Number]'
const isSymbol = symbol => Object.prototype.toString.call(symbol) === '[object Symbol]'
const isUndefined = val => Object.prototype.toString.call(val) === '[object Undefined]'
const isNull = val => Object.prototype.toString.call(val) === '[object Null]'
const isFunction = fn => fn && Object.prototype.toString.call(fn) === '[object Function]'
const isDate = date =>
  date && Object.prototype.toString.call(new Date(date)) === '[object Date]' && !!new Date(date).getTime()
const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]'
const isMap = map => Object.prototype.toString.call(map) === '[object Map]'
const isWeakMap = weakMap => Object.prototype.toString.call(weakMap) === '[object WeakMap]'
const isSet = set => Object.prototype.toString.call(set) === '[object Set]'
const isWeakSet = weakSet => Object.prototype.toString.call(weakSet) === '[object WeakSet]'
const isRegExp = regex => Object.prototype.toString.call(regex) === '[object RegExp]'
const isPromise = obj => Object.prototype.toString.call(obj) === '[object Promise]'
const isAsyncFn = fn => Object.prototype.toString.call(fn) === '[object AsyncFunction]'
const isGeneratorFunction = fn =>
  Object.prototype.toString.call(fn) === '[object GeneratorFunction]'
const isAsyncGeneratorFunction = fn =>
  Object.prototype.toString.call(fn) === '[object AsyncGeneratorFunction]'
const isError = err => Object.prototype.toString.call(err) === '[object Error]'
const isEmptyStr = str => isString(str) && str.length === 0
const isEmptyArr = arr => isArray(arr) && arr.length === 0
const isEmptyObj = obj => isObject(obj) && Object.keys(obj).length === 0
const isOutDated = date => isDate(date) && new Date(date).getTime() < new Date().getTime()

const isWindow = obj => Object.prototype.toString.call(obj) === '[object Window]'
const isEventTarget = obj => obj instanceof EventTarget

const isObservable = obj => isObject(obj) && (obj.isObservable || isFunction(obj.subscribe))

// - `null` and `undefined` are considered empty values
// - `''` is the empty value for String
// - `[]` is the empty value for Array
// - `{}` is the empty value for Object
const isEmpty = val =>
  isNull(val) || isUndefined(val) || isEmptyStr(val) || isEmptyArr(val) || isEmptyObj(val) || (isObject(val) && val.isEmpty)

const asIs = v => v
const asUndefined = v => undefined
const asNull = v => null
const noop = v => {}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/mina/pages/me/me.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var MINA_base_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! MINA/base/index.js */ "./src/mina/base/index.js");

const {
  themeRD
} = (0,MINA_base_index_js__WEBPACK_IMPORTED_MODULE_0__.getThemeService)('app');
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
})();

/******/ })()
;
//# sourceMappingURL=me.js.map