(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("pdfjs-dist/web/pdf_viewer"), require("pdfjs-dist/build/pdf"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "pdfjs-dist/web/pdf_viewer", "pdfjs-dist/build/pdf"], factory);
	else if(typeof exports === 'object')
		exports["light-pdf"] = factory(require("react"), require("react-dom"), require("pdfjs-dist/web/pdf_viewer"), require("pdfjs-dist/build/pdf"));
	else
		root["light-pdf"] = factory(root["React"], root["ReactDOM"], root["PDFJS"], root["PDFJS"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_15__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (false) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require('./factoryWithTypeCheckers')(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(6)();
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = {
  $: function $(selector) {
    return document.querySelector(selector);
  },
  $$: function $$(selector) {
    return document.querySelectorAll(selector);
  },
  deviceWidth: function deviceWidth() {
    var margin = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return window.innerWidth - margin;
  },
  removeChildren: function removeChildren(elem) {
    while (elem.hasChildNodes()) {
      elem.removeChild(elem.lastChild);
    }
  },


  isString: function isString(str) {
    return typeof str === 'string';
  },

  isNumber: function isNumber(num) {
    return typeof num === 'number';
  },

  isArray: function isArray(arr) {
    if (Array.isArray) {
      return Array.isArray(arr);
    } else {
      return arr instanceof Array;
    }
  },

  isFunc: function isFunc(fn) {
    return typeof fn === 'function';
  },

  isNull: function isNull(val) {
    return val === null;
  },

  isUndef: function isUndef(val) {
    return val === undefined;
  },

  isObject: function isObject(obj) {
    return !utils.isNull(obj) && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
  },

  isNode: function isNode(node) {
    return utils.isObject(Node) ? node instanceof Node : !!(node && utils.isObject(node) && utils.isNumber(node.nodeType) && utils.isString(node.nodeName));
  },

  isElement: function isElement(elem) {
    return utils.isObject(HTMLElement) ? elem instanceof HTMLElement : !!(elem && utils.isObject(elem) && elem.nodeType === 1 && utils.isString(elem.nodeName));
  },

  debounce: function debounce(fn, wait) {
    var timer, context, args;

    var debounced = function debounced() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      context = this;
      args = arguments;

      timer = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };

    return debounced;
  },
  throttle: function throttle(fn, wait) {
    var timer, context, args;

    var throttled = function throttled() {
      if (!timer) {
        context = this;
        args = arguments;
        timer = setTimeout(function () {
          fn.apply(context, args);
          timer = null;
        }, wait);
      }
    };

    throttled.cancel = function () {
      clearTimeout(timer);
      timer = context = args = null;
    };

    return throttled;
  }
};

exports.default = utils;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PREVIEW_BOX_WIDTH = 800;
var INITIAL_SCALE = 1.0;
var MIN_SCALE = 1.0;
var MAX_SCALE = 2.0;
var SCALE_STEP = 0.1;

// pdfjs-dist/lib/web/ui_uitls.js
// scale may get multiplied with CSS_UNIT and scaled into 1.33333
// use FIX_CSS_UNIT to fix this auto scale
var FIX_CSS_UNIT = 1 / (96.0 / 72.0);

var PDF_HOOK = ['onBeforeLoad', 'onLoad', 'onBeforeRender', 'onRender', 'onError'];

exports.PREVIEW_BOX_WIDTH = PREVIEW_BOX_WIDTH;
exports.INITIAL_SCALE = INITIAL_SCALE;
exports.MIN_SCALE = MIN_SCALE;
exports.MAX_SCALE = MAX_SCALE;
exports.SCALE_STEP = SCALE_STEP;
exports.FIX_CSS_UNIT = FIX_CSS_UNIT;
exports.PDF_HOOK = PDF_HOOK;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PDFViewer = __webpack_require__(5);

var _PDFViewer2 = _interopRequireDefault(_PDFViewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _PDFViewer2.default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _viewer = __webpack_require__(10);

var _viewer2 = _interopRequireDefault(_viewer);

var _toolbar = __webpack_require__(21);

var _toolbar2 = _interopRequireDefault(_toolbar);

__webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PDFViewer = function (_Component) {
  _inherits(PDFViewer, _Component);

  function PDFViewer() {
    _classCallCheck(this, PDFViewer);

    return _possibleConstructorReturn(this, (PDFViewer.__proto__ || Object.getPrototypeOf(PDFViewer)).apply(this, arguments));
  }

  _createClass(PDFViewer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.URI) this.handleMissURI();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.URI) this.handleMissURI();
    }
  }, {
    key: 'handleMissURI',
    value: function handleMissURI() {
      console.error('props URI is required');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          options = _props.options,
          URI = _props.URI;
      var toolbar = options.toolbar;

      return URI ? _react2.default.createElement(
        'div',
        { className: 'PDFViewer' },
        toolbar && _react2.default.createElement(_toolbar2.default, { URI: URI, options: options }),
        _react2.default.createElement(_viewer2.default, this.props)
      ) : null;
    }
  }]);

  return PDFViewer;
}(_react.Component);

PDFViewer.propTypes = {
  options: _propTypes2.default.object,
  URI: _propTypes2.default.string.isRequired
};
PDFViewer.defaultProps = {
  options: {
    toolbox: true,
    toolbar: false,
    textLayer: true
  },
  URI: ''
};
exports.default = PDFViewer;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(7);
var invariant = __webpack_require__(8);
var ReactPropTypesSecret = __webpack_require__(9);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (false) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(11);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _toolbox = __webpack_require__(12);

var _toolbox2 = _interopRequireDefault(_toolbox);

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

var _pdfHook = __webpack_require__(14);

var _pdfHook2 = _interopRequireDefault(_pdfHook);

var _constant = __webpack_require__(3);

var _pdf_viewer = __webpack_require__(15);

var _pdf_viewer2 = _interopRequireDefault(_pdf_viewer);

var _pdf = __webpack_require__(16);

var _pdf2 = _interopRequireDefault(_pdf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(17).Promise : Promise;

_extends(_pdf2.default, _pdf_viewer2.default);

_pdf2.default.workerSrc = 'https://cdn.bootcss.com/pdf.js/1.9.448/pdf.worker.min.js';

var $ = _utils2.default.$,
    $$ = _utils2.default.$$;


function composeParams() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var textLayer = options.textLayer,
      annotationLayer = options.annotationLayer;

  var _params = _extends({}, params);
  if (textLayer) {
    _params.textLayerFactory = new _pdf2.default.DefaultTextLayerFactory();
  }
  if (annotationLayer) {
    _params.annotationLayerFactory = new _pdf2.default.DefaultAnnotationLayerFactory();
  }
  return _params;
}

var Viewer = function (_Component) {
  _inherits(Viewer, _Component);

  function Viewer() {
    var _ref;

    _classCallCheck(this, Viewer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = Viewer.__proto__ || Object.getPrototypeOf(Viewer)).call.apply(_ref, [this].concat(args)));

    _this.state = {
      pdfDocument: null,
      pageCount: 0,
      currentPage: 0,
      scale: _constant.INITIAL_SCALE
    };

    _this.getPages = function () {
      return [].concat(_toConsumableArray($$('.pdf-viewer-wrapper .page')));
    };

    _this.loadDocument = function (URI) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      (0, _pdfHook2.default)('onBeforeLoad', _this.props);

      _pdf2.default.getDocument(URI).then(function (pdfDocument) {
        (0, _pdfHook2.default)('onLoad', _this.props);

        _this.cache[URI] = pdfDocument;
        _this.handleLoadDocument(pdfDocument, options);
      }).catch(function (err) {
        console.log(err);
        (0, _pdfHook2.default)('onError', _this.props);
      });
    };

    _this.loadCache = function (pdfDocument, options) {
      return _this.handleLoadDocument(pdfDocument, options);
    };

    _this.handleLoadDocument = function (pdfDocument) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var PAGE_COUNT = pdfDocument.numPages;
      _this.setState({
        pdfDocument: pdfDocument,
        pageCount: PAGE_COUNT,
        currentPage: 1
      });

      _this.renderPDF(pdfDocument, options).then(function () {
        (0, _pdfHook2.default)('onBeforeRender', _this.props);
      }).catch(function (err) {
        console.log(err);
        (0, _pdfHook2.default)('onError', _this.props);
      });
    };

    _this.renderPDF = function (pdfDocument, options) {
      (0, _pdfHook2.default)('onRender', _this.props);
      _utils2.default.removeChildren(_this.container);

      return _this.makeRender(pdfDocument, options);
    };

    _this.makeRender = function () {
      var pdfDocument = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.pdfDocument;
      var options = arguments[1];
      var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.container;
      var _options$scale = options.scale,
          scale = _options$scale === undefined ? _constant.INITIAL_SCALE : _options$scale;

      var PAGE_COUNT = pdfDocument.numPages;
      var taskList = [];

      var _loop = function _loop(page) {
        pdfDocument.getPage(page).then(function (pdfPage) {
          var scaledViewport = pdfPage.getViewport(_constant.INITIAL_SCALE);
          var renderScale = _constant.PREVIEW_BOX_WIDTH / scaledViewport.width;

          var params = {
            container: container,
            id: page,
            scale: parseFloat((renderScale * _constant.FIX_CSS_UNIT * scale).toFixed(5)),
            defaultViewport: scaledViewport
          };

          var pdfPageView = new _pdf2.default.PDFPageView(composeParams(params, options));
          pdfPageView.setPdfPage(pdfPage);

          var renderTask = pdfPageView.draw();
          taskList.push(renderTask);
        });
      };

      for (var page = 1; page <= PAGE_COUNT; page++) {
        _loop(page);
      }

      return _Promise.all(taskList);
    };

    _this.handleZoomIn = function () {
      var scale = _this.state.scale;

      if (scale < _constant.MAX_SCALE) {
        var finalScale = parseFloat((scale + _constant.SCALE_STEP).toFixed(1));
        if (finalScale > _constant.MAX_SCALE) finalScale = _constant.MAX_SCALE;
        _this.handleZoom(finalScale, scale);
      }
    };

    _this.handleZoomOut = function () {
      var scale = _this.state.scale;

      if (scale > _constant.MIN_SCALE) {
        var finalScale = parseFloat((scale - _constant.SCALE_STEP).toFixed(1));
        if (finalScale < _constant.MIN_SCALE) finalScale = _constant.MIN_SCALE;
        _this.handleZoom(finalScale, scale);
      }
    };

    _this.handleZoomToggle = function () {
      var scale = _this.state.scale;

      var finalScale = scale > _constant.INITIAL_SCALE ? _constant.INITIAL_SCALE : parseFloat((_constant.INITIAL_SCALE / _constant.PREVIEW_BOX_WIDTH * _utils2.default.deviceWidth(40)).toFixed(5));
      if (finalScale > _constant.MAX_SCALE) finalScale = _constant.MAX_SCALE;
      _this.handleZoom(finalScale, scale);
    };

    _this.handleZoom = function (scale) {
      var oldScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constant.INITIAL_SCALE;

      if (scale <= _constant.MAX_SCALE && scale >= _constant.MIN_SCALE) {
        _this.setState({ scale: scale });

        var preOptions = _this.props.options;
        var pdfDocument = _this.state.pdfDocument;

        var options = _extends({}, preOptions, { scale: scale });
        var oldWidth = _this.container.clientWidth;
        var oldScrollLeft = _this.viewerElem.scrollLeft;

        _this.renderPDF(pdfDocument, options).then(function () {
          var width = _this.container.clientWidth;
          _this.resizeWrapper(width, oldWidth, oldScrollLeft);
        });
      }
    };

    _this.resizeWrapper = function (width, oldWidth, oldScrollLeft) {
      var deviceWidth = _utils2.default.deviceWidth(40);
      var align = Math.floor((width - deviceWidth) / 2);
      var preAlign = Math.floor((oldWidth - deviceWidth) / 2);
      if (width > deviceWidth) {
        if (oldWidth < deviceWidth || oldScrollLeft === preAlign) {
          _this.viewerElem.scrollLeft = align;
        } else if (oldScrollLeft !== preAlign) {
          _this.viewerElem.scrollLeft = oldScrollLeft;
        }
      }
    };

    _this.handlePageScroll = function () {
      var pages = _this.getPages();
      var len = pages.length;
      if (len > 1) {
        var H = window.innerHeight;
        var halfH = H / 2;
        for (var i = 0; i < len; i++) {
          var _pages$i$getBoundingC = pages[i].getBoundingClientRect(),
              top = _pages$i$getBoundingC.top,
              bottom = _pages$i$getBoundingC.bottom;

          if (top < halfH && bottom > halfH) {
            _this.setState({ currentPage: i + 1 });
            break;
          }
        }
      }
    };

    _this.handleDownload = function (e) {
      var _this$props = _this.props,
          onDownload = _this$props.onDownload,
          URI = _this$props.URI;

      if (_utils2.default.isFunc(onDownload)) {
        e.preventDefault();
        onDownload(URI);
      }
    };

    _this.cache = _this.props.cache || {};
    _this.scrollTarget = _utils2.default.isElement(_this.props.scrollTarget) ? _this.props.scrollTarget : window;
    _this.handleZoom = _utils2.default.throttle(_this.handleZoom, 200);
    _this.handlePageScroll = _utils2.default.throttle(_this.handlePageScroll, 300);
    return _this;
  }

  _createClass(Viewer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.viewerElem = _reactDom2.default.findDOMNode(this);
      this.container = this.viewerElem.querySelector('.pdf-viewer');

      this.scrollTarget.addEventListener('scroll', this.handlePageScroll, false);

      var _props = this.props,
          _props$URI = _props.URI,
          URI = _props$URI === undefined ? {} : _props$URI,
          options = _props.options;

      if (this.cache[URI]) {
        this.loadCache(this.cache[URI], options);
      } else {
        this.loadDocument(URI, options);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _nextProps$URI = nextProps.URI,
          URI = _nextProps$URI === undefined ? {} : _nextProps$URI,
          options = nextProps.options;

      if (this.props.URI !== URI) {
        if (this.cache[URI]) {
          this.loadCache(this.cache[URI], options);
        } else {
          this.loadDocument(URI, options);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.scrollTarget.removeEventListener('scroll', this.handlePageScroll, false);

      if (!this.props.cache) {
        this.cache = null;
      }
    }

    // zoom in and and zoom out


    // throttle

  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          toolbox = _props2.options.toolbox,
          URI = _props2.URI;
      var _state = this.state,
          pageCount = _state.pageCount,
          currentPage = _state.currentPage,
          scale = _state.scale;

      return _react2.default.createElement(
        'div',
        { className: 'pdf-viewer-wrapper' },
        _react2.default.createElement('div', { className: 'pdfViewer pdf-viewer' }),
        _react2.default.createElement(_toolbox2.default, {
          URI: URI,
          toolbox: toolbox,
          scale: scale,
          pageCount: pageCount,
          currentPage: currentPage,
          handleZoomIn: this.handleZoomIn,
          handleZoomOut: this.handleZoomOut,
          handleZoomToggle: this.handleZoomToggle,
          handleDownload: this.handleDownload
        })
      );
    }
  }]);

  return Viewer;
}(_react.Component);

Viewer.propTypes = {
  URI: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.object,
  scrollTarget: _propTypes2.default.instanceOf(HTMLElement),
  cache: _propTypes2.default.object,
  onDownload: _propTypes2.default.func
};
exports.default = Viewer;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__(13);

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

var _constant = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbox = function (_Component) {
  _inherits(Toolbox, _Component);

  function Toolbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Toolbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toolbox.__proto__ || Object.getPrototypeOf(Toolbox)).call.apply(_ref, [this].concat(args))), _this), _this.toolboxNames = ['pager', 'zoomer', 'operation'], _this.toolboxItems = function (props) {
      var pageCount = props.pageCount,
          currentPage = props.currentPage,
          scale = props.scale,
          URI = props.URI;

      return {
        pager: _react2.default.createElement(
          'div',
          { className: 'toolbox__item page-group', key: 'toolbox-pager' },
          _react2.default.createElement(
            'div',
            { className: 'label' },
            '\u9875\u9762'
          ),
          _react2.default.createElement(
            'div',
            { className: 'current' },
            currentPage
          ),
          _react2.default.createElement(
            'span',
            { className: 'divide-line' },
            '/'
          ),
          _react2.default.createElement(
            'div',
            { className: 'count' },
            pageCount
          )
        ),
        zoomer: _react2.default.createElement(
          'div',
          { className: 'toolbox__item action-group', key: 'toolbox-zoomer' },
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('action-btn', {
                disabled: scale <= _constant.MIN_SCALE
              }),
              onClick: _this.props.handleZoomOut },
            _react2.default.createElement('div', { className: 'action-btn__icon zoom-out' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'action-btn', onClick: _this.props.handleZoomToggle },
            _react2.default.createElement('div', {
              className: (0, _classnames2.default)('action-btn__icon', {
                'zoom-device__zoom-in': scale === _constant.INITIAL_SCALE,
                'zoom-device__zoom-out': scale !== _constant.INITIAL_SCALE
              })
            })
          ),
          _react2.default.createElement(
            'div',
            {
              className: (0, _classnames2.default)('action-btn', {
                disabled: scale >= _constant.MAX_SCALE
              }),
              onClick: _this.props.handleZoomIn },
            _react2.default.createElement('div', { className: 'action-btn__icon zoom-in' })
          )
        ),
        operation: _react2.default.createElement(
          'div',
          { className: 'toolbox__item action-group', key: 'toolbox-operation' },
          _react2.default.createElement(
            'a',
            {
              className: 'action-btn',
              download: true,
              href: URI,
              onClick: _this.props.handleDownload },
            _react2.default.createElement('div', { className: 'action-btn__icon download', href: URI, download: true })
          )
        )
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Toolbox, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          toolbox = _props.toolbox,
          pageCount = _props.pageCount;

      var toolboxItems = this.toolboxItems(this.props);
      var content = [];
      if (typeof toolbox === 'boolean' && toolbox) {
        content = this.toolboxNames.map(function (tool) {
          return toolboxItems[tool];
        });
      } else if (_utils2.default.isObject(toolbox)) {
        var customToolNames = Object.keys(toolbox);
        this.toolboxNames.forEach(function (tool) {
          if (customToolNames.indexOf(tool) !== -1 && toolbox[tool]) {
            content.push(toolboxItems[tool]);
          }
        });
      }
      return content.length && pageCount ? _react2.default.createElement(
        'div',
        { className: 'toolbox-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'toolbox' },
          content
        )
      ) : null;
    }
  }]);

  return Toolbox;
}(_react.Component);

Toolbox.propTypes = {
  URI: _propTypes2.default.string.isRequired,
  scale: _propTypes2.default.number.isRequired,
  toolbox: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.object]),
  pageCount: _propTypes2.default.number.isRequired,
  currentPage: _propTypes2.default.number.isRequired,
  handleZoomIn: _propTypes2.default.func.isRequired,
  handleZoomOut: _propTypes2.default.func.isRequired,
  handleZoomToggle: _propTypes2.default.func.isRequired,
  handleDownload: _propTypes2.default.func.isRequired
};
exports.default = Toolbox;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pdfHook;

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

var _constant = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pdfHook(eventName, props) {
  if (_constant.PDF_HOOK.indexOf(eventName) !== -1) {
    if (_utils2.default.isFunc(props[eventName])) {
      props[eventName]();
    } else if (props[eventName]) {
      console.error('Type Error: event hook ' + eventName + ' is supposed to be a function');
    }
  } else {
    console.warn('undefined event hook: ' + eventName);
  }
}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {var require;/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.1
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}

var _isArray = undefined;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = undefined;
var customSchedulerFn = undefined;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var r = require;
    var vertx = __webpack_require__(20);
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var _arguments = arguments;

  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;

  if (_state) {
    (function () {
      var callback = _arguments[_state - 1];
      asap(function () {
        return invokeCallback(_state, child, callback, parent._result);
      });
    })();
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(16);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var GET_THEN_ERROR = new ErrorObject();

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    GET_THEN_ERROR.error = error;
    return GET_THEN_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === GET_THEN_ERROR) {
      reject(promise, GET_THEN_ERROR.error);
      GET_THEN_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = undefined,
      callback = undefined,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function ErrorObject() {
  this.error = null;
}

var TRY_CATCH_ERROR = new ErrorObject();

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
      resolve(promise, value);
    } else if (failed) {
      reject(promise, error);
    } else if (settled === FULFILLED) {
      fulfill(promise, value);
    } else if (settled === REJECTED) {
      reject(promise, value);
    }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function Enumerator$1(Constructor, input) {
  this._instanceConstructor = Constructor;
  this.promise = new Constructor(noop);

  if (!this.promise[PROMISE_ID]) {
    makePromise(this.promise);
  }

  if (isArray(input)) {
    this.length = input.length;
    this._remaining = input.length;

    this._result = new Array(this.length);

    if (this.length === 0) {
      fulfill(this.promise, this._result);
    } else {
      this.length = this.length || 0;
      this._enumerate(input);
      if (this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  } else {
    reject(this.promise, validationError());
  }
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

Enumerator$1.prototype._enumerate = function (input) {
  for (var i = 0; this._state === PENDING && i < input.length; i++) {
    this._eachEntry(input[i], i);
  }
};

Enumerator$1.prototype._eachEntry = function (entry, i) {
  var c = this._instanceConstructor;
  var resolve$$1 = c.resolve;

  if (resolve$$1 === resolve$1) {
    var _then = getThen(entry);

    if (_then === then && entry._state !== PENDING) {
      this._settledAt(entry._state, i, entry._result);
    } else if (typeof _then !== 'function') {
      this._remaining--;
      this._result[i] = entry;
    } else if (c === Promise$2) {
      var promise = new c(noop);
      handleMaybeThenable(promise, entry, _then);
      this._willSettleAt(promise, i);
    } else {
      this._willSettleAt(new c(function (resolve$$1) {
        return resolve$$1(entry);
      }), i);
    }
  } else {
    this._willSettleAt(resolve$$1(entry), i);
  }
};

Enumerator$1.prototype._settledAt = function (state, i, value) {
  var promise = this.promise;

  if (promise._state === PENDING) {
    this._remaining--;

    if (state === REJECTED) {
      reject(promise, value);
    } else {
      this._result[i] = value;
    }
  }

  if (this._remaining === 0) {
    fulfill(promise, this._result);
  }
};

Enumerator$1.prototype._willSettleAt = function (promise, i) {
  var enumerator = this;

  subscribe(promise, undefined, function (value) {
    return enumerator._settledAt(FULFILLED, i, value);
  }, function (reason) {
    return enumerator._settledAt(REJECTED, i, reason);
  });
};

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all$1(entries) {
  return new Enumerator$1(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race$1(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {function} resolver
  Useful for tooling.
  @constructor
*/
function Promise$2(resolver) {
  this[PROMISE_ID] = nextId();
  this._result = this._state = undefined;
  this._subscribers = [];

  if (noop !== resolver) {
    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise$2 ? initializePromise(this, resolver) : needsNew();
  }
}

Promise$2.all = all$1;
Promise$2.race = race$1;
Promise$2.resolve = resolve$1;
Promise$2.reject = reject$1;
Promise$2._setScheduler = setScheduler;
Promise$2._setAsap = setAsap;
Promise$2._asap = asap;

Promise$2.prototype = {
  constructor: Promise$2,

  /**
    The primary way of interacting with a promise is through its `then` method,
    which registers callbacks to receive either a promise's eventual value or the
    reason why the promise cannot be fulfilled.
  
    ```js
    findUser().then(function(user){
      // user is available
    }, function(reason){
      // user is unavailable, and you are given the reason why
    });
    ```
  
    Chaining
    --------
  
    The return value of `then` is itself a promise.  This second, 'downstream'
    promise is resolved with the return value of the first promise's fulfillment
    or rejection handler, or rejected if the handler throws an exception.
  
    ```js
    findUser().then(function (user) {
      return user.name;
    }, function (reason) {
      return 'default name';
    }).then(function (userName) {
      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
      // will be `'default name'`
    });
  
    findUser().then(function (user) {
      throw new Error('Found user, but still unhappy');
    }, function (reason) {
      throw new Error('`findUser` rejected and we're unhappy');
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
    });
    ```
    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
  
    ```js
    findUser().then(function (user) {
      throw new PedagogicalException('Upstream error');
    }).then(function (value) {
      // never reached
    }).then(function (value) {
      // never reached
    }, function (reason) {
      // The `PedgagocialException` is propagated all the way down to here
    });
    ```
  
    Assimilation
    ------------
  
    Sometimes the value you want to propagate to a downstream promise can only be
    retrieved asynchronously. This can be achieved by returning a promise in the
    fulfillment or rejection handler. The downstream promise will then be pending
    until the returned promise is settled. This is called *assimilation*.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // The user's comments are now available
    });
    ```
  
    If the assimliated promise rejects, then the downstream promise will also reject.
  
    ```js
    findUser().then(function (user) {
      return findCommentsByAuthor(user);
    }).then(function (comments) {
      // If `findCommentsByAuthor` fulfills, we'll have the value here
    }, function (reason) {
      // If `findCommentsByAuthor` rejects, we'll have the reason here
    });
    ```
  
    Simple Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let result;
  
    try {
      result = findResult();
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
    findResult(function(result, err){
      if (err) {
        // failure
      } else {
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findResult().then(function(result){
      // success
    }, function(reason){
      // failure
    });
    ```
  
    Advanced Example
    --------------
  
    Synchronous Example
  
    ```javascript
    let author, books;
  
    try {
      author = findAuthor();
      books  = findBooksByAuthor(author);
      // success
    } catch(reason) {
      // failure
    }
    ```
  
    Errback Example
  
    ```js
  
    function foundBooks(books) {
  
    }
  
    function failure(reason) {
  
    }
  
    findAuthor(function(author, err){
      if (err) {
        failure(err);
        // failure
      } else {
        try {
          findBoooksByAuthor(author, function(books, err) {
            if (err) {
              failure(err);
            } else {
              try {
                foundBooks(books);
              } catch(reason) {
                failure(reason);
              }
            }
          });
        } catch(error) {
          failure(err);
        }
        // success
      }
    });
    ```
  
    Promise Example;
  
    ```javascript
    findAuthor().
      then(findBooksByAuthor).
      then(function(books){
        // found books
    }).catch(function(reason){
      // something went wrong
    });
    ```
  
    @method then
    @param {Function} onFulfilled
    @param {Function} onRejected
    Useful for tooling.
    @return {Promise}
  */
  then: then,

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn't find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    Useful for tooling.
    @return {Promise}
  */
  'catch': function _catch(onRejection) {
    return this.then(null, onRejection);
  }
};

/*global self*/
function polyfill$1() {
    var local = undefined;

    if (typeof global !== 'undefined') {
        local = global;
    } else if (typeof self !== 'undefined') {
        local = self;
    } else {
        try {
            local = Function('return this')();
        } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
        }
    }

    var P = local.Promise;

    if (P) {
        var promiseToString = null;
        try {
            promiseToString = Object.prototype.toString.call(P.resolve());
        } catch (e) {
            // silently ignored
        }

        if (promiseToString === '[object Promise]' && !P.cast) {
            return;
        }
    }

    local.Promise = Promise$2;
}

// Strange compat..
Promise$2.polyfill = polyfill$1;
Promise$2.Promise = Promise$2;

return Promise$2;

})));

//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18), __webpack_require__(19)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolBar = function (_Component) {
  _inherits(ToolBar, _Component);

  function ToolBar() {
    _classCallCheck(this, ToolBar);

    return _possibleConstructorReturn(this, (ToolBar.__proto__ || Object.getPrototypeOf(ToolBar)).apply(this, arguments));
  }

  _createClass(ToolBar, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'toolbar-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'toolbar' },
          _react2.default.createElement(
            'div',
            { className: 'action-group' },
            _react2.default.createElement(
              'div',
              { className: 'action-btn' },
              '+'
            ),
            _react2.default.createElement(
              'div',
              { className: 'action-btn' },
              '-'
            )
          )
        )
      );
    }
  }]);

  return ToolBar;
}(_react.Component);

exports.default = ToolBar;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});