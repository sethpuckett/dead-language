/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dead-language/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/config/animations.js":
/*!*********************************!*\
  !*** ./js/config/animations.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  zombieWalk: 'zombie-walk'\n});\n\n//# sourceURL=webpack:///./js/config/animations.js?");

/***/ }),

/***/ "./js/config/debug.js":
/*!****************************!*\
  !*** ./js/config/debug.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  slowLoad: false\n});\n\n//# sourceURL=webpack:///./js/config/debug.js?");

/***/ }),

/***/ "./js/config/endgame.js":
/*!******************************!*\
  !*** ./js/config/endgame.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  fonts: {\n    stats: {\n      font: '32px Courier',\n      fill: '#ffff00'\n    }\n  }\n});\n\n//# sourceURL=webpack:///./js/config/endgame.js?");

/***/ }),

/***/ "./js/config/images.js":
/*!*****************************!*\
  !*** ./js/config/images.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  zombie: 'zombie',\n  grass: 'grass',\n  loading: 'loading',\n  start: 'start',\n  return: 'return',\n  files: {\n    zombie: 'assets/images/zombie.png',\n    grass: 'assets/images/grass.png',\n    loading: 'assets/images/loading.png',\n    start: 'assets/images/start.png',\n    return: 'assets/images/return.png'\n  }\n});\n\n//# sourceURL=webpack:///./js/config/images.js?");

/***/ }),

/***/ "./js/config/index.js":
/*!****************************!*\
  !*** ./js/config/index.js ***!
  \****************************/
/*! exports provided: animations, debug, endgame, images, loading, minigame, screens, ui */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations */ \"./js/config/animations.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"animations\", function() { return _animations__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ \"./js/config/debug.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"debug\", function() { return _debug__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _endgame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./endgame */ \"./js/config/endgame.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"endgame\", function() { return _endgame__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images */ \"./js/config/images.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"images\", function() { return _images__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var _loading__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loading */ \"./js/config/loading.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"loading\", function() { return _loading__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var _minigame__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./minigame */ \"./js/config/minigame.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"minigame\", function() { return _minigame__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _screens__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./screens */ \"./js/config/screens.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"screens\", function() { return _screens__WEBPACK_IMPORTED_MODULE_6__[\"default\"]; });\n\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ui */ \"./js/config/ui.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ui\", function() { return _ui__WEBPACK_IMPORTED_MODULE_7__[\"default\"]; });\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///./js/config/index.js?");

/***/ }),

/***/ "./js/config/loading.js":
/*!******************************!*\
  !*** ./js/config/loading.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  progressBgColor: 0x444444,\n  progressFillColor: 0x33aa22\n});\n\n//# sourceURL=webpack:///./js/config/loading.js?");

/***/ }),

/***/ "./js/config/minigame.js":
/*!*******************************!*\
  !*** ./js/config/minigame.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  waves: [{\n    baseSpawnRate: 1500,\n    spawnRange: 250,\n    start: 0,\n    maxStart: 20,\n    maxEnd: 40,\n    end: 60\n  }, {\n    baseSpawnRate: 1250,\n    spawnRange: 200,\n    start: 60,\n    maxStart: 80,\n    maxEnd: 100,\n    end: 120\n  }, {\n    baseSpawnRate: 1000,\n    spawnRange: 150,\n    start: 120,\n    maxStart: 140,\n    maxEnd: 160,\n    end: 180\n  }],\n  baseFallSpeed: 25,\n  fallRange: 7,\n  gameTime: 180,\n  fonts: {\n    entry: {\n      font: '32px Courier',\n      fill: '#ffff00'\n    },\n    label: {\n      font: '32px Courier',\n      fill: '#ffff00'\n    },\n    value: {\n      font: '32px Courier',\n      fill: '#ff0000'\n    },\n    zombie: {\n      font: '16px Courier',\n      fill: '#ffffff'\n    }\n  },\n  ui: {\n    entryHeight: 60,\n    failLineStyle: {\n      width: 2,\n      color: 0xaa0000\n    }\n  }\n});\n\n//# sourceURL=webpack:///./js/config/minigame.js?");

/***/ }),

/***/ "./js/config/screens.js":
/*!******************************!*\
  !*** ./js/config/screens.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  boot: 'Boot',\n  loading: 'Loading',\n  titleMenu: 'TitleMenu',\n  minigame: 'Minigame',\n  endgame: 'Endgame'\n});\n\n//# sourceURL=webpack:///./js/config/screens.js?");

/***/ }),

/***/ "./js/config/ui.js":
/*!*************************!*\
  !*** ./js/config/ui.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  padding: 10,\n  paddingBig: 25\n});\n\n//# sourceURL=webpack:///./js/config/ui.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _screens_Minigame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./screens/Minigame */ \"./js/screens/Minigame.js\");\n/* harmony import */ var _screens_Boot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./screens/Boot */ \"./js/screens/Boot.js\");\n/* harmony import */ var _screens_Loading__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screens/Loading */ \"./js/screens/Loading.js\");\n/* harmony import */ var _screens_TitleMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./screens/TitleMenu */ \"./js/screens/TitleMenu.js\");\n/* harmony import */ var _screens_Endgame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./screens/Endgame */ \"./js/screens/Endgame.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvar config = {\n  type: phaser__WEBPACK_IMPORTED_MODULE_5___default.a.AUTO,\n  parent: 'game-container',\n  mode: phaser__WEBPACK_IMPORTED_MODULE_5___default.a.Scale.FIT,\n  minWidth: 800,\n  width: 1200,\n  height: 600,\n  scene: [_screens_Boot__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _screens_Loading__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _screens_TitleMenu__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _screens_Minigame__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _screens_Endgame__WEBPACK_IMPORTED_MODULE_4__[\"default\"]]\n};\nvar game = new phaser__WEBPACK_IMPORTED_MODULE_5___default.a.Game(config);\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/screens/Boot.js":
/*!****************************!*\
  !*** ./js/screens/Boot.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./js/config/index.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'Boot'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.load.image(_config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].loading, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].files.loading);\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      this.scene.start(_config__WEBPACK_IMPORTED_MODULE_0__[\"screens\"].loading);\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_1___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./js/screens/Boot.js?");

/***/ }),

/***/ "./js/screens/Endgame.js":
/*!*******************************!*\
  !*** ./js/screens/Endgame.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./js/config/index.js\");\n/* harmony import */ var _ui_endgameUiHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/endgameUiHelper */ \"./js/screens/ui/endgameUiHelper.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'Endgame'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init(stats) {\n      this.stats = stats;\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      var ui = Object(_ui_endgameUiHelper__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.sys.game.config);\n      this.killsLabel = this.add.text(ui.killLabelX, ui.killLabelY, 'Kills:' + this.stats.kills, _config__WEBPACK_IMPORTED_MODULE_0__[\"endgame\"].fonts.stats);\n      this.killsLabel.setOrigin(ui.killLabelOriginX, ui.killLabelOriginY);\n      this.missesLabel = this.add.text(ui.missLabelX, ui.missLabelY(this.killsLabel), 'Misses:' + this.stats.misses, _config__WEBPACK_IMPORTED_MODULE_0__[\"endgame\"].fonts.stats);\n      this.missesLabel.setOrigin(ui.missLabelOriginX, ui.missLabelOriginY);\n      this.returnBtn = this.add.sprite(ui.returnButtonX, ui.returnButtonY(this.missesLabel), _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].return).setInteractive();\n      this.returnBtn.setOrigin(ui.returnButtonOriginX, ui.returnButtonOriginY);\n      this.returnBtn.on('pointerdown', this.returnToTitle, this);\n    }\n  }, {\n    key: \"returnToTitle\",\n    value: function returnToTitle() {\n      this.scene.start(_config__WEBPACK_IMPORTED_MODULE_0__[\"screens\"].titleMenu);\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_2___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./js/screens/Endgame.js?");

/***/ }),

/***/ "./js/screens/Loading.js":
/*!*******************************!*\
  !*** ./js/screens/Loading.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./js/config/index.js\");\n/* harmony import */ var _ui_loadingUiHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/loadingUiHelper */ \"./js/screens/ui/loadingUiHelper.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'Loading'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"preload\",\n    value: function preload() {\n      this.showProgressBar();\n      this.loadAssets();\n\n      if (_config__WEBPACK_IMPORTED_MODULE_0__[\"debug\"].slowLoad) {\n        this.loadDummyAssets();\n      }\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      this.scene.start(_config__WEBPACK_IMPORTED_MODULE_0__[\"screens\"].titleMenu);\n    }\n  }, {\n    key: \"showProgressBar\",\n    value: function showProgressBar() {\n      var ui = Object(_ui_loadingUiHelper__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.sys.game.config);\n      var loadingSprite = this.add.sprite(ui.loadingImageX, ui.loadingImageY, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].loading);\n      loadingSprite.setOrigin(ui.loadingImageOrigin, ui.loadingImageOrigin);\n      var barBg = this.add.graphics();\n      barBg.setPosition(ui.barBackgroundX, ui.barBackgroundY);\n      barBg.fillStyle(_config__WEBPACK_IMPORTED_MODULE_0__[\"loading\"].progressBgColor);\n      barBg.fillRect(0, 0, ui.barBackgroundW, ui.barBackgroundH);\n      var bar = this.add.graphics();\n      bar.setPosition(ui.barX, ui.barY);\n      this.load.on('progress', function (value) {\n        bar.clear();\n        bar.fillStyle(_config__WEBPACK_IMPORTED_MODULE_0__[\"loading\"].progressFillColor);\n        bar.fillRect(0, 0, ui.barW * value, ui.barH);\n      });\n    }\n  }, {\n    key: \"loadAssets\",\n    value: function loadAssets() {\n      this.load.image(_config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].start, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].files.start);\n      this.load.image(_config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].return, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].files.return);\n      this.load.image(_config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].grass, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].files.grass);\n      this.load.spritesheet(_config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].zombie, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].files.zombie, {\n        frameWidth: 100,\n        frameHeight: 100,\n        margin: 0,\n        spacing: 0\n      });\n    }\n  }, {\n    key: \"loadDummyAssets\",\n    value: function loadDummyAssets() {\n      for (var i = 0; i < 250; i++) {\n        this.load.image('test' + i, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].files.loading);\n      }\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_2___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./js/screens/Loading.js?");

/***/ }),

/***/ "./js/screens/Minigame.js":
/*!********************************!*\
  !*** ./js/screens/Minigame.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _vocab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vocab */ \"./js/vocab.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./js/config/index.js\");\n/* harmony import */ var _ui_minigameUiHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/minigameUiHelper */ \"./js/screens/ui/minigameUiHelper.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_3__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar SPAWN_PADDING_PERCENT = 10;\nvar SPEED_MODIFIER = 1000000; // let firestore = firebase.firestore()\n// const lessonRef = firestore.collection('lessons').where('name', '==', 'Basic Phrases').get().then((snap) => {\n//   snap.forEach(function(doc) {\n//     minigame.wordPool = [...doc.data().vocab]\n//   })\n// });\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'Minigame'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"init\",\n    value: function init() {\n      this.wordPool = _toConsumableArray(_vocab__WEBPACK_IMPORTED_MODULE_0__[\"default\"].words);\n      this.wordsInUse = [];\n      this.zombies = [];\n      this.score = 0;\n      this.damage = 0;\n      this.spawnTimer = null;\n    }\n  }, {\n    key: \"create\",\n    value: function create() {\n      this.buildUi(); // TODO: put all this create stuff in functions\n\n      this.gameTimer = this.time.addEvent({\n        delay: _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].gameTime * 1000,\n        callback: this.gameTimerFinish,\n        callbackScope: this\n      });\n      this.keys = this.input.keyboard.addKeys('SPACE, BACKSPACE, ENTER, A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z');\n      this.input.keyboard.on('keydown', this.handleKeyDown, this);\n      this.anims.create({\n        key: _config__WEBPACK_IMPORTED_MODULE_1__[\"animations\"].zombieWalk,\n        frames: this.anims.generateFrameNames(_config__WEBPACK_IMPORTED_MODULE_1__[\"images\"].zombie, {\n          frames: [0, 1, 0, 2]\n        }),\n        frameRate: 10,\n        repeat: -1\n      });\n      this.lineGraphics = this.add.graphics({\n        lineStyle: _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.failLineStyle\n      });\n      this.failLine = new phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Geom.Line(0, this.cameras.main.height - _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight, this.cameras.main.width, this.cameras.main.height - _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight);\n      this.lineGraphics.strokeLineShape(this.failLine); // TODO: make configurable way to visualize rect for debugging\n\n      this.playerHitRect = new phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Geom.Rectangle(0, this.cameras.main.height - _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight, this.cameras.main.width, _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight); // TODO: will need more sophisticated depth management when more layers are added\n\n      this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height - _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight, 'grass');\n      this.background.setOrigin(0, 0);\n      this.background.setDepth(-1);\n      this.activateSpawnTimer();\n    }\n  }, {\n    key: \"update\",\n    value: function update(_time, delta) {\n      var _this = this;\n\n      this.zombies.forEach(function (zombie) {\n        var movement = _this.getMovement(zombie.speed, delta);\n\n        zombie.y += movement;\n        zombie.text.y += movement;\n      });\n      var remaining = _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].gameTime - this.gameTimer.getElapsedSeconds();\n      this.timerValue.text = remaining.toFixed(1);\n      this.checkZombieAttack();\n      this.destroyDeadZombies();\n    }\n  }, {\n    key: \"buildUi\",\n    value: function buildUi() {\n      var ui = Object(_ui_minigameUiHelper__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.sys.game.config);\n      this.textEntry = this.add.text(ui.textEntryX, ui.textEntryY, '', _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.entry);\n      this.textEntry.setOrigin(ui.textEntryOriginX, ui.textEntryOriginY);\n      this.killLabel = this.add.text(ui.killLabelX, ui.killLabelY, 'Kills:', _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.label);\n      this.killLabel.setOrigin(ui.killOriginX, ui.killOriginY);\n      this.killValue = this.add.text(ui.killValueX(this.killLabel), ui.killValueY, this.score, _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.value);\n      this.killValue.setOrigin(ui.killOriginX, ui.killOriginY);\n      this.missLabel = this.add.text(ui.missLabelX, ui.missLabelY, 'Misses:', _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.label);\n      this.missLabel.setOrigin(ui.missOriginX, ui.missOriginY);\n      this.missValue = this.add.text(ui.missValueX(this.missLabel), ui.missValueY, this.damage, _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.value);\n      this.missValue.setOrigin(ui.missOriginX, ui.missOriginY);\n      this.timerLabel = this.add.text(ui.timerLabelX, ui.timerLabelY, 'Time Remaining:', _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.label);\n      this.timerLabel.setOrigin(ui.timerLabelOriginX, ui.timerLabelOriginY);\n      this.timerValue = this.add.text(ui.timerValueX(this.timerLabel), ui.timerValueY, '', _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.value);\n      this.timerValue.setOrigin(ui.timerValueOriginX, ui.timerValueOriginY);\n    }\n  }, {\n    key: \"handleKeyDown\",\n    value: function handleKeyDown(event) {\n      if (event.keyCode === this.keys.BACKSPACE.keyCode && this.textEntry.text.length > 0) {\n        this.textEntry.text = this.textEntry.text.substr(0, this.textEntry.text.length - 1);\n      } else if (this.isLetter(event.keyCode) || event.keyCode === this.keys.SPACE.keyCode) {\n        this.textEntry.text += event.key;\n      } else if (event.keyCode === this.keys.ENTER.keyCode) {\n        this.submitAnswer();\n      }\n    }\n  }, {\n    key: \"gameTimerFinish\",\n    value: function gameTimerFinish() {\n      this.scene.start(_config__WEBPACK_IMPORTED_MODULE_1__[\"screens\"].endgame, {\n        kills: this.score,\n        misses: this.damage\n      });\n    }\n  }, {\n    key: \"getMovement\",\n    value: function getMovement(speed, delta) {\n      // TODO: calculate this once upfront\n      var totalDistance = this.cameras.main.height - _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight;\n      return speed * delta * totalDistance / SPEED_MODIFIER;\n    }\n  }, {\n    key: \"checkZombieAttack\",\n    value: function checkZombieAttack() {\n      var _this2 = this;\n\n      this.zombies.forEach(function (zombie) {\n        if (phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Geom.Intersects.RectangleToRectangle(zombie.getBounds(), _this2.playerHitRect)) {\n          _this2.changeDamage(1);\n\n          zombie.alive = false;\n        }\n      });\n    }\n  }, {\n    key: \"changeDamage\",\n    value: function changeDamage(amount) {\n      this.damage += amount;\n      this.missValue.text = this.damage;\n    }\n  }, {\n    key: \"destroyDeadZombies\",\n    value: function destroyDeadZombies() {\n      var _this3 = this;\n\n      this.zombies.filter(function (z) {\n        return !z.alive;\n      }).forEach(function (z) {\n        _this3.releaseVocabWord(z.text.text);\n\n        z.text.destroy();\n        z.destroy();\n      });\n      this.zombies = this.zombies.filter(function (z) {\n        return z.alive;\n      });\n    }\n  }, {\n    key: \"activateSpawnTimer\",\n    value: function activateSpawnTimer() {\n      if (this.spawnTimer != null) {\n        this.spawnTimer.reset({\n          delay: this.getSpawnDelay(),\n          callback: this.spawnZombie,\n          callbackScope: this,\n          repeat: 1\n        });\n      } else {\n        this.spawnTimer = this.time.addEvent({\n          delay: this.getSpawnDelay(),\n          callback: this.spawnZombie,\n          callbackScope: this\n        });\n      }\n    }\n  }, {\n    key: \"getSpawnLocation\",\n    value: function getSpawnLocation() {\n      // TODO: calculate this upfront, not every time\n      var pad = this.cameras.main.width * SPAWN_PADDING_PERCENT / 100;\n      return phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Math.RND.between(pad, this.cameras.main.width - pad);\n    } // TODO: move this wave logic (helper class?)\n    // TODO: no zombies spawn if not in wave (currently errors)\n\n  }, {\n    key: \"getSpawnDelay\",\n    value: function getSpawnDelay() {\n      var wave = this.getCurrentWave();\n      var percentToMax = 1;\n      var easedPercent = 1;\n      var curTime = this.gameTimer.getElapsedSeconds();\n\n      if (curTime < wave.maxStart) {\n        percentToMax = (curTime - wave.start) / (wave.maxStart - wave.start);\n        easedPercent = phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Math.Easing.Cubic.InOut(percentToMax);\n      } else if (curTime > wave.maxEnd) {\n        percentToMax = (curTime - wave.maxEnd) / (wave.end - wave.maxEnd);\n        easedPercent = 1 - phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Math.Easing.Cubic.InOut(percentToMax);\n      } // TODO: move base delay value to config\n\n\n      var delay = 1000 * (1 - easedPercent);\n      return delay + wave.baseSpawnRate + phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Math.RND.between(-wave.spawnRange, wave.spawnRange);\n    }\n  }, {\n    key: \"getCurrentWave\",\n    value: function getCurrentWave() {\n      var waves = _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].waves;\n      var curTime = this.gameTimer.getElapsedSeconds();\n      return waves.find(function (el) {\n        return el.start <= curTime && el.end > curTime;\n      });\n    }\n  }, {\n    key: \"getFallSpeed\",\n    value: function getFallSpeed() {\n      return _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].baseFallSpeed + phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Math.RND.between(-_config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fallRange, _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fallRange);\n    }\n  }, {\n    key: \"spawnZombie\",\n    value: function spawnZombie() {\n      // TODO: add zombie class to store extra data\n      var zombie = this.add.sprite(this.getSpawnLocation(), -35, // TODO: don't hard code this here. Should be const (based on camera size)\n      'zombie', 0);\n      zombie.setScale(0.6, 0.6); // TODO: Don't hard code this\n\n      zombie.speed = this.getFallSpeed(); // TODO: don't hard code position (need to calculate center)\n      // TODO: pulling language1 off this is ugly. Move to helper class?\n\n      zombie.text = this.add.text(zombie.x - 25, -10, this.reserveVocabWord().language1, _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].fonts.zombie);\n      zombie.alive = true;\n      zombie.play(_config__WEBPACK_IMPORTED_MODULE_1__[\"animations\"].zombieWalk);\n      this.zombies.push(zombie); // TODO: Wrap spawning in a higher level process. Starting timer should not be here.\n\n      this.activateSpawnTimer();\n    }\n  }, {\n    key: \"reserveVocabWord\",\n    value: function reserveVocabWord() {\n      // TODO: error handling for empty pool\n      var poolIndex = phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Math.RND.between(0, this.wordPool.length - 1);\n      var word = this.wordPool.splice(poolIndex, 1)[0];\n      this.wordsInUse.push(word);\n      return word;\n    } // TODO: add helper class to manage vocab lists\n\n  }, {\n    key: \"releaseVocabWord\",\n    value: function releaseVocabWord(text) {\n      var index = this.wordsInUse.findIndex(function (word) {\n        return word.language1 === text;\n      });\n      this.wordPool.push(this.wordsInUse.splice(index, 1)[0]);\n    }\n  }, {\n    key: \"submitAnswer\",\n    value: function submitAnswer() {\n      var _this4 = this;\n\n      this.wordsInUse.forEach(function (word) {\n        if (_this4.textEntry.text === word.language2) {\n          _this4.destroyZombieByWord(word.language1);\n\n          _this4.score++;\n          _this4.killValue.text = _this4.score;\n        }\n      });\n      this.textEntry.text = '';\n    }\n  }, {\n    key: \"destroyZombieByWord\",\n    value: function destroyZombieByWord(word) {\n      var zombie = this.zombies.find(function (z) {\n        return z.text.text === word;\n      });\n      zombie.alive = false;\n    } // TODO: move to helper class\n\n  }, {\n    key: \"isLetter\",\n    value: function isLetter(keyCode) {\n      return keyCode >= 65 && keyCode <= 90;\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_3___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./js/screens/Minigame.js?");

/***/ }),

/***/ "./js/screens/TitleMenu.js":
/*!*********************************!*\
  !*** ./js/screens/TitleMenu.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _default; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ \"./js/config/index.js\");\n/* harmony import */ var _ui_titleMenuUiHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/titleMenuUiHelper */ \"./js/screens/ui/titleMenuUiHelper.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! phaser */ \"./node_modules/phaser/src/phaser.js\");\n/* harmony import */ var phaser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(phaser__WEBPACK_IMPORTED_MODULE_2__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\nvar _default =\n/*#__PURE__*/\nfunction (_Phaser$Scene) {\n  _inherits(_default, _Phaser$Scene);\n\n  function _default() {\n    _classCallCheck(this, _default);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(_default).call(this, {\n      key: 'TitleMenu'\n    }));\n  }\n\n  _createClass(_default, [{\n    key: \"create\",\n    value: function create() {\n      var ui = Object(_ui_titleMenuUiHelper__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this.sys.game.config);\n      this.startBtn = this.add.sprite(ui.startButtonX, ui.startButtonY, _config__WEBPACK_IMPORTED_MODULE_0__[\"images\"].start).setInteractive();\n      this.startBtn.setOrigin(ui.startButtonOrigin, ui.startButtonOrigin);\n      this.startBtn.on('pointerdown', this.startGame, this);\n    }\n  }, {\n    key: \"startGame\",\n    value: function startGame() {\n      this.scene.start(_config__WEBPACK_IMPORTED_MODULE_0__[\"screens\"].minigame);\n    }\n  }]);\n\n  return _default;\n}(phaser__WEBPACK_IMPORTED_MODULE_2___default.a.Scene);\n\n\n\n//# sourceURL=webpack:///./js/screens/TitleMenu.js?");

/***/ }),

/***/ "./js/screens/ui/endgameUiHelper.js":
/*!******************************************!*\
  !*** ./js/screens/ui/endgameUiHelper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _uiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiHelper */ \"./js/screens/ui/uiHelper.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (config) {\n  var u = Object(_uiHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(config);\n  return {\n    killLabelX: u.w_2,\n    killLabelY: u.h_25p,\n    killLabelOriginX: u.center,\n    killLabelOriginY: u.top,\n    missLabelX: u.w_2,\n    missLabelY: function missLabelY(prev) {\n      return prev.y + prev.height + u.padding;\n    },\n    missLabelOriginX: u.center,\n    missLabelOriginY: u.top,\n    returnButtonX: u.w_2,\n    returnButtonY: function returnButtonY(prev) {\n      return prev.y + prev.height + u.padding;\n    },\n    returnButtonOriginX: u.center,\n    returnButtonOriginY: u.top\n  };\n});\n\n//# sourceURL=webpack:///./js/screens/ui/endgameUiHelper.js?");

/***/ }),

/***/ "./js/screens/ui/loadingUiHelper.js":
/*!******************************************!*\
  !*** ./js/screens/ui/loadingUiHelper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _uiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiHelper */ \"./js/screens/ui/uiHelper.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (config) {\n  var u = Object(_uiHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(config);\n  return {\n    loadingImageX: u.w_2,\n    loadingImageY: u.h_30p,\n    loadingImageOrigin: u.center,\n    barBackgroundW: u.w_25p + u.padding,\n    barBackgroundH: u.w_5p + u.padding,\n\n    get barBackgroundX() {\n      return u.w_2 - this.barBackgroundW / 2;\n    },\n\n    get barBackgroundY() {\n      return u.h_2 - this.barBackgroundH / 2;\n    },\n\n    barW: u.w_25p,\n    barH: u.w_5p,\n\n    get barX() {\n      return u.w_2 - this.barW / 2;\n    },\n\n    get barY() {\n      return u.h_2 - this.barH / 2;\n    }\n\n  };\n});\n\n//# sourceURL=webpack:///./js/screens/ui/loadingUiHelper.js?");

/***/ }),

/***/ "./js/screens/ui/minigameUiHelper.js":
/*!*******************************************!*\
  !*** ./js/screens/ui/minigameUiHelper.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _uiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiHelper */ \"./js/screens/ui/uiHelper.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config */ \"./js/config/index.js\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (config) {\n  var u = Object(_uiHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(config);\n  return {\n    killLabelX: u.padding,\n    killLabelY: u.padding,\n    killValueX: function killValueX(label) {\n      return label.width + u.padding;\n    },\n    killValueY: u.padding,\n    killOriginX: u.left,\n    killOriginY: u.top,\n    timerLabelX: u.w_2 - u.w_5p,\n    timerLabelY: u.padding,\n    timerLabelOriginX: u.center,\n    timerLabelOriginY: u.top,\n    timerValueX: function timerValueX(label) {\n      return u.w_2 - u.w_5p + label.width / 2;\n    },\n    timerValueY: u.padding,\n    timerValueOriginX: u.left,\n    timerValueOriginY: u.top,\n    missLabelX: u.w_80p,\n    missLabelY: u.padding,\n    missValueX: function missValueX(label) {\n      return u.w_80p + label.width;\n    },\n    missValueY: u.padding,\n    missOriginX: u.left,\n    missOriginY: u.top,\n    textEntryX: u.padding,\n    textEntryY: u.h - _config__WEBPACK_IMPORTED_MODULE_1__[\"minigame\"].ui.entryHeight / 2,\n    textEntryOriginX: u.left,\n    textEntryOriginY: u.center\n  };\n});\n\n//# sourceURL=webpack:///./js/screens/ui/minigameUiHelper.js?");

/***/ }),

/***/ "./js/screens/ui/titleMenuUiHelper.js":
/*!********************************************!*\
  !*** ./js/screens/ui/titleMenuUiHelper.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _uiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiHelper */ \"./js/screens/ui/uiHelper.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (config) {\n  var u = Object(_uiHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(config);\n  return {\n    startButtonX: u.w,\n    startButtonY: u.h_2,\n    startButtonOrigin: u.right\n  };\n});\n\n//# sourceURL=webpack:///./js/screens/ui/titleMenuUiHelper.js?");

/***/ }),

/***/ "./js/screens/ui/uiHelper.js":
/*!***********************************!*\
  !*** ./js/screens/ui/uiHelper.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config */ \"./js/config/index.js\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (config) {\n  var helper = {};\n  helper.textPadding = _config__WEBPACK_IMPORTED_MODULE_0__[\"ui\"].textPadding;\n  helper.padding = _config__WEBPACK_IMPORTED_MODULE_0__[\"ui\"].padding;\n  helper.paddingBig = _config__WEBPACK_IMPORTED_MODULE_0__[\"ui\"].paddingBig;\n  helper.w = config.width;\n  helper.h = config.height;\n  helper.left = 0;\n  helper.top = 0;\n  helper.center = 0.5;\n  helper.right = 1;\n  helper.bottom = 1;\n  helper.w_2 = helper.w / 2;\n  helper.w_3 = helper.w / 3;\n  helper.w_4 = helper.w / 4;\n  helper.w_5 = helper.w / 5;\n  helper.w_6 = helper.w / 6;\n  helper.w_7 = helper.w / 7;\n  helper.w_8 = helper.w / 8;\n  helper.w_9 = helper.w / 9;\n  helper.w_10 = helper.w / 10;\n  helper.w_5p = helper.w * 0.05;\n  helper.w_10p = helper.w * 0.10;\n  helper.w_15p = helper.w * 0.15;\n  helper.w_20p = helper.w * 0.20;\n  helper.w_25p = helper.w * 0.25;\n  helper.w_30p = helper.w * 0.30;\n  helper.w_35p = helper.w * 0.35;\n  helper.w_40p = helper.w * 0.40;\n  helper.w_45p = helper.w * 0.45;\n  helper.w_50p = helper.w * 0.50;\n  helper.w_55p = helper.w * 0.55;\n  helper.w_60p = helper.w * 0.60;\n  helper.w_65p = helper.w * 0.65;\n  helper.w_70p = helper.w * 0.70;\n  helper.w_75p = helper.w * 0.75;\n  helper.w_80p = helper.w * 0.80;\n  helper.w_85p = helper.w * 0.85;\n  helper.w_90p = helper.w * 0.90;\n  helper.w_95p = helper.w * 0.95;\n  helper.h_2 = helper.h / 2;\n  helper.h_3 = helper.h / 3;\n  helper.h_4 = helper.h / 4;\n  helper.h_5 = helper.h / 5;\n  helper.h_6 = helper.h / 6;\n  helper.h_7 = helper.h / 7;\n  helper.h_8 = helper.h / 8;\n  helper.h_9 = helper.h / 9;\n  helper.h_10 = helper.h / 10;\n  helper.h_5p = helper.h * 0.05;\n  helper.h_10p = helper.h * 0.10;\n  helper.h_15p = helper.h * 0.15;\n  helper.h_20p = helper.h * 0.20;\n  helper.h_25p = helper.h * 0.25;\n  helper.h_30p = helper.h * 0.30;\n  helper.h_35p = helper.h * 0.35;\n  helper.h_40p = helper.h * 0.40;\n  helper.h_45p = helper.h * 0.45;\n  helper.h_50p = helper.h * 0.50;\n  helper.h_55p = helper.h * 0.55;\n  helper.h_60p = helper.h * 0.60;\n  helper.h_65p = helper.h * 0.65;\n  helper.h_70p = helper.h * 0.70;\n  helper.h_75p = helper.h * 0.75;\n  helper.h_80p = helper.h * 0.80;\n  helper.h_85p = helper.h * 0.85;\n  helper.h_90p = helper.h * 0.90;\n  helper.h_95p = helper.h * 0.95;\n  return helper;\n});\n\n//# sourceURL=webpack:///./js/screens/ui/uiHelper.js?");

/***/ }),

/***/ "./js/vocab.js":
/*!*********************!*\
  !*** ./js/vocab.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  words: [{\n    language1: 'weather',\n    language2: 'tiempo'\n  }, {\n    language1: 'thing',\n    language2: 'cosa'\n  }, {\n    language1: 'man',\n    language2: 'hombre'\n  }, {\n    language1: 'part',\n    language2: 'parte'\n  }, {\n    language1: 'life',\n    language2: 'vida'\n  }, {\n    language1: 'moment',\n    language2: 'momento'\n  }, {\n    language1: 'form',\n    language2: 'forma'\n  }, {\n    language1: 'house',\n    language2: 'casa'\n  }, {\n    language1: 'world',\n    language2: 'mundo'\n  }, {\n    language1: 'woman',\n    language2: 'mujer'\n  }, {\n    language1: 'case',\n    language2: 'caso'\n  }, {\n    language1: 'place',\n    language2: 'lugar'\n  }, {\n    language1: 'person',\n    language2: 'persona'\n  }, {\n    language1: 'hour',\n    language2: 'hora'\n  }, {\n    language1: 'work',\n    language2: 'trabajo'\n  }, {\n    language1: 'point',\n    language2: 'punto'\n  }, {\n    language1: 'hand',\n    language2: 'mano'\n  }, {\n    language1: 'end',\n    language2: 'fin'\n  }, {\n    language1: 'type',\n    language2: 'tipo'\n  }, {\n    language1: 'people',\n    language2: 'gente'\n  }, {\n    language1: 'example',\n    language2: 'ejemplo'\n  }, {\n    language1: 'side',\n    language2: 'lado'\n  }, {\n    language1: 'son',\n    language2: 'hijo'\n  }, {\n    language1: 'problem',\n    language2: 'problema'\n  }, {\n    language1: 'bill',\n    language2: ',cuenta'\n  }, {\n    language1: 'middle',\n    language2: 'medio'\n  }, {\n    language1: 'word',\n    language2: 'palabra'\n  }, {\n    language1: 'father',\n    language2: 'padre'\n  }, {\n    language1: 'change',\n    language2: 'cambio'\n  }, {\n    language1: 'history',\n    language2: 'historia'\n  }, {\n    language1: 'idea',\n    language2: 'idea'\n  }, {\n    language1: 'water',\n    language2: 'agua'\n  }, {\n    language1: 'night',\n    language2: 'noche'\n  }, {\n    language1: 'city',\n    language2: 'ciudad'\n  }, {\n    language1: 'way',\n    language2: 'manera'\n  }, {\n    language1: 'name',\n    language2: 'nombre'\n  }, {\n    language1: 'family',\n    language2: 'familia'\n  }, {\n    language1: 'reality',\n    language2: 'realidad'\n  }, {\n    language1: 'truth',\n    language2: 'verdad'\n  }, {\n    language1: 'month',\n    language2: 'mes'\n  }, {\n    language1: 'group',\n    language2: 'grupo'\n  }, {\n    language1: 'body',\n    language2: 'cuerpo'\n  }, {\n    language1: 'fact',\n    language2: 'hecho'\n  }, {\n    language1: 'beginning',\n    language2: 'principio'\n  }, {\n    language1: 'town',\n    language2: 'pueblo'\n  }, {\n    language1: 'afternoon',\n    language2: 'tarde'\n  }, {\n    language1: 'eye',\n    language2: 'ojo'\n  }, {\n    language1: 'street',\n    language2: 'calle'\n  }, {\n    language1: 'book',\n    language2: 'libro'\n  }, {\n    language1: 'strength',\n    language2: 'fuerza'\n  }, {\n    language1: 'light',\n    language2: 'luz'\n  }, {\n    language1: 'saint',\n    language2: 'santo'\n  }, {\n    language1: 'front',\n    language2: 'frente'\n  }, {\n    language1: 'friend',\n    language2: 'amigo'\n  }, {\n    language1: 'sense',\n    language2: 'sentido'\n  }, {\n    language1: 'step',\n    language2: 'paso'\n  }, {\n    language1: 'century',\n    language2: 'siglo'\n  }, {\n    language1: 'god',\n    language2: 'dios'\n  }, {\n    language1: 'earth',\n    language2: 'tierra'\n  }, {\n    language1: 'paper',\n    language2: 'papel'\n  }, {\n    language1: 'mother',\n    language2: 'madre'\n  }, {\n    language1: 'theme',\n    language2: 'tema'\n  }, {\n    language1: 'class',\n    language2: 'clase'\n  }, {\n    language1: 'money',\n    language2: 'dinero'\n  }, {\n    language1: 'head',\n    language2: 'cabeza'\n  }, {\n    language1: 'order',\n    language2: 'orden'\n  }, {\n    language1: 'week',\n    language2: 'semana'\n  }, {\n    language1: 'view',\n    language2: 'vista'\n  }, {\n    language1: 'agreement',\n    language2: 'acuerdo'\n  }, {\n    language1: 'bottom',\n    language2: 'fondo'\n  }, {\n    language1: 'road',\n    language2: 'camino'\n  }, {\n    language1: 'voice',\n    language2: 'voz'\n  }, {\n    language1: 'study',\n    language2: 'estudio'\n  }, {\n    language1: 'value',\n    language2: 'valor'\n  }, {\n    language1: 'measurement',\n    language2: 'medida'\n  }, {\n    language1: 'center',\n    language2: 'centro'\n  }, {\n    language1: 'need',\n    language2: 'necesidad'\n  }, {\n    language1: 'lack',\n    language2: 'falta'\n  }, {\n    language1: 'age',\n    language2: 'edad'\n  }, {\n    language1: 'state',\n    language2: 'estado'\n  }, {\n    language1: 'door',\n    language2: 'puerta'\n  }, {\n    language1: 'face',\n    language2: 'cara'\n  }, {\n    language1: 'color',\n    language2: 'color'\n  }, {\n    language1: 'movement',\n    language2: 'movimiento'\n  }, {\n    language1: 'possibility',\n    language2: 'posibilidad'\n  }, {\n    language1: 'game',\n    language2: 'juego'\n  }, {\n    language1: 'air',\n    language2: 'aire'\n  }, {\n    language1: 'war',\n    language2: 'guerra'\n  }, {\n    language1: 'result',\n    language2: 'resultado'\n  }, {\n    language1: 'law',\n    language2: 'ley'\n  }, {\n    language1: 'aspect',\n    language2: 'aspecto'\n  }, {\n    language1: 'foot',\n    language2: 'pie'\n  }, {\n    language1: 'species',\n    language2: 'especie'\n  }, {\n    language1: 'service',\n    language2: 'servicio'\n  }, {\n    language1: 'activity',\n    language2: 'actividad'\n  }, {\n    language1: 'doubt',\n    language2: 'duda'\n  }, {\n    language1: 'difference',\n    language2: 'diferencia'\n  }, {\n    language1: 'quantity',\n    language2: 'cantidad'\n  }, {\n    language1: 'society',\n    language2: 'sociedad'\n  }, {\n    language1: 'effect',\n    language2: 'efecto'\n  }, {\n    language1: 'object',\n    language2: 'objeto'\n  }, {\n    language1: 'love',\n    language2: 'amor'\n  }, {\n    language1: 'death',\n    language2: 'muerte'\n  }, {\n    language1: 'power',\n    language2: 'poder'\n  }, {\n    language1: 'importance',\n    language2: 'importancia'\n  }, {\n    language1: 'system',\n    language2: 'sistema'\n  }, {\n    language1: 'trip',\n    language2: 'viaje'\n  }, {\n    language1: 'ground',\n    language2: 'suelo'\n  }, {\n    language1: 'regard',\n    language2: 'respecto'\n  }, {\n    language1: 'knowledge',\n    language2: 'conocimiento'\n  }, {\n    language1: 'freedom',\n    language2: 'libertad'\n  }, {\n    language1: 'effort',\n    language2: 'esfuerzo'\n  }, {\n    language1: 'rest',\n    language2: 'resto'\n  }, {\n    language1: 'area',\n    language2: 'zona'\n  }, {\n    language1: 'fear',\n    language2: 'miedo'\n  }, {\n    language1: 'process',\n    language2: 'proceso'\n  }, {\n    language1: 'minute',\n    language2: 'minuto'\n  }, {\n    language1: 'table',\n    language2: 'mesa'\n  }, {\n    language1: 'program',\n    language2: 'programa'\n  }]\n});\n\n//# sourceURL=webpack:///./js/vocab.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./js/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/seth/Development/Projects/dead-language/js/main.js */\"./js/main.js\");\n\n\n//# sourceURL=webpack:///multi_./js/main.js?");

/***/ })

/******/ });