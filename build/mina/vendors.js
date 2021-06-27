(wx["webpackChunkmina_template"] = wx["webpackChunkmina_template"] || []).push([["vendors"],{

/***/ "../node_modules/@we-mobius/mobius-mina/src/es/theme.js":
/*!**************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-mina/src/es/theme.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeThemeService": () => (/* binding */ makeThemeService),
/* harmony export */   "getThemeService": () => (/* binding */ getThemeService)
/* harmony export */ });
/* harmony import */ var _libs_mobius_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../libs/mobius-utils.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediators.js");
/* harmony import */ var _libs_mobius_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../libs/mobius-utils.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js");
// Mobius flavor Base Library for MINA development


const makeThemeService = () => {
  // initial current theme state when first called
  const initialTheme = wx.getSystemInfoSync().theme

  const themeRD = (0,_libs_mobius_utils_js__WEBPACK_IMPORTED_MODULE_0__.replayWithLatest)(1, _libs_mobius_utils_js__WEBPACK_IMPORTED_MODULE_1__.Data.of(initialTheme))

  // update theme state when theme change happen
  wx.onThemeChange(({ theme }) => {
    console.log(theme)
    themeRD.triggerValue(theme)
  })

  return {
    themeRD
  }
}

const themeServices = {}
const getThemeService = (scope) => {
  console.log(scope, themeServices)
  themeServices[scope] = themeServices[scope] || makeThemeService()
  console.log(scope, themeServices)
  return themeServices[scope]
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js":
/*!******************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isData": () => (/* binding */ isData),
/* harmony export */   "Data": () => (/* binding */ Data)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _meta_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../meta.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/meta.js");
/* harmony import */ var _mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mutation.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/mutation.atom.js");
/* harmony import */ var _base_atom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js");





/**
 * @param { any } tar
 * @return { boolean }
 */
const isData = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isData

class Data extends _base_atom_js__WEBPACK_IMPORTED_MODULE_1__.BaseAtom {
  constructor (value, options = {}) {
    super()
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
      throw (new TypeError(
        `"options" is expected to be type of "Object", but received "${typeof options}".`
      ))
    }
    this._options = options

    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(value)) {
      this._datar = value
    } else {
      this._datar = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(value)
    }
    this._consumers = new Set()
  }

  /**
   * @return { 'DataAtom' } 'DataAtom'
   */
  get type () { return 'DataAtom' }

  /**
   * @return { true } true
   */
  get isData () { return true }

  get isEmpty () { return this._datar.isEmpty }

  static of (value, options = {}) {
    return new Data(value, options)
  }

  /**
   * Same as Data.of(VACUO)
   *
   * @return { Data }
   */
  static empty (options = {}) {
    return new Data(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.empty(), options)
  }

  /**
   * Static value of Data.
   *
   * @return { Datar } datar
   */
  get datar () { return this._datar }
  /**
   * Static value of Data, same as Data.datar.value.
   *
   * @return { any } value
   */
  get value () { return this._datar.value }

  /**
   * Steram value of Data.
   *
   * @param { function } consumer The consumer will be invoked by trigger method when there is a adequate value.
   * @return { { unsubscribe: function } } SubscriptionController
   */
  subscribe (consumer) {
    this._consumers.add(consumer)
    return {
      unsubscribe: () => {
        return this._consumers.delete(consumer)
      }
    }
  }

  /**
   * @param { Datar | undefined } datar
   * @return { void }
   */
  trigger (datar) {
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(datar) && !(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(datar)) {
      throw (new TypeError('Data must be triggered with a Datar.'))
    }
    const _datar = datar || this.datar

    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(_datar)) {
      this._consumers.forEach(consumer => {
        consumer(_datar, this)
      })
    }
  }

  triggerValue (value) {
    return this.trigger(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(value))
  }

  /**
   * Change the value of Data in a stream manner.
   *
   * Given "mutation" will be **upstream** of current Data, which is different from "beObservedBy" method.
   *
   * @param { Mutation } mutation (other data ->) mutation -> current data
   */
  observe (mutation) {
    if (!(0,_mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__.isMutation)(mutation)) {
      throw (new TypeError('Data can only observe a Mutation!'))
    }
    return mutation.subscribe((mutator, mutation) => {
      this.mutate(mutator, mutation)
    })
  }

  /**
   * Change the value of Data in a stream manner.
   *
   * Given "mutation" will be **downstream** of current Data, which is different from "observe" method.
   *
   * @param { Mutation } mutation current data -> mutation (-> other data)
   */
  beObservedBy (mutation) {
    return mutation.observe(this)
  }

  /**
   * Change the value of Data in a static manner.
   *
   * take mutator-like param(convert to mutator)
   *   -> run mutator with current datar & contexts
   *   -> wrap and save result of mutator.run as new datar
   *   -> trigger consumers with new datar & contexts
   *
   * @param { Mutator | Mutation | function } mutator Used to produce new value with current datar.
   * @param { Mutation } mutation Provide to mutator's operation (function) as execute contexts.
   * @return { Data } Data(this)
   */
  mutate (mutator, mutation) {
    let _mutator
    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(mutator)) {
      _mutator = mutator
    } else if ((0,_mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__.isMutation)(mutator)) {
      _mutator = mutator.mutator
    } else if ((0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(mutator)) {
      _mutator = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(mutator)
    } else {
      throw (new TypeError(`"mutator" is expected to be type of "Mutator" | "Mutation" | "Function", but received "${typeof mutator}".`))
    }
    let _mutation
    if (!mutation) {
      _mutation = (0,_mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__.isMutation)(mutator) ? mutator : _mutation
    } else {
      if ((0,_mutation_atom_js__WEBPACK_IMPORTED_MODULE_3__.isMutation)(mutation)) {
        _mutation = mutation
      } else {
        throw (new TypeError(`"mutation" is expected to be type of "Mutation", but received "${typeof mutation}".`))
      }
    }

    const _tempDatar = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(_mutator.run(this._datar, _mutation)).fill(_mutator)

    // NOTE: If result of operation is TERMINATOR,
    // do not update the datar or trigger the subscribers
    if (!(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isTerminator)(_tempDatar.value)) {
      this._datar = _tempDatar
      this.trigger()
    }

    return this
  }

  /**
   * @param { function } trigger Takes an internalTrigger(Function) as first parameter,
   *                             invoke internalTrigger with any value will lead to
   *                             Data's trigger method be triggerd with given value.
   * @param { { forceWrap?: boolean } } options
   * @accept ((datar -> trigger(datar)) -> controller, options)
   * @accept ((value -> trigger(datar)) -> controller, { forceWrap: true })
   * @return { {} } TriggerController
   */
  registerTrigger (trigger, options = {}) {
    if (!trigger) {
      throw (new TypeError(`"trigger" is required, but received "${trigger}".`))
    }
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(trigger)) {
      throw (new TypeError(`"trigger" is expected to be type of "Function", but received "${typeof trigger}".`))
    }
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
      throw (new TypeError(`"options" is expected to be type of "Object", but received "${typeof options}".`))
    }

    const { forceWrap = false } = options

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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isMutation": () => (/* binding */ isMutation),
/* harmony export */   "Mutation": () => (/* binding */ Mutation)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _meta_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../meta.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/meta.js");
/* harmony import */ var _data_atom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/data.atom.js");
/* harmony import */ var _base_atom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js");





/**
 * @param { any } tar
 * @return { boolean }
 */
const isMutation = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isMutation

class Mutation extends _base_atom_js__WEBPACK_IMPORTED_MODULE_1__.BaseAtom {
  constructor (operation, options = {}) {
    super()
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
      throw (new TypeError(
        `"options" is expected to be type of "Object", but received "${typeof options}".`
      ))
    }
    this._options = options

    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(operation)) {
      this._mutator = operation
    } else if ((0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(operation)) {
      this._mutator = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(operation)
    } else {
      throw new TypeError(
        `"operation" is expected to be type of "Mutator" | "Function", but received "${typeof operation}".`
      )
    }

    this._consumers = new Set()
  }

  /**
   * @return { 'MutationAtom' } 'MutationAtom'
   */
  get type () { return 'MutationAtom' }

  /**
   * @return { true } true
   */
  get isMutation () { return true }

  get isEmpty () { return this._mutator.isEmpty }

  static of (operation, options = {}) {
    return new Mutation(operation, options)
  }

  static empty (options = {}) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.empty(), options)
  }

  static ofLift (operation, options = {}) {
    const { liftType: type } = options
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.lift(operation, { type }), { ...options, isLifted: true, origin_operation: operation })
  }

  static ofLiftBoth (operation, options = {}) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.liftBoth(operation), { ...options, isLifted: true, origin_operation: operation })
  }

  static ofLiftLeft (operation, options = {}) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.liftLeft(operation), { ...options, isLifted: true, origin_operation: operation })
  }

  static ofLiftRight (operation, options = {}) {
    return new Mutation(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.liftRight(operation), { ...options, isLifted: true, origin_operation: operation })
  }

  /**
   * Static value of Mutation.
   *
   * @return { Mutator } mutator
   */
  get mutator () { return this._mutator }
  /**
   * @return { function } operation
   */
  get operation () {
    if (this._options && this._options.isLifted) {
      return this._options.origin_operation
    } else {
      return this._mutator.operation
    }
  }

  /**
   * Steram value of Mutation.
   *
   * @param { function } consumer The consumer will be invoked by trigger method when there is a adequate value.
   * @return { { unsubscribe: function } } SubscriptionController
   */
  subscribe (consumer) {
    this._consumers.add(consumer)
    return {
      unsubscribe: () => {
        return this._consumers.delete(consumer)
      }
    }
  }

  /**
   * @param { Mutator | undefined } mutator
   * @return { void }
   */
  trigger (mutator) {
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(mutator) && !(0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isMutator)(mutator)) {
      throw (new TypeError('Mutation must be triggered with a Mutator.'))
    }
    const _mutator = mutator || this.mutator

    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(_mutator)) {
      this._consumers.forEach(consumer => {
        consumer(_mutator, this)
      })
    }
  }

  triggerOperation (operation) {
    return this.trigger(_meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(operation))
  }

  /**
   * Change the value of Mutation in a stream manner.
   *
   * Given "data" will be **upstream** of current Mutation, which is different from "beObservedBy" method.
   *
   * @param { Mutation } mutation data -> current mutation (-> other data)
   */
  observe (data) {
    if (!(0,_data_atom_js__WEBPACK_IMPORTED_MODULE_3__.isData)(data)) {
      throw (new TypeError('Mutation can only observe a Data!'))
    }
    return data.subscribe((datar, data) => {
      this.mutate(datar, data)
    })
  }

  /**
   * Change the value of Mutation in a stream manner.
   *
   * Given "data" will be **downstream** of current Mutation, which is different from "observe" method.
   *
   * @param { Mutation } mutation (other data ->) current mutation -> data
   */
  beObservedBy (data) {
    return data.observe(this)
  }

  /**
   * Change the value of Mutation in a static manner.
   *
   * take datar-like param(convert to datar)
   *   -> run datar with current mutator & contexts
   *   -> wrap and save result of datar.run as new mutator
   *   -> trigger consumers with new mutator & contexts
   *
   * @param { Datar | Data | any } datar Will be the 2nd param of mutator's operation.
   * @param { Data } data
   * @return { Mutation } Mutation(this)
   */
  mutate (datar, data) {
    let _datar = null
    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isDatar)(datar)) {
      _datar = datar
    } else if ((0,_data_atom_js__WEBPACK_IMPORTED_MODULE_3__.isData)(datar)) {
      _datar = datar.datar
    } else {
      _datar = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Datar.of(datar)
    }

    if ((0,_meta_js__WEBPACK_IMPORTED_MODULE_2__.isTerminator)(_datar.value)) return this

    let _data
    if (!data) {
      _data = (0,_data_atom_js__WEBPACK_IMPORTED_MODULE_3__.isData)(data) ? datar : _data
    } else {
      if ((0,_data_atom_js__WEBPACK_IMPORTED_MODULE_3__.isData)(data)) {
        _data = data
      } else {
        throw (new TypeError(`"data" is expected to be type of "Data", but received "${typeof data}".`))
      }
    }

    // NOTE: 运行效果相当于：const _tempMutator = this._mutator.fill(_datar)
    // 但实际意义完全不同
    const _tempMutator = _meta_js__WEBPACK_IMPORTED_MODULE_2__.Mutator.of(_datar.run(this._mutator, _data)).fill(_datar)

    this._mutator = _tempMutator
    this.trigger()

    return this
  }

  /**
   * @param { function } trigger Takes an internalTrigger(Function) as first parameter,
   *                             invoke internalTrigger with any value will lead to
   *                             Mutation's trigger method be triggerd with given value.
   * @param { { forceWrap?: boolean } } options
   * @accept ((mutator -> trigger(mutator)) -> controller, options)
   * @accept ((operation -> trigger(mutator)) -> controller, { forceWrap: true })
   * @return { {} } TriggerController
   */
  registerTrigger (trigger, options = {}) {
    if (!trigger) {
      throw (new TypeError(`"trigger" is required, but received "${trigger}".`))
    }
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(trigger)) {
      throw (new TypeError(`"trigger" is expected to be type of "Function", but received "${typeof trigger}".`))
    }
    if (!(0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
      throw (new TypeError(`"options" is expected to be type of "Object", but received "${typeof options}".`))
    }

    const { forceWrap = false } = options

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

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/base.mediators.js":
/*!***************************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/base.mediators.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediators.js":
/*!*****************************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/replay.mediators.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isReplayMediator": () => (/* binding */ isReplayMediator),
/* harmony export */   "ReplayMediator": () => (/* binding */ ReplayMediator),
/* harmony export */   "replayWithoutLatest": () => (/* binding */ replayWithoutLatest),
/* harmony export */   "replayWithLatest": () => (/* binding */ replayWithLatest)
/* harmony export */ });
/* harmony import */ var _internal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../internal.js */ "../node_modules/@we-mobius/mobius-utils/src/es/internal/base.js");
/* harmony import */ var _atom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../atom.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/atoms/base.atom.js");
/* harmony import */ var _base_mediators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base.mediators.js */ "../node_modules/@we-mobius/mobius-utils/src/es/atom/mediators/base.mediators.js");
/* harmony import */ var _functional_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../functional.js */ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js");





const isReplayMediator = tar => (0,_internal_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isReplayMediator

class ReplayMediator extends _base_mediators_js__WEBPACK_IMPORTED_MODULE_1__.BaseMediator {
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

  /**
   * @param options Number | Object
   */
  static of (atom, options) {
    if (!(0,_atom_js__WEBPACK_IMPORTED_MODULE_2__.isAtom)(atom)) {
      throw (new TypeError('ReplayMediator can apply to an Atom only.'))
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
    } else {
      throw new TypeError(`"options" argument of ReplayMediator is expected to be type of "Number" | "Object", but received ${typeof options}.`)
    }

    const { replayTime, autoTrigger = true } = _options

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

"use strict";
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



/**
 *    Metas
 * Void       -> Void's role in Atom world is same as undefined & null 's role in normal JavaScript world.
 *               It is designed to replace values that can be converted to false, such as undefined & null.
 *               So falsy values can flowing through the Atoms as normal values flowing.
 *               For the typical usages, please check nilToVoidT & defaultT.
 * Terminator -> Terminator is designed as a signal for "interruption" of Atom Flow.
 *               Mutation will not mutate(trigger an operation to update the downstream data's value)
 *                 a Data or Datar which value is Terminator.
 *               Data will not mutate(update own value to income operation's result) a Mutation or Mutator or Operation
 *                 which result is Terminator.
 *               For the typical usages, please check filterT or skipT or takeT.
 * Vacuo      -> A value that can serve as the value (for Datar, or operation for Mutator)
 *                 of Datar and Mutator at the same time.
 * Datar      -> Designed to carry the value of Data.
 * Mutator    -> Designed to carry the operation of Mutation.
 */

const isDatar = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isDatar
const isMutator = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isMutator

const isVoid = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isVoid
const isTerminator = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(tar) && tar.isTerminator
const isVacuo = tar => (0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(tar) && tar.isVacuo

/**
 *—————————————————————————————————————————————— Nothing Particle ————————————————————————————————————————————————————
 */
/**
 *
 */
class Void {
  get isVoid () { return true }
}
const VOID = new Void()

/**
 *—————————————————————————————————————————————— Terminator Particle ————————————————————————————————————————————————————
 */
/**
 *
 */
class Terminator {
  get isTerminator () { return true }
}
const TERMINATOR = new Terminator()

/**
 *—————————————————————————————————————————————— Vacuo Particle ————————————————————————————————————————————————————
 */
/**
 * 利用 JavaScript Function is also an Object 的特性，
 * 使 Vacuo 既能够作为 Datar.of() 也能作为 Mutator.of() 的参数，
 * 从而实现 Empty Datar 和 Empty Mutator。
 *
 * 因为要兼容浏览器扩展的执行环境，所以 class Vacuo extends Function 语法无法使用
 *   -> Refer: https://developer.chrome.com/docs/apps/contentSecurityPolicy/
 */
const Vacuo = () => {
  const internalVacuo = function () {}
  Object.defineProperty(internalVacuo, 'isVacuo', {
    get: () => { return true }
  })
  Object.defineProperty(internalVacuo, 'isEmpty', {
    get: () => { return true }
  })
  return internalVacuo
}
const VACUO = Vacuo()

/**
 *—————————————————————————————————————————————— Datar Particle ————————————————————————————————————————————————————
 */
/**
 *
 */
class Datar {
  constructor (value, mutator = VACUO, options = {}) {
    if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(mutator) && !isMutator(mutator) && !isVacuo(mutator)) {
      throw (new TypeError(
        `The 2nd parameter of Datar's constructor is expected to be type of "Mutator" | "Vacuo" | "Undefined", but received "${typeof mutator}".`
      ))
    }

    this._options = options

    this.value = value
    this.mutator = mutator
  }

  static of (value, mutator = undefined, options = {}) {
    return new Datar(value, mutator, options)
  }

  static empty () {
    return new Datar(VACUO)
  }

  get isDatar () { return true }

  get isEmpty () { return isVacuo(this.value) }

  /**
   * @param { Mutator | Vacuo } mutator
   * @return { Datar } this(Datar)
   */
  fill (mutator) {
    if (!isMutator(mutator) && !isVacuo(mutator)) {
      throw (new TypeError(
        `The 1st parameter of Datar's fill method is expected to be type of "Mutator" | "Vacuo", but received "${typeof mutator}".`
      ))
    }
    this.mutator = mutator
    return this
  }

  fillEmpty () {
    this.mutator = VACUO
    return this
  }

  fillAuto (mutator = VACUO) {
    return this.fill(mutator)
  }

  /**
   * Rarely used, this method exists to ensure the symmetry of Datar and Mutator.
   *
   * @param { Mutator | Vacuo } mutator default to VACUO
   * @return { function | Vacuo } operation function | Vacuo
   */
  run (mutator = VACUO, ...args) {
    if (!isMutator(mutator) && !isVacuo(mutator)) {
      throw (new TypeError(
        `The 1st parameter of Datar's run method is expected to be type of "Mutator" | "Vacuo", but received "${typeof mutator}".`
      ))
    }
    // return operation or vacuo
    return isMutator(mutator) ? mutator.operation : mutator
  }
}

/**
 *—————————————————————————————————————————————— Mutator Particle ————————————————————————————————————————————————————
 */
/**
 * @param { any } operation
 */
const checkOperation = operation => {
  if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isFunction)(operation)) {
    throw (new TypeError(`"operation" is expected to be type of "Function", but received "${typeof operation}".`))
  }
}
/**
 * @param { any } tar
 * @return { boolean } true | false
 */
const isValidOperationTarget = tar => isDatar(tar) || isVacuo(tar)
/**
 *
 */
class Mutator {
  constructor (operation, datar = VACUO, options = {}) {
    if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isUndefined)(datar) && !isValidOperationTarget(datar)) {
      throw (new TypeError(
        `The 2nd parameter of Mutator's constructor is expected to be type of "Datar" | "Vacuo" | "Undefined", but received "${typeof datar}".`
      ))
    }
    checkOperation(operation)

    this._options = options

    this.operation = operation
    this.datar = datar
  }

  static of (operation, datar = undefined, options = {}) {
    return new Mutator(operation, datar, options)
  }

  static empty () {
    return new Mutator(VACUO)
  }

  get isMutator () { return true }

  get isEmpty () { return isVacuo(this.operation) }

  static checkOperation (operation) {
    checkOperation(operation)
  }

  static isValidOpTar (tar) {
    return isValidOperationTarget(tar)
  }

  static isValidOperationTarget (tar) {
    return isValidOperationTarget(tar)
  }

  /**
   * Dispatch opration to correct lift method according to the given options.
   *
   * @param { function } operation
   * @param { { type: 'both' | 'left' | 'right' } } options
   */
  static lift (operation, options) {
    if (!options) {
      throw (new TypeError(`"options" is required for lift method of Mutator, but received "${options}".`))
    }
    if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(options)) {
      throw (new TypeError(`"options" is expected to be type of "Object", but received "${typeof options}".`))
    }
    const { type } = options

    if (!(0,_internal_base_js__WEBPACK_IMPORTED_MODULE_0__.isString)(type)) {
      throw (new TypeError(`"type" is expected to be type of "String", but received "${typeof type}".`))
    }

    if (type === 'both') {
      return this.liftBoth(operation)
    } else if (type === 'left') {
      return this.liftLeft(operation)
    } else if (type === 'right') {
      return this.liftRight(operation)
    } else {
      throw (new TypeError(`"type" is expected be one of "both" | "left" | "right", but received "${type}".`))
    }
  }

  /**
   * Automatically unwrap both left & right param to value.
   *
   * @param { function } operation
   * @return { function } curried function(2, loose)
   */
  static liftBoth (operation) {
    checkOperation(operation)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.looseCurryN)(2, (prevDatar, datar, ...args) => {
      return operation(
        isValidOperationTarget(prevDatar) ? prevDatar.value : prevDatar,
        isValidOperationTarget(datar) ? datar.value : datar,
        ...args
      )
    })
  }

  /**
   * Automatically unwrap left param to value， keep right param Datar.
   *
   * @param { function } operation
   * @return { function } curried function(2, loose)
   */
  static liftLeft (operation) {
    checkOperation(operation)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.looseCurryN)(2, (prevDatar, datar, ...args) => {
      return operation(
        isValidOperationTarget(prevDatar) ? prevDatar.value : prevDatar,
        datar,
        ...args
      )
    })
  }

  /**
   * Automatically unwrap right param to value， keep left param Datar.
   *
   * @param { function } operation
   * @return { function } curried function(2, loose)
   */
  static liftRight (operation) {
    checkOperation(operation)
    return (0,_functional_js__WEBPACK_IMPORTED_MODULE_1__.looseCurryN)(2, (prevDatar, datar, ...args) => {
      return operation(
        prevDatar,
        isValidOperationTarget(datar) ? datar.value : datar,
        ...args
      )
    })
  }

  /**
   * @param { Datar | Vacuo } mutator
   * @return { Mutator } this(Mutator)
   */
  fill (datar) {
    if (!isValidOperationTarget(datar)) {
      throw (new TypeError(
        `The 1st parameter of Mutator's fill method is expected to be type of "Datar" | "Vacuo", but received "${typeof mutator}".`
      ))
    }
    this.datar = datar
    return this
  }

  fillEmpty () {
    this.datar = VACUO
    return this
  }

  fillAuto (datar = VACUO) {
    return this.fill(datar)
  }

  /**
   * Atom Flow: Data A -> Mutation -> Data B
   *
   *   -> Data A is observed by Mutation, Mutation is observed by Data B;
   *
   *   -> Data A emits a datar, Mutation takes that datar as the 1st parameter of operation;
   *
   *   -> Mutation takes datar from Data A, then emits a mutator, Data B will take that mutator;
   *
   *   -> Data B takes mutator from Mutation, then pass its own datar to that mutator's operation as the 2nd parameter;
   *
   *   -> The operation evaluates while it has both two parameters, the result will be wrapped in a new datar;
   *
   *   -> The new datar will be the new datar of Data B.
   *
   * @param { Datar | Vacuo } datar default to VACUO
   * @return { any }
   */
  run (datar = VACUO, ...args) {
    // 保证 Mutator 的 operation 接收到的两个必要参数都是合法的操作对象
    return this.operation(this.datar, isValidOperationTarget(datar) ? datar : Datar.of(datar), ...args)
  }
}


/***/ }),

/***/ "../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js":
/*!****************************************************************************!*\
  !*** ../node_modules/@we-mobius/mobius-utils/src/es/functional/helpers.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    return (...args2) => looseCurryS(fn, ...args, ...args2)
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
/**
 * @return { function | any }
 */
const looseCurryN = (n, fn, ...args) => internalLooseCurryN(n, fn, [], ...args)

// NOTE: 另外一种 compose 实现
// @see: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight
// const compose = (...args) => value => args.reduceRight((acc, fn) => fn(acc), value)
// 本质是一个闭包，直觉上不喜欢（虽然能够带来一些调试上的好处）
//   -> @see: https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/
// 下面这种更符合函数式思维，实现上更接近数学定义
const composeL = (...fns) => fns.reduce((g, f) => (...args) => f(g(...args)), fns.shift() || _internal_base_js__WEBPACK_IMPORTED_MODULE_0__.asIs)
const composeR = (...fns) => composeL(...fns.reverse())
const pipeL = composeR
const pipeR = composeL
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isDefined": () => (/* binding */ isDefined),
/* harmony export */   "isGeneralObject": () => (/* binding */ isGeneralObject),
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
/* harmony export */   "isDocument": () => (/* binding */ isDocument),
/* harmony export */   "isEventTarget": () => (/* binding */ isEventTarget),
/* harmony export */   "isIterable": () => (/* binding */ isIterable),
/* harmony export */   "isObservable": () => (/* binding */ isObservable),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "asIs": () => (/* binding */ asIs),
/* harmony export */   "asUndefined": () => (/* binding */ asUndefined),
/* harmony export */   "asNull": () => (/* binding */ asNull),
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
const isDefined = variable => typeof variable !== 'undefined'

const isGeneralObject = tar => typeof tar === 'object'

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
const isDocument = obj => Object.prototype.toString.call(document) === '[object HTMLDocument]'
// refer: https://developer.mozilla.org/zh-CN/docs/Web/API/Event
const isEventTarget = obj => obj instanceof EventTarget
const isIterable = tar => Object.prototype.toString.call(tar[Symbol.iterator]) === 'object Function'

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

}]);
//# sourceMappingURL=vendors.js.map