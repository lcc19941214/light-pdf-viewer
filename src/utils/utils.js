const utils = {
  $(selector) {
    return document.querySelector(selector);
  },

  $$(selector) {
    return document.querySelectorAll(selector);
  },

  deviceWidth(margin = 0) {
    return window.innerWidth - margin;
  },

  removeChildren(elem) {
    while (elem.hasChildNodes()) {
      elem.removeChild(elem.lastChild);
    }
  },

  isString: str => typeof str === 'string',

  isNumber: num => typeof num === 'number',

  isArray: arr => {
    if (Array.isArray) {
      return Array.isArray(arr);
    } else {
      return arr instanceof Array;
    }
  },

  isFunc: fn => typeof fn === 'function',

  isNull: val => val === null,

  isUndef: val => val === undefined,

  isObject: obj => !utils.isNull(obj) && typeof obj === 'object',

  isNode: node => {
    return utils.isObject(Node)
      ? node instanceof Node
      : !!(node && utils.isObject(node)
        && utils.isNumber(node.nodeType)
        && utils.isString(node.nodeName))
  },

  isElement: elem => {
    return utils.isObject(HTMLElement)
      ? elem instanceof HTMLElement
      : !!(elem && utils.isObject(elem)
        && elem.nodeType === 1
        && utils.isString(elem.nodeName))
  },

  debounce(fn, wait) {
    var timer, context, args;

    var debounced = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      context = this;
      args = arguments;

      timer = setTimeout(function () {
        fn.apply(context, arguments);
      }, wait);
    }

    return debounced;
  },

  throttle(fn, wait) {
    var timer, context, args;

    var throttled = function () {
      if (!timer) {
        context = this;
        args = arguments;

        timer = setTimeout(function () {
          fn.apply(context, arguments);
          timer = null;
        }, wait);
      }
    }

    throttled.cancel = function () {
      clearTimeout(timer);
      timer = context = args = null;
    }

    return throttled;
  }
};

export default utils;
