const noop = () => {};

const PREVIEW_BOX_WIDTH = 800;
const INITIAL_SCALE = 1.0;
const RESOLUTION_SCALE = 2.0;
const MIN_SCALE = 1.0;
const MAX_SCALE = 2.0;
const SCALE_STEP = 0.1;

// pdfjs-dist/lib/web/ui_uitls.js
// scale may get multiplied with CSS_UNIT and scaled into 1.33333
// use FIX_CSS_UNIT to fix this auto scale
const FIX_CSS_UNIT = 1 / (96.0 / 72.0);

export {
  noop,
  PREVIEW_BOX_WIDTH,
  INITIAL_SCALE,
  RESOLUTION_SCALE,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  FIX_CSS_UNIT
};

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
  isFunc(fn) {
    return typeof fn === 'function';
  },
  debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = Date.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;

      timestamp = Date.now();

      var callNow = immediate && !timeout;

      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  },
  throttle: function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  }
};

export default utils;
