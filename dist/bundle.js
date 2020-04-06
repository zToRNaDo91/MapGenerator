(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.dat = {})));
}(this, (function (exports) { 'use strict';

function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);

  return css;
}

function colorToString (color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();
  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);
  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);
    while (str.length < 6) {
      str = '0' + str;
    }
    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }
  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);
      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }
      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }
    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;
      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;
      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }
      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);
      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }
    isNaN.toString = function () {
      return _isNaN.toString();
    };
    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }
};

var INTERPRETATIONS = [
{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);
        if (test === null) {
          return false;
        }
        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
        if (test === null) {
          return false;
        }
        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
},
{
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
},
{
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
},
{
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }
        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;
var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);
        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;
    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }
    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }
    h /= 6;
    if (h < 0) {
      h += 1;
    }
    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);
    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }
    this.__state.a = this.__state.a || 1;
  }
  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();
function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }
      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }
      this.__state[component] = v;
    }
  });
}
function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }
      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }
      this.__state[component] = v;
    }
  });
}
Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};
Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });
  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};
Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (!this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
    }
    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }
  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;
      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }
      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;
function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }
  var match = val.match(CSS_VALUE_PIXELS);
  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }
  return 0;
}
var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;
    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }
    if (Common.isUndefined(vertical)) {
      vertical = true;
    }
    elem.style.position = 'absolute';
    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }
    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];
    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }
    var evt = document.createEvent(className);
    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0,
          0,
          clientX,
          clientY,
          false, false, false, false, 0, null);
          break;
        }
      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }
      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }
    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }
    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;
    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }
    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);
      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }
    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);
        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }
    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = { left: 0, top: 0 };
    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);
  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);
    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));
    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');
    _this2.__checkbox.setAttribute('type', 'checkbox');
    function onChange() {
      _this.setValue(!_this.__prev);
    }
    dom.bind(_this2.__checkbox, 'change', onChange, false);
    _this2.domElement.appendChild(_this2.__checkbox);
    _this2.updateDisplay();
    return _this2;
  }
  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');
        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }
      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);
  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);
    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));
    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');
    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }
    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);
      _this.__select.appendChild(opt);
    });
    _this2.updateDisplay();
    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;
      _this.setValue(desiredValue);
    });
    _this2.domElement.appendChild(_this2.__select);
    return _this2;
  }
  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);
  function StringController(object, property) {
    classCallCheck(this, StringController);
    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));
    var _this = _this2;
    function onChange() {
      _this.setValue(_this.__input.value);
    }
    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }
      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();
  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }
  return 0;
}
var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);
  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);
    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));
    var _params = params || {};
    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;
    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }
    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }
  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;
      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }
      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }
      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}
var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);
  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);
    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));
    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;
    function onChange() {
      var attempted = parseFloat(_this.__input.value);
      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onBlur() {
      onFinish();
    }
    function onMouseDrag(e) {
      var diff = prevY - e.clientY;
      _this.setValue(_this.getValue() + diff * _this.__impliedStep);
      prevY = e.clientY;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }
    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }
    _this2.__input = document.createElement('input');
    _this2.__input.setAttribute('type', 'text');
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });
    _this2.updateDisplay();
    _this2.domElement.appendChild(_this2.__input);
    return _this2;
  }
  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}
var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);
  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);
    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, { min: min, max: max, step: step }));
    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');
    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }
    function onMouseDrag(e) {
      e.preventDefault();
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
      return false;
    }
    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }
      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }
    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;
      var bgRect = _this.__background.getBoundingClientRect();
      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }
    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }
    _this2.updateDisplay();
    _this2.__background.appendChild(_this2.__foreground);
    _this2.domElement.appendChild(_this2.__background);
    return _this2;
  }
  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);
      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);
  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);
    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));
    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();
      _this.fire();
      return false;
    });
    dom.addClass(_this2.__button, 'button');
    _this2.domElement.appendChild(_this2.__button);
    return _this2;
  }
  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }
      this.getValue().call(this.object);
      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);
  function ColorController(object, property) {
    classCallCheck(this, ColorController);
    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));
    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function ()        {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function ()        {
      dom.addClass(this, 'drag').bind(window, 'touchend', function ()        {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);
    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }
    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }
    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }
    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }
    function onBlur() {
      var i = interpret(this.value);
      if (i !== false) {
        _this.__color.__state = i;
        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }
    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }
    _this2.__saturation_field.appendChild(valueField);
    _this2.__selector.appendChild(_this2.__field_knob);
    _this2.__selector.appendChild(_this2.__saturation_field);
    _this2.__selector.appendChild(_this2.__hue_field);
    _this2.__hue_field.appendChild(_this2.__hue_knob);
    _this2.domElement.appendChild(_this2.__input);
    _this2.domElement.appendChild(_this2.__selector);
    _this2.updateDisplay();
    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__saturation_field.getBoundingClientRect();
      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;
      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }
      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }
      _this.__color.v = v;
      _this.__color.s = s;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }
      var fieldRect = _this.__hue_field.getBoundingClientRect();
      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;
      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);
      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }
      _this.__color.h = h * 360;
      _this.setValue(_this.__color.toOriginal());
      return false;
    }
    return _this2;
  }
  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());
      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);
        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }
      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;
      var _flip = 255 - flip;
      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);
var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];
function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}
function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];
    try {
      head.appendChild(injected);
    } catch (e) {
    }
  }
};

var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];
  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }
  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }
      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }
    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3], step: arguments[4] });
    }
    return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });
  }
  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }
  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }
  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }
  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}
var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);
    var _this = this;
    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }
  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;
      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };
      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';
var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();
var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];
var GUI = function GUI(pars) {
  var _this = this;
  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });
  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };
  }
  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }
  params.resizable = Common.isUndefined(params.parent) && params.resizable;
  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }
  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this,
  {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }
        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }
        setPresetSelectIndex(this);
        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;
        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;
        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }
        this.onResize();
        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;
          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }
          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });
  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);
    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));
        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }
    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }
    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }
    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);
    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };
    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);
    if (!params.closed) {
      this.closed = false;
    }
  }
  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }
      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }
    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }
  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };
  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();
  if (params.resizable) {
    addResizeHandle(this);
  }
  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };
  this.saveToLocalStorageIfPossible = saveToLocalStorage;
  function resetWidth() {
    var root = _this.getRoot();
    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }
  if (!params.parent) {
    resetWidth();
  }
};
GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};
GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';
GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};
dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype,
{
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);
    this.__controllers.splice(this.__controllers.indexOf(controller), 1);
    var _this = this;
    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }
    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }
    var _this = this;
    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }
    var newGuiParams = { name: name, parent: this };
    newGuiParams.autoPlace = this.autoPlace;
    if (this.load &&
    this.load.folders &&
    this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }
    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);
    delete this.__folders[folder.name];
    if (this.load &&
    this.load.folders &&
    this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }
    removeListeners(folder);
    var _this = this;
    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();
    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });
      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }
    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }
    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }
    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }
    var _this = this;
    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }
      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });
    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;
    while (gui.parent) {
      gui = gui.parent;
    }
    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;
    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;
      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }
      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }
    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }
    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }
    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }
      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });
    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;
    this.__listening.push(controller);
    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});
function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');
  if (newDom) {
    li.appendChild(newDom);
  }
  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }
  gui.onResize();
  return li;
}
function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);
  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}
function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}
function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller,                                   {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }
      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);
      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);
      return controller;
    }
  });
  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, { min: controller.__min, max: controller.__max, step: controller.__step });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];
      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();
        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });
        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }
      return returned;
    };
    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }
  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }
    return val;
  }, controller.setValue);
}
function recallSavedValue(gui, controller) {
  var root = gui.getRoot();
  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);
  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];
    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }
    controllerMap[controller.property] = controller;
    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;
      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }
      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}
function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }
  var controller = void 0;
  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }
  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }
  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }
  augmentController(gui, li, controller);
  gui.__controllers.push(controller);
  return controller;
}
function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}
function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;
  gui.__preset_select.appendChild(opt);
  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}
function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}
function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');
  gui.__ul.insertBefore(div, gui.__ul.firstChild);
  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');
  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }
  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }
    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);
  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';
    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }
    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }
  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');
    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}
function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });
  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }
  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }
  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }
  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}
function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';
  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }
  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}
function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}
function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}
function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }
  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
var dom$1 = { dom: dom };
var gui = { GUI: GUI };
var GUI$1 = GUI;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};

exports.color = color;
exports.controllers = controllers;
exports.dom = dom$1;
exports.gui = gui;
exports.GUI = GUI$1;
exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));


},{}],2:[function(require,module,exports){
(function (global){
/* interact.js 1.9.8 | https://raw.github.com/taye/interact.js/master/LICENSE */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).interact=t()}}(function(){function t(e){var n;return function(t){return n||e(n={exports:{},parent:t},n.exports),n.exports}}var k=t(function(t,e){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.Interactable=void 0;var u=r(S),l=n(C),s=n(V),c=n(ct),f=r(w),p=n(ft),i=n(bt),d=m({});function n(t){return t&&t.__esModule?t:{default:t}}function v(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return v=function(){return t},t}function r(t){if(t&&t.__esModule)return t;if(null===t||"object"!==a(t)&&"function"!=typeof t)return{default:t};var e=v();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function y(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}function h(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var g=function(){function o(t,e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this._scopeEvents=r,h(this,"options",void 0),h(this,"_actions",void 0),h(this,"target",void 0),h(this,"events",new i.default),h(this,"_context",void 0),h(this,"_win",void 0),h(this,"_doc",void 0),this._actions=e.actions,this.target=t,this._context=e.context||n,this._win=(0,O.getWindow)((0,$.trySelector)(t)?this._context:t),this._doc=this._win.document,this.set(e)}return y(o,[{key:"_defaults",get:function(){return{base:{},perAction:{},actions:{}}}}]),y(o,[{key:"setOnEvents",value:function(t,e){return f.func(e.onstart)&&this.on("".concat(t,"start"),e.onstart),f.func(e.onmove)&&this.on("".concat(t,"move"),e.onmove),f.func(e.onend)&&this.on("".concat(t,"end"),e.onend),f.func(e.oninertiastart)&&this.on("".concat(t,"inertiastart"),e.oninertiastart),this}},{key:"updatePerActionListeners",value:function(t,e,n){(f.array(e)||f.object(e))&&this.off(t,e),(f.array(n)||f.object(n))&&this.on(t,n)}},{key:"setPerAction",value:function(t,e){var n=this._defaults;for(var r in e){var o=r,i=this.options[t],a=e[o];"listeners"===o&&this.updatePerActionListeners(t,i.listeners,a),f.array(a)?i[o]=u.from(a):f.plainObject(a)?(i[o]=(0,c.default)(i[o]||{},(0,s.default)(a)),f.object(n.perAction[o])&&"enabled"in n.perAction[o]&&(i[o].enabled=!1!==a.enabled)):f.bool(a)&&f.object(n.perAction[o])?i[o].enabled=a:i[o]=a}}},{key:"getRect",value:function(t){return t=t||(f.element(this.target)?this.target:null),f.string(this.target)&&(t=t||this._context.querySelector(this.target)),(0,$.getElementRect)(t)}},{key:"rectChecker",value:function(t){return f.func(t)?(this.getRect=t,this):null===t?(delete this.getRect,this):this.getRect}},{key:"_backCompatOption",value:function(t,e){if((0,$.trySelector)(e)||f.object(e)){for(var n in this.options[t]=e,this._actions.map)this.options[n][t]=e;return this}return this.options[t]}},{key:"origin",value:function(t){return this._backCompatOption("origin",t)}},{key:"deltaSource",value:function(t){return"page"===t||"client"===t?(this.options.deltaSource=t,this):this.options.deltaSource}},{key:"context",value:function(){return this._context}},{key:"inContext",value:function(t){return this._context===t.ownerDocument||(0,$.nodeContains)(this._context,t)}},{key:"testIgnoreAllow",value:function(t,e,n){return!this.testIgnore(t.ignoreFrom,e,n)&&this.testAllow(t.allowFrom,e,n)}},{key:"testAllow",value:function(t,e,n){return!t||!!f.element(n)&&(f.string(t)?(0,$.matchesUpTo)(n,t,e):!!f.element(t)&&(0,$.nodeContains)(t,n))}},{key:"testIgnore",value:function(t,e,n){return!(!t||!f.element(n))&&(f.string(t)?(0,$.matchesUpTo)(n,t,e):!!f.element(t)&&(0,$.nodeContains)(t,n))}},{key:"fire",value:function(t){return this.events.fire(t),this}},{key:"_onOff",value:function(t,e,n,r){f.object(e)&&!f.array(e)&&(r=n,n=null);var o="on"===t?"add":"remove",i=(0,p.default)(e,n);for(var a in i){"wheel"===a&&(a=l.default.wheelEvent);for(var u=0;u<i[a].length;u++){var s=i[a][u];(0,d.isNonNativeEvent)(a,this._actions)?this.events[t](a,s):f.string(this.target)?this._scopeEvents["".concat(o,"Delegate")](this.target,this._context,a,s,r):this._scopeEvents[o](this.target,a,s,r)}}return this}},{key:"on",value:function(t,e,n){return this._onOff("on",t,e,n)}},{key:"off",value:function(t,e,n){return this._onOff("off",t,e,n)}},{key:"set",value:function(t){var e=this._defaults;for(var n in f.object(t)||(t={}),this.options=(0,s.default)(e.base),this._actions.methodDict){var r=n,o=this._actions.methodDict[r];this.options[r]={},this.setPerAction(r,(0,c.default)((0,c.default)({},e.perAction),e.actions[r])),this[o](t[r])}for(var i in t)f.func(this[i])&&this[i](t[i]);return this}},{key:"unset",value:function(){if(f.string(this.target))for(var t in this._scopeEvents.delegatedEvents)for(var e=this._scopeEvents.delegatedEvents[t],n=e.length-1;0<=n;n--){var r=e[n],o=r.selector,i=r.context,a=r.listeners;o===this.target&&i===this._context&&e.splice(n,1);for(var u=a.length-1;0<=u;u--)this._scopeEvents.removeDelegate(this.target,this._context,t,a[u][0],a[u][1])}else this._scopeEvents.remove(this.target,"all")}}]),o}(),b=e.Interactable=g;e.default=b}),m=t(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.isNonNativeEvent=function(t,e){if(e.phaselessTypes[t])return!0;for(var n in e.map)if(0===t.indexOf(n)&&t.substr(n.length)in e.phases)return!0;return!1},e.initScope=M,e.Scope=e.default=void 0;var n=d(D),r=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==v(t)&&"function"!=typeof t)return{default:t};var e=p();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le),o=d(bt),i=d(We),a=d(T({})),u=d(k({})),s=d(Ze),l=d(ze),c=d(cn),f=d(E({}));function p(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return p=function(){return t},t}function d(t){return t&&t.__esModule?t:{default:t}}function v(t){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){return!e||"object"!==v(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function h(t,e,n){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=g(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(n):o.value}})(t,e,n||t)}function g(t){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function m(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function w(t,e,n){return e&&O(t.prototype,e),n&&O(t,n),t}function _(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var P=r.win,x=r.browser,S=r.raf,j=function(){function t(){var e=this;m(this,t),_(this,"id","__interact_scope_".concat(Math.floor(100*Math.random()))),_(this,"isInitialized",!1),_(this,"listenerMaps",[]),_(this,"browser",x),_(this,"utils",r),_(this,"defaults",r.clone(l.default)),_(this,"Eventable",o.default),_(this,"actions",{map:{},phases:{start:!0,move:!0,end:!0},methodDict:{},phaselessTypes:{}}),_(this,"interactStatic",new a.default(this)),_(this,"InteractEvent",i.default),_(this,"Interactable",void 0),_(this,"interactables",new s.default(this)),_(this,"_win",void 0),_(this,"document",void 0),_(this,"window",void 0),_(this,"documents",[]),_(this,"_plugins",{list:[],map:{}}),_(this,"onWindowUnload",function(t){return e.removeDocument(t.target)});var n=this;this.Interactable=function(){function e(){return m(this,e),y(this,g(e).apply(this,arguments))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,u["default"]),w(e,[{key:"set",value:function(t){return h(g(e.prototype),"set",this).call(this,t),n.fire("interactable:set",{options:t,interactable:this}),this}},{key:"unset",value:function(){h(g(e.prototype),"unset",this).call(this),n.interactables.list.splice(n.interactables.list.indexOf(this),1),n.fire("interactable:unset",{interactable:this})}},{key:"_defaults",get:function(){return n.defaults}}]),e}()}return w(t,[{key:"addListeners",value:function(t,e){this.listenerMaps.push({id:e,map:t})}},{key:"fire",value:function(t,e){for(var n=0;n<this.listenerMaps.length;n++){var r=this.listenerMaps[n].map[t];if(r&&!1===r(e,this,t))return!1}}},{key:"init",value:function(t){return this.isInitialized?this:M(this,t)}},{key:"pluginIsInstalled",value:function(t){return this._plugins.map[t.id]||-1!==this._plugins.list.indexOf(t)}},{key:"usePlugin",value:function(t,e){if(this.pluginIsInstalled(t))return this;if(t.id&&(this._plugins.map[t.id]=t),this._plugins.list.push(t),t.install&&t.install(this,e),t.listeners&&t.before){for(var n=0,r=this.listenerMaps.length,o=t.before.reduce(function(t,e){return t[e]=!0,t},{});n<r;n++){if(o[this.listenerMaps[n].id])break}this.listenerMaps.splice(n,0,{id:t.id,map:t.listeners})}else t.listeners&&this.listenerMaps.push({id:t.id,map:t.listeners});return this}},{key:"addDocument",value:function(t,e){if(-1!==this.getDocIndex(t))return!1;var n=P.getWindow(t);e=e?r.extend({},e):{},this.documents.push({doc:t,options:e}),this.events.documents.push(t),t!==this.document&&this.events.add(n,"unload",this.onWindowUnload),this.fire("scope:add-document",{doc:t,window:n,scope:this,options:e})}},{key:"removeDocument",value:function(t){var e=this.getDocIndex(t),n=P.getWindow(t),r=this.documents[e].options;this.events.remove(n,"unload",this.onWindowUnload),this.documents.splice(e,1),this.events.documents.splice(e,1),this.fire("scope:remove-document",{doc:t,window:n,scope:this,options:r})}},{key:"getDocIndex",value:function(t){for(var e=0;e<this.documents.length;e++)if(this.documents[e].doc===t)return e;return-1}},{key:"getDocOptions",value:function(t){var e=this.getDocIndex(t);return-1===e?null:this.documents[e].options}},{key:"now",value:function(){return(this.window.Date||Date).now()}}]),t}();function M(t,e){return t.isInitialized=!0,P.init(e),n.default.init(e),x.init(e),S.init(e),t.window=e,t.document=e.document,t.usePlugin(f.default),t.usePlugin(c.default),t}e.Scope=e.default=j}),E=t(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var _=n(C),u=n(D),P=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==c(t)&&"function"!=typeof t)return{default:t};var e=a();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(zt),s=n(En),l=n(Un),o=n(tr);n(m({}));function a(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return a=function(){return t},t}function n(t){return t&&t.__esModule?t:{default:t}}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?function(t){if(void 0!==t)return t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(t):e}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function v(t,e){return(v=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var y=["pointerDown","pointerMove","pointerUp","updatePointer","removePointer","windowBlur"];function h(O,w){return function(t){var e=w.interactions.list,n=P.getPointerType(t),r=x(P.getEventTargets(t),2),o=r[0],i=r[1],a=[];if(/^touch/.test(t.type)){w.prevTouchTime=w.now();for(var u=0;u<t.changedTouches.length;u++){s=t.changedTouches[u];var s,l={pointer:s,pointerId:P.getPointerId(s),pointerType:n,eventType:t.type,eventTarget:o,curEventTarget:i,scope:w},c=S(l);a.push([l.pointer,l.eventTarget,l.curEventTarget,c])}}else{var f=!1;if(!_.default.supportsPointerEvent&&/mouse/.test(t.type)){for(var p=0;p<e.length&&!f;p++)f="mouse"!==e[p].pointerType&&e[p].pointerIsDown;f=f||w.now()-w.prevTouchTime<500||0===t.timeStamp}if(!f){var d={pointer:t,pointerId:P.getPointerId(t),pointerType:n,eventType:t.type,curEventTarget:i,eventTarget:o,scope:w},v=S(d);a.push([d.pointer,d.eventTarget,d.curEventTarget,v])}}for(var y=0;y<a.length;y++){var h=x(a[y],4),g=h[0],b=h[1],m=h[2];h[3][O](g,t,b,m)}}}function S(t){var e=t.pointerType,n=t.scope,r={interaction:o.default.search(t),searchDetails:t};return n.fire("interactions:find",r),r.interaction||n.interactions.new({pointerType:e})}function r(t,e){var n=t.doc,r=t.scope,o=t.options,i=r.interactions.docEvents,a=r.events,u=a[e];for(var s in r.browser.isIOS&&!o.events&&(o.events={passive:!1}),a.delegatedEvents)u(n,s,a.delegateListener),u(n,s,a.delegateUseCapture,!0);for(var l=o&&o.events,c=0;c<i.length;c++){var f;f=i[c];u(n,f.type,f.listener,l)}}var i={id:"core/interactions",install:function(o){for(var t={},e=0;e<y.length;e++){var n;n=y[e];t[n]=h(n,o)}var r,i=_.default.pEventTypes;function a(){for(var t=0;t<o.interactions.list.length;t++){var e=o.interactions.list[t];if(e.pointerIsDown&&"touch"===e.pointerType&&!e._interacting)for(var n=function(){var n=e.pointers[r];o.documents.some(function(t){var e=t.doc;return(0,$.nodeContains)(e,n.downTarget)})||e.removePointer(n.pointer,n.event)},r=0;r<e.pointers.length;r++){n()}}}(r=u.default.PointerEvent?[{type:i.down,listener:a},{type:i.down,listener:t.pointerDown},{type:i.move,listener:t.pointerMove},{type:i.up,listener:t.pointerUp},{type:i.cancel,listener:t.pointerUp}]:[{type:"mousedown",listener:t.pointerDown},{type:"mousemove",listener:t.pointerMove},{type:"mouseup",listener:t.pointerUp},{type:"touchstart",listener:a},{type:"touchstart",listener:t.pointerDown},{type:"touchmove",listener:t.pointerMove},{type:"touchend",listener:t.pointerUp},{type:"touchcancel",listener:t.pointerUp}]).push({type:"blur",listener:function(t){for(var e=0;e<o.interactions.list.length;e++){o.interactions.list[e].documentBlur(t)}}}),o.prevTouchTime=0,o.Interaction=function(){function t(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),p(this,d(t).apply(this,arguments))}var e,n,r;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&v(t,e)}(t,s["default"]),e=t,(n=[{key:"_now",value:function(){return o.now()}},{key:"pointerMoveTolerance",get:function(){return o.interactions.pointerMoveTolerance},set:function(t){o.interactions.pointerMoveTolerance=t}}])&&f(e.prototype,n),r&&f(e,r),t}(),o.interactions={list:[],new:function(t){t.scopeFire=function(t,e){return o.fire(t,e)};var e=new o.Interaction(t);return o.interactions.list.push(e),e},listeners:t,docEvents:r,pointerMoveTolerance:1},o.usePlugin(l.default)},listeners:{"scope:add-document":function(t){return r(t,"add")},"scope:remove-document":function(t){return r(t,"remove")},"interactable:unset":function(t,e){for(var n=t.interactable,r=e.interactions.list.length-1;0<=r;r--){var o=e.interactions.list[r];o.interactable===n&&(o.stop(),e.fire("interactions:destroy",{interaction:o}),o.destroy(),2<e.interactions.list.length&&e.interactions.list.splice(r,1))}}},onDocSignal:r,doOnInteractions:h,methodNames:y};e.default=i}),T=t(function(t,e){"use strict";function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(e,"__esModule",{value:!0}),e.default=e.InteractStatic=void 0;var n,r=(n=C)&&n.__esModule?n:{default:n},u=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==a(t)&&"function"!=typeof t)return{default:t};var e=l();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le),s=m({});function l(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return l=function(){return t},t}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var i=function(){function a(r){var o=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),this.scope=r,c(this,"getPointerAverage",u.pointer.pointerAverage),c(this,"getTouchBBox",u.pointer.touchBBox),c(this,"getTouchDistance",u.pointer.touchDistance),c(this,"getTouchAngle",u.pointer.touchAngle),c(this,"getElementRect",u.dom.getElementRect),c(this,"getElementClientRect",u.dom.getElementClientRect),c(this,"matchesSelector",u.dom.matchesSelector),c(this,"closest",u.dom.closest),c(this,"globalEvents",{}),c(this,"dynamicDrop",void 0),c(this,"version","1.9.8"),c(this,"interact",void 0);for(var t=this.constructor.prototype,e=function(t,e){var n=r.interactables.get(t,e);return n||((n=r.interactables.new(t,e)).events.global=o.globalEvents),n},n=0;n<Object.getOwnPropertyNames(this.constructor.prototype).length;n++){var i;i=Object.getOwnPropertyNames(this.constructor.prototype)[n];e[i]=t[i]}return u.extend(e,this),e.constructor=this.constructor,this.interact=e}var t,e,n;return t=a,(e=[{key:"use",value:function(t,e){return this.scope.usePlugin(t,e),this}},{key:"isSet",value:function(t,e){return!!this.scope.interactables.get(t,e&&e.context)}},{key:"on",value:function(t,e,n){if(u.is.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),u.is.array(t)){for(var r=0;r<t.length;r++){var o=t[r];this.on(o,e,n)}return this}if(u.is.object(t)){for(var i in t)this.on(i,t[i],e);return this}return(0,s.isNonNativeEvent)(t,this.scope.actions)?this.globalEvents[t]?this.globalEvents[t].push(e):this.globalEvents[t]=[e]:this.scope.events.add(this.scope.document,t,e,{options:n}),this}},{key:"off",value:function(t,e,n){if(u.is.string(t)&&-1!==t.search(" ")&&(t=t.trim().split(/ +/)),u.is.array(t)){for(var r=0;r<t.length;r++){var o=t[r];this.off(o,e,n)}return this}if(u.is.object(t)){for(var i in t)this.off(i,t[i],e);return this}var a;(0,s.isNonNativeEvent)(t,this.scope.actions)?t in this.globalEvents&&-1!==(a=this.globalEvents[t].indexOf(e))&&this.globalEvents[t].splice(a,1):this.scope.events.remove(this.scope.document,t,e,n);return this}},{key:"debug",value:function(){return this.scope}},{key:"supportsTouch",value:function(){return r.default.supportsTouch}},{key:"supportsPointerEvent",value:function(){return r.default.supportsPointerEvent}},{key:"stop",value:function(){for(var t=0;t<this.scope.interactions.list.length;t++){this.scope.interactions.list[t].stop()}return this}},{key:"pointerMoveTolerance",value:function(t){return u.is.number(t)?(this.scope.interactions.pointerMoveTolerance=t,this):this.scope.interactions.pointerMoveTolerance}},{key:"addDocument",value:function(t,e){this.scope.addDocument(t,e)}},{key:"removeDocument",value:function(t){this.scope.removeDocument(t)}}])&&o(t.prototype,e),n&&o(t,n),a}(),f=e.InteractStatic=i;e.default=f}),e={};Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default=function(t){return!(!t||!t.Window)&&t instanceof t.Window};var O={};Object.defineProperty(O,"__esModule",{value:!0}),O.init=i,O.getWindow=a,O.default=void 0;var n,r=(n=e)&&n.__esModule?n:{default:n};var o={realWindow:void 0,window:void 0,getWindow:a,init:i};function i(t){var e=(o.realWindow=t).document.createTextNode("");e.ownerDocument!==t.document&&"function"==typeof t.wrap&&t.wrap(e)===e&&(t=t.wrap(t)),o.window=t}function a(t){return(0,r.default)(t)?t:(t.ownerDocument||t).defaultView||o.window}"undefined"==typeof window?(o.window=void 0,o.realWindow=void 0):i(window),o.init=i;var u=o;O.default=u;var w={};Object.defineProperty(w,"__esModule",{value:!0}),w.array=w.plainObject=w.element=w.string=w.bool=w.number=w.func=w.object=w.docFrag=w.window=void 0;var s=c(e),l=c(O);function c(t){return t&&t.__esModule?t:{default:t}}function f(t){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}w.window=function(t){return t===l.default.window||(0,s.default)(t)};w.docFrag=function(t){return p(t)&&11===t.nodeType};var p=function(t){return!!t&&"object"===f(t)};w.object=p;function d(t){return"function"==typeof t}w.func=d;w.number=function(t){return"number"==typeof t};w.bool=function(t){return"boolean"==typeof t};w.string=function(t){return"string"==typeof t};w.element=function(t){if(!t||"object"!==f(t))return!1;var e=l.default.getWindow(t)||l.default.window;return/object|function/.test(f(e.Element))?t instanceof e.Element:1===t.nodeType&&"string"==typeof t.nodeName};w.plainObject=function(t){return p(t)&&!!t.constructor&&/function Object\b/.test(t.constructor.toString())};w.array=function(t){return p(t)&&void 0!==t.length&&d(t.splice)};var v={};function y(t){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(v,"__esModule",{value:!0}),v.default=void 0;var h=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==y(t)&&"function"!=typeof t)return{default:t};var e=g();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function g(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return g=function(){return t},t}function b(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.prepared.axis;"x"===n?(e.coords.cur.page.y=e.coords.start.page.y,e.coords.cur.client.y=e.coords.start.client.y,e.coords.velocity.client.y=0,e.coords.velocity.page.y=0):"y"===n&&(e.coords.cur.page.x=e.coords.start.page.x,e.coords.cur.client.x=e.coords.start.client.x,e.coords.velocity.client.x=0,e.coords.velocity.page.x=0)}}function _(t){var e=t.iEvent,n=t.interaction;if("drag"===n.prepared.name){var r=n.prepared.axis;if("x"===r||"y"===r){var o="x"===r?"y":"x";e.page[o]=n.coords.start.page[o],e.client[o]=n.coords.start.client[o],e.delta[o]=0}}}var P={id:"actions/drag",install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.draggable=P.draggable,e.map.drag=P,e.methodDict.drag="draggable",r.actions.drag=P.defaults},listeners:{"interactions:before-action-move":b,"interactions:action-resume":b,"interactions:action-move":_,"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.buttons,o=n.options.drag;if(o&&o.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(r&n.options.drag.mouseButtons)))return!(t.action={name:"drag",axis:"start"===o.lockAxis?o.startAxis:o.lockAxis})}},draggable:function(t){return h.object(t)?(this.options.drag.enabled=!1!==t.enabled,this.setPerAction("drag",t),this.setOnEvents("drag",t),/^(xy|x|y|start)$/.test(t.lockAxis)&&(this.options.drag.lockAxis=t.lockAxis),/^(xy|x|y)$/.test(t.startAxis)&&(this.options.drag.startAxis=t.startAxis),this):h.bool(t)?(this.options.drag.enabled=t,this):this.options.drag},beforeMove:b,move:_,defaults:{startAxis:"xy",lockAxis:"xy"},getCursor:function(){return"move"}},x=P;v.default=x;var S={};Object.defineProperty(S,"__esModule",{value:!0}),S.find=S.findIndex=S.from=S.merge=S.remove=S.contains=void 0;S.contains=function(t,e){return-1!==t.indexOf(e)};S.remove=function(t,e){return t.splice(t.indexOf(e),1)};function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}S.merge=j;S.from=function(t){return j([],t)};function M(t,e){for(var n=0;n<t.length;n++)if(e(t[n],n,t))return n;return-1}S.findIndex=M;S.find=function(t,e){return t[M(t,e)]};var D={};Object.defineProperty(D,"__esModule",{value:!0}),D.default=void 0;var I={init:function(t){var e=t;I.document=e.document,I.DocumentFragment=e.DocumentFragment||z,I.SVGElement=e.SVGElement||z,I.SVGSVGElement=e.SVGSVGElement||z,I.SVGElementInstance=e.SVGElementInstance||z,I.Element=e.Element||z,I.HTMLElement=e.HTMLElement||I.Element,I.Event=e.Event,I.Touch=e.Touch||z,I.PointerEvent=e.PointerEvent||e.MSPointerEvent},document:null,DocumentFragment:null,SVGElement:null,SVGSVGElement:null,SVGElementInstance:null,Element:null,HTMLElement:null,Event:null,Touch:null,PointerEvent:null};function z(){}var A=I;D.default=A;var C={};function W(t){return(W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(C,"__esModule",{value:!0}),C.default=void 0;var R=N(D),F=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==W(t)&&"function"!=typeof t)return{default:t};var e=Y();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w),X=N(O);function Y(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Y=function(){return t},t}function N(t){return t&&t.__esModule?t:{default:t}}var L={init:function(t){var e=R.default.Element,n=X.default.window.navigator;L.supportsTouch="ontouchstart"in t||F.func(t.DocumentTouch)&&R.default.document instanceof t.DocumentTouch,L.supportsPointerEvent=!1!==n.pointerEnabled&&!!R.default.PointerEvent,L.isIOS=/iP(hone|od|ad)/.test(n.platform),L.isIOS7=/iP(hone|od|ad)/.test(n.platform)&&/OS 7[^\d]/.test(n.appVersion),L.isIe9=/MSIE 9/.test(n.userAgent),L.isOperaMobile="Opera"===n.appName&&L.supportsTouch&&/Presto/.test(n.userAgent),L.prefixedMatchesSelector="matches"in e.prototype?"matches":"webkitMatchesSelector"in e.prototype?"webkitMatchesSelector":"mozMatchesSelector"in e.prototype?"mozMatchesSelector":"oMatchesSelector"in e.prototype?"oMatchesSelector":"msMatchesSelector",L.pEventTypes=L.supportsPointerEvent?R.default.PointerEvent===t.MSPointerEvent?{up:"MSPointerUp",down:"MSPointerDown",over:"mouseover",out:"mouseout",move:"MSPointerMove",cancel:"MSPointerCancel"}:{up:"pointerup",down:"pointerdown",over:"pointerover",out:"pointerout",move:"pointermove",cancel:"pointercancel"}:null,L.wheelEvent="onmousewheel"in R.default.document?"mousewheel":"wheel"},supportsTouch:null,supportsPointerEvent:null,isIOS7:null,isIOS:null,isIe9:null,isOperaMobile:null,prefixedMatchesSelector:null,pEventTypes:null,wheelEvent:null};var B=L;C.default=B;var V={};function q(t){return(q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(V,"__esModule",{value:!0}),V.default=function t(e){var n={};for(var r in e){var o=e[r];G.plainObject(o)?n[r]=t(o):G.array(o)?n[r]=U.from(o):n[r]=o}return n};var U=K(S),G=K(w);function H(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return H=function(){return t},t}function K(t){if(t&&t.__esModule)return t;if(null===t||"object"!==q(t)&&"function"!=typeof t)return{default:t};var e=H();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var $={};function Z(t){return(Z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty($,"__esModule",{value:!0}),$.nodeContains=function(t,e){for(;e;){if(e===t)return!0;e=e.parentNode}return!1},$.closest=function(t,e){for(;tt.element(t);){if(at(t,e))return t;t=it(t)}return null},$.parentNode=it,$.matchesSelector=at,$.indexOfDeepestElement=function(t){var e,n,r=[],o=t[0],i=o?0:-1;for(e=1;e<t.length;e++){var a=t[e];if(a&&a!==o)if(o){if(a.parentNode!==a.ownerDocument)if(o.parentNode!==a.ownerDocument)if(a.parentNode!==o.parentNode){if(!r.length)for(var u=o,s=void 0;(s=ut(u))&&s!==u.ownerDocument;)r.unshift(u),u=s;var l=void 0;if(o instanceof Q.default.HTMLElement&&a instanceof Q.default.SVGElement&&!(a instanceof Q.default.SVGSVGElement)){if(a===o.parentNode)continue;l=a.ownerSVGElement}else l=a;for(var c=[];l.parentNode!==l.ownerDocument;)c.unshift(l),l=ut(l);for(n=0;c[n]&&c[n]===r[n];)n++;for(var f=[c[n-1],c[n],r[n]],p=f[0].lastChild;p;){if(p===f[1]){o=a,i=e,r=c;break}if(p===f[2])break;p=p.previousSibling}}else{var d=parseInt((0,et.getWindow)(o).getComputedStyle(o).zIndex,10)||0,v=parseInt((0,et.getWindow)(a).getComputedStyle(a).zIndex,10)||0;d<=v&&(o=a,i=e)}else o=a,i=e}else o=a,i=e}return i},$.matchesUpTo=function(t,e,n){for(;tt.element(t);){if(at(t,e))return!0;if((t=it(t))===n)return at(t,e)}return!1},$.getActualElement=function(t){return t instanceof Q.default.SVGElementInstance?t.correspondingUseElement:t},$.getScrollXY=st,$.getElementClientRect=lt,$.getElementRect=function(t){var e=lt(t);if(!J.default.isIOS7&&e){var n=st(et.default.getWindow(t));e.left+=n.x,e.right+=n.x,e.top+=n.y,e.bottom+=n.y}return e},$.getPath=function(t){var e=[];for(;t;)e.push(t),t=it(t);return e},$.trySelector=function(t){return!!tt.string(t)&&(Q.default.document.querySelector(t),!0)};var J=ot(C),Q=ot(D),tt=rt(w),et=rt(O);function nt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return nt=function(){return t},t}function rt(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Z(t)&&"function"!=typeof t)return{default:t};var e=nt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function ot(t){return t&&t.__esModule?t:{default:t}}function it(t){var e=t.parentNode;if(tt.docFrag(e)){for(;(e=e.host)&&tt.docFrag(e););return e}return e}function at(t,e){return et.default.window!==et.default.realWindow&&(e=e.replace(/\/deep\//g," ")),t[J.default.prefixedMatchesSelector](e)}var ut=function(t){return t.parentNode?t.parentNode:t.host};function st(t){return{x:(t=t||et.default.window).scrollX||t.document.documentElement.scrollLeft,y:t.scrollY||t.document.documentElement.scrollTop}}function lt(t){var e=t instanceof Q.default.SVGElement?t.getBoundingClientRect():t.getClientRects()[0];return e&&{left:e.left,right:e.right,top:e.top,bottom:e.bottom,width:e.width||e.right-e.left,height:e.height||e.bottom-e.top}}var ct={};Object.defineProperty(ct,"__esModule",{value:!0}),ct.default=function(t,e){for(var n in e)t[n]=e[n];return t};var ft={};function pt(t){return(pt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ft,"__esModule",{value:!0}),ft.default=function n(e,r,o){o=o||{};yt.string(e)&&-1!==e.search(" ")&&(e=gt(e));if(yt.array(e))return e.reduce(function(t,e){return(0,vt.default)(t,n(e,r,o))},o);yt.object(e)&&(r=e,e="");if(yt.func(r))o[e]=o[e]||[],o[e].push(r);else if(yt.array(r))for(var t=0;t<r.length;t++){var i=r[t];n(e,i,o)}else if(yt.object(r))for(var a in r){var u=gt(a).map(function(t){return"".concat(e).concat(t)});n(u,r[a],o)}return o};var dt,vt=(dt=ct)&&dt.__esModule?dt:{default:dt},yt=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==pt(t)&&"function"!=typeof t)return{default:t};var e=ht();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function ht(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ht=function(){return t},t}function gt(t){return t.trim().split(/ +/)}var bt={};function mt(t){return(mt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(bt,"__esModule",{value:!0}),bt.default=void 0;var Ot=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==mt(t)&&"function"!=typeof t)return{default:t};var e=xt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(S),wt=Pt(ct),_t=Pt(ft);function Pt(t){return t&&t.__esModule?t:{default:t}}function xt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return xt=function(){return t},t}function St(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function jt(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Mt(t,e){for(var n=0;n<e.length;n++){var r=e[n];if(t.immediatePropagationStopped)break;r(t)}}var kt=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),jt(this,"options",void 0),jt(this,"types",{}),jt(this,"propagationStopped",!1),jt(this,"immediatePropagationStopped",!1),jt(this,"global",void 0),this.options=(0,wt.default)({},t||{})}var t,n,r;return t=e,(n=[{key:"fire",value:function(t){var e,n=this.global;(e=this.types[t.type])&&Mt(t,e),!t.propagationStopped&&n&&(e=n[t.type])&&Mt(t,e)}},{key:"on",value:function(t,e){var n=(0,_t.default)(t,e);for(t in n)this.types[t]=Ot.merge(this.types[t]||[],n[t])}},{key:"off",value:function(t,e){var n=(0,_t.default)(t,e);for(t in n){var r=this.types[t];if(r&&r.length)for(var o=0;o<n[t].length;o++){var i=n[t][o],a=r.indexOf(i);-1!==a&&r.splice(a,1)}}}},{key:"getRect",value:function(){return null}}])&&St(t.prototype,n),r&&St(t,r),e}();bt.default=kt;var Et={};Object.defineProperty(Et,"__esModule",{value:!0}),Et.default=void 0;Et.default=function(t,e){return Math.sqrt(t*t+e*e)};var Tt={};function Dt(t,e){for(var n in e){var r=Dt.prefixedPropREs,o=!1;for(var i in r)if(0===n.indexOf(i)&&r[i].test(n)){o=!0;break}o||"function"==typeof e[n]||(t[n]=e[n])}return t}Object.defineProperty(Tt,"__esModule",{value:!0}),Tt.default=void 0,Dt.prefixedPropREs={webkit:/(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,moz:/(Pressure)$/};var It=Dt;Tt.default=It;var zt={};function At(t){return(At="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(zt,"__esModule",{value:!0}),zt.copyCoords=function(t,e){t.page=t.page||{},t.page.x=e.page.x,t.page.y=e.page.y,t.client=t.client||{},t.client.x=e.client.x,t.client.y=e.client.y,t.timeStamp=e.timeStamp},zt.setCoordDeltas=function(t,e,n){t.page.x=n.page.x-e.page.x,t.page.y=n.page.y-e.page.y,t.client.x=n.client.x-e.client.x,t.client.y=n.client.y-e.client.y,t.timeStamp=n.timeStamp-e.timeStamp},zt.setCoordVelocity=function(t,e){var n=Math.max(e.timeStamp/1e3,.001);t.page.x=e.page.x/n,t.page.y=e.page.y/n,t.client.x=e.client.x/n,t.client.y=e.client.y/n,t.timeStamp=n},zt.setZeroCoords=function(t){t.page.x=0,t.page.y=0,t.client.x=0,t.client.y=0},zt.isNativePointer=Vt,zt.getXY=qt,zt.getPageXY=Ut,zt.getClientXY=Gt,zt.getPointerId=function(t){return Xt.number(t.pointerId)?t.pointerId:t.identifier},zt.setCoords=function(t,e,n){var r=1<e.length?Kt(e):e[0],o={};Ut(r,o),t.page.x=o.x,t.page.y=o.y,Gt(r,o),t.client.x=o.x,t.client.y=o.y,t.timeStamp=n},zt.getTouchPair=Ht,zt.pointerAverage=Kt,zt.touchBBox=function(t){if(!(t.length||t.touches&&1<t.touches.length))return null;var e=Ht(t),n=Math.min(e[0].pageX,e[1].pageX),r=Math.min(e[0].pageY,e[1].pageY),o=Math.max(e[0].pageX,e[1].pageX),i=Math.max(e[0].pageY,e[1].pageY);return{x:n,y:r,left:n,top:r,right:o,bottom:i,width:o-n,height:i-r}},zt.touchDistance=function(t,e){var n=e+"X",r=e+"Y",o=Ht(t),i=o[0][n]-o[1][n],a=o[0][r]-o[1][r];return(0,Ft.default)(i,a)},zt.touchAngle=function(t,e){var n=e+"X",r=e+"Y",o=Ht(t),i=o[1][n]-o[0][n],a=o[1][r]-o[0][r];return 180*Math.atan2(a,i)/Math.PI},zt.getPointerType=function(t){return Xt.string(t.pointerType)?t.pointerType:Xt.number(t.pointerType)?[void 0,void 0,"touch","pen","mouse"][t.pointerType]:/touch/.test(t.type)||t instanceof Wt.default.Touch?"touch":"mouse"},zt.getEventTargets=function(t){var e=Xt.func(t.composedPath)?t.composedPath():t.path;return[Rt.getActualElement(e?e[0]:t.target),Rt.getActualElement(t.currentTarget)]},zt.newCoords=function(){return{page:{x:0,y:0},client:{x:0,y:0},timeStamp:0}},zt.coordsToEvent=function(t){return{coords:t,get page(){return this.coords.page},get client(){return this.coords.client},get timeStamp(){return this.coords.timeStamp},get pageX(){return this.coords.page.x},get pageY(){return this.coords.page.y},get clientX(){return this.coords.client.x},get clientY(){return this.coords.client.y},get pointerId(){return this.coords.pointerId},get target(){return this.coords.target},get type(){return this.coords.type},get pointerType(){return this.coords.pointerType},get buttons(){return this.coords.buttons},preventDefault:function(){}}},Object.defineProperty(zt,"pointerExtend",{enumerable:!0,get:function(){return Yt.default}});var Ct=Bt(C),Wt=Bt(D),Rt=Lt($),Ft=Bt(Et),Xt=Lt(w),Yt=Bt(Tt);function Nt(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Nt=function(){return t},t}function Lt(t){if(t&&t.__esModule)return t;if(null===t||"object"!==At(t)&&"function"!=typeof t)return{default:t};var e=Nt();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Bt(t){return t&&t.__esModule?t:{default:t}}function Vt(t){return t instanceof Wt.default.Event||t instanceof Wt.default.Touch}function qt(t,e,n){return(n=n||{}).x=e[(t=t||"page")+"X"],n.y=e[t+"Y"],n}function Ut(t,e){return e=e||{x:0,y:0},Ct.default.isOperaMobile&&Vt(t)?(qt("screen",t,e),e.x+=window.scrollX,e.y+=window.scrollY):qt("page",t,e),e}function Gt(t,e){return e=e||{},Ct.default.isOperaMobile&&Vt(t)?qt("screen",t,e):qt("client",t,e),e}function Ht(t){var e=[];return Xt.array(t)?(e[0]=t[0],e[1]=t[1]):"touchend"===t.type?1===t.touches.length?(e[0]=t.touches[0],e[1]=t.changedTouches[0]):0===t.touches.length&&(e[0]=t.changedTouches[0],e[1]=t.changedTouches[1]):(e[0]=t.touches[0],e[1]=t.touches[1]),e}function Kt(t){for(var e={pageX:0,pageY:0,clientX:0,clientY:0,screenX:0,screenY:0},n=0;n<t.length;n++){var r=t[n];for(var o in e)e[o]+=r[o]}for(var i in e)e[i]/=t.length;return e}var $t={};function Zt(t){return(Zt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty($t,"__esModule",{value:!0}),$t.getStringOptionResult=ne,$t.resolveRectLike=function(t,e,n,r){var o=t;te.string(o)?o=ne(o,e,n):te.func(o)&&(o=o.apply(void 0,function(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}(r)));te.element(o)&&(o=(0,$.getElementRect)(o));return o},$t.rectToXY=function(t){return t&&{x:"x"in t?t.x:t.left,y:"y"in t?t.y:t.top}},$t.xywhToTlbr=function(t){!t||"left"in t&&"top"in t||((t=(0,Qt.default)({},t)).left=t.x||0,t.top=t.y||0,t.right=t.right||t.left+t.width,t.bottom=t.bottom||t.top+t.height);return t},$t.tlbrToXywh=function(t){!t||"x"in t&&"y"in t||((t=(0,Qt.default)({},t)).x=t.left||0,t.y=t.top||0,t.width=t.width||t.right||0-t.x,t.height=t.height||t.bottom||0-t.y);return t},$t.addEdges=function(t,e,n){t.left&&(e.left+=n.x);t.right&&(e.right+=n.x);t.top&&(e.top+=n.y);t.bottom&&(e.bottom+=n.y);e.width=e.right-e.left,e.height=e.bottom-e.top};var Jt,Qt=(Jt=ct)&&Jt.__esModule?Jt:{default:Jt},te=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Zt(t)&&"function"!=typeof t)return{default:t};var e=ee();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function ee(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ee=function(){return t},t}function ne(t,e,n){return"parent"===t?(0,$.parentNode)(n):"self"===t?e.getRect(n):(0,$.closest)(n,t)}var re={};Object.defineProperty(re,"__esModule",{value:!0}),re.default=function(t,e,n){var r=t.options[n],o=r&&r.origin||t.options.origin,i=(0,$t.resolveRectLike)(o,t,e,[t&&e]);return(0,$t.rectToXY)(i)||{x:0,y:0}};var oe={};Object.defineProperty(oe,"__esModule",{value:!0}),oe.default=void 0;var ie,ae,ue=0;var se={request:function(t){return ie(t)},cancel:function(t){return ae(t)},init:function(t){if(ie=t.requestAnimationFrame,ae=t.cancelAnimationFrame,!ie)for(var e=["ms","moz","webkit","o"],n=0;n<e.length;n++){var r=e[n];ie=t["".concat(r,"RequestAnimationFrame")],ae=t["".concat(r,"CancelAnimationFrame")]||t["".concat(r,"CancelRequestAnimationFrame")]}ie||(ie=function(t){var e=Date.now(),n=Math.max(0,16-(e-ue)),r=setTimeout(function(){t(e+n)},n);return ue=e+n,r},ae=function(t){return clearTimeout(t)})}};oe.default=se;var le={};function ce(t){return(ce="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(le,"__esModule",{value:!0}),le.warnOnce=function(t,e){var n=!1;return function(){return n||(he.default.window.console.warn(e),n=!0),t.apply(this,arguments)}},le.copyAction=function(t,e){return t.name=e.name,t.axis=e.axis,t.edges=e.edges,t},Object.defineProperty(le,"win",{enumerable:!0,get:function(){return he.default}}),Object.defineProperty(le,"browser",{enumerable:!0,get:function(){return ge.default}}),Object.defineProperty(le,"clone",{enumerable:!0,get:function(){return be.default}}),Object.defineProperty(le,"extend",{enumerable:!0,get:function(){return me.default}}),Object.defineProperty(le,"getOriginXY",{enumerable:!0,get:function(){return Oe.default}}),Object.defineProperty(le,"hypot",{enumerable:!0,get:function(){return we.default}}),Object.defineProperty(le,"normalizeListeners",{enumerable:!0,get:function(){return _e.default}}),Object.defineProperty(le,"raf",{enumerable:!0,get:function(){return Pe.default}}),le.rect=le.pointer=le.is=le.dom=le.arr=void 0;var fe=je(S);le.arr=fe;var pe=je($);le.dom=pe;var de=je(w);le.is=de;var ve=je(zt);le.pointer=ve;var ye=je($t);le.rect=ye;var he=xe(O),ge=xe(C),be=xe(V),me=xe(ct),Oe=xe(re),we=xe(Et),_e=xe(ft),Pe=xe(oe);function xe(t){return t&&t.__esModule?t:{default:t}}function Se(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Se=function(){return t},t}function je(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ce(t)&&"function"!=typeof t)return{default:t};var e=Se();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var Me={};function ke(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Ee(t,e,n){return e&&ke(t.prototype,e),n&&ke(t,n),t}function Te(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(Me,"__esModule",{value:!0}),Me.default=Me.BaseEvent=void 0;var De=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),Te(this,"type",void 0),Te(this,"target",void 0),Te(this,"currentTarget",void 0),Te(this,"interactable",void 0),Te(this,"_interaction",void 0),Te(this,"timeStamp",void 0),Te(this,"immediatePropagationStopped",!1),Te(this,"propagationStopped",!1),this._interaction=t}return Ee(e,[{key:"interaction",get:function(){return this._interaction._proxy}}]),Ee(e,[{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}]),e}(),Ie=Me.BaseEvent=De;Me.default=Ie;var ze={};Object.defineProperty(ze,"__esModule",{value:!0}),ze.default=ze.defaults=void 0;var Ae={base:{preventDefault:"auto",deltaSource:"page"},perAction:{enabled:!1,origin:{x:0,y:0}},actions:{}},Ce=ze.defaults=Ae;ze.default=Ce;var We={};Object.defineProperty(We,"__esModule",{value:!0}),We.default=We.InteractEvent=void 0;var Re=Le(ct),Fe=Le(re),Xe=Le(Et),Ye=Le(Me),Ne=Le(ze);function Le(t){return t&&t.__esModule?t:{default:t}}function Be(t){return(Be="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Ve(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function qe(t){return(qe=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Ue(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ge(t,e){return(Ge=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function He(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Ke=function(){function g(t,e,n,r,o,i,a){var u,s,l;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,g),s=this,u=!(l=qe(g).call(this,t))||"object"!==Be(l)&&"function"!=typeof l?Ue(s):l,He(Ue(u),"target",void 0),He(Ue(u),"currentTarget",void 0),He(Ue(u),"relatedTarget",null),He(Ue(u),"screenX",void 0),He(Ue(u),"screenY",void 0),He(Ue(u),"button",void 0),He(Ue(u),"buttons",void 0),He(Ue(u),"ctrlKey",void 0),He(Ue(u),"shiftKey",void 0),He(Ue(u),"altKey",void 0),He(Ue(u),"metaKey",void 0),He(Ue(u),"page",void 0),He(Ue(u),"client",void 0),He(Ue(u),"delta",void 0),He(Ue(u),"rect",void 0),He(Ue(u),"x0",void 0),He(Ue(u),"y0",void 0),He(Ue(u),"t0",void 0),He(Ue(u),"dt",void 0),He(Ue(u),"duration",void 0),He(Ue(u),"clientX0",void 0),He(Ue(u),"clientY0",void 0),He(Ue(u),"velocity",void 0),He(Ue(u),"speed",void 0),He(Ue(u),"swipe",void 0),He(Ue(u),"timeStamp",void 0),He(Ue(u),"dragEnter",void 0),He(Ue(u),"dragLeave",void 0),He(Ue(u),"axes",void 0),He(Ue(u),"preEnd",void 0),o=o||t.element;var c=t.interactable,f=(c&&c.options||Ne.default).deltaSource,p=(0,Fe.default)(c,o,n),d="start"===r,v="end"===r,y=d?Ue(u):t.prevEvent,h=d?t.coords.start:v?{page:y.page,client:y.client,timeStamp:t.coords.cur.timeStamp}:t.coords.cur;return u.page=(0,Re.default)({},h.page),u.client=(0,Re.default)({},h.client),u.rect=(0,Re.default)({},t.rect),u.timeStamp=h.timeStamp,v||(u.page.x-=p.x,u.page.y-=p.y,u.client.x-=p.x,u.client.y-=p.y),u.ctrlKey=e.ctrlKey,u.altKey=e.altKey,u.shiftKey=e.shiftKey,u.metaKey=e.metaKey,u.button=e.button,u.buttons=e.buttons,u.target=o,u.currentTarget=o,u.preEnd=i,u.type=a||n+(r||""),u.interactable=c,u.t0=d?t.pointers[t.pointers.length-1].downTime:y.t0,u.x0=t.coords.start.page.x-p.x,u.y0=t.coords.start.page.y-p.y,u.clientX0=t.coords.start.client.x-p.x,u.clientY0=t.coords.start.client.y-p.y,u.delta=d||v?{x:0,y:0}:{x:u[f].x-y[f].x,y:u[f].y-y[f].y},u.dt=t.coords.delta.timeStamp,u.duration=u.timeStamp-u.t0,u.velocity=(0,Re.default)({},t.coords.velocity[f]),u.speed=(0,Xe.default)(u.velocity.x,u.velocity.y),u.swipe=v||"inertiastart"===r?u.getSwipe():null,u}var t,e,n;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Ge(t,e)}(g,Ye["default"]),t=g,(e=[{key:"getSwipe",value:function(){var t=this._interaction;if(t.prevEvent.speed<600||150<this.timeStamp-t.prevEvent.timeStamp)return null;var e=180*Math.atan2(t.prevEvent.velocityY,t.prevEvent.velocityX)/Math.PI;e<0&&(e+=360);var n=112.5<=e&&e<247.5,r=202.5<=e&&e<337.5;return{up:r,down:!r&&22.5<=e&&e<157.5,left:n,right:!n&&(292.5<=e||e<67.5),angle:e,speed:t.prevEvent.speed,velocity:{x:t.prevEvent.velocityX,y:t.prevEvent.velocityY}}}},{key:"preventDefault",value:function(){}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"pageX",get:function(){return this.page.x},set:function(t){this.page.x=t}},{key:"pageY",get:function(){return this.page.y},set:function(t){this.page.y=t}},{key:"clientX",get:function(){return this.client.x},set:function(t){this.client.x=t}},{key:"clientY",get:function(){return this.client.y},set:function(t){this.client.y=t}},{key:"dx",get:function(){return this.delta.x},set:function(t){this.delta.x=t}},{key:"dy",get:function(){return this.delta.y},set:function(t){this.delta.y=t}},{key:"velocityX",get:function(){return this.velocity.x},set:function(t){this.velocity.x=t}},{key:"velocityY",get:function(){return this.velocity.y},set:function(t){this.velocity.y=t}}])&&Ve(t.prototype,e),n&&Ve(t,n),g}(),$e=We.InteractEvent=Ke;We.default=$e;var Ze={};function Je(t){return(Je="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ze,"__esModule",{value:!0}),Ze.default=void 0;var Qe,tn=an(S),en=an($),nn=(Qe=ct)&&Qe.__esModule?Qe:{default:Qe},rn=an(w);function on(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return on=function(){return t},t}function an(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Je(t)&&"function"!=typeof t)return{default:t};var e=on();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function un(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function sn(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ln=function(){function e(t){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.scope=t,sn(this,"list",[]),sn(this,"selectorMap",{}),t.addListeners({"interactable:unset":function(t){var e=t.interactable,n=e.target,r=e._context,o=rn.string(n)?a.selectorMap[n]:n[a.scope.id],i=o.findIndex(function(t){return t.context===r});o[i]&&(o[i].context=null,o[i].interactable=null),o.splice(i,1)}})}var t,n,r;return t=e,(n=[{key:"new",value:function(t,e){e=(0,nn.default)(e||{},{actions:this.scope.actions});var n=new this.scope.Interactable(t,e,this.scope.document,this.scope.events),r={context:n._context,interactable:n};return this.scope.addDocument(n._doc),this.list.push(n),rn.string(t)?(this.selectorMap[t]||(this.selectorMap[t]=[]),this.selectorMap[t].push(r)):(n.target[this.scope.id]||Object.defineProperty(t,this.scope.id,{value:[],configurable:!0}),t[this.scope.id].push(r)),this.scope.fire("interactable:new",{target:t,options:e,interactable:n,win:this.scope._win}),n}},{key:"get",value:function(e,t){var n=t&&t.context||this.scope.document,r=rn.string(e),o=r?this.selectorMap[e]:e[this.scope.id];if(!o)return null;var i=tn.find(o,function(t){return t.context===n&&(r||t.interactable.inContext(e))});return i&&i.interactable}},{key:"forEachMatch",value:function(t,e){for(var n=0;n<this.list.length;n++){var r=this.list[n],o=void 0;if((rn.string(r.target)?rn.element(t)&&en.matchesSelector(t,r.target):t===r.target)&&r.inContext(t)&&(o=e(r)),void 0!==o)return o}}}])&&un(t.prototype,n),r&&un(t,r),e}();Ze.default=ln;var cn={};function fn(t){return(fn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(cn,"__esModule",{value:!0}),cn.default=cn.FakeEvent=void 0;var pn=On(S),dn=On($),vn=bn(ct),yn=On(w),hn=bn(Tt),gn=On(zt);function bn(t){return t&&t.__esModule?t:{default:t}}function mn(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return mn=function(){return t},t}function On(t){if(t&&t.__esModule)return t;if(null===t||"object"!==fn(t)&&"function"!=typeof t)return{default:t};var e=mn();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function wn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _n(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Pn=function(){function o(t){var e,n,r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,o),this.originalEvent=t,r=void 0,(n="currentTarget")in(e=this)?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,(0,hn.default)(this,t)}var t,e,n;return t=o,(e=[{key:"preventOriginalDefault",value:function(){this.originalEvent.preventDefault()}},{key:"stopPropagation",value:function(){this.originalEvent.stopPropagation()}},{key:"stopImmediatePropagation",value:function(){this.originalEvent.stopImmediatePropagation()}}])&&wn(t.prototype,e),n&&wn(t,n),o}();function xn(t){if(!yn.object(t))return{capture:!!t,passive:!1};var e=(0,vn.default)({},t);return e.capture=!!t.capture,e.passive=!!t.passive,e}cn.FakeEvent=Pn;var Sn={id:"events",install:function(t){var f=[],b={},c=[],p={add:d,remove:g,addDelegate:function(e,n,t,r,o){var i=xn(o);if(!b[t]){b[t]=[];for(var a=0;a<c.length;a++){var u=c[a];d(u,t,m),d(u,t,O,!0)}}var s=b[t],l=pn.find(s,function(t){return t.selector===e&&t.context===n});l||(l={selector:e,context:n,listeners:[]},s.push(l));l.listeners.push([r,i])},removeDelegate:function(t,e,n,r,o){var i,a=xn(o),u=b[n],s=!1;if(!u)return;for(i=u.length-1;0<=i;i--){var l=u[i];if(l.selector===t&&l.context===e){for(var c=l.listeners,f=c.length-1;0<=f;f--){var p=_n(c[f],2),d=p[0],v=p[1],y=v.capture,h=v.passive;if(d===r&&y===a.capture&&h===a.passive){c.splice(f,1),c.length||(u.splice(i,1),g(e,n,m),g(e,n,O,!0)),s=!0;break}}if(s)break}}},delegateListener:m,delegateUseCapture:O,delegatedEvents:b,documents:c,targets:f,supportsOptions:!1,supportsPassive:!1};function d(e,t,n,r){var o=xn(r),i=pn.find(f,function(t){return t.eventTarget===e});i||(i={eventTarget:e,events:{}},f.push(i)),i.events[t]||(i.events[t]=[]),e.addEventListener&&!pn.contains(i.events[t],n)&&(e.addEventListener(t,n,p.supportsOptions?o:o.capture),i.events[t].push(n))}function g(e,t,n,r){var o=xn(r),i=pn.findIndex(f,function(t){return t.eventTarget===e}),a=f[i];if(a&&a.events)if("all"!==t){var u=!1,s=a.events[t];if(s){if("all"===n){for(var l=s.length-1;0<=l;l--)g(e,t,s[l],o);return}for(var c=0;c<s.length;c++)if(s[c]===n){e.removeEventListener(t,n,p.supportsOptions?o:o.capture),s.splice(c,1),0===s.length&&(delete a.events[t],u=!0);break}}u&&!Object.keys(a.events).length&&f.splice(i,1)}else for(t in a.events)a.events.hasOwnProperty(t)&&g(e,t,"all")}function m(t,e){for(var n=xn(e),r=new Pn(t),o=b[t.type],i=_n(gn.getEventTargets(t),1)[0],a=i;yn.element(a);){for(var u=0;u<o.length;u++){var s=o[u],l=s.selector,c=s.context;if(dn.matchesSelector(a,l)&&dn.nodeContains(c,i)&&dn.nodeContains(c,a)){var f=s.listeners;r.currentTarget=a;for(var p=0;p<f.length;p++){var d=_n(f[p],2),v=d[0],y=d[1],h=y.capture,g=y.passive;h===n.capture&&g===n.passive&&v(r)}}}a=dn.parentNode(a)}}function O(t){return m.call(this,t,!0)}return t.document.createElement("div").addEventListener("test",null,{get capture(){return p.supportsOptions=!0},get passive(){return p.supportsPassive=!0}}),t.events=p}};cn.default=Sn;var jn={};Object.defineProperty(jn,"__esModule",{value:!0}),jn.default=jn.PointerInfo=void 0;function Mn(t,e,n,r,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,Mn),this.id=t,this.pointer=e,this.event=n,this.downTime=r,this.downTarget=o}var kn=jn.PointerInfo=Mn;jn.default=kn;var En={};function Tn(t){return(Tn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(En,"__esModule",{value:!0}),Object.defineProperty(En,"PointerInfo",{enumerable:!0,get:function(){return Rn.default}}),En.default=En.Interaction=En._ProxyMethods=En._ProxyValues=void 0;var Dn,In,zn,An,Cn=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Tn(t)&&"function"!=typeof t)return{default:t};var e=Xn();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le),Wn=Fn(We),Rn=Fn(jn);function Fn(t){return t&&t.__esModule?t:{default:t}}function Xn(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Xn=function(){return t},t}function Yn(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Nn(t,e,n){return e&&Yn(t.prototype,e),n&&Yn(t,n),t}function Ln(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}En._ProxyValues=Dn,(In=Dn||(En._ProxyValues=Dn={})).interactable="",In.element="",In.prepared="",In.pointerIsDown="",In.pointerWasMoved="",In._proxy="",En._ProxyMethods=zn,(An=zn||(En._ProxyMethods=zn={})).start="",An.move="",An.end="",An.stop="",An.interacting="";var Bn=0,Vn=function(){function l(t){var e=this,n=t.pointerType,r=t.scopeFire;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),Ln(this,"interactable",null),Ln(this,"element",null),Ln(this,"rect",void 0),Ln(this,"_rects",void 0),Ln(this,"edges",void 0),Ln(this,"_scopeFire",void 0),Ln(this,"prepared",{name:null,axis:null,edges:null}),Ln(this,"pointerType",void 0),Ln(this,"pointers",[]),Ln(this,"downEvent",null),Ln(this,"downPointer",{}),Ln(this,"_latestPointer",{pointer:null,event:null,eventTarget:null}),Ln(this,"prevEvent",null),Ln(this,"pointerIsDown",!1),Ln(this,"pointerWasMoved",!1),Ln(this,"_interacting",!1),Ln(this,"_ending",!1),Ln(this,"_stopped",!0),Ln(this,"_proxy",null),Ln(this,"simulation",null),Ln(this,"doMove",Cn.warnOnce(function(t){this.move(t)},"The interaction.doMove() method has been renamed to interaction.move()")),Ln(this,"coords",{start:Cn.pointer.newCoords(),prev:Cn.pointer.newCoords(),cur:Cn.pointer.newCoords(),delta:Cn.pointer.newCoords(),velocity:Cn.pointer.newCoords()}),Ln(this,"_id",Bn++),this._scopeFire=r,this.pointerType=n;var o=this;this._proxy={};function i(t){Object.defineProperty(e._proxy,t,{get:function(){return o[t]}})}for(var a in Dn)i(a);function u(t){Object.defineProperty(e._proxy,t,{value:function(){return o[t].apply(o,arguments)}})}for(var s in zn)u(s);this._scopeFire("interactions:new",{interaction:this})}return Nn(l,[{key:"pointerMoveTolerance",get:function(){return 1}}]),Nn(l,[{key:"pointerDown",value:function(t,e,n){var r=this.updatePointer(t,e,n,!0),o=this.pointers[r];this._scopeFire("interactions:down",{pointer:t,event:e,eventTarget:n,pointerIndex:r,pointerInfo:o,type:"down",interaction:this})}},{key:"start",value:function(t,e,n){return!(this.interacting()||!this.pointerIsDown||this.pointers.length<("gesture"===t.name?2:1)||!e.options[t.name].enabled)&&(Cn.copyAction(this.prepared,t),this.interactable=e,this.element=n,this.rect=e.getRect(n),this.edges=this.prepared.edges?Cn.extend({},this.prepared.edges):{left:!0,right:!0,top:!0,bottom:!0},this._stopped=!1,this._interacting=this._doPhase({interaction:this,event:this.downEvent,phase:"start"})&&!this._stopped,this._interacting)}},{key:"pointerMove",value:function(t,e,n){this.simulation||this.modification&&this.modification.endResult||this.updatePointer(t,e,n,!1);var r,o,i=this.coords.cur.page.x===this.coords.prev.page.x&&this.coords.cur.page.y===this.coords.prev.page.y&&this.coords.cur.client.x===this.coords.prev.client.x&&this.coords.cur.client.y===this.coords.prev.client.y;this.pointerIsDown&&!this.pointerWasMoved&&(r=this.coords.cur.client.x-this.coords.start.client.x,o=this.coords.cur.client.y-this.coords.start.client.y,this.pointerWasMoved=Cn.hypot(r,o)>this.pointerMoveTolerance);var a=this.getPointerIndex(t),u={pointer:t,pointerIndex:a,pointerInfo:this.pointers[a],event:e,type:"move",eventTarget:n,dx:r,dy:o,duplicate:i,interaction:this};i||Cn.pointer.setCoordVelocity(this.coords.velocity,this.coords.delta),this._scopeFire("interactions:move",u),i||this.simulation||(this.interacting()&&(u.type=null,this.move(u)),this.pointerWasMoved&&Cn.pointer.copyCoords(this.coords.prev,this.coords.cur))}},{key:"move",value:function(t){t&&t.event||Cn.pointer.setZeroCoords(this.coords.delta),(t=Cn.extend({pointer:this._latestPointer.pointer,event:this._latestPointer.event,eventTarget:this._latestPointer.eventTarget,interaction:this},t||{})).phase="move",this._doPhase(t)}},{key:"pointerUp",value:function(t,e,n,r){var o=this.getPointerIndex(t);-1===o&&(o=this.updatePointer(t,e,n,!1));var i=/cancel$/i.test(e.type)?"cancel":"up";this._scopeFire("interactions:".concat(i),{pointer:t,pointerIndex:o,pointerInfo:this.pointers[o],event:e,eventTarget:n,type:i,curEventTarget:r,interaction:this}),this.simulation||this.end(e),this.pointerIsDown=!1,this.removePointer(t,e)}},{key:"documentBlur",value:function(t){this.end(t),this._scopeFire("interactions:blur",{event:t,type:"blur",interaction:this})}},{key:"end",value:function(t){var e;this._ending=!0,t=t||this._latestPointer.event,this.interacting()&&(e=this._doPhase({event:t,interaction:this,phase:"end"})),!(this._ending=!1)===e&&this.stop()}},{key:"currentAction",value:function(){return this._interacting?this.prepared.name:null}},{key:"interacting",value:function(){return this._interacting}},{key:"stop",value:function(){this._scopeFire("interactions:stop",{interaction:this}),this.interactable=this.element=null,this._interacting=!1,this._stopped=!0,this.prepared.name=this.prevEvent=null}},{key:"getPointerIndex",value:function(t){var e=Cn.pointer.getPointerId(t);return"mouse"===this.pointerType||"pen"===this.pointerType?this.pointers.length-1:Cn.arr.findIndex(this.pointers,function(t){return t.id===e})}},{key:"getPointerInfo",value:function(t){return this.pointers[this.getPointerIndex(t)]}},{key:"updatePointer",value:function(t,e,n,r){var o=Cn.pointer.getPointerId(t),i=this.getPointerIndex(t),a=this.pointers[i];return r=!1!==r&&(r||/(down|start)$/i.test(e.type)),a?a.pointer=t:(a=new Rn.default(o,t,e,null,null),i=this.pointers.length,this.pointers.push(a)),Cn.pointer.setCoords(this.coords.cur,this.pointers.map(function(t){return t.pointer}),this._now()),Cn.pointer.setCoordDeltas(this.coords.delta,this.coords.prev,this.coords.cur),r&&(this.pointerIsDown=!0,a.downTime=this.coords.cur.timeStamp,a.downTarget=n,Cn.pointer.pointerExtend(this.downPointer,t),this.interacting()||(Cn.pointer.copyCoords(this.coords.start,this.coords.cur),Cn.pointer.copyCoords(this.coords.prev,this.coords.cur),this.downEvent=e,this.pointerWasMoved=!1)),this._updateLatestPointer(t,e,n),this._scopeFire("interactions:update-pointer",{pointer:t,event:e,eventTarget:n,down:r,pointerInfo:a,pointerIndex:i,interaction:this}),i}},{key:"removePointer",value:function(t,e){var n=this.getPointerIndex(t);if(-1!==n){var r=this.pointers[n];this._scopeFire("interactions:remove-pointer",{pointer:t,event:e,eventTarget:null,pointerIndex:n,pointerInfo:r,interaction:this}),this.pointers.splice(n,1)}}},{key:"_updateLatestPointer",value:function(t,e,n){this._latestPointer.pointer=t,this._latestPointer.event=e,this._latestPointer.eventTarget=n}},{key:"destroy",value:function(){this._latestPointer.pointer=null,this._latestPointer.event=null,this._latestPointer.eventTarget=null}},{key:"_createPreparedEvent",value:function(t,e,n,r){return new Wn.default(this,t,this.prepared.name,e,this.element,n,r)}},{key:"_fireEvent",value:function(t){this.interactable.fire(t),(!this.prevEvent||t.timeStamp>=this.prevEvent.timeStamp)&&(this.prevEvent=t)}},{key:"_doPhase",value:function(t){var e=t.event,n=t.phase,r=t.preEnd,o=t.type,i=this.rect;if(i&&"move"===n&&(Cn.rect.addEdges(this.edges,i,this.coords.delta[this.interactable.options.deltaSource]),i.width=i.right-i.left,i.height=i.bottom-i.top),!1===this._scopeFire("interactions:before-action-".concat(n),t))return!1;var a=t.iEvent=this._createPreparedEvent(e,n,r,o);return this._scopeFire("interactions:action-".concat(n),t),"start"===n&&(this.prevEvent=a),this._fireEvent(a),this._scopeFire("interactions:after-action-".concat(n),t),!0}},{key:"_now",value:function(){return Date.now()}}]),l}(),qn=En.Interaction=Vn;En.default=qn;var Un={};function Gn(t){return(Gn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Un,"__esModule",{value:!0}),Un.install=Jn,Un.default=void 0;var Hn=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Gn(t)&&"function"!=typeof t)return{default:t};var e=Kn();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Kn(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Kn=function(){return t},t}function $n(t){return/^(always|never|auto)$/.test(t)?(this.options.preventDefault=t,this):Hn.bool(t)?(this.options.preventDefault=t?"always":"never",this):this.options.preventDefault}function Zn(t){var e=t.interaction,n=t.event;e.interactable&&e.interactable.checkAndPreventDefault(n)}function Jn(r){var t=r.Interactable;t.prototype.preventDefault=$n,t.prototype.checkAndPreventDefault=function(t){return function(t,e,n){var r=t.options.preventDefault;if("never"!==r)if("always"!==r){if(e.events.supportsPassive&&/^touch(start|move)$/.test(n.type)){var o=(0,O.getWindow)(n.target).document,i=e.getDocOptions(o);if(!i||!i.events||!1!==i.events.passive)return}/^(mouse|pointer|touch)*(down|start)/i.test(n.type)||Hn.element(n.target)&&(0,$.matchesSelector)(n.target,"input,select,textarea,[contenteditable=true],[contenteditable=true] *")||n.preventDefault()}else n.preventDefault()}(this,r,t)},r.interactions.docEvents.push({type:"dragstart",listener:function(t){for(var e=0;e<r.interactions.list.length;e++){var n=r.interactions.list[e];if(n.element&&(n.element===t.target||(0,$.nodeContains)(n.element,t.target)))return void n.interactable.checkAndPreventDefault(t)}}})}var Qn={id:"core/interactablePreventDefault",install:Jn,listeners:["down","move","up","cancel"].reduce(function(t,e){return t["interactions:".concat(e)]=Zn,t},{})};Un.default=Qn;var tr={};function er(t){return(er="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(tr,"__esModule",{value:!0}),tr.default=void 0;var nr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==er(t)&&"function"!=typeof t)return{default:t};var e=rr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($);function rr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return rr=function(){return t},t}var or={methodOrder:["simulationResume","mouseOrPen","hasPointer","idle"],search:function(t){for(var e=0;e<or.methodOrder.length;e++){var n;n=or.methodOrder[e];var r=or[n](t);if(r)return r}return null},simulationResume:function(t){var e=t.pointerType,n=t.eventType,r=t.eventTarget,o=t.scope;if(!/down|start/i.test(n))return null;for(var i=0;i<o.interactions.list.length;i++){var a=o.interactions.list[i],u=r;if(a.simulation&&a.simulation.allowResume&&a.pointerType===e)for(;u;){if(u===a.element)return a;u=nr.parentNode(u)}}return null},mouseOrPen:function(t){var e,n=t.pointerId,r=t.pointerType,o=t.eventType,i=t.scope;if("mouse"!==r&&"pen"!==r)return null;for(var a=0;a<i.interactions.list.length;a++){var u=i.interactions.list[a];if(u.pointerType===r){if(u.simulation&&!ir(u,n))continue;if(u.interacting())return u;e=e||u}}if(e)return e;for(var s=0;s<i.interactions.list.length;s++){var l=i.interactions.list[s];if(!(l.pointerType!==r||/down/i.test(o)&&l.simulation))return l}return null},hasPointer:function(t){for(var e=t.pointerId,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(ir(o,e))return o}return null},idle:function(t){for(var e=t.pointerType,n=t.scope,r=0;r<n.interactions.list.length;r++){var o=n.interactions.list[r];if(1===o.pointers.length){var i=o.interactable;if(i&&(!i.options.gesture||!i.options.gesture.enabled))continue}else if(2<=o.pointers.length)continue;if(!o.interacting()&&e===o.pointerType)return o}return null}};function ir(t,e){return t.pointers.some(function(t){return t.id===e})}var ar=or;tr.default=ar;var ur={};Object.defineProperty(ur,"__esModule",{value:!0}),ur.default=void 0;var sr,lr=(sr=Me)&&sr.__esModule?sr:{default:sr},cr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==pr(t)&&"function"!=typeof t)return{default:t};var e=fr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(S);function fr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return fr=function(){return t},t}function pr(t){return(pr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function dr(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function vr(t){return(vr=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function yr(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function hr(t,e){return(hr=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function gr(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var br=function(){function l(t,e,n){var r,o,i;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),o=this,r=!(i=vr(l).call(this,e._interaction))||"object"!==pr(i)&&"function"!=typeof i?yr(o):i,gr(yr(r),"target",void 0),gr(yr(r),"dropzone",void 0),gr(yr(r),"dragEvent",void 0),gr(yr(r),"relatedTarget",void 0),gr(yr(r),"draggable",void 0),gr(yr(r),"timeStamp",void 0),gr(yr(r),"propagationStopped",!1),gr(yr(r),"immediatePropagationStopped",!1);var a="dragleave"===n?t.prev:t.cur,u=a.element,s=a.dropzone;return r.type=n,r.target=u,r.currentTarget=u,r.dropzone=s,r.dragEvent=e,r.relatedTarget=e.target,r.draggable=e.interactable,r.timeStamp=e.timeStamp,r}var t,e,n;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&hr(t,e)}(l,lr["default"]),t=l,(e=[{key:"reject",value:function(){var r=this,t=this._interaction.dropState;if("dropactivate"===this.type||this.dropzone&&t.cur.dropzone===this.dropzone&&t.cur.element===this.target)if(t.prev.dropzone=this.dropzone,t.prev.element=this.target,t.rejected=!0,t.events.enter=null,this.stopImmediatePropagation(),"dropactivate"===this.type){var e=t.activeDrops,n=cr.findIndex(e,function(t){var e=t.dropzone,n=t.element;return e===r.dropzone&&n===r.target});t.activeDrops.splice(n,1);var o=new l(t,this.dragEvent,"dropdeactivate");o.dropzone=this.dropzone,o.target=this.target,this.dropzone.fire(o)}else this.dropzone.fire(new l(t,this.dragEvent,"dragleave"))}},{key:"preventDefault",value:function(){}},{key:"stopPropagation",value:function(){this.propagationStopped=!0}},{key:"stopImmediatePropagation",value:function(){this.immediatePropagationStopped=this.propagationStopped=!0}}])&&dr(t.prototype,e),n&&dr(t,n),l}();ur.default=br;var mr={};function Or(t){return(Or="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(mr,"__esModule",{value:!0}),mr.default=void 0;Sr(k({})),Sr(m({}));var wr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Or(t)&&"function"!=typeof t)return{default:t};var e=xr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le),_r=Sr(v),Pr=Sr(ur);function xr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return xr=function(){return t},t}function Sr(t){return t&&t.__esModule?t:{default:t}}function jr(t,e){for(var n=0;n<t.slice().length;n++){r=t.slice()[n];var r,o=r.dropzone,i=r.element;e.dropzone=o,e.target=i,o.fire(e),e.propagationStopped=e.immediatePropagationStopped=!1}}function Mr(t,e){for(var n=function(t,e){for(var n=t.interactables,r=[],o=0;o<n.list.length;o++){var i=n.list[o];if(i.options.drop.enabled){var a=i.options.drop.accept;if(!(wr.is.element(a)&&a!==e||wr.is.string(a)&&!wr.dom.matchesSelector(e,a)||wr.is.func(a)&&!a({dropzone:i,draggableElement:e})))for(var u=wr.is.string(i.target)?i._context.querySelectorAll(i.target):wr.is.array(i.target)?i.target:[i.target],s=0;s<u.length;s++){var l;l=u[s];l!==e&&r.push({dropzone:i,element:l})}}}return r}(t,e),r=0;r<n.length;r++){var o;o=n[r];o.rect=o.dropzone.getRect(o.element)}return n}function kr(t,e,n){for(var r=t.dropState,o=t.interactable,i=t.element,a=[],u=0;u<r.activeDrops.length;u++){s=r.activeDrops[u];var s,l=s.dropzone,c=s.element,f=s.rect;a.push(l.dropCheck(e,n,o,i,c,f)?c:null)}var p=wr.dom.indexOfDeepestElement(a);return r.activeDrops[p]||null}function Er(t,e,n){var r=t.dropState,o={enter:null,leave:null,activate:null,deactivate:null,move:null,drop:null};return"dragstart"===n.type&&(o.activate=new Pr.default(r,n,"dropactivate"),o.activate.target=null,o.activate.dropzone=null),"dragend"===n.type&&(o.deactivate=new Pr.default(r,n,"dropdeactivate"),o.deactivate.target=null,o.deactivate.dropzone=null),r.rejected||(r.cur.element!==r.prev.element&&(r.prev.dropzone&&(o.leave=new Pr.default(r,n,"dragleave"),n.dragLeave=o.leave.target=r.prev.element,n.prevDropzone=o.leave.dropzone=r.prev.dropzone),r.cur.dropzone&&(o.enter=new Pr.default(r,n,"dragenter"),n.dragEnter=r.cur.element,n.dropzone=r.cur.dropzone)),"dragend"===n.type&&r.cur.dropzone&&(o.drop=new Pr.default(r,n,"drop"),n.dropzone=r.cur.dropzone,n.relatedTarget=r.cur.element),"dragmove"===n.type&&r.cur.dropzone&&(o.move=new Pr.default(r,n,"dropmove"),(o.move.dragmove=n).dropzone=r.cur.dropzone)),o}function Tr(t,e){var n=t.dropState,r=n.activeDrops,o=n.cur,i=n.prev;e.leave&&i.dropzone.fire(e.leave),e.move&&o.dropzone.fire(e.move),e.enter&&o.dropzone.fire(e.enter),e.drop&&o.dropzone.fire(e.drop),e.deactivate&&jr(r,e.deactivate),n.prev.dropzone=o.dropzone,n.prev.element=o.element}function Dr(t,e){var n=t.interaction,r=t.iEvent,o=t.event;if("dragmove"===r.type||"dragend"===r.type){var i=n.dropState;e.dynamicDrop&&(i.activeDrops=Mr(e,n.element));var a=r,u=kr(n,a,o);i.rejected=i.rejected&&!!u&&u.dropzone===i.cur.dropzone&&u.element===i.cur.element,i.cur.dropzone=u&&u.dropzone,i.cur.element=u&&u.element,i.events=Er(n,0,a)}}var Ir={id:"actions/drop",install:function(e){var t=e.actions,n=e.interactStatic,r=e.Interactable,o=e.defaults;e.usePlugin(_r.default),r.prototype.dropzone=function(t){return function(t,e){if(wr.is.object(e)){if(t.options.drop.enabled=!1!==e.enabled,e.listeners){var n=wr.normalizeListeners(e.listeners),r=Object.keys(n).reduce(function(t,e){return t[/^(enter|leave)/.test(e)?"drag".concat(e):/^(activate|deactivate|move)/.test(e)?"drop".concat(e):e]=n[e],t},{});t.off(t.options.drop.listeners),t.on(r),t.options.drop.listeners=r}return wr.is.func(e.ondrop)&&t.on("drop",e.ondrop),wr.is.func(e.ondropactivate)&&t.on("dropactivate",e.ondropactivate),wr.is.func(e.ondropdeactivate)&&t.on("dropdeactivate",e.ondropdeactivate),wr.is.func(e.ondragenter)&&t.on("dragenter",e.ondragenter),wr.is.func(e.ondragleave)&&t.on("dragleave",e.ondragleave),wr.is.func(e.ondropmove)&&t.on("dropmove",e.ondropmove),/^(pointer|center)$/.test(e.overlap)?t.options.drop.overlap=e.overlap:wr.is.number(e.overlap)&&(t.options.drop.overlap=Math.max(Math.min(1,e.overlap),0)),"accept"in e&&(t.options.drop.accept=e.accept),"checker"in e&&(t.options.drop.checker=e.checker),t}if(wr.is.bool(e))return t.options.drop.enabled=e,t;return t.options.drop}(this,t)},r.prototype.dropCheck=function(t,e,n,r,o,i){return function(t,e,n,r,o,i,a){var u=!1;if(!(a=a||t.getRect(i)))return!!t.options.drop.checker&&t.options.drop.checker(e,n,u,t,i,r,o);var s=t.options.drop.overlap;if("pointer"===s){var l=wr.getOriginXY(r,o,"drag"),c=wr.pointer.getPageXY(e);c.x+=l.x,c.y+=l.y;var f=c.x>a.left&&c.x<a.right,p=c.y>a.top&&c.y<a.bottom;u=f&&p}var d=r.getRect(o);if(d&&"center"===s){var v=d.left+d.width/2,y=d.top+d.height/2;u=v>=a.left&&v<=a.right&&y>=a.top&&y<=a.bottom}if(d&&wr.is.number(s)){var h=Math.max(0,Math.min(a.right,d.right)-Math.max(a.left,d.left))*Math.max(0,Math.min(a.bottom,d.bottom)-Math.max(a.top,d.top))/(d.width*d.height);u=s<=h}t.options.drop.checker&&(u=t.options.drop.checker(e,n,u,t,i,r,o));return u}(this,t,e,n,r,o,i)},n.dynamicDrop=function(t){return wr.is.bool(t)?(e.dynamicDrop=t,n):e.dynamicDrop},wr.extend(t.phaselessTypes,{dragenter:!0,dragleave:!0,dropactivate:!0,dropdeactivate:!0,dropmove:!0,drop:!0}),t.methodDict.drop="dropzone",e.dynamicDrop=!1,o.actions.drop=Ir.defaults},listeners:{"interactions:before-action-start":function(t){var e=t.interaction;"drag"===e.prepared.name&&(e.dropState={cur:{dropzone:null,element:null},prev:{dropzone:null,element:null},rejected:null,events:null,activeDrops:[]})},"interactions:after-action-start":function(t,e){var n=t.interaction,r=(t.event,t.iEvent);if("drag"===n.prepared.name){var o=n.dropState;o.activeDrops=null,o.events=null,o.activeDrops=Mr(e,n.element),o.events=Er(n,0,r),o.events.activate&&(jr(o.activeDrops,o.events.activate),e.fire("actions/drop:start",{interaction:n,dragEvent:r}))}},"interactions:action-move":Dr,"interactions:action-end":Dr,"interactions:after-action-move":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(Tr(n,n.dropState.events),e.fire("actions/drop:move",{interaction:n,dragEvent:r}),n.dropState.events={})},"interactions:after-action-end":function(t,e){var n=t.interaction,r=t.iEvent;"drag"===n.prepared.name&&(Tr(n,n.dropState.events),e.fire("actions/drop:end",{interaction:n,dragEvent:r}))},"interactions:stop":function(t){var e=t.interaction;if("drag"===e.prepared.name){var n=e.dropState;n&&(n.activeDrops=null,n.events=null,n.cur.dropzone=null,n.cur.element=null,n.prev.dropzone=null,n.prev.element=null,n.rejected=!1)}}},getActiveDrops:Mr,getDrop:kr,getDropEvents:Er,fireDropEvents:Tr,defaults:{enabled:!1,accept:null,overlap:"pointer"}},zr=Ir;mr.default=zr;var Ar={};function Cr(t){return(Cr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ar,"__esModule",{value:!0}),Ar.default=void 0;var Wr=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Cr(t)&&"function"!=typeof t)return{default:t};var e=Rr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le);function Rr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Rr=function(){return t},t}function Fr(t){var e=t.interaction,n=t.iEvent,r=t.phase;if("gesture"===e.prepared.name){var o=e.pointers.map(function(t){return t.pointer}),i="start"===r,a="end"===r,u=e.interactable.options.deltaSource;if(n.touches=[o[0],o[1]],i)n.distance=Wr.pointer.touchDistance(o,u),n.box=Wr.pointer.touchBBox(o),n.scale=1,n.ds=0,n.angle=Wr.pointer.touchAngle(o,u),n.da=0,e.gesture.startDistance=n.distance,e.gesture.startAngle=n.angle;else if(a){var s=e.prevEvent;n.distance=s.distance,n.box=s.box,n.scale=s.scale,n.ds=0,n.angle=s.angle,n.da=0}else n.distance=Wr.pointer.touchDistance(o,u),n.box=Wr.pointer.touchBBox(o),n.scale=n.distance/e.gesture.startDistance,n.angle=Wr.pointer.touchAngle(o,u),n.ds=n.scale-e.gesture.scale,n.da=n.angle-e.gesture.angle;e.gesture.distance=n.distance,e.gesture.angle=n.angle,Wr.is.number(n.scale)&&n.scale!==1/0&&!isNaN(n.scale)&&(e.gesture.scale=n.scale)}}var Xr={id:"actions/gesture",before:["actions/drag","actions/resize"],install:function(t){var e=t.actions,n=t.Interactable,r=t.defaults;n.prototype.gesturable=function(t){return Wr.is.object(t)?(this.options.gesture.enabled=!1!==t.enabled,this.setPerAction("gesture",t),this.setOnEvents("gesture",t),this):Wr.is.bool(t)?(this.options.gesture.enabled=t,this):this.options.gesture},e.map.gesture=Xr,e.methodDict.gesture="gesturable",r.actions.gesture=Xr.defaults},listeners:{"interactions:action-start":Fr,"interactions:action-move":Fr,"interactions:action-end":Fr,"interactions:new":function(t){t.interaction.gesture={angle:0,distance:0,scale:1,startAngle:0,startDistance:0}},"auto-start:check":function(t){if(!(t.interaction.pointers.length<2)){var e=t.interactable.options.gesture;if(e&&e.enabled)return!(t.action={name:"gesture"})}}},defaults:{},getCursor:function(){return""}},Yr=Xr;Ar.default=Yr;var Nr={};function Lr(t){return(Lr="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Nr,"__esModule",{value:!0}),Nr.default=void 0;var Br,Vr=Hr($),qr=(Br=ct)&&Br.__esModule?Br:{default:Br},Ur=Hr(w);function Gr(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Gr=function(){return t},t}function Hr(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Lr(t)&&"function"!=typeof t)return{default:t};var e=Gr();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Kr(t,e,n,r,o,i,a){if(!e)return!1;if(!0===e){var u=Ur.number(i.width)?i.width:i.right-i.left,s=Ur.number(i.height)?i.height:i.bottom-i.top;if(a=Math.min(a,("left"===t||"right"===t?u:s)/2),u<0&&("left"===t?t="right":"right"===t&&(t="left")),s<0&&("top"===t?t="bottom":"bottom"===t&&(t="top")),"left"===t)return n.x<(0<=u?i.left:i.right)+a;if("top"===t)return n.y<(0<=s?i.top:i.bottom)+a;if("right"===t)return n.x>(0<=u?i.right:i.left)-a;if("bottom"===t)return n.y>(0<=s?i.bottom:i.top)-a}return!!Ur.element(r)&&(Ur.element(e)?e===r:Vr.matchesUpTo(r,e,o))}function $r(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.resizeAxes){var r=e;n.interactable.options.resize.square?("y"===n.resizeAxes?r.delta.x=r.delta.y:r.delta.y=r.delta.x,r.axes="xy"):(r.axes=n.resizeAxes,"x"===n.resizeAxes?r.delta.y=0:"y"===n.resizeAxes&&(r.delta.x=0))}}var Zr={id:"actions/resize",before:["actions/drag"],install:function(e){var t=e.actions,n=e.browser,r=e.Interactable,o=e.defaults;Zr.cursors=n.isIe9?{x:"e-resize",y:"s-resize",xy:"se-resize",top:"n-resize",left:"w-resize",bottom:"s-resize",right:"e-resize",topleft:"se-resize",bottomright:"se-resize",topright:"ne-resize",bottomleft:"ne-resize"}:{x:"ew-resize",y:"ns-resize",xy:"nwse-resize",top:"ns-resize",left:"ew-resize",bottom:"ns-resize",right:"ew-resize",topleft:"nwse-resize",bottomright:"nwse-resize",topright:"nesw-resize",bottomleft:"nesw-resize"},Zr.defaultMargin=n.supportsTouch||n.supportsPointerEvent?20:10,r.prototype.resizable=function(t){return function(t,e,n){if(Ur.object(e))return t.options.resize.enabled=!1!==e.enabled,t.setPerAction("resize",e),t.setOnEvents("resize",e),Ur.string(e.axis)&&/^x$|^y$|^xy$/.test(e.axis)?t.options.resize.axis=e.axis:null===e.axis&&(t.options.resize.axis=n.defaults.actions.resize.axis),Ur.bool(e.preserveAspectRatio)?t.options.resize.preserveAspectRatio=e.preserveAspectRatio:Ur.bool(e.square)&&(t.options.resize.square=e.square),t;if(Ur.bool(e))return t.options.resize.enabled=e,t;return t.options.resize}(this,t,e)},t.map.resize=Zr,t.methodDict.resize="resizable",o.actions.resize=Zr.defaults},listeners:{"interactions:new":function(t){t.interaction.resizeAxes="xy"},"interactions:action-start":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.rect;n._rects={start:(0,qr.default)({},o),corrected:(0,qr.default)({},o),previous:(0,qr.default)({},o),delta:{left:0,right:0,width:0,top:0,bottom:0,height:0}},r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}}(t),$r(t)},"interactions:action-move":function(t){!function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e,o=n.interactable.options.resize.invert,i="reposition"===o||"negate"===o,a=n.rect,u=n._rects,s=u.start,l=u.corrected,c=u.delta,f=u.previous;if((0,qr.default)(f,l),i){if((0,qr.default)(l,a),"reposition"===o){if(l.top>l.bottom){var p=l.top;l.top=l.bottom,l.bottom=p}if(l.left>l.right){var d=l.left;l.left=l.right,l.right=d}}}else l.top=Math.min(a.top,s.bottom),l.bottom=Math.max(a.bottom,s.top),l.left=Math.min(a.left,s.right),l.right=Math.max(a.right,s.left);for(var v in l.width=l.right-l.left,l.height=l.bottom-l.top,l)c[v]=l[v]-f[v];r.edges=n.prepared.edges,r.rect=l,r.deltaRect=c}}(t),$r(t)},"interactions:action-end":function(t){var e=t.iEvent,n=t.interaction;if("resize"===n.prepared.name&&n.prepared.edges){var r=e;r.edges=n.prepared.edges,r.rect=n._rects.corrected,r.deltaRect=n._rects.delta}},"auto-start:check":function(t){var e=t.interaction,n=t.interactable,r=t.element,o=t.rect,i=t.buttons;if(o){var a=(0,qr.default)({},e.coords.cur.page),u=n.options.resize;if(u&&u.enabled&&(!e.pointerIsDown||!/mouse|pointer/.test(e.pointerType)||0!=(i&u.mouseButtons))){if(Ur.object(u.edges)){var s={left:!1,right:!1,top:!1,bottom:!1};for(var l in s)s[l]=Kr(l,u.edges[l],a,e._latestPointer.eventTarget,r,o,u.margin||Zr.defaultMargin);s.left=s.left&&!s.right,s.top=s.top&&!s.bottom,(s.left||s.right||s.top||s.bottom)&&(t.action={name:"resize",edges:s})}else{var c="y"!==u.axis&&a.x>o.right-Zr.defaultMargin,f="x"!==u.axis&&a.y>o.bottom-Zr.defaultMargin;(c||f)&&(t.action={name:"resize",axes:(c?"x":"")+(f?"y":"")})}return!t.action&&void 0}}}},defaults:{square:!1,preserveAspectRatio:!1,axis:"xy",margin:NaN,edges:null,invert:"none"},cursors:null,getCursor:function(t){var e=t.edges,n=t.axis,r=t.name,o=Zr.cursors,i=null;if(n)i=o[r+n];else if(e){for(var a="",u=["top","bottom","left","right"],s=0;s<u.length;s++){var l=u[s];e[l]&&(a+=l)}i=o[a]}return i},defaultMargin:null},Jr=Zr;Nr.default=Jr;var Qr={};Object.defineProperty(Qr,"__esModule",{value:!0}),Object.defineProperty(Qr,"drag",{enumerable:!0,get:function(){return to.default}}),Object.defineProperty(Qr,"drop",{enumerable:!0,get:function(){return eo.default}}),Object.defineProperty(Qr,"gesture",{enumerable:!0,get:function(){return no.default}}),Object.defineProperty(Qr,"resize",{enumerable:!0,get:function(){return ro.default}}),Qr.default=void 0;var to=oo(v),eo=oo(mr),no=oo(Ar),ro=oo(Nr);function oo(t){return t&&t.__esModule?t:{default:t}}var io={id:"actions",install:function(t){t.usePlugin(no.default),t.usePlugin(ro.default),t.usePlugin(to.default),t.usePlugin(eo.default)}};Qr.default=io;var ao={};Object.defineProperty(ao,"__esModule",{value:!0}),ao.default=void 0;ao.default={};var uo={};function so(t){return(so="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(uo,"__esModule",{value:!0}),uo.getContainer=go,uo.getScroll=bo,uo.getScrollSize=function(t){fo.window(t)&&(t=window.document.body);return{x:t.scrollWidth,y:t.scrollHeight}},uo.getScrollSizeDelta=function(t,e){var n=t.interaction,r=t.element,o=n&&n.interactable.options[n.prepared.name].autoScroll;if(!o||!o.enabled)return e(),{x:0,y:0};var i=go(o.container,n.interactable,r),a=bo(i);e();var u=bo(i);return{x:u.x-a.x,y:u.y-a.y}},uo.default=void 0;var lo,co=yo($),fo=yo(w),po=(lo=oe)&&lo.__esModule?lo:{default:lo};function vo(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return vo=function(){return t},t}function yo(t){if(t&&t.__esModule)return t;if(null===t||"object"!==so(t)&&"function"!=typeof t)return{default:t};var e=vo();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}var ho={defaults:{enabled:!1,margin:60,container:null,speed:300},now:Date.now,interaction:null,i:0,x:0,y:0,isScrolling:!1,prevTime:0,margin:0,speed:0,start:function(t){ho.isScrolling=!0,po.default.cancel(ho.i),(t.autoScroll=ho).interaction=t,ho.prevTime=ho.now(),ho.i=po.default.request(ho.scroll)},stop:function(){ho.isScrolling=!1,ho.interaction&&(ho.interaction.autoScroll=null),po.default.cancel(ho.i)},scroll:function(){var t=ho.interaction,e=t.interactable,n=t.element,r=t.prepared.name,o=e.options[r].autoScroll,i=go(o.container,e,n),a=ho.now(),u=(a-ho.prevTime)/1e3,s=o.speed*u;if(1<=s){var l={x:ho.x*s,y:ho.y*s};if(l.x||l.y){var c=bo(i);fo.window(i)?i.scrollBy(l.x,l.y):i&&(i.scrollLeft+=l.x,i.scrollTop+=l.y);var f=bo(i),p={x:f.x-c.x,y:f.y-c.y};(p.x||p.y)&&e.fire({type:"autoscroll",target:n,interactable:e,delta:p,interaction:t,container:i})}ho.prevTime=a}ho.isScrolling&&(po.default.cancel(ho.i),ho.i=po.default.request(ho.scroll))},check:function(t,e){var n=t.options;return n[e].autoScroll&&n[e].autoScroll.enabled},onInteractionMove:function(t){var e=t.interaction,n=t.pointer;if(e.interacting()&&ho.check(e.interactable,e.prepared.name))if(e.simulation)ho.x=ho.y=0;else{var r,o,i,a,u=e.interactable,s=e.element,l=e.prepared.name,c=u.options[l].autoScroll,f=go(c.container,u,s);if(fo.window(f))a=n.clientX<ho.margin,r=n.clientY<ho.margin,o=n.clientX>f.innerWidth-ho.margin,i=n.clientY>f.innerHeight-ho.margin;else{var p=co.getElementClientRect(f);a=n.clientX<p.left+ho.margin,r=n.clientY<p.top+ho.margin,o=n.clientX>p.right-ho.margin,i=n.clientY>p.bottom-ho.margin}ho.x=o?1:a?-1:0,ho.y=i?1:r?-1:0,ho.isScrolling||(ho.margin=c.margin,ho.speed=c.speed,ho.start(e))}}};function go(t,e,n){return(fo.string(t)?(0,$t.getStringOptionResult)(t,e,n):t)||(0,O.getWindow)(n)}function bo(t){return fo.window(t)&&(t=window.document.body),{x:t.scrollLeft,y:t.scrollTop}}var mo={id:"auto-scroll",install:function(t){var e=t.defaults,n=t.actions;(t.autoScroll=ho).now=function(){return t.now()},n.phaselessTypes.autoscroll=!0,e.perAction.autoScroll=ho.defaults},listeners:{"interactions:new":function(t){t.interaction.autoScroll=null},"interactions:destroy":function(t){t.interaction.autoScroll=null,ho.stop(),ho.interaction&&(ho.interaction=null)},"interactions:stop":ho.stop,"interactions:action-move":function(t){return ho.onInteractionMove(t)}}};uo.default=mo;var Oo={};function wo(t){return(wo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Oo,"__esModule",{value:!0}),Oo.default=void 0;var _o=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==wo(t)&&"function"!=typeof t)return{default:t};var e=Po();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Po(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Po=function(){return t},t}function xo(t){return _o.bool(t)?(this.options.styleCursor=t,this):null===t?(delete this.options.styleCursor,this):this.options.styleCursor}function So(t){return _o.func(t)?(this.options.actionChecker=t,this):null===t?(delete this.options.actionChecker,this):this.options.actionChecker}var jo={id:"auto-start/interactableMethods",install:function(d){var t=d.Interactable;t.prototype.getAction=function(t,e,n,r){var o,i,a,u,s,l,c,f,p=(i=e,a=n,u=r,s=d,l=(o=this).getRect(u),c=i.buttons||{0:1,1:4,3:8,4:16}[i.button],f={action:null,interactable:o,interaction:a,element:u,rect:l,buttons:c},s.fire("auto-start:check",f),f.action);return this.options.actionChecker?this.options.actionChecker(t,e,p,this,r,n):p},t.prototype.ignoreFrom=(0,le.warnOnce)(function(t){return this._backCompatOption("ignoreFrom",t)},"Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."),t.prototype.allowFrom=(0,le.warnOnce)(function(t){return this._backCompatOption("allowFrom",t)},"Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."),t.prototype.actionChecker=So,t.prototype.styleCursor=xo}};Oo.default=jo;var Mo={};function ko(t){return(ko="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Mo,"__esModule",{value:!0}),Mo.default=void 0;var Eo,To=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==ko(t)&&"function"!=typeof t)return{default:t};var e=Io();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le),Do=(Eo=Oo)&&Eo.__esModule?Eo:{default:Eo};function Io(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Io=function(){return t},t}function zo(t,e,n,r,o){return e.testIgnoreAllow(e.options[t.name],n,r)&&e.options[t.name].enabled&&Ro(e,n,t,o)?t:null}function Ao(t,e,n,r,o,i,a){for(var u=0,s=r.length;u<s;u++){var l=r[u],c=o[u],f=l.getAction(e,n,t,c);if(f){var p=zo(f,l,c,i,a);if(p)return{action:p,interactable:l,element:c}}}return{action:null,interactable:null,element:null}}function Co(t,e,n,r,o){var i=[],a=[],u=r;function s(t){i.push(t),a.push(u)}for(;To.is.element(u);){i=[],a=[],o.interactables.forEachMatch(u,s);var l=Ao(t,e,n,i,a,r,o);if(l.action&&!l.interactable.options[l.action.name].manualStart)return l;u=To.dom.parentNode(u)}return{action:null,interactable:null,element:null}}function Wo(t,e,n){var r=e.action,o=e.interactable,i=e.element;r=r||{name:null},t.interactable=o,t.element=i,To.copyAction(t.prepared,r),t.rect=o&&r.name?o.getRect(i):null,Yo(t,n),n.fire("autoStart:prepared",{interaction:t})}function Ro(t,e,n,r){var o=t.options,i=o[n.name].max,a=o[n.name].maxPerElement,u=r.autoStart.maxInteractions,s=0,l=0,c=0;if(!(i&&a&&u))return!1;for(var f=0;f<r.interactions.list.length;f++){var p=r.interactions.list[f],d=p.prepared.name;if(p.interacting()){if(u<=++s)return!1;if(p.interactable===t){if(i<=(l+=d===n.name?1:0))return!1;if(p.element===e&&(c++,d===n.name&&a<=c))return!1}}}return 0<u}function Fo(t,e){return To.is.number(t)?(e.autoStart.maxInteractions=t,this):e.autoStart.maxInteractions}function Xo(t,e,n){var r=n.autoStart.cursorElement;r&&r!==t&&(r.style.cursor=""),t.ownerDocument.documentElement.style.cursor=e,t.style.cursor=e,n.autoStart.cursorElement=e?t:null}function Yo(t,e){var n=t.interactable,r=t.element,o=t.prepared;if("mouse"===t.pointerType&&n&&n.options.styleCursor){var i="";if(o.name){var a=n.options[o.name].cursorChecker;i=To.is.func(a)?a(o,n,r,t._interacting):e.actions.map[o.name].getCursor(o)}Xo(t.element,i||"",e)}else e.autoStart.cursorElement&&Xo(e.autoStart.cursorElement,"",e)}var No={id:"auto-start/base",before:["actions","actions/drag","actions/resize","actions/gesture"],install:function(e){var t=e.interactStatic,n=e.defaults;e.usePlugin(Do.default),n.base.actionChecker=null,n.base.styleCursor=!0,To.extend(n.perAction,{manualStart:!1,max:1/0,maxPerElement:1,allowFrom:null,ignoreFrom:null,mouseButtons:1}),t.maxInteractions=function(t){return Fo(t,e)},e.autoStart={maxInteractions:1/0,withinInteractionLimit:Ro,cursorElement:null}},listeners:{"interactions:down":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget;n.interacting()||Wo(n,Co(n,r,o,i,e),e)},"interactions:move":function(t,e){var n,r,o,i,a,u;r=e,o=(n=t).interaction,i=n.pointer,a=n.event,u=n.eventTarget,"mouse"!==o.pointerType||o.pointerIsDown||o.interacting()||Wo(o,Co(o,i,a,u,r),r),function(t,e){var n=t.interaction;if(n.pointerIsDown&&!n.interacting()&&n.pointerWasMoved&&n.prepared.name){e.fire("autoStart:before-start",t);var r=n.interactable,o=n.prepared.name;o&&r&&(r.options[o].manualStart||!Ro(r,n.element,n.prepared,e)?n.stop():(n.start(n.prepared,r,n.element),Yo(n,e)))}}(t,e)},"interactions:stop":function(t,e){var n=t.interaction,r=n.interactable;r&&r.options.styleCursor&&Xo(n.element,"",e)}},maxInteractions:Fo,withinInteractionLimit:Ro,validateAction:zo};Mo.default=No;var Lo={};function Bo(t){return(Bo="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Lo,"__esModule",{value:!0}),Lo.default=void 0;var Vo,qo=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Bo(t)&&"function"!=typeof t)return{default:t};var e=Go();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w),Uo=(Vo=Mo)&&Vo.__esModule?Vo:{default:Vo};function Go(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Go=function(){return t},t}var Ho={id:"auto-start/dragAxis",listeners:{"autoStart:before-start":function(t,r){var o=t.interaction,i=t.eventTarget,e=t.dx,n=t.dy;if("drag"===o.prepared.name){var a=Math.abs(e),u=Math.abs(n),s=o.interactable.options.drag,l=s.startAxis,c=u<a?"x":a<u?"y":"xy";if(o.prepared.axis="start"===s.lockAxis?c[0]:s.lockAxis,"xy"!=c&&"xy"!==l&&l!==c){o.prepared.name=null;function f(t){if(t!==o.interactable){var e=o.interactable.options.drag;if(!e.manualStart&&t.testIgnoreAllow(e,p,i)){var n=t.getAction(o.downPointer,o.downEvent,o,p);if(n&&"drag"===n.name&&function(t,e){if(!e)return;var n=e.options.drag.startAxis;return"xy"===t||"xy"===n||n===t}(c,t)&&Uo.default.validateAction(n,t,p,i,r))return t}}}for(var p=i;qo.element(p);){var d=r.interactables.forEachMatch(p,f);if(d){o.prepared.name="drag",o.interactable=d,o.element=p;break}p=(0,$.parentNode)(p)}}}}}};Lo.default=Ho;var Ko={};Object.defineProperty(Ko,"__esModule",{value:!0}),Ko.default=void 0;var $o,Zo=($o=Mo)&&$o.__esModule?$o:{default:$o};function Jo(t){var e=t.prepared&&t.prepared.name;if(!e)return null;var n=t.interactable.options;return n[e].hold||n[e].delay}var Qo={id:"auto-start/hold",install:function(t){var e=t.defaults;t.usePlugin(Zo.default),e.perAction.hold=0,e.perAction.delay=0},listeners:{"interactions:new":function(t){t.interaction.autoStartHoldTimer=null},"autoStart:prepared":function(t){var e=t.interaction,n=Jo(e);0<n&&(e.autoStartHoldTimer=setTimeout(function(){e.start(e.prepared,e.interactable,e.element)},n))},"interactions:move":function(t){var e=t.interaction,n=t.duplicate;e.pointerWasMoved&&!n&&clearTimeout(e.autoStartHoldTimer)},"autoStart:before-start":function(t){var e=t.interaction;0<Jo(e)&&(e.prepared.name=null)}},getHoldDuration:Jo};Ko.default=Qo;var ti={};Object.defineProperty(ti,"__esModule",{value:!0}),Object.defineProperty(ti,"autoStart",{enumerable:!0,get:function(){return ei.default}}),Object.defineProperty(ti,"dragAxis",{enumerable:!0,get:function(){return ni.default}}),Object.defineProperty(ti,"hold",{enumerable:!0,get:function(){return ri.default}}),ti.default=void 0;var ei=oi(Mo),ni=oi(Lo),ri=oi(Ko);function oi(t){return t&&t.__esModule?t:{default:t}}var ii={id:"auto-start",install:function(t){t.usePlugin(ei.default),t.usePlugin(ri.default),t.usePlugin(ni.default)}};ti.default=ii;var ai={};Object.defineProperty(ai,"__esModule",{value:!0}),ai.default=void 0;ai.default={};var ui={};Object.defineProperty(ui,"__esModule",{value:!0}),ui.default=void 0;ui.default={};var si={};function li(t){return(li="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(si,"__esModule",{value:!0}),si.default=void 0;var ci,fi,pi=hi(D),di=(hi(ct),function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==li(t)&&"function"!=typeof t)return{default:t};var e=yi();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w)),vi=hi(O);function yi(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return yi=function(){return t},t}function hi(t){return t&&t.__esModule?t:{default:t}}(fi=ci=ci||{}).touchAction="touchAction",fi.boxSizing="boxSizing",fi.noListeners="noListeners";var gi={touchAction:"https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action",boxSizing:"https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing"};ci.touchAction,ci.boxSizing,ci.noListeners;function bi(t,e,n){return n.test(t.style[e]||vi.default.window.getComputedStyle(t)[e])}var mi="dev-tools",Oi={id:mi,install:function(){}};si.default=Oi;var wi={};Object.defineProperty(wi,"__esModule",{value:!0}),wi.default=void 0;wi.default={};var _i={};function Pi(t){return(Pi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(_i,"__esModule",{value:!0}),_i.getRectOffset=Ai,_i.default=void 0;var xi=ki(V),Si=ki(ct),ji=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Pi(t)&&"function"!=typeof t)return{default:t};var e=Mi();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($t);function Mi(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Mi=function(){return t},t}function ki(t){return t&&t.__esModule?t:{default:t}}function Ei(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function Ti(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Di(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Ii=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.interaction=t,Di(this,"states",[]),Di(this,"startOffset",{left:0,right:0,top:0,bottom:0}),Di(this,"startDelta",null),Di(this,"result",null),Di(this,"endResult",null),Di(this,"edges",void 0),this.result=zi()}var t,n,r;return t=e,(n=[{key:"start",value:function(t,e){var n=t.phase,r=this.interaction,o=function(t){var n=t.interactable.options[t.prepared.name],e=n.modifiers;if(e&&e.length)return e.filter(function(t){return!t.options||!1!==t.options.enabled});return["snap","snapSize","snapEdges","restrict","restrictEdges","restrictSize"].map(function(t){var e=n[t];return e&&e.enabled&&{options:e,methods:e._methods}}).filter(function(t){return!!t})}(r);this.prepareStates(o),this.edges=(0,Si.default)({},r.edges),this.startOffset=Ai(r.rect,e);var i={phase:n,pageCoords:e,preEnd:!(this.startDelta={x:0,y:0})};return this.result=zi(),this.startAll(i),this.result=this.setAll(i)}},{key:"fillArg",value:function(t){var e=this.interaction;t.interaction=e,t.interactable=e.interactable,t.element=e.element,t.rect=t.rect||e.rect,t.edges=this.edges,t.startOffset=this.startOffset}},{key:"startAll",value:function(t){this.fillArg(t);for(var e=0;e<this.states.length;e++){var n=this.states[e];n.methods.start&&(t.state=n).methods.start(t)}}},{key:"setAll",value:function(t){this.fillArg(t);var e=t.phase,n=t.preEnd,r=t.skipModifiers,o=t.rect;t.coords=(0,Si.default)({},t.pageCoords),t.rect=(0,Si.default)({},o);for(var i=r?this.states.slice(r):this.states,a=zi(t.coords,t.rect),u=0;u<i.length;u++){var s=i[u],l=s.options,c=(0,Si.default)({},t.coords),f=null;s.methods.set&&this.shouldDo(l,n,e)&&(f=(t.state=s).methods.set(t),ji.addEdges(this.interaction.edges,t.rect,{x:t.coords.x-c.x,y:t.coords.y-c.y})),a.eventProps.push(f)}a.delta.x=t.coords.x-t.pageCoords.x,a.delta.y=t.coords.y-t.pageCoords.y,a.rectDelta.left=t.rect.left-o.left,a.rectDelta.right=t.rect.right-o.right,a.rectDelta.top=t.rect.top-o.top,a.rectDelta.bottom=t.rect.bottom-o.bottom;var p=this.result.coords,d=this.result.rect;if(p&&d){var v=a.rect.left!==d.left||a.rect.right!==d.right||a.rect.top!==d.top||a.rect.bottom!==d.bottom;a.changed=v||p.x!==a.coords.x||p.y!==a.coords.y}return a}},{key:"applyToInteraction",value:function(t){var e=this.interaction,n=t.phase,r=e.coords.cur,o=e.coords.start,i=this.result,a=this.startDelta,u=i.delta;"start"===n&&(0,Si.default)(this.startDelta,i.delta);for(var s=0;s<[[o,a],[r,u]].length;s++){var l=Ei([[o,a],[r,u]][s],2),c=l[0],f=l[1];c.page.x+=f.x,c.page.y+=f.y,c.client.x+=f.x,c.client.y+=f.y}var p=this.result.rectDelta,d=t.rect||e.rect;d.left+=p.left,d.right+=p.right,d.top+=p.top,d.bottom+=p.bottom,d.width=d.right-d.left,d.height=d.bottom-d.top}},{key:"setAndApply",value:function(t){var e=this.interaction,n=t.phase,r=t.preEnd,o=t.skipModifiers,i=this.setAll({preEnd:r,phase:n,pageCoords:t.modifiedCoords||e.coords.cur.page});if(!(this.result=i).changed&&(!o||o<this.states.length)&&e.interacting())return!1;if(t.modifiedCoords){var a=e.coords.cur.page,u=t.modifiedCoords.x-a.x,s=t.modifiedCoords.y-a.y;i.coords.x+=u,i.coords.y+=s,i.delta.x+=u,i.delta.y+=s}this.applyToInteraction(t)}},{key:"beforeEnd",value:function(t){var e=t.interaction,n=t.event,r=this.states;if(r&&r.length){for(var o=!1,i=0;i<r.length;i++){var a=r[i],u=(t.state=a).options,s=a.methods,l=s.beforeEnd&&s.beforeEnd(t);if(l)return this.endResult=l,!1;o=o||!o&&this.shouldDo(u,!0,t.phase,!0)}o&&e.move({event:n,preEnd:!0})}}},{key:"stop",value:function(t){var e=t.interaction;if(this.states&&this.states.length){var n=(0,Si.default)({states:this.states,interactable:e.interactable,element:e.element,rect:null},t);this.fillArg(n);for(var r=0;r<this.states.length;r++){var o=this.states[r];(n.state=o).methods.stop&&o.methods.stop(n)}this.states=null,this.endResult=null}}},{key:"prepareStates",value:function(t){this.states=[];for(var e=0;e<t.length;e++){var n=t[e],r=n.options,o=n.methods,i=n.name;r&&!1===r.enabled||this.states.push({options:r,methods:o,index:e,name:i})}return this.states}},{key:"restoreInteractionCoords",value:function(t){var e=t.interaction,n=e.coords,r=e.rect,o=e.modification;if(o.result){for(var i=o.startDelta,a=o.result,u=a.delta,s=a.rectDelta,l=[[n.start,i],[n.cur,u]],c=0;c<l.length;c++){var f=Ei(l[c],2),p=f[0],d=f[1];p.page.x-=d.x,p.page.y-=d.y,p.client.x-=d.x,p.client.y-=d.y}r.left-=s.left,r.right-=s.right,r.top-=s.top,r.bottom-=s.bottom}}},{key:"shouldDo",value:function(t,e,n,r){return!(!t||!1===t.enabled||r&&!t.endOnly||t.endOnly&&!e||"start"===n&&!t.setStart)}},{key:"copyFrom",value:function(t){this.startOffset=t.startOffset,this.startDelta=t.startDelta,this.edges=t.edges,this.states=t.states.map(function(t){return(0,xi.default)(t)}),this.result=zi((0,Si.default)({},t.result.coords),(0,Si.default)({},t.result.rect))}},{key:"destroy",value:function(){for(var t in this)this[t]=null}}])&&Ti(t.prototype,n),r&&Ti(t,r),e}();function zi(t,e){return{rect:e,coords:t,delta:{x:0,y:0},rectDelta:{left:0,right:0,top:0,bottom:0},eventProps:[],changed:!0}}function Ai(t,e){return t?{left:e.x-t.left,top:e.y-t.top,right:t.right-e.x,bottom:t.bottom-e.y}:{left:0,top:0,right:0,bottom:0}}_i.default=Ii;var Ci={};Object.defineProperty(Ci,"__esModule",{value:!0}),Ci.makeModifier=function(t,r){function e(t){var e=t||{};for(var n in e.enabled=!1!==e.enabled,o)n in e||(e[n]=o[n]);return{options:e,methods:i,name:r}}var o=t.defaults,i={start:t.start,set:t.set,beforeEnd:t.beforeEnd,stop:t.stop};r&&"string"==typeof r&&(e._defaults=o,e._methods=i);return e},Ci.addEventModifiers=Fi,Ci.default=void 0;var Wi,Ri=(Wi=_i)&&Wi.__esModule?Wi:{default:Wi};function Fi(t){var e=t.iEvent,n=t.interaction.modification.result;n&&(e.modifiers=n.eventProps)}var Xi={id:"modifiers/base",install:function(t){t.defaults.perAction.modifiers=[]},listeners:{"interactions:new":function(t){var e=t.interaction;e.modification=new Ri.default(e)},"interactions:before-action-start":function(t){var e=t.interaction.modification;e.start(t,t.interaction.coords.start.page),t.interaction.edges=e.edges,e.applyToInteraction(t)},"interactions:before-action-move":function(t){return t.interaction.modification.setAndApply(t)},"interactions:before-action-end":function(t){return t.interaction.modification.beforeEnd(t)},"interactions:action-start":Fi,"interactions:action-move":Fi,"interactions:action-end":Fi,"interactions:after-action-start":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-move":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:stop":function(t){return t.interaction.modification.stop(t)}},before:["actions","action/drag","actions/resize","actions/gesture"]};Ci.default=Xi;var Yi={};function Ni(t){return(Ni="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Yi,"__esModule",{value:!0}),Yi.addTotal=Vi,Yi.applyPending=Ui,Yi.default=void 0;var Li=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ni(t)&&"function"!=typeof t)return{default:t};var e=Bi();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($t);function Bi(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Bi=function(){return t},t}function Vi(t){t.pointerIsDown&&(Hi(t.coords.cur,t.offset.total),t.offset.pending.x=0,t.offset.pending.y=0)}function qi(t){Ui(t.interaction)}function Ui(t){if(!(e=t).offset.pending.x&&!e.offset.pending.y)return!1;var e,n=t.offset.pending;return Hi(t.coords.cur,n),Hi(t.coords.delta,n),Li.addEdges(t.edges,t.rect,n),n.x=0,!(n.y=0)}function Gi(t){var e=t.x,n=t.y;this.offset.pending.x+=e,this.offset.pending.y+=n,this.offset.total.x+=e,this.offset.total.y+=n}function Hi(t,e){var n=t.page,r=t.client,o=e.x,i=e.y;n.x+=o,n.y+=i,r.x+=o,r.y+=i}En._ProxyMethods.offsetBy="";var Ki={id:"offset",install:function(t){t.Interaction.prototype.offsetBy=Gi},listeners:{"interactions:new":function(t){t.interaction.offset={total:{x:0,y:0},pending:{x:0,y:0}}},"interactions:update-pointer":function(t){return Vi(t.interaction)},"interactions:before-action-start":qi,"interactions:before-action-move":qi,"interactions:before-action-end":function(t){var e=t.interaction;if(Ui(e))return e.move({offset:!0}),e.end(),!1},"interactions:stop":function(t){var e=t.interaction;e.offset.total.x=0,e.offset.total.y=0,e.offset.pending.x=0,e.offset.pending.y=0}}};Yi.default=Ki;var $i={};function Zi(t){return(Zi="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty($i,"__esModule",{value:!0}),$i.default=$i.InertiaState=void 0;var Ji=ua(_i),Qi=aa(Ci),ta=ua(Yi),ea=aa($),na=ua(Et),ra=aa(w),oa=ua(oe);function ia(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ia=function(){return t},t}function aa(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Zi(t)&&"function"!=typeof t)return{default:t};var e=ia();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function ua(t){return t&&t.__esModule?t:{default:t}}function sa(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function la(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var ca=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.interaction=t,la(this,"active",!1),la(this,"isModified",!1),la(this,"smoothEnd",!1),la(this,"allowResume",!1),la(this,"modification",null),la(this,"modifierCount",0),la(this,"modifierArg",null),la(this,"startCoords",null),la(this,"t0",0),la(this,"v0",0),la(this,"te",0),la(this,"targetOffset",null),la(this,"modifiedOffset",null),la(this,"currentOffset",null),la(this,"lambda_v0",0),la(this,"one_ve_v0",0),la(this,"timeout",null)}var t,n,r;return t=e,(n=[{key:"start",value:function(t){var e=this.interaction,n=fa(e);if(!n||!n.enabled)return!1;var r=e.coords.velocity.client,o=(0,na.default)(r.x,r.y),i=this.modification||(this.modification=new Ji.default(e));if(i.copyFrom(e.modification),this.t0=e._now(),this.allowResume=n.allowResume,this.v0=o,this.currentOffset={x:0,y:0},this.startCoords=e.coords.cur.page,this.modifierArg={interaction:e,interactable:e.interactable,element:e.element,rect:e.rect,edges:e.edges,pageCoords:this.startCoords,preEnd:!0,phase:"inertiastart"},this.t0-e.coords.cur.timeStamp<50&&o>n.minSpeed&&o>n.endSpeed)this.startInertia();else{if(i.result=i.setAll(this.modifierArg),!i.result.changed)return!1;this.startSmoothEnd()}return e.modification.result.rect=null,e.offsetBy(this.targetOffset),e._doPhase({interaction:e,event:t,phase:"inertiastart"}),e.offsetBy({x:-this.targetOffset.x,y:-this.targetOffset.y}),e.modification.result.rect=null,this.active=!0,e.simulation=this,!0}},{key:"startInertia",value:function(){var t=this,e=this.interaction.coords.velocity.client,n=fa(this.interaction),r=n.resistance,o=-Math.log(n.endSpeed/this.v0)/r;this.targetOffset={x:(e.x-o)/r,y:(e.y-o)/r},this.te=o,this.lambda_v0=r/this.v0,this.one_ve_v0=1-n.endSpeed/this.v0;var i=this.modification,a=this.modifierArg;a.pageCoords={x:this.startCoords.x+this.targetOffset.x,y:this.startCoords.y+this.targetOffset.y},i.result=i.setAll(a),i.result.changed&&(this.isModified=!0,this.modifiedOffset={x:this.targetOffset.x+i.result.delta.x,y:this.targetOffset.y+i.result.delta.y}),this.timeout=oa.default.request(function(){return t.inertiaTick()})}},{key:"startSmoothEnd",value:function(){var t=this;this.smoothEnd=!0,this.isModified=!0,this.targetOffset={x:this.modification.result.delta.x,y:this.modification.result.delta.y},this.timeout=oa.default.request(function(){return t.smoothEndTick()})}},{key:"inertiaTick",value:function(){var t,e,n,r,o,i,a,u=this,s=this.interaction,l=fa(s).resistance,c=(s._now()-this.t0)/1e3;if(c<this.te){var f,p=1-(Math.exp(-l*c)-this.lambda_v0)/this.one_ve_v0,d={x:(f=this.isModified?(e=t=0,n=this.targetOffset.x,r=this.targetOffset.y,o=this.modifiedOffset.x,i=this.modifiedOffset.y,{x:pa(a=p,t,n,o),y:pa(a,e,r,i)}):{x:this.targetOffset.x*p,y:this.targetOffset.y*p}).x-this.currentOffset.x,y:f.y-this.currentOffset.y};this.currentOffset.x+=d.x,this.currentOffset.y+=d.y,s.offsetBy(d),s.move(),this.timeout=oa.default.request(function(){return u.inertiaTick()})}else s.offsetBy({x:this.modifiedOffset.x-this.currentOffset.x,y:this.modifiedOffset.y-this.currentOffset.y}),this.end()}},{key:"smoothEndTick",value:function(){var t=this,e=this.interaction,n=e._now()-this.t0,r=fa(e).smoothEndDuration;if(n<r){var o=da(n,0,this.targetOffset.x,r),i=da(n,0,this.targetOffset.y,r),a={x:o-this.currentOffset.x,y:i-this.currentOffset.y};this.currentOffset.x+=a.x,this.currentOffset.y+=a.y,e.offsetBy(a),e.move({skipModifiers:this.modifierCount}),this.timeout=oa.default.request(function(){return t.smoothEndTick()})}else e.offsetBy({x:this.targetOffset.x-this.currentOffset.x,y:this.targetOffset.y-this.currentOffset.y}),this.end()}},{key:"resume",value:function(t){var e=t.pointer,n=t.event,r=t.eventTarget,o=this.interaction;o.offsetBy({x:-this.currentOffset.x,y:-this.currentOffset.y}),o.updatePointer(e,n,r,!0),o._doPhase({interaction:o,event:n,phase:"resume"}),(0,zt.copyCoords)(o.coords.prev,o.coords.cur),this.stop()}},{key:"end",value:function(){this.interaction.move(),this.interaction.end(),this.stop()}},{key:"stop",value:function(){this.active=this.smoothEnd=!1,this.interaction.simulation=null,oa.default.cancel(this.timeout)}}])&&sa(t.prototype,n),r&&sa(t,r),e}();function fa(t){var e=t.interactable,n=t.prepared;return e&&e.options&&n.name&&e.options[n.name].inertia}function pa(t,e,n,r){var o=1-t;return o*o*e+2*o*t*n+t*t*r}function da(t,e,n,r){return-n*(t/=r)*(t-2)+e}$i.InertiaState=ca;var va={id:"inertia",before:["modifiers/base"],install:function(t){var e=t.defaults;t.usePlugin(ta.default),t.usePlugin(Qi.default),t.actions.phases.inertiastart=!0,t.actions.phases.resume=!0,e.perAction.inertia={enabled:!1,resistance:10,minSpeed:100,endSpeed:10,allowResume:!0,smoothEndDuration:300}},listeners:{"interactions:new":function(t){var e=t.interaction;e.inertia=new ca(e)},"interactions:before-action-end":function(t){var e=t.interaction,n=t.event;return(!e._interacting||e.simulation||!e.inertia.start(n))&&null},"interactions:down":function(t){var e=t.interaction,n=t.eventTarget,r=e.inertia;if(r.active)for(var o=n;ra.element(o);){if(o===e.element){r.resume(t);break}o=ea.parentNode(o)}},"interactions:stop":function(t){var e=t.interaction.inertia;e.active&&e.stop()},"interactions:before-action-resume":function(t){var e=t.interaction.modification;e.stop(t),e.start(t,t.interaction.coords.cur.page),e.applyToInteraction(t)},"interactions:before-action-inertiastart":function(t){return t.interaction.modification.setAndApply(t)},"interactions:action-resume":Qi.addEventModifiers,"interactions:action-inertiastart":Qi.addEventModifiers,"interactions:after-action-inertiastart":function(t){return t.interaction.modification.restoreInteractionCoords(t)},"interactions:after-action-resume":function(t){return t.interaction.modification.restoreInteractionCoords(t)}}};$i.default=va;var ya,ha={};function ga(t){return(ga="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(ha,"__esModule",{value:!0}),ha.init=ha.default=void 0;var ba=new(((ya=m({}))&&ya.__esModule?ya:{default:ya}).default),ma=ba.interactStatic;ha.default=ma;function Oa(t){return ba.init(t)}ha.init=Oa,"object"===("undefined"==typeof window?"undefined":ga(window))&&window&&Oa(window);var wa={};Object.defineProperty(wa,"__esModule",{value:!0}),wa.default=void 0;wa.default={};var _a={};Object.defineProperty(_a,"__esModule",{value:!0}),_a.default=void 0;_a.default={};var Pa={};function xa(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}Object.defineProperty(Pa,"__esModule",{value:!0}),Pa.default=void 0;Pa.default=function(v){function t(t,e){for(var n=v.range,r=v.limits,o=void 0===r?{left:-1/0,right:1/0,top:-1/0,bottom:1/0}:r,i=v.offset,a=void 0===i?{x:0,y:0}:i,u={range:n,grid:v,x:null,y:null},s=0;s<y.length;s++){var l=xa(y[s],2),c=l[0],f=l[1],p=Math.round((t-a.x)/v[c]),d=Math.round((e-a.y)/v[f]);u[c]=Math.max(o.left,Math.min(o.right,p*v[c]+a.x)),u[f]=Math.max(o.top,Math.min(o.bottom,d*v[f]+a.y))}return u}var y=[["x","y"],["left","top"],["right","bottom"],["width","height"]].filter(function(t){var e=xa(t,2),n=e[0],r=e[1];return n in v||r in v});return t.grid=v,t.coordFields=y,t};var Sa={};Object.defineProperty(Sa,"__esModule",{value:!0}),Object.defineProperty(Sa,"edgeTarget",{enumerable:!0,get:function(){return ja.default}}),Object.defineProperty(Sa,"elements",{enumerable:!0,get:function(){return Ma.default}}),Object.defineProperty(Sa,"grid",{enumerable:!0,get:function(){return ka.default}});var ja=Ea(wa),Ma=Ea(_a),ka=Ea(Pa);function Ea(t){return t&&t.__esModule?t:{default:t}}var Ta={};function Da(t){return(Da="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ta,"__esModule",{value:!0}),Ta.default=void 0;var Ia,za=(Ia=ct)&&Ia.__esModule?Ia:{default:Ia},Aa=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Da(t)&&"function"!=typeof t)return{default:t};var e=Ca();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Sa);function Ca(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ca=function(){return t},t}var Wa={id:"snappers",install:function(t){var e=t.interactStatic;e.snappers=(0,za.default)(e.snappers||{},Aa),e.createSnapGrid=e.snappers.grid}};Ta.default=Wa;var Ra={};Object.defineProperty(Ra,"__esModule",{value:!0}),Ra.aspectRatio=Ra.default=void 0;var Fa=Ya(ct),Xa=Ya(_i);function Ya(t){return t&&t.__esModule?t:{default:t}}function Na(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function La(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Na(Object(n),!0).forEach(function(t){Ba(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Na(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Ba(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Va={start:function(t){var e=t.state,n=t.rect,r=t.edges,o=t.pageCoords,i=e.options.ratio,a=e.options,u=a.equalDelta,s=a.modifiers;"preserve"===i&&(i=n.width/n.height),e.startCoords=(0,Fa.default)({},o),e.startRect=(0,Fa.default)({},n),e.ratio=i,e.equalDelta=u;var l=e.linkedEdges={top:r.top||r.left&&!r.bottom,left:r.left||r.top&&!r.right,bottom:r.bottom||r.right&&!r.top,right:r.right||r.bottom&&!r.left};if(e.xIsPrimaryAxis=!(!r.left&&!r.right),e.equalDelta)e.edgeSign=(l.left?1:-1)*(l.top?1:-1);else{var c=e.xIsPrimaryAxis?l.top:l.left;e.edgeSign=c?-1:1}if((0,Fa.default)(t.edges,l),s&&s.length){var f=new Xa.default(t.interaction);f.copyFrom(t.interaction.modification),f.prepareStates(s),(e.subModification=f).startAll(La({},t))}},set:function(t){var e=t.state,n=t.rect,r=t.coords,o=(0,Fa.default)({},r),i=e.equalDelta?qa:Ua;if(i(e,e.xIsPrimaryAxis,r,n),!e.subModification)return null;var a=(0,Fa.default)({},n);(0,$t.addEdges)(e.linkedEdges,a,{x:r.x-o.x,y:r.y-o.y});var u=e.subModification.setAll(La({},t,{rect:a,edges:e.linkedEdges,pageCoords:r,prevCoords:r,prevRect:a})),s=u.delta;u.changed&&(i(e,Math.abs(s.x)>Math.abs(s.y),u.coords,u.rect),(0,Fa.default)(r,u.coords));return u.eventProps},defaults:{ratio:"preserve",equalDelta:!1,modifiers:[],enabled:!1}};function qa(t,e,n){var r=t.startCoords,o=t.edgeSign;e?n.y=r.y+(n.x-r.x)*o:n.x=r.x+(n.y-r.y)*o}function Ua(t,e,n,r){var o=t.startRect,i=t.startCoords,a=t.ratio,u=t.edgeSign;if(e){var s=r.width/a;n.y=i.y+(s-o.height)*u}else{var l=r.height*a;n.x=i.x+(l-o.width)*u}}Ra.aspectRatio=Va;var Ga=(0,Ci.makeModifier)(Va,"aspectRatio");Ra.default=Ga;var Ha={};Object.defineProperty(Ha,"__esModule",{value:!0}),Ha.default=void 0;function Ka(){}Ka._defaults={};var $a=Ka;Ha.default=$a;var Za={};function Ja(t){return(Ja="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Za,"__esModule",{value:!0}),Za.getRestrictionRect=iu,Za.restrict=Za.default=void 0;var Qa,tu=(Qa=ct)&&Qa.__esModule?Qa:{default:Qa},eu=ou(w),nu=ou($t);function ru(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return ru=function(){return t},t}function ou(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ja(t)&&"function"!=typeof t)return{default:t};var e=ru();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function iu(t,e,n){return eu.func(t)?nu.resolveRectLike(t,e.interactable,e.element,[n.x,n.y,e]):nu.resolveRectLike(t,e.interactable,e.element)}var au={start:function(t){var e=t.rect,n=t.startOffset,r=t.state,o=t.interaction,i=t.pageCoords,a=r.options,u=a.elementRect,s=(0,tu.default)({left:0,top:0,right:0,bottom:0},a.offset||{});if(e&&u){var l=iu(a.restriction,o,i);if(l){var c=l.right-l.left-e.width,f=l.bottom-l.top-e.height;c<0&&(s.left+=c,s.right+=c),f<0&&(s.top+=f,s.bottom+=f)}s.left+=n.left-e.width*u.left,s.top+=n.top-e.height*u.top,s.right+=n.right-e.width*(1-u.right),s.bottom+=n.bottom-e.height*(1-u.bottom)}r.offset=s},set:function(t){var e=t.coords,n=t.interaction,r=t.state,o=r.options,i=r.offset,a=iu(o.restriction,n,e);if(a){var u=nu.xywhToTlbr(a);e.x=Math.max(Math.min(u.right-i.right,e.x),u.left+i.left),e.y=Math.max(Math.min(u.bottom-i.bottom,e.y),u.top+i.top)}},defaults:{restriction:null,elementRect:null,offset:null,endOnly:!1,enabled:!1}};Za.restrict=au;var uu=(0,Ci.makeModifier)(au,"restrict");Za.default=uu;var su={};function lu(t){return(lu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(su,"__esModule",{value:!0}),su.restrictEdges=su.default=void 0;var cu,fu=(cu=ct)&&cu.__esModule?cu:{default:cu},pu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==lu(t)&&"function"!=typeof t)return{default:t};var e=du();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($t);function du(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return du=function(){return t},t}var vu={top:1/0,left:1/0,bottom:-1/0,right:-1/0},yu={top:-1/0,left:-1/0,bottom:1/0,right:1/0};function hu(t,e){for(var n=["top","left","bottom","right"],r=0;r<n.length;r++){var o=n[r];o in t||(t[o]=e[o])}return t}var gu={noInner:vu,noOuter:yu,start:function(t){var e,n=t.interaction,r=t.startOffset,o=t.state,i=o.options;if(i){var a=(0,Za.getRestrictionRect)(i.offset,n,n.coords.start.page);e=pu.rectToXY(a)}e=e||{x:0,y:0},o.offset={top:e.y+r.top,left:e.x+r.left,bottom:e.y-r.bottom,right:e.x-r.right}},set:function(t){var e=t.coords,n=t.edges,r=t.interaction,o=t.state,i=o.offset,a=o.options;if(n){var u=(0,fu.default)({},e),s=(0,Za.getRestrictionRect)(a.inner,r,u)||{},l=(0,Za.getRestrictionRect)(a.outer,r,u)||{};hu(s,vu),hu(l,yu),n.top?e.y=Math.min(Math.max(l.top+i.top,u.y),s.top+i.top):n.bottom&&(e.y=Math.max(Math.min(l.bottom+i.bottom,u.y),s.bottom+i.bottom)),n.left?e.x=Math.min(Math.max(l.left+i.left,u.x),s.left+i.left):n.right&&(e.x=Math.max(Math.min(l.right+i.right,u.x),s.right+i.right))}},defaults:{inner:null,outer:null,offset:null,endOnly:!1,enabled:!1}};su.restrictEdges=gu;var bu=(0,Ci.makeModifier)(gu,"restrictEdges");su.default=bu;var mu,Ou={};Object.defineProperty(Ou,"__esModule",{value:!0}),Ou.restrictRect=Ou.default=void 0;var wu=(0,((mu=ct)&&mu.__esModule?mu:{default:mu}).default)({get elementRect(){return{top:0,left:0,bottom:1,right:1}},set elementRect(t){}},Za.restrict.defaults),_u={start:Za.restrict.start,set:Za.restrict.set,defaults:wu};Ou.restrictRect=_u;var Pu=(0,Ci.makeModifier)(_u,"restrictRect");Ou.default=Pu;var xu={};function Su(t){return(Su="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(xu,"__esModule",{value:!0}),xu.restrictSize=xu.default=void 0;var ju,Mu=(ju=ct)&&ju.__esModule?ju:{default:ju},ku=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Su(t)&&"function"!=typeof t)return{default:t};var e=Eu();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}($t);function Eu(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Eu=function(){return t},t}var Tu={width:-1/0,height:-1/0},Du={width:1/0,height:1/0};var Iu={start:function(t){return su.restrictEdges.start(t)},set:function(t){var e=t.interaction,n=t.state,r=t.rect,o=t.edges,i=n.options;if(o){var a=ku.tlbrToXywh((0,Za.getRestrictionRect)(i.min,e,t.coords))||Tu,u=ku.tlbrToXywh((0,Za.getRestrictionRect)(i.max,e,t.coords))||Du;n.options={endOnly:i.endOnly,inner:(0,Mu.default)({},su.restrictEdges.noInner),outer:(0,Mu.default)({},su.restrictEdges.noOuter)},o.top?(n.options.inner.top=r.bottom-a.height,n.options.outer.top=r.bottom-u.height):o.bottom&&(n.options.inner.bottom=r.top+a.height,n.options.outer.bottom=r.top+u.height),o.left?(n.options.inner.left=r.right-a.width,n.options.outer.left=r.right-u.width):o.right&&(n.options.inner.right=r.left+a.width,n.options.outer.right=r.left+u.width),su.restrictEdges.set(t),n.options=i}},defaults:{min:null,max:null,endOnly:!1,enabled:!1}};xu.restrictSize=Iu;var zu=(0,Ci.makeModifier)(Iu,"restrictSize");xu.default=zu;var Au={};Object.defineProperty(Au,"__esModule",{value:!0}),Au.default=void 0;function Cu(){}Cu._defaults={};var Wu=Cu;Au.default=Wu;var Ru={};function Fu(t){return(Fu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Ru,"__esModule",{value:!0}),Ru.snap=Ru.default=void 0;var Xu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Fu(t)&&"function"!=typeof t)return{default:t};var e=Yu();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le);function Yu(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Yu=function(){return t},t}var Nu={start:function(t){var e,n,r,o=t.interaction,i=t.interactable,a=t.element,u=t.rect,s=t.state,l=t.startOffset,c=s.options,f=c.offsetWithOrigin?(n=(e=t).interaction.element,Xu.rect.rectToXY(Xu.rect.resolveRectLike(e.state.options.origin,null,null,[n]))||Xu.getOriginXY(e.interactable,n,e.interaction.prepared.name)):{x:0,y:0};if("startCoords"===c.offset)r={x:o.coords.start.page.x,y:o.coords.start.page.y};else{var p=Xu.rect.resolveRectLike(c.offset,i,a,[o]);(r=Xu.rect.rectToXY(p)||{x:0,y:0}).x+=f.x,r.y+=f.y}var d=c.relativePoints;s.offsets=u&&d&&d.length?d.map(function(t,e){return{index:e,relativePoint:t,x:l.left-u.width*t.x+r.x,y:l.top-u.height*t.y+r.y}}):[Xu.extend({index:0,relativePoint:null},r)]},set:function(t){var e=t.interaction,n=t.coords,r=t.state,o=r.options,i=r.offsets,a=Xu.getOriginXY(e.interactable,e.element,e.prepared.name),u=Xu.extend({},n),s=[];o.offsetWithOrigin||(u.x-=a.x,u.y-=a.y);for(var l=0;l<i.length;l++)for(var c=i[l],f=u.x-c.x,p=u.y-c.y,d=0,v=o.targets.length;d<v;d++){var y=o.targets[d],h=void 0;(h=Xu.is.func(y)?y(f,p,e,c,d):y)&&s.push({x:(Xu.is.number(h.x)?h.x:f)+c.x,y:(Xu.is.number(h.y)?h.y:p)+c.y,range:Xu.is.number(h.range)?h.range:o.range,source:y,index:d,offset:c})}for(var g={target:null,inRange:!1,distance:0,range:0,delta:{x:0,y:0}},b=0;b<s.length;b++){var m=s[b],O=m.range,w=m.x-u.x,_=m.y-u.y,P=Xu.hypot(w,_),x=P<=O;O===1/0&&g.inRange&&g.range!==1/0&&(x=!1),g.target&&!(x?g.inRange&&O!==1/0?P/O<g.distance/g.range:O===1/0&&g.range!==1/0||P<g.distance:!g.inRange&&P<g.distance)||(g.target=m,g.distance=P,g.range=O,g.inRange=x,g.delta.x=w,g.delta.y=_)}return g.inRange&&(n.x=g.target.x,n.y=g.target.y),r.closest=g},defaults:{range:1/0,targets:null,offset:null,offsetWithOrigin:!0,origin:null,relativePoints:null,endOnly:!1,enabled:!1}};Ru.snap=Nu;var Lu=(0,Ci.makeModifier)(Nu,"snap");Ru.default=Lu;var Bu={};function Vu(t){return(Vu="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Bu,"__esModule",{value:!0}),Bu.snapSize=Bu.default=void 0;var qu,Uu=(qu=ct)&&qu.__esModule?qu:{default:qu},Gu=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Vu(t)&&"function"!=typeof t)return{default:t};var e=Hu();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(w);function Hu(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Hu=function(){return t},t}function Ku(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==u.return||u.return()}finally{if(o)throw i}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var $u={start:function(t){var e=t.state,n=t.edges,r=e.options;if(!n)return null;t.state={options:{targets:null,relativePoints:[{x:n.left?0:1,y:n.top?0:1}],offset:r.offset||"self",origin:{x:0,y:0},range:r.range}},e.targetFields=e.targetFields||[["width","height"],["x","y"]],Ru.snap.start(t),e.offsets=t.state.offsets,t.state=e},set:function(t){var e=t.interaction,n=t.state,r=t.coords,o=n.options,i=n.offsets,a={x:r.x-i[0].x,y:r.y-i[0].y};n.options=(0,Uu.default)({},o),n.options.targets=[];for(var u=0;u<(o.targets||[]).length;u++){var s=(o.targets||[])[u],l=void 0;if(l=Gu.func(s)?s(a.x,a.y,e):s){for(var c=0;c<n.targetFields.length;c++){var f=Ku(n.targetFields[c],2),p=f[0],d=f[1];if(p in l||d in l){l.x=l[p],l.y=l[d];break}}n.options.targets.push(l)}}var v=Ru.snap.set(t);return n.options=o,v},defaults:{range:1/0,targets:null,offset:null,endOnly:!1,enabled:!1}};Bu.snapSize=$u;var Zu=(0,Ci.makeModifier)($u,"snapSize");Bu.default=Zu;var Ju={};Object.defineProperty(Ju,"__esModule",{value:!0}),Ju.snapEdges=Ju.default=void 0;var Qu=es(V),ts=es(ct);function es(t){return t&&t.__esModule?t:{default:t}}var ns={start:function(t){var e=t.edges;return e?(t.state.targetFields=t.state.targetFields||[[e.left?"left":"right",e.top?"top":"bottom"]],Bu.snapSize.start(t)):null},set:Bu.snapSize.set,defaults:(0,ts.default)((0,Qu.default)(Bu.snapSize.defaults),{targets:null,range:null,offset:{x:0,y:0}})};Ju.snapEdges=ns;var rs=(0,Ci.makeModifier)(ns,"snapEdges");Ju.default=rs;var os={};Object.defineProperty(os,"__esModule",{value:!0}),os.default=void 0;function is(){}is._defaults={};var as=is;os.default=as;var us={};Object.defineProperty(us,"__esModule",{value:!0}),us.default=void 0;function ss(){}ss._defaults={};var ls=ss;us.default=ls;var cs={};Object.defineProperty(cs,"__esModule",{value:!0}),cs.default=void 0;var fs=Ps(Ra),ps=Ps(Ha),ds=Ps(su),vs=Ps(Za),ys=Ps(Ou),hs=Ps(xu),gs=Ps(Au),bs=Ps(Ju),ms=Ps(Ru),Os=Ps(Bu),ws=Ps(os),_s=Ps(us);function Ps(t){return t&&t.__esModule?t:{default:t}}var xs={aspectRatio:fs.default,restrictEdges:ds.default,restrict:vs.default,restrictRect:ys.default,restrictSize:hs.default,snapEdges:bs.default,snap:ms.default,snapSize:Os.default,spring:ws.default,avoid:ps.default,transform:_s.default,rubberband:gs.default};cs.default=xs;var Ss={};Object.defineProperty(Ss,"__esModule",{value:!0}),Ss.default=void 0;var js=Es(Ta),Ms=Es(cs),ks=Es(Ci);function Es(t){return t&&t.__esModule?t:{default:t}}var Ts={id:"modifiers",install:function(t){var e=t.interactStatic;for(var n in t.usePlugin(ks.default),t.usePlugin(js.default),e.modifiers=Ms.default,Ms.default){var r=Ms.default[n],o=r._defaults,i=r._methods;o._methods=i,t.defaults.perAction[n]=o}}};Ss.default=Ts;var Ds={};Object.defineProperty(Ds,"__esModule",{value:!0}),Ds.default=void 0;Ds.default={};var Is={};Object.defineProperty(Is,"__esModule",{value:!0}),Is.PointerEvent=Is.default=void 0;var zs,As=(zs=Me)&&zs.__esModule?zs:{default:zs},Cs=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Rs(t)&&"function"!=typeof t)return{default:t};var e=Ws();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(zt);function Ws(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ws=function(){return t},t}function Rs(t){return(Rs="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Fs(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function Xs(t){return(Xs=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Ys(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ns(t,e){return(Ns=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function Ls(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var Bs=function(){function f(t,e,n,r,o,i){var a,u,s;if(!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,f),u=this,a=!(s=Xs(f).call(this,o))||"object"!==Rs(s)&&"function"!=typeof s?Ys(u):s,Ls(Ys(a),"type",void 0),Ls(Ys(a),"originalEvent",void 0),Ls(Ys(a),"pointerId",void 0),Ls(Ys(a),"pointerType",void 0),Ls(Ys(a),"double",void 0),Ls(Ys(a),"pageX",void 0),Ls(Ys(a),"pageY",void 0),Ls(Ys(a),"clientX",void 0),Ls(Ys(a),"clientY",void 0),Ls(Ys(a),"dt",void 0),Ls(Ys(a),"eventable",void 0),Cs.pointerExtend(Ys(a),n),n!==e&&Cs.pointerExtend(Ys(a),e),a.timeStamp=i,a.originalEvent=n,a.type=t,a.pointerId=Cs.getPointerId(e),a.pointerType=Cs.getPointerType(e),a.target=r,a.currentTarget=null,"tap"===t){var l=o.getPointerIndex(e);a.dt=a.timeStamp-o.pointers[l].downTime;var c=a.timeStamp-o.tapTime;a.double=!!(o.prevTap&&"doubletap"!==o.prevTap.type&&o.prevTap.target===a.target&&c<500)}else"doubletap"===t&&(a.dt=e.timeStamp-o.tapTime);return a}var t,e,n;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Ns(t,e)}(f,As["default"]),t=f,(e=[{key:"_subtractOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX-=e,this.pageY-=n,this.clientX-=e,this.clientY-=n,this}},{key:"_addOrigin",value:function(t){var e=t.x,n=t.y;return this.pageX+=e,this.pageY+=n,this.clientX+=e,this.clientY+=n,this}},{key:"preventDefault",value:function(){this.originalEvent.preventDefault()}}])&&Fs(t.prototype,e),n&&Fs(t,n),f}();Is.PointerEvent=Is.default=Bs;var Vs={};function qs(t){return(qs="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(Vs,"__esModule",{value:!0}),Vs.default=void 0;Ks(En),Ks(m({}));var Us=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==qs(t)&&"function"!=typeof t)return{default:t};var e=Hs();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(le),Gs=Ks(Is);function Hs(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Hs=function(){return t},t}function Ks(t){return t&&t.__esModule?t:{default:t}}var $s={id:"pointer-events/base",install:function(t){t.pointerEvents=$s,t.defaults.actions.pointerEvents=$s.defaults,Us.extend(t.actions.phaselessTypes,$s.types)},listeners:{"interactions:new":function(t){var e=t.interaction;e.prevTap=null,e.tapTime=0},"interactions:update-pointer":function(t){var e=t.down,n=t.pointerInfo;if(!e&&n.hold)return;n.hold={duration:1/0,timeout:null}},"interactions:move":function(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.duplicate,u=n.getPointerIndex(r);a||n.pointerIsDown&&!n.pointerWasMoved||(n.pointerIsDown&&clearTimeout(n.pointers[u].hold.timeout),Zs({interaction:n,pointer:r,event:o,eventTarget:i,type:"move"},e))},"interactions:down":function(t,e){!function(t,e){for(var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.pointerIndex,u=n.pointers[a].hold,s=Us.dom.getPath(i),l={interaction:n,pointer:r,event:o,eventTarget:i,type:"hold",targets:[],path:s,node:null},c=0;c<s.length;c++){var f=s[c];l.node=f,e.fire("pointerEvents:collect-targets",l)}if(!l.targets.length)return;for(var p=1/0,d=0;d<l.targets.length;d++){var v=l.targets[d].eventable.options.holdDuration;v<p&&(p=v)}u.duration=p,u.timeout=setTimeout(function(){Zs({interaction:n,eventTarget:i,pointer:r,event:o,type:"hold"},e)},p)}(t,e),Zs(t,e)},"interactions:up":function(t,e){var n,r,o,i,a,u;Qs(t),Zs(t,e),r=e,o=(n=t).interaction,i=n.pointer,a=n.event,u=n.eventTarget,o.pointerWasMoved||Zs({interaction:o,eventTarget:u,pointer:i,event:a,type:"tap"},r)},"interactions:cancel":function(t,e){Qs(t),Zs(t,e)}},PointerEvent:Gs.default,fire:Zs,collectEventTargets:Js,defaults:{holdDuration:600,ignoreFrom:null,allowFrom:null,origin:{x:0,y:0}},types:{down:!0,move:!0,up:!0,cancel:!0,tap:!0,doubletap:!0,hold:!0}};function Zs(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,u=t.targets,s=void 0===u?Js(t,e):u,l=new Gs.default(a,r,o,i,n,e.now());e.fire("pointerEvents:new",{pointerEvent:l});for(var c={interaction:n,pointer:r,event:o,eventTarget:i,targets:s,type:a,pointerEvent:l},f=0;f<s.length;f++){var p=s[f];for(var d in p.props||{})l[d]=p.props[d];var v=Us.getOriginXY(p.eventable,p.node);if(l._subtractOrigin(v),l.eventable=p.eventable,l.currentTarget=p.node,p.eventable.fire(l),l._addOrigin(v),l.immediatePropagationStopped||l.propagationStopped&&f+1<s.length&&s[f+1].node!==l.currentTarget)break}if(e.fire("pointerEvents:fired",c),"tap"===a){var y=l.double?Zs({interaction:n,pointer:r,event:o,eventTarget:i,type:"doubletap"},e):l;n.prevTap=y,n.tapTime=y.timeStamp}return l}function Js(t,e){var n=t.interaction,r=t.pointer,o=t.event,i=t.eventTarget,a=t.type,u=n.getPointerIndex(r),s=n.pointers[u];if("tap"===a&&(n.pointerWasMoved||!s||s.downTarget!==i))return[];for(var l=Us.dom.getPath(i),c={interaction:n,pointer:r,event:o,eventTarget:i,type:a,path:l,targets:[],node:null},f=0;f<l.length;f++){var p=l[f];c.node=p,e.fire("pointerEvents:collect-targets",c)}return"hold"===a&&(c.targets=c.targets.filter(function(t){return t.eventable.options.holdDuration===n.pointers[u].hold.duration})),c.targets}function Qs(t){var e=t.interaction,n=t.pointerIndex;e.pointers[n].hold&&clearTimeout(e.pointers[n].hold.timeout)}var tl=$s;Vs.default=tl;var el={};Object.defineProperty(el,"__esModule",{value:!0}),el.default=void 0;rl(Is);var nl=rl(Vs);function rl(t){return t&&t.__esModule?t:{default:t}}function ol(t){var e=t.interaction;e.holdIntervalHandle&&(clearInterval(e.holdIntervalHandle),e.holdIntervalHandle=null)}var il={id:"pointer-events/holdRepeat",install:function(t){t.usePlugin(nl.default);var e=t.pointerEvents;e.defaults.holdRepeatInterval=0,e.types.holdrepeat=t.actions.phaselessTypes.holdrepeat=!0},listeners:["move","up","cancel","endall"].reduce(function(t,e){return t["pointerEvents:".concat(e)]=ol,t},{"pointerEvents:new":function(t){var e=t.pointerEvent;"hold"===e.type&&(e.count=(e.count||0)+1)},"pointerEvents:fired":function(t,e){var n=t.interaction,r=t.pointerEvent,o=t.eventTarget,i=t.targets;if("hold"===r.type&&i.length){var a=i[0].eventable.options.holdRepeatInterval;a<=0||(n.holdIntervalHandle=setTimeout(function(){e.pointerEvents.fire({interaction:n,eventTarget:o,type:"hold",pointer:r,event:r},e)},a))}}})};el.default=il;var al={};Object.defineProperty(al,"__esModule",{value:!0}),al.default=void 0;var ul,sl=(ul=ct)&&ul.__esModule?ul:{default:ul};function ll(t){return(0,sl.default)(this.events.options,t),this}var cl={id:"pointer-events/interactableTargets",install:function(t){var e=t.Interactable;e.prototype.pointerEvents=ll;var r=e.prototype._backCompatOption;e.prototype._backCompatOption=function(t,e){var n=r.call(this,t,e);return n===this&&(this.events.options[t]=e),n}},listeners:{"pointerEvents:collect-targets":function(t,e){var r=t.targets,o=t.node,i=t.type,a=t.eventTarget;e.interactables.forEachMatch(o,function(t){var e=t.events,n=e.options;e.types[i]&&e.types[i].length&&t.testIgnoreAllow(n,o,a)&&r.push({node:o,eventable:e,props:{interactable:t}})})},"interactable:new":function(t){var e=t.interactable;e.events.getRect=function(t){return e.getRect(t)}},"interactable:set":function(t,e){var n=t.interactable,r=t.options;(0,sl.default)(n.events.options,e.pointerEvents.defaults),(0,sl.default)(n.events.options,r.pointerEvents||{})}}};al.default=cl;var fl={};function pl(t){return(pl="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(fl,"__esModule",{value:!0}),Object.defineProperty(fl,"holdRepeat",{enumerable:!0,get:function(){return vl.default}}),Object.defineProperty(fl,"interactableTargets",{enumerable:!0,get:function(){return yl.default}}),fl.pointerEvents=fl.default=void 0;var dl=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==pl(t)&&"function"!=typeof t)return{default:t};var e=gl();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}n.default=t,e&&e.set(t,n);return n}(Vs);fl.pointerEvents=dl;var vl=hl(el),yl=hl(al);function hl(t){return t&&t.__esModule?t:{default:t}}function gl(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return gl=function(){return t},t}var bl={id:"pointer-events",install:function(t){t.usePlugin(dl),t.usePlugin(vl.default),t.usePlugin(yl.default)}};fl.default=bl;var ml={};Object.defineProperty(ml,"__esModule",{value:!0}),ml.install=wl,ml.default=void 0;var Ol;(Ol=k({}))&&Ol.__esModule;function wl(e){var t=e.Interactable;e.actions.phases.reflow=!0,t.prototype.reflow=function(t){return function(u,s,l){function t(){var e=c[d],t=u.getRect(e);if(!t)return"break";var n=le.arr.find(l.interactions.list,function(t){return t.interacting()&&t.interactable===u&&t.element===e&&t.prepared.name===s.name}),r=void 0;if(n)n.move(),p&&(r=n._reflowPromise||new f(function(t){n._reflowResolve=t}));else{var o=le.rect.tlbrToXywh(t),i={page:{x:o.x,y:o.y},client:{x:o.x,y:o.y},timeStamp:l.now()},a=le.pointer.coordsToEvent(i);r=function(t,e,n,r,o){var i=t.interactions.new({pointerType:"reflow"}),a={interaction:i,event:o,pointer:o,eventTarget:n,phase:"reflow"};i.interactable=e,i.element=n,i.prepared=(0,le.extend)({},r),i.prevEvent=o,i.updatePointer(o,o,n,!0),i._doPhase(a);var u=le.win.window.Promise?new le.win.window.Promise(function(t){i._reflowResolve=t}):null;i._reflowPromise=u,i.start(r,e,n),i._interacting?(i.move(a),i.end(o)):i.stop();return i.removePointer(o,o),i.pointerIsDown=!1,u}(l,u,e,s,a)}p&&p.push(r)}for(var c=le.is.string(u.target)?le.arr.from(u._context.querySelectorAll(u.target)):[u.target],f=le.win.window.Promise,p=f?[]:null,d=0;d<c.length;d++){if("break"===t())break}return p&&f.all(p).then(function(){return u})}(this,t,e)}}var _l={id:"reflow",install:wl,listeners:{"interactions:stop":function(t,e){var n=t.interaction;"reflow"===n.pointerType&&(n._reflowResolve&&n._reflowResolve(),le.arr.remove(e.interactions.list,n))}}};ml.default=_l;var Pl={};Object.defineProperty(Pl,"__esModule",{value:!0}),Pl.default=void 0;Pl.default={};var xl={};Object.defineProperty(xl,"__esModule",{value:!0}),xl.exchange=void 0;xl.exchange={};var Sl={};Object.defineProperty(Sl,"__esModule",{value:!0}),Sl.default=void 0;Sl.default={};var jl={};function Ml(t){return(Ml="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}Object.defineProperty(jl,"__esModule",{value:!0}),jl.default=void 0;var kl=Hl(Qr),El=Hl(ao),Tl=Hl(uo),Dl=Hl(ti),Il=Hl(ai),zl=Hl(ui),Al=Hl(Un),Cl=(Hl(si),Gl(wi)),Wl=Hl($i),Rl=Hl(ha),Fl=Hl(Ss),Xl=Hl(Ds),Yl=Hl(Yi),Nl=Hl(fl),Ll=Hl(ml),Bl=Gl(Pl),Vl=Gl(zt),ql=Gl(Sl);function Ul(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return Ul=function(){return t},t}function Gl(t){if(t&&t.__esModule)return t;if(null===t||"object"!==Ml(t)&&"function"!=typeof t)return{default:t};var e=Ul();if(e&&e.has(t))return e.get(t);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in t)if(Object.prototype.hasOwnProperty.call(t,o)){var i=r?Object.getOwnPropertyDescriptor(t,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=t[o]}return n.default=t,e&&e.set(t,n),n}function Hl(t){return t&&t.__esModule?t:{default:t}}Rl.default.use(Xl.default),Rl.default.use(Al.default),Rl.default.use(Yl.default),Rl.default.use(Il.default),Rl.default.use(El.default),Rl.default.use(Nl.default),Rl.default.use(Wl.default),Rl.default.use(Fl.default),Rl.default.use(Dl.default),Rl.default.use(kl.default),Rl.default.use(Tl.default),Rl.default.use(Ll.default),Rl.default.feedback=Cl,Rl.default.use(zl.default),Rl.default.vue={components:ql},Rl.default.__utils={exchange:xl.exchange,displace:Bl,pointer:Vl};var Kl=Rl.default;jl.default=Kl;var $l={exports:{}};Object.defineProperty($l.exports,"__esModule",{value:!0}),$l.exports.default=void 0;var Zl,Jl=(Zl=jl)&&Zl.__esModule?Zl:{default:Zl};function Ql(t){return(Ql="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}if("object"===Ql($l)&&$l)try{$l.exports=Jl.default}catch(t){}Jl.default.default=Jl.default;var tc=Jl.default;return $l.exports.default=tc,$l=$l.exports});



}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(definition);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = definition();
    } else {
        root.log = definition();
    }
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
}));

},{}],4:[function(require,module,exports){
/*
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/

(function () { 'use strict';

// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance between 2 points
function getSqDist(p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return dx * dx + dy * dy;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {

    var x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {

    var prevPoint = points[0],
        newPoints = [prevPoint],
        point;

    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDist(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point) newPoints.push(point);

    return newPoints;
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
    var maxSqDist = sqTolerance,
        index;

    for (var i = first + 1; i < last; i++) {
        var sqDist = getSqSegDist(points[i], points[first], points[last]);

        if (sqDist > maxSqDist) {
            index = i;
            maxSqDist = sqDist;
        }
    }

    if (maxSqDist > sqTolerance) {
        if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, sqTolerance) {
    var last = points.length - 1;

    var simplified = [points[0]];
    simplifyDPStep(points, 0, last, sqTolerance, simplified);
    simplified.push(points[last]);

    return simplified;
}

// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {

    if (points.length <= 2) return points;

    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}

// export as AMD module / Node module / browser or worker variable
if (typeof define === 'function' && define.amd) define(function() { return simplify; });
else if (typeof module !== 'undefined') {
    module.exports = simplify;
    module.exports.default = simplify;
} else if (typeof self !== 'undefined') self.simplify = simplify;
else window.simplify = simplify;

})();

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dat = require("dat.gui");
var tensor_field_interface_1 = require("./ts/interface/tensor_field_interface");
var vector_1 = require("./ts/vector");
var canvas_wrapper_1 = require("./ts/interface/canvas_wrapper");
var util_1 = require("./ts/util");
var drag_controller_1 = require("./ts/interface/drag_controller");
var domain_controller_1 = require("./ts/interface/domain_controller");
var integrator_1 = require("./ts/impl/integrator");
var streamlines_1 = require("./ts/impl/streamlines");
var size = 800;
var dc = domain_controller_1.default.getInstance(vector_1.default.fromScalar(size));
var c = document.getElementById(util_1.default.CANVAS_ID);
var canvas = new canvas_wrapper_1.default(c, size, size);
var gui = new dat.GUI();
var tensorFolder = gui.addFolder('Tensor Field');
var field = new tensor_field_interface_1.default(tensorFolder, new drag_controller_1.default(gui));
field.addGrid(new vector_1.default(0, 0), size, 20, Math.PI / 4);
field.addGrid(new vector_1.default(size, size), size, 20, 0);
field.addRadial(new vector_1.default(size / 2, size / 2), 300, 20);
var minorParams = {
    dsep: 20,
    dtest: 10,
    dstep: 1,
    dlookahead: 100,
    dcirclejoin: 5,
    joinangle: 0.1,
    pathIterations: 1000,
    seedTries: 300,
    simplifyTolerance: 0.5,
};
var majorParams = {
    dsep: 100,
    dtest: 30,
    dstep: 1,
    dlookahead: 200,
    dcirclejoin: 5,
    joinangle: 0.1,
    pathIterations: 1000,
    seedTries: 300,
    simplifyTolerance: 0.5,
};
gui.add(minorParams, 'dstep');
gui.add(minorParams, 'dsep');
gui.add(minorParams, 'dtest');
gui.add(majorParams, 'dstep');
gui.add(majorParams, 'dsep');
gui.add(majorParams, 'dtest');
gui.add(dc, 'zoom', 0, 5);
var integrator = new integrator_1.RK4Integrator(field, minorParams);
var major = new streamlines_1.default(integrator, dc.origin, dc.worldDimensions, majorParams);
var minor = new streamlines_1.default(integrator, dc.origin, dc.worldDimensions, minorParams);
function setStreamline() {
    major = new streamlines_1.default(integrator, dc.origin, dc.worldDimensions, majorParams);
    minor = new streamlines_1.default(integrator, dc.origin, dc.worldDimensions, minorParams);
    major.createAllStreamlines();
    major.joinDanglingStreamlines();
    minor.addExistingStreamlines(major);
    minor.createAllStreamlines();
}
function joinMajor() {
    major.joinDanglingStreamlines();
}
function joinMinor() {
    minor.joinDanglingStreamlines();
}
function getMajorStreamlines() {
    return major.allStreamlinesSimple;
}
function getMinorStreamlines() {
    return minor.allStreamlinesSimple;
}
var tmpObj = {
    setStreamline: setStreamline,
    joinMajor: joinMajor,
    joinMinor: joinMinor,
};
gui.add(tmpObj, 'setStreamline');
gui.add(tmpObj, 'joinMajor');
gui.add(tmpObj, 'joinMinor');
function getTensorLine(point, v, length) {
    var transformed = dc.worldToScreen(point.clone());
    var diff = v.multiplyScalar(length / 2);
    var start = transformed.clone().sub(diff);
    var end = transformed.clone().add(diff);
    return [start, end];
}
function draw() {
    var startTime = performance.now();
    var samples = 60;
    var length = 12;
    canvas.setStrokeStyle('white');
    canvas.setFillStyle('black');
    canvas.setLineWidth(1);
    canvas.clearCanvas();
    var step = size / samples;
    var xStart = step - (dc.origin.x % step);
    var yStart = step - (dc.origin.y % step);
    for (var x = xStart - step; x <= size + step; x += size / samples) {
        for (var y = yStart - step; y <= size + step; y += size / samples) {
            var point = dc.screenToWorld(new vector_1.default(x, y));
            var t = field.samplePoint(point);
            canvas.drawPolyline(getTensorLine(point, t.getMajor(), length));
            canvas.drawPolyline(getTensorLine(point, t.getMinor(), length));
        }
    }
    canvas.setFillStyle('red');
    field.getCentrePoints().forEach(function (v) { return canvas.drawSquare(dc.worldToScreen(v), 7); });
    if (getMinorStreamlines().length > 0) {
        canvas.setFillStyle('#ECE5DB');
        canvas.clearCanvas();
        canvas.setStrokeStyle('#020202');
        canvas.setLineWidth(3);
        getMinorStreamlines().forEach(function (s) {
            canvas.drawPolyline(s.map(function (v) { return dc.worldToScreen(v.clone()); }));
        });
        canvas.setStrokeStyle('#F8F8F8');
        canvas.setLineWidth(2);
        getMinorStreamlines().forEach(function (s) {
            canvas.drawPolyline(s.map(function (v) { return dc.worldToScreen(v.clone()); }));
        });
    }
    if (getMajorStreamlines().length > 0) {
        // this.COL_MAJ_IN = "#FAFA7A";
        // this.COL_MAJ_OUT = "#282828";
        canvas.setStrokeStyle('#282828');
        canvas.setLineWidth(5);
        getMajorStreamlines().forEach(function (s) {
            canvas.drawPolyline(s.map(function (v) { return dc.worldToScreen(v.clone()); }));
        });
        canvas.setStrokeStyle('#FAFA7A');
        canvas.setLineWidth(4);
        getMajorStreamlines().forEach(function (s) {
            canvas.drawPolyline(s.map(function (v) { return dc.worldToScreen(v.clone()); }));
        });
    }
    // Updates at 30fps
    while (performance.now() - startTime < 1000 / 30) {
        major.update();
        minor.update();
    }
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

},{"./ts/impl/integrator":9,"./ts/impl/streamlines":10,"./ts/interface/canvas_wrapper":13,"./ts/interface/domain_controller":14,"./ts/interface/drag_controller":15,"./ts/interface/tensor_field_interface":16,"./ts/util":17,"./ts/vector":18,"dat.gui":1}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.zeroVector = function () {
        return new Vector(0, 0);
    };
    Vector.fromScalar = function (s) {
        return new Vector(s, s);
    };
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    /**
     * Angle in radians to positive x-axis between -pi and pi
     */
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.copy = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    Vector.prototype.distanceTo = function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    };
    Vector.prototype.distanceToSquared = function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        return dx * dx + dy * dy;
    };
    Vector.prototype.divide = function (v) {
        if (v.x === 0 || v.y === 0) {
            log.warn("Division by zero");
            return this;
        }
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    Vector.prototype.divideScalar = function (s) {
        if (s === 0) {
            log.warn("Division by zero");
            return this;
        }
        return this.multiplyScalar(1 / s);
    };
    Vector.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y));
    };
    Vector.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
    };
    Vector.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector.prototype.mulitply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    Vector.prototype.multiplyScalar = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    Vector.prototype.negate = function () {
        return this.multiplyScalar(-1);
    };
    Vector.prototype.normalize = function () {
        var l = this.length();
        if (l === 0) {
            log.warn("Zero Vector");
            return this;
        }
        return this.divideScalar(this.length());
    };
    /**
     * Angle in radians
     */
    Vector.prototype.rotateAround = function (center, angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var x = this.x - center.x;
        var y = this.y - center.y;
        this.x = x * cos - y * sin + center.x;
        this.y = x * sin + y * cos + center.y;
        return this;
    };
    Vector.prototype.set = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector.prototype.setLength = function (length) {
        return this.normalize().multiplyScalar(length);
    };
    Vector.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    return Vector;
}());
exports.default = Vector;

},{"loglevel":3}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_1 = require("./tensor");
var BasisField = /** @class */ (function () {
    function BasisField(centre, _size, _decay) {
        this._size = _size;
        this._decay = _decay;
        this._centre = centre.clone();
    }
    Object.defineProperty(BasisField.prototype, "centre", {
        get: function () {
            return this._centre.clone();
        },
        set: function (centre) {
            this._centre.copy(centre);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasisField.prototype, "decay", {
        set: function (decay) {
            this._decay = decay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasisField.prototype, "size", {
        set: function (size) {
            this._size = size;
        },
        enumerable: true,
        configurable: true
    });
    BasisField.prototype.dragMoveListener = function (delta) {
        // Delta assumed to be in world space (only relevant when zoomed)
        this._centre.add(delta);
    };
    BasisField.prototype.getWeightedTensor = function (point) {
        return this.getTensor(point).scale(this.getTensorWeight(point));
    };
    /**
     * Creates a folder and adds it to the GUI to control params
     */
    BasisField.prototype.setGui = function (gui) {
        gui.add(this._centre, 'x');
        gui.add(this._centre, 'y');
        gui.add(this, '_size');
        gui.add(this, '_decay', 0, 50);
    };
    /**
     * Interpolates between (0 and 1)^decay
     */
    BasisField.prototype.getTensorWeight = function (point) {
        var normDistanceToCentre = point.clone().sub(this._centre).length() / this._size;
        // Stop (** 0) turning weight into 1, filling screen even when outside 'size'
        if (this._decay === 0 && normDistanceToCentre >= 1) {
            return 0;
        }
        return Math.pow(Math.max(0, (1 - normDistanceToCentre)), this._decay);
    };
    BasisField.folderNameIndex = 0;
    return BasisField;
}());
exports.BasisField = BasisField;
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid(centre, size, decay, _theta) {
        var _this = _super.call(this, centre, size, decay) || this;
        _this._theta = _theta;
        _this.FOLDER_NAME = "Grid " + Grid.folderNameIndex++;
        return _this;
    }
    Object.defineProperty(Grid.prototype, "theta", {
        set: function (theta) {
            this._theta = theta;
        },
        enumerable: true,
        configurable: true
    });
    Grid.prototype.setGui = function (gui) {
        var _this = this;
        _super.prototype.setGui.call(this, gui);
        // GUI in degrees, convert to rads
        var thetaProp = { theta: this._theta * 180 / Math.PI };
        var thetaController = gui.add(thetaProp, 'theta', -90, 90);
        thetaController.onChange(function (theta) { return _this._theta = theta * (Math.PI / 180); });
    };
    Grid.prototype.getTensor = function (point) {
        var cos = Math.cos(2 * this._theta);
        var sin = Math.sin(2 * this._theta);
        return new tensor_1.default(1, [cos, sin]);
    };
    return Grid;
}(BasisField));
exports.Grid = Grid;
var Radial = /** @class */ (function (_super) {
    __extends(Radial, _super);
    function Radial(centre, size, decay) {
        var _this = _super.call(this, centre, size, decay) || this;
        _this.FOLDER_NAME = "Radial " + Radial.folderNameIndex++;
        return _this;
    }
    Radial.prototype.getTensor = function (point) {
        var t = point.clone().sub(this._centre);
        var t1 = Math.pow(t.y, 2) - Math.pow(t.x, 2);
        var t2 = -2 * t.x * t.y;
        return new tensor_1.default(1, [t1, t2]);
    };
    return Radial;
}(BasisField));
exports.Radial = Radial;

},{"./tensor":11}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var vector_1 = require("../vector");
var GridStorage = /** @class */ (function () {
    /**
     * worldDimensions assumes origin of 0,0
     * @param {number} dsep Separation distance between samples
     */
    function GridStorage(worldDimensions, origin, dsep) {
        this.worldDimensions = worldDimensions;
        this.origin = origin;
        this.dsep = dsep;
        this.dsepSq = this.dsep * this.dsep;
        this.gridDimensions = worldDimensions.clone().divideScalar(this.dsep);
        this.grid = [];
        for (var x = 0; x < this.gridDimensions.x; x++) {
            this.grid.push([]);
            for (var y = 0; y < this.gridDimensions.y; y++) {
                this.grid[x].push([]);
            }
        }
    }
    /**
     * Add all samples from another grid to this one
     */
    GridStorage.prototype.addAll = function (gridStorage) {
        var _this = this;
        gridStorage.grid.forEach(function (row) { return row.forEach(function (cell) { return cell.forEach(function (sample) {
            if (!_this.vectorOutOfBounds(sample, _this.worldDimensions)) {
                _this.addSample(sample);
            }
        }); }); });
    };
    GridStorage.prototype.addPolyline = function (line) {
        var _this = this;
        line.forEach(function (v) { return _this.addSample(v); });
    };
    /**
     * Does not enforce separation
     * Does not clone
     */
    GridStorage.prototype.addSample = function (v, coords) {
        if (!coords) {
            coords = this.getSampleCoords(v);
        }
        this.grid[coords.x][coords.y].push(v);
    };
    /**
     * Tests whether v is at least d away from samples
     * Performance very important - this is called at every integration step
     * @param dSq=this.dsepSq squared test distance
     * Could be dtest if we are integrating a streamline
     */
    GridStorage.prototype.isValidSample = function (v, dSq) {
        // Code duplication with this.getNearbyPoints but much slower when calling
        // this.getNearbyPoints due to array creation in that method
        if (dSq === void 0) { dSq = this.dsepSq; }
        var coords = this.getSampleCoords(v);
        // Check samples in 9 cells in 3x3 grid
        for (var x = -1; x <= 1; x++) {
            for (var y = -1; y <= 1; y++) {
                var cell = coords.clone().add(new vector_1.default(x, y));
                if (!this.vectorOutOfBounds(cell, this.gridDimensions)) {
                    if (!this.vectorFarFromVectors(v, this.grid[cell.x][cell.y], dSq)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    /**
     * Test whether v is at least d away from vectors
     * Performance very important - this is called at every integration step
     * @param {number}   dSq     squared test distance
     */
    GridStorage.prototype.vectorFarFromVectors = function (v, vectors, dSq) {
        for (var _i = 0, vectors_1 = vectors; _i < vectors_1.length; _i++) {
            var sample = vectors_1[_i];
            if (sample !== v) {
                var distanceSq = sample.distanceToSquared(v);
                if (distanceSq < dSq) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Returns points in cells surrounding v
     * Results include v, if it exists in the grid
     * @param {number} returns samples (kind of) closer than distance - returns all samples in
     * cells so approximation (square to approximate circle)
     */
    GridStorage.prototype.getNearbyPoints = function (v, distance) {
        var radius = Math.ceil((distance / this.dsep) - 0.5);
        var coords = this.getSampleCoords(v);
        var out = [];
        for (var x = -1 * radius; x <= 1 * radius; x++) {
            for (var y = -1 * radius; y <= 1 * radius; y++) {
                var cell = coords.clone().add(new vector_1.default(x, y));
                if (!this.vectorOutOfBounds(cell, this.gridDimensions)) {
                    this.grid[cell.x][cell.y].forEach(function (v2) {
                        out.push(v2);
                    });
                }
            }
        }
        return out;
    };
    GridStorage.prototype.worldToGrid = function (v) {
        return v.clone().sub(this.origin);
    };
    GridStorage.prototype.gridToWorld = function (v) {
        return v.clone().add(this.origin);
    };
    GridStorage.prototype.vectorOutOfBounds = function (gridV, bounds) {
        return (gridV.x < 0 || gridV.y < 0 ||
            gridV.x >= bounds.x || gridV.y >= bounds.y);
    };
    /**
     * @return {Vector}   Cell coords corresponding to vector
     * Performance important - called at every integration step
     */
    GridStorage.prototype.getSampleCoords = function (worldV) {
        var v = this.worldToGrid(worldV);
        if (this.vectorOutOfBounds(v, this.worldDimensions)) {
            log.error("Tried to access out-of-bounds sample in grid");
            return vector_1.default.zeroVector();
        }
        return new vector_1.default(Math.floor(v.x / this.dsep), Math.floor(v.y / this.dsep));
    };
    return GridStorage;
}());
exports.default = GridStorage;

},{"../vector":18,"loglevel":3}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
var FieldIntegrator = /** @class */ (function () {
    function FieldIntegrator(field) {
        this.field = field;
    }
    FieldIntegrator.prototype.sampleFieldVector = function (point, major) {
        var tensor = this.field.samplePoint(point);
        if (major)
            return tensor.getMajor();
        return tensor.getMinor();
    };
    return FieldIntegrator;
}());
exports.default = FieldIntegrator;
var EulerIntegrator = /** @class */ (function (_super) {
    __extends(EulerIntegrator, _super);
    function EulerIntegrator(field, params) {
        var _this = _super.call(this, field) || this;
        _this.params = params;
        return _this;
    }
    EulerIntegrator.prototype.integrate = function (point, major) {
        return this.sampleFieldVector(point, major).multiplyScalar(this.params.dstep);
    };
    return EulerIntegrator;
}(FieldIntegrator));
exports.EulerIntegrator = EulerIntegrator;
var RK4Integrator = /** @class */ (function (_super) {
    __extends(RK4Integrator, _super);
    function RK4Integrator(field, params) {
        var _this = _super.call(this, field) || this;
        _this.params = params;
        return _this;
    }
    RK4Integrator.prototype.integrate = function (point, major) {
        var k1 = this.sampleFieldVector(point, major);
        var k23 = this.sampleFieldVector(point.clone().add(vector_1.default.fromScalar(this.params.dstep / 2)), major);
        var k4 = this.sampleFieldVector(point.clone().add(vector_1.default.fromScalar(this.params.dstep)), major);
        return k1.add(k23.multiplyScalar(4)).add(k4).multiplyScalar(this.params.dstep / 6);
    };
    return RK4Integrator;
}(FieldIntegrator));
exports.RK4Integrator = RK4Integrator;

},{"../vector":18}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var simplify = require("simplify-js");
var vector_1 = require("../vector");
var grid_storage_1 = require("./grid_storage");
var StreamlineGenerator = /** @class */ (function () {
    /**
     * Uses world-space coordinates
     */
    function StreamlineGenerator(integrator, origin, worldDimensions, params) {
        this.integrator = integrator;
        this.origin = origin;
        this.worldDimensions = worldDimensions;
        this.params = params;
        this.SEED_AT_ENDPOINTS = false;
        this.candidateSeedsMajor = [];
        this.candidateSeedsMinor = [];
        this.streamlinesDone = true;
        this.lastStreamlineMajor = true;
        this.streamlinesMajor = [];
        this.streamlinesMinor = [];
        this.allStreamlinesSimple = []; // Reduced vertex count
        if (params.dstep > params.dsep) {
            log.error("STREAMLINE SAMPLE DISTANCE BIGGER THAN DSEP");
        }
        // Enforce test < sep
        params.dtest = Math.min(params.dtest, params.dsep);
        this.majorGrid = new grid_storage_1.default(this.worldDimensions, this.origin, params.dsep);
        this.minorGrid = new grid_storage_1.default(this.worldDimensions, this.origin, params.dsep);
        this.setParamsSq();
    }
    /**
     * Edits streamlines
     */
    StreamlineGenerator.prototype.joinDanglingStreamlines = function () {
        var _this = this;
        var streamlines = this.allStreamlines;
        if (streamlines.length === 0)
            return;
        for (var _i = 0, streamlines_1 = streamlines; _i < streamlines_1.length; _i++) {
            var streamline = streamlines_1[_i];
            // Ignore circles
            if (streamline[0].equals(streamline[streamline.length - 1])) {
                continue;
            }
            var newStart = this.getBestNextPoint(streamline[0], streamline[4], streamline);
            if (newStart !== null) {
                streamline.unshift(newStart);
            }
            var newEnd = this.getBestNextPoint(streamline[streamline.length - 1], streamline[streamline.length - 4], streamline);
            if (newEnd !== null) {
                streamline.push(newEnd);
            }
        }
        // Reset simplified streamlines
        this.allStreamlinesSimple = this.allStreamlines.map(function (s) { return _this.simplifyStreamline(s); });
    };
    /**
     * Gets next best point to join streamline
     * returns null if there are no good candidates
     */
    StreamlineGenerator.prototype.getBestNextPoint = function (point, previousPoint, streamline) {
        var nearbyPoints = this.majorGrid.getNearbyPoints(point, this.params.dlookahead)
            .concat(this.minorGrid.getNearbyPoints(point, this.params.dlookahead));
        var direction = point.clone().sub(previousPoint);
        var closestSample = null;
        var closestDistance = Infinity;
        for (var _i = 0, nearbyPoints_1 = nearbyPoints; _i < nearbyPoints_1.length; _i++) {
            var sample = nearbyPoints_1[_i];
            if (!sample.equals(point) && !sample.equals(previousPoint) && !streamline.includes(sample)) {
                var differenceVector = sample.clone().sub(point);
                // Acute angle between vectors (agnostic of CW, ACW)
                var angleBetween = Math.abs(vector_1.default.angleBetween(direction, differenceVector));
                var distanceToSample = point.distanceToSquared(sample);
                // Filter by angle
                if (angleBetween < this.params.joinangle && distanceToSample < closestDistance) {
                    closestDistance = distanceToSample;
                    closestSample = sample;
                }
            }
        }
        // TODO if trying to find intersections in the simplified graph
        // return closest.clone().add(direction length simplify tolerance));
        // to prevent ends getting pulled away from simplified lines
        return closestSample;
    };
    /**
     * Assumes s has already generated
     */
    StreamlineGenerator.prototype.addExistingStreamlines = function (s) {
        this.majorGrid.addAll(s.majorGrid);
        this.minorGrid.addAll(s.minorGrid);
    };
    Object.defineProperty(StreamlineGenerator.prototype, "allStreamlines", {
        get: function () {
            // Combine
            return this.streamlinesMajor.concat(this.streamlinesMinor);
        },
        enumerable: true,
        configurable: true
    });
    StreamlineGenerator.prototype.update = function () {
        if (!this.streamlinesDone) {
            this.lastStreamlineMajor = !this.lastStreamlineMajor;
            if (!this.createStreamline(this.lastStreamlineMajor)) {
                this.streamlinesDone = true;
            }
        }
    };
    /**
     * Streamlines created each frame (animated)
     */
    StreamlineGenerator.prototype.createAllStreamlinesDynamic = function () {
        this.streamlinesDone = false;
        // this.joinDanglingStreamlines();
    };
    /**
     * All at once - will freeze if dsep small
     */
    StreamlineGenerator.prototype.createAllStreamlines = function () {
        var major = true;
        while (this.createStreamline(major)) {
            major = !major;
        }
    };
    StreamlineGenerator.prototype.simplifyStreamline = function (streamline) {
        return simplify(streamline, this.params.simplifyTolerance).map(function (point) { return new vector_1.default(point.x, point.y); });
    };
    /**
     * Finds seed and creates a streamline from that point
     * Pushes new candidate seeds to queue
     * @return {Vector[]} returns false if seed isn't found within params.seedTries
     */
    StreamlineGenerator.prototype.createStreamline = function (major) {
        var seed = this.getSeed(major);
        if (seed === null) {
            return false;
        }
        var streamline = this.integrateStreamline(seed, major);
        if (this.validStreamline(streamline)) {
            this.grid(major).addPolyline(streamline);
            this.streamlines(major).push(streamline);
            this.allStreamlinesSimple.push(this.simplifyStreamline(streamline));
            // Add candidate seeds
            if (!streamline[0].equals(streamline[streamline.length - 1])) {
                this.candidateSeeds(!major).push(streamline[0]);
                this.candidateSeeds(!major).push(streamline[streamline.length - 1]);
            }
        }
        return true;
    };
    StreamlineGenerator.prototype.validStreamline = function (s) {
        return s.length > 5;
    };
    StreamlineGenerator.prototype.setParamsSq = function () {
        this.paramsSq = Object.assign({}, this.params);
        for (var p in this.paramsSq) {
            this.paramsSq[p] *= this.paramsSq[p];
        }
    };
    StreamlineGenerator.prototype.samplePoint = function () {
        // TODO better seeding scheme
        return new vector_1.default(Math.random() * this.worldDimensions.x, Math.random() * this.worldDimensions.y)
            .add(this.origin);
    };
    /**
     * Tries this.candidateSeeds first, then samples using this.samplePoint
     */
    StreamlineGenerator.prototype.getSeed = function (major) {
        // Candidate seeds first
        if (this.SEED_AT_ENDPOINTS && this.candidateSeeds(major).length > 0) {
            while (this.candidateSeeds(major).length > 0) {
                var seed_1 = this.candidateSeeds(major).pop();
                if (this.grid(major).isValidSample(seed_1, this.paramsSq.dsep)) {
                    return seed_1;
                }
            }
        }
        var seed = this.samplePoint();
        var i = 0;
        while (!this.grid(major).isValidSample(seed, this.paramsSq.dsep)) {
            if (i >= this.params.seedTries) {
                return null;
            }
            seed = this.samplePoint();
            i++;
        }
        return seed;
    };
    // TODO enum to remove these functions
    StreamlineGenerator.prototype.candidateSeeds = function (major) {
        return major ? this.candidateSeedsMajor : this.candidateSeedsMinor;
    };
    StreamlineGenerator.prototype.streamlines = function (major) {
        return major ? this.streamlinesMajor : this.streamlinesMinor;
    };
    StreamlineGenerator.prototype.grid = function (major) {
        return major ? this.majorGrid : this.minorGrid;
    };
    StreamlineGenerator.prototype.pointInBounds = function (v) {
        return (v.x >= this.origin.x
            && v.y >= this.origin.y
            && v.x < this.worldDimensions.x + this.origin.x
            && v.y < this.worldDimensions.y + this.origin.y);
    };
    /**
     * One step of the streamline integration process
     */
    StreamlineGenerator.prototype.streamlineIntegrationStep = function (params, major) {
        if (params.valid) {
            params.streamline.push(params.previousPoint);
            var nextDirection = this.integrator.integrate(params.previousPoint, major);
            // Make sure we travel in the same direction
            if (nextDirection.dot(params.previousDirection) < 0) {
                nextDirection.negate();
            }
            var nextPoint = params.previousPoint.clone().add(nextDirection);
            if (this.pointInBounds(nextPoint)
                && this.grid(major).isValidSample(nextPoint, this.paramsSq.dtest)) {
                params.previousPoint = nextPoint;
                params.previousDirection = nextDirection;
            }
            else {
                params.valid = false;
            }
        }
    };
    /**
     * By simultaneously integrating in both directions we reduce the impact of circles not joining
     * up as the error matches at the join
     */
    StreamlineGenerator.prototype.integrateStreamline = function (seed, major) {
        var count = 0;
        var pointsEscaped = false; // True once two integration fronts have moved dlookahead away
        var d = this.integrator.integrate(seed, major);
        var forwardParams = {
            streamline: [seed],
            previousDirection: d,
            previousPoint: seed.clone().add(d),
            valid: true,
        };
        forwardParams.valid = this.pointInBounds(forwardParams.previousPoint);
        var backwardParams = {
            streamline: [],
            previousDirection: d.clone().negate(),
            previousPoint: seed.clone().add(d.clone().negate()),
            valid: true,
        };
        backwardParams.valid = this.pointInBounds(backwardParams.previousPoint);
        while (count < this.params.pathIterations && (forwardParams.valid || backwardParams.valid)) {
            this.streamlineIntegrationStep(forwardParams, major);
            this.streamlineIntegrationStep(backwardParams, major);
            // Join up circles
            var sqDistanceBetweenPoints = forwardParams.previousPoint.distanceToSquared(backwardParams.previousPoint);
            if (!pointsEscaped && sqDistanceBetweenPoints > this.paramsSq.dcirclejoin) {
                pointsEscaped = true;
            }
            if (pointsEscaped && sqDistanceBetweenPoints <= this.paramsSq.dcirclejoin) {
                forwardParams.streamline.push(forwardParams.previousPoint);
                forwardParams.streamline.push(backwardParams.previousPoint);
                backwardParams.streamline.push(backwardParams.previousPoint);
                break;
            }
            count++;
        }
        return backwardParams.streamline.reverse().concat(forwardParams.streamline);
    };
    return StreamlineGenerator;
}());
exports.default = StreamlineGenerator;

},{"../vector":18,"./grid_storage":8,"loglevel":3,"simplify-js":4}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
var Tensor = /** @class */ (function () {
    function Tensor(r, matrix) {
        this.r = r;
        this.matrix = matrix;
        // Matrix is 2 element list
        // [ 0, 1
        //   1, -0 ]
        this.oldTheta = false;
        this._theta = this.calculateTheta();
    }
    Object.defineProperty(Tensor.prototype, "theta", {
        get: function () {
            if (this.oldTheta) {
                this._theta = this.calculateTheta();
                this.oldTheta = false;
            }
            return this._theta;
        },
        enumerable: true,
        configurable: true
    });
    Tensor.prototype.add = function (tensor) {
        var _this = this;
        this.matrix = this.matrix.map(function (v, i) { return v * _this.r + tensor.matrix[i] * tensor.r; });
        this.r = 2;
        this.oldTheta = true;
        return this;
    };
    Tensor.prototype.scale = function (s) {
        this.r *= s;
        this.oldTheta = true;
        return this;
    };
    Tensor.prototype.getMajor = function () {
        return new vector_1.default(Math.cos(this.theta), Math.sin(this.theta));
    };
    Tensor.prototype.getMinor = function () {
        var angle = this.theta + Math.PI / 2;
        return new vector_1.default(Math.cos(angle), Math.sin(angle));
    };
    Tensor.prototype.calculateTheta = function () {
        if (this.r === 0) {
            return 0;
        }
        return Math.atan2(this.matrix[1] / this.r, this.matrix[0] / this.r) / 2;
    };
    return Tensor;
}());
exports.default = Tensor;

},{"../vector":18}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_1 = require("./tensor");
var basis_field_1 = require("./basis_field");
var TensorField = /** @class */ (function () {
    function TensorField() {
        this.basisFields = [];
        this.gridNameIndex = 0;
        this.radialNameIndex = 0;
    }
    TensorField.prototype.addGrid = function (centre, size, decay, theta) {
        var grid = new basis_field_1.Grid(centre, size, decay, theta);
        this.addField(grid);
    };
    TensorField.prototype.addRadial = function (centre, size, decay) {
        var radial = new basis_field_1.Radial(centre, size, decay);
        this.addField(radial);
    };
    TensorField.prototype.addField = function (field) {
        this.basisFields.push(field);
    };
    TensorField.prototype.removeField = function (field) {
        var index = this.basisFields.indexOf(field);
        if (index > -1) {
            this.basisFields.splice(index, 1);
        }
    };
    TensorField.prototype.getCentrePoints = function () {
        return this.basisFields.map(function (field) { return field.centre; });
    };
    TensorField.prototype.samplePoint = function (point) {
        // Default field is a grid
        if (this.basisFields.length === 0) {
            return new tensor_1.default(1, [0, 0]);
        }
        var tensorAcc = new tensor_1.default(0, [0, 0]);
        this.basisFields.forEach(function (field) { return tensorAcc.add(field.getWeightedTensor(point)); });
        return tensorAcc;
    };
    return TensorField;
}());
exports.default = TensorField;

},{"./basis_field":7,"./tensor":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var CanvasWrapper = /** @class */ (function () {
    function CanvasWrapper(canvas, _width, _height) {
        this._width = _width;
        this._height = _height;
        this.ctx = canvas.getContext("2d");
        this.resizeCanvas();
        this.setFillStyle('black');
        this.clearCanvas();
    }
    Object.defineProperty(CanvasWrapper.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasWrapper.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    CanvasWrapper.prototype.setFillStyle = function (colour) {
        this.ctx.fillStyle = colour;
    };
    CanvasWrapper.prototype.clearCanvas = function () {
        this.drawRectangle(0, 0, this._width, this._height);
    };
    CanvasWrapper.prototype.drawRectangle = function (x, y, width, height) {
        this.ctx.fillRect(x, y, width, height);
    };
    CanvasWrapper.prototype.drawSquare = function (centre, radius) {
        this.drawRectangle(centre.x - radius, centre.y - radius, 2 * radius, 2 * radius);
    };
    CanvasWrapper.prototype.setLineWidth = function (width) {
        this.ctx.lineWidth = width;
    };
    CanvasWrapper.prototype.setStrokeStyle = function (colour) {
        this.ctx.strokeStyle = colour;
    };
    CanvasWrapper.prototype.drawPolyline = function (line) {
        if (line.length < 2) {
            log.warn("Tried to draw path of length < 2");
            return;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(line[0].x, line[0].y);
        for (var i = 1; i < line.length; i++) {
            this.ctx.lineTo(line[i].x, line[i].y);
        }
        this.ctx.stroke();
    };
    CanvasWrapper.prototype.resizeCanvas = function () {
        this.ctx.canvas.width = this._width;
        this.ctx.canvas.height = this._height;
    };
    return CanvasWrapper;
}());
exports.default = CanvasWrapper;

},{"loglevel":3}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_1 = require("../vector");
/**
 * Singleton
 * Controls panning and zooming
 */
var DomainController = /** @class */ (function () {
    function DomainController(screenDimensions) {
        // Location of screen origin in world space
        this._origin = vector_1.default.zeroVector();
        // Ratio of screen pixels to world pixels
        this._zoom = 1;
        if (screenDimensions) {
            this._screenDimensions = screenDimensions.clone();
        }
    }
    DomainController.getInstance = function (screenDimensions) {
        if (!DomainController.instance) {
            DomainController.instance = new DomainController(screenDimensions);
        }
        return DomainController.instance;
    };
    /**
     * @param {Vector} delta in world space
     */
    DomainController.prototype.pan = function (delta) {
        this._origin.sub(delta);
    };
    Object.defineProperty(DomainController.prototype, "origin", {
        get: function () {
            return this._origin.clone();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomainController.prototype, "zoom", {
        get: function () {
            return this._zoom;
        },
        set: function (z) {
            if (z > 0) {
                var oldWorldSpaceMidpoint = this.origin.add(this.worldDimensions.divideScalar(2));
                this._zoom = z;
                var newWorldSpaceMidpoint = this.origin.add(this.worldDimensions.divideScalar(2));
                this.pan(newWorldSpaceMidpoint.sub(oldWorldSpaceMidpoint));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomainController.prototype, "screenDimensions", {
        get: function () {
            return this._screenDimensions.clone();
        },
        set: function (v) {
            this._screenDimensions.copy(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DomainController.prototype, "worldDimensions", {
        /**
         * @return {Vector} world-space w/h visible on screen
         */
        get: function () {
            return this.screenDimensions.divideScalar(this._zoom);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Edits vector
     */
    DomainController.prototype.zoomToWorld = function (v) {
        return v.divideScalar(this._zoom);
    };
    /**
     * Edits vector
     */
    DomainController.prototype.zoomToScreen = function (v) {
        return v.multiplyScalar(this._zoom);
    };
    /**
     * Edits vector
     */
    DomainController.prototype.screenToWorld = function (v) {
        return this.zoomToWorld(v).add(this._origin);
    };
    /**
     * Edits vector
     */
    DomainController.prototype.worldToScreen = function (v) {
        return this.zoomToScreen(v.sub(this._origin));
    };
    return DomainController;
}());
exports.default = DomainController;

},{"../vector":18}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var interactjs_1 = require("interactjs");
var util_1 = require("../util");
var Vector_1 = require("../Vector");
var domain_controller_1 = require("./domain_controller");
/**
* Register multiple centre points
* Closest one to mouse click will be selected to drag
* Up to caller to actually move their centre point via callback
*/
var DragController = /** @class */ (function () {
    function DragController(gui) {
        this.gui = gui;
        // How close to drag handle pointer needs to be
        this.MIN_DRAG_DISTANCE = 50;
        this.draggables = [];
        this.currentlyDragging = null;
        this.disabled = false;
        this.domainController = domain_controller_1.default.getInstance();
        interactjs_1.default("#" + util_1.default.CANVAS_ID).draggable({
            onstart: this.dragStart.bind(this),
            onmove: this.dragMove.bind(this),
            onend: this.dragEnd.bind(this),
            cursorChecker: this.getCursor.bind(this),
        });
    }
    DragController.prototype.setDragDisabled = function (disable) {
        this.disabled = disable;
    };
    DragController.prototype.getCursor = function (action, interactable, element, interacting) {
        if (this.disabled)
            return 'default';
        if (interacting)
            return 'grabbing';
        return 'grab';
    };
    DragController.prototype.dragStart = function (event) {
        var _this = this;
        if (this.disabled)
            return;
        // Transform screen space to world space
        var origin = this.domainController.screenToWorld(new Vector_1.default(event.x0, event.y0));
        var closestDistance = Infinity;
        this.draggables.forEach(function (draggable) {
            var d = draggable.getCentre().distanceTo(origin);
            if (d < closestDistance) {
                closestDistance = d;
                _this.currentlyDragging = draggable;
            }
        });
        // Zoom screen size to world size for consistent drag distance while zoomed in
        var scaledDragDistance = this.MIN_DRAG_DISTANCE / this.domainController.zoom;
        if (closestDistance > scaledDragDistance) {
            this.currentlyDragging = null;
        }
    };
    DragController.prototype.dragMove = function (event) {
        if (this.disabled)
            return;
        var delta = new Vector_1.default(event.delta.x, event.delta.y);
        this.domainController.zoomToWorld(delta);
        if (this.currentlyDragging !== null) {
            // Drag field
            this.currentlyDragging.callbackFn(delta);
        }
        else {
            // Move map
            this.domainController.pan(delta);
        }
    };
    DragController.prototype.dragEnd = function () {
        if (this.disabled)
            return;
        this.currentlyDragging = null;
        util_1.default.updateGui(this.gui);
    };
    /**
     * @param {(() => Vector)} Gets centre point
     * @param {((v: Vector) => void)} Called on move with delta vector
     * @returns {(() => void)} Function to deregister callback
     */
    DragController.prototype.register = function (getCentre, onMove) {
        var _this = this;
        var draggable = {
            getCentre: getCentre,
            callbackFn: onMove,
        };
        this.draggables.push(draggable);
        return (function () {
            var index = _this.draggables.indexOf(draggable);
            if (index >= 0) {
                _this.draggables.splice(index, 1);
            }
        }).bind(this);
    };
    return DragController;
}());
exports.default = DragController;

},{"../Vector":6,"../util":17,"./domain_controller":14,"interactjs":2}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_field_1 = require("../impl/tensor_field");
var TensorFieldInterface = /** @class */ (function (_super) {
    __extends(TensorFieldInterface, _super);
    function TensorFieldInterface(guiFolder, dragController) {
        var _this = _super.call(this) || this;
        _this.guiFolder = guiFolder;
        _this.dragController = dragController;
        return _this;
    }
    TensorFieldInterface.prototype.addField = function (field) {
        var _this = this;
        _super.prototype.addField.call(this, field);
        var folder = this.guiFolder.addFolder("" + field.FOLDER_NAME);
        // Function to deregister from drag controller
        var deregisterDrag = this.dragController.register(function () { return field.centre; }, field.dragMoveListener.bind(field));
        var removeFieldObj = { remove: function () { return _this.removeFieldGUI.bind(_this)(field, folder, deregisterDrag); } };
        // Give dat gui removeField button
        folder.add(removeFieldObj, 'remove');
        field.setGui(folder);
    };
    TensorFieldInterface.prototype.removeFieldGUI = function (field, folder, deregisterDrag) {
        _super.prototype.removeField.call(this, field);
        this.guiFolder.removeFolder(folder);
        // Deregister from drag controller
        deregisterDrag();
    };
    return TensorFieldInterface;
}(tensor_field_1.default));
exports.default = TensorFieldInterface;

},{"../impl/tensor_field":12}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.updateGui = function (gui) {
        if (gui.__controllers) {
            gui.__controllers.forEach(function (c) { return c.updateDisplay(); });
        }
        if (gui.__folders) {
            for (var folderName in gui.__folders) {
                this.updateGui(gui.__folders[folderName]);
            }
        }
    };
    Util.CANVAS_ID = 'map-canvas';
    return Util;
}());
exports.default = Util;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("loglevel");
var Vector = /** @class */ (function () {
    function Vector(x, y) {
        this.x = x;
        this.y = y;
    }
    Vector.zeroVector = function () {
        return new Vector(0, 0);
    };
    Vector.fromScalar = function (s) {
        return new Vector(s, s);
    };
    /**
     * -pi to pi
     */
    Vector.angleBetween = function (v1, v2) {
        // -2pi to 2pi
        var angleBetween = v1.angle() - v2.angle();
        if (angleBetween > Math.PI) {
            angleBetween -= 2 * Math.PI;
        }
        else if (angleBetween <= -Math.PI) {
            angleBetween += 2 * Math.PI;
        }
        return angleBetween;
    };
    Vector.prototype.add = function (v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    };
    /**
     * Angle in radians to positive x-axis between -pi and pi
     */
    Vector.prototype.angle = function () {
        return Math.atan2(this.y, this.x);
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y);
    };
    Vector.prototype.copy = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector.prototype.cross = function (v) {
        return this.x * v.y - this.y * v.x;
    };
    Vector.prototype.distanceTo = function (v) {
        return Math.sqrt(this.distanceToSquared(v));
    };
    Vector.prototype.distanceToSquared = function (v) {
        var dx = this.x - v.x;
        var dy = this.y - v.y;
        return dx * dx + dy * dy;
    };
    Vector.prototype.divide = function (v) {
        if (v.x === 0 || v.y === 0) {
            log.warn("Division by zero");
            return this;
        }
        this.x /= v.x;
        this.y /= v.y;
        return this;
    };
    Vector.prototype.divideScalar = function (s) {
        if (s === 0) {
            log.warn("Division by zero");
            return this;
        }
        return this.multiplyScalar(1 / s);
    };
    Vector.prototype.dot = function (v) {
        return this.x * v.x + this.y * v.y;
    };
    Vector.prototype.equals = function (v) {
        return ((v.x === this.x) && (v.y === this.y));
    };
    Vector.prototype.length = function () {
        return Math.sqrt(this.lengthSq());
    };
    Vector.prototype.lengthSq = function () {
        return this.x * this.x + this.y * this.y;
    };
    Vector.prototype.mulitply = function (v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    };
    Vector.prototype.multiplyScalar = function (s) {
        this.x *= s;
        this.y *= s;
        return this;
    };
    Vector.prototype.negate = function () {
        return this.multiplyScalar(-1);
    };
    Vector.prototype.normalize = function () {
        var l = this.length();
        if (l === 0) {
            log.warn("Zero Vector");
            return this;
        }
        return this.divideScalar(this.length());
    };
    /**
     * Angle in radians
     */
    Vector.prototype.rotateAround = function (center, angle) {
        var cos = Math.cos(angle);
        var sin = Math.sin(angle);
        var x = this.x - center.x;
        var y = this.y - center.y;
        this.x = x * cos - y * sin + center.x;
        this.y = x * sin + y * cos + center.y;
        return this;
    };
    Vector.prototype.set = function (v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    };
    Vector.prototype.setLength = function (length) {
        return this.normalize().multiplyScalar(length);
    };
    Vector.prototype.sub = function (v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    };
    return Vector;
}());
exports.default = Vector;

},{"loglevel":3}]},{},[5,7,8,9,10,12,11,13,14,15,16,17,18])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZGF0Lmd1aS9idWlsZC9kYXQuZ3VpLmpzIiwibm9kZV9tb2R1bGVzL2ludGVyYWN0anMvZGlzdC9pbnRlcmFjdC5taW4uanMiLCJub2RlX21vZHVsZXMvbG9nbGV2ZWwvbGliL2xvZ2xldmVsLmpzIiwibm9kZV9tb2R1bGVzL3NpbXBsaWZ5LWpzL3NpbXBsaWZ5LmpzIiwic3JjL21haW4udHMiLCJzcmMvdHMvVmVjdG9yLnRzIiwic3JjL3RzL2ltcGwvYmFzaXNfZmllbGQudHMiLCJzcmMvdHMvaW1wbC9ncmlkX3N0b3JhZ2UudHMiLCJzcmMvdHMvaW1wbC9pbnRlZ3JhdG9yLnRzIiwic3JjL3RzL2ltcGwvc3RyZWFtbGluZXMudHMiLCJzcmMvdHMvaW1wbC90ZW5zb3IudHMiLCJzcmMvdHMvaW1wbC90ZW5zb3JfZmllbGQudHMiLCJzcmMvdHMvaW50ZXJmYWNlL2NhbnZhc193cmFwcGVyLnRzIiwic3JjL3RzL2ludGVyZmFjZS9kb21haW5fY29udHJvbGxlci50cyIsInNyYy90cy9pbnRlcmZhY2UvZHJhZ19jb250cm9sbGVyLnRzIiwic3JjL3RzL2ludGVyZmFjZS90ZW5zb3JfZmllbGRfaW50ZXJmYWNlLnRzIiwic3JjL3RzL3V0aWwudHMiLCJzcmMvdHMvdmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN6K0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LENBQUM7SUFDaEIsQ0FBQztJQUVELG9CQUFHLEdBQUgsVUFBSSxDQUFTO1FBQ1QsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELDBCQUFTLEdBQVQsVUFBVyxNQUFjO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsb0JBQUcsR0FBSCxVQUFJLENBQVM7UUFDVCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsYUFBQztBQUFELENBekpBLEFBeUpDLElBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIGRhdC1ndWkgSmF2YVNjcmlwdCBDb250cm9sbGVyIExpYnJhcnlcbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9kYXQtZ3VpXG4gKlxuICogQ29weXJpZ2h0IDIwMTEgRGF0YSBBcnRzIFRlYW0sIEdvb2dsZSBDcmVhdGl2ZSBMYWJcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuXHQoZmFjdG9yeSgoZ2xvYmFsLmRhdCA9IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfX18kaW5zZXJ0U3R5bGUoY3NzKSB7XG4gIGlmICghY3NzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvY3NzJyk7XG4gIHN0eWxlLmlubmVySFRNTCA9IGNzcztcbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbiAgcmV0dXJuIGNzcztcbn1cblxuZnVuY3Rpb24gY29sb3JUb1N0cmluZyAoY29sb3IsIGZvcmNlQ1NTSGV4KSB7XG4gIHZhciBjb2xvckZvcm1hdCA9IGNvbG9yLl9fc3RhdGUuY29udmVyc2lvbk5hbWUudG9TdHJpbmcoKTtcbiAgdmFyIHIgPSBNYXRoLnJvdW5kKGNvbG9yLnIpO1xuICB2YXIgZyA9IE1hdGgucm91bmQoY29sb3IuZyk7XG4gIHZhciBiID0gTWF0aC5yb3VuZChjb2xvci5iKTtcbiAgdmFyIGEgPSBjb2xvci5hO1xuICB2YXIgaCA9IE1hdGgucm91bmQoY29sb3IuaCk7XG4gIHZhciBzID0gY29sb3Iucy50b0ZpeGVkKDEpO1xuICB2YXIgdiA9IGNvbG9yLnYudG9GaXhlZCgxKTtcbiAgaWYgKGZvcmNlQ1NTSGV4IHx8IGNvbG9yRm9ybWF0ID09PSAnVEhSRUVfQ0hBUl9IRVgnIHx8IGNvbG9yRm9ybWF0ID09PSAnU0lYX0NIQVJfSEVYJykge1xuICAgIHZhciBzdHIgPSBjb2xvci5oZXgudG9TdHJpbmcoMTYpO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgNikge1xuICAgICAgc3RyID0gJzAnICsgc3RyO1xuICAgIH1cbiAgICByZXR1cm4gJyMnICsgc3RyO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnQ1NTX1JHQicpIHtcbiAgICByZXR1cm4gJ3JnYignICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJyknO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnQ1NTX1JHQkEnKSB7XG4gICAgcmV0dXJuICdyZ2JhKCcgKyByICsgJywnICsgZyArICcsJyArIGIgKyAnLCcgKyBhICsgJyknO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnSEVYJykge1xuICAgIHJldHVybiAnMHgnICsgY29sb3IuaGV4LnRvU3RyaW5nKDE2KTtcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ1JHQl9BUlJBWScpIHtcbiAgICByZXR1cm4gJ1snICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJ10nO1xuICB9IGVsc2UgaWYgKGNvbG9yRm9ybWF0ID09PSAnUkdCQV9BUlJBWScpIHtcbiAgICByZXR1cm4gJ1snICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJywnICsgYSArICddJztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ1JHQl9PQkonKSB7XG4gICAgcmV0dXJuICd7cjonICsgciArICcsZzonICsgZyArICcsYjonICsgYiArICd9JztcbiAgfSBlbHNlIGlmIChjb2xvckZvcm1hdCA9PT0gJ1JHQkFfT0JKJykge1xuICAgIHJldHVybiAne3I6JyArIHIgKyAnLGc6JyArIGcgKyAnLGI6JyArIGIgKyAnLGE6JyArIGEgKyAnfSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdIU1ZfT0JKJykge1xuICAgIHJldHVybiAne2g6JyArIGggKyAnLHM6JyArIHMgKyAnLHY6JyArIHYgKyAnfSc7XG4gIH0gZWxzZSBpZiAoY29sb3JGb3JtYXQgPT09ICdIU1ZBX09CSicpIHtcbiAgICByZXR1cm4gJ3toOicgKyBoICsgJyxzOicgKyBzICsgJyx2OicgKyB2ICsgJyxhOicgKyBhICsgJ30nO1xuICB9XG4gIHJldHVybiAndW5rbm93biBmb3JtYXQnO1xufVxuXG52YXIgQVJSX0VBQ0ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcbnZhciBBUlJfU0xJQ0UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgQ29tbW9uID0ge1xuICBCUkVBSzoge30sXG4gIGV4dGVuZDogZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuICAgIHRoaXMuZWFjaChBUlJfU0xJQ0UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgICB2YXIga2V5cyA9IHRoaXMuaXNPYmplY3Qob2JqKSA/IE9iamVjdC5rZXlzKG9iaikgOiBbXTtcbiAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG4gIGRlZmF1bHRzOiBmdW5jdGlvbiBkZWZhdWx0cyh0YXJnZXQpIHtcbiAgICB0aGlzLmVhY2goQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzLCAxKSwgZnVuY3Rpb24gKG9iaikge1xuICAgICAgdmFyIGtleXMgPSB0aGlzLmlzT2JqZWN0KG9iaikgPyBPYmplY3Qua2V5cyhvYmopIDogW107XG4gICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodGhpcy5pc1VuZGVmaW5lZCh0YXJnZXRba2V5XSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sIHRoaXMpO1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH0sXG4gIGNvbXBvc2U6IGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gICAgdmFyIHRvQ2FsbCA9IEFSUl9TTElDRS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gQVJSX1NMSUNFLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGZvciAodmFyIGkgPSB0b0NhbGwubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXJncyA9IFt0b0NhbGxbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgfTtcbiAgfSxcbiAgZWFjaDogZnVuY3Rpb24gZWFjaChvYmosIGl0ciwgc2NvcGUpIHtcbiAgICBpZiAoIW9iaikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoQVJSX0VBQ0ggJiYgb2JqLmZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IEFSUl9FQUNIKSB7XG4gICAgICBvYmouZm9yRWFjaChpdHIsIHNjb3BlKTtcbiAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09IG9iai5sZW5ndGggKyAwKSB7XG4gICAgICB2YXIga2V5ID0gdm9pZCAwO1xuICAgICAgdmFyIGwgPSB2b2lkIDA7XG4gICAgICBmb3IgKGtleSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBrZXkgPCBsOyBrZXkrKykge1xuICAgICAgICBpZiAoa2V5IGluIG9iaiAmJiBpdHIuY2FsbChzY29wZSwgb2JqW2tleV0sIGtleSkgPT09IHRoaXMuQlJFQUspIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgX2tleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKGl0ci5jYWxsKHNjb3BlLCBvYmpbX2tleV0sIF9rZXkpID09PSB0aGlzLkJSRUFLKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkZWZlcjogZnVuY3Rpb24gZGVmZXIoZm5jKSB7XG4gICAgc2V0VGltZW91dChmbmMsIDApO1xuICB9LFxuICBkZWJvdW5jZTogZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgdGhyZXNob2xkLCBjYWxsSW1tZWRpYXRlbHkpIHtcbiAgICB2YXIgdGltZW91dCA9IHZvaWQgMDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9iaiA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGZ1bmN0aW9uIGRlbGF5ZWQoKSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWNhbGxJbW1lZGlhdGVseSkgZnVuYy5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgfVxuICAgICAgdmFyIGNhbGxOb3cgPSBjYWxsSW1tZWRpYXRlbHkgfHwgIXRpbWVvdXQ7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChkZWxheWVkLCB0aHJlc2hvbGQpO1xuICAgICAgaWYgKGNhbGxOb3cpIHtcbiAgICAgICAgZnVuYy5hcHBseShvYmosIGFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIHRvQXJyYXk6IGZ1bmN0aW9uIHRvQXJyYXkob2JqKSB7XG4gICAgaWYgKG9iai50b0FycmF5KSByZXR1cm4gb2JqLnRvQXJyYXkoKTtcbiAgICByZXR1cm4gQVJSX1NMSUNFLmNhbGwob2JqKTtcbiAgfSxcbiAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uIGlzVW5kZWZpbmVkKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHVuZGVmaW5lZDtcbiAgfSxcbiAgaXNOdWxsOiBmdW5jdGlvbiBpc051bGwob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgfSxcbiAgaXNOYU46IGZ1bmN0aW9uIChfaXNOYU4pIHtcbiAgICBmdW5jdGlvbiBpc05hTihfeCkge1xuICAgICAgcmV0dXJuIF9pc05hTi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpc05hTi50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBfaXNOYU4udG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIHJldHVybiBpc05hTjtcbiAgfShmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIGlzTmFOKG9iaik7XG4gIH0pLFxuICBpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqLmNvbnN0cnVjdG9yID09PSBBcnJheTtcbiAgfSxcbiAgaXNPYmplY3Q6IGZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICB9LFxuICBpc051bWJlcjogZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gb2JqICsgMDtcbiAgfSxcbiAgaXNTdHJpbmc6IGZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG9iaiArICcnO1xuICB9LFxuICBpc0Jvb2xlYW46IGZ1bmN0aW9uIGlzQm9vbGVhbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBmYWxzZSB8fCBvYmogPT09IHRydWU7XG4gIH0sXG4gIGlzRnVuY3Rpb246IGZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xuICB9XG59O1xuXG52YXIgSU5URVJQUkVUQVRJT05TID0gW1xue1xuICBsaXRtdXM6IENvbW1vbi5pc1N0cmluZyxcbiAgY29udmVyc2lvbnM6IHtcbiAgICBUSFJFRV9DSEFSX0hFWDoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9eIyhbQS1GMC05XSkoW0EtRjAtOV0pKFtBLUYwLTldKSQvaSk7XG4gICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMV0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbMl0udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSArIHRlc3RbM10udG9TdHJpbmcoKSwgMClcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogY29sb3JUb1N0cmluZ1xuICAgIH0sXG4gICAgU0lYX0NIQVJfSEVYOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIHZhciB0ZXN0ID0gb3JpZ2luYWwubWF0Y2goL14jKFtBLUYwLTldezZ9KSQvaSk7XG4gICAgICAgIGlmICh0ZXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3BhY2U6ICdIRVgnLFxuICAgICAgICAgIGhleDogcGFyc2VJbnQoJzB4JyArIHRlc3RbMV0udG9TdHJpbmcoKSwgMClcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogY29sb3JUb1N0cmluZ1xuICAgIH0sXG4gICAgQ1NTX1JHQjoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICB2YXIgdGVzdCA9IG9yaWdpbmFsLm1hdGNoKC9ecmdiXFwoXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSlcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogY29sb3JUb1N0cmluZ1xuICAgIH0sXG4gICAgQ1NTX1JHQkE6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIHRlc3QgPSBvcmlnaW5hbC5tYXRjaCgvXnJnYmFcXChcXHMqKC4rKVxccyosXFxzKiguKylcXHMqLFxccyooLispXFxzKixcXHMqKC4rKVxccypcXCkvKTtcbiAgICAgICAgaWYgKHRlc3QgPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgcjogcGFyc2VGbG9hdCh0ZXN0WzFdKSxcbiAgICAgICAgICBnOiBwYXJzZUZsb2F0KHRlc3RbMl0pLFxuICAgICAgICAgIGI6IHBhcnNlRmxvYXQodGVzdFszXSksXG4gICAgICAgICAgYTogcGFyc2VGbG9hdCh0ZXN0WzRdKVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBjb2xvclRvU3RyaW5nXG4gICAgfVxuICB9XG59LFxue1xuICBsaXRtdXM6IENvbW1vbi5pc051bWJlcixcbiAgY29udmVyc2lvbnM6IHtcbiAgICBIRVg6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ0hFWCcsXG4gICAgICAgICAgaGV4OiBvcmlnaW5hbCxcbiAgICAgICAgICBjb252ZXJzaW9uTmFtZTogJ0hFWCdcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yLmhleDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0sXG57XG4gIGxpdG11czogQ29tbW9uLmlzQXJyYXksXG4gIGNvbnZlcnNpb25zOiB7XG4gICAgUkdCX0FSUkFZOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChvcmlnaW5hbC5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgcjogb3JpZ2luYWxbMF0sXG4gICAgICAgICAgZzogb3JpZ2luYWxbMV0sXG4gICAgICAgICAgYjogb3JpZ2luYWxbMl1cbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoY29sb3IpIHtcbiAgICAgICAgcmV0dXJuIFtjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iXTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFJHQkFfQVJSQVk6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgaWYgKG9yaWdpbmFsLmxlbmd0aCAhPT0gNCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNwYWNlOiAnUkdCJyxcbiAgICAgICAgICByOiBvcmlnaW5hbFswXSxcbiAgICAgICAgICBnOiBvcmlnaW5hbFsxXSxcbiAgICAgICAgICBiOiBvcmlnaW5hbFsyXSxcbiAgICAgICAgICBhOiBvcmlnaW5hbFszXVxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4gW2NvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIGNvbG9yLmFdO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSxcbntcbiAgbGl0bXVzOiBDb21tb24uaXNPYmplY3QsXG4gIGNvbnZlcnNpb25zOiB7XG4gICAgUkdCQV9PQko6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgaWYgKENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5yKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuZykgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLmIpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5hKSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzcGFjZTogJ1JHQicsXG4gICAgICAgICAgICByOiBvcmlnaW5hbC5yLFxuICAgICAgICAgICAgZzogb3JpZ2luYWwuZyxcbiAgICAgICAgICAgIGI6IG9yaWdpbmFsLmIsXG4gICAgICAgICAgICBhOiBvcmlnaW5hbC5hXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgIGI6IGNvbG9yLmIsXG4gICAgICAgICAgYTogY29sb3IuYVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0sXG4gICAgUkdCX09CSjoge1xuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChvcmlnaW5hbCkge1xuICAgICAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnIpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5nKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYikpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3BhY2U6ICdSR0InLFxuICAgICAgICAgICAgcjogb3JpZ2luYWwucixcbiAgICAgICAgICAgIGc6IG9yaWdpbmFsLmcsXG4gICAgICAgICAgICBiOiBvcmlnaW5hbC5iXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKGNvbG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcjogY29sb3IucixcbiAgICAgICAgICBnOiBjb2xvci5nLFxuICAgICAgICAgIGI6IGNvbG9yLmJcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIEhTVkFfT0JKOiB7XG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG9yaWdpbmFsKSB7XG4gICAgICAgIGlmIChDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuaCkgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnMpICYmIENvbW1vbi5pc051bWJlcihvcmlnaW5hbC52KSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwuYSkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3BhY2U6ICdIU1YnLFxuICAgICAgICAgICAgaDogb3JpZ2luYWwuaCxcbiAgICAgICAgICAgIHM6IG9yaWdpbmFsLnMsXG4gICAgICAgICAgICB2OiBvcmlnaW5hbC52LFxuICAgICAgICAgICAgYTogb3JpZ2luYWwuYVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICB2OiBjb2xvci52LFxuICAgICAgICAgIGE6IGNvbG9yLmFcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIEhTVl9PQko6IHtcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQob3JpZ2luYWwpIHtcbiAgICAgICAgaWYgKENvbW1vbi5pc051bWJlcihvcmlnaW5hbC5oKSAmJiBDb21tb24uaXNOdW1iZXIob3JpZ2luYWwucykgJiYgQ29tbW9uLmlzTnVtYmVyKG9yaWdpbmFsLnYpKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNwYWNlOiAnSFNWJyxcbiAgICAgICAgICAgIGg6IG9yaWdpbmFsLmgsXG4gICAgICAgICAgICBzOiBvcmlnaW5hbC5zLFxuICAgICAgICAgICAgdjogb3JpZ2luYWwudlxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShjb2xvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGg6IGNvbG9yLmgsXG4gICAgICAgICAgczogY29sb3IucyxcbiAgICAgICAgICB2OiBjb2xvci52XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG59XTtcbnZhciByZXN1bHQgPSB2b2lkIDA7XG52YXIgdG9SZXR1cm4gPSB2b2lkIDA7XG52YXIgaW50ZXJwcmV0ID0gZnVuY3Rpb24gaW50ZXJwcmV0KCkge1xuICB0b1JldHVybiA9IGZhbHNlO1xuICB2YXIgb3JpZ2luYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSA/IENvbW1vbi50b0FycmF5KGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF07XG4gIENvbW1vbi5lYWNoKElOVEVSUFJFVEFUSU9OUywgZnVuY3Rpb24gKGZhbWlseSkge1xuICAgIGlmIChmYW1pbHkubGl0bXVzKG9yaWdpbmFsKSkge1xuICAgICAgQ29tbW9uLmVhY2goZmFtaWx5LmNvbnZlcnNpb25zLCBmdW5jdGlvbiAoY29udmVyc2lvbiwgY29udmVyc2lvbk5hbWUpIHtcbiAgICAgICAgcmVzdWx0ID0gY29udmVyc2lvbi5yZWFkKG9yaWdpbmFsKTtcbiAgICAgICAgaWYgKHRvUmV0dXJuID09PSBmYWxzZSAmJiByZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgdG9SZXR1cm4gPSByZXN1bHQ7XG4gICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb25OYW1lID0gY29udmVyc2lvbk5hbWU7XG4gICAgICAgICAgcmVzdWx0LmNvbnZlcnNpb24gPSBjb252ZXJzaW9uO1xuICAgICAgICAgIHJldHVybiBDb21tb24uQlJFQUs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIENvbW1vbi5CUkVBSztcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdG9SZXR1cm47XG59O1xuXG52YXIgdG1wQ29tcG9uZW50ID0gdm9pZCAwO1xudmFyIENvbG9yTWF0aCA9IHtcbiAgaHN2X3RvX3JnYjogZnVuY3Rpb24gaHN2X3RvX3JnYihoLCBzLCB2KSB7XG4gICAgdmFyIGhpID0gTWF0aC5mbG9vcihoIC8gNjApICUgNjtcbiAgICB2YXIgZiA9IGggLyA2MCAtIE1hdGguZmxvb3IoaCAvIDYwKTtcbiAgICB2YXIgcCA9IHYgKiAoMS4wIC0gcyk7XG4gICAgdmFyIHEgPSB2ICogKDEuMCAtIGYgKiBzKTtcbiAgICB2YXIgdCA9IHYgKiAoMS4wIC0gKDEuMCAtIGYpICogcyk7XG4gICAgdmFyIGMgPSBbW3YsIHQsIHBdLCBbcSwgdiwgcF0sIFtwLCB2LCB0XSwgW3AsIHEsIHZdLCBbdCwgcCwgdl0sIFt2LCBwLCBxXV1baGldO1xuICAgIHJldHVybiB7XG4gICAgICByOiBjWzBdICogMjU1LFxuICAgICAgZzogY1sxXSAqIDI1NSxcbiAgICAgIGI6IGNbMl0gKiAyNTVcbiAgICB9O1xuICB9LFxuICByZ2JfdG9faHN2OiBmdW5jdGlvbiByZ2JfdG9faHN2KHIsIGcsIGIpIHtcbiAgICB2YXIgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpO1xuICAgIHZhciBkZWx0YSA9IG1heCAtIG1pbjtcbiAgICB2YXIgaCA9IHZvaWQgMDtcbiAgICB2YXIgcyA9IHZvaWQgMDtcbiAgICBpZiAobWF4ICE9PSAwKSB7XG4gICAgICBzID0gZGVsdGEgLyBtYXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGg6IE5hTixcbiAgICAgICAgczogMCxcbiAgICAgICAgdjogMFxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHIgPT09IG1heCkge1xuICAgICAgaCA9IChnIC0gYikgLyBkZWx0YTtcbiAgICB9IGVsc2UgaWYgKGcgPT09IG1heCkge1xuICAgICAgaCA9IDIgKyAoYiAtIHIpIC8gZGVsdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGggPSA0ICsgKHIgLSBnKSAvIGRlbHRhO1xuICAgIH1cbiAgICBoIC89IDY7XG4gICAgaWYgKGggPCAwKSB7XG4gICAgICBoICs9IDE7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoOiBoICogMzYwLFxuICAgICAgczogcyxcbiAgICAgIHY6IG1heCAvIDI1NVxuICAgIH07XG4gIH0sXG4gIHJnYl90b19oZXg6IGZ1bmN0aW9uIHJnYl90b19oZXgociwgZywgYikge1xuICAgIHZhciBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudCgwLCAyLCByKTtcbiAgICBoZXggPSB0aGlzLmhleF93aXRoX2NvbXBvbmVudChoZXgsIDEsIGcpO1xuICAgIGhleCA9IHRoaXMuaGV4X3dpdGhfY29tcG9uZW50KGhleCwgMCwgYik7XG4gICAgcmV0dXJuIGhleDtcbiAgfSxcbiAgY29tcG9uZW50X2Zyb21faGV4OiBmdW5jdGlvbiBjb21wb25lbnRfZnJvbV9oZXgoaGV4LCBjb21wb25lbnRJbmRleCkge1xuICAgIHJldHVybiBoZXggPj4gY29tcG9uZW50SW5kZXggKiA4ICYgMHhGRjtcbiAgfSxcbiAgaGV4X3dpdGhfY29tcG9uZW50OiBmdW5jdGlvbiBoZXhfd2l0aF9jb21wb25lbnQoaGV4LCBjb21wb25lbnRJbmRleCwgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPDwgKHRtcENvbXBvbmVudCA9IGNvbXBvbmVudEluZGV4ICogOCkgfCBoZXggJiB+KDB4RkYgPDwgdG1wQ29tcG9uZW50KTtcbiAgfVxufTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmo7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG5cblxudmFyIGdldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4gIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTtcblxuICBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuXG4gICAgaWYgKHBhcmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7XG4gICAgcmV0dXJuIGRlc2MudmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGdldHRlciA9IGRlc2MuZ2V0O1xuXG4gICAgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7XG4gIH1cbn07XG5cbnZhciBpbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07XG5cblxuXG5cblxuXG5cblxuXG5cblxudmFyIHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4gPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07XG5cbnZhciBDb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29sb3IoKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sb3IpO1xuICAgIHRoaXMuX19zdGF0ZSA9IGludGVycHJldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0aGlzLl9fc3RhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBpbnRlcnByZXQgY29sb3IgYXJndW1lbnRzJyk7XG4gICAgfVxuICAgIHRoaXMuX19zdGF0ZS5hID0gdGhpcy5fX3N0YXRlLmEgfHwgMTtcbiAgfVxuICBjcmVhdGVDbGFzcyhDb2xvciwgW3tcbiAgICBrZXk6ICd0b1N0cmluZycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgICAgcmV0dXJuIGNvbG9yVG9TdHJpbmcodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndG9IZXhTdHJpbmcnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b0hleFN0cmluZygpIHtcbiAgICAgIHJldHVybiBjb2xvclRvU3RyaW5nKHRoaXMsIHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3RvT3JpZ2luYWwnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0b09yaWdpbmFsKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZS5jb252ZXJzaW9uLndyaXRlKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29sb3I7XG59KCk7XG5mdW5jdGlvbiBkZWZpbmVSR0JDb21wb25lbnQodGFyZ2V0LCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGNvbXBvbmVudCwge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSA9PT0gJ1JHQicpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgICAgfVxuICAgICAgQ29sb3IucmVjYWxjdWxhdGVSR0IodGhpcywgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCk7XG4gICAgICByZXR1cm4gdGhpcy5fX3N0YXRlW2NvbXBvbmVudF07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICBpZiAodGhpcy5fX3N0YXRlLnNwYWNlICE9PSAnUkdCJykge1xuICAgICAgICBDb2xvci5yZWNhbGN1bGF0ZVJHQih0aGlzLCBjb21wb25lbnQsIGNvbXBvbmVudEhleEluZGV4KTtcbiAgICAgICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ1JHQic7XG4gICAgICB9XG4gICAgICB0aGlzLl9fc3RhdGVbY29tcG9uZW50XSA9IHY7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGRlZmluZUhTVkNvbXBvbmVudCh0YXJnZXQsIGNvbXBvbmVudCkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBjb21wb25lbnQsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICAgIGlmICh0aGlzLl9fc3RhdGUuc3BhY2UgPT09ICdIU1YnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fc3RhdGVbY29tcG9uZW50XTtcbiAgICAgIH1cbiAgICAgIENvbG9yLnJlY2FsY3VsYXRlSFNWKHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXMuX19zdGF0ZVtjb21wb25lbnRdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEodikge1xuICAgICAgaWYgKHRoaXMuX19zdGF0ZS5zcGFjZSAhPT0gJ0hTVicpIHtcbiAgICAgICAgQ29sb3IucmVjYWxjdWxhdGVIU1YodGhpcyk7XG4gICAgICAgIHRoaXMuX19zdGF0ZS5zcGFjZSA9ICdIU1YnO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3N0YXRlW2NvbXBvbmVudF0gPSB2O1xuICAgIH1cbiAgfSk7XG59XG5Db2xvci5yZWNhbGN1bGF0ZVJHQiA9IGZ1bmN0aW9uIChjb2xvciwgY29tcG9uZW50LCBjb21wb25lbnRIZXhJbmRleCkge1xuICBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hFWCcpIHtcbiAgICBjb2xvci5fX3N0YXRlW2NvbXBvbmVudF0gPSBDb2xvck1hdGguY29tcG9uZW50X2Zyb21faGV4KGNvbG9yLl9fc3RhdGUuaGV4LCBjb21wb25lbnRIZXhJbmRleCk7XG4gIH0gZWxzZSBpZiAoY29sb3IuX19zdGF0ZS5zcGFjZSA9PT0gJ0hTVicpIHtcbiAgICBDb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIENvbG9yTWF0aC5oc3ZfdG9fcmdiKGNvbG9yLl9fc3RhdGUuaCwgY29sb3IuX19zdGF0ZS5zLCBjb2xvci5fX3N0YXRlLnYpKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvcnJ1cHRlZCBjb2xvciBzdGF0ZScpO1xuICB9XG59O1xuQ29sb3IucmVjYWxjdWxhdGVIU1YgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgdmFyIHJlc3VsdCA9IENvbG9yTWF0aC5yZ2JfdG9faHN2KGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIpO1xuICBDb21tb24uZXh0ZW5kKGNvbG9yLl9fc3RhdGUsIHtcbiAgICBzOiByZXN1bHQucyxcbiAgICB2OiByZXN1bHQudlxuICB9KTtcbiAgaWYgKCFDb21tb24uaXNOYU4ocmVzdWx0LmgpKSB7XG4gICAgY29sb3IuX19zdGF0ZS5oID0gcmVzdWx0Lmg7XG4gIH0gZWxzZSBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKGNvbG9yLl9fc3RhdGUuaCkpIHtcbiAgICBjb2xvci5fX3N0YXRlLmggPSAwO1xuICB9XG59O1xuQ29sb3IuQ09NUE9ORU5UUyA9IFsncicsICdnJywgJ2InLCAnaCcsICdzJywgJ3YnLCAnaGV4JywgJ2EnXTtcbmRlZmluZVJHQkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdyJywgMik7XG5kZWZpbmVSR0JDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAnZycsIDEpO1xuZGVmaW5lUkdCQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ2InLCAwKTtcbmRlZmluZUhTVkNvbXBvbmVudChDb2xvci5wcm90b3R5cGUsICdoJyk7XG5kZWZpbmVIU1ZDb21wb25lbnQoQ29sb3IucHJvdG90eXBlLCAncycpO1xuZGVmaW5lSFNWQ29tcG9uZW50KENvbG9yLnByb3RvdHlwZSwgJ3YnKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xvci5wcm90b3R5cGUsICdhJywge1xuICBnZXQ6IGZ1bmN0aW9uIGdldCQkMSgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3N0YXRlLmE7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICB0aGlzLl9fc3RhdGUuYSA9IHY7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbG9yLnByb3RvdHlwZSwgJ2hleCcsIHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgaWYgKCF0aGlzLl9fc3RhdGUuc3BhY2UgIT09ICdIRVgnKSB7XG4gICAgICB0aGlzLl9fc3RhdGUuaGV4ID0gQ29sb3JNYXRoLnJnYl90b19oZXgodGhpcy5yLCB0aGlzLmcsIHRoaXMuYik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9fc3RhdGUuaGV4O1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgdGhpcy5fX3N0YXRlLnNwYWNlID0gJ0hFWCc7XG4gICAgdGhpcy5fX3N0YXRlLmhleCA9IHY7XG4gIH1cbn0pO1xuXG52YXIgQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29udHJvbGxlcik7XG4gICAgdGhpcy5pbml0aWFsVmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcbiAgICB0aGlzLl9fb25DaGFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlID0gdW5kZWZpbmVkO1xuICB9XG4gIGNyZWF0ZUNsYXNzKENvbnRyb2xsZXIsIFt7XG4gICAga2V5OiAnb25DaGFuZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbkNoYW5nZShmbmMpIHtcbiAgICAgIHRoaXMuX19vbkNoYW5nZSA9IGZuYztcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uRmluaXNoQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25GaW5pc2hDaGFuZ2UoZm5jKSB7XG4gICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UgPSBmbmM7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKG5ld1ZhbHVlKSB7XG4gICAgICB0aGlzLm9iamVjdFt0aGlzLnByb3BlcnR5XSA9IG5ld1ZhbHVlO1xuICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzLCBuZXdWYWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2dldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYmplY3RbdGhpcy5wcm9wZXJ0eV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlRGlzcGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdpc01vZGlmaWVkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNNb2RpZmllZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxWYWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gQ29udHJvbGxlcjtcbn0oKTtcblxudmFyIEVWRU5UX01BUCA9IHtcbiAgSFRNTEV2ZW50czogWydjaGFuZ2UnXSxcbiAgTW91c2VFdmVudHM6IFsnY2xpY2snLCAnbW91c2Vtb3ZlJywgJ21vdXNlZG93bicsICdtb3VzZXVwJywgJ21vdXNlb3ZlciddLFxuICBLZXlib2FyZEV2ZW50czogWydrZXlkb3duJ11cbn07XG52YXIgRVZFTlRfTUFQX0lOViA9IHt9O1xuQ29tbW9uLmVhY2goRVZFTlRfTUFQLCBmdW5jdGlvbiAodiwgaykge1xuICBDb21tb24uZWFjaCh2LCBmdW5jdGlvbiAoZSkge1xuICAgIEVWRU5UX01BUF9JTlZbZV0gPSBrO1xuICB9KTtcbn0pO1xudmFyIENTU19WQUxVRV9QSVhFTFMgPSAvKFxcZCsoXFwuXFxkKyk/KXB4LztcbmZ1bmN0aW9uIGNzc1ZhbHVlVG9QaXhlbHModmFsKSB7XG4gIGlmICh2YWwgPT09ICcwJyB8fCBDb21tb24uaXNVbmRlZmluZWQodmFsKSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHZhciBtYXRjaCA9IHZhbC5tYXRjaChDU1NfVkFMVUVfUElYRUxTKTtcbiAgaWYgKCFDb21tb24uaXNOdWxsKG1hdGNoKSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgfVxuICByZXR1cm4gMDtcbn1cbnZhciBkb20gPSB7XG4gIG1ha2VTZWxlY3RhYmxlOiBmdW5jdGlvbiBtYWtlU2VsZWN0YWJsZShlbGVtLCBzZWxlY3RhYmxlKSB7XG4gICAgaWYgKGVsZW0gPT09IHVuZGVmaW5lZCB8fCBlbGVtLnN0eWxlID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICBlbGVtLm9uc2VsZWN0c3RhcnQgPSBzZWxlY3RhYmxlID8gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gOiBmdW5jdGlvbiAoKSB7fTtcbiAgICBlbGVtLnN0eWxlLk1velVzZXJTZWxlY3QgPSBzZWxlY3RhYmxlID8gJ2F1dG8nIDogJ25vbmUnO1xuICAgIGVsZW0uc3R5bGUuS2h0bWxVc2VyU2VsZWN0ID0gc2VsZWN0YWJsZSA/ICdhdXRvJyA6ICdub25lJztcbiAgICBlbGVtLnVuc2VsZWN0YWJsZSA9IHNlbGVjdGFibGUgPyAnb24nIDogJ29mZic7XG4gIH0sXG4gIG1ha2VGdWxsc2NyZWVuOiBmdW5jdGlvbiBtYWtlRnVsbHNjcmVlbihlbGVtLCBob3IsIHZlcnQpIHtcbiAgICB2YXIgdmVydGljYWwgPSB2ZXJ0O1xuICAgIHZhciBob3Jpem9udGFsID0gaG9yO1xuICAgIGlmIChDb21tb24uaXNVbmRlZmluZWQoaG9yaXpvbnRhbCkpIHtcbiAgICAgIGhvcml6b250YWwgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKHZlcnRpY2FsKSkge1xuICAgICAgdmVydGljYWwgPSB0cnVlO1xuICAgIH1cbiAgICBlbGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgZWxlbS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIGVsZW0uc3R5bGUucmlnaHQgPSAwO1xuICAgIH1cbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGVsZW0uc3R5bGUudG9wID0gMDtcbiAgICAgIGVsZW0uc3R5bGUuYm90dG9tID0gMDtcbiAgICB9XG4gIH0sXG4gIGZha2VFdmVudDogZnVuY3Rpb24gZmFrZUV2ZW50KGVsZW0sIGV2ZW50VHlwZSwgcGFycywgYXV4KSB7XG4gICAgdmFyIHBhcmFtcyA9IHBhcnMgfHwge307XG4gICAgdmFyIGNsYXNzTmFtZSA9IEVWRU5UX01BUF9JTlZbZXZlbnRUeXBlXTtcbiAgICBpZiAoIWNsYXNzTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCB0eXBlICcgKyBldmVudFR5cGUgKyAnIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChjbGFzc05hbWUpO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICBjYXNlICdNb3VzZUV2ZW50cyc6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgY2xpZW50WCA9IHBhcmFtcy54IHx8IHBhcmFtcy5jbGllbnRYIHx8IDA7XG4gICAgICAgICAgdmFyIGNsaWVudFkgPSBwYXJhbXMueSB8fCBwYXJhbXMuY2xpZW50WSB8fCAwO1xuICAgICAgICAgIGV2dC5pbml0TW91c2VFdmVudChldmVudFR5cGUsIHBhcmFtcy5idWJibGVzIHx8IGZhbHNlLCBwYXJhbXMuY2FuY2VsYWJsZSB8fCB0cnVlLCB3aW5kb3csIHBhcmFtcy5jbGlja0NvdW50IHx8IDEsIDAsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBjbGllbnRYLFxuICAgICAgICAgIGNsaWVudFksXG4gICAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBjYXNlICdLZXlib2FyZEV2ZW50cyc6XG4gICAgICAgIHtcbiAgICAgICAgICB2YXIgaW5pdCA9IGV2dC5pbml0S2V5Ym9hcmRFdmVudCB8fCBldnQuaW5pdEtleUV2ZW50O1xuICAgICAgICAgIENvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgICAgICBjdHJsS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGFsdEtleTogZmFsc2UsXG4gICAgICAgICAgICBzaGlmdEtleTogZmFsc2UsXG4gICAgICAgICAgICBtZXRhS2V5OiBmYWxzZSxcbiAgICAgICAgICAgIGtleUNvZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNoYXJDb2RlOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpbml0KGV2ZW50VHlwZSwgcGFyYW1zLmJ1YmJsZXMgfHwgZmFsc2UsIHBhcmFtcy5jYW5jZWxhYmxlLCB3aW5kb3csIHBhcmFtcy5jdHJsS2V5LCBwYXJhbXMuYWx0S2V5LCBwYXJhbXMuc2hpZnRLZXksIHBhcmFtcy5tZXRhS2V5LCBwYXJhbXMua2V5Q29kZSwgcGFyYW1zLmNoYXJDb2RlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIGV2dC5pbml0RXZlbnQoZXZlbnRUeXBlLCBwYXJhbXMuYnViYmxlcyB8fCBmYWxzZSwgcGFyYW1zLmNhbmNlbGFibGUgfHwgdHJ1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ29tbW9uLmRlZmF1bHRzKGV2dCwgYXV4KTtcbiAgICBlbGVtLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgfSxcbiAgYmluZDogZnVuY3Rpb24gYmluZChlbGVtLCBldmVudCwgZnVuYywgbmV3Qm9vbCkge1xuICAgIHZhciBib29sID0gbmV3Qm9vbCB8fCBmYWxzZTtcbiAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgIH0gZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkge1xuICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuICB1bmJpbmQ6IGZ1bmN0aW9uIHVuYmluZChlbGVtLCBldmVudCwgZnVuYywgbmV3Qm9vbCkge1xuICAgIHZhciBib29sID0gbmV3Qm9vbCB8fCBmYWxzZTtcbiAgICBpZiAoZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMsIGJvb2wpO1xuICAgIH0gZWxzZSBpZiAoZWxlbS5kZXRhY2hFdmVudCkge1xuICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9LFxuICBhZGRDbGFzczogZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsZW0uY2xhc3NOYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICAgIH0gZWxzZSBpZiAoZWxlbS5jbGFzc05hbWUgIT09IGNsYXNzTmFtZSkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtLmNsYXNzTmFtZS5zcGxpdCgvICsvKTtcbiAgICAgIGlmIChjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGNsYXNzTmFtZSk7XG4gICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJykucmVwbGFjZSgvXlxccysvLCAnJykucmVwbGFjZSgvXFxzKyQvLCAnJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkb207XG4gIH0sXG4gIHJlbW92ZUNsYXNzOiBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICBpZiAoY2xhc3NOYW1lKSB7XG4gICAgICBpZiAoZWxlbS5jbGFzc05hbWUgPT09IGNsYXNzTmFtZSkge1xuICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gZWxlbS5jbGFzc05hbWUuc3BsaXQoLyArLyk7XG4gICAgICAgIHZhciBpbmRleCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY2xhc3Nlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbS5jbGFzc05hbWUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBkb207XG4gIH0sXG4gIGhhc0NsYXNzOiBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKD86XnxcXFxccyspJyArIGNsYXNzTmFtZSArICcoPzpcXFxccyt8JCknKS50ZXN0KGVsZW0uY2xhc3NOYW1lKSB8fCBmYWxzZTtcbiAgfSxcbiAgZ2V0V2lkdGg6IGZ1bmN0aW9uIGdldFdpZHRoKGVsZW0pIHtcbiAgICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICAgIHJldHVybiBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItbGVmdC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci1yaWdodC13aWR0aCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctbGVmdCddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ3BhZGRpbmctcmlnaHQnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlLndpZHRoKTtcbiAgfSxcbiAgZ2V0SGVpZ2h0OiBmdW5jdGlvbiBnZXRIZWlnaHQoZWxlbSkge1xuICAgIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbSk7XG4gICAgcmV0dXJuIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGVbJ2JvcmRlci10b3Atd2lkdGgnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydib3JkZXItYm90dG9tLXdpZHRoJ10pICsgY3NzVmFsdWVUb1BpeGVscyhzdHlsZVsncGFkZGluZy10b3AnXSkgKyBjc3NWYWx1ZVRvUGl4ZWxzKHN0eWxlWydwYWRkaW5nLWJvdHRvbSddKSArIGNzc1ZhbHVlVG9QaXhlbHMoc3R5bGUuaGVpZ2h0KTtcbiAgfSxcbiAgZ2V0T2Zmc2V0OiBmdW5jdGlvbiBnZXRPZmZzZXQoZWwpIHtcbiAgICB2YXIgZWxlbSA9IGVsO1xuICAgIHZhciBvZmZzZXQgPSB7IGxlZnQ6IDAsIHRvcDogMCB9O1xuICAgIGlmIChlbGVtLm9mZnNldFBhcmVudCkge1xuICAgICAgZG8ge1xuICAgICAgICBvZmZzZXQubGVmdCArPSBlbGVtLm9mZnNldExlZnQ7XG4gICAgICAgIG9mZnNldC50b3AgKz0gZWxlbS5vZmZzZXRUb3A7XG4gICAgICAgIGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudDtcbiAgICAgIH0gd2hpbGUgKGVsZW0pO1xuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9LFxuICBpc0FjdGl2ZTogZnVuY3Rpb24gaXNBY3RpdmUoZWxlbSkge1xuICAgIHJldHVybiBlbGVtID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIChlbGVtLnR5cGUgfHwgZWxlbS5ocmVmKTtcbiAgfVxufTtcblxudmFyIEJvb2xlYW5Db250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKEJvb2xlYW5Db250cm9sbGVyLCBfQ29udHJvbGxlcik7XG4gIGZ1bmN0aW9uIEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBCb29sZWFuQ29udHJvbGxlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKEJvb2xlYW5Db250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQm9vbGVhbkNvbnRyb2xsZXIpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcbiAgICB2YXIgX3RoaXMgPSBfdGhpczI7XG4gICAgX3RoaXMyLl9fcHJldiA9IF90aGlzMi5nZXRWYWx1ZSgpO1xuICAgIF90aGlzMi5fX2NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBfdGhpczIuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY2hlY2tib3gnKTtcbiAgICBmdW5jdGlvbiBvbkNoYW5nZSgpIHtcbiAgICAgIF90aGlzLnNldFZhbHVlKCFfdGhpcy5fX3ByZXYpO1xuICAgIH1cbiAgICBkb20uYmluZChfdGhpczIuX19jaGVja2JveCwgJ2NoYW5nZScsIG9uQ2hhbmdlLCBmYWxzZSk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fY2hlY2tib3gpO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhCb29sZWFuQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICdzZXRWYWx1ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFZhbHVlKHYpIHtcbiAgICAgIHZhciB0b1JldHVybiA9IGdldChCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihCb29sZWFuQ29udHJvbGxlci5wcm90b3R5cGUpLCAnc2V0VmFsdWUnLCB0aGlzKS5jYWxsKHRoaXMsIHYpO1xuICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fX3ByZXYgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICByZXR1cm4gdG9SZXR1cm47XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlRGlzcGxheScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZURpc3BsYXkoKSB7XG4gICAgICBpZiAodGhpcy5nZXRWYWx1ZSgpID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX19jaGVja2JveC5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xuICAgICAgICB0aGlzLl9fY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX19wcmV2ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX19jaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX19wcmV2ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0KEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEJvb2xlYW5Db250cm9sbGVyLnByb3RvdHlwZSksICd1cGRhdGVEaXNwbGF5JywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEJvb2xlYW5Db250cm9sbGVyO1xufShDb250cm9sbGVyKTtcblxudmFyIE9wdGlvbkNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoT3B0aW9uQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBPcHRpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIG9wdHMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBPcHRpb25Db250cm9sbGVyKTtcbiAgICB2YXIgX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoT3B0aW9uQ29udHJvbGxlci5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9wdGlvbkNvbnRyb2xsZXIpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHM7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5fX3NlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIGlmIChDb21tb24uaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgdmFyIG1hcCA9IHt9O1xuICAgICAgQ29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgbWFwW2VsZW1lbnRdID0gZWxlbWVudDtcbiAgICAgIH0pO1xuICAgICAgb3B0aW9ucyA9IG1hcDtcbiAgICB9XG4gICAgQ29tbW9uLmVhY2gob3B0aW9ucywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIHZhciBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdC5pbm5lckhUTUwgPSBrZXk7XG4gICAgICBvcHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcbiAgICAgIF90aGlzLl9fc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gICAgfSk7XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBkb20uYmluZChfdGhpczIuX19zZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGVzaXJlZFZhbHVlID0gdGhpcy5vcHRpb25zW3RoaXMuc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShkZXNpcmVkVmFsdWUpO1xuICAgIH0pO1xuICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX3NlbGVjdCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhPcHRpb25Db250cm9sbGVyLCBbe1xuICAgIGtleTogJ3NldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUodikge1xuICAgICAgdmFyIHRvUmV0dXJuID0gZ2V0KE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT3B0aW9uQ29udHJvbGxlci5wcm90b3R5cGUpLCAnc2V0VmFsdWUnLCB0aGlzKS5jYWxsKHRoaXMsIHYpO1xuICAgICAgaWYgKHRoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbCh0aGlzLCB0aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvUmV0dXJuO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgaWYgKGRvbS5pc0FjdGl2ZSh0aGlzLl9fc2VsZWN0KSkgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9fc2VsZWN0LnZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgcmV0dXJuIGdldChPcHRpb25Db250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9wdGlvbkNvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3VwZGF0ZURpc3BsYXknLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gT3B0aW9uQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbnZhciBTdHJpbmdDb250cm9sbGVyID0gZnVuY3Rpb24gKF9Db250cm9sbGVyKSB7XG4gIGluaGVyaXRzKFN0cmluZ0NvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcbiAgZnVuY3Rpb24gU3RyaW5nQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RyaW5nQ29udHJvbGxlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFN0cmluZ0NvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihTdHJpbmdDb250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKCkge1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19pbnB1dC52YWx1ZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9uQmx1cigpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIF90aGlzMi5fX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBfdGhpczIuX19pbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dCcpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5dXAnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faW5wdXQsICdibHVyJywgb25CbHVyKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgdGhpcy5ibHVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhTdHJpbmdDb250cm9sbGVyLCBbe1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgaWYgKCFkb20uaXNBY3RpdmUodGhpcy5fX2lucHV0KSkge1xuICAgICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0KFN0cmluZ0NvbnRyb2xsZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoU3RyaW5nQ29udHJvbGxlci5wcm90b3R5cGUpLCAndXBkYXRlRGlzcGxheScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBTdHJpbmdDb250cm9sbGVyO1xufShDb250cm9sbGVyKTtcblxuZnVuY3Rpb24gbnVtRGVjaW1hbHMoeCkge1xuICB2YXIgX3ggPSB4LnRvU3RyaW5nKCk7XG4gIGlmIChfeC5pbmRleE9mKCcuJykgPiAtMSkge1xuICAgIHJldHVybiBfeC5sZW5ndGggLSBfeC5pbmRleE9mKCcuJykgLSAxO1xuICB9XG4gIHJldHVybiAwO1xufVxudmFyIE51bWJlckNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlciwgX0NvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXIpO1xuICAgIHZhciBfdGhpcyA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE51bWJlckNvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOdW1iZXJDb250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgdmFyIF9wYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgX3RoaXMuX19taW4gPSBfcGFyYW1zLm1pbjtcbiAgICBfdGhpcy5fX21heCA9IF9wYXJhbXMubWF4O1xuICAgIF90aGlzLl9fc3RlcCA9IF9wYXJhbXMuc3RlcDtcbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKF90aGlzLl9fc3RlcCkpIHtcbiAgICAgIGlmIChfdGhpcy5pbml0aWFsVmFsdWUgPT09IDApIHtcbiAgICAgICAgX3RoaXMuX19pbXBsaWVkU3RlcCA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gTWF0aC5wb3coMTAsIE1hdGguZmxvb3IoTWF0aC5sb2coTWF0aC5hYnMoX3RoaXMuaW5pdGlhbFZhbHVlKSkgLyBNYXRoLkxOMTApKSAvIDEwO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpcy5fX2ltcGxpZWRTdGVwID0gX3RoaXMuX19zdGVwO1xuICAgIH1cbiAgICBfdGhpcy5fX3ByZWNpc2lvbiA9IG51bURlY2ltYWxzKF90aGlzLl9faW1wbGllZFN0ZXApO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICBjcmVhdGVDbGFzcyhOdW1iZXJDb250cm9sbGVyLCBbe1xuICAgIGtleTogJ3NldFZhbHVlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0VmFsdWUodikge1xuICAgICAgdmFyIF92ID0gdjtcbiAgICAgIGlmICh0aGlzLl9fbWluICE9PSB1bmRlZmluZWQgJiYgX3YgPCB0aGlzLl9fbWluKSB7XG4gICAgICAgIF92ID0gdGhpcy5fX21pbjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fX21heCAhPT0gdW5kZWZpbmVkICYmIF92ID4gdGhpcy5fX21heCkge1xuICAgICAgICBfdiA9IHRoaXMuX19tYXg7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fX3N0ZXAgIT09IHVuZGVmaW5lZCAmJiBfdiAlIHRoaXMuX19zdGVwICE9PSAwKSB7XG4gICAgICAgIF92ID0gTWF0aC5yb3VuZChfdiAvIHRoaXMuX19zdGVwKSAqIHRoaXMuX19zdGVwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldChOdW1iZXJDb250cm9sbGVyLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE51bWJlckNvbnRyb2xsZXIucHJvdG90eXBlKSwgJ3NldFZhbHVlJywgdGhpcykuY2FsbCh0aGlzLCBfdik7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbWluJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbWluKG1pblZhbHVlKSB7XG4gICAgICB0aGlzLl9fbWluID0gbWluVmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdtYXgnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtYXgobWF4VmFsdWUpIHtcbiAgICAgIHRoaXMuX19tYXggPSBtYXhWYWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0ZXAnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdGVwKHN0ZXBWYWx1ZSkge1xuICAgICAgdGhpcy5fX3N0ZXAgPSBzdGVwVmFsdWU7XG4gICAgICB0aGlzLl9faW1wbGllZFN0ZXAgPSBzdGVwVmFsdWU7XG4gICAgICB0aGlzLl9fcHJlY2lzaW9uID0gbnVtRGVjaW1hbHMoc3RlcFZhbHVlKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIHJvdW5kVG9EZWNpbWFsKHZhbHVlLCBkZWNpbWFscykge1xuICB2YXIgdGVuVG8gPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIHRlblRvKSAvIHRlblRvO1xufVxudmFyIE51bWJlckNvbnRyb2xsZXJCb3ggPSBmdW5jdGlvbiAoX051bWJlckNvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlckJveCwgX051bWJlckNvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyQm94KG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIE51bWJlckNvbnRyb2xsZXJCb3gpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChOdW1iZXJDb250cm9sbGVyQm94Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTnVtYmVyQ29udHJvbGxlckJveCkpLmNhbGwodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwgcGFyYW1zKSk7XG4gICAgX3RoaXMyLl9fdHJ1bmNhdGlvblN1c3BlbmRlZCA9IGZhbHNlO1xuICAgIHZhciBfdGhpcyA9IF90aGlzMjtcbiAgICB2YXIgcHJldlkgPSB2b2lkIDA7XG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoKSB7XG4gICAgICB2YXIgYXR0ZW1wdGVkID0gcGFyc2VGbG9hdChfdGhpcy5fX2lucHV0LnZhbHVlKTtcbiAgICAgIGlmICghQ29tbW9uLmlzTmFOKGF0dGVtcHRlZCkpIHtcbiAgICAgICAgX3RoaXMuc2V0VmFsdWUoYXR0ZW1wdGVkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gb25GaW5pc2goKSB7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICBvbkZpbmlzaCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlRHJhZyhlKSB7XG4gICAgICB2YXIgZGlmZiA9IHByZXZZIC0gZS5jbGllbnRZO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuZ2V0VmFsdWUoKSArIGRpZmYgKiBfdGhpcy5fX2ltcGxpZWRTdGVwKTtcbiAgICAgIHByZXZZID0gZS5jbGllbnRZO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBvbkZpbmlzaCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlRG93bihlKSB7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBvbk1vdXNlRHJhZyk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZXVwJywgb25Nb3VzZVVwKTtcbiAgICAgIHByZXZZID0gZS5jbGllbnRZO1xuICAgIH1cbiAgICBfdGhpczIuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgX3RoaXMyLl9faW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAnbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBfdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmJsdXIoKTtcbiAgICAgICAgX3RoaXMuX190cnVuY2F0aW9uU3VzcGVuZGVkID0gZmFsc2U7XG4gICAgICAgIG9uRmluaXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XG4gICAgcmV0dXJuIF90aGlzMjtcbiAgfVxuICBjcmVhdGVDbGFzcyhOdW1iZXJDb250cm9sbGVyQm94LCBbe1xuICAgIGtleTogJ3VwZGF0ZURpc3BsYXknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVEaXNwbGF5KCkge1xuICAgICAgdGhpcy5fX2lucHV0LnZhbHVlID0gdGhpcy5fX3RydW5jYXRpb25TdXNwZW5kZWQgPyB0aGlzLmdldFZhbHVlKCkgOiByb3VuZFRvRGVjaW1hbCh0aGlzLmdldFZhbHVlKCksIHRoaXMuX19wcmVjaXNpb24pO1xuICAgICAgcmV0dXJuIGdldChOdW1iZXJDb250cm9sbGVyQm94LnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE51bWJlckNvbnRyb2xsZXJCb3gucHJvdG90eXBlKSwgJ3VwZGF0ZURpc3BsYXknLCB0aGlzKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTnVtYmVyQ29udHJvbGxlckJveDtcbn0oTnVtYmVyQ29udHJvbGxlcik7XG5cbmZ1bmN0aW9uIG1hcCh2LCBpMSwgaTIsIG8xLCBvMikge1xuICByZXR1cm4gbzEgKyAobzIgLSBvMSkgKiAoKHYgLSBpMSkgLyAoaTIgLSBpMSkpO1xufVxudmFyIE51bWJlckNvbnRyb2xsZXJTbGlkZXIgPSBmdW5jdGlvbiAoX051bWJlckNvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoTnVtYmVyQ29udHJvbGxlclNsaWRlciwgX051bWJlckNvbnRyb2xsZXIpO1xuICBmdW5jdGlvbiBOdW1iZXJDb250cm9sbGVyU2xpZGVyKG9iamVjdCwgcHJvcGVydHksIG1pbiwgbWF4LCBzdGVwKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgTnVtYmVyQ29udHJvbGxlclNsaWRlcik7XG4gICAgdmFyIF90aGlzMiA9IHBvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE51bWJlckNvbnRyb2xsZXJTbGlkZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihOdW1iZXJDb250cm9sbGVyU2xpZGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogbWluLCBtYXg6IG1heCwgc3RlcDogc3RlcCB9KSk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5fX2JhY2tncm91bmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19mb3JlZ3JvdW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fYmFja2dyb3VuZCwgJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19iYWNrZ3JvdW5kLCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCk7XG4gICAgZG9tLmFkZENsYXNzKF90aGlzMi5fX2JhY2tncm91bmQsICdzbGlkZXInKTtcbiAgICBkb20uYWRkQ2xhc3MoX3RoaXMyLl9fZm9yZWdyb3VuZCwgJ3NsaWRlci1mZycpO1xuICAgIGZ1bmN0aW9uIG9uTW91c2VEb3duKGUpIHtcbiAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgb25Nb3VzZURyYWcpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBvbk1vdXNlRHJhZyhlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Nb3VzZURyYWcoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdmFyIGJnUmVjdCA9IF90aGlzLl9fYmFja2dyb3VuZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIF90aGlzLnNldFZhbHVlKG1hcChlLmNsaWVudFgsIGJnUmVjdC5sZWZ0LCBiZ1JlY3QucmlnaHQsIF90aGlzLl9fbWluLCBfdGhpcy5fX21heCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbk1vdXNlVXAoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIG9uTW91c2VEcmFnKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIG9uTW91c2VVcCk7XG4gICAgICBpZiAoX3RoaXMuX19vbkZpbmlzaENoYW5nZSkge1xuICAgICAgICBfdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwoX3RoaXMsIF90aGlzLmdldFZhbHVlKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvblRvdWNoU3RhcnQoZSkge1xuICAgICAgaWYgKGUudG91Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZG9tLmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbiAgICAgIG9uVG91Y2hNb3ZlKGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICB2YXIgY2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgICAgdmFyIGJnUmVjdCA9IF90aGlzLl9fYmFja2dyb3VuZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIF90aGlzLnNldFZhbHVlKG1hcChjbGllbnRYLCBiZ1JlY3QubGVmdCwgYmdSZWN0LnJpZ2h0LCBfdGhpcy5fX21pbiwgX3RoaXMuX19tYXgpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25Ub3VjaEVuZCgpIHtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd0b3VjaGVuZCcsIG9uVG91Y2hFbmQpO1xuICAgICAgaWYgKF90aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgX3RoaXMuX19vbkZpbmlzaENoYW5nZS5jYWxsKF90aGlzLCBfdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgX3RoaXMyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICBfdGhpczIuX19iYWNrZ3JvdW5kLmFwcGVuZENoaWxkKF90aGlzMi5fX2ZvcmVncm91bmQpO1xuICAgIF90aGlzMi5kb21FbGVtZW50LmFwcGVuZENoaWxkKF90aGlzMi5fX2JhY2tncm91bmQpO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoTnVtYmVyQ29udHJvbGxlclNsaWRlciwgW3tcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIHZhciBwY3QgPSAodGhpcy5nZXRWYWx1ZSgpIC0gdGhpcy5fX21pbikgLyAodGhpcy5fX21heCAtIHRoaXMuX19taW4pO1xuICAgICAgdGhpcy5fX2ZvcmVncm91bmQuc3R5bGUud2lkdGggPSBwY3QgKiAxMDAgKyAnJSc7XG4gICAgICByZXR1cm4gZ2V0KE51bWJlckNvbnRyb2xsZXJTbGlkZXIucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTnVtYmVyQ29udHJvbGxlclNsaWRlci5wcm90b3R5cGUpLCAndXBkYXRlRGlzcGxheScsIHRoaXMpLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBOdW1iZXJDb250cm9sbGVyU2xpZGVyO1xufShOdW1iZXJDb250cm9sbGVyKTtcblxudmFyIEZ1bmN0aW9uQ29udHJvbGxlciA9IGZ1bmN0aW9uIChfQ29udHJvbGxlcikge1xuICBpbmhlcml0cyhGdW5jdGlvbkNvbnRyb2xsZXIsIF9Db250cm9sbGVyKTtcbiAgZnVuY3Rpb24gRnVuY3Rpb25Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHksIHRleHQpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBGdW5jdGlvbkNvbnRyb2xsZXIpO1xuICAgIHZhciBfdGhpczIgPSBwb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChGdW5jdGlvbkNvbnRyb2xsZXIuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihGdW5jdGlvbkNvbnRyb2xsZXIpKS5jYWxsKHRoaXMsIG9iamVjdCwgcHJvcGVydHkpKTtcbiAgICB2YXIgX3RoaXMgPSBfdGhpczI7XG4gICAgX3RoaXMyLl9fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fYnV0dG9uLmlubmVySFRNTCA9IHRleHQgPT09IHVuZGVmaW5lZCA/ICdGaXJlJyA6IHRleHQ7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fYnV0dG9uLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgX3RoaXMuZmlyZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIGRvbS5hZGRDbGFzcyhfdGhpczIuX19idXR0b24sICdidXR0b24nKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19idXR0b24pO1xuICAgIHJldHVybiBfdGhpczI7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoRnVuY3Rpb25Db250cm9sbGVyLCBbe1xuICAgIGtleTogJ2ZpcmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaXJlKCkge1xuICAgICAgaWYgKHRoaXMuX19vbkNoYW5nZSkge1xuICAgICAgICB0aGlzLl9fb25DaGFuZ2UuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZ2V0VmFsdWUoKS5jYWxsKHRoaXMub2JqZWN0KTtcbiAgICAgIGlmICh0aGlzLl9fb25GaW5pc2hDaGFuZ2UpIHtcbiAgICAgICAgdGhpcy5fX29uRmluaXNoQ2hhbmdlLmNhbGwodGhpcywgdGhpcy5nZXRWYWx1ZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIEZ1bmN0aW9uQ29udHJvbGxlcjtcbn0oQ29udHJvbGxlcik7XG5cbnZhciBDb2xvckNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoX0NvbnRyb2xsZXIpIHtcbiAgaW5oZXJpdHMoQ29sb3JDb250cm9sbGVyLCBfQ29udHJvbGxlcik7XG4gIGZ1bmN0aW9uIENvbG9yQ29udHJvbGxlcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29sb3JDb250cm9sbGVyKTtcbiAgICB2YXIgX3RoaXMyID0gcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ29sb3JDb250cm9sbGVyLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29sb3JDb250cm9sbGVyKSkuY2FsbCh0aGlzLCBvYmplY3QsIHByb3BlcnR5KSk7XG4gICAgX3RoaXMyLl9fY29sb3IgPSBuZXcgQ29sb3IoX3RoaXMyLmdldFZhbHVlKCkpO1xuICAgIF90aGlzMi5fX3RlbXAgPSBuZXcgQ29sb3IoMCk7XG4gICAgdmFyIF90aGlzID0gX3RoaXMyO1xuICAgIF90aGlzMi5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9tLm1ha2VTZWxlY3RhYmxlKF90aGlzMi5kb21FbGVtZW50LCBmYWxzZSk7XG4gICAgX3RoaXMyLl9fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19zZWxlY3Rvci5jbGFzc05hbWUgPSAnc2VsZWN0b3InO1xuICAgIF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLmNsYXNzTmFtZSA9ICdzYXR1cmF0aW9uLWZpZWxkJztcbiAgICBfdGhpczIuX19maWVsZF9rbm9iID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgX3RoaXMyLl9fZmllbGRfa25vYi5jbGFzc05hbWUgPSAnZmllbGQta25vYic7XG4gICAgX3RoaXMyLl9fZmllbGRfa25vYl9ib3JkZXIgPSAnMnB4IHNvbGlkICc7XG4gICAgX3RoaXMyLl9faHVlX2tub2IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBfdGhpczIuX19odWVfa25vYi5jbGFzc05hbWUgPSAnaHVlLWtub2InO1xuICAgIF90aGlzMi5fX2h1ZV9maWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIF90aGlzMi5fX2h1ZV9maWVsZC5jbGFzc05hbWUgPSAnaHVlLWZpZWxkJztcbiAgICBfdGhpczIuX19pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgX3RoaXMyLl9faW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICBfdGhpczIuX19pbnB1dF90ZXh0U2hhZG93ID0gJzAgMXB4IDFweCAnO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX2lucHV0LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICBvbkJsdXIuY2FsbCh0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBkb20uYmluZChfdGhpczIuX19pbnB1dCwgJ2JsdXInLCBvbkJsdXIpO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NlbGVjdG9yLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKCkgICAgICAgIHtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLCAnZHJhZycpLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZ1bmN0aW9uICgpICAgICAgICB7XG4gICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3NlbGVjdG9yLCAnZHJhZycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9fc2VsZWN0b3IsICd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKCkgICAgICAgIHtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLCAnZHJhZycpLmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmdW5jdGlvbiAoKSAgICAgICAge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoX3RoaXMuX19zZWxlY3RvciwgJ2RyYWcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZUZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19zZWxlY3Rvci5zdHlsZSwge1xuICAgICAgd2lkdGg6ICcxMjJweCcsXG4gICAgICBoZWlnaHQ6ICcxMDJweCcsXG4gICAgICBwYWRkaW5nOiAnM3B4JyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyMjInLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjMpJ1xuICAgIH0pO1xuICAgIENvbW1vbi5leHRlbmQoX3RoaXMyLl9fZmllbGRfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzEycHgnLFxuICAgICAgaGVpZ2h0OiAnMTJweCcsXG4gICAgICBib3JkZXI6IF90aGlzMi5fX2ZpZWxkX2tub2JfYm9yZGVyICsgKF90aGlzMi5fX2NvbG9yLnYgPCAwLjUgPyAnI2ZmZicgOiAnIzAwMCcpLFxuICAgICAgYm94U2hhZG93OiAnMHB4IDFweCAzcHggcmdiYSgwLDAsMCwwLjUpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19odWVfa25vYi5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB3aWR0aDogJzE1cHgnLFxuICAgICAgaGVpZ2h0OiAnMnB4JyxcbiAgICAgIGJvcmRlclJpZ2h0OiAnNHB4IHNvbGlkICNmZmYnLFxuICAgICAgekluZGV4OiAxXG4gICAgfSk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLnN0eWxlLCB7XG4gICAgICB3aWR0aDogJzEwMHB4JyxcbiAgICAgIGhlaWdodDogJzEwMHB4JyxcbiAgICAgIGJvcmRlcjogJzFweCBzb2xpZCAjNTU1JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnM3B4JyxcbiAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICB9KTtcbiAgICBDb21tb24uZXh0ZW5kKHZhbHVlRmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgIH0pO1xuICAgIGxpbmVhckdyYWRpZW50KHZhbHVlRmllbGQsICd0b3AnLCAncmdiYSgwLDAsMCwwKScsICcjMDAwJyk7XG4gICAgQ29tbW9uLmV4dGVuZChfdGhpczIuX19odWVfZmllbGQuc3R5bGUsIHtcbiAgICAgIHdpZHRoOiAnMTVweCcsXG4gICAgICBoZWlnaHQ6ICcxMDBweCcsXG4gICAgICBib3JkZXI6ICcxcHggc29saWQgIzU1NScsXG4gICAgICBjdXJzb3I6ICducy1yZXNpemUnLFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICB0b3A6ICczcHgnLFxuICAgICAgcmlnaHQ6ICczcHgnXG4gICAgfSk7XG4gICAgaHVlR3JhZGllbnQoX3RoaXMyLl9faHVlX2ZpZWxkKTtcbiAgICBDb21tb24uZXh0ZW5kKF90aGlzMi5fX2lucHV0LnN0eWxlLCB7XG4gICAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgIGJvcmRlcjogMCxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIHRleHRTaGFkb3c6IF90aGlzMi5fX2lucHV0X3RleHRTaGFkb3cgKyAncmdiYSgwLDAsMCwwLjcpJ1xuICAgIH0pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQsICdtb3VzZWRvd24nLCBmaWVsZERvd24pO1xuICAgIGRvbS5iaW5kKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQsICd0b3VjaHN0YXJ0JywgZmllbGREb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19maWVsZF9rbm9iLCAnbW91c2Vkb3duJywgZmllbGREb3duKTtcbiAgICBkb20uYmluZChfdGhpczIuX19maWVsZF9rbm9iLCAndG91Y2hzdGFydCcsIGZpZWxkRG93bik7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faHVlX2ZpZWxkLCAnbW91c2Vkb3duJywgZmllbGREb3duSCk7XG4gICAgZG9tLmJpbmQoX3RoaXMyLl9faHVlX2ZpZWxkLCAndG91Y2hzdGFydCcsIGZpZWxkRG93bkgpO1xuICAgIGZ1bmN0aW9uIGZpZWxkRG93bihlKSB7XG4gICAgICBzZXRTVihlKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmaWVsZFVwU1YpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmaWVsZFVwU1YpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaWVsZERvd25IKGUpIHtcbiAgICAgIHNldEgoZSk7XG4gICAgICBkb20uYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNobW92ZScsIHNldEgpO1xuICAgICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBIKTtcbiAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZmllbGRVcEgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaWVsZFVwU1YoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2htb3ZlJywgc2V0U1YpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZmllbGRVcFNWKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmaWVsZFVwU1YpO1xuICAgICAgb25GaW5pc2goKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmllbGRVcEgoKSB7XG4gICAgICBkb20udW5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIHNldEgpO1xuICAgICAgZG9tLnVuYmluZCh3aW5kb3csICd0b3VjaG1vdmUnLCBzZXRIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZpZWxkVXBIKTtcbiAgICAgIGRvbS51bmJpbmQod2luZG93LCAndG91Y2hlbmQnLCBmaWVsZFVwSCk7XG4gICAgICBvbkZpbmlzaCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkJsdXIoKSB7XG4gICAgICB2YXIgaSA9IGludGVycHJldCh0aGlzLnZhbHVlKTtcbiAgICAgIGlmIChpICE9PSBmYWxzZSkge1xuICAgICAgICBfdGhpcy5fX2NvbG9yLl9fc3RhdGUgPSBpO1xuICAgICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlID0gX3RoaXMuX19jb2xvci50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBvbkZpbmlzaCgpIHtcbiAgICAgIGlmIChfdGhpcy5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIF90aGlzLl9fb25GaW5pc2hDaGFuZ2UuY2FsbChfdGhpcywgX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICBfdGhpczIuX19zYXR1cmF0aW9uX2ZpZWxkLmFwcGVuZENoaWxkKHZhbHVlRmllbGQpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX2ZpZWxkX2tub2IpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX3NhdHVyYXRpb25fZmllbGQpO1xuICAgIF90aGlzMi5fX3NlbGVjdG9yLmFwcGVuZENoaWxkKF90aGlzMi5fX2h1ZV9maWVsZCk7XG4gICAgX3RoaXMyLl9faHVlX2ZpZWxkLmFwcGVuZENoaWxkKF90aGlzMi5fX2h1ZV9rbm9iKTtcbiAgICBfdGhpczIuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChfdGhpczIuX19pbnB1dCk7XG4gICAgX3RoaXMyLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQoX3RoaXMyLl9fc2VsZWN0b3IpO1xuICAgIF90aGlzMi51cGRhdGVEaXNwbGF5KCk7XG4gICAgZnVuY3Rpb24gc2V0U1YoZSkge1xuICAgICAgaWYgKGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAtMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICB2YXIgZmllbGRSZWN0ID0gX3RoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIF9yZWYgPSBlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdIHx8IGUsXG4gICAgICAgICAgY2xpZW50WCA9IF9yZWYuY2xpZW50WCxcbiAgICAgICAgICBjbGllbnRZID0gX3JlZi5jbGllbnRZO1xuICAgICAgdmFyIHMgPSAoY2xpZW50WCAtIGZpZWxkUmVjdC5sZWZ0KSAvIChmaWVsZFJlY3QucmlnaHQgLSBmaWVsZFJlY3QubGVmdCk7XG4gICAgICB2YXIgdiA9IDEgLSAoY2xpZW50WSAtIGZpZWxkUmVjdC50b3ApIC8gKGZpZWxkUmVjdC5ib3R0b20gLSBmaWVsZFJlY3QudG9wKTtcbiAgICAgIGlmICh2ID4gMSkge1xuICAgICAgICB2ID0gMTtcbiAgICAgIH0gZWxzZSBpZiAodiA8IDApIHtcbiAgICAgICAgdiA9IDA7XG4gICAgICB9XG4gICAgICBpZiAocyA+IDEpIHtcbiAgICAgICAgcyA9IDE7XG4gICAgICB9IGVsc2UgaWYgKHMgPCAwKSB7XG4gICAgICAgIHMgPSAwO1xuICAgICAgfVxuICAgICAgX3RoaXMuX19jb2xvci52ID0gdjtcbiAgICAgIF90aGlzLl9fY29sb3IucyA9IHM7XG4gICAgICBfdGhpcy5zZXRWYWx1ZShfdGhpcy5fX2NvbG9yLnRvT3JpZ2luYWwoKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldEgoZSkge1xuICAgICAgaWYgKGUudHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAtMSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICB2YXIgZmllbGRSZWN0ID0gX3RoaXMuX19odWVfZmllbGQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgX3JlZjIgPSBlLnRvdWNoZXMgJiYgZS50b3VjaGVzWzBdIHx8IGUsXG4gICAgICAgICAgY2xpZW50WSA9IF9yZWYyLmNsaWVudFk7XG4gICAgICB2YXIgaCA9IDEgLSAoY2xpZW50WSAtIGZpZWxkUmVjdC50b3ApIC8gKGZpZWxkUmVjdC5ib3R0b20gLSBmaWVsZFJlY3QudG9wKTtcbiAgICAgIGlmIChoID4gMSkge1xuICAgICAgICBoID0gMTtcbiAgICAgIH0gZWxzZSBpZiAoaCA8IDApIHtcbiAgICAgICAgaCA9IDA7XG4gICAgICB9XG4gICAgICBfdGhpcy5fX2NvbG9yLmggPSBoICogMzYwO1xuICAgICAgX3RoaXMuc2V0VmFsdWUoX3RoaXMuX19jb2xvci50b09yaWdpbmFsKCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXMyO1xuICB9XG4gIGNyZWF0ZUNsYXNzKENvbG9yQ29udHJvbGxlciwgW3tcbiAgICBrZXk6ICd1cGRhdGVEaXNwbGF5JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICAgIHZhciBpID0gaW50ZXJwcmV0KHRoaXMuZ2V0VmFsdWUoKSk7XG4gICAgICBpZiAoaSAhPT0gZmFsc2UpIHtcbiAgICAgICAgdmFyIG1pc21hdGNoID0gZmFsc2U7XG4gICAgICAgIENvbW1vbi5lYWNoKENvbG9yLkNPTVBPTkVOVFMsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgICBpZiAoIUNvbW1vbi5pc1VuZGVmaW5lZChpW2NvbXBvbmVudF0pICYmICFDb21tb24uaXNVbmRlZmluZWQodGhpcy5fX2NvbG9yLl9fc3RhdGVbY29tcG9uZW50XSkgJiYgaVtjb21wb25lbnRdICE9PSB0aGlzLl9fY29sb3IuX19zdGF0ZVtjb21wb25lbnRdKSB7XG4gICAgICAgICAgICBtaXNtYXRjaCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgaWYgKG1pc21hdGNoKSB7XG4gICAgICAgICAgQ29tbW9uLmV4dGVuZCh0aGlzLl9fY29sb3IuX19zdGF0ZSwgaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIENvbW1vbi5leHRlbmQodGhpcy5fX3RlbXAuX19zdGF0ZSwgdGhpcy5fX2NvbG9yLl9fc3RhdGUpO1xuICAgICAgdGhpcy5fX3RlbXAuYSA9IDE7XG4gICAgICB2YXIgZmxpcCA9IHRoaXMuX19jb2xvci52IDwgMC41IHx8IHRoaXMuX19jb2xvci5zID4gMC41ID8gMjU1IDogMDtcbiAgICAgIHZhciBfZmxpcCA9IDI1NSAtIGZsaXA7XG4gICAgICBDb21tb24uZXh0ZW5kKHRoaXMuX19maWVsZF9rbm9iLnN0eWxlLCB7XG4gICAgICAgIG1hcmdpbkxlZnQ6IDEwMCAqIHRoaXMuX19jb2xvci5zIC0gNyArICdweCcsXG4gICAgICAgIG1hcmdpblRvcDogMTAwICogKDEgLSB0aGlzLl9fY29sb3IudikgLSA3ICsgJ3B4JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLl9fdGVtcC50b0hleFN0cmluZygpLFxuICAgICAgICBib3JkZXI6IHRoaXMuX19maWVsZF9rbm9iX2JvcmRlciArICdyZ2IoJyArIGZsaXAgKyAnLCcgKyBmbGlwICsgJywnICsgZmxpcCArICcpJ1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9faHVlX2tub2Iuc3R5bGUubWFyZ2luVG9wID0gKDEgLSB0aGlzLl9fY29sb3IuaCAvIDM2MCkgKiAxMDAgKyAncHgnO1xuICAgICAgdGhpcy5fX3RlbXAucyA9IDE7XG4gICAgICB0aGlzLl9fdGVtcC52ID0gMTtcbiAgICAgIGxpbmVhckdyYWRpZW50KHRoaXMuX19zYXR1cmF0aW9uX2ZpZWxkLCAnbGVmdCcsICcjZmZmJywgdGhpcy5fX3RlbXAudG9IZXhTdHJpbmcoKSk7XG4gICAgICB0aGlzLl9faW5wdXQudmFsdWUgPSB0aGlzLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIENvbW1vbi5leHRlbmQodGhpcy5fX2lucHV0LnN0eWxlLCB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5fX2NvbG9yLnRvSGV4U3RyaW5nKCksXG4gICAgICAgIGNvbG9yOiAncmdiKCcgKyBmbGlwICsgJywnICsgZmxpcCArICcsJyArIGZsaXAgKyAnKScsXG4gICAgICAgIHRleHRTaGFkb3c6IHRoaXMuX19pbnB1dF90ZXh0U2hhZG93ICsgJ3JnYmEoJyArIF9mbGlwICsgJywnICsgX2ZsaXAgKyAnLCcgKyBfZmxpcCArICcsLjcpJ1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBDb2xvckNvbnRyb2xsZXI7XG59KENvbnRyb2xsZXIpO1xudmFyIHZlbmRvcnMgPSBbJy1tb3otJywgJy1vLScsICctd2Via2l0LScsICctbXMtJywgJyddO1xuZnVuY3Rpb24gbGluZWFyR3JhZGllbnQoZWxlbSwgeCwgYSwgYikge1xuICBlbGVtLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgQ29tbW9uLmVhY2godmVuZG9ycywgZnVuY3Rpb24gKHZlbmRvcikge1xuICAgIGVsZW0uc3R5bGUuY3NzVGV4dCArPSAnYmFja2dyb3VuZDogJyArIHZlbmRvciArICdsaW5lYXItZ3JhZGllbnQoJyArIHggKyAnLCAnICsgYSArICcgMCUsICcgKyBiICsgJyAxMDAlKTsgJztcbiAgfSk7XG59XG5mdW5jdGlvbiBodWVHcmFkaWVudChlbGVtKSB7XG4gIGVsZW0uc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsICNmZjAwZmYgMTclLCAjMDAwMGZmIDM0JSwgIzAwZmZmZiA1MCUsICMwMGZmMDAgNjclLCAjZmZmZjAwIDg0JSwgI2ZmMDAwMCAxMDAlKTsnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7JztcbiAgZWxlbS5zdHlsZS5jc3NUZXh0ICs9ICdiYWNrZ3JvdW5kOiAtbXMtbGluZWFyLWdyYWRpZW50KHRvcCwgICNmZjAwMDAgMCUsI2ZmMDBmZiAxNyUsIzAwMDBmZiAzNCUsIzAwZmZmZiA1MCUsIzAwZmYwMCA2NyUsI2ZmZmYwMCA4NCUsI2ZmMDAwMCAxMDAlKTsnO1xuICBlbGVtLnN0eWxlLmNzc1RleHQgKz0gJ2JhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0b3AsICAjZmYwMDAwIDAlLCNmZjAwZmYgMTclLCMwMDAwZmYgMzQlLCMwMGZmZmYgNTAlLCMwMGZmMDAgNjclLCNmZmZmMDAgODQlLCNmZjAwMDAgMTAwJSk7Jztcbn1cblxudmFyIGNzcyA9IHtcbiAgbG9hZDogZnVuY3Rpb24gbG9hZCh1cmwsIGluZG9jKSB7XG4gICAgdmFyIGRvYyA9IGluZG9jIHx8IGRvY3VtZW50O1xuICAgIHZhciBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgfSxcbiAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoY3NzQ29udGVudCwgaW5kb2MpIHtcbiAgICB2YXIgZG9jID0gaW5kb2MgfHwgZG9jdW1lbnQ7XG4gICAgdmFyIGluamVjdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBpbmplY3RlZC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBpbmplY3RlZC5pbm5lckhUTUwgPSBjc3NDb250ZW50O1xuICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgdHJ5IHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoaW5qZWN0ZWQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBzYXZlRGlhbG9nQ29udGVudHMgPSBcIjxkaXYgaWQ9XFxcImRnLXNhdmVcXFwiIGNsYXNzPVxcXCJkZyBkaWFsb2d1ZVxcXCI+XFxuXFxuICBIZXJlJ3MgdGhlIG5ldyBsb2FkIHBhcmFtZXRlciBmb3IgeW91ciA8Y29kZT5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3I6XFxuXFxuICA8dGV4dGFyZWEgaWQ9XFxcImRnLW5ldy1jb25zdHJ1Y3RvclxcXCI+PC90ZXh0YXJlYT5cXG5cXG4gIDxkaXYgaWQ9XFxcImRnLXNhdmUtbG9jYWxseVxcXCI+XFxuXFxuICAgIDxpbnB1dCBpZD1cXFwiZGctbG9jYWwtc3RvcmFnZVxcXCIgdHlwZT1cXFwiY2hlY2tib3hcXFwiLz4gQXV0b21hdGljYWxseSBzYXZlXFxuICAgIHZhbHVlcyB0byA8Y29kZT5sb2NhbFN0b3JhZ2U8L2NvZGU+IG9uIGV4aXQuXFxuXFxuICAgIDxkaXYgaWQ9XFxcImRnLWxvY2FsLWV4cGxhaW5cXFwiPlRoZSB2YWx1ZXMgc2F2ZWQgdG8gPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiB3aWxsXFxuICAgICAgb3ZlcnJpZGUgdGhvc2UgcGFzc2VkIHRvIDxjb2RlPmRhdC5HVUk8L2NvZGU+J3MgY29uc3RydWN0b3IuIFRoaXMgbWFrZXMgaXRcXG4gICAgICBlYXNpZXIgdG8gd29yayBpbmNyZW1lbnRhbGx5LCBidXQgPGNvZGU+bG9jYWxTdG9yYWdlPC9jb2RlPiBpcyBmcmFnaWxlLFxcbiAgICAgIGFuZCB5b3VyIGZyaWVuZHMgbWF5IG5vdCBzZWUgdGhlIHNhbWUgdmFsdWVzIHlvdSBkby5cXG5cXG4gICAgPC9kaXY+XFxuXFxuICA8L2Rpdj5cXG5cXG48L2Rpdj5cIjtcblxudmFyIENvbnRyb2xsZXJGYWN0b3J5ID0gZnVuY3Rpb24gQ29udHJvbGxlckZhY3Rvcnkob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB2YXIgaW5pdGlhbFZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgaWYgKENvbW1vbi5pc0FycmF5KGFyZ3VtZW50c1syXSkgfHwgQ29tbW9uLmlzT2JqZWN0KGFyZ3VtZW50c1syXSkpIHtcbiAgICByZXR1cm4gbmV3IE9wdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdKTtcbiAgfVxuICBpZiAoQ29tbW9uLmlzTnVtYmVyKGluaXRpYWxWYWx1ZSkpIHtcbiAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkgJiYgQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1szXSkpIHtcbiAgICAgIGlmIChDb21tb24uaXNOdW1iZXIoYXJndW1lbnRzWzRdKSkge1xuICAgICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJTbGlkZXIob2JqZWN0LCBwcm9wZXJ0eSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10pO1xuICAgIH1cbiAgICBpZiAoQ29tbW9uLmlzTnVtYmVyKGFyZ3VtZW50c1s0XSkpIHtcbiAgICAgIHJldHVybiBuZXcgTnVtYmVyQ29udHJvbGxlckJveChvYmplY3QsIHByb3BlcnR5LCB7IG1pbjogYXJndW1lbnRzWzJdLCBtYXg6IGFyZ3VtZW50c1szXSwgc3RlcDogYXJndW1lbnRzWzRdIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE51bWJlckNvbnRyb2xsZXJCb3gob2JqZWN0LCBwcm9wZXJ0eSwgeyBtaW46IGFyZ3VtZW50c1syXSwgbWF4OiBhcmd1bWVudHNbM10gfSk7XG4gIH1cbiAgaWYgKENvbW1vbi5pc1N0cmluZyhpbml0aWFsVmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBTdHJpbmdDb250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICB9XG4gIGlmIChDb21tb24uaXNGdW5jdGlvbihpbml0aWFsVmFsdWUpKSB7XG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbkNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSwgJycpO1xuICB9XG4gIGlmIChDb21tb24uaXNCb29sZWFuKGluaXRpYWxWYWx1ZSkpIHtcbiAgICByZXR1cm4gbmV3IEJvb2xlYW5Db250cm9sbGVyKG9iamVjdCwgcHJvcGVydHkpO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gIHNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG59XG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG52YXIgQ2VudGVyZWREaXYgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENlbnRlcmVkRGl2KCkge1xuICAgIGNsYXNzQ2FsbENoZWNrKHRoaXMsIENlbnRlcmVkRGl2KTtcbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgQ29tbW9uLmV4dGVuZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLCB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsMCwwLDAuOCknLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzEwMDAnLFxuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIFdlYmtpdFRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJyxcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgbGluZWFyJ1xuICAgIH0pO1xuICAgIGRvbS5tYWtlRnVsbHNjcmVlbih0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICB0aGlzLmJhY2tncm91bmRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBDb21tb24uZXh0ZW5kKHRoaXMuZG9tRWxlbWVudC5zdHlsZSwge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgICB6SW5kZXg6ICcxMDAxJyxcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICBXZWJraXRUcmFuc2l0aW9uOiAnLXdlYmtpdC10cmFuc2Zvcm0gMC4ycyBlYXNlLW91dCwgb3BhY2l0eSAwLjJzIGxpbmVhcicsXG4gICAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuMnMgZWFzZS1vdXQsIG9wYWNpdHkgMC4ycyBsaW5lYXInXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuZG9tRWxlbWVudCk7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBkb20uYmluZCh0aGlzLmJhY2tncm91bmRFbGVtZW50LCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5oaWRlKCk7XG4gICAgfSk7XG4gIH1cbiAgY3JlYXRlQ2xhc3MoQ2VudGVyZWREaXYsIFt7XG4gICAga2V5OiAnc2hvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgICB0aGlzLmxheW91dCgpO1xuICAgICAgQ29tbW9uLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuYmFja2dyb3VuZEVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIF90aGlzLmRvbUVsZW1lbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDEpJztcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgIHZhciBoaWRlID0gZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgICAgX3RoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb20udW5iaW5kKF90aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICAgIGRvbS51bmJpbmQoX3RoaXMuZG9tRWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnLCBoaWRlKTtcbiAgICAgICAgZG9tLnVuYmluZChfdGhpcy5kb21FbGVtZW50LCAnb1RyYW5zaXRpb25FbmQnLCBoaWRlKTtcbiAgICAgIH07XG4gICAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgaGlkZSk7XG4gICAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJywgaGlkZSk7XG4gICAgICBkb20uYmluZCh0aGlzLmRvbUVsZW1lbnQsICdvVHJhbnNpdGlvbkVuZCcsIGhpZGUpO1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMS4xKSc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbGF5b3V0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbGF5b3V0KCkge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLmxlZnQgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDIgLSBkb20uZ2V0V2lkdGgodGhpcy5kb21FbGVtZW50KSAvIDIgKyAncHgnO1xuICAgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlLnRvcCA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSBkb20uZ2V0SGVpZ2h0KHRoaXMuZG9tRWxlbWVudCkgLyAyICsgJ3B4JztcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIENlbnRlcmVkRGl2O1xufSgpO1xuXG52YXIgc3R5bGVTaGVldCA9IF9fXyRpbnNlcnRTdHlsZShcIi5kZyB1bHtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZzowO3dpZHRoOjEwMCU7Y2xlYXI6Ym90aH0uZGcuYWN7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7aGVpZ2h0OjA7ei1pbmRleDowfS5kZzpub3QoLmFjKSAubWFpbntvdmVyZmxvdzpoaWRkZW59LmRnLm1haW57LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjstby10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjstbW96LXRyYW5zaXRpb246b3BhY2l0eSAuMXMgbGluZWFyO3RyYW5zaXRpb246b3BhY2l0eSAuMXMgbGluZWFyfS5kZy5tYWluLnRhbGxlci10aGFuLXdpbmRvd3tvdmVyZmxvdy15OmF1dG99LmRnLm1haW4udGFsbGVyLXRoYW4td2luZG93IC5jbG9zZS1idXR0b257b3BhY2l0eToxO21hcmdpbi10b3A6LTFweDtib3JkZXItdG9wOjFweCBzb2xpZCAjMmMyYzJjfS5kZy5tYWluIHVsLmNsb3NlZCAuY2xvc2UtYnV0dG9ue29wYWNpdHk6MSAhaW1wb3J0YW50fS5kZy5tYWluOmhvdmVyIC5jbG9zZS1idXR0b24sLmRnLm1haW4gLmNsb3NlLWJ1dHRvbi5kcmFne29wYWNpdHk6MX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uey13ZWJraXQtdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvcGFjaXR5IC4xcyBsaW5lYXI7LW1vei10cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjt0cmFuc2l0aW9uOm9wYWNpdHkgLjFzIGxpbmVhcjtib3JkZXI6MDtsaW5lLWhlaWdodDoxOXB4O2hlaWdodDoyMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6IzAwMH0uZGcubWFpbiAuY2xvc2UtYnV0dG9uLmNsb3NlLXRvcHtwb3NpdGlvbjpyZWxhdGl2ZX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uLmNsb3NlLWJvdHRvbXtwb3NpdGlvbjphYnNvbHV0ZX0uZGcubWFpbiAuY2xvc2UtYnV0dG9uOmhvdmVye2JhY2tncm91bmQtY29sb3I6IzExMX0uZGcuYXtmbG9hdDpyaWdodDttYXJnaW4tcmlnaHQ6MTVweDtvdmVyZmxvdy15OnZpc2libGV9LmRnLmEuaGFzLXNhdmU+dWwuY2xvc2UtdG9we21hcmdpbi10b3A6MH0uZGcuYS5oYXMtc2F2ZT51bC5jbG9zZS1ib3R0b217bWFyZ2luLXRvcDoyN3B4fS5kZy5hLmhhcy1zYXZlPnVsLmNsb3NlZHttYXJnaW4tdG9wOjB9LmRnLmEgLnNhdmUtcm93e3RvcDowO3otaW5kZXg6MTAwMn0uZGcuYSAuc2F2ZS1yb3cuY2xvc2UtdG9we3Bvc2l0aW9uOnJlbGF0aXZlfS5kZy5hIC5zYXZlLXJvdy5jbG9zZS1ib3R0b217cG9zaXRpb246Zml4ZWR9LmRnIGxpey13ZWJraXQtdHJhbnNpdGlvbjpoZWlnaHQgLjFzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246aGVpZ2h0IC4xcyBlYXNlLW91dDstbW96LXRyYW5zaXRpb246aGVpZ2h0IC4xcyBlYXNlLW91dDt0cmFuc2l0aW9uOmhlaWdodCAuMXMgZWFzZS1vdXQ7LXdlYmtpdC10cmFuc2l0aW9uOm92ZXJmbG93IC4xcyBsaW5lYXI7LW8tdHJhbnNpdGlvbjpvdmVyZmxvdyAuMXMgbGluZWFyOy1tb3otdHJhbnNpdGlvbjpvdmVyZmxvdyAuMXMgbGluZWFyO3RyYW5zaXRpb246b3ZlcmZsb3cgLjFzIGxpbmVhcn0uZGcgbGk6bm90KC5mb2xkZXIpe2N1cnNvcjphdXRvO2hlaWdodDoyN3B4O2xpbmUtaGVpZ2h0OjI3cHg7cGFkZGluZzowIDRweCAwIDVweH0uZGcgbGkuZm9sZGVye3BhZGRpbmc6MDtib3JkZXItbGVmdDo0cHggc29saWQgcmdiYSgwLDAsMCwwKX0uZGcgbGkudGl0bGV7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6LTRweH0uZGcgLmNsb3NlZCBsaTpub3QoLnRpdGxlKSwuZGcgLmNsb3NlZCB1bCBsaSwuZGcgLmNsb3NlZCB1bCBsaT4qe2hlaWdodDowO292ZXJmbG93OmhpZGRlbjtib3JkZXI6MH0uZGcgLmNye2NsZWFyOmJvdGg7cGFkZGluZy1sZWZ0OjNweDtoZWlnaHQ6MjdweDtvdmVyZmxvdzpoaWRkZW59LmRnIC5wcm9wZXJ0eS1uYW1le2N1cnNvcjpkZWZhdWx0O2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDt3aWR0aDo0MCU7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LmRnIC5je2Zsb2F0OmxlZnQ7d2lkdGg6NjAlO3Bvc2l0aW9uOnJlbGF0aXZlfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRde2JvcmRlcjowO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6M3B4O3dpZHRoOjEwMCU7ZmxvYXQ6cmlnaHR9LmRnIC5oYXMtc2xpZGVyIGlucHV0W3R5cGU9dGV4dF17d2lkdGg6MzAlO21hcmdpbi1sZWZ0OjB9LmRnIC5zbGlkZXJ7ZmxvYXQ6bGVmdDt3aWR0aDo2NiU7bWFyZ2luLWxlZnQ6LTVweDttYXJnaW4tcmlnaHQ6MDtoZWlnaHQ6MTlweDttYXJnaW4tdG9wOjRweH0uZGcgLnNsaWRlci1mZ3toZWlnaHQ6MTAwJX0uZGcgLmMgaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDo3cHh9LmRnIC5jIHNlbGVjdHttYXJnaW4tdG9wOjVweH0uZGcgLmNyLmZ1bmN0aW9uLC5kZyAuY3IuZnVuY3Rpb24gLnByb3BlcnR5LW5hbWUsLmRnIC5jci5mdW5jdGlvbiAqLC5kZyAuY3IuYm9vbGVhbiwuZGcgLmNyLmJvb2xlYW4gKntjdXJzb3I6cG9pbnRlcn0uZGcgLmNyLmNvbG9ye292ZXJmbG93OnZpc2libGV9LmRnIC5zZWxlY3RvcntkaXNwbGF5Om5vbmU7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6LTlweDttYXJnaW4tdG9wOjIzcHg7ei1pbmRleDoxMH0uZGcgLmM6aG92ZXIgLnNlbGVjdG9yLC5kZyAuc2VsZWN0b3IuZHJhZ3tkaXNwbGF5OmJsb2NrfS5kZyBsaS5zYXZlLXJvd3twYWRkaW5nOjB9LmRnIGxpLnNhdmUtcm93IC5idXR0b257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzowcHggNnB4fS5kZy5kaWFsb2d1ZXtiYWNrZ3JvdW5kLWNvbG9yOiMyMjI7d2lkdGg6NDYwcHg7cGFkZGluZzoxNXB4O2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0OjE1cHh9I2RnLW5ldy1jb25zdHJ1Y3RvcntwYWRkaW5nOjEwcHg7Y29sb3I6IzIyMjtmb250LWZhbWlseTpNb25hY28sIG1vbm9zcGFjZTtmb250LXNpemU6MTBweDtib3JkZXI6MDtyZXNpemU6bm9uZTtib3gtc2hhZG93Omluc2V0IDFweCAxcHggMXB4ICM4ODg7d29yZC13cmFwOmJyZWFrLXdvcmQ7bWFyZ2luOjEycHggMDtkaXNwbGF5OmJsb2NrO3dpZHRoOjQ0MHB4O292ZXJmbG93LXk6c2Nyb2xsO2hlaWdodDoxMDBweDtwb3NpdGlvbjpyZWxhdGl2ZX0jZGctbG9jYWwtZXhwbGFpbntkaXNwbGF5Om5vbmU7Zm9udC1zaXplOjExcHg7bGluZS1oZWlnaHQ6MTdweDtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7cGFkZGluZzo4cHg7bWFyZ2luLXRvcDoxMHB4fSNkZy1sb2NhbC1leHBsYWluIGNvZGV7Zm9udC1zaXplOjEwcHh9I2RhdC1ndWktc2F2ZS1sb2NhbGx5e2Rpc3BsYXk6bm9uZX0uZGd7Y29sb3I6I2VlZTtmb250OjExcHggJ0x1Y2lkYSBHcmFuZGUnLCBzYW5zLXNlcmlmO3RleHQtc2hhZG93OjAgLTFweCAwICMxMTF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFye3dpZHRoOjVweDtiYWNrZ3JvdW5kOiMxYTFhMWF9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLWNvcm5lcntoZWlnaHQ6MDtkaXNwbGF5Om5vbmV9LmRnLm1haW46Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1ie2JvcmRlci1yYWRpdXM6NXB4O2JhY2tncm91bmQ6IzY3Njc2N30uZGcgbGk6bm90KC5mb2xkZXIpe2JhY2tncm91bmQ6IzFhMWExYTtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMmMyYzJjfS5kZyBsaS5zYXZlLXJvd3tsaW5lLWhlaWdodDoyNXB4O2JhY2tncm91bmQ6I2RhZDVjYjtib3JkZXI6MH0uZGcgbGkuc2F2ZS1yb3cgc2VsZWN0e21hcmdpbi1sZWZ0OjVweDt3aWR0aDoxMDhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbnttYXJnaW4tbGVmdDo1cHg7bWFyZ2luLXRvcDoxcHg7Ym9yZGVyLXJhZGl1czoycHg7Zm9udC1zaXplOjlweDtsaW5lLWhlaWdodDo3cHg7cGFkZGluZzo0cHggNHB4IDVweCA0cHg7YmFja2dyb3VuZDojYzViZGFkO2NvbG9yOiNmZmY7dGV4dC1zaGFkb3c6MCAxcHggMCAjYjBhNThmO2JveC1zaGFkb3c6MCAtMXB4IDAgI2IwYTU4ZjtjdXJzb3I6cG9pbnRlcn0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbi5nZWFyc3tiYWNrZ3JvdW5kOiNjNWJkYWQgdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQXNBQUFBTkNBWUFBQUIvOVpRN0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBUUpKUkVGVWVOcGlZS0FVL1AvL1B3R0lDL0FwQ0FCaUJTQVcrSThBQ2xBY2dLeFE0VDlob01BRVVyeHgyUVNHTjYrZWdEWCsvdldUNGU3TjgyQU1Zb1BBeC9ldndXb1lvU1liQUNYMnM3S3hDeHpjc2V6RGgzZXZGb0RFQllURUVxeWNnZ1dBekE5QXVVU1FRZ2VZUGE5ZlB2Ni9ZV20vQWN4NUlQYjd0eS9mdytRWmJsdzY3dkRzOFIwWUh5UWhnT2J4K3lBSmtCcW1HNWRQUERoMWFQT0dSL2V1Z1cwRzR2bElvVElmeUZjQStRZWtoaEhKaFBkUXhiaUFJZ3VNQlRRWnJQRDcxMDhNNnJvV1lERlFpSUFBdjZBb3cvMWJGd1hnaXMrZjJMVUF5bndvSWFOY3o4WE54M0RsN01FSlVER1FweDlndFE4WUN1ZUIrRDI2T0VDQUFRRGFkdDdlNDZENDJRQUFBQUJKUlU1RXJrSmdnZz09KSAycHggMXB4IG5vLXJlcGVhdDtoZWlnaHQ6N3B4O3dpZHRoOjhweH0uZGcgbGkuc2F2ZS1yb3cgLmJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNiYWIxOWU7Ym94LXNoYWRvdzowIC0xcHggMCAjYjBhNThmfS5kZyBsaS5mb2xkZXJ7Ym9yZGVyLWJvdHRvbTowfS5kZyBsaS50aXRsZXtwYWRkaW5nLWxlZnQ6MTZweDtiYWNrZ3JvdW5kOiMwMDAgdXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsSStoS2dGeG9DZ0FPdz09KSA2cHggMTBweCBuby1yZXBlYXQ7Y3Vyc29yOnBvaW50ZXI7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwLjIpfS5kZyAuY2xvc2VkIGxpLnRpdGxle2JhY2tncm91bmQtaW1hZ2U6dXJsKGRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEJRQUZBSkVBQVAvLy8vUHo4Ly8vLy8vLy95SDVCQUVBQUFJQUxBQUFBQUFGQUFVQUFBSUlsR0lXcU1DYldBRUFPdz09KX0uZGcgLmNyLmJvb2xlYW57Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICM4MDY3ODd9LmRnIC5jci5jb2xvcntib3JkZXItbGVmdDozcHggc29saWR9LmRnIC5jci5mdW5jdGlvbntib3JkZXItbGVmdDozcHggc29saWQgI2U2MWQ1Zn0uZGcgLmNyLm51bWJlcntib3JkZXItbGVmdDozcHggc29saWQgIzJGQTFENn0uZGcgLmNyLm51bWJlciBpbnB1dFt0eXBlPXRleHRde2NvbG9yOiMyRkExRDZ9LmRnIC5jci5zdHJpbmd7Ym9yZGVyLWxlZnQ6M3B4IHNvbGlkICMxZWQzNmZ9LmRnIC5jci5zdHJpbmcgaW5wdXRbdHlwZT10ZXh0XXtjb2xvcjojMWVkMzZmfS5kZyAuY3IuZnVuY3Rpb246aG92ZXIsLmRnIC5jci5ib29sZWFuOmhvdmVye2JhY2tncm91bmQ6IzExMX0uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XXtiYWNrZ3JvdW5kOiMzMDMwMzA7b3V0bGluZTpub25lfS5kZyAuYyBpbnB1dFt0eXBlPXRleHRdOmhvdmVye2JhY2tncm91bmQ6IzNjM2MzY30uZGcgLmMgaW5wdXRbdHlwZT10ZXh0XTpmb2N1c3tiYWNrZ3JvdW5kOiM0OTQ5NDk7Y29sb3I6I2ZmZn0uZGcgLmMgLnNsaWRlcntiYWNrZ3JvdW5kOiMzMDMwMzA7Y3Vyc29yOmV3LXJlc2l6ZX0uZGcgLmMgLnNsaWRlci1mZ3tiYWNrZ3JvdW5kOiMyRkExRDY7bWF4LXdpZHRoOjEwMCV9LmRnIC5jIC5zbGlkZXI6aG92ZXJ7YmFja2dyb3VuZDojM2MzYzNjfS5kZyAuYyAuc2xpZGVyOmhvdmVyIC5zbGlkZXItZmd7YmFja2dyb3VuZDojNDRhYmRhfVxcblwiKTtcblxuY3NzLmluamVjdChzdHlsZVNoZWV0KTtcbnZhciBDU1NfTkFNRVNQQUNFID0gJ2RnJztcbnZhciBISURFX0tFWV9DT0RFID0gNzI7XG52YXIgQ0xPU0VfQlVUVE9OX0hFSUdIVCA9IDIwO1xudmFyIERFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRSA9ICdEZWZhdWx0JztcbnZhciBTVVBQT1JUU19MT0NBTF9TVE9SQUdFID0gZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIHJldHVybiAhIXdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0oKTtcbnZhciBTQVZFX0RJQUxPR1VFID0gdm9pZCAwO1xudmFyIGF1dG9QbGFjZVZpcmdpbiA9IHRydWU7XG52YXIgYXV0b1BsYWNlQ29udGFpbmVyID0gdm9pZCAwO1xudmFyIGhpZGUgPSBmYWxzZTtcbnZhciBoaWRlYWJsZUd1aXMgPSBbXTtcbnZhciBHVUkgPSBmdW5jdGlvbiBHVUkocGFycykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgcGFyYW1zID0gcGFycyB8fCB7fTtcbiAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMuX191bCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9fdWwpO1xuICBkb20uYWRkQ2xhc3ModGhpcy5kb21FbGVtZW50LCBDU1NfTkFNRVNQQUNFKTtcbiAgdGhpcy5fX2ZvbGRlcnMgPSB7fTtcbiAgdGhpcy5fX2NvbnRyb2xsZXJzID0gW107XG4gIHRoaXMuX19yZW1lbWJlcmVkT2JqZWN0cyA9IFtdO1xuICB0aGlzLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzID0gW107XG4gIHRoaXMuX19saXN0ZW5pbmcgPSBbXTtcbiAgcGFyYW1zID0gQ29tbW9uLmRlZmF1bHRzKHBhcmFtcywge1xuICAgIGNsb3NlT25Ub3A6IGZhbHNlLFxuICAgIGF1dG9QbGFjZTogdHJ1ZSxcbiAgICB3aWR0aDogR1VJLkRFRkFVTFRfV0lEVEhcbiAgfSk7XG4gIHBhcmFtcyA9IENvbW1vbi5kZWZhdWx0cyhwYXJhbXMsIHtcbiAgICByZXNpemFibGU6IHBhcmFtcy5hdXRvUGxhY2UsXG4gICAgaGlkZWFibGU6IHBhcmFtcy5hdXRvUGxhY2VcbiAgfSk7XG4gIGlmICghQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5sb2FkKSkge1xuICAgIGlmIChwYXJhbXMucHJlc2V0KSB7XG4gICAgICBwYXJhbXMubG9hZC5wcmVzZXQgPSBwYXJhbXMucHJlc2V0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwYXJhbXMubG9hZCA9IHsgcHJlc2V0OiBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUgfTtcbiAgfVxuICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpICYmIHBhcmFtcy5oaWRlYWJsZSkge1xuICAgIGhpZGVhYmxlR3Vpcy5wdXNoKHRoaXMpO1xuICB9XG4gIHBhcmFtcy5yZXNpemFibGUgPSBDb21tb24uaXNVbmRlZmluZWQocGFyYW1zLnBhcmVudCkgJiYgcGFyYW1zLnJlc2l6YWJsZTtcbiAgaWYgKHBhcmFtcy5hdXRvUGxhY2UgJiYgQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5zY3JvbGxhYmxlKSkge1xuICAgIHBhcmFtcy5zY3JvbGxhYmxlID0gdHJ1ZTtcbiAgfVxuICB2YXIgdXNlTG9jYWxTdG9yYWdlID0gU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSAmJiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShnZXRMb2NhbFN0b3JhZ2VIYXNoKHRoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZSc7XG4gIHZhciBzYXZlVG9Mb2NhbFN0b3JhZ2UgPSB2b2lkIDA7XG4gIHZhciB0aXRsZVJvdyA9IHZvaWQgMDtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcyxcbiAge1xuICAgIHBhcmVudDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMucGFyZW50O1xuICAgICAgfVxuICAgIH0sXG4gICAgc2Nyb2xsYWJsZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuc2Nyb2xsYWJsZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF1dG9QbGFjZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuYXV0b1BsYWNlO1xuICAgICAgfVxuICAgIH0sXG4gICAgY2xvc2VPblRvcDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VPblRvcDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHByZXNldDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIGlmIChfdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuZ2V0Um9vdCgpLnByZXNldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyYW1zLmxvYWQucHJlc2V0O1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgICAgaWYgKF90aGlzLnBhcmVudCkge1xuICAgICAgICAgIF90aGlzLmdldFJvb3QoKS5wcmVzZXQgPSB2O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmFtcy5sb2FkLnByZXNldCA9IHY7XG4gICAgICAgIH1cbiAgICAgICAgc2V0UHJlc2V0U2VsZWN0SW5kZXgodGhpcyk7XG4gICAgICAgIF90aGlzLnJldmVydCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0JCQxKCkge1xuICAgICAgICByZXR1cm4gcGFyYW1zLndpZHRoO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgICAgcGFyYW1zLndpZHRoID0gdjtcbiAgICAgICAgc2V0V2lkdGgoX3RoaXMsIHYpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMubmFtZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCQkMSh2KSB7XG4gICAgICAgIHBhcmFtcy5uYW1lID0gdjtcbiAgICAgICAgaWYgKHRpdGxlUm93KSB7XG4gICAgICAgICAgdGl0bGVSb3cuaW5uZXJIVE1MID0gcGFyYW1zLm5hbWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNsb3NlZDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY2xvc2VkO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0JCQxKHYpIHtcbiAgICAgICAgcGFyYW1zLmNsb3NlZCA9IHY7XG4gICAgICAgIGlmIChwYXJhbXMuY2xvc2VkKSB7XG4gICAgICAgICAgZG9tLmFkZENsYXNzKF90aGlzLl9fdWwsIEdVSS5DTEFTU19DTE9TRUQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcyhfdGhpcy5fX3VsLCBHVUkuQ0xBU1NfQ0xPU0VEKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG4gICAgICAgIGlmIChfdGhpcy5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgX3RoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSB2ID8gR1VJLlRFWFRfT1BFTiA6IEdVSS5URVhUX0NMT1NFRDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgbG9hZDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiBwYXJhbXMubG9hZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHVzZUxvY2FsU3RvcmFnZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQkJDEoKSB7XG4gICAgICAgIHJldHVybiB1c2VMb2NhbFN0b3JhZ2U7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQkJDEoYm9vbCkge1xuICAgICAgICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgICAgICAgIHVzZUxvY2FsU3RvcmFnZSA9IGJvb2w7XG4gICAgICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgICAgIGRvbS5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIHNhdmVUb0xvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS51bmJpbmQod2luZG93LCAndW5sb2FkJywgc2F2ZVRvTG9jYWxTdG9yYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChfdGhpcywgJ2lzTG9jYWwnKSwgYm9vbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKHBhcmFtcy5wYXJlbnQpKSB7XG4gICAgdGhpcy5jbG9zZWQgPSBwYXJhbXMuY2xvc2VkIHx8IGZhbHNlO1xuICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19NQUlOKTtcbiAgICBkb20ubWFrZVNlbGVjdGFibGUodGhpcy5kb21FbGVtZW50LCBmYWxzZSk7XG4gICAgaWYgKFNVUFBPUlRTX0xPQ0FMX1NUT1JBR0UpIHtcbiAgICAgIGlmICh1c2VMb2NhbFN0b3JhZ2UpIHtcbiAgICAgICAgX3RoaXMudXNlTG9jYWxTdG9yYWdlID0gdHJ1ZTtcbiAgICAgICAgdmFyIHNhdmVkR3VpID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaCh0aGlzLCAnZ3VpJykpO1xuICAgICAgICBpZiAoc2F2ZWRHdWkpIHtcbiAgICAgICAgICBwYXJhbXMubG9hZCA9IEpTT04ucGFyc2Uoc2F2ZWRHdWkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX19jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuX19jbG9zZUJ1dHRvbi5pbm5lckhUTUwgPSBHVUkuVEVYVF9DTE9TRUQ7XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0NMT1NFX0JVVFRPTik7XG4gICAgaWYgKHBhcmFtcy5jbG9zZU9uVG9wKSB7XG4gICAgICBkb20uYWRkQ2xhc3ModGhpcy5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfQ0xPU0VfVE9QKTtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5fX2Nsb3NlQnV0dG9uLCB0aGlzLmRvbUVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLl9fY2xvc2VCdXR0b24sIEdVSS5DTEFTU19DTE9TRV9CT1RUT00pO1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX19jbG9zZUJ1dHRvbik7XG4gICAgfVxuICAgIGRvbS5iaW5kKHRoaXMuX19jbG9zZUJ1dHRvbiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuY2xvc2VkID0gIV90aGlzLmNsb3NlZDtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1zLmNsb3NlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYXJhbXMuY2xvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIHRpdGxlUm93TmFtZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHBhcmFtcy5uYW1lKTtcbiAgICBkb20uYWRkQ2xhc3ModGl0bGVSb3dOYW1lLCAnY29udHJvbGxlci1uYW1lJyk7XG4gICAgdGl0bGVSb3cgPSBhZGRSb3coX3RoaXMsIHRpdGxlUm93TmFtZSk7XG4gICAgdmFyIG9uQ2xpY2tUaXRsZSA9IGZ1bmN0aW9uIG9uQ2xpY2tUaXRsZShlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBfdGhpcy5jbG9zZWQgPSAhX3RoaXMuY2xvc2VkO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgZG9tLmFkZENsYXNzKHRoaXMuX191bCwgR1VJLkNMQVNTX0NMT1NFRCk7XG4gICAgZG9tLmFkZENsYXNzKHRpdGxlUm93LCAndGl0bGUnKTtcbiAgICBkb20uYmluZCh0aXRsZVJvdywgJ2NsaWNrJywgb25DbGlja1RpdGxlKTtcbiAgICBpZiAoIXBhcmFtcy5jbG9zZWQpIHtcbiAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMuYXV0b1BsYWNlKSB7XG4gICAgaWYgKENvbW1vbi5pc1VuZGVmaW5lZChwYXJhbXMucGFyZW50KSkge1xuICAgICAgaWYgKGF1dG9QbGFjZVZpcmdpbikge1xuICAgICAgICBhdXRvUGxhY2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZG9tLmFkZENsYXNzKGF1dG9QbGFjZUNvbnRhaW5lciwgQ1NTX05BTUVTUEFDRSk7XG4gICAgICAgIGRvbS5hZGRDbGFzcyhhdXRvUGxhY2VDb250YWluZXIsIEdVSS5DTEFTU19BVVRPX1BMQUNFX0NPTlRBSU5FUik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXV0b1BsYWNlQ29udGFpbmVyKTtcbiAgICAgICAgYXV0b1BsYWNlVmlyZ2luID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBhdXRvUGxhY2VDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgICAgIGRvbS5hZGRDbGFzcyh0aGlzLmRvbUVsZW1lbnQsIEdVSS5DTEFTU19BVVRPX1BMQUNFKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnBhcmVudCkge1xuICAgICAgc2V0V2lkdGgoX3RoaXMsIHBhcmFtcy53aWR0aCk7XG4gICAgfVxuICB9XG4gIHRoaXMuX19yZXNpemVIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIF90aGlzLm9uUmVzaXplRGVib3VuY2VkKCk7XG4gIH07XG4gIGRvbS5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcbiAgZG9tLmJpbmQodGhpcy5fX3VsLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcbiAgZG9tLmJpbmQodGhpcy5fX3VsLCAndHJhbnNpdGlvbmVuZCcsIHRoaXMuX19yZXNpemVIYW5kbGVyKTtcbiAgZG9tLmJpbmQodGhpcy5fX3VsLCAnb1RyYW5zaXRpb25FbmQnLCB0aGlzLl9fcmVzaXplSGFuZGxlcik7XG4gIHRoaXMub25SZXNpemUoKTtcbiAgaWYgKHBhcmFtcy5yZXNpemFibGUpIHtcbiAgICBhZGRSZXNpemVIYW5kbGUodGhpcyk7XG4gIH1cbiAgc2F2ZVRvTG9jYWxTdG9yYWdlID0gZnVuY3Rpb24gc2F2ZVRvTG9jYWxTdG9yYWdlKCkge1xuICAgIGlmIChTVVBQT1JUU19MT0NBTF9TVE9SQUdFICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGdldExvY2FsU3RvcmFnZUhhc2goX3RoaXMsICdndWknKSwgSlNPTi5zdHJpbmdpZnkoX3RoaXMuZ2V0U2F2ZU9iamVjdCgpKSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUgPSBzYXZlVG9Mb2NhbFN0b3JhZ2U7XG4gIGZ1bmN0aW9uIHJlc2V0V2lkdGgoKSB7XG4gICAgdmFyIHJvb3QgPSBfdGhpcy5nZXRSb290KCk7XG4gICAgcm9vdC53aWR0aCArPSAxO1xuICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICByb290LndpZHRoIC09IDE7XG4gICAgfSk7XG4gIH1cbiAgaWYgKCFwYXJhbXMucGFyZW50KSB7XG4gICAgcmVzZXRXaWR0aCgpO1xuICB9XG59O1xuR1VJLnRvZ2dsZUhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGhpZGUgPSAhaGlkZTtcbiAgQ29tbW9uLmVhY2goaGlkZWFibGVHdWlzLCBmdW5jdGlvbiAoZ3VpKSB7XG4gICAgZ3VpLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGhpZGUgPyAnbm9uZScgOiAnJztcbiAgfSk7XG59O1xuR1VJLkNMQVNTX0FVVE9fUExBQ0UgPSAnYSc7XG5HVUkuQ0xBU1NfQVVUT19QTEFDRV9DT05UQUlORVIgPSAnYWMnO1xuR1VJLkNMQVNTX01BSU4gPSAnbWFpbic7XG5HVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cgPSAnY3InO1xuR1VJLkNMQVNTX1RPT19UQUxMID0gJ3RhbGxlci10aGFuLXdpbmRvdyc7XG5HVUkuQ0xBU1NfQ0xPU0VEID0gJ2Nsb3NlZCc7XG5HVUkuQ0xBU1NfQ0xPU0VfQlVUVE9OID0gJ2Nsb3NlLWJ1dHRvbic7XG5HVUkuQ0xBU1NfQ0xPU0VfVE9QID0gJ2Nsb3NlLXRvcCc7XG5HVUkuQ0xBU1NfQ0xPU0VfQk9UVE9NID0gJ2Nsb3NlLWJvdHRvbSc7XG5HVUkuQ0xBU1NfRFJBRyA9ICdkcmFnJztcbkdVSS5ERUZBVUxUX1dJRFRIID0gMjQ1O1xuR1VJLlRFWFRfQ0xPU0VEID0gJ0Nsb3NlIENvbnRyb2xzJztcbkdVSS5URVhUX09QRU4gPSAnT3BlbiBDb250cm9scyc7XG5HVUkuX2tleWRvd25IYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudHlwZSAhPT0gJ3RleHQnICYmIChlLndoaWNoID09PSBISURFX0tFWV9DT0RFIHx8IGUua2V5Q29kZSA9PT0gSElERV9LRVlfQ09ERSkpIHtcbiAgICBHVUkudG9nZ2xlSGlkZSgpO1xuICB9XG59O1xuZG9tLmJpbmQod2luZG93LCAna2V5ZG93bicsIEdVSS5fa2V5ZG93bkhhbmRsZXIsIGZhbHNlKTtcbkNvbW1vbi5leHRlbmQoR1VJLnByb3RvdHlwZSxcbntcbiAgYWRkOiBmdW5jdGlvbiBhZGQob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBfYWRkKHRoaXMsIG9iamVjdCwgcHJvcGVydHksIHtcbiAgICAgIGZhY3RvcnlBcmdzOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG4gICAgfSk7XG4gIH0sXG4gIGFkZENvbG9yOiBmdW5jdGlvbiBhZGRDb2xvcihvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIF9hZGQodGhpcywgb2JqZWN0LCBwcm9wZXJ0eSwge1xuICAgICAgY29sb3I6IHRydWVcbiAgICB9KTtcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoY29udHJvbGxlcikge1xuICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChjb250cm9sbGVyLl9fbGkpO1xuICAgIHRoaXMuX19jb250cm9sbGVycy5zcGxpY2UodGhpcy5fX2NvbnRyb2xsZXJzLmluZGV4T2YoY29udHJvbGxlciksIDEpO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgQ29tbW9uLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLm9uUmVzaXplKCk7XG4gICAgfSk7XG4gIH0sXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ09ubHkgdGhlIHJvb3QgR1VJIHNob3VsZCBiZSByZW1vdmVkIHdpdGggLmRlc3Ryb3koKS4gJyArICdGb3Igc3ViZm9sZGVycywgdXNlIGd1aS5yZW1vdmVGb2xkZXIoZm9sZGVyKSBpbnN0ZWFkLicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hdXRvUGxhY2UpIHtcbiAgICAgIGF1dG9QbGFjZUNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIENvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoc3ViZm9sZGVyKSB7XG4gICAgICBfdGhpcy5yZW1vdmVGb2xkZXIoc3ViZm9sZGVyKTtcbiAgICB9KTtcbiAgICBkb20udW5iaW5kKHdpbmRvdywgJ2tleWRvd24nLCBHVUkuX2tleWRvd25IYW5kbGVyLCBmYWxzZSk7XG4gICAgcmVtb3ZlTGlzdGVuZXJzKHRoaXMpO1xuICB9LFxuICBhZGRGb2xkZXI6IGZ1bmN0aW9uIGFkZEZvbGRlcihuYW1lKSB7XG4gICAgaWYgKHRoaXMuX19mb2xkZXJzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFscmVhZHkgaGF2ZSBhIGZvbGRlciBpbiB0aGlzIEdVSSBieSB0aGUnICsgJyBuYW1lIFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICB9XG4gICAgdmFyIG5ld0d1aVBhcmFtcyA9IHsgbmFtZTogbmFtZSwgcGFyZW50OiB0aGlzIH07XG4gICAgbmV3R3VpUGFyYW1zLmF1dG9QbGFjZSA9IHRoaXMuYXV0b1BsYWNlO1xuICAgIGlmICh0aGlzLmxvYWQgJiZcbiAgICB0aGlzLmxvYWQuZm9sZGVycyAmJlxuICAgIHRoaXMubG9hZC5mb2xkZXJzW25hbWVdKSB7XG4gICAgICBuZXdHdWlQYXJhbXMuY2xvc2VkID0gdGhpcy5sb2FkLmZvbGRlcnNbbmFtZV0uY2xvc2VkO1xuICAgICAgbmV3R3VpUGFyYW1zLmxvYWQgPSB0aGlzLmxvYWQuZm9sZGVyc1tuYW1lXTtcbiAgICB9XG4gICAgdmFyIGd1aSA9IG5ldyBHVUkobmV3R3VpUGFyYW1zKTtcbiAgICB0aGlzLl9fZm9sZGVyc1tuYW1lXSA9IGd1aTtcbiAgICB2YXIgbGkgPSBhZGRSb3codGhpcywgZ3VpLmRvbUVsZW1lbnQpO1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2ZvbGRlcicpO1xuICAgIHJldHVybiBndWk7XG4gIH0sXG4gIHJlbW92ZUZvbGRlcjogZnVuY3Rpb24gcmVtb3ZlRm9sZGVyKGZvbGRlcikge1xuICAgIHRoaXMuX191bC5yZW1vdmVDaGlsZChmb2xkZXIuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICBkZWxldGUgdGhpcy5fX2ZvbGRlcnNbZm9sZGVyLm5hbWVdO1xuICAgIGlmICh0aGlzLmxvYWQgJiZcbiAgICB0aGlzLmxvYWQuZm9sZGVycyAmJlxuICAgIHRoaXMubG9hZC5mb2xkZXJzW2ZvbGRlci5uYW1lXSkge1xuICAgICAgZGVsZXRlIHRoaXMubG9hZC5mb2xkZXJzW2ZvbGRlci5uYW1lXTtcbiAgICB9XG4gICAgcmVtb3ZlTGlzdGVuZXJzKGZvbGRlcik7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBDb21tb24uZWFjaChmb2xkZXIuX19mb2xkZXJzLCBmdW5jdGlvbiAoc3ViZm9sZGVyKSB7XG4gICAgICBmb2xkZXIucmVtb3ZlRm9sZGVyKHN1YmZvbGRlcik7XG4gICAgfSk7XG4gICAgQ29tbW9uLmRlZmVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLm9uUmVzaXplKCk7XG4gICAgfSk7XG4gIH0sXG4gIG9wZW46IGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgfSxcbiAgY2xvc2U6IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIHRoaXMuY2xvc2VkID0gdHJ1ZTtcbiAgfSxcbiAgaGlkZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfSxcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICB9LFxuICBvblJlc2l6ZTogZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gICAgdmFyIHJvb3QgPSB0aGlzLmdldFJvb3QoKTtcbiAgICBpZiAocm9vdC5zY3JvbGxhYmxlKSB7XG4gICAgICB2YXIgdG9wID0gZG9tLmdldE9mZnNldChyb290Ll9fdWwpLnRvcDtcbiAgICAgIHZhciBoID0gMDtcbiAgICAgIENvbW1vbi5lYWNoKHJvb3QuX191bC5jaGlsZE5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAoIShyb290LmF1dG9QbGFjZSAmJiBub2RlID09PSByb290Ll9fc2F2ZV9yb3cpKSB7XG4gICAgICAgICAgaCArPSBkb20uZ2V0SGVpZ2h0KG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0b3AgLSBDTE9TRV9CVVRUT05fSEVJR0hUIDwgaCkge1xuICAgICAgICBkb20uYWRkQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gdG9wIC0gQ0xPU0VfQlVUVE9OX0hFSUdIVCArICdweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb20ucmVtb3ZlQ2xhc3Mocm9vdC5kb21FbGVtZW50LCBHVUkuQ0xBU1NfVE9PX1RBTEwpO1xuICAgICAgICByb290Ll9fdWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocm9vdC5fX3Jlc2l6ZV9oYW5kbGUpIHtcbiAgICAgIENvbW1vbi5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJvb3QuX19yZXNpemVfaGFuZGxlLnN0eWxlLmhlaWdodCA9IHJvb3QuX191bC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChyb290Ll9fY2xvc2VCdXR0b24pIHtcbiAgICAgIHJvb3QuX19jbG9zZUJ1dHRvbi5zdHlsZS53aWR0aCA9IHJvb3Qud2lkdGggKyAncHgnO1xuICAgIH1cbiAgfSxcbiAgb25SZXNpemVEZWJvdW5jZWQ6IENvbW1vbi5kZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vblJlc2l6ZSgpO1xuICB9LCA1MCksXG4gIHJlbWVtYmVyOiBmdW5jdGlvbiByZW1lbWJlcigpIHtcbiAgICBpZiAoQ29tbW9uLmlzVW5kZWZpbmVkKFNBVkVfRElBTE9HVUUpKSB7XG4gICAgICBTQVZFX0RJQUxPR1VFID0gbmV3IENlbnRlcmVkRGl2KCk7XG4gICAgICBTQVZFX0RJQUxPR1VFLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gc2F2ZURpYWxvZ0NvbnRlbnRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5wYXJlbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGNhbiBvbmx5IGNhbGwgcmVtZW1iZXIgb24gYSB0b3AgbGV2ZWwgR1VJLicpO1xuICAgIH1cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIENvbW1vbi5lYWNoKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyksIGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgIGlmIChfdGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBhZGRTYXZlTWVudShfdGhpcyk7XG4gICAgICB9XG4gICAgICBpZiAoX3RoaXMuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPT09IC0xKSB7XG4gICAgICAgIF90aGlzLl9fcmVtZW1iZXJlZE9iamVjdHMucHVzaChvYmplY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmF1dG9QbGFjZSkge1xuICAgICAgc2V0V2lkdGgodGhpcywgdGhpcy53aWR0aCk7XG4gICAgfVxuICB9LFxuICBnZXRSb290OiBmdW5jdGlvbiBnZXRSb290KCkge1xuICAgIHZhciBndWkgPSB0aGlzO1xuICAgIHdoaWxlIChndWkucGFyZW50KSB7XG4gICAgICBndWkgPSBndWkucGFyZW50O1xuICAgIH1cbiAgICByZXR1cm4gZ3VpO1xuICB9LFxuICBnZXRTYXZlT2JqZWN0OiBmdW5jdGlvbiBnZXRTYXZlT2JqZWN0KCkge1xuICAgIHZhciB0b1JldHVybiA9IHRoaXMubG9hZDtcbiAgICB0b1JldHVybi5jbG9zZWQgPSB0aGlzLmNsb3NlZDtcbiAgICBpZiAodGhpcy5fX3JlbWVtYmVyZWRPYmplY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRvUmV0dXJuLnByZXNldCA9IHRoaXMucHJlc2V0O1xuICAgICAgaWYgKCF0b1JldHVybi5yZW1lbWJlcmVkKSB7XG4gICAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgIH1cbiAgICAgIHRvUmV0dXJuLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICB9XG4gICAgdG9SZXR1cm4uZm9sZGVycyA9IHt9O1xuICAgIENvbW1vbi5lYWNoKHRoaXMuX19mb2xkZXJzLCBmdW5jdGlvbiAoZWxlbWVudCwga2V5KSB7XG4gICAgICB0b1JldHVybi5mb2xkZXJzW2tleV0gPSBlbGVtZW50LmdldFNhdmVPYmplY3QoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdG9SZXR1cm47XG4gIH0sXG4gIHNhdmU6IGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5sb2FkLnJlbWVtYmVyZWRbdGhpcy5wcmVzZXRdID0gZ2V0Q3VycmVudFByZXNldCh0aGlzKTtcbiAgICBtYXJrUHJlc2V0TW9kaWZpZWQodGhpcywgZmFsc2UpO1xuICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yYWdlSWZQb3NzaWJsZSgpO1xuICB9LFxuICBzYXZlQXM6IGZ1bmN0aW9uIHNhdmVBcyhwcmVzZXROYW1lKSB7XG4gICAgaWYgKCF0aGlzLmxvYWQucmVtZW1iZXJlZCkge1xuICAgICAgdGhpcy5sb2FkLnJlbWVtYmVyZWQgPSB7fTtcbiAgICAgIHRoaXMubG9hZC5yZW1lbWJlcmVkW0RFRkFVTFRfREVGQVVMVF9QUkVTRVRfTkFNRV0gPSBnZXRDdXJyZW50UHJlc2V0KHRoaXMsIHRydWUpO1xuICAgIH1cbiAgICB0aGlzLmxvYWQucmVtZW1iZXJlZFtwcmVzZXROYW1lXSA9IGdldEN1cnJlbnRQcmVzZXQodGhpcyk7XG4gICAgdGhpcy5wcmVzZXQgPSBwcmVzZXROYW1lO1xuICAgIGFkZFByZXNldE9wdGlvbih0aGlzLCBwcmVzZXROYW1lLCB0cnVlKTtcbiAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUoKTtcbiAgfSxcbiAgcmV2ZXJ0OiBmdW5jdGlvbiByZXZlcnQoZ3VpKSB7XG4gICAgQ29tbW9uLmVhY2godGhpcy5fX2NvbnRyb2xsZXJzLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xuICAgICAgaWYgKCF0aGlzLmdldFJvb3QoKS5sb2FkLnJlbWVtYmVyZWQpIHtcbiAgICAgICAgY29udHJvbGxlci5zZXRWYWx1ZShjb250cm9sbGVyLmluaXRpYWxWYWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWNhbGxTYXZlZFZhbHVlKGd1aSB8fCB0aGlzLmdldFJvb3QoKSwgY29udHJvbGxlcik7XG4gICAgICB9XG4gICAgICBpZiAoY29udHJvbGxlci5fX29uRmluaXNoQ2hhbmdlKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuX19vbkZpbmlzaENoYW5nZS5jYWxsKGNvbnRyb2xsZXIsIGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSk7XG4gICAgICB9XG4gICAgfSwgdGhpcyk7XG4gICAgQ29tbW9uLmVhY2godGhpcy5fX2ZvbGRlcnMsIGZ1bmN0aW9uIChmb2xkZXIpIHtcbiAgICAgIGZvbGRlci5yZXZlcnQoZm9sZGVyKTtcbiAgICB9KTtcbiAgICBpZiAoIWd1aSkge1xuICAgICAgbWFya1ByZXNldE1vZGlmaWVkKHRoaXMuZ2V0Um9vdCgpLCBmYWxzZSk7XG4gICAgfVxuICB9LFxuICBsaXN0ZW46IGZ1bmN0aW9uIGxpc3Rlbihjb250cm9sbGVyKSB7XG4gICAgdmFyIGluaXQgPSB0aGlzLl9fbGlzdGVuaW5nLmxlbmd0aCA9PT0gMDtcbiAgICB0aGlzLl9fbGlzdGVuaW5nLnB1c2goY29udHJvbGxlcik7XG4gICAgaWYgKGluaXQpIHtcbiAgICAgIHVwZGF0ZURpc3BsYXlzKHRoaXMuX19saXN0ZW5pbmcpO1xuICAgIH1cbiAgfSxcbiAgdXBkYXRlRGlzcGxheTogZnVuY3Rpb24gdXBkYXRlRGlzcGxheSgpIHtcbiAgICBDb21tb24uZWFjaCh0aGlzLl9fY29udHJvbGxlcnMsIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XG4gICAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcbiAgICBDb21tb24uZWFjaCh0aGlzLl9fZm9sZGVycywgZnVuY3Rpb24gKGZvbGRlcikge1xuICAgICAgZm9sZGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgICB9KTtcbiAgfVxufSk7XG5mdW5jdGlvbiBhZGRSb3coZ3VpLCBuZXdEb20sIGxpQmVmb3JlKSB7XG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGlmIChuZXdEb20pIHtcbiAgICBsaS5hcHBlbmRDaGlsZChuZXdEb20pO1xuICB9XG4gIGlmIChsaUJlZm9yZSkge1xuICAgIGd1aS5fX3VsLmluc2VydEJlZm9yZShsaSwgbGlCZWZvcmUpO1xuICB9IGVsc2Uge1xuICAgIGd1aS5fX3VsLmFwcGVuZENoaWxkKGxpKTtcbiAgfVxuICBndWkub25SZXNpemUoKTtcbiAgcmV0dXJuIGxpO1xufVxuZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGd1aSkge1xuICBkb20udW5iaW5kKHdpbmRvdywgJ3Jlc2l6ZScsIGd1aS5fX3Jlc2l6ZUhhbmRsZXIpO1xuICBpZiAoZ3VpLnNhdmVUb0xvY2FsU3RvcmFnZUlmUG9zc2libGUpIHtcbiAgICBkb20udW5iaW5kKHdpbmRvdywgJ3VubG9hZCcsIGd1aS5zYXZlVG9Mb2NhbFN0b3JhZ2VJZlBvc3NpYmxlKTtcbiAgfVxufVxuZnVuY3Rpb24gbWFya1ByZXNldE1vZGlmaWVkKGd1aSwgbW9kaWZpZWQpIHtcbiAgdmFyIG9wdCA9IGd1aS5fX3ByZXNldF9zZWxlY3RbZ3VpLl9fcHJlc2V0X3NlbGVjdC5zZWxlY3RlZEluZGV4XTtcbiAgaWYgKG1vZGlmaWVkKSB7XG4gICAgb3B0LmlubmVySFRNTCA9IG9wdC52YWx1ZSArICcqJztcbiAgfSBlbHNlIHtcbiAgICBvcHQuaW5uZXJIVE1MID0gb3B0LnZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBhdWdtZW50Q29udHJvbGxlcihndWksIGxpLCBjb250cm9sbGVyKSB7XG4gIGNvbnRyb2xsZXIuX19saSA9IGxpO1xuICBjb250cm9sbGVyLl9fZ3VpID0gZ3VpO1xuICBDb21tb24uZXh0ZW5kKGNvbnRyb2xsZXIsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgb3B0aW9uczogZnVuY3Rpb24gb3B0aW9ucyhfb3B0aW9ucykge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBuZXh0U2libGluZyA9IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcbiAgICAgICAgICBiZWZvcmU6IG5leHRTaWJsaW5nLFxuICAgICAgICAgIGZhY3RvcnlBcmdzOiBbQ29tbW9uLnRvQXJyYXkoYXJndW1lbnRzKV1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoQ29tbW9uLmlzQXJyYXkoX29wdGlvbnMpIHx8IENvbW1vbi5pc09iamVjdChfb3B0aW9ucykpIHtcbiAgICAgICAgdmFyIF9uZXh0U2libGluZyA9IGNvbnRyb2xsZXIuX19saS5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGNvbnRyb2xsZXIucmVtb3ZlKCk7XG4gICAgICAgIHJldHVybiBfYWRkKGd1aSwgY29udHJvbGxlci5vYmplY3QsIGNvbnRyb2xsZXIucHJvcGVydHksIHtcbiAgICAgICAgICBiZWZvcmU6IF9uZXh0U2libGluZyxcbiAgICAgICAgICBmYWN0b3J5QXJnczogW19vcHRpb25zXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG5hbWU6IGZ1bmN0aW9uIG5hbWUoX25hbWUpIHtcbiAgICAgIGNvbnRyb2xsZXIuX19saS5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5pbm5lckhUTUwgPSBfbmFtZTtcbiAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH0sXG4gICAgbGlzdGVuOiBmdW5jdGlvbiBsaXN0ZW4oKSB7XG4gICAgICBjb250cm9sbGVyLl9fZ3VpLmxpc3Rlbihjb250cm9sbGVyKTtcbiAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICBjb250cm9sbGVyLl9fZ3VpLnJlbW92ZShjb250cm9sbGVyKTtcbiAgICAgIHJldHVybiBjb250cm9sbGVyO1xuICAgIH1cbiAgfSk7XG4gIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgTnVtYmVyQ29udHJvbGxlclNsaWRlcikge1xuICAgIHZhciBib3ggPSBuZXcgTnVtYmVyQ29udHJvbGxlckJveChjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwgeyBtaW46IGNvbnRyb2xsZXIuX19taW4sIG1heDogY29udHJvbGxlci5fX21heCwgc3RlcDogY29udHJvbGxlci5fX3N0ZXAgfSk7XG4gICAgQ29tbW9uLmVhY2goWyd1cGRhdGVEaXNwbGF5JywgJ29uQ2hhbmdlJywgJ29uRmluaXNoQ2hhbmdlJywgJ3N0ZXAnLCAnbWluJywgJ21heCddLCBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICB2YXIgcGMgPSBjb250cm9sbGVyW21ldGhvZF07XG4gICAgICB2YXIgcGIgPSBib3hbbWV0aG9kXTtcbiAgICAgIGNvbnRyb2xsZXJbbWV0aG9kXSA9IGJveFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHBiLmFwcGx5KGJveCwgYXJncyk7XG4gICAgICAgIHJldHVybiBwYy5hcHBseShjb250cm9sbGVyLCBhcmdzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgZG9tLmFkZENsYXNzKGxpLCAnaGFzLXNsaWRlcicpO1xuICAgIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoYm94LmRvbUVsZW1lbnQsIGNvbnRyb2xsZXIuZG9tRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCk7XG4gIH0gZWxzZSBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIE51bWJlckNvbnRyb2xsZXJCb3gpIHtcbiAgICB2YXIgciA9IGZ1bmN0aW9uIHIocmV0dXJuZWQpIHtcbiAgICAgIGlmIChDb21tb24uaXNOdW1iZXIoY29udHJvbGxlci5fX21pbikgJiYgQ29tbW9uLmlzTnVtYmVyKGNvbnRyb2xsZXIuX19tYXgpKSB7XG4gICAgICAgIHZhciBvbGROYW1lID0gY29udHJvbGxlci5fX2xpLmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkLmlubmVySFRNTDtcbiAgICAgICAgdmFyIHdhc0xpc3RlbmluZyA9IGNvbnRyb2xsZXIuX19ndWkuX19saXN0ZW5pbmcuaW5kZXhPZihjb250cm9sbGVyKSA+IC0xO1xuICAgICAgICBjb250cm9sbGVyLnJlbW92ZSgpO1xuICAgICAgICB2YXIgbmV3Q29udHJvbGxlciA9IF9hZGQoZ3VpLCBjb250cm9sbGVyLm9iamVjdCwgY29udHJvbGxlci5wcm9wZXJ0eSwge1xuICAgICAgICAgIGJlZm9yZTogY29udHJvbGxlci5fX2xpLm5leHRFbGVtZW50U2libGluZyxcbiAgICAgICAgICBmYWN0b3J5QXJnczogW2NvbnRyb2xsZXIuX19taW4sIGNvbnRyb2xsZXIuX19tYXgsIGNvbnRyb2xsZXIuX19zdGVwXVxuICAgICAgICB9KTtcbiAgICAgICAgbmV3Q29udHJvbGxlci5uYW1lKG9sZE5hbWUpO1xuICAgICAgICBpZiAod2FzTGlzdGVuaW5nKSBuZXdDb250cm9sbGVyLmxpc3RlbigpO1xuICAgICAgICByZXR1cm4gbmV3Q29udHJvbGxlcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICB9O1xuICAgIGNvbnRyb2xsZXIubWluID0gQ29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5taW4pO1xuICAgIGNvbnRyb2xsZXIubWF4ID0gQ29tbW9uLmNvbXBvc2UociwgY29udHJvbGxlci5tYXgpO1xuICB9IGVsc2UgaWYgKGNvbnRyb2xsZXIgaW5zdGFuY2VvZiBCb29sZWFuQ29udHJvbGxlcikge1xuICAgIGRvbS5iaW5kKGxpLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkb20uZmFrZUV2ZW50KGNvbnRyb2xsZXIuX19jaGVja2JveCwgJ2NsaWNrJyk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQoY29udHJvbGxlci5fX2NoZWNrYm94LCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgRnVuY3Rpb25Db250cm9sbGVyKSB7XG4gICAgZG9tLmJpbmQobGksICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbS5mYWtlRXZlbnQoY29udHJvbGxlci5fX2J1dHRvbiwgJ2NsaWNrJyk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQobGksICdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkb20uYWRkQ2xhc3MoY29udHJvbGxlci5fX2J1dHRvbiwgJ2hvdmVyJyk7XG4gICAgfSk7XG4gICAgZG9tLmJpbmQobGksICdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhjb250cm9sbGVyLl9fYnV0dG9uLCAnaG92ZXInKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChjb250cm9sbGVyIGluc3RhbmNlb2YgQ29sb3JDb250cm9sbGVyKSB7XG4gICAgZG9tLmFkZENsYXNzKGxpLCAnY29sb3InKTtcbiAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkgPSBDb21tb24uY29tcG9zZShmdW5jdGlvbiAodmFsKSB7XG4gICAgICBsaS5zdHlsZS5ib3JkZXJMZWZ0Q29sb3IgPSBjb250cm9sbGVyLl9fY29sb3IudG9TdHJpbmcoKTtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfSwgY29udHJvbGxlci51cGRhdGVEaXNwbGF5KTtcbiAgICBjb250cm9sbGVyLnVwZGF0ZURpc3BsYXkoKTtcbiAgfVxuICBjb250cm9sbGVyLnNldFZhbHVlID0gQ29tbW9uLmNvbXBvc2UoZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmIChndWkuZ2V0Um9vdCgpLl9fcHJlc2V0X3NlbGVjdCAmJiBjb250cm9sbGVyLmlzTW9kaWZpZWQoKSkge1xuICAgICAgbWFya1ByZXNldE1vZGlmaWVkKGd1aS5nZXRSb290KCksIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsO1xuICB9LCBjb250cm9sbGVyLnNldFZhbHVlKTtcbn1cbmZ1bmN0aW9uIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKSB7XG4gIHZhciByb290ID0gZ3VpLmdldFJvb3QoKTtcbiAgdmFyIG1hdGNoZWRJbmRleCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0cy5pbmRleE9mKGNvbnRyb2xsZXIub2JqZWN0KTtcbiAgaWYgKG1hdGNoZWRJbmRleCAhPT0gLTEpIHtcbiAgICB2YXIgY29udHJvbGxlck1hcCA9IHJvb3QuX19yZW1lbWJlcmVkT2JqZWN0SW5kZWNlc1RvQ29udHJvbGxlcnNbbWF0Y2hlZEluZGV4XTtcbiAgICBpZiAoY29udHJvbGxlck1hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250cm9sbGVyTWFwID0ge307XG4gICAgICByb290Ll9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW21hdGNoZWRJbmRleF0gPSBjb250cm9sbGVyTWFwO1xuICAgIH1cbiAgICBjb250cm9sbGVyTWFwW2NvbnRyb2xsZXIucHJvcGVydHldID0gY29udHJvbGxlcjtcbiAgICBpZiAocm9vdC5sb2FkICYmIHJvb3QubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgICB2YXIgcHJlc2V0TWFwID0gcm9vdC5sb2FkLnJlbWVtYmVyZWQ7XG4gICAgICB2YXIgcHJlc2V0ID0gdm9pZCAwO1xuICAgICAgaWYgKHByZXNldE1hcFtndWkucHJlc2V0XSkge1xuICAgICAgICBwcmVzZXQgPSBwcmVzZXRNYXBbZ3VpLnByZXNldF07XG4gICAgICB9IGVsc2UgaWYgKHByZXNldE1hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdKSB7XG4gICAgICAgIHByZXNldCA9IHByZXNldE1hcFtERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHByZXNldFttYXRjaGVkSW5kZXhdICYmIHByZXNldFttYXRjaGVkSW5kZXhdW2NvbnRyb2xsZXIucHJvcGVydHldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcHJlc2V0W21hdGNoZWRJbmRleF1bY29udHJvbGxlci5wcm9wZXJ0eV07XG4gICAgICAgIGNvbnRyb2xsZXIuaW5pdGlhbFZhbHVlID0gdmFsdWU7XG4gICAgICAgIGNvbnRyb2xsZXIuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gX2FkZChndWksIG9iamVjdCwgcHJvcGVydHksIHBhcmFtcykge1xuICBpZiAob2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QgXCInICsgb2JqZWN0ICsgJ1wiIGhhcyBubyBwcm9wZXJ0eSBcIicgKyBwcm9wZXJ0eSArICdcIicpO1xuICB9XG4gIHZhciBjb250cm9sbGVyID0gdm9pZCAwO1xuICBpZiAocGFyYW1zLmNvbG9yKSB7XG4gICAgY29udHJvbGxlciA9IG5ldyBDb2xvckNvbnRyb2xsZXIob2JqZWN0LCBwcm9wZXJ0eSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGZhY3RvcnlBcmdzID0gW29iamVjdCwgcHJvcGVydHldLmNvbmNhdChwYXJhbXMuZmFjdG9yeUFyZ3MpO1xuICAgIGNvbnRyb2xsZXIgPSBDb250cm9sbGVyRmFjdG9yeS5hcHBseShndWksIGZhY3RvcnlBcmdzKTtcbiAgfVxuICBpZiAocGFyYW1zLmJlZm9yZSBpbnN0YW5jZW9mIENvbnRyb2xsZXIpIHtcbiAgICBwYXJhbXMuYmVmb3JlID0gcGFyYW1zLmJlZm9yZS5fX2xpO1xuICB9XG4gIHJlY2FsbFNhdmVkVmFsdWUoZ3VpLCBjb250cm9sbGVyKTtcbiAgZG9tLmFkZENsYXNzKGNvbnRyb2xsZXIuZG9tRWxlbWVudCwgJ2MnKTtcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRvbS5hZGRDbGFzcyhuYW1lLCAncHJvcGVydHktbmFtZScpO1xuICBuYW1lLmlubmVySFRNTCA9IGNvbnRyb2xsZXIucHJvcGVydHk7XG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5hbWUpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udHJvbGxlci5kb21FbGVtZW50KTtcbiAgdmFyIGxpID0gYWRkUm93KGd1aSwgY29udGFpbmVyLCBwYXJhbXMuYmVmb3JlKTtcbiAgZG9tLmFkZENsYXNzKGxpLCBHVUkuQ0xBU1NfQ09OVFJPTExFUl9ST1cpO1xuICBpZiAoY29udHJvbGxlciBpbnN0YW5jZW9mIENvbG9yQ29udHJvbGxlcikge1xuICAgIGRvbS5hZGRDbGFzcyhsaSwgJ2NvbG9yJyk7XG4gIH0gZWxzZSB7XG4gICAgZG9tLmFkZENsYXNzKGxpLCBfdHlwZW9mKGNvbnRyb2xsZXIuZ2V0VmFsdWUoKSkpO1xuICB9XG4gIGF1Z21lbnRDb250cm9sbGVyKGd1aSwgbGksIGNvbnRyb2xsZXIpO1xuICBndWkuX19jb250cm9sbGVycy5wdXNoKGNvbnRyb2xsZXIpO1xuICByZXR1cm4gY29udHJvbGxlcjtcbn1cbmZ1bmN0aW9uIGdldExvY2FsU3RvcmFnZUhhc2goZ3VpLCBrZXkpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgKyAnLicgKyBrZXk7XG59XG5mdW5jdGlvbiBhZGRQcmVzZXRPcHRpb24oZ3VpLCBuYW1lLCBzZXRTZWxlY3RlZCkge1xuICB2YXIgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gIG9wdC5pbm5lckhUTUwgPSBuYW1lO1xuICBvcHQudmFsdWUgPSBuYW1lO1xuICBndWkuX19wcmVzZXRfc2VsZWN0LmFwcGVuZENoaWxkKG9wdCk7XG4gIGlmIChzZXRTZWxlY3RlZCkge1xuICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoIC0gMTtcbiAgfVxufVxuZnVuY3Rpb24gc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbikge1xuICBleHBsYWluLnN0eWxlLmRpc3BsYXkgPSBndWkudXNlTG9jYWxTdG9yYWdlID8gJ2Jsb2NrJyA6ICdub25lJztcbn1cbmZ1bmN0aW9uIGFkZFNhdmVNZW51KGd1aSkge1xuICB2YXIgZGl2ID0gZ3VpLl9fc2F2ZV9yb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBkb20uYWRkQ2xhc3MoZ3VpLmRvbUVsZW1lbnQsICdoYXMtc2F2ZScpO1xuICBndWkuX191bC5pbnNlcnRCZWZvcmUoZGl2LCBndWkuX191bC5maXJzdENoaWxkKTtcbiAgZG9tLmFkZENsYXNzKGRpdiwgJ3NhdmUtcm93Jyk7XG4gIHZhciBnZWFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZ2VhcnMuaW5uZXJIVE1MID0gJyZuYnNwOyc7XG4gIGRvbS5hZGRDbGFzcyhnZWFycywgJ2J1dHRvbiBnZWFycycpO1xuICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBidXR0b24uaW5uZXJIVE1MID0gJ1NhdmUnO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uLCAnYnV0dG9uJyk7XG4gIGRvbS5hZGRDbGFzcyhidXR0b24sICdzYXZlJyk7XG4gIHZhciBidXR0b24yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBidXR0b24yLmlubmVySFRNTCA9ICdOZXcnO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ2J1dHRvbicpO1xuICBkb20uYWRkQ2xhc3MoYnV0dG9uMiwgJ3NhdmUtYXMnKTtcbiAgdmFyIGJ1dHRvbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGJ1dHRvbjMuaW5uZXJIVE1MID0gJ1JldmVydCc7XG4gIGRvbS5hZGRDbGFzcyhidXR0b24zLCAnYnV0dG9uJyk7XG4gIGRvbS5hZGRDbGFzcyhidXR0b24zLCAncmV2ZXJ0Jyk7XG4gIHZhciBzZWxlY3QgPSBndWkuX19wcmVzZXRfc2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gIGlmIChndWkubG9hZCAmJiBndWkubG9hZC5yZW1lbWJlcmVkKSB7XG4gICAgQ29tbW9uLmVhY2goZ3VpLmxvYWQucmVtZW1iZXJlZCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIGFkZFByZXNldE9wdGlvbihndWksIGtleSwga2V5ID09PSBndWkucHJlc2V0KTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBhZGRQcmVzZXRPcHRpb24oZ3VpLCBERUZBVUxUX0RFRkFVTFRfUFJFU0VUX05BTUUsIGZhbHNlKTtcbiAgfVxuICBkb20uYmluZChzZWxlY3QsICdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGd1aS5fX3ByZXNldF9zZWxlY3QubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS5pbm5lckhUTUwgPSBndWkuX19wcmVzZXRfc2VsZWN0W2luZGV4XS52YWx1ZTtcbiAgICB9XG4gICAgZ3VpLnByZXNldCA9IHRoaXMudmFsdWU7XG4gIH0pO1xuICBkaXYuYXBwZW5kQ2hpbGQoc2VsZWN0KTtcbiAgZGl2LmFwcGVuZENoaWxkKGdlYXJzKTtcbiAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIGRpdi5hcHBlbmRDaGlsZChidXR0b24yKTtcbiAgZGl2LmFwcGVuZENoaWxkKGJ1dHRvbjMpO1xuICBpZiAoU1VQUE9SVFNfTE9DQUxfU1RPUkFHRSkge1xuICAgIHZhciBleHBsYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RnLWxvY2FsLWV4cGxhaW4nKTtcbiAgICB2YXIgbG9jYWxTdG9yYWdlQ2hlY2tCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbG9jYWwtc3RvcmFnZScpO1xuICAgIHZhciBzYXZlTG9jYWxseSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZy1zYXZlLWxvY2FsbHknKTtcbiAgICBzYXZlTG9jYWxseS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0TG9jYWxTdG9yYWdlSGFzaChndWksICdpc0xvY2FsJykpID09PSAndHJ1ZScpIHtcbiAgICAgIGxvY2FsU3RvcmFnZUNoZWNrQm94LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJyk7XG4gICAgfVxuICAgIHNob3dIaWRlRXhwbGFpbihndWksIGV4cGxhaW4pO1xuICAgIGRvbS5iaW5kKGxvY2FsU3RvcmFnZUNoZWNrQm94LCAnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgZ3VpLnVzZUxvY2FsU3RvcmFnZSA9ICFndWkudXNlTG9jYWxTdG9yYWdlO1xuICAgICAgc2hvd0hpZGVFeHBsYWluKGd1aSwgZXhwbGFpbik7XG4gICAgfSk7XG4gIH1cbiAgdmFyIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGctbmV3LWNvbnN0cnVjdG9yJyk7XG4gIGRvbS5iaW5kKG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEsICdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5tZXRhS2V5ICYmIChlLndoaWNoID09PSA2NyB8fCBlLmtleUNvZGUgPT09IDY3KSkge1xuICAgICAgU0FWRV9ESUFMT0dVRS5oaWRlKCk7XG4gICAgfVxuICB9KTtcbiAgZG9tLmJpbmQoZ2VhcnMsICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBuZXdDb25zdHJ1Y3RvclRleHRBcmVhLmlubmVySFRNTCA9IEpTT04uc3RyaW5naWZ5KGd1aS5nZXRTYXZlT2JqZWN0KCksIHVuZGVmaW5lZCwgMik7XG4gICAgU0FWRV9ESUFMT0dVRS5zaG93KCk7XG4gICAgbmV3Q29uc3RydWN0b3JUZXh0QXJlYS5mb2N1cygpO1xuICAgIG5ld0NvbnN0cnVjdG9yVGV4dEFyZWEuc2VsZWN0KCk7XG4gIH0pO1xuICBkb20uYmluZChidXR0b24sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBndWkuc2F2ZSgpO1xuICB9KTtcbiAgZG9tLmJpbmQoYnV0dG9uMiwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcmVzZXROYW1lID0gcHJvbXB0KCdFbnRlciBhIG5ldyBwcmVzZXQgbmFtZS4nKTtcbiAgICBpZiAocHJlc2V0TmFtZSkge1xuICAgICAgZ3VpLnNhdmVBcyhwcmVzZXROYW1lKTtcbiAgICB9XG4gIH0pO1xuICBkb20uYmluZChidXR0b24zLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgZ3VpLnJldmVydCgpO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFJlc2l6ZUhhbmRsZShndWkpIHtcbiAgdmFyIHBtb3VzZVggPSB2b2lkIDA7XG4gIGd1aS5fX3Jlc2l6ZV9oYW5kbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgQ29tbW9uLmV4dGVuZChndWkuX19yZXNpemVfaGFuZGxlLnN0eWxlLCB7XG4gICAgd2lkdGg6ICc2cHgnLFxuICAgIG1hcmdpbkxlZnQ6ICctM3B4JyxcbiAgICBoZWlnaHQ6ICcyMDBweCcsXG4gICAgY3Vyc29yOiAnZXctcmVzaXplJyxcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICB9KTtcbiAgZnVuY3Rpb24gZHJhZyhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGd1aS53aWR0aCArPSBwbW91c2VYIC0gZS5jbGllbnRYO1xuICAgIGd1aS5vblJlc2l6ZSgpO1xuICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdTdG9wKCkge1xuICAgIGRvbS5yZW1vdmVDbGFzcyhndWkuX19jbG9zZUJ1dHRvbiwgR1VJLkNMQVNTX0RSQUcpO1xuICAgIGRvbS51bmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgZG9tLnVuYmluZCh3aW5kb3csICdtb3VzZXVwJywgZHJhZ1N0b3ApO1xuICB9XG4gIGZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHBtb3VzZVggPSBlLmNsaWVudFg7XG4gICAgZG9tLmFkZENsYXNzKGd1aS5fX2Nsb3NlQnV0dG9uLCBHVUkuQ0xBU1NfRFJBRyk7XG4gICAgZG9tLmJpbmQod2luZG93LCAnbW91c2Vtb3ZlJywgZHJhZyk7XG4gICAgZG9tLmJpbmQod2luZG93LCAnbW91c2V1cCcsIGRyYWdTdG9wKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZG9tLmJpbmQoZ3VpLl9fcmVzaXplX2hhbmRsZSwgJ21vdXNlZG93bicsIGRyYWdTdGFydCk7XG4gIGRvbS5iaW5kKGd1aS5fX2Nsb3NlQnV0dG9uLCAnbW91c2Vkb3duJywgZHJhZ1N0YXJ0KTtcbiAgZ3VpLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGd1aS5fX3Jlc2l6ZV9oYW5kbGUsIGd1aS5kb21FbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKTtcbn1cbmZ1bmN0aW9uIHNldFdpZHRoKGd1aSwgdykge1xuICBndWkuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHcgKyAncHgnO1xuICBpZiAoZ3VpLl9fc2F2ZV9yb3cgJiYgZ3VpLmF1dG9QbGFjZSkge1xuICAgIGd1aS5fX3NhdmVfcm93LnN0eWxlLndpZHRoID0gdyArICdweCc7XG4gIH1cbiAgaWYgKGd1aS5fX2Nsb3NlQnV0dG9uKSB7XG4gICAgZ3VpLl9fY2xvc2VCdXR0b24uc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgfVxufVxuZnVuY3Rpb24gZ2V0Q3VycmVudFByZXNldChndWksIHVzZUluaXRpYWxWYWx1ZXMpIHtcbiAgdmFyIHRvUmV0dXJuID0ge307XG4gIENvbW1vbi5lYWNoKGd1aS5fX3JlbWVtYmVyZWRPYmplY3RzLCBmdW5jdGlvbiAodmFsLCBpbmRleCkge1xuICAgIHZhciBzYXZlZFZhbHVlcyA9IHt9O1xuICAgIHZhciBjb250cm9sbGVyTWFwID0gZ3VpLl9fcmVtZW1iZXJlZE9iamVjdEluZGVjZXNUb0NvbnRyb2xsZXJzW2luZGV4XTtcbiAgICBDb21tb24uZWFjaChjb250cm9sbGVyTWFwLCBmdW5jdGlvbiAoY29udHJvbGxlciwgcHJvcGVydHkpIHtcbiAgICAgIHNhdmVkVmFsdWVzW3Byb3BlcnR5XSA9IHVzZUluaXRpYWxWYWx1ZXMgPyBjb250cm9sbGVyLmluaXRpYWxWYWx1ZSA6IGNvbnRyb2xsZXIuZ2V0VmFsdWUoKTtcbiAgICB9KTtcbiAgICB0b1JldHVybltpbmRleF0gPSBzYXZlZFZhbHVlcztcbiAgfSk7XG4gIHJldHVybiB0b1JldHVybjtcbn1cbmZ1bmN0aW9uIHNldFByZXNldFNlbGVjdEluZGV4KGd1aSkge1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgZ3VpLl9fcHJlc2V0X3NlbGVjdC5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBpZiAoZ3VpLl9fcHJlc2V0X3NlbGVjdFtpbmRleF0udmFsdWUgPT09IGd1aS5wcmVzZXQpIHtcbiAgICAgIGd1aS5fX3ByZXNldF9zZWxlY3Quc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlRGlzcGxheXMoY29udHJvbGxlckFycmF5KSB7XG4gIGlmIChjb250cm9sbGVyQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lJDEuY2FsbCh3aW5kb3csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHVwZGF0ZURpc3BsYXlzKGNvbnRyb2xsZXJBcnJheSk7XG4gICAgfSk7XG4gIH1cbiAgQ29tbW9uLmVhY2goY29udHJvbGxlckFycmF5LCBmdW5jdGlvbiAoYykge1xuICAgIGMudXBkYXRlRGlzcGxheSgpO1xuICB9KTtcbn1cblxudmFyIGNvbG9yID0ge1xuICBDb2xvcjogQ29sb3IsXG4gIG1hdGg6IENvbG9yTWF0aCxcbiAgaW50ZXJwcmV0OiBpbnRlcnByZXRcbn07XG52YXIgY29udHJvbGxlcnMgPSB7XG4gIENvbnRyb2xsZXI6IENvbnRyb2xsZXIsXG4gIEJvb2xlYW5Db250cm9sbGVyOiBCb29sZWFuQ29udHJvbGxlcixcbiAgT3B0aW9uQ29udHJvbGxlcjogT3B0aW9uQ29udHJvbGxlcixcbiAgU3RyaW5nQ29udHJvbGxlcjogU3RyaW5nQ29udHJvbGxlcixcbiAgTnVtYmVyQ29udHJvbGxlcjogTnVtYmVyQ29udHJvbGxlcixcbiAgTnVtYmVyQ29udHJvbGxlckJveDogTnVtYmVyQ29udHJvbGxlckJveCxcbiAgTnVtYmVyQ29udHJvbGxlclNsaWRlcjogTnVtYmVyQ29udHJvbGxlclNsaWRlcixcbiAgRnVuY3Rpb25Db250cm9sbGVyOiBGdW5jdGlvbkNvbnRyb2xsZXIsXG4gIENvbG9yQ29udHJvbGxlcjogQ29sb3JDb250cm9sbGVyXG59O1xudmFyIGRvbSQxID0geyBkb206IGRvbSB9O1xudmFyIGd1aSA9IHsgR1VJOiBHVUkgfTtcbnZhciBHVUkkMSA9IEdVSTtcbnZhciBpbmRleCA9IHtcbiAgY29sb3I6IGNvbG9yLFxuICBjb250cm9sbGVyczogY29udHJvbGxlcnMsXG4gIGRvbTogZG9tJDEsXG4gIGd1aTogZ3VpLFxuICBHVUk6IEdVSSQxXG59O1xuXG5leHBvcnRzLmNvbG9yID0gY29sb3I7XG5leHBvcnRzLmNvbnRyb2xsZXJzID0gY29udHJvbGxlcnM7XG5leHBvcnRzLmRvbSA9IGRvbSQxO1xuZXhwb3J0cy5ndWkgPSBndWk7XG5leHBvcnRzLkdVSSA9IEdVSSQxO1xuZXhwb3J0c1snZGVmYXVsdCddID0gaW5kZXg7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXQuZ3VpLmpzLm1hcFxuIiwiLyogaW50ZXJhY3QuanMgMS45LjggfCBodHRwczovL3Jhdy5naXRodWIuY29tL3RheWUvaW50ZXJhY3QuanMvbWFzdGVyL0xJQ0VOU0UgKi9cbiFmdW5jdGlvbih0KXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz10KCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHQpO2Vsc2V7KFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3c/d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZWxmP3NlbGY6dGhpcykuaW50ZXJhY3Q9dCgpfX0oZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUpe3ZhciBuO3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gbnx8ZShuPXtleHBvcnRzOnt9LHBhcmVudDp0fSxuLmV4cG9ydHMpLG4uZXhwb3J0c319dmFyIGs9dChmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGEodCl7cmV0dXJuKGE9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGUuZGVmYXVsdD1lLkludGVyYWN0YWJsZT12b2lkIDA7dmFyIHU9cihTKSxsPW4oQykscz1uKFYpLGM9bihjdCksZj1yKHcpLHA9bihmdCksaT1uKGJ0KSxkPW0oe30pO2Z1bmN0aW9uIG4odCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIHYoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiB2PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gcih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1hKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPXYoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119cmV0dXJuIG4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbiksbn1mdW5jdGlvbiBvKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiB5KHQsZSxuKXtyZXR1cm4gZSYmbyh0LnByb3RvdHlwZSxlKSxuJiZvKHQsbiksdH1mdW5jdGlvbiBoKHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH12YXIgZz1mdW5jdGlvbigpe2Z1bmN0aW9uIG8odCxlLG4scil7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxvKSx0aGlzLl9zY29wZUV2ZW50cz1yLGgodGhpcyxcIm9wdGlvbnNcIix2b2lkIDApLGgodGhpcyxcIl9hY3Rpb25zXCIsdm9pZCAwKSxoKHRoaXMsXCJ0YXJnZXRcIix2b2lkIDApLGgodGhpcyxcImV2ZW50c1wiLG5ldyBpLmRlZmF1bHQpLGgodGhpcyxcIl9jb250ZXh0XCIsdm9pZCAwKSxoKHRoaXMsXCJfd2luXCIsdm9pZCAwKSxoKHRoaXMsXCJfZG9jXCIsdm9pZCAwKSx0aGlzLl9hY3Rpb25zPWUuYWN0aW9ucyx0aGlzLnRhcmdldD10LHRoaXMuX2NvbnRleHQ9ZS5jb250ZXh0fHxuLHRoaXMuX3dpbj0oMCxPLmdldFdpbmRvdykoKDAsJC50cnlTZWxlY3RvcikodCk/dGhpcy5fY29udGV4dDp0KSx0aGlzLl9kb2M9dGhpcy5fd2luLmRvY3VtZW50LHRoaXMuc2V0KGUpfXJldHVybiB5KG8sW3trZXk6XCJfZGVmYXVsdHNcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm57YmFzZTp7fSxwZXJBY3Rpb246e30sYWN0aW9uczp7fX19fV0pLHkobyxbe2tleTpcInNldE9uRXZlbnRzXCIsdmFsdWU6ZnVuY3Rpb24odCxlKXtyZXR1cm4gZi5mdW5jKGUub25zdGFydCkmJnRoaXMub24oXCJcIi5jb25jYXQodCxcInN0YXJ0XCIpLGUub25zdGFydCksZi5mdW5jKGUub25tb3ZlKSYmdGhpcy5vbihcIlwiLmNvbmNhdCh0LFwibW92ZVwiKSxlLm9ubW92ZSksZi5mdW5jKGUub25lbmQpJiZ0aGlzLm9uKFwiXCIuY29uY2F0KHQsXCJlbmRcIiksZS5vbmVuZCksZi5mdW5jKGUub25pbmVydGlhc3RhcnQpJiZ0aGlzLm9uKFwiXCIuY29uY2F0KHQsXCJpbmVydGlhc3RhcnRcIiksZS5vbmluZXJ0aWFzdGFydCksdGhpc319LHtrZXk6XCJ1cGRhdGVQZXJBY3Rpb25MaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7KGYuYXJyYXkoZSl8fGYub2JqZWN0KGUpKSYmdGhpcy5vZmYodCxlKSwoZi5hcnJheShuKXx8Zi5vYmplY3QobikpJiZ0aGlzLm9uKHQsbil9fSx7a2V5Olwic2V0UGVyQWN0aW9uXCIsdmFsdWU6ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLl9kZWZhdWx0cztmb3IodmFyIHIgaW4gZSl7dmFyIG89cixpPXRoaXMub3B0aW9uc1t0XSxhPWVbb107XCJsaXN0ZW5lcnNcIj09PW8mJnRoaXMudXBkYXRlUGVyQWN0aW9uTGlzdGVuZXJzKHQsaS5saXN0ZW5lcnMsYSksZi5hcnJheShhKT9pW29dPXUuZnJvbShhKTpmLnBsYWluT2JqZWN0KGEpPyhpW29dPSgwLGMuZGVmYXVsdCkoaVtvXXx8e30sKDAscy5kZWZhdWx0KShhKSksZi5vYmplY3Qobi5wZXJBY3Rpb25bb10pJiZcImVuYWJsZWRcImluIG4ucGVyQWN0aW9uW29dJiYoaVtvXS5lbmFibGVkPSExIT09YS5lbmFibGVkKSk6Zi5ib29sKGEpJiZmLm9iamVjdChuLnBlckFjdGlvbltvXSk/aVtvXS5lbmFibGVkPWE6aVtvXT1hfX19LHtrZXk6XCJnZXRSZWN0XCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHQ9dHx8KGYuZWxlbWVudCh0aGlzLnRhcmdldCk/dGhpcy50YXJnZXQ6bnVsbCksZi5zdHJpbmcodGhpcy50YXJnZXQpJiYodD10fHx0aGlzLl9jb250ZXh0LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXQpKSwoMCwkLmdldEVsZW1lbnRSZWN0KSh0KX19LHtrZXk6XCJyZWN0Q2hlY2tlclwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiBmLmZ1bmModCk/KHRoaXMuZ2V0UmVjdD10LHRoaXMpOm51bGw9PT10PyhkZWxldGUgdGhpcy5nZXRSZWN0LHRoaXMpOnRoaXMuZ2V0UmVjdH19LHtrZXk6XCJfYmFja0NvbXBhdE9wdGlvblwiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7aWYoKDAsJC50cnlTZWxlY3RvcikoZSl8fGYub2JqZWN0KGUpKXtmb3IodmFyIG4gaW4gdGhpcy5vcHRpb25zW3RdPWUsdGhpcy5fYWN0aW9ucy5tYXApdGhpcy5vcHRpb25zW25dW3RdPWU7cmV0dXJuIHRoaXN9cmV0dXJuIHRoaXMub3B0aW9uc1t0XX19LHtrZXk6XCJvcmlnaW5cIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbihcIm9yaWdpblwiLHQpfX0se2tleTpcImRlbHRhU291cmNlXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuXCJwYWdlXCI9PT10fHxcImNsaWVudFwiPT09dD8odGhpcy5vcHRpb25zLmRlbHRhU291cmNlPXQsdGhpcyk6dGhpcy5vcHRpb25zLmRlbHRhU291cmNlfX0se2tleTpcImNvbnRleHRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9jb250ZXh0fX0se2tleTpcImluQ29udGV4dFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLl9jb250ZXh0PT09dC5vd25lckRvY3VtZW50fHwoMCwkLm5vZGVDb250YWlucykodGhpcy5fY29udGV4dCx0KX19LHtrZXk6XCJ0ZXN0SWdub3JlQWxsb3dcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIXRoaXMudGVzdElnbm9yZSh0Lmlnbm9yZUZyb20sZSxuKSYmdGhpcy50ZXN0QWxsb3codC5hbGxvd0Zyb20sZSxuKX19LHtrZXk6XCJ0ZXN0QWxsb3dcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIXR8fCEhZi5lbGVtZW50KG4pJiYoZi5zdHJpbmcodCk/KDAsJC5tYXRjaGVzVXBUbykobix0LGUpOiEhZi5lbGVtZW50KHQpJiYoMCwkLm5vZGVDb250YWlucykodCxuKSl9fSx7a2V5OlwidGVzdElnbm9yZVwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4hKCF0fHwhZi5lbGVtZW50KG4pKSYmKGYuc3RyaW5nKHQpPygwLCQubWF0Y2hlc1VwVG8pKG4sdCxlKTohIWYuZWxlbWVudCh0KSYmKDAsJC5ub2RlQ29udGFpbnMpKHQsbikpfX0se2tleTpcImZpcmVcIix2YWx1ZTpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5ldmVudHMuZmlyZSh0KSx0aGlzfX0se2tleTpcIl9vbk9mZlwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLHIpe2Yub2JqZWN0KGUpJiYhZi5hcnJheShlKSYmKHI9bixuPW51bGwpO3ZhciBvPVwib25cIj09PXQ/XCJhZGRcIjpcInJlbW92ZVwiLGk9KDAscC5kZWZhdWx0KShlLG4pO2Zvcih2YXIgYSBpbiBpKXtcIndoZWVsXCI9PT1hJiYoYT1sLmRlZmF1bHQud2hlZWxFdmVudCk7Zm9yKHZhciB1PTA7dTxpW2FdLmxlbmd0aDt1Kyspe3ZhciBzPWlbYV1bdV07KDAsZC5pc05vbk5hdGl2ZUV2ZW50KShhLHRoaXMuX2FjdGlvbnMpP3RoaXMuZXZlbnRzW3RdKGEscyk6Zi5zdHJpbmcodGhpcy50YXJnZXQpP3RoaXMuX3Njb3BlRXZlbnRzW1wiXCIuY29uY2F0KG8sXCJEZWxlZ2F0ZVwiKV0odGhpcy50YXJnZXQsdGhpcy5fY29udGV4dCxhLHMscik6dGhpcy5fc2NvcGVFdmVudHNbb10odGhpcy50YXJnZXQsYSxzLHIpfX1yZXR1cm4gdGhpc319LHtrZXk6XCJvblwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gdGhpcy5fb25PZmYoXCJvblwiLHQsZSxuKX19LHtrZXk6XCJvZmZcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7cmV0dXJuIHRoaXMuX29uT2ZmKFwib2ZmXCIsdCxlLG4pfX0se2tleTpcInNldFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuX2RlZmF1bHRzO2Zvcih2YXIgbiBpbiBmLm9iamVjdCh0KXx8KHQ9e30pLHRoaXMub3B0aW9ucz0oMCxzLmRlZmF1bHQpKGUuYmFzZSksdGhpcy5fYWN0aW9ucy5tZXRob2REaWN0KXt2YXIgcj1uLG89dGhpcy5fYWN0aW9ucy5tZXRob2REaWN0W3JdO3RoaXMub3B0aW9uc1tyXT17fSx0aGlzLnNldFBlckFjdGlvbihyLCgwLGMuZGVmYXVsdCkoKDAsYy5kZWZhdWx0KSh7fSxlLnBlckFjdGlvbiksZS5hY3Rpb25zW3JdKSksdGhpc1tvXSh0W3JdKX1mb3IodmFyIGkgaW4gdClmLmZ1bmModGhpc1tpXSkmJnRoaXNbaV0odFtpXSk7cmV0dXJuIHRoaXN9fSx7a2V5OlwidW5zZXRcIix2YWx1ZTpmdW5jdGlvbigpe2lmKGYuc3RyaW5nKHRoaXMudGFyZ2V0KSlmb3IodmFyIHQgaW4gdGhpcy5fc2NvcGVFdmVudHMuZGVsZWdhdGVkRXZlbnRzKWZvcih2YXIgZT10aGlzLl9zY29wZUV2ZW50cy5kZWxlZ2F0ZWRFdmVudHNbdF0sbj1lLmxlbmd0aC0xOzA8PW47bi0tKXt2YXIgcj1lW25dLG89ci5zZWxlY3RvcixpPXIuY29udGV4dCxhPXIubGlzdGVuZXJzO289PT10aGlzLnRhcmdldCYmaT09PXRoaXMuX2NvbnRleHQmJmUuc3BsaWNlKG4sMSk7Zm9yKHZhciB1PWEubGVuZ3RoLTE7MDw9dTt1LS0pdGhpcy5fc2NvcGVFdmVudHMucmVtb3ZlRGVsZWdhdGUodGhpcy50YXJnZXQsdGhpcy5fY29udGV4dCx0LGFbdV1bMF0sYVt1XVsxXSl9ZWxzZSB0aGlzLl9zY29wZUV2ZW50cy5yZW1vdmUodGhpcy50YXJnZXQsXCJhbGxcIil9fV0pLG99KCksYj1lLkludGVyYWN0YWJsZT1nO2UuZGVmYXVsdD1ifSksbT10KGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5pc05vbk5hdGl2ZUV2ZW50PWZ1bmN0aW9uKHQsZSl7aWYoZS5waGFzZWxlc3NUeXBlc1t0XSlyZXR1cm4hMDtmb3IodmFyIG4gaW4gZS5tYXApaWYoMD09PXQuaW5kZXhPZihuKSYmdC5zdWJzdHIobi5sZW5ndGgpaW4gZS5waGFzZXMpcmV0dXJuITA7cmV0dXJuITF9LGUuaW5pdFNjb3BlPU0sZS5TY29wZT1lLmRlZmF1bHQ9dm9pZCAwO3ZhciBuPWQoRCkscj1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT12KHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPXAoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0obGUpLG89ZChidCksaT1kKFdlKSxhPWQoVCh7fSkpLHU9ZChrKHt9KSkscz1kKFplKSxsPWQoemUpLGM9ZChjbiksZj1kKEUoe30pKTtmdW5jdGlvbiBwKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gcD1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIGQodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIHYodCl7cmV0dXJuKHY9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWZ1bmN0aW9uIHkodCxlKXtyZXR1cm4hZXx8XCJvYmplY3RcIiE9PXYoZSkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGU/ZnVuY3Rpb24odCl7aWYodm9pZCAwIT09dClyZXR1cm4gdDt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIil9KHQpOmV9ZnVuY3Rpb24gaCh0LGUsbil7cmV0dXJuKGg9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFJlZmxlY3QmJlJlZmxlY3QuZ2V0P1JlZmxlY3QuZ2V0OmZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1mdW5jdGlvbih0LGUpe2Zvcig7IU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpJiZudWxsIT09KHQ9Zyh0KSk7KTtyZXR1cm4gdH0odCxlKTtpZihyKXt2YXIgbz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHIsZSk7cmV0dXJuIG8uZ2V0P28uZ2V0LmNhbGwobik6by52YWx1ZX19KSh0LGUsbnx8dCl9ZnVuY3Rpb24gZyh0KXtyZXR1cm4oZz1PYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldFByb3RvdHlwZU9mOmZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpfSkodCl9ZnVuY3Rpb24gYih0LGUpe3JldHVybihiPU9iamVjdC5zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5fX3Byb3RvX189ZSx0fSkodCxlKX1mdW5jdGlvbiBtKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1mdW5jdGlvbiBPKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiB3KHQsZSxuKXtyZXR1cm4gZSYmTyh0LnByb3RvdHlwZSxlKSxuJiZPKHQsbiksdH1mdW5jdGlvbiBfKHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH12YXIgUD1yLndpbix4PXIuYnJvd3NlcixTPXIucmFmLGo9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7dmFyIGU9dGhpczttKHRoaXMsdCksXyh0aGlzLFwiaWRcIixcIl9faW50ZXJhY3Rfc2NvcGVfXCIuY29uY2F0KE1hdGguZmxvb3IoMTAwKk1hdGgucmFuZG9tKCkpKSksXyh0aGlzLFwiaXNJbml0aWFsaXplZFwiLCExKSxfKHRoaXMsXCJsaXN0ZW5lck1hcHNcIixbXSksXyh0aGlzLFwiYnJvd3NlclwiLHgpLF8odGhpcyxcInV0aWxzXCIsciksXyh0aGlzLFwiZGVmYXVsdHNcIixyLmNsb25lKGwuZGVmYXVsdCkpLF8odGhpcyxcIkV2ZW50YWJsZVwiLG8uZGVmYXVsdCksXyh0aGlzLFwiYWN0aW9uc1wiLHttYXA6e30scGhhc2VzOntzdGFydDohMCxtb3ZlOiEwLGVuZDohMH0sbWV0aG9kRGljdDp7fSxwaGFzZWxlc3NUeXBlczp7fX0pLF8odGhpcyxcImludGVyYWN0U3RhdGljXCIsbmV3IGEuZGVmYXVsdCh0aGlzKSksXyh0aGlzLFwiSW50ZXJhY3RFdmVudFwiLGkuZGVmYXVsdCksXyh0aGlzLFwiSW50ZXJhY3RhYmxlXCIsdm9pZCAwKSxfKHRoaXMsXCJpbnRlcmFjdGFibGVzXCIsbmV3IHMuZGVmYXVsdCh0aGlzKSksXyh0aGlzLFwiX3dpblwiLHZvaWQgMCksXyh0aGlzLFwiZG9jdW1lbnRcIix2b2lkIDApLF8odGhpcyxcIndpbmRvd1wiLHZvaWQgMCksXyh0aGlzLFwiZG9jdW1lbnRzXCIsW10pLF8odGhpcyxcIl9wbHVnaW5zXCIse2xpc3Q6W10sbWFwOnt9fSksXyh0aGlzLFwib25XaW5kb3dVbmxvYWRcIixmdW5jdGlvbih0KXtyZXR1cm4gZS5yZW1vdmVEb2N1bWVudCh0LnRhcmdldCl9KTt2YXIgbj10aGlzO3RoaXMuSW50ZXJhY3RhYmxlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe3JldHVybiBtKHRoaXMsZSkseSh0aGlzLGcoZSkuYXBwbHkodGhpcyxhcmd1bWVudHMpKX1yZXR1cm4gZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZudWxsIT09ZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShlJiZlLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnQsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pLGUmJmIodCxlKX0oZSx1W1wiZGVmYXVsdFwiXSksdyhlLFt7a2V5Olwic2V0XCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIGgoZyhlLnByb3RvdHlwZSksXCJzZXRcIix0aGlzKS5jYWxsKHRoaXMsdCksbi5maXJlKFwiaW50ZXJhY3RhYmxlOnNldFwiLHtvcHRpb25zOnQsaW50ZXJhY3RhYmxlOnRoaXN9KSx0aGlzfX0se2tleTpcInVuc2V0XCIsdmFsdWU6ZnVuY3Rpb24oKXtoKGcoZS5wcm90b3R5cGUpLFwidW5zZXRcIix0aGlzKS5jYWxsKHRoaXMpLG4uaW50ZXJhY3RhYmxlcy5saXN0LnNwbGljZShuLmludGVyYWN0YWJsZXMubGlzdC5pbmRleE9mKHRoaXMpLDEpLG4uZmlyZShcImludGVyYWN0YWJsZTp1bnNldFwiLHtpbnRlcmFjdGFibGU6dGhpc30pfX0se2tleTpcIl9kZWZhdWx0c1wiLGdldDpmdW5jdGlvbigpe3JldHVybiBuLmRlZmF1bHRzfX1dKSxlfSgpfXJldHVybiB3KHQsW3trZXk6XCJhZGRMaXN0ZW5lcnNcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3RoaXMubGlzdGVuZXJNYXBzLnB1c2goe2lkOmUsbWFwOnR9KX19LHtrZXk6XCJmaXJlXCIsdmFsdWU6ZnVuY3Rpb24odCxlKXtmb3IodmFyIG49MDtuPHRoaXMubGlzdGVuZXJNYXBzLmxlbmd0aDtuKyspe3ZhciByPXRoaXMubGlzdGVuZXJNYXBzW25dLm1hcFt0XTtpZihyJiYhMT09PXIoZSx0aGlzLHQpKXJldHVybiExfX19LHtrZXk6XCJpbml0XCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuaXNJbml0aWFsaXplZD90aGlzOk0odGhpcyx0KX19LHtrZXk6XCJwbHVnaW5Jc0luc3RhbGxlZFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLl9wbHVnaW5zLm1hcFt0LmlkXXx8LTEhPT10aGlzLl9wbHVnaW5zLmxpc3QuaW5kZXhPZih0KX19LHtrZXk6XCJ1c2VQbHVnaW5cIix2YWx1ZTpmdW5jdGlvbih0LGUpe2lmKHRoaXMucGx1Z2luSXNJbnN0YWxsZWQodCkpcmV0dXJuIHRoaXM7aWYodC5pZCYmKHRoaXMuX3BsdWdpbnMubWFwW3QuaWRdPXQpLHRoaXMuX3BsdWdpbnMubGlzdC5wdXNoKHQpLHQuaW5zdGFsbCYmdC5pbnN0YWxsKHRoaXMsZSksdC5saXN0ZW5lcnMmJnQuYmVmb3JlKXtmb3IodmFyIG49MCxyPXRoaXMubGlzdGVuZXJNYXBzLmxlbmd0aCxvPXQuYmVmb3JlLnJlZHVjZShmdW5jdGlvbih0LGUpe3JldHVybiB0W2VdPSEwLHR9LHt9KTtuPHI7bisrKXtpZihvW3RoaXMubGlzdGVuZXJNYXBzW25dLmlkXSlicmVha310aGlzLmxpc3RlbmVyTWFwcy5zcGxpY2UobiwwLHtpZDp0LmlkLG1hcDp0Lmxpc3RlbmVyc30pfWVsc2UgdC5saXN0ZW5lcnMmJnRoaXMubGlzdGVuZXJNYXBzLnB1c2goe2lkOnQuaWQsbWFwOnQubGlzdGVuZXJzfSk7cmV0dXJuIHRoaXN9fSx7a2V5OlwiYWRkRG9jdW1lbnRcIix2YWx1ZTpmdW5jdGlvbih0LGUpe2lmKC0xIT09dGhpcy5nZXREb2NJbmRleCh0KSlyZXR1cm4hMTt2YXIgbj1QLmdldFdpbmRvdyh0KTtlPWU/ci5leHRlbmQoe30sZSk6e30sdGhpcy5kb2N1bWVudHMucHVzaCh7ZG9jOnQsb3B0aW9uczplfSksdGhpcy5ldmVudHMuZG9jdW1lbnRzLnB1c2godCksdCE9PXRoaXMuZG9jdW1lbnQmJnRoaXMuZXZlbnRzLmFkZChuLFwidW5sb2FkXCIsdGhpcy5vbldpbmRvd1VubG9hZCksdGhpcy5maXJlKFwic2NvcGU6YWRkLWRvY3VtZW50XCIse2RvYzp0LHdpbmRvdzpuLHNjb3BlOnRoaXMsb3B0aW9uczplfSl9fSx7a2V5OlwicmVtb3ZlRG9jdW1lbnRcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmdldERvY0luZGV4KHQpLG49UC5nZXRXaW5kb3codCkscj10aGlzLmRvY3VtZW50c1tlXS5vcHRpb25zO3RoaXMuZXZlbnRzLnJlbW92ZShuLFwidW5sb2FkXCIsdGhpcy5vbldpbmRvd1VubG9hZCksdGhpcy5kb2N1bWVudHMuc3BsaWNlKGUsMSksdGhpcy5ldmVudHMuZG9jdW1lbnRzLnNwbGljZShlLDEpLHRoaXMuZmlyZShcInNjb3BlOnJlbW92ZS1kb2N1bWVudFwiLHtkb2M6dCx3aW5kb3c6bixzY29wZTp0aGlzLG9wdGlvbnM6cn0pfX0se2tleTpcImdldERvY0luZGV4XCIsdmFsdWU6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTA7ZTx0aGlzLmRvY3VtZW50cy5sZW5ndGg7ZSsrKWlmKHRoaXMuZG9jdW1lbnRzW2VdLmRvYz09PXQpcmV0dXJuIGU7cmV0dXJuLTF9fSx7a2V5OlwiZ2V0RG9jT3B0aW9uc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuZ2V0RG9jSW5kZXgodCk7cmV0dXJuLTE9PT1lP251bGw6dGhpcy5kb2N1bWVudHNbZV0ub3B0aW9uc319LHtrZXk6XCJub3dcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybih0aGlzLndpbmRvdy5EYXRlfHxEYXRlKS5ub3coKX19XSksdH0oKTtmdW5jdGlvbiBNKHQsZSl7cmV0dXJuIHQuaXNJbml0aWFsaXplZD0hMCxQLmluaXQoZSksbi5kZWZhdWx0LmluaXQoZSkseC5pbml0KGUpLFMuaW5pdChlKSx0LndpbmRvdz1lLHQuZG9jdW1lbnQ9ZS5kb2N1bWVudCx0LnVzZVBsdWdpbihmLmRlZmF1bHQpLHQudXNlUGx1Z2luKGMuZGVmYXVsdCksdH1lLlNjb3BlPWUuZGVmYXVsdD1qfSksRT10KGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5kZWZhdWx0PXZvaWQgMDt2YXIgXz1uKEMpLHU9bihEKSxQPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PWModCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9YSgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSh6dCkscz1uKEVuKSxsPW4oVW4pLG89bih0cik7bihtKHt9KSk7ZnVuY3Rpb24gYSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIGE9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBuKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBjKHQpe3JldHVybihjPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1mdW5jdGlvbiB4KHQsZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIHR9KHQpfHxmdW5jdGlvbih0LGUpe2lmKCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdCh0KXx8XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSkpcmV0dXJuO3ZhciBuPVtdLHI9ITAsbz0hMSxpPXZvaWQgMDt0cnl7Zm9yKHZhciBhLHU9dFtTeW1ib2wuaXRlcmF0b3JdKCk7IShyPShhPXUubmV4dCgpKS5kb25lKSYmKG4ucHVzaChhLnZhbHVlKSwhZXx8bi5sZW5ndGghPT1lKTtyPSEwKTt9Y2F0Y2godCl7bz0hMCxpPXR9ZmluYWxseXt0cnl7cnx8bnVsbD09dS5yZXR1cm58fHUucmV0dXJuKCl9ZmluYWxseXtpZihvKXRocm93IGl9fXJldHVybiBufSh0LGUpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfSgpfWZ1bmN0aW9uIGYodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZVtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsci5rZXkscil9fWZ1bmN0aW9uIHAodCxlKXtyZXR1cm4hZXx8XCJvYmplY3RcIiE9PWMoZSkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGU/ZnVuY3Rpb24odCl7aWYodm9pZCAwIT09dClyZXR1cm4gdDt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIil9KHQpOmV9ZnVuY3Rpb24gZCh0KXtyZXR1cm4oZD1PYmplY3Quc2V0UHJvdG90eXBlT2Y/T2JqZWN0LmdldFByb3RvdHlwZU9mOmZ1bmN0aW9uKHQpe3JldHVybiB0Ll9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKHQpfSkodCl9ZnVuY3Rpb24gdih0LGUpe3JldHVybih2PU9iamVjdC5zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5fX3Byb3RvX189ZSx0fSkodCxlKX12YXIgeT1bXCJwb2ludGVyRG93blwiLFwicG9pbnRlck1vdmVcIixcInBvaW50ZXJVcFwiLFwidXBkYXRlUG9pbnRlclwiLFwicmVtb3ZlUG9pbnRlclwiLFwid2luZG93Qmx1clwiXTtmdW5jdGlvbiBoKE8sdyl7cmV0dXJuIGZ1bmN0aW9uKHQpe3ZhciBlPXcuaW50ZXJhY3Rpb25zLmxpc3Qsbj1QLmdldFBvaW50ZXJUeXBlKHQpLHI9eChQLmdldEV2ZW50VGFyZ2V0cyh0KSwyKSxvPXJbMF0saT1yWzFdLGE9W107aWYoL150b3VjaC8udGVzdCh0LnR5cGUpKXt3LnByZXZUb3VjaFRpbWU9dy5ub3coKTtmb3IodmFyIHU9MDt1PHQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoO3UrKyl7cz10LmNoYW5nZWRUb3VjaGVzW3VdO3ZhciBzLGw9e3BvaW50ZXI6cyxwb2ludGVySWQ6UC5nZXRQb2ludGVySWQocykscG9pbnRlclR5cGU6bixldmVudFR5cGU6dC50eXBlLGV2ZW50VGFyZ2V0Om8sY3VyRXZlbnRUYXJnZXQ6aSxzY29wZTp3fSxjPVMobCk7YS5wdXNoKFtsLnBvaW50ZXIsbC5ldmVudFRhcmdldCxsLmN1ckV2ZW50VGFyZ2V0LGNdKX19ZWxzZXt2YXIgZj0hMTtpZighXy5kZWZhdWx0LnN1cHBvcnRzUG9pbnRlckV2ZW50JiYvbW91c2UvLnRlc3QodC50eXBlKSl7Zm9yKHZhciBwPTA7cDxlLmxlbmd0aCYmIWY7cCsrKWY9XCJtb3VzZVwiIT09ZVtwXS5wb2ludGVyVHlwZSYmZVtwXS5wb2ludGVySXNEb3duO2Y9Znx8dy5ub3coKS13LnByZXZUb3VjaFRpbWU8NTAwfHwwPT09dC50aW1lU3RhbXB9aWYoIWYpe3ZhciBkPXtwb2ludGVyOnQscG9pbnRlcklkOlAuZ2V0UG9pbnRlcklkKHQpLHBvaW50ZXJUeXBlOm4sZXZlbnRUeXBlOnQudHlwZSxjdXJFdmVudFRhcmdldDppLGV2ZW50VGFyZ2V0Om8sc2NvcGU6d30sdj1TKGQpO2EucHVzaChbZC5wb2ludGVyLGQuZXZlbnRUYXJnZXQsZC5jdXJFdmVudFRhcmdldCx2XSl9fWZvcih2YXIgeT0wO3k8YS5sZW5ndGg7eSsrKXt2YXIgaD14KGFbeV0sNCksZz1oWzBdLGI9aFsxXSxtPWhbMl07aFszXVtPXShnLHQsYixtKX19fWZ1bmN0aW9uIFModCl7dmFyIGU9dC5wb2ludGVyVHlwZSxuPXQuc2NvcGUscj17aW50ZXJhY3Rpb246by5kZWZhdWx0LnNlYXJjaCh0KSxzZWFyY2hEZXRhaWxzOnR9O3JldHVybiBuLmZpcmUoXCJpbnRlcmFjdGlvbnM6ZmluZFwiLHIpLHIuaW50ZXJhY3Rpb258fG4uaW50ZXJhY3Rpb25zLm5ldyh7cG9pbnRlclR5cGU6ZX0pfWZ1bmN0aW9uIHIodCxlKXt2YXIgbj10LmRvYyxyPXQuc2NvcGUsbz10Lm9wdGlvbnMsaT1yLmludGVyYWN0aW9ucy5kb2NFdmVudHMsYT1yLmV2ZW50cyx1PWFbZV07Zm9yKHZhciBzIGluIHIuYnJvd3Nlci5pc0lPUyYmIW8uZXZlbnRzJiYoby5ldmVudHM9e3Bhc3NpdmU6ITF9KSxhLmRlbGVnYXRlZEV2ZW50cyl1KG4scyxhLmRlbGVnYXRlTGlzdGVuZXIpLHUobixzLGEuZGVsZWdhdGVVc2VDYXB0dXJlLCEwKTtmb3IodmFyIGw9byYmby5ldmVudHMsYz0wO2M8aS5sZW5ndGg7YysrKXt2YXIgZjtmPWlbY107dShuLGYudHlwZSxmLmxpc3RlbmVyLGwpfX12YXIgaT17aWQ6XCJjb3JlL2ludGVyYWN0aW9uc1wiLGluc3RhbGw6ZnVuY3Rpb24obyl7Zm9yKHZhciB0PXt9LGU9MDtlPHkubGVuZ3RoO2UrKyl7dmFyIG47bj15W2VdO3Rbbl09aChuLG8pfXZhciByLGk9Xy5kZWZhdWx0LnBFdmVudFR5cGVzO2Z1bmN0aW9uIGEoKXtmb3IodmFyIHQ9MDt0PG8uaW50ZXJhY3Rpb25zLmxpc3QubGVuZ3RoO3QrKyl7dmFyIGU9by5pbnRlcmFjdGlvbnMubGlzdFt0XTtpZihlLnBvaW50ZXJJc0Rvd24mJlwidG91Y2hcIj09PWUucG9pbnRlclR5cGUmJiFlLl9pbnRlcmFjdGluZylmb3IodmFyIG49ZnVuY3Rpb24oKXt2YXIgbj1lLnBvaW50ZXJzW3JdO28uZG9jdW1lbnRzLnNvbWUoZnVuY3Rpb24odCl7dmFyIGU9dC5kb2M7cmV0dXJuKDAsJC5ub2RlQ29udGFpbnMpKGUsbi5kb3duVGFyZ2V0KX0pfHxlLnJlbW92ZVBvaW50ZXIobi5wb2ludGVyLG4uZXZlbnQpfSxyPTA7cjxlLnBvaW50ZXJzLmxlbmd0aDtyKyspe24oKX19fShyPXUuZGVmYXVsdC5Qb2ludGVyRXZlbnQ/W3t0eXBlOmkuZG93bixsaXN0ZW5lcjphfSx7dHlwZTppLmRvd24sbGlzdGVuZXI6dC5wb2ludGVyRG93bn0se3R5cGU6aS5tb3ZlLGxpc3RlbmVyOnQucG9pbnRlck1vdmV9LHt0eXBlOmkudXAsbGlzdGVuZXI6dC5wb2ludGVyVXB9LHt0eXBlOmkuY2FuY2VsLGxpc3RlbmVyOnQucG9pbnRlclVwfV06W3t0eXBlOlwibW91c2Vkb3duXCIsbGlzdGVuZXI6dC5wb2ludGVyRG93bn0se3R5cGU6XCJtb3VzZW1vdmVcIixsaXN0ZW5lcjp0LnBvaW50ZXJNb3ZlfSx7dHlwZTpcIm1vdXNldXBcIixsaXN0ZW5lcjp0LnBvaW50ZXJVcH0se3R5cGU6XCJ0b3VjaHN0YXJ0XCIsbGlzdGVuZXI6YX0se3R5cGU6XCJ0b3VjaHN0YXJ0XCIsbGlzdGVuZXI6dC5wb2ludGVyRG93bn0se3R5cGU6XCJ0b3VjaG1vdmVcIixsaXN0ZW5lcjp0LnBvaW50ZXJNb3ZlfSx7dHlwZTpcInRvdWNoZW5kXCIsbGlzdGVuZXI6dC5wb2ludGVyVXB9LHt0eXBlOlwidG91Y2hjYW5jZWxcIixsaXN0ZW5lcjp0LnBvaW50ZXJVcH1dKS5wdXNoKHt0eXBlOlwiYmx1clwiLGxpc3RlbmVyOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT0wO2U8by5pbnRlcmFjdGlvbnMubGlzdC5sZW5ndGg7ZSsrKXtvLmludGVyYWN0aW9ucy5saXN0W2VdLmRvY3VtZW50Qmx1cih0KX19fSksby5wcmV2VG91Y2hUaW1lPTAsby5JbnRlcmFjdGlvbj1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXtyZXR1cm4gZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLHQpLHAodGhpcyxkKHQpLmFwcGx5KHRoaXMsYXJndW1lbnRzKSl9dmFyIGUsbixyO3JldHVybiBmdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJm51bGwhPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvblwiKTt0LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGUmJmUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6dCx3cml0YWJsZTohMCxjb25maWd1cmFibGU6ITB9fSksZSYmdih0LGUpfSh0LHNbXCJkZWZhdWx0XCJdKSxlPXQsKG49W3trZXk6XCJfbm93XCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gby5ub3coKX19LHtrZXk6XCJwb2ludGVyTW92ZVRvbGVyYW5jZVwiLGdldDpmdW5jdGlvbigpe3JldHVybiBvLmludGVyYWN0aW9ucy5wb2ludGVyTW92ZVRvbGVyYW5jZX0sc2V0OmZ1bmN0aW9uKHQpe28uaW50ZXJhY3Rpb25zLnBvaW50ZXJNb3ZlVG9sZXJhbmNlPXR9fV0pJiZmKGUucHJvdG90eXBlLG4pLHImJmYoZSxyKSx0fSgpLG8uaW50ZXJhY3Rpb25zPXtsaXN0OltdLG5ldzpmdW5jdGlvbih0KXt0LnNjb3BlRmlyZT1mdW5jdGlvbih0LGUpe3JldHVybiBvLmZpcmUodCxlKX07dmFyIGU9bmV3IG8uSW50ZXJhY3Rpb24odCk7cmV0dXJuIG8uaW50ZXJhY3Rpb25zLmxpc3QucHVzaChlKSxlfSxsaXN0ZW5lcnM6dCxkb2NFdmVudHM6cixwb2ludGVyTW92ZVRvbGVyYW5jZToxfSxvLnVzZVBsdWdpbihsLmRlZmF1bHQpfSxsaXN0ZW5lcnM6e1wic2NvcGU6YWRkLWRvY3VtZW50XCI6ZnVuY3Rpb24odCl7cmV0dXJuIHIodCxcImFkZFwiKX0sXCJzY29wZTpyZW1vdmUtZG9jdW1lbnRcIjpmdW5jdGlvbih0KXtyZXR1cm4gcih0LFwicmVtb3ZlXCIpfSxcImludGVyYWN0YWJsZTp1bnNldFwiOmZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPXQuaW50ZXJhY3RhYmxlLHI9ZS5pbnRlcmFjdGlvbnMubGlzdC5sZW5ndGgtMTswPD1yO3ItLSl7dmFyIG89ZS5pbnRlcmFjdGlvbnMubGlzdFtyXTtvLmludGVyYWN0YWJsZT09PW4mJihvLnN0b3AoKSxlLmZpcmUoXCJpbnRlcmFjdGlvbnM6ZGVzdHJveVwiLHtpbnRlcmFjdGlvbjpvfSksby5kZXN0cm95KCksMjxlLmludGVyYWN0aW9ucy5saXN0Lmxlbmd0aCYmZS5pbnRlcmFjdGlvbnMubGlzdC5zcGxpY2UociwxKSl9fX0sb25Eb2NTaWduYWw6cixkb09uSW50ZXJhY3Rpb25zOmgsbWV0aG9kTmFtZXM6eX07ZS5kZWZhdWx0PWl9KSxUPXQoZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKHQpe3JldHVybihhPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxlLmRlZmF1bHQ9ZS5JbnRlcmFjdFN0YXRpYz12b2lkIDA7dmFyIG4scj0obj1DKSYmbi5fX2VzTW9kdWxlP246e2RlZmF1bHQ6bn0sdT1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1hKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPWwoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0obGUpLHM9bSh7fSk7ZnVuY3Rpb24gbCgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIGw9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBvKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBjKHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH12YXIgaT1mdW5jdGlvbigpe2Z1bmN0aW9uIGEocil7dmFyIG89dGhpczshZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLGEpLHRoaXMuc2NvcGU9cixjKHRoaXMsXCJnZXRQb2ludGVyQXZlcmFnZVwiLHUucG9pbnRlci5wb2ludGVyQXZlcmFnZSksYyh0aGlzLFwiZ2V0VG91Y2hCQm94XCIsdS5wb2ludGVyLnRvdWNoQkJveCksYyh0aGlzLFwiZ2V0VG91Y2hEaXN0YW5jZVwiLHUucG9pbnRlci50b3VjaERpc3RhbmNlKSxjKHRoaXMsXCJnZXRUb3VjaEFuZ2xlXCIsdS5wb2ludGVyLnRvdWNoQW5nbGUpLGModGhpcyxcImdldEVsZW1lbnRSZWN0XCIsdS5kb20uZ2V0RWxlbWVudFJlY3QpLGModGhpcyxcImdldEVsZW1lbnRDbGllbnRSZWN0XCIsdS5kb20uZ2V0RWxlbWVudENsaWVudFJlY3QpLGModGhpcyxcIm1hdGNoZXNTZWxlY3RvclwiLHUuZG9tLm1hdGNoZXNTZWxlY3RvciksYyh0aGlzLFwiY2xvc2VzdFwiLHUuZG9tLmNsb3Nlc3QpLGModGhpcyxcImdsb2JhbEV2ZW50c1wiLHt9KSxjKHRoaXMsXCJkeW5hbWljRHJvcFwiLHZvaWQgMCksYyh0aGlzLFwidmVyc2lvblwiLFwiMS45LjhcIiksYyh0aGlzLFwiaW50ZXJhY3RcIix2b2lkIDApO2Zvcih2YXIgdD10aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxlPWZ1bmN0aW9uKHQsZSl7dmFyIG49ci5pbnRlcmFjdGFibGVzLmdldCh0LGUpO3JldHVybiBufHwoKG49ci5pbnRlcmFjdGFibGVzLm5ldyh0LGUpKS5ldmVudHMuZ2xvYmFsPW8uZ2xvYmFsRXZlbnRzKSxufSxuPTA7bjxPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSkubGVuZ3RoO24rKyl7dmFyIGk7aT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLmNvbnN0cnVjdG9yLnByb3RvdHlwZSlbbl07ZVtpXT10W2ldfXJldHVybiB1LmV4dGVuZChlLHRoaXMpLGUuY29uc3RydWN0b3I9dGhpcy5jb25zdHJ1Y3Rvcix0aGlzLmludGVyYWN0PWV9dmFyIHQsZSxuO3JldHVybiB0PWEsKGU9W3trZXk6XCJ1c2VcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLnNjb3BlLnVzZVBsdWdpbih0LGUpLHRoaXN9fSx7a2V5OlwiaXNTZXRcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3JldHVybiEhdGhpcy5zY29wZS5pbnRlcmFjdGFibGVzLmdldCh0LGUmJmUuY29udGV4dCl9fSx7a2V5Olwib25cIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7aWYodS5pcy5zdHJpbmcodCkmJi0xIT09dC5zZWFyY2goXCIgXCIpJiYodD10LnRyaW0oKS5zcGxpdCgvICsvKSksdS5pcy5hcnJheSh0KSl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBvPXRbcl07dGhpcy5vbihvLGUsbil9cmV0dXJuIHRoaXN9aWYodS5pcy5vYmplY3QodCkpe2Zvcih2YXIgaSBpbiB0KXRoaXMub24oaSx0W2ldLGUpO3JldHVybiB0aGlzfXJldHVybigwLHMuaXNOb25OYXRpdmVFdmVudCkodCx0aGlzLnNjb3BlLmFjdGlvbnMpP3RoaXMuZ2xvYmFsRXZlbnRzW3RdP3RoaXMuZ2xvYmFsRXZlbnRzW3RdLnB1c2goZSk6dGhpcy5nbG9iYWxFdmVudHNbdF09W2VdOnRoaXMuc2NvcGUuZXZlbnRzLmFkZCh0aGlzLnNjb3BlLmRvY3VtZW50LHQsZSx7b3B0aW9uczpufSksdGhpc319LHtrZXk6XCJvZmZcIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7aWYodS5pcy5zdHJpbmcodCkmJi0xIT09dC5zZWFyY2goXCIgXCIpJiYodD10LnRyaW0oKS5zcGxpdCgvICsvKSksdS5pcy5hcnJheSh0KSl7Zm9yKHZhciByPTA7cjx0Lmxlbmd0aDtyKyspe3ZhciBvPXRbcl07dGhpcy5vZmYobyxlLG4pfXJldHVybiB0aGlzfWlmKHUuaXMub2JqZWN0KHQpKXtmb3IodmFyIGkgaW4gdCl0aGlzLm9mZihpLHRbaV0sZSk7cmV0dXJuIHRoaXN9dmFyIGE7KDAscy5pc05vbk5hdGl2ZUV2ZW50KSh0LHRoaXMuc2NvcGUuYWN0aW9ucyk/dCBpbiB0aGlzLmdsb2JhbEV2ZW50cyYmLTEhPT0oYT10aGlzLmdsb2JhbEV2ZW50c1t0XS5pbmRleE9mKGUpKSYmdGhpcy5nbG9iYWxFdmVudHNbdF0uc3BsaWNlKGEsMSk6dGhpcy5zY29wZS5ldmVudHMucmVtb3ZlKHRoaXMuc2NvcGUuZG9jdW1lbnQsdCxlLG4pO3JldHVybiB0aGlzfX0se2tleTpcImRlYnVnXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zY29wZX19LHtrZXk6XCJzdXBwb3J0c1RvdWNoXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gci5kZWZhdWx0LnN1cHBvcnRzVG91Y2h9fSx7a2V5Olwic3VwcG9ydHNQb2ludGVyRXZlbnRcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiByLmRlZmF1bHQuc3VwcG9ydHNQb2ludGVyRXZlbnR9fSx7a2V5Olwic3RvcFwiLHZhbHVlOmZ1bmN0aW9uKCl7Zm9yKHZhciB0PTA7dDx0aGlzLnNjb3BlLmludGVyYWN0aW9ucy5saXN0Lmxlbmd0aDt0Kyspe3RoaXMuc2NvcGUuaW50ZXJhY3Rpb25zLmxpc3RbdF0uc3RvcCgpfXJldHVybiB0aGlzfX0se2tleTpcInBvaW50ZXJNb3ZlVG9sZXJhbmNlXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIHUuaXMubnVtYmVyKHQpPyh0aGlzLnNjb3BlLmludGVyYWN0aW9ucy5wb2ludGVyTW92ZVRvbGVyYW5jZT10LHRoaXMpOnRoaXMuc2NvcGUuaW50ZXJhY3Rpb25zLnBvaW50ZXJNb3ZlVG9sZXJhbmNlfX0se2tleTpcImFkZERvY3VtZW50XCIsdmFsdWU6ZnVuY3Rpb24odCxlKXt0aGlzLnNjb3BlLmFkZERvY3VtZW50KHQsZSl9fSx7a2V5OlwicmVtb3ZlRG9jdW1lbnRcIix2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLnNjb3BlLnJlbW92ZURvY3VtZW50KHQpfX1dKSYmbyh0LnByb3RvdHlwZSxlKSxuJiZvKHQsbiksYX0oKSxmPWUuSW50ZXJhY3RTdGF0aWM9aTtlLmRlZmF1bHQ9Zn0pLGU9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZS5kZWZhdWx0PXZvaWQgMDtlLmRlZmF1bHQ9ZnVuY3Rpb24odCl7cmV0dXJuISghdHx8IXQuV2luZG93KSYmdCBpbnN0YW5jZW9mIHQuV2luZG93fTt2YXIgTz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoTyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxPLmluaXQ9aSxPLmdldFdpbmRvdz1hLE8uZGVmYXVsdD12b2lkIDA7dmFyIG4scj0obj1lKSYmbi5fX2VzTW9kdWxlP246e2RlZmF1bHQ6bn07dmFyIG89e3JlYWxXaW5kb3c6dm9pZCAwLHdpbmRvdzp2b2lkIDAsZ2V0V2luZG93OmEsaW5pdDppfTtmdW5jdGlvbiBpKHQpe3ZhciBlPShvLnJlYWxXaW5kb3c9dCkuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7ZS5vd25lckRvY3VtZW50IT09dC5kb2N1bWVudCYmXCJmdW5jdGlvblwiPT10eXBlb2YgdC53cmFwJiZ0LndyYXAoZSk9PT1lJiYodD10LndyYXAodCkpLG8ud2luZG93PXR9ZnVuY3Rpb24gYSh0KXtyZXR1cm4oMCxyLmRlZmF1bHQpKHQpP3Q6KHQub3duZXJEb2N1bWVudHx8dCkuZGVmYXVsdFZpZXd8fG8ud2luZG93fVwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3c/KG8ud2luZG93PXZvaWQgMCxvLnJlYWxXaW5kb3c9dm9pZCAwKTppKHdpbmRvdyksby5pbml0PWk7dmFyIHU9bztPLmRlZmF1bHQ9dTt2YXIgdz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkodyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx3LmFycmF5PXcucGxhaW5PYmplY3Q9dy5lbGVtZW50PXcuc3RyaW5nPXcuYm9vbD13Lm51bWJlcj13LmZ1bmM9dy5vYmplY3Q9dy5kb2NGcmFnPXcud2luZG93PXZvaWQgMDt2YXIgcz1jKGUpLGw9YyhPKTtmdW5jdGlvbiBjKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBmKHQpe3JldHVybihmPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX13LndpbmRvdz1mdW5jdGlvbih0KXtyZXR1cm4gdD09PWwuZGVmYXVsdC53aW5kb3d8fCgwLHMuZGVmYXVsdCkodCl9O3cuZG9jRnJhZz1mdW5jdGlvbih0KXtyZXR1cm4gcCh0KSYmMTE9PT10Lm5vZGVUeXBlfTt2YXIgcD1mdW5jdGlvbih0KXtyZXR1cm4hIXQmJlwib2JqZWN0XCI9PT1mKHQpfTt3Lm9iamVjdD1wO2Z1bmN0aW9uIGQodCl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgdH13LmZ1bmM9ZDt3Lm51bWJlcj1mdW5jdGlvbih0KXtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgdH07dy5ib29sPWZ1bmN0aW9uKHQpe3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgdH07dy5zdHJpbmc9ZnVuY3Rpb24odCl7cmV0dXJuXCJzdHJpbmdcIj09dHlwZW9mIHR9O3cuZWxlbWVudD1mdW5jdGlvbih0KXtpZighdHx8XCJvYmplY3RcIiE9PWYodCkpcmV0dXJuITE7dmFyIGU9bC5kZWZhdWx0LmdldFdpbmRvdyh0KXx8bC5kZWZhdWx0LndpbmRvdztyZXR1cm4vb2JqZWN0fGZ1bmN0aW9uLy50ZXN0KGYoZS5FbGVtZW50KSk/dCBpbnN0YW5jZW9mIGUuRWxlbWVudDoxPT09dC5ub2RlVHlwZSYmXCJzdHJpbmdcIj09dHlwZW9mIHQubm9kZU5hbWV9O3cucGxhaW5PYmplY3Q9ZnVuY3Rpb24odCl7cmV0dXJuIHAodCkmJiEhdC5jb25zdHJ1Y3RvciYmL2Z1bmN0aW9uIE9iamVjdFxcYi8udGVzdCh0LmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkpfTt3LmFycmF5PWZ1bmN0aW9uKHQpe3JldHVybiBwKHQpJiZ2b2lkIDAhPT10Lmxlbmd0aCYmZCh0LnNwbGljZSl9O3ZhciB2PXt9O2Z1bmN0aW9uIHkodCl7cmV0dXJuKHk9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHYuZGVmYXVsdD12b2lkIDA7dmFyIGg9ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09eSh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1nKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KHcpO2Z1bmN0aW9uIGcoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBnPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gYih0KXt2YXIgZT10LmludGVyYWN0aW9uO2lmKFwiZHJhZ1wiPT09ZS5wcmVwYXJlZC5uYW1lKXt2YXIgbj1lLnByZXBhcmVkLmF4aXM7XCJ4XCI9PT1uPyhlLmNvb3Jkcy5jdXIucGFnZS55PWUuY29vcmRzLnN0YXJ0LnBhZ2UueSxlLmNvb3Jkcy5jdXIuY2xpZW50Lnk9ZS5jb29yZHMuc3RhcnQuY2xpZW50LnksZS5jb29yZHMudmVsb2NpdHkuY2xpZW50Lnk9MCxlLmNvb3Jkcy52ZWxvY2l0eS5wYWdlLnk9MCk6XCJ5XCI9PT1uJiYoZS5jb29yZHMuY3VyLnBhZ2UueD1lLmNvb3Jkcy5zdGFydC5wYWdlLngsZS5jb29yZHMuY3VyLmNsaWVudC54PWUuY29vcmRzLnN0YXJ0LmNsaWVudC54LGUuY29vcmRzLnZlbG9jaXR5LmNsaWVudC54PTAsZS5jb29yZHMudmVsb2NpdHkucGFnZS54PTApfX1mdW5jdGlvbiBfKHQpe3ZhciBlPXQuaUV2ZW50LG49dC5pbnRlcmFjdGlvbjtpZihcImRyYWdcIj09PW4ucHJlcGFyZWQubmFtZSl7dmFyIHI9bi5wcmVwYXJlZC5heGlzO2lmKFwieFwiPT09cnx8XCJ5XCI9PT1yKXt2YXIgbz1cInhcIj09PXI/XCJ5XCI6XCJ4XCI7ZS5wYWdlW29dPW4uY29vcmRzLnN0YXJ0LnBhZ2Vbb10sZS5jbGllbnRbb109bi5jb29yZHMuc3RhcnQuY2xpZW50W29dLGUuZGVsdGFbb109MH19fXZhciBQPXtpZDpcImFjdGlvbnMvZHJhZ1wiLGluc3RhbGw6ZnVuY3Rpb24odCl7dmFyIGU9dC5hY3Rpb25zLG49dC5JbnRlcmFjdGFibGUscj10LmRlZmF1bHRzO24ucHJvdG90eXBlLmRyYWdnYWJsZT1QLmRyYWdnYWJsZSxlLm1hcC5kcmFnPVAsZS5tZXRob2REaWN0LmRyYWc9XCJkcmFnZ2FibGVcIixyLmFjdGlvbnMuZHJhZz1QLmRlZmF1bHRzfSxsaXN0ZW5lcnM6e1wiaW50ZXJhY3Rpb25zOmJlZm9yZS1hY3Rpb24tbW92ZVwiOmIsXCJpbnRlcmFjdGlvbnM6YWN0aW9uLXJlc3VtZVwiOmIsXCJpbnRlcmFjdGlvbnM6YWN0aW9uLW1vdmVcIjpfLFwiYXV0by1zdGFydDpjaGVja1wiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LmludGVyYWN0YWJsZSxyPXQuYnV0dG9ucyxvPW4ub3B0aW9ucy5kcmFnO2lmKG8mJm8uZW5hYmxlZCYmKCFlLnBvaW50ZXJJc0Rvd258fCEvbW91c2V8cG9pbnRlci8udGVzdChlLnBvaW50ZXJUeXBlKXx8MCE9KHImbi5vcHRpb25zLmRyYWcubW91c2VCdXR0b25zKSkpcmV0dXJuISh0LmFjdGlvbj17bmFtZTpcImRyYWdcIixheGlzOlwic3RhcnRcIj09PW8ubG9ja0F4aXM/by5zdGFydEF4aXM6by5sb2NrQXhpc30pfX0sZHJhZ2dhYmxlOmZ1bmN0aW9uKHQpe3JldHVybiBoLm9iamVjdCh0KT8odGhpcy5vcHRpb25zLmRyYWcuZW5hYmxlZD0hMSE9PXQuZW5hYmxlZCx0aGlzLnNldFBlckFjdGlvbihcImRyYWdcIix0KSx0aGlzLnNldE9uRXZlbnRzKFwiZHJhZ1wiLHQpLC9eKHh5fHh8eXxzdGFydCkkLy50ZXN0KHQubG9ja0F4aXMpJiYodGhpcy5vcHRpb25zLmRyYWcubG9ja0F4aXM9dC5sb2NrQXhpcyksL14oeHl8eHx5KSQvLnRlc3QodC5zdGFydEF4aXMpJiYodGhpcy5vcHRpb25zLmRyYWcuc3RhcnRBeGlzPXQuc3RhcnRBeGlzKSx0aGlzKTpoLmJvb2wodCk/KHRoaXMub3B0aW9ucy5kcmFnLmVuYWJsZWQ9dCx0aGlzKTp0aGlzLm9wdGlvbnMuZHJhZ30sYmVmb3JlTW92ZTpiLG1vdmU6XyxkZWZhdWx0czp7c3RhcnRBeGlzOlwieHlcIixsb2NrQXhpczpcInh5XCJ9LGdldEN1cnNvcjpmdW5jdGlvbigpe3JldHVyblwibW92ZVwifX0seD1QO3YuZGVmYXVsdD14O3ZhciBTPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShTLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLFMuZmluZD1TLmZpbmRJbmRleD1TLmZyb209Uy5tZXJnZT1TLnJlbW92ZT1TLmNvbnRhaW5zPXZvaWQgMDtTLmNvbnRhaW5zPWZ1bmN0aW9uKHQsZSl7cmV0dXJuLTEhPT10LmluZGV4T2YoZSl9O1MucmVtb3ZlPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHQuc3BsaWNlKHQuaW5kZXhPZihlKSwxKX07ZnVuY3Rpb24gaih0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO3QucHVzaChyKX1yZXR1cm4gdH1TLm1lcmdlPWo7Uy5mcm9tPWZ1bmN0aW9uKHQpe3JldHVybiBqKFtdLHQpfTtmdW5jdGlvbiBNKHQsZSl7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspaWYoZSh0W25dLG4sdCkpcmV0dXJuIG47cmV0dXJuLTF9Uy5maW5kSW5kZXg9TTtTLmZpbmQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gdFtNKHQsZSldfTt2YXIgRD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoRCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxELmRlZmF1bHQ9dm9pZCAwO3ZhciBJPXtpbml0OmZ1bmN0aW9uKHQpe3ZhciBlPXQ7SS5kb2N1bWVudD1lLmRvY3VtZW50LEkuRG9jdW1lbnRGcmFnbWVudD1lLkRvY3VtZW50RnJhZ21lbnR8fHosSS5TVkdFbGVtZW50PWUuU1ZHRWxlbWVudHx8eixJLlNWR1NWR0VsZW1lbnQ9ZS5TVkdTVkdFbGVtZW50fHx6LEkuU1ZHRWxlbWVudEluc3RhbmNlPWUuU1ZHRWxlbWVudEluc3RhbmNlfHx6LEkuRWxlbWVudD1lLkVsZW1lbnR8fHosSS5IVE1MRWxlbWVudD1lLkhUTUxFbGVtZW50fHxJLkVsZW1lbnQsSS5FdmVudD1lLkV2ZW50LEkuVG91Y2g9ZS5Ub3VjaHx8eixJLlBvaW50ZXJFdmVudD1lLlBvaW50ZXJFdmVudHx8ZS5NU1BvaW50ZXJFdmVudH0sZG9jdW1lbnQ6bnVsbCxEb2N1bWVudEZyYWdtZW50Om51bGwsU1ZHRWxlbWVudDpudWxsLFNWR1NWR0VsZW1lbnQ6bnVsbCxTVkdFbGVtZW50SW5zdGFuY2U6bnVsbCxFbGVtZW50Om51bGwsSFRNTEVsZW1lbnQ6bnVsbCxFdmVudDpudWxsLFRvdWNoOm51bGwsUG9pbnRlckV2ZW50Om51bGx9O2Z1bmN0aW9uIHooKXt9dmFyIEE9STtELmRlZmF1bHQ9QTt2YXIgQz17fTtmdW5jdGlvbiBXKHQpe3JldHVybihXPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoQyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxDLmRlZmF1bHQ9dm9pZCAwO3ZhciBSPU4oRCksRj1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1XKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPVkoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0odyksWD1OKE8pO2Z1bmN0aW9uIFkoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBZPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gTih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIEw9e2luaXQ6ZnVuY3Rpb24odCl7dmFyIGU9Ui5kZWZhdWx0LkVsZW1lbnQsbj1YLmRlZmF1bHQud2luZG93Lm5hdmlnYXRvcjtMLnN1cHBvcnRzVG91Y2g9XCJvbnRvdWNoc3RhcnRcImluIHR8fEYuZnVuYyh0LkRvY3VtZW50VG91Y2gpJiZSLmRlZmF1bHQuZG9jdW1lbnQgaW5zdGFuY2VvZiB0LkRvY3VtZW50VG91Y2gsTC5zdXBwb3J0c1BvaW50ZXJFdmVudD0hMSE9PW4ucG9pbnRlckVuYWJsZWQmJiEhUi5kZWZhdWx0LlBvaW50ZXJFdmVudCxMLmlzSU9TPS9pUChob25lfG9kfGFkKS8udGVzdChuLnBsYXRmb3JtKSxMLmlzSU9TNz0vaVAoaG9uZXxvZHxhZCkvLnRlc3Qobi5wbGF0Zm9ybSkmJi9PUyA3W15cXGRdLy50ZXN0KG4uYXBwVmVyc2lvbiksTC5pc0llOT0vTVNJRSA5Ly50ZXN0KG4udXNlckFnZW50KSxMLmlzT3BlcmFNb2JpbGU9XCJPcGVyYVwiPT09bi5hcHBOYW1lJiZMLnN1cHBvcnRzVG91Y2gmJi9QcmVzdG8vLnRlc3Qobi51c2VyQWdlbnQpLEwucHJlZml4ZWRNYXRjaGVzU2VsZWN0b3I9XCJtYXRjaGVzXCJpbiBlLnByb3RvdHlwZT9cIm1hdGNoZXNcIjpcIndlYmtpdE1hdGNoZXNTZWxlY3RvclwiaW4gZS5wcm90b3R5cGU/XCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3JcIjpcIm1vek1hdGNoZXNTZWxlY3RvclwiaW4gZS5wcm90b3R5cGU/XCJtb3pNYXRjaGVzU2VsZWN0b3JcIjpcIm9NYXRjaGVzU2VsZWN0b3JcImluIGUucHJvdG90eXBlP1wib01hdGNoZXNTZWxlY3RvclwiOlwibXNNYXRjaGVzU2VsZWN0b3JcIixMLnBFdmVudFR5cGVzPUwuc3VwcG9ydHNQb2ludGVyRXZlbnQ/Ui5kZWZhdWx0LlBvaW50ZXJFdmVudD09PXQuTVNQb2ludGVyRXZlbnQ/e3VwOlwiTVNQb2ludGVyVXBcIixkb3duOlwiTVNQb2ludGVyRG93blwiLG92ZXI6XCJtb3VzZW92ZXJcIixvdXQ6XCJtb3VzZW91dFwiLG1vdmU6XCJNU1BvaW50ZXJNb3ZlXCIsY2FuY2VsOlwiTVNQb2ludGVyQ2FuY2VsXCJ9Ont1cDpcInBvaW50ZXJ1cFwiLGRvd246XCJwb2ludGVyZG93blwiLG92ZXI6XCJwb2ludGVyb3ZlclwiLG91dDpcInBvaW50ZXJvdXRcIixtb3ZlOlwicG9pbnRlcm1vdmVcIixjYW5jZWw6XCJwb2ludGVyY2FuY2VsXCJ9Om51bGwsTC53aGVlbEV2ZW50PVwib25tb3VzZXdoZWVsXCJpbiBSLmRlZmF1bHQuZG9jdW1lbnQ/XCJtb3VzZXdoZWVsXCI6XCJ3aGVlbFwifSxzdXBwb3J0c1RvdWNoOm51bGwsc3VwcG9ydHNQb2ludGVyRXZlbnQ6bnVsbCxpc0lPUzc6bnVsbCxpc0lPUzpudWxsLGlzSWU5Om51bGwsaXNPcGVyYU1vYmlsZTpudWxsLHByZWZpeGVkTWF0Y2hlc1NlbGVjdG9yOm51bGwscEV2ZW50VHlwZXM6bnVsbCx3aGVlbEV2ZW50Om51bGx9O3ZhciBCPUw7Qy5kZWZhdWx0PUI7dmFyIFY9e307ZnVuY3Rpb24gcSh0KXtyZXR1cm4ocT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KFYsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksVi5kZWZhdWx0PWZ1bmN0aW9uIHQoZSl7dmFyIG49e307Zm9yKHZhciByIGluIGUpe3ZhciBvPWVbcl07Ry5wbGFpbk9iamVjdChvKT9uW3JdPXQobyk6Ry5hcnJheShvKT9uW3JdPVUuZnJvbShvKTpuW3JdPW99cmV0dXJuIG59O3ZhciBVPUsoUyksRz1LKHcpO2Z1bmN0aW9uIEgoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBIPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gSyh0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1xKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPUgoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119cmV0dXJuIG4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbiksbn12YXIgJD17fTtmdW5jdGlvbiBaKHQpe3JldHVybihaPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoJCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSwkLm5vZGVDb250YWlucz1mdW5jdGlvbih0LGUpe2Zvcig7ZTspe2lmKGU9PT10KXJldHVybiEwO2U9ZS5wYXJlbnROb2RlfXJldHVybiExfSwkLmNsb3Nlc3Q9ZnVuY3Rpb24odCxlKXtmb3IoO3R0LmVsZW1lbnQodCk7KXtpZihhdCh0LGUpKXJldHVybiB0O3Q9aXQodCl9cmV0dXJuIG51bGx9LCQucGFyZW50Tm9kZT1pdCwkLm1hdGNoZXNTZWxlY3Rvcj1hdCwkLmluZGV4T2ZEZWVwZXN0RWxlbWVudD1mdW5jdGlvbih0KXt2YXIgZSxuLHI9W10sbz10WzBdLGk9bz8wOi0xO2ZvcihlPTE7ZTx0Lmxlbmd0aDtlKyspe3ZhciBhPXRbZV07aWYoYSYmYSE9PW8paWYobyl7aWYoYS5wYXJlbnROb2RlIT09YS5vd25lckRvY3VtZW50KWlmKG8ucGFyZW50Tm9kZSE9PWEub3duZXJEb2N1bWVudClpZihhLnBhcmVudE5vZGUhPT1vLnBhcmVudE5vZGUpe2lmKCFyLmxlbmd0aClmb3IodmFyIHU9byxzPXZvaWQgMDsocz11dCh1KSkmJnMhPT11Lm93bmVyRG9jdW1lbnQ7KXIudW5zaGlmdCh1KSx1PXM7dmFyIGw9dm9pZCAwO2lmKG8gaW5zdGFuY2VvZiBRLmRlZmF1bHQuSFRNTEVsZW1lbnQmJmEgaW5zdGFuY2VvZiBRLmRlZmF1bHQuU1ZHRWxlbWVudCYmIShhIGluc3RhbmNlb2YgUS5kZWZhdWx0LlNWR1NWR0VsZW1lbnQpKXtpZihhPT09by5wYXJlbnROb2RlKWNvbnRpbnVlO2w9YS5vd25lclNWR0VsZW1lbnR9ZWxzZSBsPWE7Zm9yKHZhciBjPVtdO2wucGFyZW50Tm9kZSE9PWwub3duZXJEb2N1bWVudDspYy51bnNoaWZ0KGwpLGw9dXQobCk7Zm9yKG49MDtjW25dJiZjW25dPT09cltuXTspbisrO2Zvcih2YXIgZj1bY1tuLTFdLGNbbl0scltuXV0scD1mWzBdLmxhc3RDaGlsZDtwOyl7aWYocD09PWZbMV0pe289YSxpPWUscj1jO2JyZWFrfWlmKHA9PT1mWzJdKWJyZWFrO3A9cC5wcmV2aW91c1NpYmxpbmd9fWVsc2V7dmFyIGQ9cGFyc2VJbnQoKDAsZXQuZ2V0V2luZG93KShvKS5nZXRDb21wdXRlZFN0eWxlKG8pLnpJbmRleCwxMCl8fDAsdj1wYXJzZUludCgoMCxldC5nZXRXaW5kb3cpKGEpLmdldENvbXB1dGVkU3R5bGUoYSkuekluZGV4LDEwKXx8MDtkPD12JiYobz1hLGk9ZSl9ZWxzZSBvPWEsaT1lfWVsc2Ugbz1hLGk9ZX1yZXR1cm4gaX0sJC5tYXRjaGVzVXBUbz1mdW5jdGlvbih0LGUsbil7Zm9yKDt0dC5lbGVtZW50KHQpOyl7aWYoYXQodCxlKSlyZXR1cm4hMDtpZigodD1pdCh0KSk9PT1uKXJldHVybiBhdCh0LGUpfXJldHVybiExfSwkLmdldEFjdHVhbEVsZW1lbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIHQgaW5zdGFuY2VvZiBRLmRlZmF1bHQuU1ZHRWxlbWVudEluc3RhbmNlP3QuY29ycmVzcG9uZGluZ1VzZUVsZW1lbnQ6dH0sJC5nZXRTY3JvbGxYWT1zdCwkLmdldEVsZW1lbnRDbGllbnRSZWN0PWx0LCQuZ2V0RWxlbWVudFJlY3Q9ZnVuY3Rpb24odCl7dmFyIGU9bHQodCk7aWYoIUouZGVmYXVsdC5pc0lPUzcmJmUpe3ZhciBuPXN0KGV0LmRlZmF1bHQuZ2V0V2luZG93KHQpKTtlLmxlZnQrPW4ueCxlLnJpZ2h0Kz1uLngsZS50b3ArPW4ueSxlLmJvdHRvbSs9bi55fXJldHVybiBlfSwkLmdldFBhdGg9ZnVuY3Rpb24odCl7dmFyIGU9W107Zm9yKDt0OyllLnB1c2godCksdD1pdCh0KTtyZXR1cm4gZX0sJC50cnlTZWxlY3Rvcj1mdW5jdGlvbih0KXtyZXR1cm4hIXR0LnN0cmluZyh0KSYmKFEuZGVmYXVsdC5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpLCEwKX07dmFyIEo9b3QoQyksUT1vdChEKSx0dD1ydCh3KSxldD1ydChPKTtmdW5jdGlvbiBudCgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIG50PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gcnQodCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09Wih0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1udCgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1yZXR1cm4gbi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKSxufWZ1bmN0aW9uIG90KHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBpdCh0KXt2YXIgZT10LnBhcmVudE5vZGU7aWYodHQuZG9jRnJhZyhlKSl7Zm9yKDsoZT1lLmhvc3QpJiZ0dC5kb2NGcmFnKGUpOyk7cmV0dXJuIGV9cmV0dXJuIGV9ZnVuY3Rpb24gYXQodCxlKXtyZXR1cm4gZXQuZGVmYXVsdC53aW5kb3chPT1ldC5kZWZhdWx0LnJlYWxXaW5kb3cmJihlPWUucmVwbGFjZSgvXFwvZGVlcFxcLy9nLFwiIFwiKSksdFtKLmRlZmF1bHQucHJlZml4ZWRNYXRjaGVzU2VsZWN0b3JdKGUpfXZhciB1dD1mdW5jdGlvbih0KXtyZXR1cm4gdC5wYXJlbnROb2RlP3QucGFyZW50Tm9kZTp0Lmhvc3R9O2Z1bmN0aW9uIHN0KHQpe3JldHVybnt4Oih0PXR8fGV0LmRlZmF1bHQud2luZG93KS5zY3JvbGxYfHx0LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LHk6dC5zY3JvbGxZfHx0LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3B9fWZ1bmN0aW9uIGx0KHQpe3ZhciBlPXQgaW5zdGFuY2VvZiBRLmRlZmF1bHQuU1ZHRWxlbWVudD90LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnQuZ2V0Q2xpZW50UmVjdHMoKVswXTtyZXR1cm4gZSYme2xlZnQ6ZS5sZWZ0LHJpZ2h0OmUucmlnaHQsdG9wOmUudG9wLGJvdHRvbTplLmJvdHRvbSx3aWR0aDplLndpZHRofHxlLnJpZ2h0LWUubGVmdCxoZWlnaHQ6ZS5oZWlnaHR8fGUuYm90dG9tLWUudG9wfX12YXIgY3Q9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KGN0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGN0LmRlZmF1bHQ9ZnVuY3Rpb24odCxlKXtmb3IodmFyIG4gaW4gZSl0W25dPWVbbl07cmV0dXJuIHR9O3ZhciBmdD17fTtmdW5jdGlvbiBwdCh0KXtyZXR1cm4ocHQ9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxmdC5kZWZhdWx0PWZ1bmN0aW9uIG4oZSxyLG8pe289b3x8e307eXQuc3RyaW5nKGUpJiYtMSE9PWUuc2VhcmNoKFwiIFwiKSYmKGU9Z3QoZSkpO2lmKHl0LmFycmF5KGUpKXJldHVybiBlLnJlZHVjZShmdW5jdGlvbih0LGUpe3JldHVybigwLHZ0LmRlZmF1bHQpKHQsbihlLHIsbykpfSxvKTt5dC5vYmplY3QoZSkmJihyPWUsZT1cIlwiKTtpZih5dC5mdW5jKHIpKW9bZV09b1tlXXx8W10sb1tlXS5wdXNoKHIpO2Vsc2UgaWYoeXQuYXJyYXkocikpZm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspe3ZhciBpPXJbdF07bihlLGksbyl9ZWxzZSBpZih5dC5vYmplY3QocikpZm9yKHZhciBhIGluIHIpe3ZhciB1PWd0KGEpLm1hcChmdW5jdGlvbih0KXtyZXR1cm5cIlwiLmNvbmNhdChlKS5jb25jYXQodCl9KTtuKHUsclthXSxvKX1yZXR1cm4gb307dmFyIGR0LHZ0PShkdD1jdCkmJmR0Ll9fZXNNb2R1bGU/ZHQ6e2RlZmF1bHQ6ZHR9LHl0PWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PXB0KHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPWh0KCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KHcpO2Z1bmN0aW9uIGh0KCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gaHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBndCh0KXtyZXR1cm4gdC50cmltKCkuc3BsaXQoLyArLyl9dmFyIGJ0PXt9O2Z1bmN0aW9uIG10KHQpe3JldHVybihtdD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGJ0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGJ0LmRlZmF1bHQ9dm9pZCAwO3ZhciBPdD1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1tdCh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT14dCgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufShTKSx3dD1QdChjdCksX3Q9UHQoZnQpO2Z1bmN0aW9uIFB0KHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiB4dCgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIHh0PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gU3QodCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZVtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsci5rZXkscil9fWZ1bmN0aW9uIGp0KHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH1mdW5jdGlvbiBNdCh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO2lmKHQuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKWJyZWFrO3IodCl9fXZhciBrdD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxlKSxqdCh0aGlzLFwib3B0aW9uc1wiLHZvaWQgMCksanQodGhpcyxcInR5cGVzXCIse30pLGp0KHRoaXMsXCJwcm9wYWdhdGlvblN0b3BwZWRcIiwhMSksanQodGhpcyxcImltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFwiLCExKSxqdCh0aGlzLFwiZ2xvYmFsXCIsdm9pZCAwKSx0aGlzLm9wdGlvbnM9KDAsd3QuZGVmYXVsdCkoe30sdHx8e30pfXZhciB0LG4scjtyZXR1cm4gdD1lLChuPVt7a2V5OlwiZmlyZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlLG49dGhpcy5nbG9iYWw7KGU9dGhpcy50eXBlc1t0LnR5cGVdKSYmTXQodCxlKSwhdC5wcm9wYWdhdGlvblN0b3BwZWQmJm4mJihlPW5bdC50eXBlXSkmJk10KHQsZSl9fSx7a2V5Olwib25cIix2YWx1ZTpmdW5jdGlvbih0LGUpe3ZhciBuPSgwLF90LmRlZmF1bHQpKHQsZSk7Zm9yKHQgaW4gbil0aGlzLnR5cGVzW3RdPU90Lm1lcmdlKHRoaXMudHlwZXNbdF18fFtdLG5bdF0pfX0se2tleTpcIm9mZlwiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7dmFyIG49KDAsX3QuZGVmYXVsdCkodCxlKTtmb3IodCBpbiBuKXt2YXIgcj10aGlzLnR5cGVzW3RdO2lmKHImJnIubGVuZ3RoKWZvcih2YXIgbz0wO288blt0XS5sZW5ndGg7bysrKXt2YXIgaT1uW3RdW29dLGE9ci5pbmRleE9mKGkpOy0xIT09YSYmci5zcGxpY2UoYSwxKX19fX0se2tleTpcImdldFJlY3RcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBudWxsfX1dKSYmU3QodC5wcm90b3R5cGUsbiksciYmU3QodCxyKSxlfSgpO2J0LmRlZmF1bHQ9a3Q7dmFyIEV0PXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShFdCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxFdC5kZWZhdWx0PXZvaWQgMDtFdC5kZWZhdWx0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE1hdGguc3FydCh0KnQrZSplKX07dmFyIFR0PXt9O2Z1bmN0aW9uIER0KHQsZSl7Zm9yKHZhciBuIGluIGUpe3ZhciByPUR0LnByZWZpeGVkUHJvcFJFcyxvPSExO2Zvcih2YXIgaSBpbiByKWlmKDA9PT1uLmluZGV4T2YoaSkmJnJbaV0udGVzdChuKSl7bz0hMDticmVha31vfHxcImZ1bmN0aW9uXCI9PXR5cGVvZiBlW25dfHwodFtuXT1lW25dKX1yZXR1cm4gdH1PYmplY3QuZGVmaW5lUHJvcGVydHkoVHQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksVHQuZGVmYXVsdD12b2lkIDAsRHQucHJlZml4ZWRQcm9wUkVzPXt3ZWJraXQ6LyhNb3ZlbWVudFtYWV18UmFkaXVzW1hZXXxSb3RhdGlvbkFuZ2xlfEZvcmNlKSQvLG1vejovKFByZXNzdXJlKSQvfTt2YXIgSXQ9RHQ7VHQuZGVmYXVsdD1JdDt2YXIgenQ9e307ZnVuY3Rpb24gQXQodCl7cmV0dXJuKEF0PVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoenQsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksenQuY29weUNvb3Jkcz1mdW5jdGlvbih0LGUpe3QucGFnZT10LnBhZ2V8fHt9LHQucGFnZS54PWUucGFnZS54LHQucGFnZS55PWUucGFnZS55LHQuY2xpZW50PXQuY2xpZW50fHx7fSx0LmNsaWVudC54PWUuY2xpZW50LngsdC5jbGllbnQueT1lLmNsaWVudC55LHQudGltZVN0YW1wPWUudGltZVN0YW1wfSx6dC5zZXRDb29yZERlbHRhcz1mdW5jdGlvbih0LGUsbil7dC5wYWdlLng9bi5wYWdlLngtZS5wYWdlLngsdC5wYWdlLnk9bi5wYWdlLnktZS5wYWdlLnksdC5jbGllbnQueD1uLmNsaWVudC54LWUuY2xpZW50LngsdC5jbGllbnQueT1uLmNsaWVudC55LWUuY2xpZW50LnksdC50aW1lU3RhbXA9bi50aW1lU3RhbXAtZS50aW1lU3RhbXB9LHp0LnNldENvb3JkVmVsb2NpdHk9ZnVuY3Rpb24odCxlKXt2YXIgbj1NYXRoLm1heChlLnRpbWVTdGFtcC8xZTMsLjAwMSk7dC5wYWdlLng9ZS5wYWdlLngvbix0LnBhZ2UueT1lLnBhZ2UueS9uLHQuY2xpZW50Lng9ZS5jbGllbnQueC9uLHQuY2xpZW50Lnk9ZS5jbGllbnQueS9uLHQudGltZVN0YW1wPW59LHp0LnNldFplcm9Db29yZHM9ZnVuY3Rpb24odCl7dC5wYWdlLng9MCx0LnBhZ2UueT0wLHQuY2xpZW50Lng9MCx0LmNsaWVudC55PTB9LHp0LmlzTmF0aXZlUG9pbnRlcj1WdCx6dC5nZXRYWT1xdCx6dC5nZXRQYWdlWFk9VXQsenQuZ2V0Q2xpZW50WFk9R3QsenQuZ2V0UG9pbnRlcklkPWZ1bmN0aW9uKHQpe3JldHVybiBYdC5udW1iZXIodC5wb2ludGVySWQpP3QucG9pbnRlcklkOnQuaWRlbnRpZmllcn0senQuc2V0Q29vcmRzPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj0xPGUubGVuZ3RoP0t0KGUpOmVbMF0sbz17fTtVdChyLG8pLHQucGFnZS54PW8ueCx0LnBhZ2UueT1vLnksR3QocixvKSx0LmNsaWVudC54PW8ueCx0LmNsaWVudC55PW8ueSx0LnRpbWVTdGFtcD1ufSx6dC5nZXRUb3VjaFBhaXI9SHQsenQucG9pbnRlckF2ZXJhZ2U9S3QsenQudG91Y2hCQm94PWZ1bmN0aW9uKHQpe2lmKCEodC5sZW5ndGh8fHQudG91Y2hlcyYmMTx0LnRvdWNoZXMubGVuZ3RoKSlyZXR1cm4gbnVsbDt2YXIgZT1IdCh0KSxuPU1hdGgubWluKGVbMF0ucGFnZVgsZVsxXS5wYWdlWCkscj1NYXRoLm1pbihlWzBdLnBhZ2VZLGVbMV0ucGFnZVkpLG89TWF0aC5tYXgoZVswXS5wYWdlWCxlWzFdLnBhZ2VYKSxpPU1hdGgubWF4KGVbMF0ucGFnZVksZVsxXS5wYWdlWSk7cmV0dXJue3g6bix5OnIsbGVmdDpuLHRvcDpyLHJpZ2h0Om8sYm90dG9tOmksd2lkdGg6by1uLGhlaWdodDppLXJ9fSx6dC50b3VjaERpc3RhbmNlPWZ1bmN0aW9uKHQsZSl7dmFyIG49ZStcIlhcIixyPWUrXCJZXCIsbz1IdCh0KSxpPW9bMF1bbl0tb1sxXVtuXSxhPW9bMF1bcl0tb1sxXVtyXTtyZXR1cm4oMCxGdC5kZWZhdWx0KShpLGEpfSx6dC50b3VjaEFuZ2xlPWZ1bmN0aW9uKHQsZSl7dmFyIG49ZStcIlhcIixyPWUrXCJZXCIsbz1IdCh0KSxpPW9bMV1bbl0tb1swXVtuXSxhPW9bMV1bcl0tb1swXVtyXTtyZXR1cm4gMTgwKk1hdGguYXRhbjIoYSxpKS9NYXRoLlBJfSx6dC5nZXRQb2ludGVyVHlwZT1mdW5jdGlvbih0KXtyZXR1cm4gWHQuc3RyaW5nKHQucG9pbnRlclR5cGUpP3QucG9pbnRlclR5cGU6WHQubnVtYmVyKHQucG9pbnRlclR5cGUpP1t2b2lkIDAsdm9pZCAwLFwidG91Y2hcIixcInBlblwiLFwibW91c2VcIl1bdC5wb2ludGVyVHlwZV06L3RvdWNoLy50ZXN0KHQudHlwZSl8fHQgaW5zdGFuY2VvZiBXdC5kZWZhdWx0LlRvdWNoP1widG91Y2hcIjpcIm1vdXNlXCJ9LHp0LmdldEV2ZW50VGFyZ2V0cz1mdW5jdGlvbih0KXt2YXIgZT1YdC5mdW5jKHQuY29tcG9zZWRQYXRoKT90LmNvbXBvc2VkUGF0aCgpOnQucGF0aDtyZXR1cm5bUnQuZ2V0QWN0dWFsRWxlbWVudChlP2VbMF06dC50YXJnZXQpLFJ0LmdldEFjdHVhbEVsZW1lbnQodC5jdXJyZW50VGFyZ2V0KV19LHp0Lm5ld0Nvb3Jkcz1mdW5jdGlvbigpe3JldHVybntwYWdlOnt4OjAseTowfSxjbGllbnQ6e3g6MCx5OjB9LHRpbWVTdGFtcDowfX0senQuY29vcmRzVG9FdmVudD1mdW5jdGlvbih0KXtyZXR1cm57Y29vcmRzOnQsZ2V0IHBhZ2UoKXtyZXR1cm4gdGhpcy5jb29yZHMucGFnZX0sZ2V0IGNsaWVudCgpe3JldHVybiB0aGlzLmNvb3Jkcy5jbGllbnR9LGdldCB0aW1lU3RhbXAoKXtyZXR1cm4gdGhpcy5jb29yZHMudGltZVN0YW1wfSxnZXQgcGFnZVgoKXtyZXR1cm4gdGhpcy5jb29yZHMucGFnZS54fSxnZXQgcGFnZVkoKXtyZXR1cm4gdGhpcy5jb29yZHMucGFnZS55fSxnZXQgY2xpZW50WCgpe3JldHVybiB0aGlzLmNvb3Jkcy5jbGllbnQueH0sZ2V0IGNsaWVudFkoKXtyZXR1cm4gdGhpcy5jb29yZHMuY2xpZW50Lnl9LGdldCBwb2ludGVySWQoKXtyZXR1cm4gdGhpcy5jb29yZHMucG9pbnRlcklkfSxnZXQgdGFyZ2V0KCl7cmV0dXJuIHRoaXMuY29vcmRzLnRhcmdldH0sZ2V0IHR5cGUoKXtyZXR1cm4gdGhpcy5jb29yZHMudHlwZX0sZ2V0IHBvaW50ZXJUeXBlKCl7cmV0dXJuIHRoaXMuY29vcmRzLnBvaW50ZXJUeXBlfSxnZXQgYnV0dG9ucygpe3JldHVybiB0aGlzLmNvb3Jkcy5idXR0b25zfSxwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe319fSxPYmplY3QuZGVmaW5lUHJvcGVydHkoenQsXCJwb2ludGVyRXh0ZW5kXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIFl0LmRlZmF1bHR9fSk7dmFyIEN0PUJ0KEMpLFd0PUJ0KEQpLFJ0PUx0KCQpLEZ0PUJ0KEV0KSxYdD1MdCh3KSxZdD1CdChUdCk7ZnVuY3Rpb24gTnQoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBOdD1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIEx0KHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PUF0KHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPU50KCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfXJldHVybiBuLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pLG59ZnVuY3Rpb24gQnQodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIFZ0KHQpe3JldHVybiB0IGluc3RhbmNlb2YgV3QuZGVmYXVsdC5FdmVudHx8dCBpbnN0YW5jZW9mIFd0LmRlZmF1bHQuVG91Y2h9ZnVuY3Rpb24gcXQodCxlLG4pe3JldHVybihuPW58fHt9KS54PWVbKHQ9dHx8XCJwYWdlXCIpK1wiWFwiXSxuLnk9ZVt0K1wiWVwiXSxufWZ1bmN0aW9uIFV0KHQsZSl7cmV0dXJuIGU9ZXx8e3g6MCx5OjB9LEN0LmRlZmF1bHQuaXNPcGVyYU1vYmlsZSYmVnQodCk/KHF0KFwic2NyZWVuXCIsdCxlKSxlLngrPXdpbmRvdy5zY3JvbGxYLGUueSs9d2luZG93LnNjcm9sbFkpOnF0KFwicGFnZVwiLHQsZSksZX1mdW5jdGlvbiBHdCh0LGUpe3JldHVybiBlPWV8fHt9LEN0LmRlZmF1bHQuaXNPcGVyYU1vYmlsZSYmVnQodCk/cXQoXCJzY3JlZW5cIix0LGUpOnF0KFwiY2xpZW50XCIsdCxlKSxlfWZ1bmN0aW9uIEh0KHQpe3ZhciBlPVtdO3JldHVybiBYdC5hcnJheSh0KT8oZVswXT10WzBdLGVbMV09dFsxXSk6XCJ0b3VjaGVuZFwiPT09dC50eXBlPzE9PT10LnRvdWNoZXMubGVuZ3RoPyhlWzBdPXQudG91Y2hlc1swXSxlWzFdPXQuY2hhbmdlZFRvdWNoZXNbMF0pOjA9PT10LnRvdWNoZXMubGVuZ3RoJiYoZVswXT10LmNoYW5nZWRUb3VjaGVzWzBdLGVbMV09dC5jaGFuZ2VkVG91Y2hlc1sxXSk6KGVbMF09dC50b3VjaGVzWzBdLGVbMV09dC50b3VjaGVzWzFdKSxlfWZ1bmN0aW9uIEt0KHQpe2Zvcih2YXIgZT17cGFnZVg6MCxwYWdlWTowLGNsaWVudFg6MCxjbGllbnRZOjAsc2NyZWVuWDowLHNjcmVlblk6MH0sbj0wO248dC5sZW5ndGg7bisrKXt2YXIgcj10W25dO2Zvcih2YXIgbyBpbiBlKWVbb10rPXJbb119Zm9yKHZhciBpIGluIGUpZVtpXS89dC5sZW5ndGg7cmV0dXJuIGV9dmFyICR0PXt9O2Z1bmN0aW9uIFp0KHQpe3JldHVybihadD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KCR0LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLCR0LmdldFN0cmluZ09wdGlvblJlc3VsdD1uZSwkdC5yZXNvbHZlUmVjdExpa2U9ZnVuY3Rpb24odCxlLG4scil7dmFyIG89dDt0ZS5zdHJpbmcobyk/bz1uZShvLGUsbik6dGUuZnVuYyhvKSYmKG89by5hcHBseSh2b2lkIDAsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpe2Zvcih2YXIgZT0wLG49bmV3IEFycmF5KHQubGVuZ3RoKTtlPHQubGVuZ3RoO2UrKyluW2VdPXRbZV07cmV0dXJuIG59fSh0KXx8ZnVuY3Rpb24odCl7aWYoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdCh0KXx8XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSlyZXR1cm4gQXJyYXkuZnJvbSh0KX0odCl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfSgpfShyKSkpO3RlLmVsZW1lbnQobykmJihvPSgwLCQuZ2V0RWxlbWVudFJlY3QpKG8pKTtyZXR1cm4gb30sJHQucmVjdFRvWFk9ZnVuY3Rpb24odCl7cmV0dXJuIHQmJnt4OlwieFwiaW4gdD90Lng6dC5sZWZ0LHk6XCJ5XCJpbiB0P3QueTp0LnRvcH19LCR0Lnh5d2hUb1RsYnI9ZnVuY3Rpb24odCl7IXR8fFwibGVmdFwiaW4gdCYmXCJ0b3BcImluIHR8fCgodD0oMCxRdC5kZWZhdWx0KSh7fSx0KSkubGVmdD10Lnh8fDAsdC50b3A9dC55fHwwLHQucmlnaHQ9dC5yaWdodHx8dC5sZWZ0K3Qud2lkdGgsdC5ib3R0b209dC5ib3R0b218fHQudG9wK3QuaGVpZ2h0KTtyZXR1cm4gdH0sJHQudGxiclRvWHl3aD1mdW5jdGlvbih0KXshdHx8XCJ4XCJpbiB0JiZcInlcImluIHR8fCgodD0oMCxRdC5kZWZhdWx0KSh7fSx0KSkueD10LmxlZnR8fDAsdC55PXQudG9wfHwwLHQud2lkdGg9dC53aWR0aHx8dC5yaWdodHx8MC10LngsdC5oZWlnaHQ9dC5oZWlnaHR8fHQuYm90dG9tfHwwLXQueSk7cmV0dXJuIHR9LCR0LmFkZEVkZ2VzPWZ1bmN0aW9uKHQsZSxuKXt0LmxlZnQmJihlLmxlZnQrPW4ueCk7dC5yaWdodCYmKGUucmlnaHQrPW4ueCk7dC50b3AmJihlLnRvcCs9bi55KTt0LmJvdHRvbSYmKGUuYm90dG9tKz1uLnkpO2Uud2lkdGg9ZS5yaWdodC1lLmxlZnQsZS5oZWlnaHQ9ZS5ib3R0b20tZS50b3B9O3ZhciBKdCxRdD0oSnQ9Y3QpJiZKdC5fX2VzTW9kdWxlP0p0OntkZWZhdWx0Okp0fSx0ZT1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1adCh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1lZSgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSh3KTtmdW5jdGlvbiBlZSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIGVlPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gbmUodCxlLG4pe3JldHVyblwicGFyZW50XCI9PT10PygwLCQucGFyZW50Tm9kZSkobik6XCJzZWxmXCI9PT10P2UuZ2V0UmVjdChuKTooMCwkLmNsb3Nlc3QpKG4sdCl9dmFyIHJlPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShyZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxyZS5kZWZhdWx0PWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10Lm9wdGlvbnNbbl0sbz1yJiZyLm9yaWdpbnx8dC5vcHRpb25zLm9yaWdpbixpPSgwLCR0LnJlc29sdmVSZWN0TGlrZSkobyx0LGUsW3QmJmVdKTtyZXR1cm4oMCwkdC5yZWN0VG9YWSkoaSl8fHt4OjAseTowfX07dmFyIG9lPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShvZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxvZS5kZWZhdWx0PXZvaWQgMDt2YXIgaWUsYWUsdWU9MDt2YXIgc2U9e3JlcXVlc3Q6ZnVuY3Rpb24odCl7cmV0dXJuIGllKHQpfSxjYW5jZWw6ZnVuY3Rpb24odCl7cmV0dXJuIGFlKHQpfSxpbml0OmZ1bmN0aW9uKHQpe2lmKGllPXQucmVxdWVzdEFuaW1hdGlvbkZyYW1lLGFlPXQuY2FuY2VsQW5pbWF0aW9uRnJhbWUsIWllKWZvcih2YXIgZT1bXCJtc1wiLFwibW96XCIsXCJ3ZWJraXRcIixcIm9cIl0sbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO2llPXRbXCJcIi5jb25jYXQocixcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiKV0sYWU9dFtcIlwiLmNvbmNhdChyLFwiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIildfHx0W1wiXCIuY29uY2F0KHIsXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIildfWllfHwoaWU9ZnVuY3Rpb24odCl7dmFyIGU9RGF0ZS5ub3coKSxuPU1hdGgubWF4KDAsMTYtKGUtdWUpKSxyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXt0KGUrbil9LG4pO3JldHVybiB1ZT1lK24scn0sYWU9ZnVuY3Rpb24odCl7cmV0dXJuIGNsZWFyVGltZW91dCh0KX0pfX07b2UuZGVmYXVsdD1zZTt2YXIgbGU9e307ZnVuY3Rpb24gY2UodCl7cmV0dXJuKGNlPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkobGUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksbGUud2Fybk9uY2U9ZnVuY3Rpb24odCxlKXt2YXIgbj0hMTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbnx8KGhlLmRlZmF1bHQud2luZG93LmNvbnNvbGUud2FybihlKSxuPSEwKSx0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGxlLmNvcHlBY3Rpb249ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5uYW1lPWUubmFtZSx0LmF4aXM9ZS5heGlzLHQuZWRnZXM9ZS5lZGdlcyx0fSxPYmplY3QuZGVmaW5lUHJvcGVydHkobGUsXCJ3aW5cIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gaGUuZGVmYXVsdH19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkobGUsXCJicm93c2VyXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGdlLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGxlLFwiY2xvbmVcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gYmUuZGVmYXVsdH19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkobGUsXCJleHRlbmRcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbWUuZGVmYXVsdH19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkobGUsXCJnZXRPcmlnaW5YWVwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBPZS5kZWZhdWx0fX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsZSxcImh5cG90XCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHdlLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGxlLFwibm9ybWFsaXplTGlzdGVuZXJzXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIF9lLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGxlLFwicmFmXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIFBlLmRlZmF1bHR9fSksbGUucmVjdD1sZS5wb2ludGVyPWxlLmlzPWxlLmRvbT1sZS5hcnI9dm9pZCAwO3ZhciBmZT1qZShTKTtsZS5hcnI9ZmU7dmFyIHBlPWplKCQpO2xlLmRvbT1wZTt2YXIgZGU9amUodyk7bGUuaXM9ZGU7dmFyIHZlPWplKHp0KTtsZS5wb2ludGVyPXZlO3ZhciB5ZT1qZSgkdCk7bGUucmVjdD15ZTt2YXIgaGU9eGUoTyksZ2U9eGUoQyksYmU9eGUoViksbWU9eGUoY3QpLE9lPXhlKHJlKSx3ZT14ZShFdCksX2U9eGUoZnQpLFBlPXhlKG9lKTtmdW5jdGlvbiB4ZSh0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gU2UoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBTZT1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIGplKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PWNlKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPVNlKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfXJldHVybiBuLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pLG59dmFyIE1lPXt9O2Z1bmN0aW9uIGtlKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBFZSh0LGUsbil7cmV0dXJuIGUmJmtlKHQucHJvdG90eXBlLGUpLG4mJmtlKHQsbiksdH1mdW5jdGlvbiBUZSh0LGUsbil7cmV0dXJuIGUgaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9T2JqZWN0LmRlZmluZVByb3BlcnR5KE1lLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLE1lLmRlZmF1bHQ9TWUuQmFzZUV2ZW50PXZvaWQgMDt2YXIgRGU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpeyFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZSksVGUodGhpcyxcInR5cGVcIix2b2lkIDApLFRlKHRoaXMsXCJ0YXJnZXRcIix2b2lkIDApLFRlKHRoaXMsXCJjdXJyZW50VGFyZ2V0XCIsdm9pZCAwKSxUZSh0aGlzLFwiaW50ZXJhY3RhYmxlXCIsdm9pZCAwKSxUZSh0aGlzLFwiX2ludGVyYWN0aW9uXCIsdm9pZCAwKSxUZSh0aGlzLFwidGltZVN0YW1wXCIsdm9pZCAwKSxUZSh0aGlzLFwiaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkXCIsITEpLFRlKHRoaXMsXCJwcm9wYWdhdGlvblN0b3BwZWRcIiwhMSksdGhpcy5faW50ZXJhY3Rpb249dH1yZXR1cm4gRWUoZSxbe2tleTpcImludGVyYWN0aW9uXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX2ludGVyYWN0aW9uLl9wcm94eX19XSksRWUoZSxbe2tleTpcInByZXZlbnREZWZhdWx0XCIsdmFsdWU6ZnVuY3Rpb24oKXt9fSx7a2V5Olwic3RvcFByb3BhZ2F0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZD0hMH19LHtrZXk6XCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkPXRoaXMucHJvcGFnYXRpb25TdG9wcGVkPSEwfX1dKSxlfSgpLEllPU1lLkJhc2VFdmVudD1EZTtNZS5kZWZhdWx0PUllO3ZhciB6ZT17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoemUsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksemUuZGVmYXVsdD16ZS5kZWZhdWx0cz12b2lkIDA7dmFyIEFlPXtiYXNlOntwcmV2ZW50RGVmYXVsdDpcImF1dG9cIixkZWx0YVNvdXJjZTpcInBhZ2VcIn0scGVyQWN0aW9uOntlbmFibGVkOiExLG9yaWdpbjp7eDowLHk6MH19LGFjdGlvbnM6e319LENlPXplLmRlZmF1bHRzPUFlO3plLmRlZmF1bHQ9Q2U7dmFyIFdlPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShXZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxXZS5kZWZhdWx0PVdlLkludGVyYWN0RXZlbnQ9dm9pZCAwO3ZhciBSZT1MZShjdCksRmU9TGUocmUpLFhlPUxlKEV0KSxZZT1MZShNZSksTmU9TGUoemUpO2Z1bmN0aW9uIExlKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBCZSh0KXtyZXR1cm4oQmU9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWZ1bmN0aW9uIFZlKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBxZSh0KXtyZXR1cm4ocWU9T2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5nZXRQcm90b3R5cGVPZjpmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KX0pKHQpfWZ1bmN0aW9uIFVlKHQpe2lmKHZvaWQgMD09PXQpdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO3JldHVybiB0fWZ1bmN0aW9uIEdlKHQsZSl7cmV0dXJuKEdlPU9iamVjdC5zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5fX3Byb3RvX189ZSx0fSkodCxlKX1mdW5jdGlvbiBIZSh0LGUsbil7cmV0dXJuIGUgaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9dmFyIEtlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZyh0LGUsbixyLG8saSxhKXt2YXIgdSxzLGw7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxnKSxzPXRoaXMsdT0hKGw9cWUoZykuY2FsbCh0aGlzLHQpKXx8XCJvYmplY3RcIiE9PUJlKGwpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBsP1VlKHMpOmwsSGUoVWUodSksXCJ0YXJnZXRcIix2b2lkIDApLEhlKFVlKHUpLFwiY3VycmVudFRhcmdldFwiLHZvaWQgMCksSGUoVWUodSksXCJyZWxhdGVkVGFyZ2V0XCIsbnVsbCksSGUoVWUodSksXCJzY3JlZW5YXCIsdm9pZCAwKSxIZShVZSh1KSxcInNjcmVlbllcIix2b2lkIDApLEhlKFVlKHUpLFwiYnV0dG9uXCIsdm9pZCAwKSxIZShVZSh1KSxcImJ1dHRvbnNcIix2b2lkIDApLEhlKFVlKHUpLFwiY3RybEtleVwiLHZvaWQgMCksSGUoVWUodSksXCJzaGlmdEtleVwiLHZvaWQgMCksSGUoVWUodSksXCJhbHRLZXlcIix2b2lkIDApLEhlKFVlKHUpLFwibWV0YUtleVwiLHZvaWQgMCksSGUoVWUodSksXCJwYWdlXCIsdm9pZCAwKSxIZShVZSh1KSxcImNsaWVudFwiLHZvaWQgMCksSGUoVWUodSksXCJkZWx0YVwiLHZvaWQgMCksSGUoVWUodSksXCJyZWN0XCIsdm9pZCAwKSxIZShVZSh1KSxcIngwXCIsdm9pZCAwKSxIZShVZSh1KSxcInkwXCIsdm9pZCAwKSxIZShVZSh1KSxcInQwXCIsdm9pZCAwKSxIZShVZSh1KSxcImR0XCIsdm9pZCAwKSxIZShVZSh1KSxcImR1cmF0aW9uXCIsdm9pZCAwKSxIZShVZSh1KSxcImNsaWVudFgwXCIsdm9pZCAwKSxIZShVZSh1KSxcImNsaWVudFkwXCIsdm9pZCAwKSxIZShVZSh1KSxcInZlbG9jaXR5XCIsdm9pZCAwKSxIZShVZSh1KSxcInNwZWVkXCIsdm9pZCAwKSxIZShVZSh1KSxcInN3aXBlXCIsdm9pZCAwKSxIZShVZSh1KSxcInRpbWVTdGFtcFwiLHZvaWQgMCksSGUoVWUodSksXCJkcmFnRW50ZXJcIix2b2lkIDApLEhlKFVlKHUpLFwiZHJhZ0xlYXZlXCIsdm9pZCAwKSxIZShVZSh1KSxcImF4ZXNcIix2b2lkIDApLEhlKFVlKHUpLFwicHJlRW5kXCIsdm9pZCAwKSxvPW98fHQuZWxlbWVudDt2YXIgYz10LmludGVyYWN0YWJsZSxmPShjJiZjLm9wdGlvbnN8fE5lLmRlZmF1bHQpLmRlbHRhU291cmNlLHA9KDAsRmUuZGVmYXVsdCkoYyxvLG4pLGQ9XCJzdGFydFwiPT09cix2PVwiZW5kXCI9PT1yLHk9ZD9VZSh1KTp0LnByZXZFdmVudCxoPWQ/dC5jb29yZHMuc3RhcnQ6dj97cGFnZTp5LnBhZ2UsY2xpZW50OnkuY2xpZW50LHRpbWVTdGFtcDp0LmNvb3Jkcy5jdXIudGltZVN0YW1wfTp0LmNvb3Jkcy5jdXI7cmV0dXJuIHUucGFnZT0oMCxSZS5kZWZhdWx0KSh7fSxoLnBhZ2UpLHUuY2xpZW50PSgwLFJlLmRlZmF1bHQpKHt9LGguY2xpZW50KSx1LnJlY3Q9KDAsUmUuZGVmYXVsdCkoe30sdC5yZWN0KSx1LnRpbWVTdGFtcD1oLnRpbWVTdGFtcCx2fHwodS5wYWdlLngtPXAueCx1LnBhZ2UueS09cC55LHUuY2xpZW50LngtPXAueCx1LmNsaWVudC55LT1wLnkpLHUuY3RybEtleT1lLmN0cmxLZXksdS5hbHRLZXk9ZS5hbHRLZXksdS5zaGlmdEtleT1lLnNoaWZ0S2V5LHUubWV0YUtleT1lLm1ldGFLZXksdS5idXR0b249ZS5idXR0b24sdS5idXR0b25zPWUuYnV0dG9ucyx1LnRhcmdldD1vLHUuY3VycmVudFRhcmdldD1vLHUucHJlRW5kPWksdS50eXBlPWF8fG4rKHJ8fFwiXCIpLHUuaW50ZXJhY3RhYmxlPWMsdS50MD1kP3QucG9pbnRlcnNbdC5wb2ludGVycy5sZW5ndGgtMV0uZG93blRpbWU6eS50MCx1LngwPXQuY29vcmRzLnN0YXJ0LnBhZ2UueC1wLngsdS55MD10LmNvb3Jkcy5zdGFydC5wYWdlLnktcC55LHUuY2xpZW50WDA9dC5jb29yZHMuc3RhcnQuY2xpZW50LngtcC54LHUuY2xpZW50WTA9dC5jb29yZHMuc3RhcnQuY2xpZW50LnktcC55LHUuZGVsdGE9ZHx8dj97eDowLHk6MH06e3g6dVtmXS54LXlbZl0ueCx5OnVbZl0ueS15W2ZdLnl9LHUuZHQ9dC5jb29yZHMuZGVsdGEudGltZVN0YW1wLHUuZHVyYXRpb249dS50aW1lU3RhbXAtdS50MCx1LnZlbG9jaXR5PSgwLFJlLmRlZmF1bHQpKHt9LHQuY29vcmRzLnZlbG9jaXR5W2ZdKSx1LnNwZWVkPSgwLFhlLmRlZmF1bHQpKHUudmVsb2NpdHkueCx1LnZlbG9jaXR5LnkpLHUuc3dpcGU9dnx8XCJpbmVydGlhc3RhcnRcIj09PXI/dS5nZXRTd2lwZSgpOm51bGwsdX12YXIgdCxlLG47cmV0dXJuIGZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO3QucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZSYmZS5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTp0LHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSxlJiZHZSh0LGUpfShnLFllW1wiZGVmYXVsdFwiXSksdD1nLChlPVt7a2V5OlwiZ2V0U3dpcGVcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMuX2ludGVyYWN0aW9uO2lmKHQucHJldkV2ZW50LnNwZWVkPDYwMHx8MTUwPHRoaXMudGltZVN0YW1wLXQucHJldkV2ZW50LnRpbWVTdGFtcClyZXR1cm4gbnVsbDt2YXIgZT0xODAqTWF0aC5hdGFuMih0LnByZXZFdmVudC52ZWxvY2l0eVksdC5wcmV2RXZlbnQudmVsb2NpdHlYKS9NYXRoLlBJO2U8MCYmKGUrPTM2MCk7dmFyIG49MTEyLjU8PWUmJmU8MjQ3LjUscj0yMDIuNTw9ZSYmZTwzMzcuNTtyZXR1cm57dXA6cixkb3duOiFyJiYyMi41PD1lJiZlPDE1Ny41LGxlZnQ6bixyaWdodDohbiYmKDI5Mi41PD1lfHxlPDY3LjUpLGFuZ2xlOmUsc3BlZWQ6dC5wcmV2RXZlbnQuc3BlZWQsdmVsb2NpdHk6e3g6dC5wcmV2RXZlbnQudmVsb2NpdHlYLHk6dC5wcmV2RXZlbnQudmVsb2NpdHlZfX19fSx7a2V5OlwicHJldmVudERlZmF1bHRcIix2YWx1ZTpmdW5jdGlvbigpe319LHtrZXk6XCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkPXRoaXMucHJvcGFnYXRpb25TdG9wcGVkPSEwfX0se2tleTpcInN0b3BQcm9wYWdhdGlvblwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5wcm9wYWdhdGlvblN0b3BwZWQ9ITB9fSx7a2V5OlwicGFnZVhcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5wYWdlLnh9LHNldDpmdW5jdGlvbih0KXt0aGlzLnBhZ2UueD10fX0se2tleTpcInBhZ2VZXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFnZS55fSxzZXQ6ZnVuY3Rpb24odCl7dGhpcy5wYWdlLnk9dH19LHtrZXk6XCJjbGllbnRYXCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xpZW50Lnh9LHNldDpmdW5jdGlvbih0KXt0aGlzLmNsaWVudC54PXR9fSx7a2V5OlwiY2xpZW50WVwiLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsaWVudC55fSxzZXQ6ZnVuY3Rpb24odCl7dGhpcy5jbGllbnQueT10fX0se2tleTpcImR4XCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGVsdGEueH0sc2V0OmZ1bmN0aW9uKHQpe3RoaXMuZGVsdGEueD10fX0se2tleTpcImR5XCIsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGVsdGEueX0sc2V0OmZ1bmN0aW9uKHQpe3RoaXMuZGVsdGEueT10fX0se2tleTpcInZlbG9jaXR5WFwiLGdldDpmdW5jdGlvbigpe3JldHVybiB0aGlzLnZlbG9jaXR5Lnh9LHNldDpmdW5jdGlvbih0KXt0aGlzLnZlbG9jaXR5Lng9dH19LHtrZXk6XCJ2ZWxvY2l0eVlcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy52ZWxvY2l0eS55fSxzZXQ6ZnVuY3Rpb24odCl7dGhpcy52ZWxvY2l0eS55PXR9fV0pJiZWZSh0LnByb3RvdHlwZSxlKSxuJiZWZSh0LG4pLGd9KCksJGU9V2UuSW50ZXJhY3RFdmVudD1LZTtXZS5kZWZhdWx0PSRlO3ZhciBaZT17fTtmdW5jdGlvbiBKZSh0KXtyZXR1cm4oSmU9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShaZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxaZS5kZWZhdWx0PXZvaWQgMDt2YXIgUWUsdG49YW4oUyksZW49YW4oJCksbm49KFFlPWN0KSYmUWUuX19lc01vZHVsZT9RZTp7ZGVmYXVsdDpRZX0scm49YW4odyk7ZnVuY3Rpb24gb24oKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBvbj1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIGFuKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PUplKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPW9uKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfXJldHVybiBuLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pLG59ZnVuY3Rpb24gdW4odCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZVtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsci5rZXkscil9fWZ1bmN0aW9uIHNuKHQsZSxuKXtyZXR1cm4gZSBpbiB0P09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LGUse3ZhbHVlOm4sZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITB9KTp0W2VdPW4sdH12YXIgbG49ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQpe3ZhciBhPXRoaXM7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxlKSx0aGlzLnNjb3BlPXQsc24odGhpcyxcImxpc3RcIixbXSksc24odGhpcyxcInNlbGVjdG9yTWFwXCIse30pLHQuYWRkTGlzdGVuZXJzKHtcImludGVyYWN0YWJsZTp1bnNldFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3RhYmxlLG49ZS50YXJnZXQscj1lLl9jb250ZXh0LG89cm4uc3RyaW5nKG4pP2Euc2VsZWN0b3JNYXBbbl06blthLnNjb3BlLmlkXSxpPW8uZmluZEluZGV4KGZ1bmN0aW9uKHQpe3JldHVybiB0LmNvbnRleHQ9PT1yfSk7b1tpXSYmKG9baV0uY29udGV4dD1udWxsLG9baV0uaW50ZXJhY3RhYmxlPW51bGwpLG8uc3BsaWNlKGksMSl9fSl9dmFyIHQsbixyO3JldHVybiB0PWUsKG49W3trZXk6XCJuZXdcIix2YWx1ZTpmdW5jdGlvbih0LGUpe2U9KDAsbm4uZGVmYXVsdCkoZXx8e30se2FjdGlvbnM6dGhpcy5zY29wZS5hY3Rpb25zfSk7dmFyIG49bmV3IHRoaXMuc2NvcGUuSW50ZXJhY3RhYmxlKHQsZSx0aGlzLnNjb3BlLmRvY3VtZW50LHRoaXMuc2NvcGUuZXZlbnRzKSxyPXtjb250ZXh0Om4uX2NvbnRleHQsaW50ZXJhY3RhYmxlOm59O3JldHVybiB0aGlzLnNjb3BlLmFkZERvY3VtZW50KG4uX2RvYyksdGhpcy5saXN0LnB1c2gobikscm4uc3RyaW5nKHQpPyh0aGlzLnNlbGVjdG9yTWFwW3RdfHwodGhpcy5zZWxlY3Rvck1hcFt0XT1bXSksdGhpcy5zZWxlY3Rvck1hcFt0XS5wdXNoKHIpKToobi50YXJnZXRbdGhpcy5zY29wZS5pZF18fE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHRoaXMuc2NvcGUuaWQse3ZhbHVlOltdLGNvbmZpZ3VyYWJsZTohMH0pLHRbdGhpcy5zY29wZS5pZF0ucHVzaChyKSksdGhpcy5zY29wZS5maXJlKFwiaW50ZXJhY3RhYmxlOm5ld1wiLHt0YXJnZXQ6dCxvcHRpb25zOmUsaW50ZXJhY3RhYmxlOm4sd2luOnRoaXMuc2NvcGUuX3dpbn0pLG59fSx7a2V5OlwiZ2V0XCIsdmFsdWU6ZnVuY3Rpb24oZSx0KXt2YXIgbj10JiZ0LmNvbnRleHR8fHRoaXMuc2NvcGUuZG9jdW1lbnQscj1ybi5zdHJpbmcoZSksbz1yP3RoaXMuc2VsZWN0b3JNYXBbZV06ZVt0aGlzLnNjb3BlLmlkXTtpZighbylyZXR1cm4gbnVsbDt2YXIgaT10bi5maW5kKG8sZnVuY3Rpb24odCl7cmV0dXJuIHQuY29udGV4dD09PW4mJihyfHx0LmludGVyYWN0YWJsZS5pbkNvbnRleHQoZSkpfSk7cmV0dXJuIGkmJmkuaW50ZXJhY3RhYmxlfX0se2tleTpcImZvckVhY2hNYXRjaFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPTA7bjx0aGlzLmxpc3QubGVuZ3RoO24rKyl7dmFyIHI9dGhpcy5saXN0W25dLG89dm9pZCAwO2lmKChybi5zdHJpbmcoci50YXJnZXQpP3JuLmVsZW1lbnQodCkmJmVuLm1hdGNoZXNTZWxlY3Rvcih0LHIudGFyZ2V0KTp0PT09ci50YXJnZXQpJiZyLmluQ29udGV4dCh0KSYmKG89ZShyKSksdm9pZCAwIT09bylyZXR1cm4gb319fV0pJiZ1bih0LnByb3RvdHlwZSxuKSxyJiZ1bih0LHIpLGV9KCk7WmUuZGVmYXVsdD1sbjt2YXIgY249e307ZnVuY3Rpb24gZm4odCl7cmV0dXJuKGZuPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoY24sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksY24uZGVmYXVsdD1jbi5GYWtlRXZlbnQ9dm9pZCAwO3ZhciBwbj1PbihTKSxkbj1PbigkKSx2bj1ibihjdCkseW49T24odyksaG49Ym4oVHQpLGduPU9uKHp0KTtmdW5jdGlvbiBibih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gbW4oKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBtbj1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIE9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PWZuKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPW1uKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfXJldHVybiBuLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pLG59ZnVuY3Rpb24gd24odCxlKXtmb3IodmFyIG49MDtuPGUubGVuZ3RoO24rKyl7dmFyIHI9ZVtuXTtyLmVudW1lcmFibGU9ci5lbnVtZXJhYmxlfHwhMSxyLmNvbmZpZ3VyYWJsZT0hMCxcInZhbHVlXCJpbiByJiYoci53cml0YWJsZT0hMCksT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsci5rZXkscil9fWZ1bmN0aW9uIF9uKHQsZSl7cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKEFycmF5LmlzQXJyYXkodCkpcmV0dXJuIHR9KHQpfHxmdW5jdGlvbih0LGUpe2lmKCEoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdCh0KXx8XCJbb2JqZWN0IEFyZ3VtZW50c11cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KSkpcmV0dXJuO3ZhciBuPVtdLHI9ITAsbz0hMSxpPXZvaWQgMDt0cnl7Zm9yKHZhciBhLHU9dFtTeW1ib2wuaXRlcmF0b3JdKCk7IShyPShhPXUubmV4dCgpKS5kb25lKSYmKG4ucHVzaChhLnZhbHVlKSwhZXx8bi5sZW5ndGghPT1lKTtyPSEwKTt9Y2F0Y2godCl7bz0hMCxpPXR9ZmluYWxseXt0cnl7cnx8bnVsbD09dS5yZXR1cm58fHUucmV0dXJuKCl9ZmluYWxseXtpZihvKXRocm93IGl9fXJldHVybiBufSh0LGUpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpfSgpfXZhciBQbj1mdW5jdGlvbigpe2Z1bmN0aW9uIG8odCl7dmFyIGUsbixyOyFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsbyksdGhpcy5vcmlnaW5hbEV2ZW50PXQscj12b2lkIDAsKG49XCJjdXJyZW50VGFyZ2V0XCIpaW4oZT10aGlzKT9PYmplY3QuZGVmaW5lUHJvcGVydHkoZSxuLHt2YWx1ZTpyLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6ZVtuXT1yLCgwLGhuLmRlZmF1bHQpKHRoaXMsdCl9dmFyIHQsZSxuO3JldHVybiB0PW8sKGU9W3trZXk6XCJwcmV2ZW50T3JpZ2luYWxEZWZhdWx0XCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLm9yaWdpbmFsRXZlbnQucHJldmVudERlZmF1bHQoKX19LHtrZXk6XCJzdG9wUHJvcGFnYXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMub3JpZ2luYWxFdmVudC5zdG9wUHJvcGFnYXRpb24oKX19LHtrZXk6XCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMub3JpZ2luYWxFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKX19XSkmJnduKHQucHJvdG90eXBlLGUpLG4mJnduKHQsbiksb30oKTtmdW5jdGlvbiB4bih0KXtpZigheW4ub2JqZWN0KHQpKXJldHVybntjYXB0dXJlOiEhdCxwYXNzaXZlOiExfTt2YXIgZT0oMCx2bi5kZWZhdWx0KSh7fSx0KTtyZXR1cm4gZS5jYXB0dXJlPSEhdC5jYXB0dXJlLGUucGFzc2l2ZT0hIXQucGFzc2l2ZSxlfWNuLkZha2VFdmVudD1Qbjt2YXIgU249e2lkOlwiZXZlbnRzXCIsaW5zdGFsbDpmdW5jdGlvbih0KXt2YXIgZj1bXSxiPXt9LGM9W10scD17YWRkOmQscmVtb3ZlOmcsYWRkRGVsZWdhdGU6ZnVuY3Rpb24oZSxuLHQscixvKXt2YXIgaT14bihvKTtpZighYlt0XSl7Ylt0XT1bXTtmb3IodmFyIGE9MDthPGMubGVuZ3RoO2ErKyl7dmFyIHU9Y1thXTtkKHUsdCxtKSxkKHUsdCxPLCEwKX19dmFyIHM9Ylt0XSxsPXBuLmZpbmQocyxmdW5jdGlvbih0KXtyZXR1cm4gdC5zZWxlY3Rvcj09PWUmJnQuY29udGV4dD09PW59KTtsfHwobD17c2VsZWN0b3I6ZSxjb250ZXh0Om4sbGlzdGVuZXJzOltdfSxzLnB1c2gobCkpO2wubGlzdGVuZXJzLnB1c2goW3IsaV0pfSxyZW1vdmVEZWxlZ2F0ZTpmdW5jdGlvbih0LGUsbixyLG8pe3ZhciBpLGE9eG4obyksdT1iW25dLHM9ITE7aWYoIXUpcmV0dXJuO2ZvcihpPXUubGVuZ3RoLTE7MDw9aTtpLS0pe3ZhciBsPXVbaV07aWYobC5zZWxlY3Rvcj09PXQmJmwuY29udGV4dD09PWUpe2Zvcih2YXIgYz1sLmxpc3RlbmVycyxmPWMubGVuZ3RoLTE7MDw9ZjtmLS0pe3ZhciBwPV9uKGNbZl0sMiksZD1wWzBdLHY9cFsxXSx5PXYuY2FwdHVyZSxoPXYucGFzc2l2ZTtpZihkPT09ciYmeT09PWEuY2FwdHVyZSYmaD09PWEucGFzc2l2ZSl7Yy5zcGxpY2UoZiwxKSxjLmxlbmd0aHx8KHUuc3BsaWNlKGksMSksZyhlLG4sbSksZyhlLG4sTywhMCkpLHM9ITA7YnJlYWt9fWlmKHMpYnJlYWt9fX0sZGVsZWdhdGVMaXN0ZW5lcjptLGRlbGVnYXRlVXNlQ2FwdHVyZTpPLGRlbGVnYXRlZEV2ZW50czpiLGRvY3VtZW50czpjLHRhcmdldHM6ZixzdXBwb3J0c09wdGlvbnM6ITEsc3VwcG9ydHNQYXNzaXZlOiExfTtmdW5jdGlvbiBkKGUsdCxuLHIpe3ZhciBvPXhuKHIpLGk9cG4uZmluZChmLGZ1bmN0aW9uKHQpe3JldHVybiB0LmV2ZW50VGFyZ2V0PT09ZX0pO2l8fChpPXtldmVudFRhcmdldDplLGV2ZW50czp7fX0sZi5wdXNoKGkpKSxpLmV2ZW50c1t0XXx8KGkuZXZlbnRzW3RdPVtdKSxlLmFkZEV2ZW50TGlzdGVuZXImJiFwbi5jb250YWlucyhpLmV2ZW50c1t0XSxuKSYmKGUuYWRkRXZlbnRMaXN0ZW5lcih0LG4scC5zdXBwb3J0c09wdGlvbnM/bzpvLmNhcHR1cmUpLGkuZXZlbnRzW3RdLnB1c2gobikpfWZ1bmN0aW9uIGcoZSx0LG4scil7dmFyIG89eG4ociksaT1wbi5maW5kSW5kZXgoZixmdW5jdGlvbih0KXtyZXR1cm4gdC5ldmVudFRhcmdldD09PWV9KSxhPWZbaV07aWYoYSYmYS5ldmVudHMpaWYoXCJhbGxcIiE9PXQpe3ZhciB1PSExLHM9YS5ldmVudHNbdF07aWYocyl7aWYoXCJhbGxcIj09PW4pe2Zvcih2YXIgbD1zLmxlbmd0aC0xOzA8PWw7bC0tKWcoZSx0LHNbbF0sbyk7cmV0dXJufWZvcih2YXIgYz0wO2M8cy5sZW5ndGg7YysrKWlmKHNbY109PT1uKXtlLnJlbW92ZUV2ZW50TGlzdGVuZXIodCxuLHAuc3VwcG9ydHNPcHRpb25zP286by5jYXB0dXJlKSxzLnNwbGljZShjLDEpLDA9PT1zLmxlbmd0aCYmKGRlbGV0ZSBhLmV2ZW50c1t0XSx1PSEwKTticmVha319dSYmIU9iamVjdC5rZXlzKGEuZXZlbnRzKS5sZW5ndGgmJmYuc3BsaWNlKGksMSl9ZWxzZSBmb3IodCBpbiBhLmV2ZW50cylhLmV2ZW50cy5oYXNPd25Qcm9wZXJ0eSh0KSYmZyhlLHQsXCJhbGxcIil9ZnVuY3Rpb24gbSh0LGUpe2Zvcih2YXIgbj14bihlKSxyPW5ldyBQbih0KSxvPWJbdC50eXBlXSxpPV9uKGduLmdldEV2ZW50VGFyZ2V0cyh0KSwxKVswXSxhPWk7eW4uZWxlbWVudChhKTspe2Zvcih2YXIgdT0wO3U8by5sZW5ndGg7dSsrKXt2YXIgcz1vW3VdLGw9cy5zZWxlY3RvcixjPXMuY29udGV4dDtpZihkbi5tYXRjaGVzU2VsZWN0b3IoYSxsKSYmZG4ubm9kZUNvbnRhaW5zKGMsaSkmJmRuLm5vZGVDb250YWlucyhjLGEpKXt2YXIgZj1zLmxpc3RlbmVycztyLmN1cnJlbnRUYXJnZXQ9YTtmb3IodmFyIHA9MDtwPGYubGVuZ3RoO3ArKyl7dmFyIGQ9X24oZltwXSwyKSx2PWRbMF0seT1kWzFdLGg9eS5jYXB0dXJlLGc9eS5wYXNzaXZlO2g9PT1uLmNhcHR1cmUmJmc9PT1uLnBhc3NpdmUmJnYocil9fX1hPWRuLnBhcmVudE5vZGUoYSl9fWZ1bmN0aW9uIE8odCl7cmV0dXJuIG0uY2FsbCh0aGlzLHQsITApfXJldHVybiB0LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RcIixudWxsLHtnZXQgY2FwdHVyZSgpe3JldHVybiBwLnN1cHBvcnRzT3B0aW9ucz0hMH0sZ2V0IHBhc3NpdmUoKXtyZXR1cm4gcC5zdXBwb3J0c1Bhc3NpdmU9ITB9fSksdC5ldmVudHM9cH19O2NuLmRlZmF1bHQ9U247dmFyIGpuPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShqbixcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxqbi5kZWZhdWx0PWpuLlBvaW50ZXJJbmZvPXZvaWQgMDtmdW5jdGlvbiBNbih0LGUsbixyLG8peyFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsTW4pLHRoaXMuaWQ9dCx0aGlzLnBvaW50ZXI9ZSx0aGlzLmV2ZW50PW4sdGhpcy5kb3duVGltZT1yLHRoaXMuZG93blRhcmdldD1vfXZhciBrbj1qbi5Qb2ludGVySW5mbz1Nbjtqbi5kZWZhdWx0PWtuO3ZhciBFbj17fTtmdW5jdGlvbiBUbih0KXtyZXR1cm4oVG49XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShFbixcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoRW4sXCJQb2ludGVySW5mb1wiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBSbi5kZWZhdWx0fX0pLEVuLmRlZmF1bHQ9RW4uSW50ZXJhY3Rpb249RW4uX1Byb3h5TWV0aG9kcz1Fbi5fUHJveHlWYWx1ZXM9dm9pZCAwO3ZhciBEbixJbix6bixBbixDbj1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1Ubih0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1YbigpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufShsZSksV249Rm4oV2UpLFJuPUZuKGpuKTtmdW5jdGlvbiBGbih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19ZnVuY3Rpb24gWG4oKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBYbj1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIFluKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBObih0LGUsbil7cmV0dXJuIGUmJlluKHQucHJvdG90eXBlLGUpLG4mJlluKHQsbiksdH1mdW5jdGlvbiBMbih0LGUsbil7cmV0dXJuIGUgaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9RW4uX1Byb3h5VmFsdWVzPURuLChJbj1Ebnx8KEVuLl9Qcm94eVZhbHVlcz1Ebj17fSkpLmludGVyYWN0YWJsZT1cIlwiLEluLmVsZW1lbnQ9XCJcIixJbi5wcmVwYXJlZD1cIlwiLEluLnBvaW50ZXJJc0Rvd249XCJcIixJbi5wb2ludGVyV2FzTW92ZWQ9XCJcIixJbi5fcHJveHk9XCJcIixFbi5fUHJveHlNZXRob2RzPXpuLChBbj16bnx8KEVuLl9Qcm94eU1ldGhvZHM9em49e30pKS5zdGFydD1cIlwiLEFuLm1vdmU9XCJcIixBbi5lbmQ9XCJcIixBbi5zdG9wPVwiXCIsQW4uaW50ZXJhY3Rpbmc9XCJcIjt2YXIgQm49MCxWbj1mdW5jdGlvbigpe2Z1bmN0aW9uIGwodCl7dmFyIGU9dGhpcyxuPXQucG9pbnRlclR5cGUscj10LnNjb3BlRmlyZTshZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLGwpLExuKHRoaXMsXCJpbnRlcmFjdGFibGVcIixudWxsKSxMbih0aGlzLFwiZWxlbWVudFwiLG51bGwpLExuKHRoaXMsXCJyZWN0XCIsdm9pZCAwKSxMbih0aGlzLFwiX3JlY3RzXCIsdm9pZCAwKSxMbih0aGlzLFwiZWRnZXNcIix2b2lkIDApLExuKHRoaXMsXCJfc2NvcGVGaXJlXCIsdm9pZCAwKSxMbih0aGlzLFwicHJlcGFyZWRcIix7bmFtZTpudWxsLGF4aXM6bnVsbCxlZGdlczpudWxsfSksTG4odGhpcyxcInBvaW50ZXJUeXBlXCIsdm9pZCAwKSxMbih0aGlzLFwicG9pbnRlcnNcIixbXSksTG4odGhpcyxcImRvd25FdmVudFwiLG51bGwpLExuKHRoaXMsXCJkb3duUG9pbnRlclwiLHt9KSxMbih0aGlzLFwiX2xhdGVzdFBvaW50ZXJcIix7cG9pbnRlcjpudWxsLGV2ZW50Om51bGwsZXZlbnRUYXJnZXQ6bnVsbH0pLExuKHRoaXMsXCJwcmV2RXZlbnRcIixudWxsKSxMbih0aGlzLFwicG9pbnRlcklzRG93blwiLCExKSxMbih0aGlzLFwicG9pbnRlcldhc01vdmVkXCIsITEpLExuKHRoaXMsXCJfaW50ZXJhY3RpbmdcIiwhMSksTG4odGhpcyxcIl9lbmRpbmdcIiwhMSksTG4odGhpcyxcIl9zdG9wcGVkXCIsITApLExuKHRoaXMsXCJfcHJveHlcIixudWxsKSxMbih0aGlzLFwic2ltdWxhdGlvblwiLG51bGwpLExuKHRoaXMsXCJkb01vdmVcIixDbi53YXJuT25jZShmdW5jdGlvbih0KXt0aGlzLm1vdmUodCl9LFwiVGhlIGludGVyYWN0aW9uLmRvTW92ZSgpIG1ldGhvZCBoYXMgYmVlbiByZW5hbWVkIHRvIGludGVyYWN0aW9uLm1vdmUoKVwiKSksTG4odGhpcyxcImNvb3Jkc1wiLHtzdGFydDpDbi5wb2ludGVyLm5ld0Nvb3JkcygpLHByZXY6Q24ucG9pbnRlci5uZXdDb29yZHMoKSxjdXI6Q24ucG9pbnRlci5uZXdDb29yZHMoKSxkZWx0YTpDbi5wb2ludGVyLm5ld0Nvb3JkcygpLHZlbG9jaXR5OkNuLnBvaW50ZXIubmV3Q29vcmRzKCl9KSxMbih0aGlzLFwiX2lkXCIsQm4rKyksdGhpcy5fc2NvcGVGaXJlPXIsdGhpcy5wb2ludGVyVHlwZT1uO3ZhciBvPXRoaXM7dGhpcy5fcHJveHk9e307ZnVuY3Rpb24gaSh0KXtPYmplY3QuZGVmaW5lUHJvcGVydHkoZS5fcHJveHksdCx7Z2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG9bdF19fSl9Zm9yKHZhciBhIGluIERuKWkoYSk7ZnVuY3Rpb24gdSh0KXtPYmplY3QuZGVmaW5lUHJvcGVydHkoZS5fcHJveHksdCx7dmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gb1t0XS5hcHBseShvLGFyZ3VtZW50cyl9fSl9Zm9yKHZhciBzIGluIHpuKXUocyk7dGhpcy5fc2NvcGVGaXJlKFwiaW50ZXJhY3Rpb25zOm5ld1wiLHtpbnRlcmFjdGlvbjp0aGlzfSl9cmV0dXJuIE5uKGwsW3trZXk6XCJwb2ludGVyTW92ZVRvbGVyYW5jZVwiLGdldDpmdW5jdGlvbigpe3JldHVybiAxfX1dKSxObihsLFt7a2V5OlwicG9pbnRlckRvd25cIix2YWx1ZTpmdW5jdGlvbih0LGUsbil7dmFyIHI9dGhpcy51cGRhdGVQb2ludGVyKHQsZSxuLCEwKSxvPXRoaXMucG9pbnRlcnNbcl07dGhpcy5fc2NvcGVGaXJlKFwiaW50ZXJhY3Rpb25zOmRvd25cIix7cG9pbnRlcjp0LGV2ZW50OmUsZXZlbnRUYXJnZXQ6bixwb2ludGVySW5kZXg6cixwb2ludGVySW5mbzpvLHR5cGU6XCJkb3duXCIsaW50ZXJhY3Rpb246dGhpc30pfX0se2tleTpcInN0YXJ0XCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4pe3JldHVybiEodGhpcy5pbnRlcmFjdGluZygpfHwhdGhpcy5wb2ludGVySXNEb3dufHx0aGlzLnBvaW50ZXJzLmxlbmd0aDwoXCJnZXN0dXJlXCI9PT10Lm5hbWU/MjoxKXx8IWUub3B0aW9uc1t0Lm5hbWVdLmVuYWJsZWQpJiYoQ24uY29weUFjdGlvbih0aGlzLnByZXBhcmVkLHQpLHRoaXMuaW50ZXJhY3RhYmxlPWUsdGhpcy5lbGVtZW50PW4sdGhpcy5yZWN0PWUuZ2V0UmVjdChuKSx0aGlzLmVkZ2VzPXRoaXMucHJlcGFyZWQuZWRnZXM/Q24uZXh0ZW5kKHt9LHRoaXMucHJlcGFyZWQuZWRnZXMpOntsZWZ0OiEwLHJpZ2h0OiEwLHRvcDohMCxib3R0b206ITB9LHRoaXMuX3N0b3BwZWQ9ITEsdGhpcy5faW50ZXJhY3Rpbmc9dGhpcy5fZG9QaGFzZSh7aW50ZXJhY3Rpb246dGhpcyxldmVudDp0aGlzLmRvd25FdmVudCxwaGFzZTpcInN0YXJ0XCJ9KSYmIXRoaXMuX3N0b3BwZWQsdGhpcy5faW50ZXJhY3RpbmcpfX0se2tleTpcInBvaW50ZXJNb3ZlXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4pe3RoaXMuc2ltdWxhdGlvbnx8dGhpcy5tb2RpZmljYXRpb24mJnRoaXMubW9kaWZpY2F0aW9uLmVuZFJlc3VsdHx8dGhpcy51cGRhdGVQb2ludGVyKHQsZSxuLCExKTt2YXIgcixvLGk9dGhpcy5jb29yZHMuY3VyLnBhZ2UueD09PXRoaXMuY29vcmRzLnByZXYucGFnZS54JiZ0aGlzLmNvb3Jkcy5jdXIucGFnZS55PT09dGhpcy5jb29yZHMucHJldi5wYWdlLnkmJnRoaXMuY29vcmRzLmN1ci5jbGllbnQueD09PXRoaXMuY29vcmRzLnByZXYuY2xpZW50LngmJnRoaXMuY29vcmRzLmN1ci5jbGllbnQueT09PXRoaXMuY29vcmRzLnByZXYuY2xpZW50Lnk7dGhpcy5wb2ludGVySXNEb3duJiYhdGhpcy5wb2ludGVyV2FzTW92ZWQmJihyPXRoaXMuY29vcmRzLmN1ci5jbGllbnQueC10aGlzLmNvb3Jkcy5zdGFydC5jbGllbnQueCxvPXRoaXMuY29vcmRzLmN1ci5jbGllbnQueS10aGlzLmNvb3Jkcy5zdGFydC5jbGllbnQueSx0aGlzLnBvaW50ZXJXYXNNb3ZlZD1Dbi5oeXBvdChyLG8pPnRoaXMucG9pbnRlck1vdmVUb2xlcmFuY2UpO3ZhciBhPXRoaXMuZ2V0UG9pbnRlckluZGV4KHQpLHU9e3BvaW50ZXI6dCxwb2ludGVySW5kZXg6YSxwb2ludGVySW5mbzp0aGlzLnBvaW50ZXJzW2FdLGV2ZW50OmUsdHlwZTpcIm1vdmVcIixldmVudFRhcmdldDpuLGR4OnIsZHk6byxkdXBsaWNhdGU6aSxpbnRlcmFjdGlvbjp0aGlzfTtpfHxDbi5wb2ludGVyLnNldENvb3JkVmVsb2NpdHkodGhpcy5jb29yZHMudmVsb2NpdHksdGhpcy5jb29yZHMuZGVsdGEpLHRoaXMuX3Njb3BlRmlyZShcImludGVyYWN0aW9uczptb3ZlXCIsdSksaXx8dGhpcy5zaW11bGF0aW9ufHwodGhpcy5pbnRlcmFjdGluZygpJiYodS50eXBlPW51bGwsdGhpcy5tb3ZlKHUpKSx0aGlzLnBvaW50ZXJXYXNNb3ZlZCYmQ24ucG9pbnRlci5jb3B5Q29vcmRzKHRoaXMuY29vcmRzLnByZXYsdGhpcy5jb29yZHMuY3VyKSl9fSx7a2V5OlwibW92ZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3QmJnQuZXZlbnR8fENuLnBvaW50ZXIuc2V0WmVyb0Nvb3Jkcyh0aGlzLmNvb3Jkcy5kZWx0YSksKHQ9Q24uZXh0ZW5kKHtwb2ludGVyOnRoaXMuX2xhdGVzdFBvaW50ZXIucG9pbnRlcixldmVudDp0aGlzLl9sYXRlc3RQb2ludGVyLmV2ZW50LGV2ZW50VGFyZ2V0OnRoaXMuX2xhdGVzdFBvaW50ZXIuZXZlbnRUYXJnZXQsaW50ZXJhY3Rpb246dGhpc30sdHx8e30pKS5waGFzZT1cIm1vdmVcIix0aGlzLl9kb1BoYXNlKHQpfX0se2tleTpcInBvaW50ZXJVcFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLHIpe3ZhciBvPXRoaXMuZ2V0UG9pbnRlckluZGV4KHQpOy0xPT09byYmKG89dGhpcy51cGRhdGVQb2ludGVyKHQsZSxuLCExKSk7dmFyIGk9L2NhbmNlbCQvaS50ZXN0KGUudHlwZSk/XCJjYW5jZWxcIjpcInVwXCI7dGhpcy5fc2NvcGVGaXJlKFwiaW50ZXJhY3Rpb25zOlwiLmNvbmNhdChpKSx7cG9pbnRlcjp0LHBvaW50ZXJJbmRleDpvLHBvaW50ZXJJbmZvOnRoaXMucG9pbnRlcnNbb10sZXZlbnQ6ZSxldmVudFRhcmdldDpuLHR5cGU6aSxjdXJFdmVudFRhcmdldDpyLGludGVyYWN0aW9uOnRoaXN9KSx0aGlzLnNpbXVsYXRpb258fHRoaXMuZW5kKGUpLHRoaXMucG9pbnRlcklzRG93bj0hMSx0aGlzLnJlbW92ZVBvaW50ZXIodCxlKX19LHtrZXk6XCJkb2N1bWVudEJsdXJcIix2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLmVuZCh0KSx0aGlzLl9zY29wZUZpcmUoXCJpbnRlcmFjdGlvbnM6Ymx1clwiLHtldmVudDp0LHR5cGU6XCJibHVyXCIsaW50ZXJhY3Rpb246dGhpc30pfX0se2tleTpcImVuZFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlO3RoaXMuX2VuZGluZz0hMCx0PXR8fHRoaXMuX2xhdGVzdFBvaW50ZXIuZXZlbnQsdGhpcy5pbnRlcmFjdGluZygpJiYoZT10aGlzLl9kb1BoYXNlKHtldmVudDp0LGludGVyYWN0aW9uOnRoaXMscGhhc2U6XCJlbmRcIn0pKSwhKHRoaXMuX2VuZGluZz0hMSk9PT1lJiZ0aGlzLnN0b3AoKX19LHtrZXk6XCJjdXJyZW50QWN0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faW50ZXJhY3Rpbmc/dGhpcy5wcmVwYXJlZC5uYW1lOm51bGx9fSx7a2V5OlwiaW50ZXJhY3RpbmdcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9pbnRlcmFjdGluZ319LHtrZXk6XCJzdG9wXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLl9zY29wZUZpcmUoXCJpbnRlcmFjdGlvbnM6c3RvcFwiLHtpbnRlcmFjdGlvbjp0aGlzfSksdGhpcy5pbnRlcmFjdGFibGU9dGhpcy5lbGVtZW50PW51bGwsdGhpcy5faW50ZXJhY3Rpbmc9ITEsdGhpcy5fc3RvcHBlZD0hMCx0aGlzLnByZXBhcmVkLm5hbWU9dGhpcy5wcmV2RXZlbnQ9bnVsbH19LHtrZXk6XCJnZXRQb2ludGVySW5kZXhcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT1Dbi5wb2ludGVyLmdldFBvaW50ZXJJZCh0KTtyZXR1cm5cIm1vdXNlXCI9PT10aGlzLnBvaW50ZXJUeXBlfHxcInBlblwiPT09dGhpcy5wb2ludGVyVHlwZT90aGlzLnBvaW50ZXJzLmxlbmd0aC0xOkNuLmFyci5maW5kSW5kZXgodGhpcy5wb2ludGVycyxmdW5jdGlvbih0KXtyZXR1cm4gdC5pZD09PWV9KX19LHtrZXk6XCJnZXRQb2ludGVySW5mb1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnBvaW50ZXJzW3RoaXMuZ2V0UG9pbnRlckluZGV4KHQpXX19LHtrZXk6XCJ1cGRhdGVQb2ludGVyXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4scil7dmFyIG89Q24ucG9pbnRlci5nZXRQb2ludGVySWQodCksaT10aGlzLmdldFBvaW50ZXJJbmRleCh0KSxhPXRoaXMucG9pbnRlcnNbaV07cmV0dXJuIHI9ITEhPT1yJiYocnx8Lyhkb3dufHN0YXJ0KSQvaS50ZXN0KGUudHlwZSkpLGE/YS5wb2ludGVyPXQ6KGE9bmV3IFJuLmRlZmF1bHQobyx0LGUsbnVsbCxudWxsKSxpPXRoaXMucG9pbnRlcnMubGVuZ3RoLHRoaXMucG9pbnRlcnMucHVzaChhKSksQ24ucG9pbnRlci5zZXRDb29yZHModGhpcy5jb29yZHMuY3VyLHRoaXMucG9pbnRlcnMubWFwKGZ1bmN0aW9uKHQpe3JldHVybiB0LnBvaW50ZXJ9KSx0aGlzLl9ub3coKSksQ24ucG9pbnRlci5zZXRDb29yZERlbHRhcyh0aGlzLmNvb3Jkcy5kZWx0YSx0aGlzLmNvb3Jkcy5wcmV2LHRoaXMuY29vcmRzLmN1ciksciYmKHRoaXMucG9pbnRlcklzRG93bj0hMCxhLmRvd25UaW1lPXRoaXMuY29vcmRzLmN1ci50aW1lU3RhbXAsYS5kb3duVGFyZ2V0PW4sQ24ucG9pbnRlci5wb2ludGVyRXh0ZW5kKHRoaXMuZG93blBvaW50ZXIsdCksdGhpcy5pbnRlcmFjdGluZygpfHwoQ24ucG9pbnRlci5jb3B5Q29vcmRzKHRoaXMuY29vcmRzLnN0YXJ0LHRoaXMuY29vcmRzLmN1ciksQ24ucG9pbnRlci5jb3B5Q29vcmRzKHRoaXMuY29vcmRzLnByZXYsdGhpcy5jb29yZHMuY3VyKSx0aGlzLmRvd25FdmVudD1lLHRoaXMucG9pbnRlcldhc01vdmVkPSExKSksdGhpcy5fdXBkYXRlTGF0ZXN0UG9pbnRlcih0LGUsbiksdGhpcy5fc2NvcGVGaXJlKFwiaW50ZXJhY3Rpb25zOnVwZGF0ZS1wb2ludGVyXCIse3BvaW50ZXI6dCxldmVudDplLGV2ZW50VGFyZ2V0Om4sZG93bjpyLHBvaW50ZXJJbmZvOmEscG9pbnRlckluZGV4OmksaW50ZXJhY3Rpb246dGhpc30pLGl9fSx7a2V5OlwicmVtb3ZlUG9pbnRlclwiLHZhbHVlOmZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcy5nZXRQb2ludGVySW5kZXgodCk7aWYoLTEhPT1uKXt2YXIgcj10aGlzLnBvaW50ZXJzW25dO3RoaXMuX3Njb3BlRmlyZShcImludGVyYWN0aW9uczpyZW1vdmUtcG9pbnRlclwiLHtwb2ludGVyOnQsZXZlbnQ6ZSxldmVudFRhcmdldDpudWxsLHBvaW50ZXJJbmRleDpuLHBvaW50ZXJJbmZvOnIsaW50ZXJhY3Rpb246dGhpc30pLHRoaXMucG9pbnRlcnMuc3BsaWNlKG4sMSl9fX0se2tleTpcIl91cGRhdGVMYXRlc3RQb2ludGVyXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4pe3RoaXMuX2xhdGVzdFBvaW50ZXIucG9pbnRlcj10LHRoaXMuX2xhdGVzdFBvaW50ZXIuZXZlbnQ9ZSx0aGlzLl9sYXRlc3RQb2ludGVyLmV2ZW50VGFyZ2V0PW59fSx7a2V5OlwiZGVzdHJveVwiLHZhbHVlOmZ1bmN0aW9uKCl7dGhpcy5fbGF0ZXN0UG9pbnRlci5wb2ludGVyPW51bGwsdGhpcy5fbGF0ZXN0UG9pbnRlci5ldmVudD1udWxsLHRoaXMuX2xhdGVzdFBvaW50ZXIuZXZlbnRUYXJnZXQ9bnVsbH19LHtrZXk6XCJfY3JlYXRlUHJlcGFyZWRFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKHQsZSxuLHIpe3JldHVybiBuZXcgV24uZGVmYXVsdCh0aGlzLHQsdGhpcy5wcmVwYXJlZC5uYW1lLGUsdGhpcy5lbGVtZW50LG4scil9fSx7a2V5OlwiX2ZpcmVFdmVudFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMuaW50ZXJhY3RhYmxlLmZpcmUodCksKCF0aGlzLnByZXZFdmVudHx8dC50aW1lU3RhbXA+PXRoaXMucHJldkV2ZW50LnRpbWVTdGFtcCkmJih0aGlzLnByZXZFdmVudD10KX19LHtrZXk6XCJfZG9QaGFzZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXQuZXZlbnQsbj10LnBoYXNlLHI9dC5wcmVFbmQsbz10LnR5cGUsaT10aGlzLnJlY3Q7aWYoaSYmXCJtb3ZlXCI9PT1uJiYoQ24ucmVjdC5hZGRFZGdlcyh0aGlzLmVkZ2VzLGksdGhpcy5jb29yZHMuZGVsdGFbdGhpcy5pbnRlcmFjdGFibGUub3B0aW9ucy5kZWx0YVNvdXJjZV0pLGkud2lkdGg9aS5yaWdodC1pLmxlZnQsaS5oZWlnaHQ9aS5ib3R0b20taS50b3ApLCExPT09dGhpcy5fc2NvcGVGaXJlKFwiaW50ZXJhY3Rpb25zOmJlZm9yZS1hY3Rpb24tXCIuY29uY2F0KG4pLHQpKXJldHVybiExO3ZhciBhPXQuaUV2ZW50PXRoaXMuX2NyZWF0ZVByZXBhcmVkRXZlbnQoZSxuLHIsbyk7cmV0dXJuIHRoaXMuX3Njb3BlRmlyZShcImludGVyYWN0aW9uczphY3Rpb24tXCIuY29uY2F0KG4pLHQpLFwic3RhcnRcIj09PW4mJih0aGlzLnByZXZFdmVudD1hKSx0aGlzLl9maXJlRXZlbnQoYSksdGhpcy5fc2NvcGVGaXJlKFwiaW50ZXJhY3Rpb25zOmFmdGVyLWFjdGlvbi1cIi5jb25jYXQobiksdCksITB9fSx7a2V5OlwiX25vd1wiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIERhdGUubm93KCl9fV0pLGx9KCkscW49RW4uSW50ZXJhY3Rpb249Vm47RW4uZGVmYXVsdD1xbjt2YXIgVW49e307ZnVuY3Rpb24gR24odCl7cmV0dXJuKEduPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoVW4sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksVW4uaW5zdGFsbD1KbixVbi5kZWZhdWx0PXZvaWQgMDt2YXIgSG49ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09R24odCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9S24oKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0odyk7ZnVuY3Rpb24gS24oKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBLbj1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uICRuKHQpe3JldHVybi9eKGFsd2F5c3xuZXZlcnxhdXRvKSQvLnRlc3QodCk/KHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdD10LHRoaXMpOkhuLmJvb2wodCk/KHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdD10P1wiYWx3YXlzXCI6XCJuZXZlclwiLHRoaXMpOnRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdH1mdW5jdGlvbiBabih0KXt2YXIgZT10LmludGVyYWN0aW9uLG49dC5ldmVudDtlLmludGVyYWN0YWJsZSYmZS5pbnRlcmFjdGFibGUuY2hlY2tBbmRQcmV2ZW50RGVmYXVsdChuKX1mdW5jdGlvbiBKbihyKXt2YXIgdD1yLkludGVyYWN0YWJsZTt0LnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdD0kbix0LnByb3RvdHlwZS5jaGVja0FuZFByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbih0LGUsbil7dmFyIHI9dC5vcHRpb25zLnByZXZlbnREZWZhdWx0O2lmKFwibmV2ZXJcIiE9PXIpaWYoXCJhbHdheXNcIiE9PXIpe2lmKGUuZXZlbnRzLnN1cHBvcnRzUGFzc2l2ZSYmL150b3VjaChzdGFydHxtb3ZlKSQvLnRlc3Qobi50eXBlKSl7dmFyIG89KDAsTy5nZXRXaW5kb3cpKG4udGFyZ2V0KS5kb2N1bWVudCxpPWUuZ2V0RG9jT3B0aW9ucyhvKTtpZighaXx8IWkuZXZlbnRzfHwhMSE9PWkuZXZlbnRzLnBhc3NpdmUpcmV0dXJufS9eKG1vdXNlfHBvaW50ZXJ8dG91Y2gpKihkb3dufHN0YXJ0KS9pLnRlc3Qobi50eXBlKXx8SG4uZWxlbWVudChuLnRhcmdldCkmJigwLCQubWF0Y2hlc1NlbGVjdG9yKShuLnRhcmdldCxcImlucHV0LHNlbGVjdCx0ZXh0YXJlYSxbY29udGVudGVkaXRhYmxlPXRydWVdLFtjb250ZW50ZWRpdGFibGU9dHJ1ZV0gKlwiKXx8bi5wcmV2ZW50RGVmYXVsdCgpfWVsc2Ugbi5wcmV2ZW50RGVmYXVsdCgpfSh0aGlzLHIsdCl9LHIuaW50ZXJhY3Rpb25zLmRvY0V2ZW50cy5wdXNoKHt0eXBlOlwiZHJhZ3N0YXJ0XCIsbGlzdGVuZXI6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTA7ZTxyLmludGVyYWN0aW9ucy5saXN0Lmxlbmd0aDtlKyspe3ZhciBuPXIuaW50ZXJhY3Rpb25zLmxpc3RbZV07aWYobi5lbGVtZW50JiYobi5lbGVtZW50PT09dC50YXJnZXR8fCgwLCQubm9kZUNvbnRhaW5zKShuLmVsZW1lbnQsdC50YXJnZXQpKSlyZXR1cm4gdm9pZCBuLmludGVyYWN0YWJsZS5jaGVja0FuZFByZXZlbnREZWZhdWx0KHQpfX19KX12YXIgUW49e2lkOlwiY29yZS9pbnRlcmFjdGFibGVQcmV2ZW50RGVmYXVsdFwiLGluc3RhbGw6Sm4sbGlzdGVuZXJzOltcImRvd25cIixcIm1vdmVcIixcInVwXCIsXCJjYW5jZWxcIl0ucmVkdWNlKGZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRbXCJpbnRlcmFjdGlvbnM6XCIuY29uY2F0KGUpXT1abix0fSx7fSl9O1VuLmRlZmF1bHQ9UW47dmFyIHRyPXt9O2Z1bmN0aW9uIGVyKHQpe3JldHVybihlcj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KHRyLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHRyLmRlZmF1bHQ9dm9pZCAwO3ZhciBucj1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1lcih0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1ycigpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSgkKTtmdW5jdGlvbiBycigpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIHJyPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9dmFyIG9yPXttZXRob2RPcmRlcjpbXCJzaW11bGF0aW9uUmVzdW1lXCIsXCJtb3VzZU9yUGVuXCIsXCJoYXNQb2ludGVyXCIsXCJpZGxlXCJdLHNlYXJjaDpmdW5jdGlvbih0KXtmb3IodmFyIGU9MDtlPG9yLm1ldGhvZE9yZGVyLmxlbmd0aDtlKyspe3ZhciBuO249b3IubWV0aG9kT3JkZXJbZV07dmFyIHI9b3Jbbl0odCk7aWYocilyZXR1cm4gcn1yZXR1cm4gbnVsbH0sc2ltdWxhdGlvblJlc3VtZTpmdW5jdGlvbih0KXt2YXIgZT10LnBvaW50ZXJUeXBlLG49dC5ldmVudFR5cGUscj10LmV2ZW50VGFyZ2V0LG89dC5zY29wZTtpZighL2Rvd258c3RhcnQvaS50ZXN0KG4pKXJldHVybiBudWxsO2Zvcih2YXIgaT0wO2k8by5pbnRlcmFjdGlvbnMubGlzdC5sZW5ndGg7aSsrKXt2YXIgYT1vLmludGVyYWN0aW9ucy5saXN0W2ldLHU9cjtpZihhLnNpbXVsYXRpb24mJmEuc2ltdWxhdGlvbi5hbGxvd1Jlc3VtZSYmYS5wb2ludGVyVHlwZT09PWUpZm9yKDt1Oyl7aWYodT09PWEuZWxlbWVudClyZXR1cm4gYTt1PW5yLnBhcmVudE5vZGUodSl9fXJldHVybiBudWxsfSxtb3VzZU9yUGVuOmZ1bmN0aW9uKHQpe3ZhciBlLG49dC5wb2ludGVySWQscj10LnBvaW50ZXJUeXBlLG89dC5ldmVudFR5cGUsaT10LnNjb3BlO2lmKFwibW91c2VcIiE9PXImJlwicGVuXCIhPT1yKXJldHVybiBudWxsO2Zvcih2YXIgYT0wO2E8aS5pbnRlcmFjdGlvbnMubGlzdC5sZW5ndGg7YSsrKXt2YXIgdT1pLmludGVyYWN0aW9ucy5saXN0W2FdO2lmKHUucG9pbnRlclR5cGU9PT1yKXtpZih1LnNpbXVsYXRpb24mJiFpcih1LG4pKWNvbnRpbnVlO2lmKHUuaW50ZXJhY3RpbmcoKSlyZXR1cm4gdTtlPWV8fHV9fWlmKGUpcmV0dXJuIGU7Zm9yKHZhciBzPTA7czxpLmludGVyYWN0aW9ucy5saXN0Lmxlbmd0aDtzKyspe3ZhciBsPWkuaW50ZXJhY3Rpb25zLmxpc3Rbc107aWYoIShsLnBvaW50ZXJUeXBlIT09cnx8L2Rvd24vaS50ZXN0KG8pJiZsLnNpbXVsYXRpb24pKXJldHVybiBsfXJldHVybiBudWxsfSxoYXNQb2ludGVyOmZ1bmN0aW9uKHQpe2Zvcih2YXIgZT10LnBvaW50ZXJJZCxuPXQuc2NvcGUscj0wO3I8bi5pbnRlcmFjdGlvbnMubGlzdC5sZW5ndGg7cisrKXt2YXIgbz1uLmludGVyYWN0aW9ucy5saXN0W3JdO2lmKGlyKG8sZSkpcmV0dXJuIG99cmV0dXJuIG51bGx9LGlkbGU6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXQucG9pbnRlclR5cGUsbj10LnNjb3BlLHI9MDtyPG4uaW50ZXJhY3Rpb25zLmxpc3QubGVuZ3RoO3IrKyl7dmFyIG89bi5pbnRlcmFjdGlvbnMubGlzdFtyXTtpZigxPT09by5wb2ludGVycy5sZW5ndGgpe3ZhciBpPW8uaW50ZXJhY3RhYmxlO2lmKGkmJighaS5vcHRpb25zLmdlc3R1cmV8fCFpLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkKSljb250aW51ZX1lbHNlIGlmKDI8PW8ucG9pbnRlcnMubGVuZ3RoKWNvbnRpbnVlO2lmKCFvLmludGVyYWN0aW5nKCkmJmU9PT1vLnBvaW50ZXJUeXBlKXJldHVybiBvfXJldHVybiBudWxsfX07ZnVuY3Rpb24gaXIodCxlKXtyZXR1cm4gdC5wb2ludGVycy5zb21lKGZ1bmN0aW9uKHQpe3JldHVybiB0LmlkPT09ZX0pfXZhciBhcj1vcjt0ci5kZWZhdWx0PWFyO3ZhciB1cj17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkodXIsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdXIuZGVmYXVsdD12b2lkIDA7dmFyIHNyLGxyPShzcj1NZSkmJnNyLl9fZXNNb2R1bGU/c3I6e2RlZmF1bHQ6c3J9LGNyPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PXByKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPWZyKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KFMpO2Z1bmN0aW9uIGZyKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gZnI9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBwcih0KXtyZXR1cm4ocHI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWZ1bmN0aW9uIGRyKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiB2cih0KXtyZXR1cm4odnI9T2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5nZXRQcm90b3R5cGVPZjpmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KX0pKHQpfWZ1bmN0aW9uIHlyKHQpe2lmKHZvaWQgMD09PXQpdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO3JldHVybiB0fWZ1bmN0aW9uIGhyKHQsZSl7cmV0dXJuKGhyPU9iamVjdC5zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5fX3Byb3RvX189ZSx0fSkodCxlKX1mdW5jdGlvbiBncih0LGUsbil7cmV0dXJuIGUgaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9dmFyIGJyPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbCh0LGUsbil7dmFyIHIsbyxpOyFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsbCksbz10aGlzLHI9IShpPXZyKGwpLmNhbGwodGhpcyxlLl9pbnRlcmFjdGlvbikpfHxcIm9iamVjdFwiIT09cHIoaSkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGk/eXIobyk6aSxncih5cihyKSxcInRhcmdldFwiLHZvaWQgMCksZ3IoeXIociksXCJkcm9wem9uZVwiLHZvaWQgMCksZ3IoeXIociksXCJkcmFnRXZlbnRcIix2b2lkIDApLGdyKHlyKHIpLFwicmVsYXRlZFRhcmdldFwiLHZvaWQgMCksZ3IoeXIociksXCJkcmFnZ2FibGVcIix2b2lkIDApLGdyKHlyKHIpLFwidGltZVN0YW1wXCIsdm9pZCAwKSxncih5cihyKSxcInByb3BhZ2F0aW9uU3RvcHBlZFwiLCExKSxncih5cihyKSxcImltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZFwiLCExKTt2YXIgYT1cImRyYWdsZWF2ZVwiPT09bj90LnByZXY6dC5jdXIsdT1hLmVsZW1lbnQscz1hLmRyb3B6b25lO3JldHVybiByLnR5cGU9bixyLnRhcmdldD11LHIuY3VycmVudFRhcmdldD11LHIuZHJvcHpvbmU9cyxyLmRyYWdFdmVudD1lLHIucmVsYXRlZFRhcmdldD1lLnRhcmdldCxyLmRyYWdnYWJsZT1lLmludGVyYWN0YWJsZSxyLnRpbWVTdGFtcD1lLnRpbWVTdGFtcCxyfXZhciB0LGUsbjtyZXR1cm4gZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlJiZudWxsIT09ZSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7dC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShlJiZlLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnQsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOiEwfX0pLGUmJmhyKHQsZSl9KGwsbHJbXCJkZWZhdWx0XCJdKSx0PWwsKGU9W3trZXk6XCJyZWplY3RcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciByPXRoaXMsdD10aGlzLl9pbnRlcmFjdGlvbi5kcm9wU3RhdGU7aWYoXCJkcm9wYWN0aXZhdGVcIj09PXRoaXMudHlwZXx8dGhpcy5kcm9wem9uZSYmdC5jdXIuZHJvcHpvbmU9PT10aGlzLmRyb3B6b25lJiZ0LmN1ci5lbGVtZW50PT09dGhpcy50YXJnZXQpaWYodC5wcmV2LmRyb3B6b25lPXRoaXMuZHJvcHpvbmUsdC5wcmV2LmVsZW1lbnQ9dGhpcy50YXJnZXQsdC5yZWplY3RlZD0hMCx0LmV2ZW50cy5lbnRlcj1udWxsLHRoaXMuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCksXCJkcm9wYWN0aXZhdGVcIj09PXRoaXMudHlwZSl7dmFyIGU9dC5hY3RpdmVEcm9wcyxuPWNyLmZpbmRJbmRleChlLGZ1bmN0aW9uKHQpe3ZhciBlPXQuZHJvcHpvbmUsbj10LmVsZW1lbnQ7cmV0dXJuIGU9PT1yLmRyb3B6b25lJiZuPT09ci50YXJnZXR9KTt0LmFjdGl2ZURyb3BzLnNwbGljZShuLDEpO3ZhciBvPW5ldyBsKHQsdGhpcy5kcmFnRXZlbnQsXCJkcm9wZGVhY3RpdmF0ZVwiKTtvLmRyb3B6b25lPXRoaXMuZHJvcHpvbmUsby50YXJnZXQ9dGhpcy50YXJnZXQsdGhpcy5kcm9wem9uZS5maXJlKG8pfWVsc2UgdGhpcy5kcm9wem9uZS5maXJlKG5ldyBsKHQsdGhpcy5kcmFnRXZlbnQsXCJkcmFnbGVhdmVcIikpfX0se2tleTpcInByZXZlbnREZWZhdWx0XCIsdmFsdWU6ZnVuY3Rpb24oKXt9fSx7a2V5Olwic3RvcFByb3BhZ2F0aW9uXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLnByb3BhZ2F0aW9uU3RvcHBlZD0hMH19LHtrZXk6XCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb25cIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuaW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkPXRoaXMucHJvcGFnYXRpb25TdG9wcGVkPSEwfX1dKSYmZHIodC5wcm90b3R5cGUsZSksbiYmZHIodCxuKSxsfSgpO3VyLmRlZmF1bHQ9YnI7dmFyIG1yPXt9O2Z1bmN0aW9uIE9yKHQpe3JldHVybihPcj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KG1yLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLG1yLmRlZmF1bHQ9dm9pZCAwO1NyKGsoe30pKSxTcihtKHt9KSk7dmFyIHdyPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PU9yKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPXhyKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KGxlKSxfcj1Tcih2KSxQcj1Tcih1cik7ZnVuY3Rpb24geHIoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiB4cj1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIFNyKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBqcih0LGUpe2Zvcih2YXIgbj0wO248dC5zbGljZSgpLmxlbmd0aDtuKyspe3I9dC5zbGljZSgpW25dO3ZhciByLG89ci5kcm9wem9uZSxpPXIuZWxlbWVudDtlLmRyb3B6b25lPW8sZS50YXJnZXQ9aSxvLmZpcmUoZSksZS5wcm9wYWdhdGlvblN0b3BwZWQ9ZS5pbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQ9ITF9fWZ1bmN0aW9uIE1yKHQsZSl7Zm9yKHZhciBuPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPXQuaW50ZXJhY3RhYmxlcyxyPVtdLG89MDtvPG4ubGlzdC5sZW5ndGg7bysrKXt2YXIgaT1uLmxpc3Rbb107aWYoaS5vcHRpb25zLmRyb3AuZW5hYmxlZCl7dmFyIGE9aS5vcHRpb25zLmRyb3AuYWNjZXB0O2lmKCEod3IuaXMuZWxlbWVudChhKSYmYSE9PWV8fHdyLmlzLnN0cmluZyhhKSYmIXdyLmRvbS5tYXRjaGVzU2VsZWN0b3IoZSxhKXx8d3IuaXMuZnVuYyhhKSYmIWEoe2Ryb3B6b25lOmksZHJhZ2dhYmxlRWxlbWVudDplfSkpKWZvcih2YXIgdT13ci5pcy5zdHJpbmcoaS50YXJnZXQpP2kuX2NvbnRleHQucXVlcnlTZWxlY3RvckFsbChpLnRhcmdldCk6d3IuaXMuYXJyYXkoaS50YXJnZXQpP2kudGFyZ2V0OltpLnRhcmdldF0scz0wO3M8dS5sZW5ndGg7cysrKXt2YXIgbDtsPXVbc107bCE9PWUmJnIucHVzaCh7ZHJvcHpvbmU6aSxlbGVtZW50Omx9KX19fXJldHVybiByfSh0LGUpLHI9MDtyPG4ubGVuZ3RoO3IrKyl7dmFyIG87bz1uW3JdO28ucmVjdD1vLmRyb3B6b25lLmdldFJlY3Qoby5lbGVtZW50KX1yZXR1cm4gbn1mdW5jdGlvbiBrcih0LGUsbil7Zm9yKHZhciByPXQuZHJvcFN0YXRlLG89dC5pbnRlcmFjdGFibGUsaT10LmVsZW1lbnQsYT1bXSx1PTA7dTxyLmFjdGl2ZURyb3BzLmxlbmd0aDt1Kyspe3M9ci5hY3RpdmVEcm9wc1t1XTt2YXIgcyxsPXMuZHJvcHpvbmUsYz1zLmVsZW1lbnQsZj1zLnJlY3Q7YS5wdXNoKGwuZHJvcENoZWNrKGUsbixvLGksYyxmKT9jOm51bGwpfXZhciBwPXdyLmRvbS5pbmRleE9mRGVlcGVzdEVsZW1lbnQoYSk7cmV0dXJuIHIuYWN0aXZlRHJvcHNbcF18fG51bGx9ZnVuY3Rpb24gRXIodCxlLG4pe3ZhciByPXQuZHJvcFN0YXRlLG89e2VudGVyOm51bGwsbGVhdmU6bnVsbCxhY3RpdmF0ZTpudWxsLGRlYWN0aXZhdGU6bnVsbCxtb3ZlOm51bGwsZHJvcDpudWxsfTtyZXR1cm5cImRyYWdzdGFydFwiPT09bi50eXBlJiYoby5hY3RpdmF0ZT1uZXcgUHIuZGVmYXVsdChyLG4sXCJkcm9wYWN0aXZhdGVcIiksby5hY3RpdmF0ZS50YXJnZXQ9bnVsbCxvLmFjdGl2YXRlLmRyb3B6b25lPW51bGwpLFwiZHJhZ2VuZFwiPT09bi50eXBlJiYoby5kZWFjdGl2YXRlPW5ldyBQci5kZWZhdWx0KHIsbixcImRyb3BkZWFjdGl2YXRlXCIpLG8uZGVhY3RpdmF0ZS50YXJnZXQ9bnVsbCxvLmRlYWN0aXZhdGUuZHJvcHpvbmU9bnVsbCksci5yZWplY3RlZHx8KHIuY3VyLmVsZW1lbnQhPT1yLnByZXYuZWxlbWVudCYmKHIucHJldi5kcm9wem9uZSYmKG8ubGVhdmU9bmV3IFByLmRlZmF1bHQocixuLFwiZHJhZ2xlYXZlXCIpLG4uZHJhZ0xlYXZlPW8ubGVhdmUudGFyZ2V0PXIucHJldi5lbGVtZW50LG4ucHJldkRyb3B6b25lPW8ubGVhdmUuZHJvcHpvbmU9ci5wcmV2LmRyb3B6b25lKSxyLmN1ci5kcm9wem9uZSYmKG8uZW50ZXI9bmV3IFByLmRlZmF1bHQocixuLFwiZHJhZ2VudGVyXCIpLG4uZHJhZ0VudGVyPXIuY3VyLmVsZW1lbnQsbi5kcm9wem9uZT1yLmN1ci5kcm9wem9uZSkpLFwiZHJhZ2VuZFwiPT09bi50eXBlJiZyLmN1ci5kcm9wem9uZSYmKG8uZHJvcD1uZXcgUHIuZGVmYXVsdChyLG4sXCJkcm9wXCIpLG4uZHJvcHpvbmU9ci5jdXIuZHJvcHpvbmUsbi5yZWxhdGVkVGFyZ2V0PXIuY3VyLmVsZW1lbnQpLFwiZHJhZ21vdmVcIj09PW4udHlwZSYmci5jdXIuZHJvcHpvbmUmJihvLm1vdmU9bmV3IFByLmRlZmF1bHQocixuLFwiZHJvcG1vdmVcIiksKG8ubW92ZS5kcmFnbW92ZT1uKS5kcm9wem9uZT1yLmN1ci5kcm9wem9uZSkpLG99ZnVuY3Rpb24gVHIodCxlKXt2YXIgbj10LmRyb3BTdGF0ZSxyPW4uYWN0aXZlRHJvcHMsbz1uLmN1cixpPW4ucHJldjtlLmxlYXZlJiZpLmRyb3B6b25lLmZpcmUoZS5sZWF2ZSksZS5tb3ZlJiZvLmRyb3B6b25lLmZpcmUoZS5tb3ZlKSxlLmVudGVyJiZvLmRyb3B6b25lLmZpcmUoZS5lbnRlciksZS5kcm9wJiZvLmRyb3B6b25lLmZpcmUoZS5kcm9wKSxlLmRlYWN0aXZhdGUmJmpyKHIsZS5kZWFjdGl2YXRlKSxuLnByZXYuZHJvcHpvbmU9by5kcm9wem9uZSxuLnByZXYuZWxlbWVudD1vLmVsZW1lbnR9ZnVuY3Rpb24gRHIodCxlKXt2YXIgbj10LmludGVyYWN0aW9uLHI9dC5pRXZlbnQsbz10LmV2ZW50O2lmKFwiZHJhZ21vdmVcIj09PXIudHlwZXx8XCJkcmFnZW5kXCI9PT1yLnR5cGUpe3ZhciBpPW4uZHJvcFN0YXRlO2UuZHluYW1pY0Ryb3AmJihpLmFjdGl2ZURyb3BzPU1yKGUsbi5lbGVtZW50KSk7dmFyIGE9cix1PWtyKG4sYSxvKTtpLnJlamVjdGVkPWkucmVqZWN0ZWQmJiEhdSYmdS5kcm9wem9uZT09PWkuY3VyLmRyb3B6b25lJiZ1LmVsZW1lbnQ9PT1pLmN1ci5lbGVtZW50LGkuY3VyLmRyb3B6b25lPXUmJnUuZHJvcHpvbmUsaS5jdXIuZWxlbWVudD11JiZ1LmVsZW1lbnQsaS5ldmVudHM9RXIobiwwLGEpfX12YXIgSXI9e2lkOlwiYWN0aW9ucy9kcm9wXCIsaW5zdGFsbDpmdW5jdGlvbihlKXt2YXIgdD1lLmFjdGlvbnMsbj1lLmludGVyYWN0U3RhdGljLHI9ZS5JbnRlcmFjdGFibGUsbz1lLmRlZmF1bHRzO2UudXNlUGx1Z2luKF9yLmRlZmF1bHQpLHIucHJvdG90eXBlLmRyb3B6b25lPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbih0LGUpe2lmKHdyLmlzLm9iamVjdChlKSl7aWYodC5vcHRpb25zLmRyb3AuZW5hYmxlZD0hMSE9PWUuZW5hYmxlZCxlLmxpc3RlbmVycyl7dmFyIG49d3Iubm9ybWFsaXplTGlzdGVuZXJzKGUubGlzdGVuZXJzKSxyPU9iamVjdC5rZXlzKG4pLnJlZHVjZShmdW5jdGlvbih0LGUpe3JldHVybiB0Wy9eKGVudGVyfGxlYXZlKS8udGVzdChlKT9cImRyYWdcIi5jb25jYXQoZSk6L14oYWN0aXZhdGV8ZGVhY3RpdmF0ZXxtb3ZlKS8udGVzdChlKT9cImRyb3BcIi5jb25jYXQoZSk6ZV09bltlXSx0fSx7fSk7dC5vZmYodC5vcHRpb25zLmRyb3AubGlzdGVuZXJzKSx0Lm9uKHIpLHQub3B0aW9ucy5kcm9wLmxpc3RlbmVycz1yfXJldHVybiB3ci5pcy5mdW5jKGUub25kcm9wKSYmdC5vbihcImRyb3BcIixlLm9uZHJvcCksd3IuaXMuZnVuYyhlLm9uZHJvcGFjdGl2YXRlKSYmdC5vbihcImRyb3BhY3RpdmF0ZVwiLGUub25kcm9wYWN0aXZhdGUpLHdyLmlzLmZ1bmMoZS5vbmRyb3BkZWFjdGl2YXRlKSYmdC5vbihcImRyb3BkZWFjdGl2YXRlXCIsZS5vbmRyb3BkZWFjdGl2YXRlKSx3ci5pcy5mdW5jKGUub25kcmFnZW50ZXIpJiZ0Lm9uKFwiZHJhZ2VudGVyXCIsZS5vbmRyYWdlbnRlciksd3IuaXMuZnVuYyhlLm9uZHJhZ2xlYXZlKSYmdC5vbihcImRyYWdsZWF2ZVwiLGUub25kcmFnbGVhdmUpLHdyLmlzLmZ1bmMoZS5vbmRyb3Btb3ZlKSYmdC5vbihcImRyb3Btb3ZlXCIsZS5vbmRyb3Btb3ZlKSwvXihwb2ludGVyfGNlbnRlcikkLy50ZXN0KGUub3ZlcmxhcCk/dC5vcHRpb25zLmRyb3Aub3ZlcmxhcD1lLm92ZXJsYXA6d3IuaXMubnVtYmVyKGUub3ZlcmxhcCkmJih0Lm9wdGlvbnMuZHJvcC5vdmVybGFwPU1hdGgubWF4KE1hdGgubWluKDEsZS5vdmVybGFwKSwwKSksXCJhY2NlcHRcImluIGUmJih0Lm9wdGlvbnMuZHJvcC5hY2NlcHQ9ZS5hY2NlcHQpLFwiY2hlY2tlclwiaW4gZSYmKHQub3B0aW9ucy5kcm9wLmNoZWNrZXI9ZS5jaGVja2VyKSx0fWlmKHdyLmlzLmJvb2woZSkpcmV0dXJuIHQub3B0aW9ucy5kcm9wLmVuYWJsZWQ9ZSx0O3JldHVybiB0Lm9wdGlvbnMuZHJvcH0odGhpcyx0KX0sci5wcm90b3R5cGUuZHJvcENoZWNrPWZ1bmN0aW9uKHQsZSxuLHIsbyxpKXtyZXR1cm4gZnVuY3Rpb24odCxlLG4scixvLGksYSl7dmFyIHU9ITE7aWYoIShhPWF8fHQuZ2V0UmVjdChpKSkpcmV0dXJuISF0Lm9wdGlvbnMuZHJvcC5jaGVja2VyJiZ0Lm9wdGlvbnMuZHJvcC5jaGVja2VyKGUsbix1LHQsaSxyLG8pO3ZhciBzPXQub3B0aW9ucy5kcm9wLm92ZXJsYXA7aWYoXCJwb2ludGVyXCI9PT1zKXt2YXIgbD13ci5nZXRPcmlnaW5YWShyLG8sXCJkcmFnXCIpLGM9d3IucG9pbnRlci5nZXRQYWdlWFkoZSk7Yy54Kz1sLngsYy55Kz1sLnk7dmFyIGY9Yy54PmEubGVmdCYmYy54PGEucmlnaHQscD1jLnk+YS50b3AmJmMueTxhLmJvdHRvbTt1PWYmJnB9dmFyIGQ9ci5nZXRSZWN0KG8pO2lmKGQmJlwiY2VudGVyXCI9PT1zKXt2YXIgdj1kLmxlZnQrZC53aWR0aC8yLHk9ZC50b3ArZC5oZWlnaHQvMjt1PXY+PWEubGVmdCYmdjw9YS5yaWdodCYmeT49YS50b3AmJnk8PWEuYm90dG9tfWlmKGQmJndyLmlzLm51bWJlcihzKSl7dmFyIGg9TWF0aC5tYXgoMCxNYXRoLm1pbihhLnJpZ2h0LGQucmlnaHQpLU1hdGgubWF4KGEubGVmdCxkLmxlZnQpKSpNYXRoLm1heCgwLE1hdGgubWluKGEuYm90dG9tLGQuYm90dG9tKS1NYXRoLm1heChhLnRvcCxkLnRvcCkpLyhkLndpZHRoKmQuaGVpZ2h0KTt1PXM8PWh9dC5vcHRpb25zLmRyb3AuY2hlY2tlciYmKHU9dC5vcHRpb25zLmRyb3AuY2hlY2tlcihlLG4sdSx0LGkscixvKSk7cmV0dXJuIHV9KHRoaXMsdCxlLG4scixvLGkpfSxuLmR5bmFtaWNEcm9wPWZ1bmN0aW9uKHQpe3JldHVybiB3ci5pcy5ib29sKHQpPyhlLmR5bmFtaWNEcm9wPXQsbik6ZS5keW5hbWljRHJvcH0sd3IuZXh0ZW5kKHQucGhhc2VsZXNzVHlwZXMse2RyYWdlbnRlcjohMCxkcmFnbGVhdmU6ITAsZHJvcGFjdGl2YXRlOiEwLGRyb3BkZWFjdGl2YXRlOiEwLGRyb3Btb3ZlOiEwLGRyb3A6ITB9KSx0Lm1ldGhvZERpY3QuZHJvcD1cImRyb3B6b25lXCIsZS5keW5hbWljRHJvcD0hMSxvLmFjdGlvbnMuZHJvcD1Jci5kZWZhdWx0c30sbGlzdGVuZXJzOntcImludGVyYWN0aW9uczpiZWZvcmUtYWN0aW9uLXN0YXJ0XCI6ZnVuY3Rpb24odCl7dmFyIGU9dC5pbnRlcmFjdGlvbjtcImRyYWdcIj09PWUucHJlcGFyZWQubmFtZSYmKGUuZHJvcFN0YXRlPXtjdXI6e2Ryb3B6b25lOm51bGwsZWxlbWVudDpudWxsfSxwcmV2Ontkcm9wem9uZTpudWxsLGVsZW1lbnQ6bnVsbH0scmVqZWN0ZWQ6bnVsbCxldmVudHM6bnVsbCxhY3RpdmVEcm9wczpbXX0pfSxcImludGVyYWN0aW9uczphZnRlci1hY3Rpb24tc3RhcnRcIjpmdW5jdGlvbih0LGUpe3ZhciBuPXQuaW50ZXJhY3Rpb24scj0odC5ldmVudCx0LmlFdmVudCk7aWYoXCJkcmFnXCI9PT1uLnByZXBhcmVkLm5hbWUpe3ZhciBvPW4uZHJvcFN0YXRlO28uYWN0aXZlRHJvcHM9bnVsbCxvLmV2ZW50cz1udWxsLG8uYWN0aXZlRHJvcHM9TXIoZSxuLmVsZW1lbnQpLG8uZXZlbnRzPUVyKG4sMCxyKSxvLmV2ZW50cy5hY3RpdmF0ZSYmKGpyKG8uYWN0aXZlRHJvcHMsby5ldmVudHMuYWN0aXZhdGUpLGUuZmlyZShcImFjdGlvbnMvZHJvcDpzdGFydFwiLHtpbnRlcmFjdGlvbjpuLGRyYWdFdmVudDpyfSkpfX0sXCJpbnRlcmFjdGlvbnM6YWN0aW9uLW1vdmVcIjpEcixcImludGVyYWN0aW9uczphY3Rpb24tZW5kXCI6RHIsXCJpbnRlcmFjdGlvbnM6YWZ0ZXItYWN0aW9uLW1vdmVcIjpmdW5jdGlvbih0LGUpe3ZhciBuPXQuaW50ZXJhY3Rpb24scj10LmlFdmVudDtcImRyYWdcIj09PW4ucHJlcGFyZWQubmFtZSYmKFRyKG4sbi5kcm9wU3RhdGUuZXZlbnRzKSxlLmZpcmUoXCJhY3Rpb25zL2Ryb3A6bW92ZVwiLHtpbnRlcmFjdGlvbjpuLGRyYWdFdmVudDpyfSksbi5kcm9wU3RhdGUuZXZlbnRzPXt9KX0sXCJpbnRlcmFjdGlvbnM6YWZ0ZXItYWN0aW9uLWVuZFwiOmZ1bmN0aW9uKHQsZSl7dmFyIG49dC5pbnRlcmFjdGlvbixyPXQuaUV2ZW50O1wiZHJhZ1wiPT09bi5wcmVwYXJlZC5uYW1lJiYoVHIobixuLmRyb3BTdGF0ZS5ldmVudHMpLGUuZmlyZShcImFjdGlvbnMvZHJvcDplbmRcIix7aW50ZXJhY3Rpb246bixkcmFnRXZlbnQ6cn0pKX0sXCJpbnRlcmFjdGlvbnM6c3RvcFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb247aWYoXCJkcmFnXCI9PT1lLnByZXBhcmVkLm5hbWUpe3ZhciBuPWUuZHJvcFN0YXRlO24mJihuLmFjdGl2ZURyb3BzPW51bGwsbi5ldmVudHM9bnVsbCxuLmN1ci5kcm9wem9uZT1udWxsLG4uY3VyLmVsZW1lbnQ9bnVsbCxuLnByZXYuZHJvcHpvbmU9bnVsbCxuLnByZXYuZWxlbWVudD1udWxsLG4ucmVqZWN0ZWQ9ITEpfX19LGdldEFjdGl2ZURyb3BzOk1yLGdldERyb3A6a3IsZ2V0RHJvcEV2ZW50czpFcixmaXJlRHJvcEV2ZW50czpUcixkZWZhdWx0czp7ZW5hYmxlZDohMSxhY2NlcHQ6bnVsbCxvdmVybGFwOlwicG9pbnRlclwifX0senI9SXI7bXIuZGVmYXVsdD16cjt2YXIgQXI9e307ZnVuY3Rpb24gQ3IodCl7cmV0dXJuKENyPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoQXIsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksQXIuZGVmYXVsdD12b2lkIDA7dmFyIFdyPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PUNyKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPVJyKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KGxlKTtmdW5jdGlvbiBScigpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIFJyPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gRnIodCl7dmFyIGU9dC5pbnRlcmFjdGlvbixuPXQuaUV2ZW50LHI9dC5waGFzZTtpZihcImdlc3R1cmVcIj09PWUucHJlcGFyZWQubmFtZSl7dmFyIG89ZS5wb2ludGVycy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIHQucG9pbnRlcn0pLGk9XCJzdGFydFwiPT09cixhPVwiZW5kXCI9PT1yLHU9ZS5pbnRlcmFjdGFibGUub3B0aW9ucy5kZWx0YVNvdXJjZTtpZihuLnRvdWNoZXM9W29bMF0sb1sxXV0saSluLmRpc3RhbmNlPVdyLnBvaW50ZXIudG91Y2hEaXN0YW5jZShvLHUpLG4uYm94PVdyLnBvaW50ZXIudG91Y2hCQm94KG8pLG4uc2NhbGU9MSxuLmRzPTAsbi5hbmdsZT1Xci5wb2ludGVyLnRvdWNoQW5nbGUobyx1KSxuLmRhPTAsZS5nZXN0dXJlLnN0YXJ0RGlzdGFuY2U9bi5kaXN0YW5jZSxlLmdlc3R1cmUuc3RhcnRBbmdsZT1uLmFuZ2xlO2Vsc2UgaWYoYSl7dmFyIHM9ZS5wcmV2RXZlbnQ7bi5kaXN0YW5jZT1zLmRpc3RhbmNlLG4uYm94PXMuYm94LG4uc2NhbGU9cy5zY2FsZSxuLmRzPTAsbi5hbmdsZT1zLmFuZ2xlLG4uZGE9MH1lbHNlIG4uZGlzdGFuY2U9V3IucG9pbnRlci50b3VjaERpc3RhbmNlKG8sdSksbi5ib3g9V3IucG9pbnRlci50b3VjaEJCb3gobyksbi5zY2FsZT1uLmRpc3RhbmNlL2UuZ2VzdHVyZS5zdGFydERpc3RhbmNlLG4uYW5nbGU9V3IucG9pbnRlci50b3VjaEFuZ2xlKG8sdSksbi5kcz1uLnNjYWxlLWUuZ2VzdHVyZS5zY2FsZSxuLmRhPW4uYW5nbGUtZS5nZXN0dXJlLmFuZ2xlO2UuZ2VzdHVyZS5kaXN0YW5jZT1uLmRpc3RhbmNlLGUuZ2VzdHVyZS5hbmdsZT1uLmFuZ2xlLFdyLmlzLm51bWJlcihuLnNjYWxlKSYmbi5zY2FsZSE9PTEvMCYmIWlzTmFOKG4uc2NhbGUpJiYoZS5nZXN0dXJlLnNjYWxlPW4uc2NhbGUpfX12YXIgWHI9e2lkOlwiYWN0aW9ucy9nZXN0dXJlXCIsYmVmb3JlOltcImFjdGlvbnMvZHJhZ1wiLFwiYWN0aW9ucy9yZXNpemVcIl0saW5zdGFsbDpmdW5jdGlvbih0KXt2YXIgZT10LmFjdGlvbnMsbj10LkludGVyYWN0YWJsZSxyPXQuZGVmYXVsdHM7bi5wcm90b3R5cGUuZ2VzdHVyYWJsZT1mdW5jdGlvbih0KXtyZXR1cm4gV3IuaXMub2JqZWN0KHQpPyh0aGlzLm9wdGlvbnMuZ2VzdHVyZS5lbmFibGVkPSExIT09dC5lbmFibGVkLHRoaXMuc2V0UGVyQWN0aW9uKFwiZ2VzdHVyZVwiLHQpLHRoaXMuc2V0T25FdmVudHMoXCJnZXN0dXJlXCIsdCksdGhpcyk6V3IuaXMuYm9vbCh0KT8odGhpcy5vcHRpb25zLmdlc3R1cmUuZW5hYmxlZD10LHRoaXMpOnRoaXMub3B0aW9ucy5nZXN0dXJlfSxlLm1hcC5nZXN0dXJlPVhyLGUubWV0aG9kRGljdC5nZXN0dXJlPVwiZ2VzdHVyYWJsZVwiLHIuYWN0aW9ucy5nZXN0dXJlPVhyLmRlZmF1bHRzfSxsaXN0ZW5lcnM6e1wiaW50ZXJhY3Rpb25zOmFjdGlvbi1zdGFydFwiOkZyLFwiaW50ZXJhY3Rpb25zOmFjdGlvbi1tb3ZlXCI6RnIsXCJpbnRlcmFjdGlvbnM6YWN0aW9uLWVuZFwiOkZyLFwiaW50ZXJhY3Rpb25zOm5ld1wiOmZ1bmN0aW9uKHQpe3QuaW50ZXJhY3Rpb24uZ2VzdHVyZT17YW5nbGU6MCxkaXN0YW5jZTowLHNjYWxlOjEsc3RhcnRBbmdsZTowLHN0YXJ0RGlzdGFuY2U6MH19LFwiYXV0by1zdGFydDpjaGVja1wiOmZ1bmN0aW9uKHQpe2lmKCEodC5pbnRlcmFjdGlvbi5wb2ludGVycy5sZW5ndGg8Mikpe3ZhciBlPXQuaW50ZXJhY3RhYmxlLm9wdGlvbnMuZ2VzdHVyZTtpZihlJiZlLmVuYWJsZWQpcmV0dXJuISh0LmFjdGlvbj17bmFtZTpcImdlc3R1cmVcIn0pfX19LGRlZmF1bHRzOnt9LGdldEN1cnNvcjpmdW5jdGlvbigpe3JldHVyblwiXCJ9fSxZcj1YcjtBci5kZWZhdWx0PVlyO3ZhciBOcj17fTtmdW5jdGlvbiBMcih0KXtyZXR1cm4oTHI9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShOcixcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxOci5kZWZhdWx0PXZvaWQgMDt2YXIgQnIsVnI9SHIoJCkscXI9KEJyPWN0KSYmQnIuX19lc01vZHVsZT9Ccjp7ZGVmYXVsdDpCcn0sVXI9SHIodyk7ZnVuY3Rpb24gR3IoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBHcj1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIEhyKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PUxyKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPUdyKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfXJldHVybiBuLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pLG59ZnVuY3Rpb24gS3IodCxlLG4scixvLGksYSl7aWYoIWUpcmV0dXJuITE7aWYoITA9PT1lKXt2YXIgdT1Vci5udW1iZXIoaS53aWR0aCk/aS53aWR0aDppLnJpZ2h0LWkubGVmdCxzPVVyLm51bWJlcihpLmhlaWdodCk/aS5oZWlnaHQ6aS5ib3R0b20taS50b3A7aWYoYT1NYXRoLm1pbihhLChcImxlZnRcIj09PXR8fFwicmlnaHRcIj09PXQ/dTpzKS8yKSx1PDAmJihcImxlZnRcIj09PXQ/dD1cInJpZ2h0XCI6XCJyaWdodFwiPT09dCYmKHQ9XCJsZWZ0XCIpKSxzPDAmJihcInRvcFwiPT09dD90PVwiYm90dG9tXCI6XCJib3R0b21cIj09PXQmJih0PVwidG9wXCIpKSxcImxlZnRcIj09PXQpcmV0dXJuIG4ueDwoMDw9dT9pLmxlZnQ6aS5yaWdodCkrYTtpZihcInRvcFwiPT09dClyZXR1cm4gbi55PCgwPD1zP2kudG9wOmkuYm90dG9tKSthO2lmKFwicmlnaHRcIj09PXQpcmV0dXJuIG4ueD4oMDw9dT9pLnJpZ2h0OmkubGVmdCktYTtpZihcImJvdHRvbVwiPT09dClyZXR1cm4gbi55PigwPD1zP2kuYm90dG9tOmkudG9wKS1hfXJldHVybiEhVXIuZWxlbWVudChyKSYmKFVyLmVsZW1lbnQoZSk/ZT09PXI6VnIubWF0Y2hlc1VwVG8ocixlLG8pKX1mdW5jdGlvbiAkcih0KXt2YXIgZT10LmlFdmVudCxuPXQuaW50ZXJhY3Rpb247aWYoXCJyZXNpemVcIj09PW4ucHJlcGFyZWQubmFtZSYmbi5yZXNpemVBeGVzKXt2YXIgcj1lO24uaW50ZXJhY3RhYmxlLm9wdGlvbnMucmVzaXplLnNxdWFyZT8oXCJ5XCI9PT1uLnJlc2l6ZUF4ZXM/ci5kZWx0YS54PXIuZGVsdGEueTpyLmRlbHRhLnk9ci5kZWx0YS54LHIuYXhlcz1cInh5XCIpOihyLmF4ZXM9bi5yZXNpemVBeGVzLFwieFwiPT09bi5yZXNpemVBeGVzP3IuZGVsdGEueT0wOlwieVwiPT09bi5yZXNpemVBeGVzJiYoci5kZWx0YS54PTApKX19dmFyIFpyPXtpZDpcImFjdGlvbnMvcmVzaXplXCIsYmVmb3JlOltcImFjdGlvbnMvZHJhZ1wiXSxpbnN0YWxsOmZ1bmN0aW9uKGUpe3ZhciB0PWUuYWN0aW9ucyxuPWUuYnJvd3NlcixyPWUuSW50ZXJhY3RhYmxlLG89ZS5kZWZhdWx0cztaci5jdXJzb3JzPW4uaXNJZTk/e3g6XCJlLXJlc2l6ZVwiLHk6XCJzLXJlc2l6ZVwiLHh5Olwic2UtcmVzaXplXCIsdG9wOlwibi1yZXNpemVcIixsZWZ0Olwidy1yZXNpemVcIixib3R0b206XCJzLXJlc2l6ZVwiLHJpZ2h0OlwiZS1yZXNpemVcIix0b3BsZWZ0Olwic2UtcmVzaXplXCIsYm90dG9tcmlnaHQ6XCJzZS1yZXNpemVcIix0b3ByaWdodDpcIm5lLXJlc2l6ZVwiLGJvdHRvbWxlZnQ6XCJuZS1yZXNpemVcIn06e3g6XCJldy1yZXNpemVcIix5OlwibnMtcmVzaXplXCIseHk6XCJud3NlLXJlc2l6ZVwiLHRvcDpcIm5zLXJlc2l6ZVwiLGxlZnQ6XCJldy1yZXNpemVcIixib3R0b206XCJucy1yZXNpemVcIixyaWdodDpcImV3LXJlc2l6ZVwiLHRvcGxlZnQ6XCJud3NlLXJlc2l6ZVwiLGJvdHRvbXJpZ2h0OlwibndzZS1yZXNpemVcIix0b3ByaWdodDpcIm5lc3ctcmVzaXplXCIsYm90dG9tbGVmdDpcIm5lc3ctcmVzaXplXCJ9LFpyLmRlZmF1bHRNYXJnaW49bi5zdXBwb3J0c1RvdWNofHxuLnN1cHBvcnRzUG9pbnRlckV2ZW50PzIwOjEwLHIucHJvdG90eXBlLnJlc2l6YWJsZT1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24odCxlLG4pe2lmKFVyLm9iamVjdChlKSlyZXR1cm4gdC5vcHRpb25zLnJlc2l6ZS5lbmFibGVkPSExIT09ZS5lbmFibGVkLHQuc2V0UGVyQWN0aW9uKFwicmVzaXplXCIsZSksdC5zZXRPbkV2ZW50cyhcInJlc2l6ZVwiLGUpLFVyLnN0cmluZyhlLmF4aXMpJiYvXngkfF55JHxeeHkkLy50ZXN0KGUuYXhpcyk/dC5vcHRpb25zLnJlc2l6ZS5heGlzPWUuYXhpczpudWxsPT09ZS5heGlzJiYodC5vcHRpb25zLnJlc2l6ZS5heGlzPW4uZGVmYXVsdHMuYWN0aW9ucy5yZXNpemUuYXhpcyksVXIuYm9vbChlLnByZXNlcnZlQXNwZWN0UmF0aW8pP3Qub3B0aW9ucy5yZXNpemUucHJlc2VydmVBc3BlY3RSYXRpbz1lLnByZXNlcnZlQXNwZWN0UmF0aW86VXIuYm9vbChlLnNxdWFyZSkmJih0Lm9wdGlvbnMucmVzaXplLnNxdWFyZT1lLnNxdWFyZSksdDtpZihVci5ib29sKGUpKXJldHVybiB0Lm9wdGlvbnMucmVzaXplLmVuYWJsZWQ9ZSx0O3JldHVybiB0Lm9wdGlvbnMucmVzaXplfSh0aGlzLHQsZSl9LHQubWFwLnJlc2l6ZT1acix0Lm1ldGhvZERpY3QucmVzaXplPVwicmVzaXphYmxlXCIsby5hY3Rpb25zLnJlc2l6ZT1aci5kZWZhdWx0c30sbGlzdGVuZXJzOntcImludGVyYWN0aW9uczpuZXdcIjpmdW5jdGlvbih0KXt0LmludGVyYWN0aW9uLnJlc2l6ZUF4ZXM9XCJ4eVwifSxcImludGVyYWN0aW9uczphY3Rpb24tc3RhcnRcIjpmdW5jdGlvbih0KXshZnVuY3Rpb24odCl7dmFyIGU9dC5pRXZlbnQsbj10LmludGVyYWN0aW9uO2lmKFwicmVzaXplXCI9PT1uLnByZXBhcmVkLm5hbWUmJm4ucHJlcGFyZWQuZWRnZXMpe3ZhciByPWUsbz1uLnJlY3Q7bi5fcmVjdHM9e3N0YXJ0OigwLHFyLmRlZmF1bHQpKHt9LG8pLGNvcnJlY3RlZDooMCxxci5kZWZhdWx0KSh7fSxvKSxwcmV2aW91czooMCxxci5kZWZhdWx0KSh7fSxvKSxkZWx0YTp7bGVmdDowLHJpZ2h0OjAsd2lkdGg6MCx0b3A6MCxib3R0b206MCxoZWlnaHQ6MH19LHIuZWRnZXM9bi5wcmVwYXJlZC5lZGdlcyxyLnJlY3Q9bi5fcmVjdHMuY29ycmVjdGVkLHIuZGVsdGFSZWN0PW4uX3JlY3RzLmRlbHRhfX0odCksJHIodCl9LFwiaW50ZXJhY3Rpb25zOmFjdGlvbi1tb3ZlXCI6ZnVuY3Rpb24odCl7IWZ1bmN0aW9uKHQpe3ZhciBlPXQuaUV2ZW50LG49dC5pbnRlcmFjdGlvbjtpZihcInJlc2l6ZVwiPT09bi5wcmVwYXJlZC5uYW1lJiZuLnByZXBhcmVkLmVkZ2VzKXt2YXIgcj1lLG89bi5pbnRlcmFjdGFibGUub3B0aW9ucy5yZXNpemUuaW52ZXJ0LGk9XCJyZXBvc2l0aW9uXCI9PT1vfHxcIm5lZ2F0ZVwiPT09byxhPW4ucmVjdCx1PW4uX3JlY3RzLHM9dS5zdGFydCxsPXUuY29ycmVjdGVkLGM9dS5kZWx0YSxmPXUucHJldmlvdXM7aWYoKDAscXIuZGVmYXVsdCkoZixsKSxpKXtpZigoMCxxci5kZWZhdWx0KShsLGEpLFwicmVwb3NpdGlvblwiPT09byl7aWYobC50b3A+bC5ib3R0b20pe3ZhciBwPWwudG9wO2wudG9wPWwuYm90dG9tLGwuYm90dG9tPXB9aWYobC5sZWZ0PmwucmlnaHQpe3ZhciBkPWwubGVmdDtsLmxlZnQ9bC5yaWdodCxsLnJpZ2h0PWR9fX1lbHNlIGwudG9wPU1hdGgubWluKGEudG9wLHMuYm90dG9tKSxsLmJvdHRvbT1NYXRoLm1heChhLmJvdHRvbSxzLnRvcCksbC5sZWZ0PU1hdGgubWluKGEubGVmdCxzLnJpZ2h0KSxsLnJpZ2h0PU1hdGgubWF4KGEucmlnaHQscy5sZWZ0KTtmb3IodmFyIHYgaW4gbC53aWR0aD1sLnJpZ2h0LWwubGVmdCxsLmhlaWdodD1sLmJvdHRvbS1sLnRvcCxsKWNbdl09bFt2XS1mW3ZdO3IuZWRnZXM9bi5wcmVwYXJlZC5lZGdlcyxyLnJlY3Q9bCxyLmRlbHRhUmVjdD1jfX0odCksJHIodCl9LFwiaW50ZXJhY3Rpb25zOmFjdGlvbi1lbmRcIjpmdW5jdGlvbih0KXt2YXIgZT10LmlFdmVudCxuPXQuaW50ZXJhY3Rpb247aWYoXCJyZXNpemVcIj09PW4ucHJlcGFyZWQubmFtZSYmbi5wcmVwYXJlZC5lZGdlcyl7dmFyIHI9ZTtyLmVkZ2VzPW4ucHJlcGFyZWQuZWRnZXMsci5yZWN0PW4uX3JlY3RzLmNvcnJlY3RlZCxyLmRlbHRhUmVjdD1uLl9yZWN0cy5kZWx0YX19LFwiYXV0by1zdGFydDpjaGVja1wiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LmludGVyYWN0YWJsZSxyPXQuZWxlbWVudCxvPXQucmVjdCxpPXQuYnV0dG9ucztpZihvKXt2YXIgYT0oMCxxci5kZWZhdWx0KSh7fSxlLmNvb3Jkcy5jdXIucGFnZSksdT1uLm9wdGlvbnMucmVzaXplO2lmKHUmJnUuZW5hYmxlZCYmKCFlLnBvaW50ZXJJc0Rvd258fCEvbW91c2V8cG9pbnRlci8udGVzdChlLnBvaW50ZXJUeXBlKXx8MCE9KGkmdS5tb3VzZUJ1dHRvbnMpKSl7aWYoVXIub2JqZWN0KHUuZWRnZXMpKXt2YXIgcz17bGVmdDohMSxyaWdodDohMSx0b3A6ITEsYm90dG9tOiExfTtmb3IodmFyIGwgaW4gcylzW2xdPUtyKGwsdS5lZGdlc1tsXSxhLGUuX2xhdGVzdFBvaW50ZXIuZXZlbnRUYXJnZXQscixvLHUubWFyZ2lufHxaci5kZWZhdWx0TWFyZ2luKTtzLmxlZnQ9cy5sZWZ0JiYhcy5yaWdodCxzLnRvcD1zLnRvcCYmIXMuYm90dG9tLChzLmxlZnR8fHMucmlnaHR8fHMudG9wfHxzLmJvdHRvbSkmJih0LmFjdGlvbj17bmFtZTpcInJlc2l6ZVwiLGVkZ2VzOnN9KX1lbHNle3ZhciBjPVwieVwiIT09dS5heGlzJiZhLng+by5yaWdodC1aci5kZWZhdWx0TWFyZ2luLGY9XCJ4XCIhPT11LmF4aXMmJmEueT5vLmJvdHRvbS1aci5kZWZhdWx0TWFyZ2luOyhjfHxmKSYmKHQuYWN0aW9uPXtuYW1lOlwicmVzaXplXCIsYXhlczooYz9cInhcIjpcIlwiKSsoZj9cInlcIjpcIlwiKX0pfXJldHVybiF0LmFjdGlvbiYmdm9pZCAwfX19fSxkZWZhdWx0czp7c3F1YXJlOiExLHByZXNlcnZlQXNwZWN0UmF0aW86ITEsYXhpczpcInh5XCIsbWFyZ2luOk5hTixlZGdlczpudWxsLGludmVydDpcIm5vbmVcIn0sY3Vyc29yczpudWxsLGdldEN1cnNvcjpmdW5jdGlvbih0KXt2YXIgZT10LmVkZ2VzLG49dC5heGlzLHI9dC5uYW1lLG89WnIuY3Vyc29ycyxpPW51bGw7aWYobilpPW9bcituXTtlbHNlIGlmKGUpe2Zvcih2YXIgYT1cIlwiLHU9W1widG9wXCIsXCJib3R0b21cIixcImxlZnRcIixcInJpZ2h0XCJdLHM9MDtzPHUubGVuZ3RoO3MrKyl7dmFyIGw9dVtzXTtlW2xdJiYoYSs9bCl9aT1vW2FdfXJldHVybiBpfSxkZWZhdWx0TWFyZ2luOm51bGx9LEpyPVpyO05yLmRlZmF1bHQ9SnI7dmFyIFFyPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShRcixcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoUXIsXCJkcmFnXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHRvLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KFFyLFwiZHJvcFwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBlby5kZWZhdWx0fX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShRcixcImdlc3R1cmVcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gbm8uZGVmYXVsdH19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoUXIsXCJyZXNpemVcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gcm8uZGVmYXVsdH19KSxRci5kZWZhdWx0PXZvaWQgMDt2YXIgdG89b28odiksZW89b28obXIpLG5vPW9vKEFyKSxybz1vbyhOcik7ZnVuY3Rpb24gb28odCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fXZhciBpbz17aWQ6XCJhY3Rpb25zXCIsaW5zdGFsbDpmdW5jdGlvbih0KXt0LnVzZVBsdWdpbihuby5kZWZhdWx0KSx0LnVzZVBsdWdpbihyby5kZWZhdWx0KSx0LnVzZVBsdWdpbih0by5kZWZhdWx0KSx0LnVzZVBsdWdpbihlby5kZWZhdWx0KX19O1FyLmRlZmF1bHQ9aW87dmFyIGFvPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShhbyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxhby5kZWZhdWx0PXZvaWQgMDthby5kZWZhdWx0PXt9O3ZhciB1bz17fTtmdW5jdGlvbiBzbyh0KXtyZXR1cm4oc289XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eSh1byxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx1by5nZXRDb250YWluZXI9Z28sdW8uZ2V0U2Nyb2xsPWJvLHVvLmdldFNjcm9sbFNpemU9ZnVuY3Rpb24odCl7Zm8ud2luZG93KHQpJiYodD13aW5kb3cuZG9jdW1lbnQuYm9keSk7cmV0dXJue3g6dC5zY3JvbGxXaWR0aCx5OnQuc2Nyb2xsSGVpZ2h0fX0sdW8uZ2V0U2Nyb2xsU2l6ZURlbHRhPWZ1bmN0aW9uKHQsZSl7dmFyIG49dC5pbnRlcmFjdGlvbixyPXQuZWxlbWVudCxvPW4mJm4uaW50ZXJhY3RhYmxlLm9wdGlvbnNbbi5wcmVwYXJlZC5uYW1lXS5hdXRvU2Nyb2xsO2lmKCFvfHwhby5lbmFibGVkKXJldHVybiBlKCkse3g6MCx5OjB9O3ZhciBpPWdvKG8uY29udGFpbmVyLG4uaW50ZXJhY3RhYmxlLHIpLGE9Ym8oaSk7ZSgpO3ZhciB1PWJvKGkpO3JldHVybnt4OnUueC1hLngseTp1LnktYS55fX0sdW8uZGVmYXVsdD12b2lkIDA7dmFyIGxvLGNvPXlvKCQpLGZvPXlvKHcpLHBvPShsbz1vZSkmJmxvLl9fZXNNb2R1bGU/bG86e2RlZmF1bHQ6bG99O2Z1bmN0aW9uIHZvKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gdm89ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiB5byh0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1zbyh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT12bygpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1yZXR1cm4gbi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKSxufXZhciBobz17ZGVmYXVsdHM6e2VuYWJsZWQ6ITEsbWFyZ2luOjYwLGNvbnRhaW5lcjpudWxsLHNwZWVkOjMwMH0sbm93OkRhdGUubm93LGludGVyYWN0aW9uOm51bGwsaTowLHg6MCx5OjAsaXNTY3JvbGxpbmc6ITEscHJldlRpbWU6MCxtYXJnaW46MCxzcGVlZDowLHN0YXJ0OmZ1bmN0aW9uKHQpe2hvLmlzU2Nyb2xsaW5nPSEwLHBvLmRlZmF1bHQuY2FuY2VsKGhvLmkpLCh0LmF1dG9TY3JvbGw9aG8pLmludGVyYWN0aW9uPXQsaG8ucHJldlRpbWU9aG8ubm93KCksaG8uaT1wby5kZWZhdWx0LnJlcXVlc3QoaG8uc2Nyb2xsKX0sc3RvcDpmdW5jdGlvbigpe2hvLmlzU2Nyb2xsaW5nPSExLGhvLmludGVyYWN0aW9uJiYoaG8uaW50ZXJhY3Rpb24uYXV0b1Njcm9sbD1udWxsKSxwby5kZWZhdWx0LmNhbmNlbChoby5pKX0sc2Nyb2xsOmZ1bmN0aW9uKCl7dmFyIHQ9aG8uaW50ZXJhY3Rpb24sZT10LmludGVyYWN0YWJsZSxuPXQuZWxlbWVudCxyPXQucHJlcGFyZWQubmFtZSxvPWUub3B0aW9uc1tyXS5hdXRvU2Nyb2xsLGk9Z28oby5jb250YWluZXIsZSxuKSxhPWhvLm5vdygpLHU9KGEtaG8ucHJldlRpbWUpLzFlMyxzPW8uc3BlZWQqdTtpZigxPD1zKXt2YXIgbD17eDpoby54KnMseTpoby55KnN9O2lmKGwueHx8bC55KXt2YXIgYz1ibyhpKTtmby53aW5kb3coaSk/aS5zY3JvbGxCeShsLngsbC55KTppJiYoaS5zY3JvbGxMZWZ0Kz1sLngsaS5zY3JvbGxUb3ArPWwueSk7dmFyIGY9Ym8oaSkscD17eDpmLngtYy54LHk6Zi55LWMueX07KHAueHx8cC55KSYmZS5maXJlKHt0eXBlOlwiYXV0b3Njcm9sbFwiLHRhcmdldDpuLGludGVyYWN0YWJsZTplLGRlbHRhOnAsaW50ZXJhY3Rpb246dCxjb250YWluZXI6aX0pfWhvLnByZXZUaW1lPWF9aG8uaXNTY3JvbGxpbmcmJihwby5kZWZhdWx0LmNhbmNlbChoby5pKSxoby5pPXBvLmRlZmF1bHQucmVxdWVzdChoby5zY3JvbGwpKX0sY2hlY2s6ZnVuY3Rpb24odCxlKXt2YXIgbj10Lm9wdGlvbnM7cmV0dXJuIG5bZV0uYXV0b1Njcm9sbCYmbltlXS5hdXRvU2Nyb2xsLmVuYWJsZWR9LG9uSW50ZXJhY3Rpb25Nb3ZlOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LnBvaW50ZXI7aWYoZS5pbnRlcmFjdGluZygpJiZoby5jaGVjayhlLmludGVyYWN0YWJsZSxlLnByZXBhcmVkLm5hbWUpKWlmKGUuc2ltdWxhdGlvbiloby54PWhvLnk9MDtlbHNle3ZhciByLG8saSxhLHU9ZS5pbnRlcmFjdGFibGUscz1lLmVsZW1lbnQsbD1lLnByZXBhcmVkLm5hbWUsYz11Lm9wdGlvbnNbbF0uYXV0b1Njcm9sbCxmPWdvKGMuY29udGFpbmVyLHUscyk7aWYoZm8ud2luZG93KGYpKWE9bi5jbGllbnRYPGhvLm1hcmdpbixyPW4uY2xpZW50WTxoby5tYXJnaW4sbz1uLmNsaWVudFg+Zi5pbm5lcldpZHRoLWhvLm1hcmdpbixpPW4uY2xpZW50WT5mLmlubmVySGVpZ2h0LWhvLm1hcmdpbjtlbHNle3ZhciBwPWNvLmdldEVsZW1lbnRDbGllbnRSZWN0KGYpO2E9bi5jbGllbnRYPHAubGVmdCtoby5tYXJnaW4scj1uLmNsaWVudFk8cC50b3AraG8ubWFyZ2luLG89bi5jbGllbnRYPnAucmlnaHQtaG8ubWFyZ2luLGk9bi5jbGllbnRZPnAuYm90dG9tLWhvLm1hcmdpbn1oby54PW8/MTphPy0xOjAsaG8ueT1pPzE6cj8tMTowLGhvLmlzU2Nyb2xsaW5nfHwoaG8ubWFyZ2luPWMubWFyZ2luLGhvLnNwZWVkPWMuc3BlZWQsaG8uc3RhcnQoZSkpfX19O2Z1bmN0aW9uIGdvKHQsZSxuKXtyZXR1cm4oZm8uc3RyaW5nKHQpPygwLCR0LmdldFN0cmluZ09wdGlvblJlc3VsdCkodCxlLG4pOnQpfHwoMCxPLmdldFdpbmRvdykobil9ZnVuY3Rpb24gYm8odCl7cmV0dXJuIGZvLndpbmRvdyh0KSYmKHQ9d2luZG93LmRvY3VtZW50LmJvZHkpLHt4OnQuc2Nyb2xsTGVmdCx5OnQuc2Nyb2xsVG9wfX12YXIgbW89e2lkOlwiYXV0by1zY3JvbGxcIixpbnN0YWxsOmZ1bmN0aW9uKHQpe3ZhciBlPXQuZGVmYXVsdHMsbj10LmFjdGlvbnM7KHQuYXV0b1Njcm9sbD1obykubm93PWZ1bmN0aW9uKCl7cmV0dXJuIHQubm93KCl9LG4ucGhhc2VsZXNzVHlwZXMuYXV0b3Njcm9sbD0hMCxlLnBlckFjdGlvbi5hdXRvU2Nyb2xsPWhvLmRlZmF1bHRzfSxsaXN0ZW5lcnM6e1wiaW50ZXJhY3Rpb25zOm5ld1wiOmZ1bmN0aW9uKHQpe3QuaW50ZXJhY3Rpb24uYXV0b1Njcm9sbD1udWxsfSxcImludGVyYWN0aW9uczpkZXN0cm95XCI6ZnVuY3Rpb24odCl7dC5pbnRlcmFjdGlvbi5hdXRvU2Nyb2xsPW51bGwsaG8uc3RvcCgpLGhvLmludGVyYWN0aW9uJiYoaG8uaW50ZXJhY3Rpb249bnVsbCl9LFwiaW50ZXJhY3Rpb25zOnN0b3BcIjpoby5zdG9wLFwiaW50ZXJhY3Rpb25zOmFjdGlvbi1tb3ZlXCI6ZnVuY3Rpb24odCl7cmV0dXJuIGhvLm9uSW50ZXJhY3Rpb25Nb3ZlKHQpfX19O3VvLmRlZmF1bHQ9bW87dmFyIE9vPXt9O2Z1bmN0aW9uIHdvKHQpe3JldHVybih3bz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KE9vLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLE9vLmRlZmF1bHQ9dm9pZCAwO3ZhciBfbz1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT13byh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1QbygpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSh3KTtmdW5jdGlvbiBQbygpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIFBvPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24geG8odCl7cmV0dXJuIF9vLmJvb2wodCk/KHRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcj10LHRoaXMpOm51bGw9PT10PyhkZWxldGUgdGhpcy5vcHRpb25zLnN0eWxlQ3Vyc29yLHRoaXMpOnRoaXMub3B0aW9ucy5zdHlsZUN1cnNvcn1mdW5jdGlvbiBTbyh0KXtyZXR1cm4gX28uZnVuYyh0KT8odGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXI9dCx0aGlzKTpudWxsPT09dD8oZGVsZXRlIHRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyLHRoaXMpOnRoaXMub3B0aW9ucy5hY3Rpb25DaGVja2VyfXZhciBqbz17aWQ6XCJhdXRvLXN0YXJ0L2ludGVyYWN0YWJsZU1ldGhvZHNcIixpbnN0YWxsOmZ1bmN0aW9uKGQpe3ZhciB0PWQuSW50ZXJhY3RhYmxlO3QucHJvdG90eXBlLmdldEFjdGlvbj1mdW5jdGlvbih0LGUsbixyKXt2YXIgbyxpLGEsdSxzLGwsYyxmLHA9KGk9ZSxhPW4sdT1yLHM9ZCxsPShvPXRoaXMpLmdldFJlY3QodSksYz1pLmJ1dHRvbnN8fHswOjEsMTo0LDM6OCw0OjE2fVtpLmJ1dHRvbl0sZj17YWN0aW9uOm51bGwsaW50ZXJhY3RhYmxlOm8saW50ZXJhY3Rpb246YSxlbGVtZW50OnUscmVjdDpsLGJ1dHRvbnM6Y30scy5maXJlKFwiYXV0by1zdGFydDpjaGVja1wiLGYpLGYuYWN0aW9uKTtyZXR1cm4gdGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXI/dGhpcy5vcHRpb25zLmFjdGlvbkNoZWNrZXIodCxlLHAsdGhpcyxyLG4pOnB9LHQucHJvdG90eXBlLmlnbm9yZUZyb209KDAsbGUud2Fybk9uY2UpKGZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLl9iYWNrQ29tcGF0T3B0aW9uKFwiaWdub3JlRnJvbVwiLHQpfSxcIkludGVyYWN0YWJsZS5pZ25vcmVGcm9tKCkgaGFzIGJlZW4gZGVwcmVjYXRlZC4gVXNlIEludGVyYWN0YmxlLmRyYWdnYWJsZSh7aWdub3JlRnJvbTogbmV3VmFsdWV9KS5cIiksdC5wcm90b3R5cGUuYWxsb3dGcm9tPSgwLGxlLndhcm5PbmNlKShmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5fYmFja0NvbXBhdE9wdGlvbihcImFsbG93RnJvbVwiLHQpfSxcIkludGVyYWN0YWJsZS5hbGxvd0Zyb20oKSBoYXMgYmVlbiBkZXByZWNhdGVkLiBVc2UgSW50ZXJhY3RibGUuZHJhZ2dhYmxlKHthbGxvd0Zyb206IG5ld1ZhbHVlfSkuXCIpLHQucHJvdG90eXBlLmFjdGlvbkNoZWNrZXI9U28sdC5wcm90b3R5cGUuc3R5bGVDdXJzb3I9eG99fTtPby5kZWZhdWx0PWpvO3ZhciBNbz17fTtmdW5jdGlvbiBrbyh0KXtyZXR1cm4oa289XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShNbyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxNby5kZWZhdWx0PXZvaWQgMDt2YXIgRW8sVG89ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09a28odCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9SW8oKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0obGUpLERvPShFbz1PbykmJkVvLl9fZXNNb2R1bGU/RW86e2RlZmF1bHQ6RW99O2Z1bmN0aW9uIElvKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gSW89ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiB6byh0LGUsbixyLG8pe3JldHVybiBlLnRlc3RJZ25vcmVBbGxvdyhlLm9wdGlvbnNbdC5uYW1lXSxuLHIpJiZlLm9wdGlvbnNbdC5uYW1lXS5lbmFibGVkJiZSbyhlLG4sdCxvKT90Om51bGx9ZnVuY3Rpb24gQW8odCxlLG4scixvLGksYSl7Zm9yKHZhciB1PTAscz1yLmxlbmd0aDt1PHM7dSsrKXt2YXIgbD1yW3VdLGM9b1t1XSxmPWwuZ2V0QWN0aW9uKGUsbix0LGMpO2lmKGYpe3ZhciBwPXpvKGYsbCxjLGksYSk7aWYocClyZXR1cm57YWN0aW9uOnAsaW50ZXJhY3RhYmxlOmwsZWxlbWVudDpjfX19cmV0dXJue2FjdGlvbjpudWxsLGludGVyYWN0YWJsZTpudWxsLGVsZW1lbnQ6bnVsbH19ZnVuY3Rpb24gQ28odCxlLG4scixvKXt2YXIgaT1bXSxhPVtdLHU9cjtmdW5jdGlvbiBzKHQpe2kucHVzaCh0KSxhLnB1c2godSl9Zm9yKDtUby5pcy5lbGVtZW50KHUpOyl7aT1bXSxhPVtdLG8uaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2godSxzKTt2YXIgbD1Bbyh0LGUsbixpLGEscixvKTtpZihsLmFjdGlvbiYmIWwuaW50ZXJhY3RhYmxlLm9wdGlvbnNbbC5hY3Rpb24ubmFtZV0ubWFudWFsU3RhcnQpcmV0dXJuIGw7dT1Uby5kb20ucGFyZW50Tm9kZSh1KX1yZXR1cm57YWN0aW9uOm51bGwsaW50ZXJhY3RhYmxlOm51bGwsZWxlbWVudDpudWxsfX1mdW5jdGlvbiBXbyh0LGUsbil7dmFyIHI9ZS5hY3Rpb24sbz1lLmludGVyYWN0YWJsZSxpPWUuZWxlbWVudDtyPXJ8fHtuYW1lOm51bGx9LHQuaW50ZXJhY3RhYmxlPW8sdC5lbGVtZW50PWksVG8uY29weUFjdGlvbih0LnByZXBhcmVkLHIpLHQucmVjdD1vJiZyLm5hbWU/by5nZXRSZWN0KGkpOm51bGwsWW8odCxuKSxuLmZpcmUoXCJhdXRvU3RhcnQ6cHJlcGFyZWRcIix7aW50ZXJhY3Rpb246dH0pfWZ1bmN0aW9uIFJvKHQsZSxuLHIpe3ZhciBvPXQub3B0aW9ucyxpPW9bbi5uYW1lXS5tYXgsYT1vW24ubmFtZV0ubWF4UGVyRWxlbWVudCx1PXIuYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucyxzPTAsbD0wLGM9MDtpZighKGkmJmEmJnUpKXJldHVybiExO2Zvcih2YXIgZj0wO2Y8ci5pbnRlcmFjdGlvbnMubGlzdC5sZW5ndGg7ZisrKXt2YXIgcD1yLmludGVyYWN0aW9ucy5saXN0W2ZdLGQ9cC5wcmVwYXJlZC5uYW1lO2lmKHAuaW50ZXJhY3RpbmcoKSl7aWYodTw9KytzKXJldHVybiExO2lmKHAuaW50ZXJhY3RhYmxlPT09dCl7aWYoaTw9KGwrPWQ9PT1uLm5hbWU/MTowKSlyZXR1cm4hMTtpZihwLmVsZW1lbnQ9PT1lJiYoYysrLGQ9PT1uLm5hbWUmJmE8PWMpKXJldHVybiExfX19cmV0dXJuIDA8dX1mdW5jdGlvbiBGbyh0LGUpe3JldHVybiBUby5pcy5udW1iZXIodCk/KGUuYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9ucz10LHRoaXMpOmUuYXV0b1N0YXJ0Lm1heEludGVyYWN0aW9uc31mdW5jdGlvbiBYbyh0LGUsbil7dmFyIHI9bi5hdXRvU3RhcnQuY3Vyc29yRWxlbWVudDtyJiZyIT09dCYmKHIuc3R5bGUuY3Vyc29yPVwiXCIpLHQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yPWUsdC5zdHlsZS5jdXJzb3I9ZSxuLmF1dG9TdGFydC5jdXJzb3JFbGVtZW50PWU/dDpudWxsfWZ1bmN0aW9uIFlvKHQsZSl7dmFyIG49dC5pbnRlcmFjdGFibGUscj10LmVsZW1lbnQsbz10LnByZXBhcmVkO2lmKFwibW91c2VcIj09PXQucG9pbnRlclR5cGUmJm4mJm4ub3B0aW9ucy5zdHlsZUN1cnNvcil7dmFyIGk9XCJcIjtpZihvLm5hbWUpe3ZhciBhPW4ub3B0aW9uc1tvLm5hbWVdLmN1cnNvckNoZWNrZXI7aT1Uby5pcy5mdW5jKGEpP2EobyxuLHIsdC5faW50ZXJhY3RpbmcpOmUuYWN0aW9ucy5tYXBbby5uYW1lXS5nZXRDdXJzb3Iobyl9WG8odC5lbGVtZW50LGl8fFwiXCIsZSl9ZWxzZSBlLmF1dG9TdGFydC5jdXJzb3JFbGVtZW50JiZYbyhlLmF1dG9TdGFydC5jdXJzb3JFbGVtZW50LFwiXCIsZSl9dmFyIE5vPXtpZDpcImF1dG8tc3RhcnQvYmFzZVwiLGJlZm9yZTpbXCJhY3Rpb25zXCIsXCJhY3Rpb25zL2RyYWdcIixcImFjdGlvbnMvcmVzaXplXCIsXCJhY3Rpb25zL2dlc3R1cmVcIl0saW5zdGFsbDpmdW5jdGlvbihlKXt2YXIgdD1lLmludGVyYWN0U3RhdGljLG49ZS5kZWZhdWx0cztlLnVzZVBsdWdpbihEby5kZWZhdWx0KSxuLmJhc2UuYWN0aW9uQ2hlY2tlcj1udWxsLG4uYmFzZS5zdHlsZUN1cnNvcj0hMCxUby5leHRlbmQobi5wZXJBY3Rpb24se21hbnVhbFN0YXJ0OiExLG1heDoxLzAsbWF4UGVyRWxlbWVudDoxLGFsbG93RnJvbTpudWxsLGlnbm9yZUZyb206bnVsbCxtb3VzZUJ1dHRvbnM6MX0pLHQubWF4SW50ZXJhY3Rpb25zPWZ1bmN0aW9uKHQpe3JldHVybiBGbyh0LGUpfSxlLmF1dG9TdGFydD17bWF4SW50ZXJhY3Rpb25zOjEvMCx3aXRoaW5JbnRlcmFjdGlvbkxpbWl0OlJvLGN1cnNvckVsZW1lbnQ6bnVsbH19LGxpc3RlbmVyczp7XCJpbnRlcmFjdGlvbnM6ZG93blwiOmZ1bmN0aW9uKHQsZSl7dmFyIG49dC5pbnRlcmFjdGlvbixyPXQucG9pbnRlcixvPXQuZXZlbnQsaT10LmV2ZW50VGFyZ2V0O24uaW50ZXJhY3RpbmcoKXx8V28obixDbyhuLHIsbyxpLGUpLGUpfSxcImludGVyYWN0aW9uczptb3ZlXCI6ZnVuY3Rpb24odCxlKXt2YXIgbixyLG8saSxhLHU7cj1lLG89KG49dCkuaW50ZXJhY3Rpb24saT1uLnBvaW50ZXIsYT1uLmV2ZW50LHU9bi5ldmVudFRhcmdldCxcIm1vdXNlXCIhPT1vLnBvaW50ZXJUeXBlfHxvLnBvaW50ZXJJc0Rvd258fG8uaW50ZXJhY3RpbmcoKXx8V28obyxDbyhvLGksYSx1LHIpLHIpLGZ1bmN0aW9uKHQsZSl7dmFyIG49dC5pbnRlcmFjdGlvbjtpZihuLnBvaW50ZXJJc0Rvd24mJiFuLmludGVyYWN0aW5nKCkmJm4ucG9pbnRlcldhc01vdmVkJiZuLnByZXBhcmVkLm5hbWUpe2UuZmlyZShcImF1dG9TdGFydDpiZWZvcmUtc3RhcnRcIix0KTt2YXIgcj1uLmludGVyYWN0YWJsZSxvPW4ucHJlcGFyZWQubmFtZTtvJiZyJiYoci5vcHRpb25zW29dLm1hbnVhbFN0YXJ0fHwhUm8ocixuLmVsZW1lbnQsbi5wcmVwYXJlZCxlKT9uLnN0b3AoKToobi5zdGFydChuLnByZXBhcmVkLHIsbi5lbGVtZW50KSxZbyhuLGUpKSl9fSh0LGUpfSxcImludGVyYWN0aW9uczpzdG9wXCI6ZnVuY3Rpb24odCxlKXt2YXIgbj10LmludGVyYWN0aW9uLHI9bi5pbnRlcmFjdGFibGU7ciYmci5vcHRpb25zLnN0eWxlQ3Vyc29yJiZYbyhuLmVsZW1lbnQsXCJcIixlKX19LG1heEludGVyYWN0aW9uczpGbyx3aXRoaW5JbnRlcmFjdGlvbkxpbWl0OlJvLHZhbGlkYXRlQWN0aW9uOnpvfTtNby5kZWZhdWx0PU5vO3ZhciBMbz17fTtmdW5jdGlvbiBCbyh0KXtyZXR1cm4oQm89XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShMbyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxMby5kZWZhdWx0PXZvaWQgMDt2YXIgVm8scW89ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09Qm8odCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9R28oKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0odyksVW89KFZvPU1vKSYmVm8uX19lc01vZHVsZT9Wbzp7ZGVmYXVsdDpWb307ZnVuY3Rpb24gR28oKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBHbz1mdW5jdGlvbigpe3JldHVybiB0fSx0fXZhciBIbz17aWQ6XCJhdXRvLXN0YXJ0L2RyYWdBeGlzXCIsbGlzdGVuZXJzOntcImF1dG9TdGFydDpiZWZvcmUtc3RhcnRcIjpmdW5jdGlvbih0LHIpe3ZhciBvPXQuaW50ZXJhY3Rpb24saT10LmV2ZW50VGFyZ2V0LGU9dC5keCxuPXQuZHk7aWYoXCJkcmFnXCI9PT1vLnByZXBhcmVkLm5hbWUpe3ZhciBhPU1hdGguYWJzKGUpLHU9TWF0aC5hYnMobikscz1vLmludGVyYWN0YWJsZS5vcHRpb25zLmRyYWcsbD1zLnN0YXJ0QXhpcyxjPXU8YT9cInhcIjphPHU/XCJ5XCI6XCJ4eVwiO2lmKG8ucHJlcGFyZWQuYXhpcz1cInN0YXJ0XCI9PT1zLmxvY2tBeGlzP2NbMF06cy5sb2NrQXhpcyxcInh5XCIhPWMmJlwieHlcIiE9PWwmJmwhPT1jKXtvLnByZXBhcmVkLm5hbWU9bnVsbDtmdW5jdGlvbiBmKHQpe2lmKHQhPT1vLmludGVyYWN0YWJsZSl7dmFyIGU9by5pbnRlcmFjdGFibGUub3B0aW9ucy5kcmFnO2lmKCFlLm1hbnVhbFN0YXJ0JiZ0LnRlc3RJZ25vcmVBbGxvdyhlLHAsaSkpe3ZhciBuPXQuZ2V0QWN0aW9uKG8uZG93blBvaW50ZXIsby5kb3duRXZlbnQsbyxwKTtpZihuJiZcImRyYWdcIj09PW4ubmFtZSYmZnVuY3Rpb24odCxlKXtpZighZSlyZXR1cm47dmFyIG49ZS5vcHRpb25zLmRyYWcuc3RhcnRBeGlzO3JldHVyblwieHlcIj09PXR8fFwieHlcIj09PW58fG49PT10fShjLHQpJiZVby5kZWZhdWx0LnZhbGlkYXRlQWN0aW9uKG4sdCxwLGkscikpcmV0dXJuIHR9fX1mb3IodmFyIHA9aTtxby5lbGVtZW50KHApOyl7dmFyIGQ9ci5pbnRlcmFjdGFibGVzLmZvckVhY2hNYXRjaChwLGYpO2lmKGQpe28ucHJlcGFyZWQubmFtZT1cImRyYWdcIixvLmludGVyYWN0YWJsZT1kLG8uZWxlbWVudD1wO2JyZWFrfXA9KDAsJC5wYXJlbnROb2RlKShwKX19fX19fTtMby5kZWZhdWx0PUhvO3ZhciBLbz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoS28sXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksS28uZGVmYXVsdD12b2lkIDA7dmFyICRvLFpvPSgkbz1NbykmJiRvLl9fZXNNb2R1bGU/JG86e2RlZmF1bHQ6JG99O2Z1bmN0aW9uIEpvKHQpe3ZhciBlPXQucHJlcGFyZWQmJnQucHJlcGFyZWQubmFtZTtpZighZSlyZXR1cm4gbnVsbDt2YXIgbj10LmludGVyYWN0YWJsZS5vcHRpb25zO3JldHVybiBuW2VdLmhvbGR8fG5bZV0uZGVsYXl9dmFyIFFvPXtpZDpcImF1dG8tc3RhcnQvaG9sZFwiLGluc3RhbGw6ZnVuY3Rpb24odCl7dmFyIGU9dC5kZWZhdWx0czt0LnVzZVBsdWdpbihaby5kZWZhdWx0KSxlLnBlckFjdGlvbi5ob2xkPTAsZS5wZXJBY3Rpb24uZGVsYXk9MH0sbGlzdGVuZXJzOntcImludGVyYWN0aW9uczpuZXdcIjpmdW5jdGlvbih0KXt0LmludGVyYWN0aW9uLmF1dG9TdGFydEhvbGRUaW1lcj1udWxsfSxcImF1dG9TdGFydDpwcmVwYXJlZFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj1KbyhlKTswPG4mJihlLmF1dG9TdGFydEhvbGRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5zdGFydChlLnByZXBhcmVkLGUuaW50ZXJhY3RhYmxlLGUuZWxlbWVudCl9LG4pKX0sXCJpbnRlcmFjdGlvbnM6bW92ZVwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LmR1cGxpY2F0ZTtlLnBvaW50ZXJXYXNNb3ZlZCYmIW4mJmNsZWFyVGltZW91dChlLmF1dG9TdGFydEhvbGRUaW1lcil9LFwiYXV0b1N0YXJ0OmJlZm9yZS1zdGFydFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb247MDxKbyhlKSYmKGUucHJlcGFyZWQubmFtZT1udWxsKX19LGdldEhvbGREdXJhdGlvbjpKb307S28uZGVmYXVsdD1Rbzt2YXIgdGk9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KHRpLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aSxcImF1dG9TdGFydFwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiBlaS5kZWZhdWx0fX0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aSxcImRyYWdBeGlzXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIG5pLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KHRpLFwiaG9sZFwiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiByaS5kZWZhdWx0fX0pLHRpLmRlZmF1bHQ9dm9pZCAwO3ZhciBlaT1vaShNbyksbmk9b2koTG8pLHJpPW9pKEtvKTtmdW5jdGlvbiBvaSh0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyIGlpPXtpZDpcImF1dG8tc3RhcnRcIixpbnN0YWxsOmZ1bmN0aW9uKHQpe3QudXNlUGx1Z2luKGVpLmRlZmF1bHQpLHQudXNlUGx1Z2luKHJpLmRlZmF1bHQpLHQudXNlUGx1Z2luKG5pLmRlZmF1bHQpfX07dGkuZGVmYXVsdD1paTt2YXIgYWk9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KGFpLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGFpLmRlZmF1bHQ9dm9pZCAwO2FpLmRlZmF1bHQ9e307dmFyIHVpPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eSh1aSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSx1aS5kZWZhdWx0PXZvaWQgMDt1aS5kZWZhdWx0PXt9O3ZhciBzaT17fTtmdW5jdGlvbiBsaSh0KXtyZXR1cm4obGk9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxzaS5kZWZhdWx0PXZvaWQgMDt2YXIgY2ksZmkscGk9aGkoRCksZGk9KGhpKGN0KSxmdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1saSh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT15aSgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSh3KSksdmk9aGkoTyk7ZnVuY3Rpb24geWkoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiB5aT1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIGhpKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX0oZmk9Y2k9Y2l8fHt9KS50b3VjaEFjdGlvbj1cInRvdWNoQWN0aW9uXCIsZmkuYm94U2l6aW5nPVwiYm94U2l6aW5nXCIsZmkubm9MaXN0ZW5lcnM9XCJub0xpc3RlbmVyc1wiO3ZhciBnaT17dG91Y2hBY3Rpb246XCJodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvdG91Y2gtYWN0aW9uXCIsYm94U2l6aW5nOlwiaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL2JveC1zaXppbmdcIn07Y2kudG91Y2hBY3Rpb24sY2kuYm94U2l6aW5nLGNpLm5vTGlzdGVuZXJzO2Z1bmN0aW9uIGJpKHQsZSxuKXtyZXR1cm4gbi50ZXN0KHQuc3R5bGVbZV18fHZpLmRlZmF1bHQud2luZG93LmdldENvbXB1dGVkU3R5bGUodClbZV0pfXZhciBtaT1cImRldi10b29sc1wiLE9pPXtpZDptaSxpbnN0YWxsOmZ1bmN0aW9uKCl7fX07c2kuZGVmYXVsdD1PaTt2YXIgd2k9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KHdpLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHdpLmRlZmF1bHQ9dm9pZCAwO3dpLmRlZmF1bHQ9e307dmFyIF9pPXt9O2Z1bmN0aW9uIFBpKHQpe3JldHVybihQaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KF9pLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLF9pLmdldFJlY3RPZmZzZXQ9QWksX2kuZGVmYXVsdD12b2lkIDA7dmFyIHhpPWtpKFYpLFNpPWtpKGN0KSxqaT1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1QaSh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1NaSgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSgkdCk7ZnVuY3Rpb24gTWkoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBNaT1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIGtpKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBFaSh0LGUpe3JldHVybiBmdW5jdGlvbih0KXtpZihBcnJheS5pc0FycmF5KHQpKXJldHVybiB0fSh0KXx8ZnVuY3Rpb24odCxlKXtpZighKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QodCl8fFwiW29iamVjdCBBcmd1bWVudHNdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCkpKXJldHVybjt2YXIgbj1bXSxyPSEwLG89ITEsaT12b2lkIDA7dHJ5e2Zvcih2YXIgYSx1PXRbU3ltYm9sLml0ZXJhdG9yXSgpOyEocj0oYT11Lm5leHQoKSkuZG9uZSkmJihuLnB1c2goYS52YWx1ZSksIWV8fG4ubGVuZ3RoIT09ZSk7cj0hMCk7fWNhdGNoKHQpe289ITAsaT10fWZpbmFsbHl7dHJ5e3J8fG51bGw9PXUucmV0dXJufHx1LnJldHVybigpfWZpbmFsbHl7aWYobyl0aHJvdyBpfX1yZXR1cm4gbn0odCxlKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKX0oKX1mdW5jdGlvbiBUaSh0LGUpe2Zvcih2YXIgbj0wO248ZS5sZW5ndGg7bisrKXt2YXIgcj1lW25dO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxyLmtleSxyKX19ZnVuY3Rpb24gRGkodCxlLG4pe3JldHVybiBlIGluIHQ/T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fXZhciBJaT1mdW5jdGlvbigpe2Z1bmN0aW9uIGUodCl7IWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0odGhpcyxlKSx0aGlzLmludGVyYWN0aW9uPXQsRGkodGhpcyxcInN0YXRlc1wiLFtdKSxEaSh0aGlzLFwic3RhcnRPZmZzZXRcIix7bGVmdDowLHJpZ2h0OjAsdG9wOjAsYm90dG9tOjB9KSxEaSh0aGlzLFwic3RhcnREZWx0YVwiLG51bGwpLERpKHRoaXMsXCJyZXN1bHRcIixudWxsKSxEaSh0aGlzLFwiZW5kUmVzdWx0XCIsbnVsbCksRGkodGhpcyxcImVkZ2VzXCIsdm9pZCAwKSx0aGlzLnJlc3VsdD16aSgpfXZhciB0LG4scjtyZXR1cm4gdD1lLChuPVt7a2V5Olwic3RhcnRcIix2YWx1ZTpmdW5jdGlvbih0LGUpe3ZhciBuPXQucGhhc2Uscj10aGlzLmludGVyYWN0aW9uLG89ZnVuY3Rpb24odCl7dmFyIG49dC5pbnRlcmFjdGFibGUub3B0aW9uc1t0LnByZXBhcmVkLm5hbWVdLGU9bi5tb2RpZmllcnM7aWYoZSYmZS5sZW5ndGgpcmV0dXJuIGUuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiF0Lm9wdGlvbnN8fCExIT09dC5vcHRpb25zLmVuYWJsZWR9KTtyZXR1cm5bXCJzbmFwXCIsXCJzbmFwU2l6ZVwiLFwic25hcEVkZ2VzXCIsXCJyZXN0cmljdFwiLFwicmVzdHJpY3RFZGdlc1wiLFwicmVzdHJpY3RTaXplXCJdLm1hcChmdW5jdGlvbih0KXt2YXIgZT1uW3RdO3JldHVybiBlJiZlLmVuYWJsZWQmJntvcHRpb25zOmUsbWV0aG9kczplLl9tZXRob2RzfX0pLmZpbHRlcihmdW5jdGlvbih0KXtyZXR1cm4hIXR9KX0ocik7dGhpcy5wcmVwYXJlU3RhdGVzKG8pLHRoaXMuZWRnZXM9KDAsU2kuZGVmYXVsdCkoe30sci5lZGdlcyksdGhpcy5zdGFydE9mZnNldD1BaShyLnJlY3QsZSk7dmFyIGk9e3BoYXNlOm4scGFnZUNvb3JkczplLHByZUVuZDohKHRoaXMuc3RhcnREZWx0YT17eDowLHk6MH0pfTtyZXR1cm4gdGhpcy5yZXN1bHQ9emkoKSx0aGlzLnN0YXJ0QWxsKGkpLHRoaXMucmVzdWx0PXRoaXMuc2V0QWxsKGkpfX0se2tleTpcImZpbGxBcmdcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmludGVyYWN0aW9uO3QuaW50ZXJhY3Rpb249ZSx0LmludGVyYWN0YWJsZT1lLmludGVyYWN0YWJsZSx0LmVsZW1lbnQ9ZS5lbGVtZW50LHQucmVjdD10LnJlY3R8fGUucmVjdCx0LmVkZ2VzPXRoaXMuZWRnZXMsdC5zdGFydE9mZnNldD10aGlzLnN0YXJ0T2Zmc2V0fX0se2tleTpcInN0YXJ0QWxsXCIsdmFsdWU6ZnVuY3Rpb24odCl7dGhpcy5maWxsQXJnKHQpO2Zvcih2YXIgZT0wO2U8dGhpcy5zdGF0ZXMubGVuZ3RoO2UrKyl7dmFyIG49dGhpcy5zdGF0ZXNbZV07bi5tZXRob2RzLnN0YXJ0JiYodC5zdGF0ZT1uKS5tZXRob2RzLnN0YXJ0KHQpfX19LHtrZXk6XCJzZXRBbGxcIix2YWx1ZTpmdW5jdGlvbih0KXt0aGlzLmZpbGxBcmcodCk7dmFyIGU9dC5waGFzZSxuPXQucHJlRW5kLHI9dC5za2lwTW9kaWZpZXJzLG89dC5yZWN0O3QuY29vcmRzPSgwLFNpLmRlZmF1bHQpKHt9LHQucGFnZUNvb3JkcyksdC5yZWN0PSgwLFNpLmRlZmF1bHQpKHt9LG8pO2Zvcih2YXIgaT1yP3RoaXMuc3RhdGVzLnNsaWNlKHIpOnRoaXMuc3RhdGVzLGE9emkodC5jb29yZHMsdC5yZWN0KSx1PTA7dTxpLmxlbmd0aDt1Kyspe3ZhciBzPWlbdV0sbD1zLm9wdGlvbnMsYz0oMCxTaS5kZWZhdWx0KSh7fSx0LmNvb3JkcyksZj1udWxsO3MubWV0aG9kcy5zZXQmJnRoaXMuc2hvdWxkRG8obCxuLGUpJiYoZj0odC5zdGF0ZT1zKS5tZXRob2RzLnNldCh0KSxqaS5hZGRFZGdlcyh0aGlzLmludGVyYWN0aW9uLmVkZ2VzLHQucmVjdCx7eDp0LmNvb3Jkcy54LWMueCx5OnQuY29vcmRzLnktYy55fSkpLGEuZXZlbnRQcm9wcy5wdXNoKGYpfWEuZGVsdGEueD10LmNvb3Jkcy54LXQucGFnZUNvb3Jkcy54LGEuZGVsdGEueT10LmNvb3Jkcy55LXQucGFnZUNvb3Jkcy55LGEucmVjdERlbHRhLmxlZnQ9dC5yZWN0LmxlZnQtby5sZWZ0LGEucmVjdERlbHRhLnJpZ2h0PXQucmVjdC5yaWdodC1vLnJpZ2h0LGEucmVjdERlbHRhLnRvcD10LnJlY3QudG9wLW8udG9wLGEucmVjdERlbHRhLmJvdHRvbT10LnJlY3QuYm90dG9tLW8uYm90dG9tO3ZhciBwPXRoaXMucmVzdWx0LmNvb3JkcyxkPXRoaXMucmVzdWx0LnJlY3Q7aWYocCYmZCl7dmFyIHY9YS5yZWN0LmxlZnQhPT1kLmxlZnR8fGEucmVjdC5yaWdodCE9PWQucmlnaHR8fGEucmVjdC50b3AhPT1kLnRvcHx8YS5yZWN0LmJvdHRvbSE9PWQuYm90dG9tO2EuY2hhbmdlZD12fHxwLnghPT1hLmNvb3Jkcy54fHxwLnkhPT1hLmNvb3Jkcy55fXJldHVybiBhfX0se2tleTpcImFwcGx5VG9JbnRlcmFjdGlvblwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuaW50ZXJhY3Rpb24sbj10LnBoYXNlLHI9ZS5jb29yZHMuY3VyLG89ZS5jb29yZHMuc3RhcnQsaT10aGlzLnJlc3VsdCxhPXRoaXMuc3RhcnREZWx0YSx1PWkuZGVsdGE7XCJzdGFydFwiPT09biYmKDAsU2kuZGVmYXVsdCkodGhpcy5zdGFydERlbHRhLGkuZGVsdGEpO2Zvcih2YXIgcz0wO3M8W1tvLGFdLFtyLHVdXS5sZW5ndGg7cysrKXt2YXIgbD1FaShbW28sYV0sW3IsdV1dW3NdLDIpLGM9bFswXSxmPWxbMV07Yy5wYWdlLngrPWYueCxjLnBhZ2UueSs9Zi55LGMuY2xpZW50LngrPWYueCxjLmNsaWVudC55Kz1mLnl9dmFyIHA9dGhpcy5yZXN1bHQucmVjdERlbHRhLGQ9dC5yZWN0fHxlLnJlY3Q7ZC5sZWZ0Kz1wLmxlZnQsZC5yaWdodCs9cC5yaWdodCxkLnRvcCs9cC50b3AsZC5ib3R0b20rPXAuYm90dG9tLGQud2lkdGg9ZC5yaWdodC1kLmxlZnQsZC5oZWlnaHQ9ZC5ib3R0b20tZC50b3B9fSx7a2V5Olwic2V0QW5kQXBwbHlcIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10aGlzLmludGVyYWN0aW9uLG49dC5waGFzZSxyPXQucHJlRW5kLG89dC5za2lwTW9kaWZpZXJzLGk9dGhpcy5zZXRBbGwoe3ByZUVuZDpyLHBoYXNlOm4scGFnZUNvb3Jkczp0Lm1vZGlmaWVkQ29vcmRzfHxlLmNvb3Jkcy5jdXIucGFnZX0pO2lmKCEodGhpcy5yZXN1bHQ9aSkuY2hhbmdlZCYmKCFvfHxvPHRoaXMuc3RhdGVzLmxlbmd0aCkmJmUuaW50ZXJhY3RpbmcoKSlyZXR1cm4hMTtpZih0Lm1vZGlmaWVkQ29vcmRzKXt2YXIgYT1lLmNvb3Jkcy5jdXIucGFnZSx1PXQubW9kaWZpZWRDb29yZHMueC1hLngscz10Lm1vZGlmaWVkQ29vcmRzLnktYS55O2kuY29vcmRzLngrPXUsaS5jb29yZHMueSs9cyxpLmRlbHRhLngrPXUsaS5kZWx0YS55Kz1zfXRoaXMuYXBwbHlUb0ludGVyYWN0aW9uKHQpfX0se2tleTpcImJlZm9yZUVuZFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LmV2ZW50LHI9dGhpcy5zdGF0ZXM7aWYociYmci5sZW5ndGgpe2Zvcih2YXIgbz0hMSxpPTA7aTxyLmxlbmd0aDtpKyspe3ZhciBhPXJbaV0sdT0odC5zdGF0ZT1hKS5vcHRpb25zLHM9YS5tZXRob2RzLGw9cy5iZWZvcmVFbmQmJnMuYmVmb3JlRW5kKHQpO2lmKGwpcmV0dXJuIHRoaXMuZW5kUmVzdWx0PWwsITE7bz1vfHwhbyYmdGhpcy5zaG91bGREbyh1LCEwLHQucGhhc2UsITApfW8mJmUubW92ZSh7ZXZlbnQ6bixwcmVFbmQ6ITB9KX19fSx7a2V5Olwic3RvcFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb247aWYodGhpcy5zdGF0ZXMmJnRoaXMuc3RhdGVzLmxlbmd0aCl7dmFyIG49KDAsU2kuZGVmYXVsdCkoe3N0YXRlczp0aGlzLnN0YXRlcyxpbnRlcmFjdGFibGU6ZS5pbnRlcmFjdGFibGUsZWxlbWVudDplLmVsZW1lbnQscmVjdDpudWxsfSx0KTt0aGlzLmZpbGxBcmcobik7Zm9yKHZhciByPTA7cjx0aGlzLnN0YXRlcy5sZW5ndGg7cisrKXt2YXIgbz10aGlzLnN0YXRlc1tyXTsobi5zdGF0ZT1vKS5tZXRob2RzLnN0b3AmJm8ubWV0aG9kcy5zdG9wKG4pfXRoaXMuc3RhdGVzPW51bGwsdGhpcy5lbmRSZXN1bHQ9bnVsbH19fSx7a2V5OlwicHJlcGFyZVN0YXRlc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMuc3RhdGVzPVtdO2Zvcih2YXIgZT0wO2U8dC5sZW5ndGg7ZSsrKXt2YXIgbj10W2VdLHI9bi5vcHRpb25zLG89bi5tZXRob2RzLGk9bi5uYW1lO3ImJiExPT09ci5lbmFibGVkfHx0aGlzLnN0YXRlcy5wdXNoKHtvcHRpb25zOnIsbWV0aG9kczpvLGluZGV4OmUsbmFtZTppfSl9cmV0dXJuIHRoaXMuc3RhdGVzfX0se2tleTpcInJlc3RvcmVJbnRlcmFjdGlvbkNvb3Jkc1wiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj1lLmNvb3JkcyxyPWUucmVjdCxvPWUubW9kaWZpY2F0aW9uO2lmKG8ucmVzdWx0KXtmb3IodmFyIGk9by5zdGFydERlbHRhLGE9by5yZXN1bHQsdT1hLmRlbHRhLHM9YS5yZWN0RGVsdGEsbD1bW24uc3RhcnQsaV0sW24uY3VyLHVdXSxjPTA7YzxsLmxlbmd0aDtjKyspe3ZhciBmPUVpKGxbY10sMikscD1mWzBdLGQ9ZlsxXTtwLnBhZ2UueC09ZC54LHAucGFnZS55LT1kLnkscC5jbGllbnQueC09ZC54LHAuY2xpZW50LnktPWQueX1yLmxlZnQtPXMubGVmdCxyLnJpZ2h0LT1zLnJpZ2h0LHIudG9wLT1zLnRvcCxyLmJvdHRvbS09cy5ib3R0b219fX0se2tleTpcInNob3VsZERvXCIsdmFsdWU6ZnVuY3Rpb24odCxlLG4scil7cmV0dXJuISghdHx8ITE9PT10LmVuYWJsZWR8fHImJiF0LmVuZE9ubHl8fHQuZW5kT25seSYmIWV8fFwic3RhcnRcIj09PW4mJiF0LnNldFN0YXJ0KX19LHtrZXk6XCJjb3B5RnJvbVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMuc3RhcnRPZmZzZXQ9dC5zdGFydE9mZnNldCx0aGlzLnN0YXJ0RGVsdGE9dC5zdGFydERlbHRhLHRoaXMuZWRnZXM9dC5lZGdlcyx0aGlzLnN0YXRlcz10LnN0YXRlcy5tYXAoZnVuY3Rpb24odCl7cmV0dXJuKDAseGkuZGVmYXVsdCkodCl9KSx0aGlzLnJlc3VsdD16aSgoMCxTaS5kZWZhdWx0KSh7fSx0LnJlc3VsdC5jb29yZHMpLCgwLFNpLmRlZmF1bHQpKHt9LHQucmVzdWx0LnJlY3QpKX19LHtrZXk6XCJkZXN0cm95XCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gdGhpcyl0aGlzW3RdPW51bGx9fV0pJiZUaSh0LnByb3RvdHlwZSxuKSxyJiZUaSh0LHIpLGV9KCk7ZnVuY3Rpb24gemkodCxlKXtyZXR1cm57cmVjdDplLGNvb3Jkczp0LGRlbHRhOnt4OjAseTowfSxyZWN0RGVsdGE6e2xlZnQ6MCxyaWdodDowLHRvcDowLGJvdHRvbTowfSxldmVudFByb3BzOltdLGNoYW5nZWQ6ITB9fWZ1bmN0aW9uIEFpKHQsZSl7cmV0dXJuIHQ/e2xlZnQ6ZS54LXQubGVmdCx0b3A6ZS55LXQudG9wLHJpZ2h0OnQucmlnaHQtZS54LGJvdHRvbTp0LmJvdHRvbS1lLnl9OntsZWZ0OjAsdG9wOjAscmlnaHQ6MCxib3R0b206MH19X2kuZGVmYXVsdD1JaTt2YXIgQ2k9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KENpLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLENpLm1ha2VNb2RpZmllcj1mdW5jdGlvbih0LHIpe2Z1bmN0aW9uIGUodCl7dmFyIGU9dHx8e307Zm9yKHZhciBuIGluIGUuZW5hYmxlZD0hMSE9PWUuZW5hYmxlZCxvKW4gaW4gZXx8KGVbbl09b1tuXSk7cmV0dXJue29wdGlvbnM6ZSxtZXRob2RzOmksbmFtZTpyfX12YXIgbz10LmRlZmF1bHRzLGk9e3N0YXJ0OnQuc3RhcnQsc2V0OnQuc2V0LGJlZm9yZUVuZDp0LmJlZm9yZUVuZCxzdG9wOnQuc3RvcH07ciYmXCJzdHJpbmdcIj09dHlwZW9mIHImJihlLl9kZWZhdWx0cz1vLGUuX21ldGhvZHM9aSk7cmV0dXJuIGV9LENpLmFkZEV2ZW50TW9kaWZpZXJzPUZpLENpLmRlZmF1bHQ9dm9pZCAwO3ZhciBXaSxSaT0oV2k9X2kpJiZXaS5fX2VzTW9kdWxlP1dpOntkZWZhdWx0OldpfTtmdW5jdGlvbiBGaSh0KXt2YXIgZT10LmlFdmVudCxuPXQuaW50ZXJhY3Rpb24ubW9kaWZpY2F0aW9uLnJlc3VsdDtuJiYoZS5tb2RpZmllcnM9bi5ldmVudFByb3BzKX12YXIgWGk9e2lkOlwibW9kaWZpZXJzL2Jhc2VcIixpbnN0YWxsOmZ1bmN0aW9uKHQpe3QuZGVmYXVsdHMucGVyQWN0aW9uLm1vZGlmaWVycz1bXX0sbGlzdGVuZXJzOntcImludGVyYWN0aW9uczpuZXdcIjpmdW5jdGlvbih0KXt2YXIgZT10LmludGVyYWN0aW9uO2UubW9kaWZpY2F0aW9uPW5ldyBSaS5kZWZhdWx0KGUpfSxcImludGVyYWN0aW9uczpiZWZvcmUtYWN0aW9uLXN0YXJ0XCI6ZnVuY3Rpb24odCl7dmFyIGU9dC5pbnRlcmFjdGlvbi5tb2RpZmljYXRpb247ZS5zdGFydCh0LHQuaW50ZXJhY3Rpb24uY29vcmRzLnN0YXJ0LnBhZ2UpLHQuaW50ZXJhY3Rpb24uZWRnZXM9ZS5lZGdlcyxlLmFwcGx5VG9JbnRlcmFjdGlvbih0KX0sXCJpbnRlcmFjdGlvbnM6YmVmb3JlLWFjdGlvbi1tb3ZlXCI6ZnVuY3Rpb24odCl7cmV0dXJuIHQuaW50ZXJhY3Rpb24ubW9kaWZpY2F0aW9uLnNldEFuZEFwcGx5KHQpfSxcImludGVyYWN0aW9uczpiZWZvcmUtYWN0aW9uLWVuZFwiOmZ1bmN0aW9uKHQpe3JldHVybiB0LmludGVyYWN0aW9uLm1vZGlmaWNhdGlvbi5iZWZvcmVFbmQodCl9LFwiaW50ZXJhY3Rpb25zOmFjdGlvbi1zdGFydFwiOkZpLFwiaW50ZXJhY3Rpb25zOmFjdGlvbi1tb3ZlXCI6RmksXCJpbnRlcmFjdGlvbnM6YWN0aW9uLWVuZFwiOkZpLFwiaW50ZXJhY3Rpb25zOmFmdGVyLWFjdGlvbi1zdGFydFwiOmZ1bmN0aW9uKHQpe3JldHVybiB0LmludGVyYWN0aW9uLm1vZGlmaWNhdGlvbi5yZXN0b3JlSW50ZXJhY3Rpb25Db29yZHModCl9LFwiaW50ZXJhY3Rpb25zOmFmdGVyLWFjdGlvbi1tb3ZlXCI6ZnVuY3Rpb24odCl7cmV0dXJuIHQuaW50ZXJhY3Rpb24ubW9kaWZpY2F0aW9uLnJlc3RvcmVJbnRlcmFjdGlvbkNvb3Jkcyh0KX0sXCJpbnRlcmFjdGlvbnM6c3RvcFwiOmZ1bmN0aW9uKHQpe3JldHVybiB0LmludGVyYWN0aW9uLm1vZGlmaWNhdGlvbi5zdG9wKHQpfX0sYmVmb3JlOltcImFjdGlvbnNcIixcImFjdGlvbi9kcmFnXCIsXCJhY3Rpb25zL3Jlc2l6ZVwiLFwiYWN0aW9ucy9nZXN0dXJlXCJdfTtDaS5kZWZhdWx0PVhpO3ZhciBZaT17fTtmdW5jdGlvbiBOaSh0KXtyZXR1cm4oTmk9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShZaSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxZaS5hZGRUb3RhbD1WaSxZaS5hcHBseVBlbmRpbmc9VWksWWkuZGVmYXVsdD12b2lkIDA7dmFyIExpPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PU5pKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPUJpKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KCR0KTtmdW5jdGlvbiBCaSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIEJpPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gVmkodCl7dC5wb2ludGVySXNEb3duJiYoSGkodC5jb29yZHMuY3VyLHQub2Zmc2V0LnRvdGFsKSx0Lm9mZnNldC5wZW5kaW5nLng9MCx0Lm9mZnNldC5wZW5kaW5nLnk9MCl9ZnVuY3Rpb24gcWkodCl7VWkodC5pbnRlcmFjdGlvbil9ZnVuY3Rpb24gVWkodCl7aWYoIShlPXQpLm9mZnNldC5wZW5kaW5nLngmJiFlLm9mZnNldC5wZW5kaW5nLnkpcmV0dXJuITE7dmFyIGUsbj10Lm9mZnNldC5wZW5kaW5nO3JldHVybiBIaSh0LmNvb3Jkcy5jdXIsbiksSGkodC5jb29yZHMuZGVsdGEsbiksTGkuYWRkRWRnZXModC5lZGdlcyx0LnJlY3Qsbiksbi54PTAsIShuLnk9MCl9ZnVuY3Rpb24gR2kodCl7dmFyIGU9dC54LG49dC55O3RoaXMub2Zmc2V0LnBlbmRpbmcueCs9ZSx0aGlzLm9mZnNldC5wZW5kaW5nLnkrPW4sdGhpcy5vZmZzZXQudG90YWwueCs9ZSx0aGlzLm9mZnNldC50b3RhbC55Kz1ufWZ1bmN0aW9uIEhpKHQsZSl7dmFyIG49dC5wYWdlLHI9dC5jbGllbnQsbz1lLngsaT1lLnk7bi54Kz1vLG4ueSs9aSxyLngrPW8sci55Kz1pfUVuLl9Qcm94eU1ldGhvZHMub2Zmc2V0Qnk9XCJcIjt2YXIgS2k9e2lkOlwib2Zmc2V0XCIsaW5zdGFsbDpmdW5jdGlvbih0KXt0LkludGVyYWN0aW9uLnByb3RvdHlwZS5vZmZzZXRCeT1HaX0sbGlzdGVuZXJzOntcImludGVyYWN0aW9uczpuZXdcIjpmdW5jdGlvbih0KXt0LmludGVyYWN0aW9uLm9mZnNldD17dG90YWw6e3g6MCx5OjB9LHBlbmRpbmc6e3g6MCx5OjB9fX0sXCJpbnRlcmFjdGlvbnM6dXBkYXRlLXBvaW50ZXJcIjpmdW5jdGlvbih0KXtyZXR1cm4gVmkodC5pbnRlcmFjdGlvbil9LFwiaW50ZXJhY3Rpb25zOmJlZm9yZS1hY3Rpb24tc3RhcnRcIjpxaSxcImludGVyYWN0aW9uczpiZWZvcmUtYWN0aW9uLW1vdmVcIjpxaSxcImludGVyYWN0aW9uczpiZWZvcmUtYWN0aW9uLWVuZFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb247aWYoVWkoZSkpcmV0dXJuIGUubW92ZSh7b2Zmc2V0OiEwfSksZS5lbmQoKSwhMX0sXCJpbnRlcmFjdGlvbnM6c3RvcFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb247ZS5vZmZzZXQudG90YWwueD0wLGUub2Zmc2V0LnRvdGFsLnk9MCxlLm9mZnNldC5wZW5kaW5nLng9MCxlLm9mZnNldC5wZW5kaW5nLnk9MH19fTtZaS5kZWZhdWx0PUtpO3ZhciAkaT17fTtmdW5jdGlvbiBaaSh0KXtyZXR1cm4oWmk9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eSgkaSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSwkaS5kZWZhdWx0PSRpLkluZXJ0aWFTdGF0ZT12b2lkIDA7dmFyIEppPXVhKF9pKSxRaT1hYShDaSksdGE9dWEoWWkpLGVhPWFhKCQpLG5hPXVhKEV0KSxyYT1hYSh3KSxvYT11YShvZSk7ZnVuY3Rpb24gaWEoKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBXZWFrTWFwKXJldHVybiBudWxsO3ZhciB0PW5ldyBXZWFrTWFwO3JldHVybiBpYT1mdW5jdGlvbigpe3JldHVybiB0fSx0fWZ1bmN0aW9uIGFhKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PVppKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPWlhKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfXJldHVybiBuLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pLG59ZnVuY3Rpb24gdWEodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIHNhKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBsYSh0LGUsbil7cmV0dXJuIGUgaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9dmFyIGNhPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0KXshZnVuY3Rpb24odCxlKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfSh0aGlzLGUpLHRoaXMuaW50ZXJhY3Rpb249dCxsYSh0aGlzLFwiYWN0aXZlXCIsITEpLGxhKHRoaXMsXCJpc01vZGlmaWVkXCIsITEpLGxhKHRoaXMsXCJzbW9vdGhFbmRcIiwhMSksbGEodGhpcyxcImFsbG93UmVzdW1lXCIsITEpLGxhKHRoaXMsXCJtb2RpZmljYXRpb25cIixudWxsKSxsYSh0aGlzLFwibW9kaWZpZXJDb3VudFwiLDApLGxhKHRoaXMsXCJtb2RpZmllckFyZ1wiLG51bGwpLGxhKHRoaXMsXCJzdGFydENvb3Jkc1wiLG51bGwpLGxhKHRoaXMsXCJ0MFwiLDApLGxhKHRoaXMsXCJ2MFwiLDApLGxhKHRoaXMsXCJ0ZVwiLDApLGxhKHRoaXMsXCJ0YXJnZXRPZmZzZXRcIixudWxsKSxsYSh0aGlzLFwibW9kaWZpZWRPZmZzZXRcIixudWxsKSxsYSh0aGlzLFwiY3VycmVudE9mZnNldFwiLG51bGwpLGxhKHRoaXMsXCJsYW1iZGFfdjBcIiwwKSxsYSh0aGlzLFwib25lX3ZlX3YwXCIsMCksbGEodGhpcyxcInRpbWVvdXRcIixudWxsKX12YXIgdCxuLHI7cmV0dXJuIHQ9ZSwobj1be2tleTpcInN0YXJ0XCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5pbnRlcmFjdGlvbixuPWZhKGUpO2lmKCFufHwhbi5lbmFibGVkKXJldHVybiExO3ZhciByPWUuY29vcmRzLnZlbG9jaXR5LmNsaWVudCxvPSgwLG5hLmRlZmF1bHQpKHIueCxyLnkpLGk9dGhpcy5tb2RpZmljYXRpb258fCh0aGlzLm1vZGlmaWNhdGlvbj1uZXcgSmkuZGVmYXVsdChlKSk7aWYoaS5jb3B5RnJvbShlLm1vZGlmaWNhdGlvbiksdGhpcy50MD1lLl9ub3coKSx0aGlzLmFsbG93UmVzdW1lPW4uYWxsb3dSZXN1bWUsdGhpcy52MD1vLHRoaXMuY3VycmVudE9mZnNldD17eDowLHk6MH0sdGhpcy5zdGFydENvb3Jkcz1lLmNvb3Jkcy5jdXIucGFnZSx0aGlzLm1vZGlmaWVyQXJnPXtpbnRlcmFjdGlvbjplLGludGVyYWN0YWJsZTplLmludGVyYWN0YWJsZSxlbGVtZW50OmUuZWxlbWVudCxyZWN0OmUucmVjdCxlZGdlczplLmVkZ2VzLHBhZ2VDb29yZHM6dGhpcy5zdGFydENvb3JkcyxwcmVFbmQ6ITAscGhhc2U6XCJpbmVydGlhc3RhcnRcIn0sdGhpcy50MC1lLmNvb3Jkcy5jdXIudGltZVN0YW1wPDUwJiZvPm4ubWluU3BlZWQmJm8+bi5lbmRTcGVlZCl0aGlzLnN0YXJ0SW5lcnRpYSgpO2Vsc2V7aWYoaS5yZXN1bHQ9aS5zZXRBbGwodGhpcy5tb2RpZmllckFyZyksIWkucmVzdWx0LmNoYW5nZWQpcmV0dXJuITE7dGhpcy5zdGFydFNtb290aEVuZCgpfXJldHVybiBlLm1vZGlmaWNhdGlvbi5yZXN1bHQucmVjdD1udWxsLGUub2Zmc2V0QnkodGhpcy50YXJnZXRPZmZzZXQpLGUuX2RvUGhhc2Uoe2ludGVyYWN0aW9uOmUsZXZlbnQ6dCxwaGFzZTpcImluZXJ0aWFzdGFydFwifSksZS5vZmZzZXRCeSh7eDotdGhpcy50YXJnZXRPZmZzZXQueCx5Oi10aGlzLnRhcmdldE9mZnNldC55fSksZS5tb2RpZmljYXRpb24ucmVzdWx0LnJlY3Q9bnVsbCx0aGlzLmFjdGl2ZT0hMCxlLnNpbXVsYXRpb249dGhpcywhMH19LHtrZXk6XCJzdGFydEluZXJ0aWFcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXMsZT10aGlzLmludGVyYWN0aW9uLmNvb3Jkcy52ZWxvY2l0eS5jbGllbnQsbj1mYSh0aGlzLmludGVyYWN0aW9uKSxyPW4ucmVzaXN0YW5jZSxvPS1NYXRoLmxvZyhuLmVuZFNwZWVkL3RoaXMudjApL3I7dGhpcy50YXJnZXRPZmZzZXQ9e3g6KGUueC1vKS9yLHk6KGUueS1vKS9yfSx0aGlzLnRlPW8sdGhpcy5sYW1iZGFfdjA9ci90aGlzLnYwLHRoaXMub25lX3ZlX3YwPTEtbi5lbmRTcGVlZC90aGlzLnYwO3ZhciBpPXRoaXMubW9kaWZpY2F0aW9uLGE9dGhpcy5tb2RpZmllckFyZzthLnBhZ2VDb29yZHM9e3g6dGhpcy5zdGFydENvb3Jkcy54K3RoaXMudGFyZ2V0T2Zmc2V0LngseTp0aGlzLnN0YXJ0Q29vcmRzLnkrdGhpcy50YXJnZXRPZmZzZXQueX0saS5yZXN1bHQ9aS5zZXRBbGwoYSksaS5yZXN1bHQuY2hhbmdlZCYmKHRoaXMuaXNNb2RpZmllZD0hMCx0aGlzLm1vZGlmaWVkT2Zmc2V0PXt4OnRoaXMudGFyZ2V0T2Zmc2V0LngraS5yZXN1bHQuZGVsdGEueCx5OnRoaXMudGFyZ2V0T2Zmc2V0LnkraS5yZXN1bHQuZGVsdGEueX0pLHRoaXMudGltZW91dD1vYS5kZWZhdWx0LnJlcXVlc3QoZnVuY3Rpb24oKXtyZXR1cm4gdC5pbmVydGlhVGljaygpfSl9fSx7a2V5Olwic3RhcnRTbW9vdGhFbmRcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PXRoaXM7dGhpcy5zbW9vdGhFbmQ9ITAsdGhpcy5pc01vZGlmaWVkPSEwLHRoaXMudGFyZ2V0T2Zmc2V0PXt4OnRoaXMubW9kaWZpY2F0aW9uLnJlc3VsdC5kZWx0YS54LHk6dGhpcy5tb2RpZmljYXRpb24ucmVzdWx0LmRlbHRhLnl9LHRoaXMudGltZW91dD1vYS5kZWZhdWx0LnJlcXVlc3QoZnVuY3Rpb24oKXtyZXR1cm4gdC5zbW9vdGhFbmRUaWNrKCl9KX19LHtrZXk6XCJpbmVydGlhVGlja1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQsZSxuLHIsbyxpLGEsdT10aGlzLHM9dGhpcy5pbnRlcmFjdGlvbixsPWZhKHMpLnJlc2lzdGFuY2UsYz0ocy5fbm93KCktdGhpcy50MCkvMWUzO2lmKGM8dGhpcy50ZSl7dmFyIGYscD0xLShNYXRoLmV4cCgtbCpjKS10aGlzLmxhbWJkYV92MCkvdGhpcy5vbmVfdmVfdjAsZD17eDooZj10aGlzLmlzTW9kaWZpZWQ/KGU9dD0wLG49dGhpcy50YXJnZXRPZmZzZXQueCxyPXRoaXMudGFyZ2V0T2Zmc2V0Lnksbz10aGlzLm1vZGlmaWVkT2Zmc2V0LngsaT10aGlzLm1vZGlmaWVkT2Zmc2V0Lnkse3g6cGEoYT1wLHQsbixvKSx5OnBhKGEsZSxyLGkpfSk6e3g6dGhpcy50YXJnZXRPZmZzZXQueCpwLHk6dGhpcy50YXJnZXRPZmZzZXQueSpwfSkueC10aGlzLmN1cnJlbnRPZmZzZXQueCx5OmYueS10aGlzLmN1cnJlbnRPZmZzZXQueX07dGhpcy5jdXJyZW50T2Zmc2V0LngrPWQueCx0aGlzLmN1cnJlbnRPZmZzZXQueSs9ZC55LHMub2Zmc2V0QnkoZCkscy5tb3ZlKCksdGhpcy50aW1lb3V0PW9hLmRlZmF1bHQucmVxdWVzdChmdW5jdGlvbigpe3JldHVybiB1LmluZXJ0aWFUaWNrKCl9KX1lbHNlIHMub2Zmc2V0Qnkoe3g6dGhpcy5tb2RpZmllZE9mZnNldC54LXRoaXMuY3VycmVudE9mZnNldC54LHk6dGhpcy5tb2RpZmllZE9mZnNldC55LXRoaXMuY3VycmVudE9mZnNldC55fSksdGhpcy5lbmQoKX19LHtrZXk6XCJzbW9vdGhFbmRUaWNrXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD10aGlzLGU9dGhpcy5pbnRlcmFjdGlvbixuPWUuX25vdygpLXRoaXMudDAscj1mYShlKS5zbW9vdGhFbmREdXJhdGlvbjtpZihuPHIpe3ZhciBvPWRhKG4sMCx0aGlzLnRhcmdldE9mZnNldC54LHIpLGk9ZGEobiwwLHRoaXMudGFyZ2V0T2Zmc2V0LnksciksYT17eDpvLXRoaXMuY3VycmVudE9mZnNldC54LHk6aS10aGlzLmN1cnJlbnRPZmZzZXQueX07dGhpcy5jdXJyZW50T2Zmc2V0LngrPWEueCx0aGlzLmN1cnJlbnRPZmZzZXQueSs9YS55LGUub2Zmc2V0QnkoYSksZS5tb3ZlKHtza2lwTW9kaWZpZXJzOnRoaXMubW9kaWZpZXJDb3VudH0pLHRoaXMudGltZW91dD1vYS5kZWZhdWx0LnJlcXVlc3QoZnVuY3Rpb24oKXtyZXR1cm4gdC5zbW9vdGhFbmRUaWNrKCl9KX1lbHNlIGUub2Zmc2V0Qnkoe3g6dGhpcy50YXJnZXRPZmZzZXQueC10aGlzLmN1cnJlbnRPZmZzZXQueCx5OnRoaXMudGFyZ2V0T2Zmc2V0LnktdGhpcy5jdXJyZW50T2Zmc2V0Lnl9KSx0aGlzLmVuZCgpfX0se2tleTpcInJlc3VtZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBlPXQucG9pbnRlcixuPXQuZXZlbnQscj10LmV2ZW50VGFyZ2V0LG89dGhpcy5pbnRlcmFjdGlvbjtvLm9mZnNldEJ5KHt4Oi10aGlzLmN1cnJlbnRPZmZzZXQueCx5Oi10aGlzLmN1cnJlbnRPZmZzZXQueX0pLG8udXBkYXRlUG9pbnRlcihlLG4sciwhMCksby5fZG9QaGFzZSh7aW50ZXJhY3Rpb246byxldmVudDpuLHBoYXNlOlwicmVzdW1lXCJ9KSwoMCx6dC5jb3B5Q29vcmRzKShvLmNvb3Jkcy5wcmV2LG8uY29vcmRzLmN1ciksdGhpcy5zdG9wKCl9fSx7a2V5OlwiZW5kXCIsdmFsdWU6ZnVuY3Rpb24oKXt0aGlzLmludGVyYWN0aW9uLm1vdmUoKSx0aGlzLmludGVyYWN0aW9uLmVuZCgpLHRoaXMuc3RvcCgpfX0se2tleTpcInN0b3BcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMuYWN0aXZlPXRoaXMuc21vb3RoRW5kPSExLHRoaXMuaW50ZXJhY3Rpb24uc2ltdWxhdGlvbj1udWxsLG9hLmRlZmF1bHQuY2FuY2VsKHRoaXMudGltZW91dCl9fV0pJiZzYSh0LnByb3RvdHlwZSxuKSxyJiZzYSh0LHIpLGV9KCk7ZnVuY3Rpb24gZmEodCl7dmFyIGU9dC5pbnRlcmFjdGFibGUsbj10LnByZXBhcmVkO3JldHVybiBlJiZlLm9wdGlvbnMmJm4ubmFtZSYmZS5vcHRpb25zW24ubmFtZV0uaW5lcnRpYX1mdW5jdGlvbiBwYSh0LGUsbixyKXt2YXIgbz0xLXQ7cmV0dXJuIG8qbyplKzIqbyp0Km4rdCp0KnJ9ZnVuY3Rpb24gZGEodCxlLG4scil7cmV0dXJuLW4qKHQvPXIpKih0LTIpK2V9JGkuSW5lcnRpYVN0YXRlPWNhO3ZhciB2YT17aWQ6XCJpbmVydGlhXCIsYmVmb3JlOltcIm1vZGlmaWVycy9iYXNlXCJdLGluc3RhbGw6ZnVuY3Rpb24odCl7dmFyIGU9dC5kZWZhdWx0czt0LnVzZVBsdWdpbih0YS5kZWZhdWx0KSx0LnVzZVBsdWdpbihRaS5kZWZhdWx0KSx0LmFjdGlvbnMucGhhc2VzLmluZXJ0aWFzdGFydD0hMCx0LmFjdGlvbnMucGhhc2VzLnJlc3VtZT0hMCxlLnBlckFjdGlvbi5pbmVydGlhPXtlbmFibGVkOiExLHJlc2lzdGFuY2U6MTAsbWluU3BlZWQ6MTAwLGVuZFNwZWVkOjEwLGFsbG93UmVzdW1lOiEwLHNtb290aEVuZER1cmF0aW9uOjMwMH19LGxpc3RlbmVyczp7XCJpbnRlcmFjdGlvbnM6bmV3XCI6ZnVuY3Rpb24odCl7dmFyIGU9dC5pbnRlcmFjdGlvbjtlLmluZXJ0aWE9bmV3IGNhKGUpfSxcImludGVyYWN0aW9uczpiZWZvcmUtYWN0aW9uLWVuZFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LmV2ZW50O3JldHVybighZS5faW50ZXJhY3Rpbmd8fGUuc2ltdWxhdGlvbnx8IWUuaW5lcnRpYS5zdGFydChuKSkmJm51bGx9LFwiaW50ZXJhY3Rpb25zOmRvd25cIjpmdW5jdGlvbih0KXt2YXIgZT10LmludGVyYWN0aW9uLG49dC5ldmVudFRhcmdldCxyPWUuaW5lcnRpYTtpZihyLmFjdGl2ZSlmb3IodmFyIG89bjtyYS5lbGVtZW50KG8pOyl7aWYobz09PWUuZWxlbWVudCl7ci5yZXN1bWUodCk7YnJlYWt9bz1lYS5wYXJlbnROb2RlKG8pfX0sXCJpbnRlcmFjdGlvbnM6c3RvcFwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24uaW5lcnRpYTtlLmFjdGl2ZSYmZS5zdG9wKCl9LFwiaW50ZXJhY3Rpb25zOmJlZm9yZS1hY3Rpb24tcmVzdW1lXCI6ZnVuY3Rpb24odCl7dmFyIGU9dC5pbnRlcmFjdGlvbi5tb2RpZmljYXRpb247ZS5zdG9wKHQpLGUuc3RhcnQodCx0LmludGVyYWN0aW9uLmNvb3Jkcy5jdXIucGFnZSksZS5hcHBseVRvSW50ZXJhY3Rpb24odCl9LFwiaW50ZXJhY3Rpb25zOmJlZm9yZS1hY3Rpb24taW5lcnRpYXN0YXJ0XCI6ZnVuY3Rpb24odCl7cmV0dXJuIHQuaW50ZXJhY3Rpb24ubW9kaWZpY2F0aW9uLnNldEFuZEFwcGx5KHQpfSxcImludGVyYWN0aW9uczphY3Rpb24tcmVzdW1lXCI6UWkuYWRkRXZlbnRNb2RpZmllcnMsXCJpbnRlcmFjdGlvbnM6YWN0aW9uLWluZXJ0aWFzdGFydFwiOlFpLmFkZEV2ZW50TW9kaWZpZXJzLFwiaW50ZXJhY3Rpb25zOmFmdGVyLWFjdGlvbi1pbmVydGlhc3RhcnRcIjpmdW5jdGlvbih0KXtyZXR1cm4gdC5pbnRlcmFjdGlvbi5tb2RpZmljYXRpb24ucmVzdG9yZUludGVyYWN0aW9uQ29vcmRzKHQpfSxcImludGVyYWN0aW9uczphZnRlci1hY3Rpb24tcmVzdW1lXCI6ZnVuY3Rpb24odCl7cmV0dXJuIHQuaW50ZXJhY3Rpb24ubW9kaWZpY2F0aW9uLnJlc3RvcmVJbnRlcmFjdGlvbkNvb3Jkcyh0KX19fTskaS5kZWZhdWx0PXZhO3ZhciB5YSxoYT17fTtmdW5jdGlvbiBnYSh0KXtyZXR1cm4oZ2E9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShoYSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxoYS5pbml0PWhhLmRlZmF1bHQ9dm9pZCAwO3ZhciBiYT1uZXcoKCh5YT1tKHt9KSkmJnlhLl9fZXNNb2R1bGU/eWE6e2RlZmF1bHQ6eWF9KS5kZWZhdWx0KSxtYT1iYS5pbnRlcmFjdFN0YXRpYztoYS5kZWZhdWx0PW1hO2Z1bmN0aW9uIE9hKHQpe3JldHVybiBiYS5pbml0KHQpfWhhLmluaXQ9T2EsXCJvYmplY3RcIj09PShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P1widW5kZWZpbmVkXCI6Z2Eod2luZG93KSkmJndpbmRvdyYmT2Eod2luZG93KTt2YXIgd2E9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KHdhLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHdhLmRlZmF1bHQ9dm9pZCAwO3dhLmRlZmF1bHQ9e307dmFyIF9hPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShfYSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxfYS5kZWZhdWx0PXZvaWQgMDtfYS5kZWZhdWx0PXt9O3ZhciBQYT17fTtmdW5jdGlvbiB4YSh0LGUpe3JldHVybiBmdW5jdGlvbih0KXtpZihBcnJheS5pc0FycmF5KHQpKXJldHVybiB0fSh0KXx8ZnVuY3Rpb24odCxlKXtpZighKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QodCl8fFwiW29iamVjdCBBcmd1bWVudHNdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCkpKXJldHVybjt2YXIgbj1bXSxyPSEwLG89ITEsaT12b2lkIDA7dHJ5e2Zvcih2YXIgYSx1PXRbU3ltYm9sLml0ZXJhdG9yXSgpOyEocj0oYT11Lm5leHQoKSkuZG9uZSkmJihuLnB1c2goYS52YWx1ZSksIWV8fG4ubGVuZ3RoIT09ZSk7cj0hMCk7fWNhdGNoKHQpe289ITAsaT10fWZpbmFsbHl7dHJ5e3J8fG51bGw9PXUucmV0dXJufHx1LnJldHVybigpfWZpbmFsbHl7aWYobyl0aHJvdyBpfX1yZXR1cm4gbn0odCxlKXx8ZnVuY3Rpb24oKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKX0oKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoUGEsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksUGEuZGVmYXVsdD12b2lkIDA7UGEuZGVmYXVsdD1mdW5jdGlvbih2KXtmdW5jdGlvbiB0KHQsZSl7Zm9yKHZhciBuPXYucmFuZ2Uscj12LmxpbWl0cyxvPXZvaWQgMD09PXI/e2xlZnQ6LTEvMCxyaWdodDoxLzAsdG9wOi0xLzAsYm90dG9tOjEvMH06cixpPXYub2Zmc2V0LGE9dm9pZCAwPT09aT97eDowLHk6MH06aSx1PXtyYW5nZTpuLGdyaWQ6dix4Om51bGwseTpudWxsfSxzPTA7czx5Lmxlbmd0aDtzKyspe3ZhciBsPXhhKHlbc10sMiksYz1sWzBdLGY9bFsxXSxwPU1hdGgucm91bmQoKHQtYS54KS92W2NdKSxkPU1hdGgucm91bmQoKGUtYS55KS92W2ZdKTt1W2NdPU1hdGgubWF4KG8ubGVmdCxNYXRoLm1pbihvLnJpZ2h0LHAqdltjXSthLngpKSx1W2ZdPU1hdGgubWF4KG8udG9wLE1hdGgubWluKG8uYm90dG9tLGQqdltmXSthLnkpKX1yZXR1cm4gdX12YXIgeT1bW1wieFwiLFwieVwiXSxbXCJsZWZ0XCIsXCJ0b3BcIl0sW1wicmlnaHRcIixcImJvdHRvbVwiXSxbXCJ3aWR0aFwiLFwiaGVpZ2h0XCJdXS5maWx0ZXIoZnVuY3Rpb24odCl7dmFyIGU9eGEodCwyKSxuPWVbMF0scj1lWzFdO3JldHVybiBuIGluIHZ8fHIgaW4gdn0pO3JldHVybiB0LmdyaWQ9dix0LmNvb3JkRmllbGRzPXksdH07dmFyIFNhPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShTYSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoU2EsXCJlZGdlVGFyZ2V0XCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGphLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KFNhLFwiZWxlbWVudHNcIix7ZW51bWVyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gTWEuZGVmYXVsdH19KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoU2EsXCJncmlkXCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIGthLmRlZmF1bHR9fSk7dmFyIGphPUVhKHdhKSxNYT1FYShfYSksa2E9RWEoUGEpO2Z1bmN0aW9uIEVhKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgVGE9e307ZnVuY3Rpb24gRGEodCl7cmV0dXJuKERhPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoVGEsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksVGEuZGVmYXVsdD12b2lkIDA7dmFyIElhLHphPShJYT1jdCkmJklhLl9fZXNNb2R1bGU/SWE6e2RlZmF1bHQ6SWF9LEFhPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PURhKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPUNhKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KFNhKTtmdW5jdGlvbiBDYSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIENhPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9dmFyIFdhPXtpZDpcInNuYXBwZXJzXCIsaW5zdGFsbDpmdW5jdGlvbih0KXt2YXIgZT10LmludGVyYWN0U3RhdGljO2Uuc25hcHBlcnM9KDAsemEuZGVmYXVsdCkoZS5zbmFwcGVyc3x8e30sQWEpLGUuY3JlYXRlU25hcEdyaWQ9ZS5zbmFwcGVycy5ncmlkfX07VGEuZGVmYXVsdD1XYTt2YXIgUmE9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KFJhLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLFJhLmFzcGVjdFJhdGlvPVJhLmRlZmF1bHQ9dm9pZCAwO3ZhciBGYT1ZYShjdCksWGE9WWEoX2kpO2Z1bmN0aW9uIFlhKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBOYShlLHQpe3ZhciBuPU9iamVjdC5rZXlzKGUpO2lmKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpe3ZhciByPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZSk7dCYmKHI9ci5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZSx0KS5lbnVtZXJhYmxlfSkpLG4ucHVzaC5hcHBseShuLHIpfXJldHVybiBufWZ1bmN0aW9uIExhKGUpe2Zvcih2YXIgdD0xO3Q8YXJndW1lbnRzLmxlbmd0aDt0Kyspe3ZhciBuPW51bGwhPWFyZ3VtZW50c1t0XT9hcmd1bWVudHNbdF06e307dCUyP05hKE9iamVjdChuKSwhMCkuZm9yRWFjaChmdW5jdGlvbih0KXtCYShlLHQsblt0XSl9KTpPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycz9PYmplY3QuZGVmaW5lUHJvcGVydGllcyhlLE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG4pKTpOYShPYmplY3QobikpLmZvckVhY2goZnVuY3Rpb24odCl7T2JqZWN0LmRlZmluZVByb3BlcnR5KGUsdCxPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG4sdCkpfSl9cmV0dXJuIGV9ZnVuY3Rpb24gQmEodCxlLG4pe3JldHVybiBlIGluIHQ/T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsZSx7dmFsdWU6bixlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbZV09bix0fXZhciBWYT17c3RhcnQ6ZnVuY3Rpb24odCl7dmFyIGU9dC5zdGF0ZSxuPXQucmVjdCxyPXQuZWRnZXMsbz10LnBhZ2VDb29yZHMsaT1lLm9wdGlvbnMucmF0aW8sYT1lLm9wdGlvbnMsdT1hLmVxdWFsRGVsdGEscz1hLm1vZGlmaWVycztcInByZXNlcnZlXCI9PT1pJiYoaT1uLndpZHRoL24uaGVpZ2h0KSxlLnN0YXJ0Q29vcmRzPSgwLEZhLmRlZmF1bHQpKHt9LG8pLGUuc3RhcnRSZWN0PSgwLEZhLmRlZmF1bHQpKHt9LG4pLGUucmF0aW89aSxlLmVxdWFsRGVsdGE9dTt2YXIgbD1lLmxpbmtlZEVkZ2VzPXt0b3A6ci50b3B8fHIubGVmdCYmIXIuYm90dG9tLGxlZnQ6ci5sZWZ0fHxyLnRvcCYmIXIucmlnaHQsYm90dG9tOnIuYm90dG9tfHxyLnJpZ2h0JiYhci50b3AscmlnaHQ6ci5yaWdodHx8ci5ib3R0b20mJiFyLmxlZnR9O2lmKGUueElzUHJpbWFyeUF4aXM9ISghci5sZWZ0JiYhci5yaWdodCksZS5lcXVhbERlbHRhKWUuZWRnZVNpZ249KGwubGVmdD8xOi0xKSoobC50b3A/MTotMSk7ZWxzZXt2YXIgYz1lLnhJc1ByaW1hcnlBeGlzP2wudG9wOmwubGVmdDtlLmVkZ2VTaWduPWM/LTE6MX1pZigoMCxGYS5kZWZhdWx0KSh0LmVkZ2VzLGwpLHMmJnMubGVuZ3RoKXt2YXIgZj1uZXcgWGEuZGVmYXVsdCh0LmludGVyYWN0aW9uKTtmLmNvcHlGcm9tKHQuaW50ZXJhY3Rpb24ubW9kaWZpY2F0aW9uKSxmLnByZXBhcmVTdGF0ZXMocyksKGUuc3ViTW9kaWZpY2F0aW9uPWYpLnN0YXJ0QWxsKExhKHt9LHQpKX19LHNldDpmdW5jdGlvbih0KXt2YXIgZT10LnN0YXRlLG49dC5yZWN0LHI9dC5jb29yZHMsbz0oMCxGYS5kZWZhdWx0KSh7fSxyKSxpPWUuZXF1YWxEZWx0YT9xYTpVYTtpZihpKGUsZS54SXNQcmltYXJ5QXhpcyxyLG4pLCFlLnN1Yk1vZGlmaWNhdGlvbilyZXR1cm4gbnVsbDt2YXIgYT0oMCxGYS5kZWZhdWx0KSh7fSxuKTsoMCwkdC5hZGRFZGdlcykoZS5saW5rZWRFZGdlcyxhLHt4OnIueC1vLngseTpyLnktby55fSk7dmFyIHU9ZS5zdWJNb2RpZmljYXRpb24uc2V0QWxsKExhKHt9LHQse3JlY3Q6YSxlZGdlczplLmxpbmtlZEVkZ2VzLHBhZ2VDb29yZHM6cixwcmV2Q29vcmRzOnIscHJldlJlY3Q6YX0pKSxzPXUuZGVsdGE7dS5jaGFuZ2VkJiYoaShlLE1hdGguYWJzKHMueCk+TWF0aC5hYnMocy55KSx1LmNvb3Jkcyx1LnJlY3QpLCgwLEZhLmRlZmF1bHQpKHIsdS5jb29yZHMpKTtyZXR1cm4gdS5ldmVudFByb3BzfSxkZWZhdWx0czp7cmF0aW86XCJwcmVzZXJ2ZVwiLGVxdWFsRGVsdGE6ITEsbW9kaWZpZXJzOltdLGVuYWJsZWQ6ITF9fTtmdW5jdGlvbiBxYSh0LGUsbil7dmFyIHI9dC5zdGFydENvb3JkcyxvPXQuZWRnZVNpZ247ZT9uLnk9ci55KyhuLngtci54KSpvOm4ueD1yLngrKG4ueS1yLnkpKm99ZnVuY3Rpb24gVWEodCxlLG4scil7dmFyIG89dC5zdGFydFJlY3QsaT10LnN0YXJ0Q29vcmRzLGE9dC5yYXRpbyx1PXQuZWRnZVNpZ247aWYoZSl7dmFyIHM9ci53aWR0aC9hO24ueT1pLnkrKHMtby5oZWlnaHQpKnV9ZWxzZXt2YXIgbD1yLmhlaWdodCphO24ueD1pLngrKGwtby53aWR0aCkqdX19UmEuYXNwZWN0UmF0aW89VmE7dmFyIEdhPSgwLENpLm1ha2VNb2RpZmllcikoVmEsXCJhc3BlY3RSYXRpb1wiKTtSYS5kZWZhdWx0PUdhO3ZhciBIYT17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoSGEsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksSGEuZGVmYXVsdD12b2lkIDA7ZnVuY3Rpb24gS2EoKXt9S2EuX2RlZmF1bHRzPXt9O3ZhciAkYT1LYTtIYS5kZWZhdWx0PSRhO3ZhciBaYT17fTtmdW5jdGlvbiBKYSh0KXtyZXR1cm4oSmE9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShaYSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxaYS5nZXRSZXN0cmljdGlvblJlY3Q9aXUsWmEucmVzdHJpY3Q9WmEuZGVmYXVsdD12b2lkIDA7dmFyIFFhLHR1PShRYT1jdCkmJlFhLl9fZXNNb2R1bGU/UWE6e2RlZmF1bHQ6UWF9LGV1PW91KHcpLG51PW91KCR0KTtmdW5jdGlvbiBydSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIHJ1PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gb3UodCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09SmEodCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9cnUoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119cmV0dXJuIG4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbiksbn1mdW5jdGlvbiBpdSh0LGUsbil7cmV0dXJuIGV1LmZ1bmModCk/bnUucmVzb2x2ZVJlY3RMaWtlKHQsZS5pbnRlcmFjdGFibGUsZS5lbGVtZW50LFtuLngsbi55LGVdKTpudS5yZXNvbHZlUmVjdExpa2UodCxlLmludGVyYWN0YWJsZSxlLmVsZW1lbnQpfXZhciBhdT17c3RhcnQ6ZnVuY3Rpb24odCl7dmFyIGU9dC5yZWN0LG49dC5zdGFydE9mZnNldCxyPXQuc3RhdGUsbz10LmludGVyYWN0aW9uLGk9dC5wYWdlQ29vcmRzLGE9ci5vcHRpb25zLHU9YS5lbGVtZW50UmVjdCxzPSgwLHR1LmRlZmF1bHQpKHtsZWZ0OjAsdG9wOjAscmlnaHQ6MCxib3R0b206MH0sYS5vZmZzZXR8fHt9KTtpZihlJiZ1KXt2YXIgbD1pdShhLnJlc3RyaWN0aW9uLG8saSk7aWYobCl7dmFyIGM9bC5yaWdodC1sLmxlZnQtZS53aWR0aCxmPWwuYm90dG9tLWwudG9wLWUuaGVpZ2h0O2M8MCYmKHMubGVmdCs9YyxzLnJpZ2h0Kz1jKSxmPDAmJihzLnRvcCs9ZixzLmJvdHRvbSs9Zil9cy5sZWZ0Kz1uLmxlZnQtZS53aWR0aCp1LmxlZnQscy50b3ArPW4udG9wLWUuaGVpZ2h0KnUudG9wLHMucmlnaHQrPW4ucmlnaHQtZS53aWR0aCooMS11LnJpZ2h0KSxzLmJvdHRvbSs9bi5ib3R0b20tZS5oZWlnaHQqKDEtdS5ib3R0b20pfXIub2Zmc2V0PXN9LHNldDpmdW5jdGlvbih0KXt2YXIgZT10LmNvb3JkcyxuPXQuaW50ZXJhY3Rpb24scj10LnN0YXRlLG89ci5vcHRpb25zLGk9ci5vZmZzZXQsYT1pdShvLnJlc3RyaWN0aW9uLG4sZSk7aWYoYSl7dmFyIHU9bnUueHl3aFRvVGxicihhKTtlLng9TWF0aC5tYXgoTWF0aC5taW4odS5yaWdodC1pLnJpZ2h0LGUueCksdS5sZWZ0K2kubGVmdCksZS55PU1hdGgubWF4KE1hdGgubWluKHUuYm90dG9tLWkuYm90dG9tLGUueSksdS50b3AraS50b3ApfX0sZGVmYXVsdHM6e3Jlc3RyaWN0aW9uOm51bGwsZWxlbWVudFJlY3Q6bnVsbCxvZmZzZXQ6bnVsbCxlbmRPbmx5OiExLGVuYWJsZWQ6ITF9fTtaYS5yZXN0cmljdD1hdTt2YXIgdXU9KDAsQ2kubWFrZU1vZGlmaWVyKShhdSxcInJlc3RyaWN0XCIpO1phLmRlZmF1bHQ9dXU7dmFyIHN1PXt9O2Z1bmN0aW9uIGx1KHQpe3JldHVybihsdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KHN1LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHN1LnJlc3RyaWN0RWRnZXM9c3UuZGVmYXVsdD12b2lkIDA7dmFyIGN1LGZ1PShjdT1jdCkmJmN1Ll9fZXNNb2R1bGU/Y3U6e2RlZmF1bHQ6Y3V9LHB1PWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PWx1KHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPWR1KCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KCR0KTtmdW5jdGlvbiBkdSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIGR1PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9dmFyIHZ1PXt0b3A6MS8wLGxlZnQ6MS8wLGJvdHRvbTotMS8wLHJpZ2h0Oi0xLzB9LHl1PXt0b3A6LTEvMCxsZWZ0Oi0xLzAsYm90dG9tOjEvMCxyaWdodDoxLzB9O2Z1bmN0aW9uIGh1KHQsZSl7Zm9yKHZhciBuPVtcInRvcFwiLFwibGVmdFwiLFwiYm90dG9tXCIsXCJyaWdodFwiXSxyPTA7cjxuLmxlbmd0aDtyKyspe3ZhciBvPW5bcl07byBpbiB0fHwodFtvXT1lW29dKX1yZXR1cm4gdH12YXIgZ3U9e25vSW5uZXI6dnUsbm9PdXRlcjp5dSxzdGFydDpmdW5jdGlvbih0KXt2YXIgZSxuPXQuaW50ZXJhY3Rpb24scj10LnN0YXJ0T2Zmc2V0LG89dC5zdGF0ZSxpPW8ub3B0aW9ucztpZihpKXt2YXIgYT0oMCxaYS5nZXRSZXN0cmljdGlvblJlY3QpKGkub2Zmc2V0LG4sbi5jb29yZHMuc3RhcnQucGFnZSk7ZT1wdS5yZWN0VG9YWShhKX1lPWV8fHt4OjAseTowfSxvLm9mZnNldD17dG9wOmUueStyLnRvcCxsZWZ0OmUueCtyLmxlZnQsYm90dG9tOmUueS1yLmJvdHRvbSxyaWdodDplLngtci5yaWdodH19LHNldDpmdW5jdGlvbih0KXt2YXIgZT10LmNvb3JkcyxuPXQuZWRnZXMscj10LmludGVyYWN0aW9uLG89dC5zdGF0ZSxpPW8ub2Zmc2V0LGE9by5vcHRpb25zO2lmKG4pe3ZhciB1PSgwLGZ1LmRlZmF1bHQpKHt9LGUpLHM9KDAsWmEuZ2V0UmVzdHJpY3Rpb25SZWN0KShhLmlubmVyLHIsdSl8fHt9LGw9KDAsWmEuZ2V0UmVzdHJpY3Rpb25SZWN0KShhLm91dGVyLHIsdSl8fHt9O2h1KHMsdnUpLGh1KGwseXUpLG4udG9wP2UueT1NYXRoLm1pbihNYXRoLm1heChsLnRvcCtpLnRvcCx1LnkpLHMudG9wK2kudG9wKTpuLmJvdHRvbSYmKGUueT1NYXRoLm1heChNYXRoLm1pbihsLmJvdHRvbStpLmJvdHRvbSx1LnkpLHMuYm90dG9tK2kuYm90dG9tKSksbi5sZWZ0P2UueD1NYXRoLm1pbihNYXRoLm1heChsLmxlZnQraS5sZWZ0LHUueCkscy5sZWZ0K2kubGVmdCk6bi5yaWdodCYmKGUueD1NYXRoLm1heChNYXRoLm1pbihsLnJpZ2h0K2kucmlnaHQsdS54KSxzLnJpZ2h0K2kucmlnaHQpKX19LGRlZmF1bHRzOntpbm5lcjpudWxsLG91dGVyOm51bGwsb2Zmc2V0Om51bGwsZW5kT25seTohMSxlbmFibGVkOiExfX07c3UucmVzdHJpY3RFZGdlcz1ndTt2YXIgYnU9KDAsQ2kubWFrZU1vZGlmaWVyKShndSxcInJlc3RyaWN0RWRnZXNcIik7c3UuZGVmYXVsdD1idTt2YXIgbXUsT3U9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KE91LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLE91LnJlc3RyaWN0UmVjdD1PdS5kZWZhdWx0PXZvaWQgMDt2YXIgd3U9KDAsKChtdT1jdCkmJm11Ll9fZXNNb2R1bGU/bXU6e2RlZmF1bHQ6bXV9KS5kZWZhdWx0KSh7Z2V0IGVsZW1lbnRSZWN0KCl7cmV0dXJue3RvcDowLGxlZnQ6MCxib3R0b206MSxyaWdodDoxfX0sc2V0IGVsZW1lbnRSZWN0KHQpe319LFphLnJlc3RyaWN0LmRlZmF1bHRzKSxfdT17c3RhcnQ6WmEucmVzdHJpY3Quc3RhcnQsc2V0OlphLnJlc3RyaWN0LnNldCxkZWZhdWx0czp3dX07T3UucmVzdHJpY3RSZWN0PV91O3ZhciBQdT0oMCxDaS5tYWtlTW9kaWZpZXIpKF91LFwicmVzdHJpY3RSZWN0XCIpO091LmRlZmF1bHQ9UHU7dmFyIHh1PXt9O2Z1bmN0aW9uIFN1KHQpe3JldHVybihTdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KHh1LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLHh1LnJlc3RyaWN0U2l6ZT14dS5kZWZhdWx0PXZvaWQgMDt2YXIganUsTXU9KGp1PWN0KSYmanUuX19lc01vZHVsZT9qdTp7ZGVmYXVsdDpqdX0sa3U9ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09U3UodCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9RXUoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0oJHQpO2Z1bmN0aW9uIEV1KCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gRXU9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH12YXIgVHU9e3dpZHRoOi0xLzAsaGVpZ2h0Oi0xLzB9LER1PXt3aWR0aDoxLzAsaGVpZ2h0OjEvMH07dmFyIEl1PXtzdGFydDpmdW5jdGlvbih0KXtyZXR1cm4gc3UucmVzdHJpY3RFZGdlcy5zdGFydCh0KX0sc2V0OmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LnN0YXRlLHI9dC5yZWN0LG89dC5lZGdlcyxpPW4ub3B0aW9ucztpZihvKXt2YXIgYT1rdS50bGJyVG9YeXdoKCgwLFphLmdldFJlc3RyaWN0aW9uUmVjdCkoaS5taW4sZSx0LmNvb3JkcykpfHxUdSx1PWt1LnRsYnJUb1h5d2goKDAsWmEuZ2V0UmVzdHJpY3Rpb25SZWN0KShpLm1heCxlLHQuY29vcmRzKSl8fER1O24ub3B0aW9ucz17ZW5kT25seTppLmVuZE9ubHksaW5uZXI6KDAsTXUuZGVmYXVsdCkoe30sc3UucmVzdHJpY3RFZGdlcy5ub0lubmVyKSxvdXRlcjooMCxNdS5kZWZhdWx0KSh7fSxzdS5yZXN0cmljdEVkZ2VzLm5vT3V0ZXIpfSxvLnRvcD8obi5vcHRpb25zLmlubmVyLnRvcD1yLmJvdHRvbS1hLmhlaWdodCxuLm9wdGlvbnMub3V0ZXIudG9wPXIuYm90dG9tLXUuaGVpZ2h0KTpvLmJvdHRvbSYmKG4ub3B0aW9ucy5pbm5lci5ib3R0b209ci50b3ArYS5oZWlnaHQsbi5vcHRpb25zLm91dGVyLmJvdHRvbT1yLnRvcCt1LmhlaWdodCksby5sZWZ0PyhuLm9wdGlvbnMuaW5uZXIubGVmdD1yLnJpZ2h0LWEud2lkdGgsbi5vcHRpb25zLm91dGVyLmxlZnQ9ci5yaWdodC11LndpZHRoKTpvLnJpZ2h0JiYobi5vcHRpb25zLmlubmVyLnJpZ2h0PXIubGVmdCthLndpZHRoLG4ub3B0aW9ucy5vdXRlci5yaWdodD1yLmxlZnQrdS53aWR0aCksc3UucmVzdHJpY3RFZGdlcy5zZXQodCksbi5vcHRpb25zPWl9fSxkZWZhdWx0czp7bWluOm51bGwsbWF4Om51bGwsZW5kT25seTohMSxlbmFibGVkOiExfX07eHUucmVzdHJpY3RTaXplPUl1O3ZhciB6dT0oMCxDaS5tYWtlTW9kaWZpZXIpKEl1LFwicmVzdHJpY3RTaXplXCIpO3h1LmRlZmF1bHQ9enU7dmFyIEF1PXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShBdSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxBdS5kZWZhdWx0PXZvaWQgMDtmdW5jdGlvbiBDdSgpe31DdS5fZGVmYXVsdHM9e307dmFyIFd1PUN1O0F1LmRlZmF1bHQ9V3U7dmFyIFJ1PXt9O2Z1bmN0aW9uIEZ1KHQpe3JldHVybihGdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KFJ1LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLFJ1LnNuYXA9UnUuZGVmYXVsdD12b2lkIDA7dmFyIFh1PWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PUZ1KHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPVl1KCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KGxlKTtmdW5jdGlvbiBZdSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIFl1PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9dmFyIE51PXtzdGFydDpmdW5jdGlvbih0KXt2YXIgZSxuLHIsbz10LmludGVyYWN0aW9uLGk9dC5pbnRlcmFjdGFibGUsYT10LmVsZW1lbnQsdT10LnJlY3Qscz10LnN0YXRlLGw9dC5zdGFydE9mZnNldCxjPXMub3B0aW9ucyxmPWMub2Zmc2V0V2l0aE9yaWdpbj8obj0oZT10KS5pbnRlcmFjdGlvbi5lbGVtZW50LFh1LnJlY3QucmVjdFRvWFkoWHUucmVjdC5yZXNvbHZlUmVjdExpa2UoZS5zdGF0ZS5vcHRpb25zLm9yaWdpbixudWxsLG51bGwsW25dKSl8fFh1LmdldE9yaWdpblhZKGUuaW50ZXJhY3RhYmxlLG4sZS5pbnRlcmFjdGlvbi5wcmVwYXJlZC5uYW1lKSk6e3g6MCx5OjB9O2lmKFwic3RhcnRDb29yZHNcIj09PWMub2Zmc2V0KXI9e3g6by5jb29yZHMuc3RhcnQucGFnZS54LHk6by5jb29yZHMuc3RhcnQucGFnZS55fTtlbHNle3ZhciBwPVh1LnJlY3QucmVzb2x2ZVJlY3RMaWtlKGMub2Zmc2V0LGksYSxbb10pOyhyPVh1LnJlY3QucmVjdFRvWFkocCl8fHt4OjAseTowfSkueCs9Zi54LHIueSs9Zi55fXZhciBkPWMucmVsYXRpdmVQb2ludHM7cy5vZmZzZXRzPXUmJmQmJmQubGVuZ3RoP2QubWFwKGZ1bmN0aW9uKHQsZSl7cmV0dXJue2luZGV4OmUscmVsYXRpdmVQb2ludDp0LHg6bC5sZWZ0LXUud2lkdGgqdC54K3IueCx5OmwudG9wLXUuaGVpZ2h0KnQueStyLnl9fSk6W1h1LmV4dGVuZCh7aW5kZXg6MCxyZWxhdGl2ZVBvaW50Om51bGx9LHIpXX0sc2V0OmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb24sbj10LmNvb3JkcyxyPXQuc3RhdGUsbz1yLm9wdGlvbnMsaT1yLm9mZnNldHMsYT1YdS5nZXRPcmlnaW5YWShlLmludGVyYWN0YWJsZSxlLmVsZW1lbnQsZS5wcmVwYXJlZC5uYW1lKSx1PVh1LmV4dGVuZCh7fSxuKSxzPVtdO28ub2Zmc2V0V2l0aE9yaWdpbnx8KHUueC09YS54LHUueS09YS55KTtmb3IodmFyIGw9MDtsPGkubGVuZ3RoO2wrKylmb3IodmFyIGM9aVtsXSxmPXUueC1jLngscD11LnktYy55LGQ9MCx2PW8udGFyZ2V0cy5sZW5ndGg7ZDx2O2QrKyl7dmFyIHk9by50YXJnZXRzW2RdLGg9dm9pZCAwOyhoPVh1LmlzLmZ1bmMoeSk/eShmLHAsZSxjLGQpOnkpJiZzLnB1c2goe3g6KFh1LmlzLm51bWJlcihoLngpP2gueDpmKStjLngseTooWHUuaXMubnVtYmVyKGgueSk/aC55OnApK2MueSxyYW5nZTpYdS5pcy5udW1iZXIoaC5yYW5nZSk/aC5yYW5nZTpvLnJhbmdlLHNvdXJjZTp5LGluZGV4OmQsb2Zmc2V0OmN9KX1mb3IodmFyIGc9e3RhcmdldDpudWxsLGluUmFuZ2U6ITEsZGlzdGFuY2U6MCxyYW5nZTowLGRlbHRhOnt4OjAseTowfX0sYj0wO2I8cy5sZW5ndGg7YisrKXt2YXIgbT1zW2JdLE89bS5yYW5nZSx3PW0ueC11LngsXz1tLnktdS55LFA9WHUuaHlwb3QodyxfKSx4PVA8PU87Tz09PTEvMCYmZy5pblJhbmdlJiZnLnJhbmdlIT09MS8wJiYoeD0hMSksZy50YXJnZXQmJiEoeD9nLmluUmFuZ2UmJk8hPT0xLzA/UC9PPGcuZGlzdGFuY2UvZy5yYW5nZTpPPT09MS8wJiZnLnJhbmdlIT09MS8wfHxQPGcuZGlzdGFuY2U6IWcuaW5SYW5nZSYmUDxnLmRpc3RhbmNlKXx8KGcudGFyZ2V0PW0sZy5kaXN0YW5jZT1QLGcucmFuZ2U9TyxnLmluUmFuZ2U9eCxnLmRlbHRhLng9dyxnLmRlbHRhLnk9Xyl9cmV0dXJuIGcuaW5SYW5nZSYmKG4ueD1nLnRhcmdldC54LG4ueT1nLnRhcmdldC55KSxyLmNsb3Nlc3Q9Z30sZGVmYXVsdHM6e3JhbmdlOjEvMCx0YXJnZXRzOm51bGwsb2Zmc2V0Om51bGwsb2Zmc2V0V2l0aE9yaWdpbjohMCxvcmlnaW46bnVsbCxyZWxhdGl2ZVBvaW50czpudWxsLGVuZE9ubHk6ITEsZW5hYmxlZDohMX19O1J1LnNuYXA9TnU7dmFyIEx1PSgwLENpLm1ha2VNb2RpZmllcikoTnUsXCJzbmFwXCIpO1J1LmRlZmF1bHQ9THU7dmFyIEJ1PXt9O2Z1bmN0aW9uIFZ1KHQpe3JldHVybihWdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9T2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLEJ1LnNuYXBTaXplPUJ1LmRlZmF1bHQ9dm9pZCAwO3ZhciBxdSxVdT0ocXU9Y3QpJiZxdS5fX2VzTW9kdWxlP3F1OntkZWZhdWx0OnF1fSxHdT1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1WdSh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1IdSgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufSh3KTtmdW5jdGlvbiBIdSgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIEh1PWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9ZnVuY3Rpb24gS3UodCxlKXtyZXR1cm4gZnVuY3Rpb24odCl7aWYoQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4gdH0odCl8fGZ1bmN0aW9uKHQsZSl7aWYoIShTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KHQpfHxcIltvYmplY3QgQXJndW1lbnRzXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpKSlyZXR1cm47dmFyIG49W10scj0hMCxvPSExLGk9dm9pZCAwO3RyeXtmb3IodmFyIGEsdT10W1N5bWJvbC5pdGVyYXRvcl0oKTshKHI9KGE9dS5uZXh0KCkpLmRvbmUpJiYobi5wdXNoKGEudmFsdWUpLCFlfHxuLmxlbmd0aCE9PWUpO3I9ITApO31jYXRjaCh0KXtvPSEwLGk9dH1maW5hbGx5e3RyeXtyfHxudWxsPT11LnJldHVybnx8dS5yZXR1cm4oKX1maW5hbGx5e2lmKG8pdGhyb3cgaX19cmV0dXJuIG59KHQsZSl8fGZ1bmN0aW9uKCl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIil9KCl9dmFyICR1PXtzdGFydDpmdW5jdGlvbih0KXt2YXIgZT10LnN0YXRlLG49dC5lZGdlcyxyPWUub3B0aW9ucztpZighbilyZXR1cm4gbnVsbDt0LnN0YXRlPXtvcHRpb25zOnt0YXJnZXRzOm51bGwscmVsYXRpdmVQb2ludHM6W3t4Om4ubGVmdD8wOjEseTpuLnRvcD8wOjF9XSxvZmZzZXQ6ci5vZmZzZXR8fFwic2VsZlwiLG9yaWdpbjp7eDowLHk6MH0scmFuZ2U6ci5yYW5nZX19LGUudGFyZ2V0RmllbGRzPWUudGFyZ2V0RmllbGRzfHxbW1wid2lkdGhcIixcImhlaWdodFwiXSxbXCJ4XCIsXCJ5XCJdXSxSdS5zbmFwLnN0YXJ0KHQpLGUub2Zmc2V0cz10LnN0YXRlLm9mZnNldHMsdC5zdGF0ZT1lfSxzZXQ6ZnVuY3Rpb24odCl7dmFyIGU9dC5pbnRlcmFjdGlvbixuPXQuc3RhdGUscj10LmNvb3JkcyxvPW4ub3B0aW9ucyxpPW4ub2Zmc2V0cyxhPXt4OnIueC1pWzBdLngseTpyLnktaVswXS55fTtuLm9wdGlvbnM9KDAsVXUuZGVmYXVsdCkoe30sbyksbi5vcHRpb25zLnRhcmdldHM9W107Zm9yKHZhciB1PTA7dTwoby50YXJnZXRzfHxbXSkubGVuZ3RoO3UrKyl7dmFyIHM9KG8udGFyZ2V0c3x8W10pW3VdLGw9dm9pZCAwO2lmKGw9R3UuZnVuYyhzKT9zKGEueCxhLnksZSk6cyl7Zm9yKHZhciBjPTA7YzxuLnRhcmdldEZpZWxkcy5sZW5ndGg7YysrKXt2YXIgZj1LdShuLnRhcmdldEZpZWxkc1tjXSwyKSxwPWZbMF0sZD1mWzFdO2lmKHAgaW4gbHx8ZCBpbiBsKXtsLng9bFtwXSxsLnk9bFtkXTticmVha319bi5vcHRpb25zLnRhcmdldHMucHVzaChsKX19dmFyIHY9UnUuc25hcC5zZXQodCk7cmV0dXJuIG4ub3B0aW9ucz1vLHZ9LGRlZmF1bHRzOntyYW5nZToxLzAsdGFyZ2V0czpudWxsLG9mZnNldDpudWxsLGVuZE9ubHk6ITEsZW5hYmxlZDohMX19O0J1LnNuYXBTaXplPSR1O3ZhciBadT0oMCxDaS5tYWtlTW9kaWZpZXIpKCR1LFwic25hcFNpemVcIik7QnUuZGVmYXVsdD1adTt2YXIgSnU9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KEp1LFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLEp1LnNuYXBFZGdlcz1KdS5kZWZhdWx0PXZvaWQgMDt2YXIgUXU9ZXMoViksdHM9ZXMoY3QpO2Z1bmN0aW9uIGVzKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgbnM9e3N0YXJ0OmZ1bmN0aW9uKHQpe3ZhciBlPXQuZWRnZXM7cmV0dXJuIGU/KHQuc3RhdGUudGFyZ2V0RmllbGRzPXQuc3RhdGUudGFyZ2V0RmllbGRzfHxbW2UubGVmdD9cImxlZnRcIjpcInJpZ2h0XCIsZS50b3A/XCJ0b3BcIjpcImJvdHRvbVwiXV0sQnUuc25hcFNpemUuc3RhcnQodCkpOm51bGx9LHNldDpCdS5zbmFwU2l6ZS5zZXQsZGVmYXVsdHM6KDAsdHMuZGVmYXVsdCkoKDAsUXUuZGVmYXVsdCkoQnUuc25hcFNpemUuZGVmYXVsdHMpLHt0YXJnZXRzOm51bGwscmFuZ2U6bnVsbCxvZmZzZXQ6e3g6MCx5OjB9fSl9O0p1LnNuYXBFZGdlcz1uczt2YXIgcnM9KDAsQ2kubWFrZU1vZGlmaWVyKShucyxcInNuYXBFZGdlc1wiKTtKdS5kZWZhdWx0PXJzO3ZhciBvcz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkob3MsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksb3MuZGVmYXVsdD12b2lkIDA7ZnVuY3Rpb24gaXMoKXt9aXMuX2RlZmF1bHRzPXt9O3ZhciBhcz1pcztvcy5kZWZhdWx0PWFzO3ZhciB1cz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkodXMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksdXMuZGVmYXVsdD12b2lkIDA7ZnVuY3Rpb24gc3MoKXt9c3MuX2RlZmF1bHRzPXt9O3ZhciBscz1zczt1cy5kZWZhdWx0PWxzO3ZhciBjcz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoY3MsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksY3MuZGVmYXVsdD12b2lkIDA7dmFyIGZzPVBzKFJhKSxwcz1QcyhIYSksZHM9UHMoc3UpLHZzPVBzKFphKSx5cz1QcyhPdSksaHM9UHMoeHUpLGdzPVBzKEF1KSxicz1QcyhKdSksbXM9UHMoUnUpLE9zPVBzKEJ1KSx3cz1QcyhvcyksX3M9UHModXMpO2Z1bmN0aW9uIFBzKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX12YXIgeHM9e2FzcGVjdFJhdGlvOmZzLmRlZmF1bHQscmVzdHJpY3RFZGdlczpkcy5kZWZhdWx0LHJlc3RyaWN0OnZzLmRlZmF1bHQscmVzdHJpY3RSZWN0OnlzLmRlZmF1bHQscmVzdHJpY3RTaXplOmhzLmRlZmF1bHQsc25hcEVkZ2VzOmJzLmRlZmF1bHQsc25hcDptcy5kZWZhdWx0LHNuYXBTaXplOk9zLmRlZmF1bHQsc3ByaW5nOndzLmRlZmF1bHQsYXZvaWQ6cHMuZGVmYXVsdCx0cmFuc2Zvcm06X3MuZGVmYXVsdCxydWJiZXJiYW5kOmdzLmRlZmF1bHR9O2NzLmRlZmF1bHQ9eHM7dmFyIFNzPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShTcyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxTcy5kZWZhdWx0PXZvaWQgMDt2YXIganM9RXMoVGEpLE1zPUVzKGNzKSxrcz1FcyhDaSk7ZnVuY3Rpb24gRXModCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fXZhciBUcz17aWQ6XCJtb2RpZmllcnNcIixpbnN0YWxsOmZ1bmN0aW9uKHQpe3ZhciBlPXQuaW50ZXJhY3RTdGF0aWM7Zm9yKHZhciBuIGluIHQudXNlUGx1Z2luKGtzLmRlZmF1bHQpLHQudXNlUGx1Z2luKGpzLmRlZmF1bHQpLGUubW9kaWZpZXJzPU1zLmRlZmF1bHQsTXMuZGVmYXVsdCl7dmFyIHI9TXMuZGVmYXVsdFtuXSxvPXIuX2RlZmF1bHRzLGk9ci5fbWV0aG9kcztvLl9tZXRob2RzPWksdC5kZWZhdWx0cy5wZXJBY3Rpb25bbl09b319fTtTcy5kZWZhdWx0PVRzO3ZhciBEcz17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoRHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksRHMuZGVmYXVsdD12b2lkIDA7RHMuZGVmYXVsdD17fTt2YXIgSXM9e307T2JqZWN0LmRlZmluZVByb3BlcnR5KElzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLElzLlBvaW50ZXJFdmVudD1Jcy5kZWZhdWx0PXZvaWQgMDt2YXIgenMsQXM9KHpzPU1lKSYmenMuX19lc01vZHVsZT96czp7ZGVmYXVsdDp6c30sQ3M9ZnVuY3Rpb24odCl7aWYodCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O2lmKG51bGw9PT10fHxcIm9iamVjdFwiIT09UnModCkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIHQpcmV0dXJue2RlZmF1bHQ6dH07dmFyIGU9V3MoKTtpZihlJiZlLmhhcyh0KSlyZXR1cm4gZS5nZXQodCk7dmFyIG49e30scj1PYmplY3QuZGVmaW5lUHJvcGVydHkmJk9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7Zm9yKHZhciBvIGluIHQpaWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsbykpe3ZhciBpPXI/T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LG8pOm51bGw7aSYmKGkuZ2V0fHxpLnNldCk/T2JqZWN0LmRlZmluZVByb3BlcnR5KG4sbyxpKTpuW29dPXRbb119bi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKTtyZXR1cm4gbn0oenQpO2Z1bmN0aW9uIFdzKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gV3M9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBScyh0KXtyZXR1cm4oUnM9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWZ1bmN0aW9uIEZzKHQsZSl7Zm9yKHZhciBuPTA7bjxlLmxlbmd0aDtuKyspe3ZhciByPWVbbl07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBYcyh0KXtyZXR1cm4oWHM9T2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5nZXRQcm90b3R5cGVPZjpmdW5jdGlvbih0KXtyZXR1cm4gdC5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZih0KX0pKHQpfWZ1bmN0aW9uIFlzKHQpe2lmKHZvaWQgMD09PXQpdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO3JldHVybiB0fWZ1bmN0aW9uIE5zKHQsZSl7cmV0dXJuKE5zPU9iamVjdC5zZXRQcm90b3R5cGVPZnx8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdC5fX3Byb3RvX189ZSx0fSkodCxlKX1mdW5jdGlvbiBMcyh0LGUsbil7cmV0dXJuIGUgaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxlLHt2YWx1ZTpuLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtlXT1uLHR9dmFyIEJzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZih0LGUsbixyLG8saSl7dmFyIGEsdSxzO2lmKCFmdW5jdGlvbih0LGUpe2lmKCEodCBpbnN0YW5jZW9mIGUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9KHRoaXMsZiksdT10aGlzLGE9IShzPVhzKGYpLmNhbGwodGhpcyxvKSl8fFwib2JqZWN0XCIhPT1ScyhzKSYmXCJmdW5jdGlvblwiIT10eXBlb2Ygcz9Zcyh1KTpzLExzKFlzKGEpLFwidHlwZVwiLHZvaWQgMCksTHMoWXMoYSksXCJvcmlnaW5hbEV2ZW50XCIsdm9pZCAwKSxMcyhZcyhhKSxcInBvaW50ZXJJZFwiLHZvaWQgMCksTHMoWXMoYSksXCJwb2ludGVyVHlwZVwiLHZvaWQgMCksTHMoWXMoYSksXCJkb3VibGVcIix2b2lkIDApLExzKFlzKGEpLFwicGFnZVhcIix2b2lkIDApLExzKFlzKGEpLFwicGFnZVlcIix2b2lkIDApLExzKFlzKGEpLFwiY2xpZW50WFwiLHZvaWQgMCksTHMoWXMoYSksXCJjbGllbnRZXCIsdm9pZCAwKSxMcyhZcyhhKSxcImR0XCIsdm9pZCAwKSxMcyhZcyhhKSxcImV2ZW50YWJsZVwiLHZvaWQgMCksQ3MucG9pbnRlckV4dGVuZChZcyhhKSxuKSxuIT09ZSYmQ3MucG9pbnRlckV4dGVuZChZcyhhKSxlKSxhLnRpbWVTdGFtcD1pLGEub3JpZ2luYWxFdmVudD1uLGEudHlwZT10LGEucG9pbnRlcklkPUNzLmdldFBvaW50ZXJJZChlKSxhLnBvaW50ZXJUeXBlPUNzLmdldFBvaW50ZXJUeXBlKGUpLGEudGFyZ2V0PXIsYS5jdXJyZW50VGFyZ2V0PW51bGwsXCJ0YXBcIj09PXQpe3ZhciBsPW8uZ2V0UG9pbnRlckluZGV4KGUpO2EuZHQ9YS50aW1lU3RhbXAtby5wb2ludGVyc1tsXS5kb3duVGltZTt2YXIgYz1hLnRpbWVTdGFtcC1vLnRhcFRpbWU7YS5kb3VibGU9ISEoby5wcmV2VGFwJiZcImRvdWJsZXRhcFwiIT09by5wcmV2VGFwLnR5cGUmJm8ucHJldlRhcC50YXJnZXQ9PT1hLnRhcmdldCYmYzw1MDApfWVsc2VcImRvdWJsZXRhcFwiPT09dCYmKGEuZHQ9ZS50aW1lU3RhbXAtby50YXBUaW1lKTtyZXR1cm4gYX12YXIgdCxlLG47cmV0dXJuIGZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSYmbnVsbCE9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uXCIpO3QucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoZSYmZS5wcm90b3R5cGUse2NvbnN0cnVjdG9yOnt2YWx1ZTp0LHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSxlJiZOcyh0LGUpfShmLEFzW1wiZGVmYXVsdFwiXSksdD1mLChlPVt7a2V5OlwiX3N1YnRyYWN0T3JpZ2luXCIsdmFsdWU6ZnVuY3Rpb24odCl7dmFyIGU9dC54LG49dC55O3JldHVybiB0aGlzLnBhZ2VYLT1lLHRoaXMucGFnZVktPW4sdGhpcy5jbGllbnRYLT1lLHRoaXMuY2xpZW50WS09bix0aGlzfX0se2tleTpcIl9hZGRPcmlnaW5cIix2YWx1ZTpmdW5jdGlvbih0KXt2YXIgZT10Lngsbj10Lnk7cmV0dXJuIHRoaXMucGFnZVgrPWUsdGhpcy5wYWdlWSs9bix0aGlzLmNsaWVudFgrPWUsdGhpcy5jbGllbnRZKz1uLHRoaXN9fSx7a2V5OlwicHJldmVudERlZmF1bHRcIix2YWx1ZTpmdW5jdGlvbigpe3RoaXMub3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpfX1dKSYmRnModC5wcm90b3R5cGUsZSksbiYmRnModCxuKSxmfSgpO0lzLlBvaW50ZXJFdmVudD1Jcy5kZWZhdWx0PUJzO3ZhciBWcz17fTtmdW5jdGlvbiBxcyh0KXtyZXR1cm4ocXM9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShWcyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxWcy5kZWZhdWx0PXZvaWQgMDtLcyhFbiksS3MobSh7fSkpO3ZhciBVcz1mdW5jdGlvbih0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1xcyh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1IcygpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1uLmRlZmF1bHQ9dCxlJiZlLnNldCh0LG4pO3JldHVybiBufShsZSksR3M9S3MoSXMpO2Z1bmN0aW9uIEhzKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gSHM9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBLcyh0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e2RlZmF1bHQ6dH19dmFyICRzPXtpZDpcInBvaW50ZXItZXZlbnRzL2Jhc2VcIixpbnN0YWxsOmZ1bmN0aW9uKHQpe3QucG9pbnRlckV2ZW50cz0kcyx0LmRlZmF1bHRzLmFjdGlvbnMucG9pbnRlckV2ZW50cz0kcy5kZWZhdWx0cyxVcy5leHRlbmQodC5hY3Rpb25zLnBoYXNlbGVzc1R5cGVzLCRzLnR5cGVzKX0sbGlzdGVuZXJzOntcImludGVyYWN0aW9uczpuZXdcIjpmdW5jdGlvbih0KXt2YXIgZT10LmludGVyYWN0aW9uO2UucHJldlRhcD1udWxsLGUudGFwVGltZT0wfSxcImludGVyYWN0aW9uczp1cGRhdGUtcG9pbnRlclwiOmZ1bmN0aW9uKHQpe3ZhciBlPXQuZG93bixuPXQucG9pbnRlckluZm87aWYoIWUmJm4uaG9sZClyZXR1cm47bi5ob2xkPXtkdXJhdGlvbjoxLzAsdGltZW91dDpudWxsfX0sXCJpbnRlcmFjdGlvbnM6bW92ZVwiOmZ1bmN0aW9uKHQsZSl7dmFyIG49dC5pbnRlcmFjdGlvbixyPXQucG9pbnRlcixvPXQuZXZlbnQsaT10LmV2ZW50VGFyZ2V0LGE9dC5kdXBsaWNhdGUsdT1uLmdldFBvaW50ZXJJbmRleChyKTthfHxuLnBvaW50ZXJJc0Rvd24mJiFuLnBvaW50ZXJXYXNNb3ZlZHx8KG4ucG9pbnRlcklzRG93biYmY2xlYXJUaW1lb3V0KG4ucG9pbnRlcnNbdV0uaG9sZC50aW1lb3V0KSxacyh7aW50ZXJhY3Rpb246bixwb2ludGVyOnIsZXZlbnQ6byxldmVudFRhcmdldDppLHR5cGU6XCJtb3ZlXCJ9LGUpKX0sXCJpbnRlcmFjdGlvbnM6ZG93blwiOmZ1bmN0aW9uKHQsZSl7IWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuPXQuaW50ZXJhY3Rpb24scj10LnBvaW50ZXIsbz10LmV2ZW50LGk9dC5ldmVudFRhcmdldCxhPXQucG9pbnRlckluZGV4LHU9bi5wb2ludGVyc1thXS5ob2xkLHM9VXMuZG9tLmdldFBhdGgoaSksbD17aW50ZXJhY3Rpb246bixwb2ludGVyOnIsZXZlbnQ6byxldmVudFRhcmdldDppLHR5cGU6XCJob2xkXCIsdGFyZ2V0czpbXSxwYXRoOnMsbm9kZTpudWxsfSxjPTA7YzxzLmxlbmd0aDtjKyspe3ZhciBmPXNbY107bC5ub2RlPWYsZS5maXJlKFwicG9pbnRlckV2ZW50czpjb2xsZWN0LXRhcmdldHNcIixsKX1pZighbC50YXJnZXRzLmxlbmd0aClyZXR1cm47Zm9yKHZhciBwPTEvMCxkPTA7ZDxsLnRhcmdldHMubGVuZ3RoO2QrKyl7dmFyIHY9bC50YXJnZXRzW2RdLmV2ZW50YWJsZS5vcHRpb25zLmhvbGREdXJhdGlvbjt2PHAmJihwPXYpfXUuZHVyYXRpb249cCx1LnRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe1pzKHtpbnRlcmFjdGlvbjpuLGV2ZW50VGFyZ2V0OmkscG9pbnRlcjpyLGV2ZW50Om8sdHlwZTpcImhvbGRcIn0sZSl9LHApfSh0LGUpLFpzKHQsZSl9LFwiaW50ZXJhY3Rpb25zOnVwXCI6ZnVuY3Rpb24odCxlKXt2YXIgbixyLG8saSxhLHU7UXModCksWnModCxlKSxyPWUsbz0obj10KS5pbnRlcmFjdGlvbixpPW4ucG9pbnRlcixhPW4uZXZlbnQsdT1uLmV2ZW50VGFyZ2V0LG8ucG9pbnRlcldhc01vdmVkfHxacyh7aW50ZXJhY3Rpb246byxldmVudFRhcmdldDp1LHBvaW50ZXI6aSxldmVudDphLHR5cGU6XCJ0YXBcIn0scil9LFwiaW50ZXJhY3Rpb25zOmNhbmNlbFwiOmZ1bmN0aW9uKHQsZSl7UXModCksWnModCxlKX19LFBvaW50ZXJFdmVudDpHcy5kZWZhdWx0LGZpcmU6WnMsY29sbGVjdEV2ZW50VGFyZ2V0czpKcyxkZWZhdWx0czp7aG9sZER1cmF0aW9uOjYwMCxpZ25vcmVGcm9tOm51bGwsYWxsb3dGcm9tOm51bGwsb3JpZ2luOnt4OjAseTowfX0sdHlwZXM6e2Rvd246ITAsbW92ZTohMCx1cDohMCxjYW5jZWw6ITAsdGFwOiEwLGRvdWJsZXRhcDohMCxob2xkOiEwfX07ZnVuY3Rpb24gWnModCxlKXt2YXIgbj10LmludGVyYWN0aW9uLHI9dC5wb2ludGVyLG89dC5ldmVudCxpPXQuZXZlbnRUYXJnZXQsYT10LnR5cGUsdT10LnRhcmdldHMscz12b2lkIDA9PT11P0pzKHQsZSk6dSxsPW5ldyBHcy5kZWZhdWx0KGEscixvLGksbixlLm5vdygpKTtlLmZpcmUoXCJwb2ludGVyRXZlbnRzOm5ld1wiLHtwb2ludGVyRXZlbnQ6bH0pO2Zvcih2YXIgYz17aW50ZXJhY3Rpb246bixwb2ludGVyOnIsZXZlbnQ6byxldmVudFRhcmdldDppLHRhcmdldHM6cyx0eXBlOmEscG9pbnRlckV2ZW50Omx9LGY9MDtmPHMubGVuZ3RoO2YrKyl7dmFyIHA9c1tmXTtmb3IodmFyIGQgaW4gcC5wcm9wc3x8e30pbFtkXT1wLnByb3BzW2RdO3ZhciB2PVVzLmdldE9yaWdpblhZKHAuZXZlbnRhYmxlLHAubm9kZSk7aWYobC5fc3VidHJhY3RPcmlnaW4odiksbC5ldmVudGFibGU9cC5ldmVudGFibGUsbC5jdXJyZW50VGFyZ2V0PXAubm9kZSxwLmV2ZW50YWJsZS5maXJlKGwpLGwuX2FkZE9yaWdpbih2KSxsLmltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZHx8bC5wcm9wYWdhdGlvblN0b3BwZWQmJmYrMTxzLmxlbmd0aCYmc1tmKzFdLm5vZGUhPT1sLmN1cnJlbnRUYXJnZXQpYnJlYWt9aWYoZS5maXJlKFwicG9pbnRlckV2ZW50czpmaXJlZFwiLGMpLFwidGFwXCI9PT1hKXt2YXIgeT1sLmRvdWJsZT9acyh7aW50ZXJhY3Rpb246bixwb2ludGVyOnIsZXZlbnQ6byxldmVudFRhcmdldDppLHR5cGU6XCJkb3VibGV0YXBcIn0sZSk6bDtuLnByZXZUYXA9eSxuLnRhcFRpbWU9eS50aW1lU3RhbXB9cmV0dXJuIGx9ZnVuY3Rpb24gSnModCxlKXt2YXIgbj10LmludGVyYWN0aW9uLHI9dC5wb2ludGVyLG89dC5ldmVudCxpPXQuZXZlbnRUYXJnZXQsYT10LnR5cGUsdT1uLmdldFBvaW50ZXJJbmRleChyKSxzPW4ucG9pbnRlcnNbdV07aWYoXCJ0YXBcIj09PWEmJihuLnBvaW50ZXJXYXNNb3ZlZHx8IXN8fHMuZG93blRhcmdldCE9PWkpKXJldHVybltdO2Zvcih2YXIgbD1Vcy5kb20uZ2V0UGF0aChpKSxjPXtpbnRlcmFjdGlvbjpuLHBvaW50ZXI6cixldmVudDpvLGV2ZW50VGFyZ2V0OmksdHlwZTphLHBhdGg6bCx0YXJnZXRzOltdLG5vZGU6bnVsbH0sZj0wO2Y8bC5sZW5ndGg7ZisrKXt2YXIgcD1sW2ZdO2Mubm9kZT1wLGUuZmlyZShcInBvaW50ZXJFdmVudHM6Y29sbGVjdC10YXJnZXRzXCIsYyl9cmV0dXJuXCJob2xkXCI9PT1hJiYoYy50YXJnZXRzPWMudGFyZ2V0cy5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIHQuZXZlbnRhYmxlLm9wdGlvbnMuaG9sZER1cmF0aW9uPT09bi5wb2ludGVyc1t1XS5ob2xkLmR1cmF0aW9ufSkpLGMudGFyZ2V0c31mdW5jdGlvbiBRcyh0KXt2YXIgZT10LmludGVyYWN0aW9uLG49dC5wb2ludGVySW5kZXg7ZS5wb2ludGVyc1tuXS5ob2xkJiZjbGVhclRpbWVvdXQoZS5wb2ludGVyc1tuXS5ob2xkLnRpbWVvdXQpfXZhciB0bD0kcztWcy5kZWZhdWx0PXRsO3ZhciBlbD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZWwuZGVmYXVsdD12b2lkIDA7cmwoSXMpO3ZhciBubD1ybChWcyk7ZnVuY3Rpb24gcmwodCl7cmV0dXJuIHQmJnQuX19lc01vZHVsZT90OntkZWZhdWx0OnR9fWZ1bmN0aW9uIG9sKHQpe3ZhciBlPXQuaW50ZXJhY3Rpb247ZS5ob2xkSW50ZXJ2YWxIYW5kbGUmJihjbGVhckludGVydmFsKGUuaG9sZEludGVydmFsSGFuZGxlKSxlLmhvbGRJbnRlcnZhbEhhbmRsZT1udWxsKX12YXIgaWw9e2lkOlwicG9pbnRlci1ldmVudHMvaG9sZFJlcGVhdFwiLGluc3RhbGw6ZnVuY3Rpb24odCl7dC51c2VQbHVnaW4obmwuZGVmYXVsdCk7dmFyIGU9dC5wb2ludGVyRXZlbnRzO2UuZGVmYXVsdHMuaG9sZFJlcGVhdEludGVydmFsPTAsZS50eXBlcy5ob2xkcmVwZWF0PXQuYWN0aW9ucy5waGFzZWxlc3NUeXBlcy5ob2xkcmVwZWF0PSEwfSxsaXN0ZW5lcnM6W1wibW92ZVwiLFwidXBcIixcImNhbmNlbFwiLFwiZW5kYWxsXCJdLnJlZHVjZShmdW5jdGlvbih0LGUpe3JldHVybiB0W1wicG9pbnRlckV2ZW50czpcIi5jb25jYXQoZSldPW9sLHR9LHtcInBvaW50ZXJFdmVudHM6bmV3XCI6ZnVuY3Rpb24odCl7dmFyIGU9dC5wb2ludGVyRXZlbnQ7XCJob2xkXCI9PT1lLnR5cGUmJihlLmNvdW50PShlLmNvdW50fHwwKSsxKX0sXCJwb2ludGVyRXZlbnRzOmZpcmVkXCI6ZnVuY3Rpb24odCxlKXt2YXIgbj10LmludGVyYWN0aW9uLHI9dC5wb2ludGVyRXZlbnQsbz10LmV2ZW50VGFyZ2V0LGk9dC50YXJnZXRzO2lmKFwiaG9sZFwiPT09ci50eXBlJiZpLmxlbmd0aCl7dmFyIGE9aVswXS5ldmVudGFibGUub3B0aW9ucy5ob2xkUmVwZWF0SW50ZXJ2YWw7YTw9MHx8KG4uaG9sZEludGVydmFsSGFuZGxlPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtlLnBvaW50ZXJFdmVudHMuZmlyZSh7aW50ZXJhY3Rpb246bixldmVudFRhcmdldDpvLHR5cGU6XCJob2xkXCIscG9pbnRlcjpyLGV2ZW50OnJ9LGUpfSxhKSl9fX0pfTtlbC5kZWZhdWx0PWlsO3ZhciBhbD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoYWwsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksYWwuZGVmYXVsdD12b2lkIDA7dmFyIHVsLHNsPSh1bD1jdCkmJnVsLl9fZXNNb2R1bGU/dWw6e2RlZmF1bHQ6dWx9O2Z1bmN0aW9uIGxsKHQpe3JldHVybigwLHNsLmRlZmF1bHQpKHRoaXMuZXZlbnRzLm9wdGlvbnMsdCksdGhpc312YXIgY2w9e2lkOlwicG9pbnRlci1ldmVudHMvaW50ZXJhY3RhYmxlVGFyZ2V0c1wiLGluc3RhbGw6ZnVuY3Rpb24odCl7dmFyIGU9dC5JbnRlcmFjdGFibGU7ZS5wcm90b3R5cGUucG9pbnRlckV2ZW50cz1sbDt2YXIgcj1lLnByb3RvdHlwZS5fYmFja0NvbXBhdE9wdGlvbjtlLnByb3RvdHlwZS5fYmFja0NvbXBhdE9wdGlvbj1mdW5jdGlvbih0LGUpe3ZhciBuPXIuY2FsbCh0aGlzLHQsZSk7cmV0dXJuIG49PT10aGlzJiYodGhpcy5ldmVudHMub3B0aW9uc1t0XT1lKSxufX0sbGlzdGVuZXJzOntcInBvaW50ZXJFdmVudHM6Y29sbGVjdC10YXJnZXRzXCI6ZnVuY3Rpb24odCxlKXt2YXIgcj10LnRhcmdldHMsbz10Lm5vZGUsaT10LnR5cGUsYT10LmV2ZW50VGFyZ2V0O2UuaW50ZXJhY3RhYmxlcy5mb3JFYWNoTWF0Y2gobyxmdW5jdGlvbih0KXt2YXIgZT10LmV2ZW50cyxuPWUub3B0aW9ucztlLnR5cGVzW2ldJiZlLnR5cGVzW2ldLmxlbmd0aCYmdC50ZXN0SWdub3JlQWxsb3cobixvLGEpJiZyLnB1c2goe25vZGU6byxldmVudGFibGU6ZSxwcm9wczp7aW50ZXJhY3RhYmxlOnR9fSl9KX0sXCJpbnRlcmFjdGFibGU6bmV3XCI6ZnVuY3Rpb24odCl7dmFyIGU9dC5pbnRlcmFjdGFibGU7ZS5ldmVudHMuZ2V0UmVjdD1mdW5jdGlvbih0KXtyZXR1cm4gZS5nZXRSZWN0KHQpfX0sXCJpbnRlcmFjdGFibGU6c2V0XCI6ZnVuY3Rpb24odCxlKXt2YXIgbj10LmludGVyYWN0YWJsZSxyPXQub3B0aW9uczsoMCxzbC5kZWZhdWx0KShuLmV2ZW50cy5vcHRpb25zLGUucG9pbnRlckV2ZW50cy5kZWZhdWx0cyksKDAsc2wuZGVmYXVsdCkobi5ldmVudHMub3B0aW9ucyxyLnBvaW50ZXJFdmVudHN8fHt9KX19fTthbC5kZWZhdWx0PWNsO3ZhciBmbD17fTtmdW5jdGlvbiBwbCh0KXtyZXR1cm4ocGw9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZmwsXCJob2xkUmVwZWF0XCIse2VudW1lcmFibGU6ITAsZ2V0OmZ1bmN0aW9uKCl7cmV0dXJuIHZsLmRlZmF1bHR9fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KGZsLFwiaW50ZXJhY3RhYmxlVGFyZ2V0c1wiLHtlbnVtZXJhYmxlOiEwLGdldDpmdW5jdGlvbigpe3JldHVybiB5bC5kZWZhdWx0fX0pLGZsLnBvaW50ZXJFdmVudHM9ZmwuZGVmYXVsdD12b2lkIDA7dmFyIGRsPWZ1bmN0aW9uKHQpe2lmKHQmJnQuX19lc01vZHVsZSlyZXR1cm4gdDtpZihudWxsPT09dHx8XCJvYmplY3RcIiE9PXBsKHQpJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiB0KXJldHVybntkZWZhdWx0OnR9O3ZhciBlPWdsKCk7aWYoZSYmZS5oYXModCkpcmV0dXJuIGUuZ2V0KHQpO3ZhciBuPXt9LHI9T2JqZWN0LmRlZmluZVByb3BlcnR5JiZPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO2Zvcih2YXIgbyBpbiB0KWlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG8pKXt2YXIgaT1yP09iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxvKTpudWxsO2kmJihpLmdldHx8aS5zZXQpP09iamVjdC5kZWZpbmVQcm9wZXJ0eShuLG8saSk6bltvXT10W29dfW4uZGVmYXVsdD10LGUmJmUuc2V0KHQsbik7cmV0dXJuIG59KFZzKTtmbC5wb2ludGVyRXZlbnRzPWRsO3ZhciB2bD1obChlbCkseWw9aGwoYWwpO2Z1bmN0aW9uIGhsKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1mdW5jdGlvbiBnbCgpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIFdlYWtNYXApcmV0dXJuIG51bGw7dmFyIHQ9bmV3IFdlYWtNYXA7cmV0dXJuIGdsPWZ1bmN0aW9uKCl7cmV0dXJuIHR9LHR9dmFyIGJsPXtpZDpcInBvaW50ZXItZXZlbnRzXCIsaW5zdGFsbDpmdW5jdGlvbih0KXt0LnVzZVBsdWdpbihkbCksdC51c2VQbHVnaW4odmwuZGVmYXVsdCksdC51c2VQbHVnaW4oeWwuZGVmYXVsdCl9fTtmbC5kZWZhdWx0PWJsO3ZhciBtbD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkobWwsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksbWwuaW5zdGFsbD13bCxtbC5kZWZhdWx0PXZvaWQgMDt2YXIgT2w7KE9sPWsoe30pKSYmT2wuX19lc01vZHVsZTtmdW5jdGlvbiB3bChlKXt2YXIgdD1lLkludGVyYWN0YWJsZTtlLmFjdGlvbnMucGhhc2VzLnJlZmxvdz0hMCx0LnByb3RvdHlwZS5yZWZsb3c9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKHUscyxsKXtmdW5jdGlvbiB0KCl7dmFyIGU9Y1tkXSx0PXUuZ2V0UmVjdChlKTtpZighdClyZXR1cm5cImJyZWFrXCI7dmFyIG49bGUuYXJyLmZpbmQobC5pbnRlcmFjdGlvbnMubGlzdCxmdW5jdGlvbih0KXtyZXR1cm4gdC5pbnRlcmFjdGluZygpJiZ0LmludGVyYWN0YWJsZT09PXUmJnQuZWxlbWVudD09PWUmJnQucHJlcGFyZWQubmFtZT09PXMubmFtZX0pLHI9dm9pZCAwO2lmKG4pbi5tb3ZlKCkscCYmKHI9bi5fcmVmbG93UHJvbWlzZXx8bmV3IGYoZnVuY3Rpb24odCl7bi5fcmVmbG93UmVzb2x2ZT10fSkpO2Vsc2V7dmFyIG89bGUucmVjdC50bGJyVG9YeXdoKHQpLGk9e3BhZ2U6e3g6by54LHk6by55fSxjbGllbnQ6e3g6by54LHk6by55fSx0aW1lU3RhbXA6bC5ub3coKX0sYT1sZS5wb2ludGVyLmNvb3Jkc1RvRXZlbnQoaSk7cj1mdW5jdGlvbih0LGUsbixyLG8pe3ZhciBpPXQuaW50ZXJhY3Rpb25zLm5ldyh7cG9pbnRlclR5cGU6XCJyZWZsb3dcIn0pLGE9e2ludGVyYWN0aW9uOmksZXZlbnQ6byxwb2ludGVyOm8sZXZlbnRUYXJnZXQ6bixwaGFzZTpcInJlZmxvd1wifTtpLmludGVyYWN0YWJsZT1lLGkuZWxlbWVudD1uLGkucHJlcGFyZWQ9KDAsbGUuZXh0ZW5kKSh7fSxyKSxpLnByZXZFdmVudD1vLGkudXBkYXRlUG9pbnRlcihvLG8sbiwhMCksaS5fZG9QaGFzZShhKTt2YXIgdT1sZS53aW4ud2luZG93LlByb21pc2U/bmV3IGxlLndpbi53aW5kb3cuUHJvbWlzZShmdW5jdGlvbih0KXtpLl9yZWZsb3dSZXNvbHZlPXR9KTpudWxsO2kuX3JlZmxvd1Byb21pc2U9dSxpLnN0YXJ0KHIsZSxuKSxpLl9pbnRlcmFjdGluZz8oaS5tb3ZlKGEpLGkuZW5kKG8pKTppLnN0b3AoKTtyZXR1cm4gaS5yZW1vdmVQb2ludGVyKG8sbyksaS5wb2ludGVySXNEb3duPSExLHV9KGwsdSxlLHMsYSl9cCYmcC5wdXNoKHIpfWZvcih2YXIgYz1sZS5pcy5zdHJpbmcodS50YXJnZXQpP2xlLmFyci5mcm9tKHUuX2NvbnRleHQucXVlcnlTZWxlY3RvckFsbCh1LnRhcmdldCkpOlt1LnRhcmdldF0sZj1sZS53aW4ud2luZG93LlByb21pc2UscD1mP1tdOm51bGwsZD0wO2Q8Yy5sZW5ndGg7ZCsrKXtpZihcImJyZWFrXCI9PT10KCkpYnJlYWt9cmV0dXJuIHAmJmYuYWxsKHApLnRoZW4oZnVuY3Rpb24oKXtyZXR1cm4gdX0pfSh0aGlzLHQsZSl9fXZhciBfbD17aWQ6XCJyZWZsb3dcIixpbnN0YWxsOndsLGxpc3RlbmVyczp7XCJpbnRlcmFjdGlvbnM6c3RvcFwiOmZ1bmN0aW9uKHQsZSl7dmFyIG49dC5pbnRlcmFjdGlvbjtcInJlZmxvd1wiPT09bi5wb2ludGVyVHlwZSYmKG4uX3JlZmxvd1Jlc29sdmUmJm4uX3JlZmxvd1Jlc29sdmUoKSxsZS5hcnIucmVtb3ZlKGUuaW50ZXJhY3Rpb25zLmxpc3QsbikpfX19O21sLmRlZmF1bHQ9X2w7dmFyIFBsPXt9O09iamVjdC5kZWZpbmVQcm9wZXJ0eShQbCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSxQbC5kZWZhdWx0PXZvaWQgMDtQbC5kZWZhdWx0PXt9O3ZhciB4bD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoeGwsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSkseGwuZXhjaGFuZ2U9dm9pZCAwO3hsLmV4Y2hhbmdlPXt9O3ZhciBTbD17fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoU2wsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksU2wuZGVmYXVsdD12b2lkIDA7U2wuZGVmYXVsdD17fTt2YXIgamw9e307ZnVuY3Rpb24gTWwodCl7cmV0dXJuKE1sPVwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmXCJzeW1ib2xcIj09dHlwZW9mIFN5bWJvbC5pdGVyYXRvcj9mdW5jdGlvbih0KXtyZXR1cm4gdHlwZW9mIHR9OmZ1bmN0aW9uKHQpe3JldHVybiB0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJnQuY29uc3RydWN0b3I9PT1TeW1ib2wmJnQhPT1TeW1ib2wucHJvdG90eXBlP1wic3ltYm9sXCI6dHlwZW9mIHR9KSh0KX1PYmplY3QuZGVmaW5lUHJvcGVydHkoamwsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksamwuZGVmYXVsdD12b2lkIDA7dmFyIGtsPUhsKFFyKSxFbD1IbChhbyksVGw9SGwodW8pLERsPUhsKHRpKSxJbD1IbChhaSksemw9SGwodWkpLEFsPUhsKFVuKSxDbD0oSGwoc2kpLEdsKHdpKSksV2w9SGwoJGkpLFJsPUhsKGhhKSxGbD1IbChTcyksWGw9SGwoRHMpLFlsPUhsKFlpKSxObD1IbChmbCksTGw9SGwobWwpLEJsPUdsKFBsKSxWbD1HbCh6dCkscWw9R2woU2wpO2Z1bmN0aW9uIFVsKCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgV2Vha01hcClyZXR1cm4gbnVsbDt2YXIgdD1uZXcgV2Vha01hcDtyZXR1cm4gVWw9ZnVuY3Rpb24oKXtyZXR1cm4gdH0sdH1mdW5jdGlvbiBHbCh0KXtpZih0JiZ0Ll9fZXNNb2R1bGUpcmV0dXJuIHQ7aWYobnVsbD09PXR8fFwib2JqZWN0XCIhPT1NbCh0KSYmXCJmdW5jdGlvblwiIT10eXBlb2YgdClyZXR1cm57ZGVmYXVsdDp0fTt2YXIgZT1VbCgpO2lmKGUmJmUuaGFzKHQpKXJldHVybiBlLmdldCh0KTt2YXIgbj17fSxyPU9iamVjdC5kZWZpbmVQcm9wZXJ0eSYmT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtmb3IodmFyIG8gaW4gdClpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodCxvKSl7dmFyIGk9cj9PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHQsbyk6bnVsbDtpJiYoaS5nZXR8fGkuc2V0KT9PYmplY3QuZGVmaW5lUHJvcGVydHkobixvLGkpOm5bb109dFtvXX1yZXR1cm4gbi5kZWZhdWx0PXQsZSYmZS5zZXQodCxuKSxufWZ1bmN0aW9uIEhsKHQpe3JldHVybiB0JiZ0Ll9fZXNNb2R1bGU/dDp7ZGVmYXVsdDp0fX1SbC5kZWZhdWx0LnVzZShYbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShBbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShZbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShJbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShFbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShObC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShXbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShGbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShEbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShrbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShUbC5kZWZhdWx0KSxSbC5kZWZhdWx0LnVzZShMbC5kZWZhdWx0KSxSbC5kZWZhdWx0LmZlZWRiYWNrPUNsLFJsLmRlZmF1bHQudXNlKHpsLmRlZmF1bHQpLFJsLmRlZmF1bHQudnVlPXtjb21wb25lbnRzOnFsfSxSbC5kZWZhdWx0Ll9fdXRpbHM9e2V4Y2hhbmdlOnhsLmV4Y2hhbmdlLGRpc3BsYWNlOkJsLHBvaW50ZXI6Vmx9O3ZhciBLbD1SbC5kZWZhdWx0O2psLmRlZmF1bHQ9S2w7dmFyICRsPXtleHBvcnRzOnt9fTtPYmplY3QuZGVmaW5lUHJvcGVydHkoJGwuZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KSwkbC5leHBvcnRzLmRlZmF1bHQ9dm9pZCAwO3ZhciBabCxKbD0oWmw9amwpJiZabC5fX2VzTW9kdWxlP1psOntkZWZhdWx0OlpsfTtmdW5jdGlvbiBRbCh0KXtyZXR1cm4oUWw9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKHQpe3JldHVybiB0eXBlb2YgdH06ZnVuY3Rpb24odCl7cmV0dXJuIHQmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmdC5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmdCE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgdH0pKHQpfWlmKFwib2JqZWN0XCI9PT1RbCgkbCkmJiRsKXRyeXskbC5leHBvcnRzPUpsLmRlZmF1bHR9Y2F0Y2godCl7fUpsLmRlZmF1bHQuZGVmYXVsdD1KbC5kZWZhdWx0O3ZhciB0Yz1KbC5kZWZhdWx0O3JldHVybiAkbC5leHBvcnRzLmRlZmF1bHQ9dGMsJGw9JGwuZXhwb3J0c30pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnRlcmFjdC5taW4uanMubWFwXG4iLCIvKlxuKiBsb2dsZXZlbCAtIGh0dHBzOi8vZ2l0aHViLmNvbS9waW10ZXJyeS9sb2dsZXZlbFxuKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTMgVGltIFBlcnJ5XG4qIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiovXG4oZnVuY3Rpb24gKHJvb3QsIGRlZmluaXRpb24pIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShkZWZpbml0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJvb3QubG9nID0gZGVmaW5pdGlvbigpO1xuICAgIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gU2xpZ2h0bHkgZHViaW91cyB0cmlja3MgdG8gY3V0IGRvd24gbWluaW1pemVkIGZpbGUgc2l6ZVxuICAgIHZhciBub29wID0gZnVuY3Rpb24oKSB7fTtcbiAgICB2YXIgdW5kZWZpbmVkVHlwZSA9IFwidW5kZWZpbmVkXCI7XG4gICAgdmFyIGlzSUUgPSAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSkgJiYgKHR5cGVvZiB3aW5kb3cubmF2aWdhdG9yICE9PSB1bmRlZmluZWRUeXBlKSAmJiAoXG4gICAgICAgIC9UcmlkZW50XFwvfE1TSUUgLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICAgICk7XG5cbiAgICB2YXIgbG9nTWV0aG9kcyA9IFtcbiAgICAgICAgXCJ0cmFjZVwiLFxuICAgICAgICBcImRlYnVnXCIsXG4gICAgICAgIFwiaW5mb1wiLFxuICAgICAgICBcIndhcm5cIixcbiAgICAgICAgXCJlcnJvclwiXG4gICAgXTtcblxuICAgIC8vIENyb3NzLWJyb3dzZXIgYmluZCBlcXVpdmFsZW50IHRoYXQgd29ya3MgYXQgbGVhc3QgYmFjayB0byBJRTZcbiAgICBmdW5jdGlvbiBiaW5kTWV0aG9kKG9iaiwgbWV0aG9kTmFtZSkge1xuICAgICAgICB2YXIgbWV0aG9kID0gb2JqW21ldGhvZE5hbWVdO1xuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZC5iaW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kLmJpbmQob2JqKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwobWV0aG9kLCBvYmopO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIE1pc3NpbmcgYmluZCBzaGltIG9yIElFOCArIE1vZGVybml6ciwgZmFsbGJhY2sgdG8gd3JhcHBpbmdcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuYXBwbHkobWV0aG9kLCBbb2JqLCBhcmd1bWVudHNdKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVHJhY2UoKSBkb2Vzbid0IHByaW50IHRoZSBtZXNzYWdlIGluIElFLCBzbyBmb3IgdGhhdCBjYXNlIHdlIG5lZWQgdG8gd3JhcCBpdFxuICAgIGZ1bmN0aW9uIHRyYWNlRm9ySUUoKSB7XG4gICAgICAgIGlmIChjb25zb2xlLmxvZykge1xuICAgICAgICAgICAgaWYgKGNvbnNvbGUubG9nLmFwcGx5KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW4gb2xkIElFLCBuYXRpdmUgY29uc29sZSBtZXRob2RzIHRoZW1zZWx2ZXMgZG9uJ3QgaGF2ZSBhcHBseSgpLlxuICAgICAgICAgICAgICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5hcHBseShjb25zb2xlLmxvZywgW2NvbnNvbGUsIGFyZ3VtZW50c10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb25zb2xlLnRyYWNlKSBjb25zb2xlLnRyYWNlKCk7XG4gICAgfVxuXG4gICAgLy8gQnVpbGQgdGhlIGJlc3QgbG9nZ2luZyBtZXRob2QgcG9zc2libGUgZm9yIHRoaXMgZW52XG4gICAgLy8gV2hlcmV2ZXIgcG9zc2libGUgd2Ugd2FudCB0byBiaW5kLCBub3Qgd3JhcCwgdG8gcHJlc2VydmUgc3RhY2sgdHJhY2VzXG4gICAgZnVuY3Rpb24gcmVhbE1ldGhvZChtZXRob2ROYW1lKSB7XG4gICAgICAgIGlmIChtZXRob2ROYW1lID09PSAnZGVidWcnKSB7XG4gICAgICAgICAgICBtZXRob2ROYW1lID0gJ2xvZyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09IHVuZGVmaW5lZFR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gTm8gbWV0aG9kIHBvc3NpYmxlLCBmb3Igbm93IC0gZml4ZWQgbGF0ZXIgYnkgZW5hYmxlTG9nZ2luZ1doZW5Db25zb2xlQXJyaXZlc1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZE5hbWUgPT09ICd0cmFjZScgJiYgaXNJRSkge1xuICAgICAgICAgICAgcmV0dXJuIHRyYWNlRm9ySUU7XG4gICAgICAgIH0gZWxzZSBpZiAoY29uc29sZVttZXRob2ROYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCBtZXRob2ROYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb25zb2xlLmxvZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYmluZE1ldGhvZChjb25zb2xlLCAnbG9nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbm9vcDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZXNlIHByaXZhdGUgZnVuY3Rpb25zIGFsd2F5cyBuZWVkIGB0aGlzYCB0byBiZSBzZXQgcHJvcGVybHlcblxuICAgIGZ1bmN0aW9uIHJlcGxhY2VMb2dnaW5nTWV0aG9kcyhsZXZlbCwgbG9nZ2VyTmFtZSkge1xuICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvZ01ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtZXRob2ROYW1lID0gbG9nTWV0aG9kc1tpXTtcbiAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0gPSAoaSA8IGxldmVsKSA/XG4gICAgICAgICAgICAgICAgbm9vcCA6XG4gICAgICAgICAgICAgICAgdGhpcy5tZXRob2RGYWN0b3J5KG1ldGhvZE5hbWUsIGxldmVsLCBsb2dnZXJOYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlZmluZSBsb2cubG9nIGFzIGFuIGFsaWFzIGZvciBsb2cuZGVidWdcbiAgICAgICAgdGhpcy5sb2cgPSB0aGlzLmRlYnVnO1xuICAgIH1cblxuICAgIC8vIEluIG9sZCBJRSB2ZXJzaW9ucywgdGhlIGNvbnNvbGUgaXNuJ3QgcHJlc2VudCB1bnRpbCB5b3UgZmlyc3Qgb3BlbiBpdC5cbiAgICAvLyBXZSBidWlsZCByZWFsTWV0aG9kKCkgcmVwbGFjZW1lbnRzIGhlcmUgdGhhdCByZWdlbmVyYXRlIGxvZ2dpbmcgbWV0aG9kc1xuICAgIGZ1bmN0aW9uIGVuYWJsZUxvZ2dpbmdXaGVuQ29uc29sZUFycml2ZXMobWV0aG9kTmFtZSwgbGV2ZWwsIGxvZ2dlck5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gdW5kZWZpbmVkVHlwZSkge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VMb2dnaW5nTWV0aG9kcy5jYWxsKHRoaXMsIGxldmVsLCBsb2dnZXJOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzW21ldGhvZE5hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gQnkgZGVmYXVsdCwgd2UgdXNlIGNsb3NlbHkgYm91bmQgcmVhbCBtZXRob2RzIHdoZXJldmVyIHBvc3NpYmxlLCBhbmRcbiAgICAvLyBvdGhlcndpc2Ugd2Ugd2FpdCBmb3IgYSBjb25zb2xlIHRvIGFwcGVhciwgYW5kIHRoZW4gdHJ5IGFnYWluLlxuICAgIGZ1bmN0aW9uIGRlZmF1bHRNZXRob2RGYWN0b3J5KG1ldGhvZE5hbWUsIGxldmVsLCBsb2dnZXJOYW1lKSB7XG4gICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICAgIHJldHVybiByZWFsTWV0aG9kKG1ldGhvZE5hbWUpIHx8XG4gICAgICAgICAgICAgICBlbmFibGVMb2dnaW5nV2hlbkNvbnNvbGVBcnJpdmVzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gTG9nZ2VyKG5hbWUsIGRlZmF1bHRMZXZlbCwgZmFjdG9yeSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGN1cnJlbnRMZXZlbDtcbiAgICAgIHZhciBzdG9yYWdlS2V5ID0gXCJsb2dsZXZlbFwiO1xuICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgc3RvcmFnZUtleSArPSBcIjpcIiArIG5hbWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHBlcnNpc3RMZXZlbElmUG9zc2libGUobGV2ZWxOdW0pIHtcbiAgICAgICAgICB2YXIgbGV2ZWxOYW1lID0gKGxvZ01ldGhvZHNbbGV2ZWxOdW1dIHx8ICdzaWxlbnQnKS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IHVuZGVmaW5lZFR5cGUpIHJldHVybjtcblxuICAgICAgICAgIC8vIFVzZSBsb2NhbFN0b3JhZ2UgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtzdG9yYWdlS2V5XSA9IGxldmVsTmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cblxuICAgICAgICAgIC8vIFVzZSBzZXNzaW9uIGNvb2tpZSBhcyBmYWxsYmFja1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC5jb29raWUgPVxuICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdG9yYWdlS2V5KSArIFwiPVwiICsgbGV2ZWxOYW1lICsgXCI7XCI7XG4gICAgICAgICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRQZXJzaXN0ZWRMZXZlbCgpIHtcbiAgICAgICAgICB2YXIgc3RvcmVkTGV2ZWw7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gdW5kZWZpbmVkVHlwZSkgcmV0dXJuO1xuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSB3aW5kb3cubG9jYWxTdG9yYWdlW3N0b3JhZ2VLZXldO1xuICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cblxuICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIGNvb2tpZXMgaWYgbG9jYWwgc3RvcmFnZSBnaXZlcyB1cyBub3RoaW5nXG4gICAgICAgICAgaWYgKHR5cGVvZiBzdG9yZWRMZXZlbCA9PT0gdW5kZWZpbmVkVHlwZSkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNvb2tpZSA9IHdpbmRvdy5kb2N1bWVudC5jb29raWU7XG4gICAgICAgICAgICAgICAgICB2YXIgbG9jYXRpb24gPSBjb29raWUuaW5kZXhPZihcbiAgICAgICAgICAgICAgICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoc3RvcmFnZUtleSkgKyBcIj1cIik7XG4gICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24gIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RvcmVkTGV2ZWwgPSAvXihbXjtdKykvLmV4ZWMoY29va2llLnNsaWNlKGxvY2F0aW9uKSlbMV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiB0aGUgc3RvcmVkIGxldmVsIGlzIG5vdCB2YWxpZCwgdHJlYXQgaXQgYXMgaWYgbm90aGluZyB3YXMgc3RvcmVkLlxuICAgICAgICAgIGlmIChzZWxmLmxldmVsc1tzdG9yZWRMZXZlbF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBzdG9yZWRMZXZlbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3RvcmVkTGV2ZWw7XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgKlxuICAgICAgICogUHVibGljIGxvZ2dlciBBUEkgLSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3BpbXRlcnJ5L2xvZ2xldmVsIGZvciBkZXRhaWxzXG4gICAgICAgKlxuICAgICAgICovXG5cbiAgICAgIHNlbGYubmFtZSA9IG5hbWU7XG5cbiAgICAgIHNlbGYubGV2ZWxzID0geyBcIlRSQUNFXCI6IDAsIFwiREVCVUdcIjogMSwgXCJJTkZPXCI6IDIsIFwiV0FSTlwiOiAzLFxuICAgICAgICAgIFwiRVJST1JcIjogNCwgXCJTSUxFTlRcIjogNX07XG5cbiAgICAgIHNlbGYubWV0aG9kRmFjdG9yeSA9IGZhY3RvcnkgfHwgZGVmYXVsdE1ldGhvZEZhY3Rvcnk7XG5cbiAgICAgIHNlbGYuZ2V0TGV2ZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnJlbnRMZXZlbDtcbiAgICAgIH07XG5cbiAgICAgIHNlbGYuc2V0TGV2ZWwgPSBmdW5jdGlvbiAobGV2ZWwsIHBlcnNpc3QpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGxldmVsID09PSBcInN0cmluZ1wiICYmIHNlbGYubGV2ZWxzW2xldmVsLnRvVXBwZXJDYXNlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgbGV2ZWwgPSBzZWxmLmxldmVsc1tsZXZlbC50b1VwcGVyQ2FzZSgpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHR5cGVvZiBsZXZlbCA9PT0gXCJudW1iZXJcIiAmJiBsZXZlbCA+PSAwICYmIGxldmVsIDw9IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xuICAgICAgICAgICAgICBjdXJyZW50TGV2ZWwgPSBsZXZlbDtcbiAgICAgICAgICAgICAgaWYgKHBlcnNpc3QgIT09IGZhbHNlKSB7ICAvLyBkZWZhdWx0cyB0byB0cnVlXG4gICAgICAgICAgICAgICAgICBwZXJzaXN0TGV2ZWxJZlBvc3NpYmxlKGxldmVsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXBsYWNlTG9nZ2luZ01ldGhvZHMuY2FsbChzZWxmLCBsZXZlbCwgbmFtZSk7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gdW5kZWZpbmVkVHlwZSAmJiBsZXZlbCA8IHNlbGYubGV2ZWxzLlNJTEVOVCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiTm8gY29uc29sZSBhdmFpbGFibGUgZm9yIGxvZ2dpbmdcIjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IFwibG9nLnNldExldmVsKCkgY2FsbGVkIHdpdGggaW52YWxpZCBsZXZlbDogXCIgKyBsZXZlbDtcbiAgICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzZWxmLnNldERlZmF1bHRMZXZlbCA9IGZ1bmN0aW9uIChsZXZlbCkge1xuICAgICAgICAgIGlmICghZ2V0UGVyc2lzdGVkTGV2ZWwoKSkge1xuICAgICAgICAgICAgICBzZWxmLnNldExldmVsKGxldmVsLCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgc2VsZi5lbmFibGVBbGwgPSBmdW5jdGlvbihwZXJzaXN0KSB7XG4gICAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5UUkFDRSwgcGVyc2lzdCk7XG4gICAgICB9O1xuXG4gICAgICBzZWxmLmRpc2FibGVBbGwgPSBmdW5jdGlvbihwZXJzaXN0KSB7XG4gICAgICAgICAgc2VsZi5zZXRMZXZlbChzZWxmLmxldmVscy5TSUxFTlQsIHBlcnNpc3QpO1xuICAgICAgfTtcblxuICAgICAgLy8gSW5pdGlhbGl6ZSB3aXRoIHRoZSByaWdodCBsZXZlbFxuICAgICAgdmFyIGluaXRpYWxMZXZlbCA9IGdldFBlcnNpc3RlZExldmVsKCk7XG4gICAgICBpZiAoaW5pdGlhbExldmVsID09IG51bGwpIHtcbiAgICAgICAgICBpbml0aWFsTGV2ZWwgPSBkZWZhdWx0TGV2ZWwgPT0gbnVsbCA/IFwiV0FSTlwiIDogZGVmYXVsdExldmVsO1xuICAgICAgfVxuICAgICAgc2VsZi5zZXRMZXZlbChpbml0aWFsTGV2ZWwsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqXG4gICAgICogVG9wLWxldmVsIEFQSVxuICAgICAqXG4gICAgICovXG5cbiAgICB2YXIgZGVmYXVsdExvZ2dlciA9IG5ldyBMb2dnZXIoKTtcblxuICAgIHZhciBfbG9nZ2Vyc0J5TmFtZSA9IHt9O1xuICAgIGRlZmF1bHRMb2dnZXIuZ2V0TG9nZ2VyID0gZnVuY3Rpb24gZ2V0TG9nZ2VyKG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiIHx8IG5hbWUgPT09IFwiXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiWW91IG11c3Qgc3VwcGx5IGEgbmFtZSB3aGVuIGNyZWF0aW5nIGEgbG9nZ2VyLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsb2dnZXIgPSBfbG9nZ2Vyc0J5TmFtZVtuYW1lXTtcbiAgICAgICAgaWYgKCFsb2dnZXIpIHtcbiAgICAgICAgICBsb2dnZXIgPSBfbG9nZ2Vyc0J5TmFtZVtuYW1lXSA9IG5ldyBMb2dnZXIoXG4gICAgICAgICAgICBuYW1lLCBkZWZhdWx0TG9nZ2VyLmdldExldmVsKCksIGRlZmF1bHRMb2dnZXIubWV0aG9kRmFjdG9yeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvZ2dlcjtcbiAgICB9O1xuXG4gICAgLy8gR3JhYiB0aGUgY3VycmVudCBnbG9iYWwgbG9nIHZhcmlhYmxlIGluIGNhc2Ugb2Ygb3ZlcndyaXRlXG4gICAgdmFyIF9sb2cgPSAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSkgPyB3aW5kb3cubG9nIDogdW5kZWZpbmVkO1xuICAgIGRlZmF1bHRMb2dnZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gdW5kZWZpbmVkVHlwZSAmJlxuICAgICAgICAgICAgICAgd2luZG93LmxvZyA9PT0gZGVmYXVsdExvZ2dlcikge1xuICAgICAgICAgICAgd2luZG93LmxvZyA9IF9sb2c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGVmYXVsdExvZ2dlcjtcbiAgICB9O1xuXG4gICAgZGVmYXVsdExvZ2dlci5nZXRMb2dnZXJzID0gZnVuY3Rpb24gZ2V0TG9nZ2VycygpIHtcbiAgICAgICAgcmV0dXJuIF9sb2dnZXJzQnlOYW1lO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVmYXVsdExvZ2dlcjtcbn0pKTtcbiIsIi8qXG4gKGMpIDIwMTcsIFZsYWRpbWlyIEFnYWZvbmtpblxuIFNpbXBsaWZ5LmpzLCBhIGhpZ2gtcGVyZm9ybWFuY2UgSlMgcG9seWxpbmUgc2ltcGxpZmljYXRpb24gbGlicmFyeVxuIG1vdXJuZXIuZ2l0aHViLmlvL3NpbXBsaWZ5LWpzXG4qL1xuXG4oZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8vIHRvIHN1aXQgeW91ciBwb2ludCBmb3JtYXQsIHJ1biBzZWFyY2gvcmVwbGFjZSBmb3IgJy54JyBhbmQgJy55Jztcbi8vIGZvciAzRCB2ZXJzaW9uLCBzZWUgM2QgYnJhbmNoIChjb25maWd1cmFiaWxpdHkgd291bGQgZHJhdyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBvdmVyaGVhZClcblxuLy8gc3F1YXJlIGRpc3RhbmNlIGJldHdlZW4gMiBwb2ludHNcbmZ1bmN0aW9uIGdldFNxRGlzdChwMSwgcDIpIHtcblxuICAgIHZhciBkeCA9IHAxLnggLSBwMi54LFxuICAgICAgICBkeSA9IHAxLnkgLSBwMi55O1xuXG4gICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufVxuXG4vLyBzcXVhcmUgZGlzdGFuY2UgZnJvbSBhIHBvaW50IHRvIGEgc2VnbWVudFxuZnVuY3Rpb24gZ2V0U3FTZWdEaXN0KHAsIHAxLCBwMikge1xuXG4gICAgdmFyIHggPSBwMS54LFxuICAgICAgICB5ID0gcDEueSxcbiAgICAgICAgZHggPSBwMi54IC0geCxcbiAgICAgICAgZHkgPSBwMi55IC0geTtcblxuICAgIGlmIChkeCAhPT0gMCB8fCBkeSAhPT0gMCkge1xuXG4gICAgICAgIHZhciB0ID0gKChwLnggLSB4KSAqIGR4ICsgKHAueSAtIHkpICogZHkpIC8gKGR4ICogZHggKyBkeSAqIGR5KTtcblxuICAgICAgICBpZiAodCA+IDEpIHtcbiAgICAgICAgICAgIHggPSBwMi54O1xuICAgICAgICAgICAgeSA9IHAyLnk7XG5cbiAgICAgICAgfSBlbHNlIGlmICh0ID4gMCkge1xuICAgICAgICAgICAgeCArPSBkeCAqIHQ7XG4gICAgICAgICAgICB5ICs9IGR5ICogdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGR4ID0gcC54IC0geDtcbiAgICBkeSA9IHAueSAtIHk7XG5cbiAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG59XG4vLyByZXN0IG9mIHRoZSBjb2RlIGRvZXNuJ3QgY2FyZSBhYm91dCBwb2ludCBmb3JtYXRcblxuLy8gYmFzaWMgZGlzdGFuY2UtYmFzZWQgc2ltcGxpZmljYXRpb25cbmZ1bmN0aW9uIHNpbXBsaWZ5UmFkaWFsRGlzdChwb2ludHMsIHNxVG9sZXJhbmNlKSB7XG5cbiAgICB2YXIgcHJldlBvaW50ID0gcG9pbnRzWzBdLFxuICAgICAgICBuZXdQb2ludHMgPSBbcHJldlBvaW50XSxcbiAgICAgICAgcG9pbnQ7XG5cbiAgICBmb3IgKHZhciBpID0gMSwgbGVuID0gcG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHBvaW50ID0gcG9pbnRzW2ldO1xuXG4gICAgICAgIGlmIChnZXRTcURpc3QocG9pbnQsIHByZXZQb2ludCkgPiBzcVRvbGVyYW5jZSkge1xuICAgICAgICAgICAgbmV3UG9pbnRzLnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgcHJldlBvaW50ID0gcG9pbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJldlBvaW50ICE9PSBwb2ludCkgbmV3UG9pbnRzLnB1c2gocG9pbnQpO1xuXG4gICAgcmV0dXJuIG5ld1BvaW50cztcbn1cblxuZnVuY3Rpb24gc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBmaXJzdCwgbGFzdCwgc3FUb2xlcmFuY2UsIHNpbXBsaWZpZWQpIHtcbiAgICB2YXIgbWF4U3FEaXN0ID0gc3FUb2xlcmFuY2UsXG4gICAgICAgIGluZGV4O1xuXG4gICAgZm9yICh2YXIgaSA9IGZpcnN0ICsgMTsgaSA8IGxhc3Q7IGkrKykge1xuICAgICAgICB2YXIgc3FEaXN0ID0gZ2V0U3FTZWdEaXN0KHBvaW50c1tpXSwgcG9pbnRzW2ZpcnN0XSwgcG9pbnRzW2xhc3RdKTtcblxuICAgICAgICBpZiAoc3FEaXN0ID4gbWF4U3FEaXN0KSB7XG4gICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICBtYXhTcURpc3QgPSBzcURpc3Q7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobWF4U3FEaXN0ID4gc3FUb2xlcmFuY2UpIHtcbiAgICAgICAgaWYgKGluZGV4IC0gZmlyc3QgPiAxKSBzaW1wbGlmeURQU3RlcChwb2ludHMsIGZpcnN0LCBpbmRleCwgc3FUb2xlcmFuY2UsIHNpbXBsaWZpZWQpO1xuICAgICAgICBzaW1wbGlmaWVkLnB1c2gocG9pbnRzW2luZGV4XSk7XG4gICAgICAgIGlmIChsYXN0IC0gaW5kZXggPiAxKSBzaW1wbGlmeURQU3RlcChwb2ludHMsIGluZGV4LCBsYXN0LCBzcVRvbGVyYW5jZSwgc2ltcGxpZmllZCk7XG4gICAgfVxufVxuXG4vLyBzaW1wbGlmaWNhdGlvbiB1c2luZyBSYW1lci1Eb3VnbGFzLVBldWNrZXIgYWxnb3JpdGhtXG5mdW5jdGlvbiBzaW1wbGlmeURvdWdsYXNQZXVja2VyKHBvaW50cywgc3FUb2xlcmFuY2UpIHtcbiAgICB2YXIgbGFzdCA9IHBvaW50cy5sZW5ndGggLSAxO1xuXG4gICAgdmFyIHNpbXBsaWZpZWQgPSBbcG9pbnRzWzBdXTtcbiAgICBzaW1wbGlmeURQU3RlcChwb2ludHMsIDAsIGxhc3QsIHNxVG9sZXJhbmNlLCBzaW1wbGlmaWVkKTtcbiAgICBzaW1wbGlmaWVkLnB1c2gocG9pbnRzW2xhc3RdKTtcblxuICAgIHJldHVybiBzaW1wbGlmaWVkO1xufVxuXG4vLyBib3RoIGFsZ29yaXRobXMgY29tYmluZWQgZm9yIGF3ZXNvbWUgcGVyZm9ybWFuY2VcbmZ1bmN0aW9uIHNpbXBsaWZ5KHBvaW50cywgdG9sZXJhbmNlLCBoaWdoZXN0UXVhbGl0eSkge1xuXG4gICAgaWYgKHBvaW50cy5sZW5ndGggPD0gMikgcmV0dXJuIHBvaW50cztcblxuICAgIHZhciBzcVRvbGVyYW5jZSA9IHRvbGVyYW5jZSAhPT0gdW5kZWZpbmVkID8gdG9sZXJhbmNlICogdG9sZXJhbmNlIDogMTtcblxuICAgIHBvaW50cyA9IGhpZ2hlc3RRdWFsaXR5ID8gcG9pbnRzIDogc2ltcGxpZnlSYWRpYWxEaXN0KHBvaW50cywgc3FUb2xlcmFuY2UpO1xuICAgIHBvaW50cyA9IHNpbXBsaWZ5RG91Z2xhc1BldWNrZXIocG9pbnRzLCBzcVRvbGVyYW5jZSk7XG5cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuXG4vLyBleHBvcnQgYXMgQU1EIG1vZHVsZSAvIE5vZGUgbW9kdWxlIC8gYnJvd3NlciBvciB3b3JrZXIgdmFyaWFibGVcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHNpbXBsaWZ5OyB9KTtcbmVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzaW1wbGlmeTtcbiAgICBtb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gc2ltcGxpZnk7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgc2VsZi5zaW1wbGlmeSA9IHNpbXBsaWZ5O1xuZWxzZSB3aW5kb3cuc2ltcGxpZnkgPSBzaW1wbGlmeTtcblxufSkoKTtcbiIsImltcG9ydCAqIGFzIGxvZyBmcm9tICdsb2dsZXZlbCc7XG5pbXBvcnQgKiBhcyBkYXQgZnJvbSAnZGF0Lmd1aSc7XG5cbmltcG9ydCBUZW5zb3JGaWVsZEludGVyZmFjZSBmcm9tICcuL3RzL2ludGVyZmFjZS90ZW5zb3JfZmllbGRfaW50ZXJmYWNlJztcbmltcG9ydCB7R3JpZCwgUmFkaWFsfSBmcm9tICcuL3RzL2ltcGwvYmFzaXNfZmllbGQnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuL3RzL3ZlY3Rvcic7XG5pbXBvcnQgQ2FudmFzV3JhcHBlciBmcm9tICcuL3RzL2ludGVyZmFjZS9jYW52YXNfd3JhcHBlcic7XG5pbXBvcnQgVXRpbCBmcm9tICcuL3RzL3V0aWwnO1xuaW1wb3J0IERyYWdDb250cm9sbGVyIGZyb20gJy4vdHMvaW50ZXJmYWNlL2RyYWdfY29udHJvbGxlcic7XG5pbXBvcnQgRG9tYWluQ29udHJvbGxlciBmcm9tICcuL3RzL2ludGVyZmFjZS9kb21haW5fY29udHJvbGxlcic7XG5pbXBvcnQge0V1bGVySW50ZWdyYXRvciwgUks0SW50ZWdyYXRvcn0gZnJvbSAnLi90cy9pbXBsL2ludGVncmF0b3InO1xuaW1wb3J0IHtTdHJlYW1saW5lUGFyYW1zfSBmcm9tICcuL3RzL2ltcGwvc3RyZWFtbGluZXMnO1xuaW1wb3J0IFN0cmVhbWxpbmVHZW5lcmF0b3IgZnJvbSAnLi90cy9pbXBsL3N0cmVhbWxpbmVzJztcblxuY29uc3Qgc2l6ZSA9IDgwMDtcbmNvbnN0IGRjID0gRG9tYWluQ29udHJvbGxlci5nZXRJbnN0YW5jZShWZWN0b3IuZnJvbVNjYWxhcihzaXplKSk7XG5jb25zdCBjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoVXRpbC5DQU5WQVNfSUQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuY29uc3QgY2FudmFzID0gbmV3IENhbnZhc1dyYXBwZXIoYywgc2l6ZSwgc2l6ZSk7XG5jb25zdCBndWk6IGRhdC5HVUkgPSBuZXcgZGF0LkdVSSgpO1xuY29uc3QgdGVuc29yRm9sZGVyID0gZ3VpLmFkZEZvbGRlcignVGVuc29yIEZpZWxkJyk7XG5cbmNvbnN0IGZpZWxkID0gbmV3IFRlbnNvckZpZWxkSW50ZXJmYWNlKHRlbnNvckZvbGRlciwgbmV3IERyYWdDb250cm9sbGVyKGd1aSkpO1xuZmllbGQuYWRkR3JpZChuZXcgVmVjdG9yKDAsIDApLCBzaXplLCAyMCwgTWF0aC5QSSAvIDQpO1xuZmllbGQuYWRkR3JpZChuZXcgVmVjdG9yKHNpemUsIHNpemUpLCBzaXplLCAyMCwgMCk7XG5maWVsZC5hZGRSYWRpYWwobmV3IFZlY3RvcihzaXplLzIsIHNpemUvMiksIDMwMCwgMjApO1xuXG5jb25zdCBtaW5vclBhcmFtczogU3RyZWFtbGluZVBhcmFtcyA9IHtcbiAgICBkc2VwOiAyMCxcbiAgICBkdGVzdDogMTAsXG4gICAgZHN0ZXA6IDEsXG4gICAgZGxvb2thaGVhZDogMTAwLFxuICAgIGRjaXJjbGVqb2luOiA1LFxuICAgIGpvaW5hbmdsZTogMC4xLCAgLy8gYXBwcm94IDMwZGVnXG4gICAgcGF0aEl0ZXJhdGlvbnM6IDEwMDAsXG4gICAgc2VlZFRyaWVzOiAzMDAsXG4gICAgc2ltcGxpZnlUb2xlcmFuY2U6IDAuNSxcbn07XG5cbmNvbnN0IG1ham9yUGFyYW1zOiBTdHJlYW1saW5lUGFyYW1zID0ge1xuICAgIGRzZXA6IDEwMCxcbiAgICBkdGVzdDogMzAsXG4gICAgZHN0ZXA6IDEsXG4gICAgZGxvb2thaGVhZDogMjAwLFxuICAgIGRjaXJjbGVqb2luOiA1LFxuICAgIGpvaW5hbmdsZTogMC4xLCAgLy8gYXBwcm94IDEwZGVnXG4gICAgcGF0aEl0ZXJhdGlvbnM6IDEwMDAsXG4gICAgc2VlZFRyaWVzOiAzMDAsXG4gICAgc2ltcGxpZnlUb2xlcmFuY2U6IDAuNSxcbn07XG5cbmd1aS5hZGQobWlub3JQYXJhbXMsICdkc3RlcCcpO1xuZ3VpLmFkZChtaW5vclBhcmFtcywgJ2RzZXAnKTtcbmd1aS5hZGQobWlub3JQYXJhbXMsICdkdGVzdCcpO1xuZ3VpLmFkZChtYWpvclBhcmFtcywgJ2RzdGVwJyk7XG5ndWkuYWRkKG1ham9yUGFyYW1zLCAnZHNlcCcpO1xuZ3VpLmFkZChtYWpvclBhcmFtcywgJ2R0ZXN0Jyk7XG5ndWkuYWRkKGRjLCAnem9vbScsIDAsIDUpO1xuXG5jb25zdCBpbnRlZ3JhdG9yID0gbmV3IFJLNEludGVncmF0b3IoZmllbGQsIG1pbm9yUGFyYW1zKTtcbmxldCBtYWpvciA9IG5ldyBTdHJlYW1saW5lR2VuZXJhdG9yKGludGVncmF0b3IsIGRjLm9yaWdpbiwgZGMud29ybGREaW1lbnNpb25zLCBtYWpvclBhcmFtcyk7XG5sZXQgbWlub3IgPSBuZXcgU3RyZWFtbGluZUdlbmVyYXRvcihpbnRlZ3JhdG9yLCBkYy5vcmlnaW4sIGRjLndvcmxkRGltZW5zaW9ucywgbWlub3JQYXJhbXMpO1xuXG5mdW5jdGlvbiBzZXRTdHJlYW1saW5lKCkge1xuICAgIG1ham9yID0gbmV3IFN0cmVhbWxpbmVHZW5lcmF0b3IoaW50ZWdyYXRvciwgZGMub3JpZ2luLCBkYy53b3JsZERpbWVuc2lvbnMsIG1ham9yUGFyYW1zKTtcbiAgICBtaW5vciA9IG5ldyBTdHJlYW1saW5lR2VuZXJhdG9yKGludGVncmF0b3IsIGRjLm9yaWdpbiwgZGMud29ybGREaW1lbnNpb25zLCBtaW5vclBhcmFtcyk7XG4gICAgbWFqb3IuY3JlYXRlQWxsU3RyZWFtbGluZXMoKTtcbiAgICBtYWpvci5qb2luRGFuZ2xpbmdTdHJlYW1saW5lcygpO1xuICAgIG1pbm9yLmFkZEV4aXN0aW5nU3RyZWFtbGluZXMobWFqb3IpO1xuICAgIG1pbm9yLmNyZWF0ZUFsbFN0cmVhbWxpbmVzKCk7XG59XG5cbmZ1bmN0aW9uIGpvaW5NYWpvcigpIHtcbiAgICBtYWpvci5qb2luRGFuZ2xpbmdTdHJlYW1saW5lcygpO1xufVxuXG5mdW5jdGlvbiBqb2luTWlub3IoKSB7XG4gICAgbWlub3Iuam9pbkRhbmdsaW5nU3RyZWFtbGluZXMoKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFqb3JTdHJlYW1saW5lcygpOiBWZWN0b3JbXVtdIHtcbiAgICByZXR1cm4gbWFqb3IuYWxsU3RyZWFtbGluZXNTaW1wbGU7XG59XG5cbmZ1bmN0aW9uIGdldE1pbm9yU3RyZWFtbGluZXMoKTogVmVjdG9yW11bXSB7XG4gICAgcmV0dXJuIG1pbm9yLmFsbFN0cmVhbWxpbmVzU2ltcGxlO1xufVxuXG5jb25zdCB0bXBPYmogPSB7XG4gICAgc2V0U3RyZWFtbGluZTogc2V0U3RyZWFtbGluZSxcbiAgICBqb2luTWFqb3I6IGpvaW5NYWpvcixcbiAgICBqb2luTWlub3I6IGpvaW5NaW5vcixcbn07XG5cbmd1aS5hZGQodG1wT2JqLCAnc2V0U3RyZWFtbGluZScpO1xuZ3VpLmFkZCh0bXBPYmosICdqb2luTWFqb3InKTtcbmd1aS5hZGQodG1wT2JqLCAnam9pbk1pbm9yJyk7XG5cbmZ1bmN0aW9uIGdldFRlbnNvckxpbmUocG9pbnQ6IFZlY3RvciwgdjogVmVjdG9yLCBsZW5ndGg6IG51bWJlcik6IFZlY3RvcltdIHtcbiAgICBjb25zdCB0cmFuc2Zvcm1lZCA9IGRjLndvcmxkVG9TY3JlZW4ocG9pbnQuY2xvbmUoKSk7XG4gICAgY29uc3QgZGlmZiA9IHYubXVsdGlwbHlTY2FsYXIobGVuZ3RoIC8gMik7XG4gICAgY29uc3Qgc3RhcnQgPSB0cmFuc2Zvcm1lZC5jbG9uZSgpLnN1YihkaWZmKTtcbiAgICBjb25zdCBlbmQgPSB0cmFuc2Zvcm1lZC5jbG9uZSgpLmFkZChkaWZmKTtcbiAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xufVxuXG5mdW5jdGlvbiBkcmF3KCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgY29uc3Qgc2FtcGxlcyA9IDYwO1xuICAgIGNvbnN0IGxlbmd0aCA9IDEyO1xuICAgIGNhbnZhcy5zZXRTdHJva2VTdHlsZSgnd2hpdGUnKTtcbiAgICBjYW52YXMuc2V0RmlsbFN0eWxlKCdibGFjaycpO1xuICAgIGNhbnZhcy5zZXRMaW5lV2lkdGgoMSk7XG4gICAgY2FudmFzLmNsZWFyQ2FudmFzKCk7XG5cbiAgICBjb25zdCBzdGVwID0gc2l6ZS9zYW1wbGVzO1xuICAgIGNvbnN0IHhTdGFydCA9IHN0ZXAgLSAoZGMub3JpZ2luLnggJSBzdGVwKTtcbiAgICBjb25zdCB5U3RhcnQgPSBzdGVwIC0gKGRjLm9yaWdpbi55ICUgc3RlcCk7XG5cbiAgICBmb3IgKGxldCB4ID0geFN0YXJ0IC0gc3RlcDsgeCA8PSBzaXplICsgc3RlcDsgeCArPSBzaXplL3NhbXBsZXMpIHtcbiAgICAgICAgZm9yIChsZXQgeSA9IHlTdGFydCAtIHN0ZXA7IHkgPD0gc2l6ZSArIHN0ZXA7IHkgKz0gc2l6ZS9zYW1wbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBwb2ludCA9IGRjLnNjcmVlblRvV29ybGQobmV3IFZlY3Rvcih4LCB5KSk7XG4gICAgICAgICAgICBjb25zdCB0ID0gZmllbGQuc2FtcGxlUG9pbnQocG9pbnQpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdQb2x5bGluZShnZXRUZW5zb3JMaW5lKHBvaW50LCB0LmdldE1ham9yKCksIGxlbmd0aCkpO1xuICAgICAgICAgICAgY2FudmFzLmRyYXdQb2x5bGluZShnZXRUZW5zb3JMaW5lKHBvaW50LCB0LmdldE1pbm9yKCksIGxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzLnNldEZpbGxTdHlsZSgncmVkJyk7XG4gICAgZmllbGQuZ2V0Q2VudHJlUG9pbnRzKCkuZm9yRWFjaCh2ID0+IGNhbnZhcy5kcmF3U3F1YXJlKGRjLndvcmxkVG9TY3JlZW4odiksIDcpKTtcblxuICAgIGlmIChnZXRNaW5vclN0cmVhbWxpbmVzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICBjYW52YXMuc2V0RmlsbFN0eWxlKCcjRUNFNURCJyk7XG4gICAgICAgIGNhbnZhcy5jbGVhckNhbnZhcygpO1xuXG4gICAgICAgIGNhbnZhcy5zZXRTdHJva2VTdHlsZSgnIzAyMDIwMicpO1xuICAgICAgICBjYW52YXMuc2V0TGluZVdpZHRoKDMpO1xuICAgICAgICBnZXRNaW5vclN0cmVhbWxpbmVzKCkuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgIGNhbnZhcy5kcmF3UG9seWxpbmUocy5tYXAodiA9PiBkYy53b3JsZFRvU2NyZWVuKHYuY2xvbmUoKSkpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FudmFzLnNldFN0cm9rZVN0eWxlKCcjRjhGOEY4Jyk7XG4gICAgICAgIGNhbnZhcy5zZXRMaW5lV2lkdGgoMik7XG4gICAgICAgIGdldE1pbm9yU3RyZWFtbGluZXMoKS5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdQb2x5bGluZShzLm1hcCh2ID0+IGRjLndvcmxkVG9TY3JlZW4odi5jbG9uZSgpKSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZ2V0TWFqb3JTdHJlYW1saW5lcygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gdGhpcy5DT0xfTUFKX0lOID0gXCIjRkFGQTdBXCI7XG4gICAgICAgIC8vIHRoaXMuQ09MX01BSl9PVVQgPSBcIiMyODI4MjhcIjtcbiAgICAgICAgY2FudmFzLnNldFN0cm9rZVN0eWxlKCcjMjgyODI4Jyk7XG4gICAgICAgIGNhbnZhcy5zZXRMaW5lV2lkdGgoNSk7XG4gICAgICAgIGdldE1ham9yU3RyZWFtbGluZXMoKS5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgY2FudmFzLmRyYXdQb2x5bGluZShzLm1hcCh2ID0+IGRjLndvcmxkVG9TY3JlZW4odi5jbG9uZSgpKSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjYW52YXMuc2V0U3Ryb2tlU3R5bGUoJyNGQUZBN0EnKTtcbiAgICAgICAgY2FudmFzLnNldExpbmVXaWR0aCg0KTtcbiAgICAgICAgZ2V0TWFqb3JTdHJlYW1saW5lcygpLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICBjYW52YXMuZHJhd1BvbHlsaW5lKHMubWFwKHYgPT4gZGMud29ybGRUb1NjcmVlbih2LmNsb25lKCkpKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgYXQgMzBmcHNcbiAgICB3aGlsZSAocGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFRpbWUgPCAxMDAwLzMwKSB7XG4gICAgICAgIG1ham9yLnVwZGF0ZSgpO1xuICAgICAgICBtaW5vci51cGRhdGUoKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdyk7XG59XG5cbnJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTtcblxuIiwiaW1wb3J0ICogYXMgbG9nIGZyb20gJ2xvZ2xldmVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyKSB7fVxuXG4gICAgc3RhdGljIHplcm9WZWN0b3IoKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoMCwgMCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZyb21TY2FsYXIoczogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3Iocywgcyk7XG4gICAgfVxuXG4gICAgYWRkKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHRoaXMueCArPSB2Lng7XG4gICAgICAgIHRoaXMueSArPSB2Lnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuZ2xlIGluIHJhZGlhbnMgdG8gcG9zaXRpdmUgeC1heGlzIGJldHdlZW4gLXBpIGFuZCBwaVxuICAgICAqL1xuICAgIGFuZ2xlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMueSwgdGhpcy54KTtcbiAgICB9XG5cbiAgICBjbG9uZSgpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XG4gICAgfVxuXG4gICAgY29weSh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICB0aGlzLnggPSB2Lng7XG4gICAgICAgIHRoaXMueSA9IHYueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY3Jvc3ModjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHYueSAtIHRoaXMueSAqIHYueDtcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvKHY6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVRvU3F1YXJlZCh2KSk7XG4gICAgfVxuXG4gICAgZGlzdGFuY2VUb1NxdWFyZWQgKHY6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGR4ID0gdGhpcy54IC0gdi54XG4gICAgICAgIGNvbnN0IGR5ID0gdGhpcy55IC0gdi55O1xuICAgICAgICByZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XG4gICAgfVxuXG4gICAgZGl2aWRlKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIGlmICh2LnggPT09IDAgfHwgdi55ID09PSAwKSB7XG4gICAgICAgICAgICBsb2cud2FybihcIkRpdmlzaW9uIGJ5IHplcm9cIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMueCAvPSB2Lng7XG4gICAgICAgIHRoaXMueSAvPSB2Lnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGRpdmlkZVNjYWxhcihzOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICBpZiAocyA9PT0gMCkge1xuICAgICAgICAgICAgbG9nLndhcm4oXCJEaXZpc2lvbiBieSB6ZXJvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubXVsdGlwbHlTY2FsYXIoMSAvIHMpO1xuICAgIH1cblxuICAgIGRvdCh2OiBWZWN0b3IpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55O1xuICAgIH1cblxuICAgIGVxdWFscyh2OiBWZWN0b3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICgodi54ID09PSB0aGlzLngpICYmICh2LnkgPT09IHRoaXMueSkpO1xuICAgIH1cblxuICAgIGxlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3EoKSk7XG4gICAgfVxuXG4gICAgbGVuZ3RoU3EoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueCAqIHRoaXMueCArIHRoaXMueSAqIHRoaXMueTtcbiAgICB9XG5cbiAgICBtdWxpdHBseSh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICB0aGlzLnggKj0gdi54O1xuICAgICAgICB0aGlzLnkgKj0gdi55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtdWx0aXBseVNjYWxhcihzOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICB0aGlzLnggKj0gcztcbiAgICAgICAgdGhpcy55ICo9IHM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG5lZ2F0ZSgpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigtMSk7XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKCk6IFZlY3RvciB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLmxlbmd0aCgpO1xuICAgICAgICBpZiAobCA9PT0gMCkge1xuICAgICAgICAgICAgbG9nLndhcm4oXCJaZXJvIFZlY3RvclwiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5kaXZpZGVTY2FsYXIodGhpcy5sZW5ndGgoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW5nbGUgaW4gcmFkaWFuc1xuICAgICAqL1xuICAgIHJvdGF0ZUFyb3VuZChjZW50ZXI6IFZlY3RvciwgYW5nbGU6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGNvbnN0IGNvcyA9IE1hdGguY29zKGFuZ2xlKVxuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMueCAtIGNlbnRlci54O1xuICAgICAgICBjb25zdCB5ID0gdGhpcy55IC0gY2VudGVyLnk7XG5cbiAgICAgICAgdGhpcy54ID0geCAqIGNvcyAtIHkgKiBzaW4gKyBjZW50ZXIueDtcbiAgICAgICAgdGhpcy55ID0geCAqIHNpbiArIHkgKiBjb3MgKyBjZW50ZXIueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0KHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHRoaXMueCA9IHYueDtcbiAgICAgICAgdGhpcy55ID0gdi55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRMZW5ndGggKGxlbmd0aDogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIobGVuZ3RoKTtcbiAgICB9XG5cbiAgICBzdWIodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgdGhpcy54IC09IHYueDtcbiAgICAgICAgdGhpcy55IC09IHYueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiaW1wb3J0IFRlbnNvciBmcm9tICcuL3RlbnNvcic7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL3ZlY3Rvcic7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNpc0ZpZWxkIHtcbiAgICBhYnN0cmFjdCByZWFkb25seSBGT0xERVJfTkFNRTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBzdGF0aWMgZm9sZGVyTmFtZUluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByb3RlY3RlZCBfY2VudHJlOiBWZWN0b3I7XG5cbiAgICBjb25zdHJ1Y3RvcihjZW50cmU6IFZlY3RvciwgcHJvdGVjdGVkIF9zaXplOiBudW1iZXIsIHByb3RlY3RlZCBfZGVjYXk6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9jZW50cmUgPSBjZW50cmUuY2xvbmUoKTtcbiAgICB9XG5cbiAgICBzZXQgY2VudHJlKGNlbnRyZTogVmVjdG9yKSB7XG4gICAgICAgIHRoaXMuX2NlbnRyZS5jb3B5KGNlbnRyZSk7XG4gICAgfVxuXG4gICAgZ2V0IGNlbnRyZSgpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5fY2VudHJlLmNsb25lKCk7XG4gICAgfVxuXG4gICAgc2V0IGRlY2F5KGRlY2F5OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZGVjYXkgPSBkZWNheTtcbiAgICB9XG5cbiAgICBzZXQgc2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgfVxuXG4gICAgZHJhZ01vdmVMaXN0ZW5lcihkZWx0YTogVmVjdG9yKTogdm9pZCB7XG4gICAgICAgIC8vIERlbHRhIGFzc3VtZWQgdG8gYmUgaW4gd29ybGQgc3BhY2UgKG9ubHkgcmVsZXZhbnQgd2hlbiB6b29tZWQpXG4gICAgICAgIHRoaXMuX2NlbnRyZS5hZGQoZGVsdGEpO1xuICAgIH1cblxuICAgIGFic3RyYWN0IGdldFRlbnNvcihwb2ludDogVmVjdG9yKTogVGVuc29yO1xuXG4gICAgZ2V0V2VpZ2h0ZWRUZW5zb3IocG9pbnQ6IFZlY3Rvcik6IFRlbnNvciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFRlbnNvcihwb2ludCkuc2NhbGUodGhpcy5nZXRUZW5zb3JXZWlnaHQocG9pbnQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgZm9sZGVyIGFuZCBhZGRzIGl0IHRvIHRoZSBHVUkgdG8gY29udHJvbCBwYXJhbXNcbiAgICAgKi9cbiAgICBzZXRHdWkoZ3VpOiBkYXQuR1VJKTogdm9pZCB7XG4gICAgICAgIGd1aS5hZGQodGhpcy5fY2VudHJlLCAneCcpO1xuICAgICAgICBndWkuYWRkKHRoaXMuX2NlbnRyZSwgJ3knKTtcbiAgICAgICAgZ3VpLmFkZCh0aGlzLCAnX3NpemUnKTtcbiAgICAgICAgZ3VpLmFkZCh0aGlzLCAnX2RlY2F5JywgMCwgNTApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVycG9sYXRlcyBiZXR3ZWVuICgwIGFuZCAxKV5kZWNheVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBnZXRUZW5zb3JXZWlnaHQocG9pbnQ6IFZlY3Rvcik6IG51bWJlciB7ICAgICAgICBcbiAgICAgICAgY29uc3Qgbm9ybURpc3RhbmNlVG9DZW50cmUgPSBwb2ludC5jbG9uZSgpLnN1Yih0aGlzLl9jZW50cmUpLmxlbmd0aCgpIC8gdGhpcy5fc2l6ZTtcbiAgICAgICAgXG4gICAgICAgIC8vIFN0b3AgKCoqIDApIHR1cm5pbmcgd2VpZ2h0IGludG8gMSwgZmlsbGluZyBzY3JlZW4gZXZlbiB3aGVuIG91dHNpZGUgJ3NpemUnXG4gICAgICAgIGlmICh0aGlzLl9kZWNheSA9PT0gMCAmJiBub3JtRGlzdGFuY2VUb0NlbnRyZSA+PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgKDEgLSBub3JtRGlzdGFuY2VUb0NlbnRyZSkpICoqIHRoaXMuX2RlY2F5O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdyaWQgZXh0ZW5kcyBCYXNpc0ZpZWxkIHtcbiAgICByZWFkb25seSBGT0xERVJfTkFNRSA9IGBHcmlkICR7R3JpZC5mb2xkZXJOYW1lSW5kZXgrK31gO1xuXG4gICAgY29uc3RydWN0b3IoY2VudHJlOiBWZWN0b3IsIHNpemU6IG51bWJlciwgZGVjYXk6IG51bWJlciwgcHJpdmF0ZSBfdGhldGE6IG51bWJlcikge1xuICAgICAgICBzdXBlcihjZW50cmUsIHNpemUsIGRlY2F5KTtcbiAgICB9XG5cbiAgICBzZXQgdGhldGEodGhldGE6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90aGV0YSA9IHRoZXRhO1xuICAgIH1cblxuICAgIHNldEd1aShndWk6IGRhdC5HVUkpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuc2V0R3VpKGd1aSk7XG5cbiAgICAgICAgLy8gR1VJIGluIGRlZ3JlZXMsIGNvbnZlcnQgdG8gcmFkc1xuICAgICAgICBjb25zdCB0aGV0YVByb3AgPSB7dGhldGE6IHRoaXMuX3RoZXRhICogMTgwIC8gTWF0aC5QSX07XG4gICAgICAgIGNvbnN0IHRoZXRhQ29udHJvbGxlciA9IGd1aS5hZGQodGhldGFQcm9wLCAndGhldGEnLCAtOTAsIDkwKTtcbiAgICAgICAgdGhldGFDb250cm9sbGVyLm9uQ2hhbmdlKHRoZXRhID0+IHRoaXMuX3RoZXRhID0gdGhldGEgKiAoTWF0aC5QSSAvIDE4MCkpO1xuICAgIH1cblxuICAgIGdldFRlbnNvcihwb2ludDogVmVjdG9yKTogVGVuc29yIHtcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoMiAqIHRoaXMuX3RoZXRhKTtcbiAgICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oMiAqIHRoaXMuX3RoZXRhKTtcbiAgICAgICAgcmV0dXJuIG5ldyBUZW5zb3IoMSwgW2Nvcywgc2luXSk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmFkaWFsIGV4dGVuZHMgQmFzaXNGaWVsZCB7XG4gICAgcmVhZG9ubHkgRk9MREVSX05BTUUgPSBgUmFkaWFsICR7UmFkaWFsLmZvbGRlck5hbWVJbmRleCsrfWA7XG4gICAgY29uc3RydWN0b3IoY2VudHJlOiBWZWN0b3IsIHNpemU6IG51bWJlciwgZGVjYXk6IG51bWJlcikge1xuICAgICAgICBzdXBlcihjZW50cmUsIHNpemUsIGRlY2F5KTtcbiAgICB9XG5cbiAgICBnZXRUZW5zb3IocG9pbnQ6IFZlY3Rvcik6IFRlbnNvciB7XG4gICAgICAgIGNvbnN0IHQgPSBwb2ludC5jbG9uZSgpLnN1Yih0aGlzLl9jZW50cmUpO1xuICAgICAgICBjb25zdCB0MSA9IHQueSoqMiAtIHQueCoqMjtcbiAgICAgICAgY29uc3QgdDIgPSAtMiAqIHQueCAqIHQueTtcbiAgICAgICAgcmV0dXJuIG5ldyBUZW5zb3IoMSwgW3QxLCB0Ml0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGxvZyBmcm9tICdsb2dsZXZlbCc7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL3ZlY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWRTdG9yYWdlIHtcblxuICAgIHByaXZhdGUgZ3JpZERpbWVuc2lvbnM6IFZlY3RvcjtcbiAgICBwcml2YXRlIGdyaWQ6IFZlY3RvcltdW11bXTtcbiAgICBwcml2YXRlIGRzZXBTcTogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogd29ybGREaW1lbnNpb25zIGFzc3VtZXMgb3JpZ2luIG9mIDAsMFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkc2VwIFNlcGFyYXRpb24gZGlzdGFuY2UgYmV0d2VlbiBzYW1wbGVzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgd29ybGREaW1lbnNpb25zOiBWZWN0b3IsIHByaXZhdGUgb3JpZ2luOiBWZWN0b3IsIHByaXZhdGUgZHNlcDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZHNlcFNxID0gdGhpcy5kc2VwICogdGhpcy5kc2VwO1xuICAgICAgICB0aGlzLmdyaWREaW1lbnNpb25zID0gd29ybGREaW1lbnNpb25zLmNsb25lKCkuZGl2aWRlU2NhbGFyKHRoaXMuZHNlcCk7XG4gICAgICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuZ3JpZERpbWVuc2lvbnMueDsgeCsrKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWQucHVzaChbXSk7XG4gICAgICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuZ3JpZERpbWVuc2lvbnMueTsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmlkW3hdLnB1c2goW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFsbCBzYW1wbGVzIGZyb20gYW5vdGhlciBncmlkIHRvIHRoaXMgb25lXG4gICAgICovXG4gICAgYWRkQWxsKGdyaWRTdG9yYWdlOiBHcmlkU3RvcmFnZSk6IHZvaWQge1xuICAgICAgICBncmlkU3RvcmFnZS5ncmlkLmZvckVhY2gocm93ID0+IHJvdy5mb3JFYWNoKGNlbGwgPT4gY2VsbC5mb3JFYWNoKHNhbXBsZSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yT3V0T2ZCb3VuZHMoc2FtcGxlLCB0aGlzLndvcmxkRGltZW5zaW9ucykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNhbXBsZShzYW1wbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSkpO1xuICAgIH1cblxuICAgIGFkZFBvbHlsaW5lKGxpbmU6IFZlY3RvcltdKTogdm9pZCB7XG4gICAgICAgIGxpbmUuZm9yRWFjaCh2ID0+IHRoaXMuYWRkU2FtcGxlKHYpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEb2VzIG5vdCBlbmZvcmNlIHNlcGFyYXRpb25cbiAgICAgKiBEb2VzIG5vdCBjbG9uZVxuICAgICAqL1xuICAgIGFkZFNhbXBsZSh2OiBWZWN0b3IsIGNvb3Jkcz86IFZlY3Rvcik6IHZvaWQge1xuICAgICAgICBpZiAoIWNvb3Jkcykge1xuICAgICAgICAgICAgY29vcmRzID0gdGhpcy5nZXRTYW1wbGVDb29yZHModik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncmlkW2Nvb3Jkcy54XVtjb29yZHMueV0ucHVzaCh2KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB3aGV0aGVyIHYgaXMgYXQgbGVhc3QgZCBhd2F5IGZyb20gc2FtcGxlc1xuICAgICAqIFBlcmZvcm1hbmNlIHZlcnkgaW1wb3J0YW50IC0gdGhpcyBpcyBjYWxsZWQgYXQgZXZlcnkgaW50ZWdyYXRpb24gc3RlcFxuICAgICAqIEBwYXJhbSBkU3E9dGhpcy5kc2VwU3Egc3F1YXJlZCB0ZXN0IGRpc3RhbmNlXG4gICAgICogQ291bGQgYmUgZHRlc3QgaWYgd2UgYXJlIGludGVncmF0aW5nIGEgc3RyZWFtbGluZVxuICAgICAqL1xuICAgIGlzVmFsaWRTYW1wbGUodjogVmVjdG9yLCBkU3E9dGhpcy5kc2VwU3EpOiBib29sZWFuIHtcbiAgICAgICAgLy8gQ29kZSBkdXBsaWNhdGlvbiB3aXRoIHRoaXMuZ2V0TmVhcmJ5UG9pbnRzIGJ1dCBtdWNoIHNsb3dlciB3aGVuIGNhbGxpbmdcbiAgICAgICAgLy8gdGhpcy5nZXROZWFyYnlQb2ludHMgZHVlIHRvIGFycmF5IGNyZWF0aW9uIGluIHRoYXQgbWV0aG9kXG5cbiAgICAgICAgY29uc3QgY29vcmRzID0gdGhpcy5nZXRTYW1wbGVDb29yZHModik7XG5cbiAgICAgICAgLy8gQ2hlY2sgc2FtcGxlcyBpbiA5IGNlbGxzIGluIDN4MyBncmlkXG4gICAgICAgIGZvciAobGV0IHggPSAtMTsgeCA8PSAxOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMTsgeSA8PSAxOyB5KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gY29vcmRzLmNsb25lKCkuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JPdXRPZkJvdW5kcyhjZWxsLCB0aGlzLmdyaWREaW1lbnNpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmVjdG9yRmFyRnJvbVZlY3RvcnModiwgdGhpcy5ncmlkW2NlbGwueF1bY2VsbC55XSwgZFNxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8qKlxuICAgICAqIFRlc3Qgd2hldGhlciB2IGlzIGF0IGxlYXN0IGQgYXdheSBmcm9tIHZlY3RvcnNcbiAgICAgKiBQZXJmb3JtYW5jZSB2ZXJ5IGltcG9ydGFudCAtIHRoaXMgaXMgY2FsbGVkIGF0IGV2ZXJ5IGludGVncmF0aW9uIHN0ZXBcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gICBkU3EgICAgIHNxdWFyZWQgdGVzdCBkaXN0YW5jZVxuICAgICAqL1xuICAgIHZlY3RvckZhckZyb21WZWN0b3JzKHY6IFZlY3RvciwgdmVjdG9yczogVmVjdG9yW10sIGRTcTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGZvciAoY29uc3Qgc2FtcGxlIG9mIHZlY3RvcnMpIHtcbiAgICAgICAgICAgIGlmIChzYW1wbGUgIT09IHYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZVNxID0gc2FtcGxlLmRpc3RhbmNlVG9TcXVhcmVkKHYpO1xuICAgICAgICAgICAgICAgIGlmIChkaXN0YW5jZVNxIDwgZFNxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHBvaW50cyBpbiBjZWxscyBzdXJyb3VuZGluZyB2XG4gICAgICogUmVzdWx0cyBpbmNsdWRlIHYsIGlmIGl0IGV4aXN0cyBpbiB0aGUgZ3JpZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByZXR1cm5zIHNhbXBsZXMgKGtpbmQgb2YpIGNsb3NlciB0aGFuIGRpc3RhbmNlIC0gcmV0dXJucyBhbGwgc2FtcGxlcyBpbiBcbiAgICAgKiBjZWxscyBzbyBhcHByb3hpbWF0aW9uIChzcXVhcmUgdG8gYXBwcm94aW1hdGUgY2lyY2xlKVxuICAgICAqL1xuICAgIGdldE5lYXJieVBvaW50cyh2OiBWZWN0b3IsIGRpc3RhbmNlOiBudW1iZXIpOiBWZWN0b3JbXSB7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGguY2VpbCgoZGlzdGFuY2UvdGhpcy5kc2VwKSAtIDAuNSk7XG4gICAgICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMuZ2V0U2FtcGxlQ29vcmRzKHYpO1xuICAgICAgICBjb25zdCBvdXQ6IFZlY3RvcltdID0gW107XG4gICAgICAgIGZvciAobGV0IHggPSAtMSAqIHJhZGl1czsgeCA8PSAxICogcmFkaXVzOyB4KyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IHkgPSAtMSAqIHJhZGl1czsgeSA8PSAxICogcmFkaXVzOyB5KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gY29vcmRzLmNsb25lKCkuYWRkKG5ldyBWZWN0b3IoeCwgeSkpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy52ZWN0b3JPdXRPZkJvdW5kcyhjZWxsLCB0aGlzLmdyaWREaW1lbnNpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyaWRbY2VsbC54XVtjZWxsLnldLmZvckVhY2godjIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2godjIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIHByaXZhdGUgd29ybGRUb0dyaWQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHYuY2xvbmUoKS5zdWIodGhpcy5vcmlnaW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ3JpZFRvV29ybGQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHYuY2xvbmUoKS5hZGQodGhpcy5vcmlnaW4pO1xuICAgIH1cblxuICAgIHByaXZhdGUgdmVjdG9yT3V0T2ZCb3VuZHMoZ3JpZFY6IFZlY3RvciwgYm91bmRzOiBWZWN0b3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChncmlkVi54IDwgMCB8fCBncmlkVi55IDwgMCB8fFxuICAgICAgICAgICAgZ3JpZFYueCA+PSBib3VuZHMueCB8fCBncmlkVi55ID49IGJvdW5kcy55KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtWZWN0b3J9ICAgQ2VsbCBjb29yZHMgY29ycmVzcG9uZGluZyB0byB2ZWN0b3JcbiAgICAgKiBQZXJmb3JtYW5jZSBpbXBvcnRhbnQgLSBjYWxsZWQgYXQgZXZlcnkgaW50ZWdyYXRpb24gc3RlcFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U2FtcGxlQ29vcmRzKHdvcmxkVjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMud29ybGRUb0dyaWQod29ybGRWKTtcbiAgICAgICAgaWYgKHRoaXMudmVjdG9yT3V0T2ZCb3VuZHModiwgdGhpcy53b3JsZERpbWVuc2lvbnMpKSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoXCJUcmllZCB0byBhY2Nlc3Mgb3V0LW9mLWJvdW5kcyBzYW1wbGUgaW4gZ3JpZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IuemVyb1ZlY3RvcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IoXG4gICAgICAgICAgICBNYXRoLmZsb29yKHYueCAvIHRoaXMuZHNlcCksXG4gICAgICAgICAgICBNYXRoLmZsb29yKHYueSAvIHRoaXMuZHNlcClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVGVuc29yRmllbGQgZnJvbSAnLi90ZW5zb3JfZmllbGQnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuLi92ZWN0b3InO1xuaW1wb3J0IHtTdHJlYW1saW5lUGFyYW1zfSBmcm9tICcuL3N0cmVhbWxpbmVzJztcblxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgRmllbGRJbnRlZ3JhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZmllbGQ6IFRlbnNvckZpZWxkKSB7fVxuXG4gICAgYWJzdHJhY3QgaW50ZWdyYXRlKHBvaW50OiBWZWN0b3IsIG1ham9yOiBib29sZWFuKTogVmVjdG9yO1xuXG4gICAgcHJvdGVjdGVkIHNhbXBsZUZpZWxkVmVjdG9yKHBvaW50OiBWZWN0b3IsIG1ham9yOiBib29sZWFuKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgdGVuc29yID0gdGhpcy5maWVsZC5zYW1wbGVQb2ludChwb2ludCk7XG4gICAgICAgIGlmIChtYWpvcikgcmV0dXJuIHRlbnNvci5nZXRNYWpvcigpO1xuICAgICAgICByZXR1cm4gdGVuc29yLmdldE1pbm9yKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgRXVsZXJJbnRlZ3JhdG9yIGV4dGVuZHMgRmllbGRJbnRlZ3JhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihmaWVsZDogVGVuc29yRmllbGQsIHByaXZhdGUgcGFyYW1zOiBTdHJlYW1saW5lUGFyYW1zKSB7XG4gICAgICAgIHN1cGVyKGZpZWxkKTtcbiAgICB9XG5cbiAgICBpbnRlZ3JhdGUocG9pbnQ6IFZlY3RvciwgbWFqb3I6IGJvb2xlYW4pOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5zYW1wbGVGaWVsZFZlY3Rvcihwb2ludCwgbWFqb3IpLm11bHRpcGx5U2NhbGFyKHRoaXMucGFyYW1zLmRzdGVwKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSSzRJbnRlZ3JhdG9yIGV4dGVuZHMgRmllbGRJbnRlZ3JhdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihmaWVsZDogVGVuc29yRmllbGQsIHByaXZhdGUgcGFyYW1zOiBTdHJlYW1saW5lUGFyYW1zKSB7XG4gICAgICAgIHN1cGVyKGZpZWxkKTtcbiAgICB9XG5cbiAgICBpbnRlZ3JhdGUocG9pbnQ6IFZlY3RvciwgbWFqb3I6IGJvb2xlYW4pOiBWZWN0b3Ige1xuICAgICAgICBjb25zdCBrMSA9IHRoaXMuc2FtcGxlRmllbGRWZWN0b3IocG9pbnQsIG1ham9yKTtcbiAgICAgICAgY29uc3QgazIzID0gdGhpcy5zYW1wbGVGaWVsZFZlY3Rvcihwb2ludC5jbG9uZSgpLmFkZChWZWN0b3IuZnJvbVNjYWxhcih0aGlzLnBhcmFtcy5kc3RlcCAvIDIpKSwgbWFqb3IpO1xuICAgICAgICBjb25zdCBrNCA9IHRoaXMuc2FtcGxlRmllbGRWZWN0b3IocG9pbnQuY2xvbmUoKS5hZGQoVmVjdG9yLmZyb21TY2FsYXIodGhpcy5wYXJhbXMuZHN0ZXApKSwgbWFqb3IpO1xuXG4gICAgICAgIHJldHVybiBrMS5hZGQoazIzLm11bHRpcGx5U2NhbGFyKDQpKS5hZGQoazQpLm11bHRpcGx5U2NhbGFyKHRoaXMucGFyYW1zLmRzdGVwIC8gNik7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgbG9nIGZyb20gJ2xvZ2xldmVsJztcbmltcG9ydCAqIGFzIHNpbXBsaWZ5IGZyb20gJ3NpbXBsaWZ5LWpzJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCBHcmlkU3RvcmFnZSBmcm9tICcuL2dyaWRfc3RvcmFnZSc7XG5pbXBvcnQgRmllbGRJbnRlZ3JhdG9yIGZyb20gJy4vaW50ZWdyYXRvcic7XG5cbmludGVyZmFjZSBTdHJlYW1saW5lSW50ZWdyYXRpb24ge1xuICAgIHN0cmVhbWxpbmU6IFZlY3RvcltdO1xuICAgIHByZXZpb3VzRGlyZWN0aW9uOiBWZWN0b3I7XG4gICAgcHJldmlvdXNQb2ludDogVmVjdG9yO1xuICAgIHZhbGlkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0cmVhbWxpbmVQYXJhbXMge1xuICAgIFtwcm9wOiBzdHJpbmddOiBudW1iZXIsXG4gICAgZHNlcDogbnVtYmVyOyAgLy8gU3RyZWFtbGluZSBzZWVkIHNlcGFyYXRpbmcgZGlzdGFuY2VcbiAgICBkdGVzdDogbnVtYmVyOyAgLy8gU3RyZWFtbGluZSBpbnRlZ3JhdGlvbiBzZXBhcmF0aW5nIGRpc3RhbmNlXG4gICAgZHN0ZXA6IG51bWJlcjsgIC8vIFN0ZXAgc2l6ZVxuICAgIGRjaXJjbGVqb2luOiBudW1iZXI7ICAvLyBIb3cgZmFyIHRvIGxvb2sgdG8gam9pbiBjaXJjbGVzIC0gKGUuZy4gMiB4IGRzdGVwKVxuICAgIGRsb29rYWhlYWQ6IG51bWJlcjsgIC8vIEhvdyBmYXIgdG8gbG9vayBhaGVhZCB0byBqb2luIHVwIGRhbmdsaW5nXG4gICAgam9pbmFuZ2xlOiBudW1iZXI7ICAvLyBBbmdsZSB0byBqb2luIHJvYWRzIGluIHJhZGlhbnNcbiAgICBwYXRoSXRlcmF0aW9uczogbnVtYmVyOyAgLy8gUGF0aCBpbnRlZ3JhdGlvbiBpdGVyYXRpb24gbGltaXRcbiAgICBzZWVkVHJpZXM6IG51bWJlcjsgIC8vIE1heCBmYWlsZWQgc2VlZHNcbiAgICBzaW1wbGlmeVRvbGVyYW5jZTogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJlYW1saW5lR2VuZXJhdG9yIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IFNFRURfQVRfRU5EUE9JTlRTID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIG1ham9yR3JpZDogR3JpZFN0b3JhZ2U7XG4gICAgcHJpdmF0ZSBtaW5vckdyaWQ6IEdyaWRTdG9yYWdlO1xuICAgIHByaXZhdGUgcGFyYW1zU3E6IFN0cmVhbWxpbmVQYXJhbXM7XG5cbiAgICBwcml2YXRlIGNhbmRpZGF0ZVNlZWRzTWFqb3I6IFZlY3RvcltdID0gW107XG4gICAgcHJpdmF0ZSBjYW5kaWRhdGVTZWVkc01pbm9yOiBWZWN0b3JbXSA9IFtdO1xuXG4gICAgcHJpdmF0ZSBzdHJlYW1saW5lc0RvbmU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHByaXZhdGUgbGFzdFN0cmVhbWxpbmVNYWpvcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwdWJsaWMgc3RyZWFtbGluZXNNYWpvcjogVmVjdG9yW11bXSA9IFtdO1xuICAgIHB1YmxpYyBzdHJlYW1saW5lc01pbm9yOiBWZWN0b3JbXVtdID0gW107XG4gICAgcHVibGljIGFsbFN0cmVhbWxpbmVzU2ltcGxlOiBWZWN0b3JbXVtdID0gW107ICAvLyBSZWR1Y2VkIHZlcnRleCBjb3VudFxuXG4gICAgLyoqXG4gICAgICogVXNlcyB3b3JsZC1zcGFjZSBjb29yZGluYXRlc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaW50ZWdyYXRvcjogRmllbGRJbnRlZ3JhdG9yLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JpZ2luOiBWZWN0b3IsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB3b3JsZERpbWVuc2lvbnM6IFZlY3RvcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHBhcmFtczogU3RyZWFtbGluZVBhcmFtcykge1xuICAgICAgICBpZiAocGFyYW1zLmRzdGVwID4gcGFyYW1zLmRzZXApIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihcIlNUUkVBTUxJTkUgU0FNUExFIERJU1RBTkNFIEJJR0dFUiBUSEFOIERTRVBcIik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmZvcmNlIHRlc3QgPCBzZXBcbiAgICAgICAgcGFyYW1zLmR0ZXN0ID0gTWF0aC5taW4ocGFyYW1zLmR0ZXN0LCBwYXJhbXMuZHNlcCk7XG5cbiAgICAgICAgdGhpcy5tYWpvckdyaWQgPSBuZXcgR3JpZFN0b3JhZ2UodGhpcy53b3JsZERpbWVuc2lvbnMsIHRoaXMub3JpZ2luLCBwYXJhbXMuZHNlcCk7XG4gICAgICAgIHRoaXMubWlub3JHcmlkID0gbmV3IEdyaWRTdG9yYWdlKHRoaXMud29ybGREaW1lbnNpb25zLCB0aGlzLm9yaWdpbiwgcGFyYW1zLmRzZXApO1xuXG4gICAgICAgIHRoaXMuc2V0UGFyYW1zU3EoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyBzdHJlYW1saW5lc1xuICAgICAqL1xuICAgIGpvaW5EYW5nbGluZ1N0cmVhbWxpbmVzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdHJlYW1saW5lcyA9IHRoaXMuYWxsU3RyZWFtbGluZXM7XG4gICAgICAgIGlmIChzdHJlYW1saW5lcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgICAgICBmb3IgKGxldCBzdHJlYW1saW5lIG9mIHN0cmVhbWxpbmVzKSB7XG4gICAgICAgICAgICAvLyBJZ25vcmUgY2lyY2xlc1xuICAgICAgICAgICAgaWYgKHN0cmVhbWxpbmVbMF0uZXF1YWxzKHN0cmVhbWxpbmVbc3RyZWFtbGluZS5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbmV3U3RhcnQgPSB0aGlzLmdldEJlc3ROZXh0UG9pbnQoc3RyZWFtbGluZVswXSwgc3RyZWFtbGluZVs0XSwgc3RyZWFtbGluZSlcbiAgICAgICAgICAgIGlmIChuZXdTdGFydCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHN0cmVhbWxpbmUudW5zaGlmdChuZXdTdGFydCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0VuZCA9IHRoaXMuZ2V0QmVzdE5leHRQb2ludChzdHJlYW1saW5lW3N0cmVhbWxpbmUubGVuZ3RoIC0gMV0sIHN0cmVhbWxpbmVbc3RyZWFtbGluZS5sZW5ndGggLSA0XSwgc3RyZWFtbGluZSk7XG4gICAgICAgICAgICBpZiAobmV3RW5kICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtbGluZS5wdXNoKG5ld0VuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXNldCBzaW1wbGlmaWVkIHN0cmVhbWxpbmVzXG4gICAgICAgIHRoaXMuYWxsU3RyZWFtbGluZXNTaW1wbGUgPSB0aGlzLmFsbFN0cmVhbWxpbmVzLm1hcChzID0+IHRoaXMuc2ltcGxpZnlTdHJlYW1saW5lKHMpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldHMgbmV4dCBiZXN0IHBvaW50IHRvIGpvaW4gc3RyZWFtbGluZVxuICAgICAqIHJldHVybnMgbnVsbCBpZiB0aGVyZSBhcmUgbm8gZ29vZCBjYW5kaWRhdGVzXG4gICAgICovXG4gICAgZ2V0QmVzdE5leHRQb2ludChwb2ludDogVmVjdG9yLCBwcmV2aW91c1BvaW50OiBWZWN0b3IsIHN0cmVhbWxpbmU6IFZlY3RvcltdKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgbmVhcmJ5UG9pbnRzID0gdGhpcy5tYWpvckdyaWQuZ2V0TmVhcmJ5UG9pbnRzKHBvaW50LCB0aGlzLnBhcmFtcy5kbG9va2FoZWFkKVxuICAgICAgICAgICAgLmNvbmNhdCh0aGlzLm1pbm9yR3JpZC5nZXROZWFyYnlQb2ludHMocG9pbnQsIHRoaXMucGFyYW1zLmRsb29rYWhlYWQpKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gcG9pbnQuY2xvbmUoKS5zdWIocHJldmlvdXNQb2ludCk7XG5cbiAgICAgICAgbGV0IGNsb3Nlc3RTYW1wbGUgPSBudWxsO1xuICAgICAgICBsZXQgY2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XG5cbiAgICAgICAgZm9yIChsZXQgc2FtcGxlIG9mIG5lYXJieVBvaW50cykge1xuICAgICAgICAgICAgaWYgKCFzYW1wbGUuZXF1YWxzKHBvaW50KSAmJiAhc2FtcGxlLmVxdWFscyhwcmV2aW91c1BvaW50KSAmJiAhc3RyZWFtbGluZS5pbmNsdWRlcyhzYW1wbGUpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZVZlY3RvciA9IHNhbXBsZS5jbG9uZSgpLnN1Yihwb2ludCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQWN1dGUgYW5nbGUgYmV0d2VlbiB2ZWN0b3JzIChhZ25vc3RpYyBvZiBDVywgQUNXKVxuICAgICAgICAgICAgICAgIGNvbnN0IGFuZ2xlQmV0d2VlbiA9IE1hdGguYWJzKFZlY3Rvci5hbmdsZUJldHdlZW4oZGlyZWN0aW9uLCBkaWZmZXJlbmNlVmVjdG9yKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VUb1NhbXBsZSA9IHBvaW50LmRpc3RhbmNlVG9TcXVhcmVkKHNhbXBsZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgYnkgYW5nbGVcbiAgICAgICAgICAgICAgICBpZiAoYW5nbGVCZXR3ZWVuIDwgdGhpcy5wYXJhbXMuam9pbmFuZ2xlICYmIGRpc3RhbmNlVG9TYW1wbGUgPCBjbG9zZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2VUb1NhbXBsZTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VzdFNhbXBsZSA9IHNhbXBsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUT0RPIGlmIHRyeWluZyB0byBmaW5kIGludGVyc2VjdGlvbnMgaW4gdGhlIHNpbXBsaWZpZWQgZ3JhcGhcbiAgICAgICAgLy8gcmV0dXJuIGNsb3Nlc3QuY2xvbmUoKS5hZGQoZGlyZWN0aW9uIGxlbmd0aCBzaW1wbGlmeSB0b2xlcmFuY2UpKTtcbiAgICAgICAgLy8gdG8gcHJldmVudCBlbmRzIGdldHRpbmcgcHVsbGVkIGF3YXkgZnJvbSBzaW1wbGlmaWVkIGxpbmVzXG4gICAgICAgIHJldHVybiBjbG9zZXN0U2FtcGxlO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQXNzdW1lcyBzIGhhcyBhbHJlYWR5IGdlbmVyYXRlZFxuICAgICAqL1xuICAgIGFkZEV4aXN0aW5nU3RyZWFtbGluZXMoczogU3RyZWFtbGluZUdlbmVyYXRvcik6IHZvaWQge1xuICAgICAgICB0aGlzLm1ham9yR3JpZC5hZGRBbGwocy5tYWpvckdyaWQpO1xuICAgICAgICB0aGlzLm1pbm9yR3JpZC5hZGRBbGwocy5taW5vckdyaWQpO1xuICAgIH1cblxuICAgIGdldCBhbGxTdHJlYW1saW5lcygpOiBWZWN0b3JbXVtdIHtcbiAgICAgICAgLy8gQ29tYmluZVxuICAgICAgICByZXR1cm4gdGhpcy5zdHJlYW1saW5lc01ham9yLmNvbmNhdCh0aGlzLnN0cmVhbWxpbmVzTWlub3IpO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmVhbWxpbmVzRG9uZSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0U3RyZWFtbGluZU1ham9yID0gIXRoaXMubGFzdFN0cmVhbWxpbmVNYWpvcjtcbiAgICAgICAgICAgIGlmICghdGhpcy5jcmVhdGVTdHJlYW1saW5lKHRoaXMubGFzdFN0cmVhbWxpbmVNYWpvcikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbWxpbmVzRG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdHJlYW1saW5lcyBjcmVhdGVkIGVhY2ggZnJhbWUgKGFuaW1hdGVkKVxuICAgICAqL1xuICAgIGNyZWF0ZUFsbFN0cmVhbWxpbmVzRHluYW1pYygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdHJlYW1saW5lc0RvbmUgPSBmYWxzZTtcbiAgICAgICAgLy8gdGhpcy5qb2luRGFuZ2xpbmdTdHJlYW1saW5lcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsbCBhdCBvbmNlIC0gd2lsbCBmcmVlemUgaWYgZHNlcCBzbWFsbFxuICAgICAqL1xuICAgIGNyZWF0ZUFsbFN0cmVhbWxpbmVzKCk6IHZvaWQge1xuICAgICAgICBsZXQgbWFqb3IgPSB0cnVlO1xuICAgICAgICB3aGlsZSAodGhpcy5jcmVhdGVTdHJlYW1saW5lKG1ham9yKSkge1xuICAgICAgICAgICAgbWFqb3IgPSAhbWFqb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNpbXBsaWZ5U3RyZWFtbGluZShzdHJlYW1saW5lOiBWZWN0b3JbXSk6IFZlY3RvcltdIHtcbiAgICAgICAgcmV0dXJuIHNpbXBsaWZ5KHN0cmVhbWxpbmUsIHRoaXMucGFyYW1zLnNpbXBsaWZ5VG9sZXJhbmNlKS5tYXAocG9pbnQgPT4gbmV3IFZlY3Rvcihwb2ludC54LCBwb2ludC55KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRmluZHMgc2VlZCBhbmQgY3JlYXRlcyBhIHN0cmVhbWxpbmUgZnJvbSB0aGF0IHBvaW50XG4gICAgICogUHVzaGVzIG5ldyBjYW5kaWRhdGUgc2VlZHMgdG8gcXVldWVcbiAgICAgKiBAcmV0dXJuIHtWZWN0b3JbXX0gcmV0dXJucyBmYWxzZSBpZiBzZWVkIGlzbid0IGZvdW5kIHdpdGhpbiBwYXJhbXMuc2VlZFRyaWVzXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVTdHJlYW1saW5lKG1ham9yOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IHNlZWQgPSB0aGlzLmdldFNlZWQobWFqb3IpO1xuICAgICAgICBpZiAoc2VlZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHN0cmVhbWxpbmUgPSB0aGlzLmludGVncmF0ZVN0cmVhbWxpbmUoc2VlZCwgbWFqb3IpO1xuICAgICAgICBpZiAodGhpcy52YWxpZFN0cmVhbWxpbmUoc3RyZWFtbGluZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZChtYWpvcikuYWRkUG9seWxpbmUoc3RyZWFtbGluZSk7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbWxpbmVzKG1ham9yKS5wdXNoKHN0cmVhbWxpbmUpO1xuXG4gICAgICAgICAgICB0aGlzLmFsbFN0cmVhbWxpbmVzU2ltcGxlLnB1c2godGhpcy5zaW1wbGlmeVN0cmVhbWxpbmUoc3RyZWFtbGluZSkpO1xuXG4gICAgICAgICAgICAvLyBBZGQgY2FuZGlkYXRlIHNlZWRzXG4gICAgICAgICAgICBpZiAoIXN0cmVhbWxpbmVbMF0uZXF1YWxzKHN0cmVhbWxpbmVbc3RyZWFtbGluZS5sZW5ndGggLSAxXSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmRpZGF0ZVNlZWRzKCFtYWpvcikucHVzaChzdHJlYW1saW5lWzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbmRpZGF0ZVNlZWRzKCFtYWpvcikucHVzaChzdHJlYW1saW5lW3N0cmVhbWxpbmUubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2YWxpZFN0cmVhbWxpbmUoczogVmVjdG9yW10pOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHMubGVuZ3RoID4gNTtcbiAgICB9IFxuXG4gICAgcHJpdmF0ZSBzZXRQYXJhbXNTcSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJhbXNTcSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFyYW1zKTtcbiAgICAgICAgZm9yIChsZXQgcCBpbiB0aGlzLnBhcmFtc1NxKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtc1NxW3BdICo9IHRoaXMucGFyYW1zU3FbcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNhbXBsZVBvaW50KCk6IFZlY3RvciB7XG4gICAgICAgIC8vIFRPRE8gYmV0dGVyIHNlZWRpbmcgc2NoZW1lXG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKFxuICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqIHRoaXMud29ybGREaW1lbnNpb25zLngsXG4gICAgICAgICAgICBNYXRoLnJhbmRvbSgpICogdGhpcy53b3JsZERpbWVuc2lvbnMueSlcbiAgICAgICAgICAgIC5hZGQodGhpcy5vcmlnaW4pO1xuICAgIH1cbiBcbiAgICAvKipcbiAgICAgKiBUcmllcyB0aGlzLmNhbmRpZGF0ZVNlZWRzIGZpcnN0LCB0aGVuIHNhbXBsZXMgdXNpbmcgdGhpcy5zYW1wbGVQb2ludFxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0U2VlZChtYWpvcjogYm9vbGVhbik6IFZlY3RvciB7XG4gICAgICAgIC8vIENhbmRpZGF0ZSBzZWVkcyBmaXJzdFxuICAgICAgICBpZiAodGhpcy5TRUVEX0FUX0VORFBPSU5UUyAmJiB0aGlzLmNhbmRpZGF0ZVNlZWRzKG1ham9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy5jYW5kaWRhdGVTZWVkcyhtYWpvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlZWQgPSB0aGlzLmNhbmRpZGF0ZVNlZWRzKG1ham9yKS5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncmlkKG1ham9yKS5pc1ZhbGlkU2FtcGxlKHNlZWQsIHRoaXMucGFyYW1zU3EuZHNlcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlZWQgPSB0aGlzLnNhbXBsZVBvaW50KCk7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmdyaWQobWFqb3IpLmlzVmFsaWRTYW1wbGUoc2VlZCwgdGhpcy5wYXJhbXNTcS5kc2VwKSkge1xuICAgICAgICAgICAgaWYgKGkgPj0gdGhpcy5wYXJhbXMuc2VlZFRyaWVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWVkID0gdGhpcy5zYW1wbGVQb2ludCgpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgfVxuXG4gICAgLy8gVE9ETyBlbnVtIHRvIHJlbW92ZSB0aGVzZSBmdW5jdGlvbnNcbiAgICBwcml2YXRlIGNhbmRpZGF0ZVNlZWRzKG1ham9yOiBib29sZWFuKTogVmVjdG9yW10ge1xuICAgICAgICByZXR1cm4gbWFqb3IgPyB0aGlzLmNhbmRpZGF0ZVNlZWRzTWFqb3IgOiB0aGlzLmNhbmRpZGF0ZVNlZWRzTWlub3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdHJlYW1saW5lcyhtYWpvcjogYm9vbGVhbik6IFZlY3RvcltdW10ge1xuICAgICAgICByZXR1cm4gbWFqb3IgPyB0aGlzLnN0cmVhbWxpbmVzTWFqb3IgOiB0aGlzLnN0cmVhbWxpbmVzTWlub3I7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBncmlkKG1ham9yOiBib29sZWFuKTogR3JpZFN0b3JhZ2Uge1xuICAgICAgICByZXR1cm4gbWFqb3IgPyB0aGlzLm1ham9yR3JpZCA6IHRoaXMubWlub3JHcmlkO1xuICAgIH1cblxuICAgIHByaXZhdGUgcG9pbnRJbkJvdW5kcyh2OiBWZWN0b3IpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICh2LnggPj0gdGhpcy5vcmlnaW4ueFxuICAgICAgICAgICAgJiYgdi55ID49IHRoaXMub3JpZ2luLnlcbiAgICAgICAgICAgICYmIHYueCA8IHRoaXMud29ybGREaW1lbnNpb25zLnggKyB0aGlzLm9yaWdpbi54XG4gICAgICAgICAgICAmJiB2LnkgPCB0aGlzLndvcmxkRGltZW5zaW9ucy55ICsgdGhpcy5vcmlnaW4ueVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uZSBzdGVwIG9mIHRoZSBzdHJlYW1saW5lIGludGVncmF0aW9uIHByb2Nlc3NcbiAgICAgKi9cbiAgICBwcml2YXRlIHN0cmVhbWxpbmVJbnRlZ3JhdGlvblN0ZXAocGFyYW1zOiBTdHJlYW1saW5lSW50ZWdyYXRpb24sIG1ham9yOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChwYXJhbXMudmFsaWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5zdHJlYW1saW5lLnB1c2gocGFyYW1zLnByZXZpb3VzUG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgbmV4dERpcmVjdGlvbiA9IHRoaXMuaW50ZWdyYXRvci5pbnRlZ3JhdGUocGFyYW1zLnByZXZpb3VzUG9pbnQsIG1ham9yKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIHRyYXZlbCBpbiB0aGUgc2FtZSBkaXJlY3Rpb25cbiAgICAgICAgICAgIGlmIChuZXh0RGlyZWN0aW9uLmRvdChwYXJhbXMucHJldmlvdXNEaXJlY3Rpb24pIDwgMCkge1xuICAgICAgICAgICAgICAgIG5leHREaXJlY3Rpb24ubmVnYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IHBhcmFtcy5wcmV2aW91c1BvaW50LmNsb25lKCkuYWRkKG5leHREaXJlY3Rpb24pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wb2ludEluQm91bmRzKG5leHRQb2ludClcbiAgICAgICAgICAgICAgICAmJiB0aGlzLmdyaWQobWFqb3IpLmlzVmFsaWRTYW1wbGUobmV4dFBvaW50LCB0aGlzLnBhcmFtc1NxLmR0ZXN0KSkge1xuICAgICAgICAgICAgICAgIHBhcmFtcy5wcmV2aW91c1BvaW50ID0gbmV4dFBvaW50O1xuICAgICAgICAgICAgICAgIHBhcmFtcy5wcmV2aW91c0RpcmVjdGlvbiA9IG5leHREaXJlY3Rpb247XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtcy52YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnkgc2ltdWx0YW5lb3VzbHkgaW50ZWdyYXRpbmcgaW4gYm90aCBkaXJlY3Rpb25zIHdlIHJlZHVjZSB0aGUgaW1wYWN0IG9mIGNpcmNsZXMgbm90IGpvaW5pbmdcbiAgICAgKiB1cCBhcyB0aGUgZXJyb3IgbWF0Y2hlcyBhdCB0aGUgam9pblxuICAgICAqL1xuICAgIHByaXZhdGUgaW50ZWdyYXRlU3RyZWFtbGluZShzZWVkOiBWZWN0b3IsIG1ham9yOiBib29sZWFuKTogVmVjdG9yW10ge1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBsZXQgcG9pbnRzRXNjYXBlZCA9IGZhbHNlOyAgLy8gVHJ1ZSBvbmNlIHR3byBpbnRlZ3JhdGlvbiBmcm9udHMgaGF2ZSBtb3ZlZCBkbG9va2FoZWFkIGF3YXlcblxuICAgICAgICBjb25zdCBkID0gdGhpcy5pbnRlZ3JhdG9yLmludGVncmF0ZShzZWVkLCBtYWpvcik7XG5cbiAgICAgICAgY29uc3QgZm9yd2FyZFBhcmFtczogU3RyZWFtbGluZUludGVncmF0aW9uID0ge1xuICAgICAgICAgICAgc3RyZWFtbGluZTogW3NlZWRdLFxuICAgICAgICAgICAgcHJldmlvdXNEaXJlY3Rpb246IGQsXG4gICAgICAgICAgICBwcmV2aW91c1BvaW50OiBzZWVkLmNsb25lKCkuYWRkKGQpLFxuICAgICAgICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICAgIH1cblxuICAgICAgICBmb3J3YXJkUGFyYW1zLnZhbGlkID0gdGhpcy5wb2ludEluQm91bmRzKGZvcndhcmRQYXJhbXMucHJldmlvdXNQb2ludCk7XG5cbiAgICAgICAgY29uc3QgYmFja3dhcmRQYXJhbXM6IFN0cmVhbWxpbmVJbnRlZ3JhdGlvbiA9IHtcbiAgICAgICAgICAgIHN0cmVhbWxpbmU6IFtdLFxuICAgICAgICAgICAgcHJldmlvdXNEaXJlY3Rpb246IGQuY2xvbmUoKS5uZWdhdGUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzUG9pbnQ6IHNlZWQuY2xvbmUoKS5hZGQoZC5jbG9uZSgpLm5lZ2F0ZSgpKSxcbiAgICAgICAgICAgIHZhbGlkOiB0cnVlLFxuICAgICAgICB9XG5cbiAgICAgICAgYmFja3dhcmRQYXJhbXMudmFsaWQgPSB0aGlzLnBvaW50SW5Cb3VuZHMoYmFja3dhcmRQYXJhbXMucHJldmlvdXNQb2ludCk7XG5cbiAgICAgICAgd2hpbGUgKGNvdW50IDwgdGhpcy5wYXJhbXMucGF0aEl0ZXJhdGlvbnMgJiYgKGZvcndhcmRQYXJhbXMudmFsaWQgfHwgYmFja3dhcmRQYXJhbXMudmFsaWQpKSB7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbWxpbmVJbnRlZ3JhdGlvblN0ZXAoZm9yd2FyZFBhcmFtcywgbWFqb3IpO1xuICAgICAgICAgICAgdGhpcy5zdHJlYW1saW5lSW50ZWdyYXRpb25TdGVwKGJhY2t3YXJkUGFyYW1zLCBtYWpvcik7XG5cbiAgICAgICAgICAgIC8vIEpvaW4gdXAgY2lyY2xlc1xuICAgICAgICAgICAgY29uc3Qgc3FEaXN0YW5jZUJldHdlZW5Qb2ludHMgPSBmb3J3YXJkUGFyYW1zLnByZXZpb3VzUG9pbnQuZGlzdGFuY2VUb1NxdWFyZWQoYmFja3dhcmRQYXJhbXMucHJldmlvdXNQb2ludCk7XG5cbiAgICAgICAgICAgIGlmICghcG9pbnRzRXNjYXBlZCAmJiBzcURpc3RhbmNlQmV0d2VlblBvaW50cyA+IHRoaXMucGFyYW1zU3EuZGNpcmNsZWpvaW4pIHtcbiAgICAgICAgICAgICAgICBwb2ludHNFc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBvaW50c0VzY2FwZWQgJiYgc3FEaXN0YW5jZUJldHdlZW5Qb2ludHMgPD0gdGhpcy5wYXJhbXNTcS5kY2lyY2xlam9pbikge1xuICAgICAgICAgICAgICAgIGZvcndhcmRQYXJhbXMuc3RyZWFtbGluZS5wdXNoKGZvcndhcmRQYXJhbXMucHJldmlvdXNQb2ludCk7XG4gICAgICAgICAgICAgICAgZm9yd2FyZFBhcmFtcy5zdHJlYW1saW5lLnB1c2goYmFja3dhcmRQYXJhbXMucHJldmlvdXNQb2ludCk7XG4gICAgICAgICAgICAgICAgYmFja3dhcmRQYXJhbXMuc3RyZWFtbGluZS5wdXNoKGJhY2t3YXJkUGFyYW1zLnByZXZpb3VzUG9pbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhY2t3YXJkUGFyYW1zLnN0cmVhbWxpbmUucmV2ZXJzZSgpLmNvbmNhdChmb3J3YXJkUGFyYW1zLnN0cmVhbWxpbmUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi4vdmVjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVuc29yIHtcbiAgICBwcml2YXRlIG9sZFRoZXRhOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3RoZXRhOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHI6IG51bWJlciwgcHJpdmF0ZSBtYXRyaXg6IG51bWJlcltdKSB7XG4gICAgICAgIC8vIE1hdHJpeCBpcyAyIGVsZW1lbnQgbGlzdFxuICAgICAgICAvLyBbIDAsIDFcbiAgICAgICAgLy8gICAxLCAtMCBdXG4gICAgICAgIHRoaXMub2xkVGhldGEgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdGhldGEgPSB0aGlzLmNhbGN1bGF0ZVRoZXRhKCk7XG4gICAgfVxuXG4gICAgZ2V0IHRoZXRhKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLm9sZFRoZXRhKSB7XG4gICAgICAgICAgICB0aGlzLl90aGV0YSA9IHRoaXMuY2FsY3VsYXRlVGhldGEoKTtcbiAgICAgICAgICAgIHRoaXMub2xkVGhldGEgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLl90aGV0YTtcbiAgICB9XG5cbiAgICBhZGQodGVuc29yOiBUZW5zb3IpOiBUZW5zb3Ige1xuICAgICAgICB0aGlzLm1hdHJpeCA9IHRoaXMubWF0cml4Lm1hcCgodiwgaSkgPT4gdiAqIHRoaXMuciArIHRlbnNvci5tYXRyaXhbaV0gKiB0ZW5zb3Iucik7XG4gICAgICAgIHRoaXMuciA9IDI7XG4gICAgICAgIHRoaXMub2xkVGhldGEgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzY2FsZShzOiBudW1iZXIpOiBUZW5zb3Ige1xuICAgICAgICB0aGlzLnIgKj0gcztcbiAgICAgICAgdGhpcy5vbGRUaGV0YSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldE1ham9yKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKE1hdGguY29zKHRoaXMudGhldGEpLCBNYXRoLnNpbih0aGlzLnRoZXRhKSk7XG4gICAgfVxuXG4gICAgZ2V0TWlub3IoKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSB0aGlzLnRoZXRhICsgTWF0aC5QSSAvIDI7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKE1hdGguY29zKGFuZ2xlKSwgTWF0aC5zaW4oYW5nbGUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNhbGN1bGF0ZVRoZXRhKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKHRoaXMubWF0cml4WzFdIC8gdGhpcy5yLCB0aGlzLm1hdHJpeFswXSAvIHRoaXMucikgLyAyO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIGxvZyBmcm9tICdsb2dsZXZlbCc7XG5pbXBvcnQgVGVuc29yIGZyb20gJy4vdGVuc29yJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vdmVjdG9yJztcbmltcG9ydCB7R3JpZCwgUmFkaWFsLCBCYXNpc0ZpZWxkfSBmcm9tICcuL2Jhc2lzX2ZpZWxkJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVuc29yRmllbGQge1xuICAgIHByaXZhdGUgYmFzaXNGaWVsZHM6IEJhc2lzRmllbGRbXSA9IFtdO1xuICAgIHByaXZhdGUgZ3JpZE5hbWVJbmRleCA9IDA7XG4gICAgcHJpdmF0ZSByYWRpYWxOYW1lSW5kZXggPSAwO1xuXG4gICAgYWRkR3JpZChjZW50cmU6IFZlY3Rvciwgc2l6ZTogbnVtYmVyLCBkZWNheTogbnVtYmVyLCB0aGV0YTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGdyaWQgPSBuZXcgR3JpZChjZW50cmUsIHNpemUsIGRlY2F5LCB0aGV0YSk7XG4gICAgICAgIHRoaXMuYWRkRmllbGQoZ3JpZCk7XG4gICAgfVxuXG4gICAgYWRkUmFkaWFsKGNlbnRyZTogVmVjdG9yLCBzaXplOiBudW1iZXIsIGRlY2F5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmFkaWFsID0gbmV3IFJhZGlhbChjZW50cmUsIHNpemUsIGRlY2F5KTtcbiAgICAgICAgdGhpcy5hZGRGaWVsZChyYWRpYWwpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRGaWVsZChmaWVsZDogQmFzaXNGaWVsZCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJhc2lzRmllbGRzLnB1c2goZmllbGQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW1vdmVGaWVsZChmaWVsZDogQmFzaXNGaWVsZCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuYmFzaXNGaWVsZHMuaW5kZXhPZihmaWVsZCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmJhc2lzRmllbGRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDZW50cmVQb2ludHMoKTogVmVjdG9yW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXNpc0ZpZWxkcy5tYXAoZmllbGQgPT4gZmllbGQuY2VudHJlKTtcbiAgICB9XG5cbiAgICBzYW1wbGVQb2ludChwb2ludDogVmVjdG9yKTogVGVuc29yIHtcbiAgICAgICAgLy8gRGVmYXVsdCBmaWVsZCBpcyBhIGdyaWRcbiAgICAgICAgaWYgKHRoaXMuYmFzaXNGaWVsZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFRlbnNvcigxLCBbMCwgMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGVuc29yQWNjID0gbmV3IFRlbnNvcigwLCBbMCwgMF0pO1xuICAgICAgICB0aGlzLmJhc2lzRmllbGRzLmZvckVhY2goZmllbGQgPT4gdGVuc29yQWNjLmFkZChmaWVsZC5nZXRXZWlnaHRlZFRlbnNvcihwb2ludCkpKTtcbiAgICAgICAgcmV0dXJuIHRlbnNvckFjYztcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBsb2cgZnJvbSAnbG9nbGV2ZWwnO1xuaW1wb3J0IFZlY3RvciBmcm9tICcuLi92ZWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNXcmFwcGVyIHtcbiAgICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIHByaXZhdGUgX3dpZHRoOiBudW1iZXIsIHByaXZhdGUgX2hlaWdodDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5yZXNpemVDYW52YXMoKTtcbiAgICAgICAgdGhpcy5zZXRGaWxsU3R5bGUoJ2JsYWNrJyk7XG4gICAgICAgIHRoaXMuY2xlYXJDYW52YXMoKTtcbiAgICB9XG5cbiAgICBnZXQgd2lkdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgIH1cblxuICAgIGdldCBoZWlnaHQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9XG5cbiAgICBzZXRGaWxsU3R5bGUoY29sb3VyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gY29sb3VyO1xuICAgIH1cblxuICAgIGNsZWFyQ2FudmFzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdSZWN0YW5nbGUoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG4gICAgfVxuXG4gICAgZHJhd1JlY3RhbmdsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgZHJhd1NxdWFyZShjZW50cmU6IFZlY3RvciwgcmFkaXVzOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kcmF3UmVjdGFuZ2xlKGNlbnRyZS54IC0gcmFkaXVzLCBjZW50cmUueSAtIHJhZGl1cywgMiAqIHJhZGl1cywgMiAqIHJhZGl1cyk7XG4gICAgfVxuXG4gICAgc2V0TGluZVdpZHRoKHdpZHRoOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgc2V0U3Ryb2tlU3R5bGUoY29sb3VyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvdXI7XG4gICAgfVxuXG4gICAgZHJhd1BvbHlsaW5lKGxpbmU6IFZlY3RvcltdKTogdm9pZCB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGxvZy53YXJuKFwiVHJpZWQgdG8gZHJhdyBwYXRoIG9mIGxlbmd0aCA8IDJcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgdGhpcy5jdHgubW92ZVRvKGxpbmVbMF0ueCwgbGluZVswXS55KTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxpbmUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhsaW5lW2ldLngsIGxpbmVbaV0ueSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2l6ZUNhbnZhcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jdHguY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7XG4gICAgICAgIHRoaXMuY3R4LmNhbnZhcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgbG9nIGZyb20gJ2xvZ2xldmVsJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi4vdmVjdG9yJztcblxuLyoqXG4gKiBTaW5nbGV0b25cbiAqIENvbnRyb2xzIHBhbm5pbmcgYW5kIHpvb21pbmdcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9tYWluQ29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IERvbWFpbkNvbnRyb2xsZXI7XG5cbiAgICAvLyBMb2NhdGlvbiBvZiBzY3JlZW4gb3JpZ2luIGluIHdvcmxkIHNwYWNlXG4gICAgcHJpdmF0ZSBfb3JpZ2luOiBWZWN0b3IgPSBWZWN0b3IuemVyb1ZlY3RvcigpO1xuICAgIFxuICAgIC8vIFNjcmVlbi1zcGFjZSB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgcHJpdmF0ZSBfc2NyZWVuRGltZW5zaW9uczogVmVjdG9yO1xuXG4gICAgLy8gUmF0aW8gb2Ygc2NyZWVuIHBpeGVscyB0byB3b3JsZCBwaXhlbHNcbiAgICBwcml2YXRlIF96b29tOiBudW1iZXIgPSAxO1xuXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihzY3JlZW5EaW1lbnNpb25zPzogVmVjdG9yKSB7XG4gICAgICAgIGlmIChzY3JlZW5EaW1lbnNpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JlZW5EaW1lbnNpb25zID0gc2NyZWVuRGltZW5zaW9ucy5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZShzY3JlZW5EaW1lbnNpb25zPzogVmVjdG9yKTogRG9tYWluQ29udHJvbGxlciB7XG4gICAgICAgIGlmICghRG9tYWluQ29udHJvbGxlci5pbnN0YW5jZSkge1xuICAgICAgICAgICAgRG9tYWluQ29udHJvbGxlci5pbnN0YW5jZSA9IG5ldyBEb21haW5Db250cm9sbGVyKHNjcmVlbkRpbWVuc2lvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBEb21haW5Db250cm9sbGVyLmluc3RhbmNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VmVjdG9yfSBkZWx0YSBpbiB3b3JsZCBzcGFjZVxuICAgICAqL1xuICAgIHBhbihkZWx0YTogVmVjdG9yKSB7XG4gICAgICAgIHRoaXMuX29yaWdpbi5zdWIoZGVsdGEpO1xuICAgIH1cblxuICAgIGdldCBvcmlnaW4oKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbi5jbG9uZSgpO1xuICAgIH1cblxuICAgIGdldCB6b29tKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl96b29tO1xuICAgIH1cblxuICAgIGdldCBzY3JlZW5EaW1lbnNpb25zKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY3JlZW5EaW1lbnNpb25zLmNsb25lKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7VmVjdG9yfSB3b3JsZC1zcGFjZSB3L2ggdmlzaWJsZSBvbiBzY3JlZW5cbiAgICAgKi9cbiAgICBnZXQgd29ybGREaW1lbnNpb25zKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLnNjcmVlbkRpbWVuc2lvbnMuZGl2aWRlU2NhbGFyKHRoaXMuX3pvb20pO1xuICAgIH1cblxuICAgIHNldCBzY3JlZW5EaW1lbnNpb25zKHY6IFZlY3Rvcikge1xuICAgICAgICB0aGlzLl9zY3JlZW5EaW1lbnNpb25zLmNvcHkodik7XG4gICAgfVxuXG4gICAgc2V0IHpvb20oejogbnVtYmVyKSB7XG4gICAgICAgIGlmICh6ID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgb2xkV29ybGRTcGFjZU1pZHBvaW50ID0gdGhpcy5vcmlnaW4uYWRkKHRoaXMud29ybGREaW1lbnNpb25zLmRpdmlkZVNjYWxhcigyKSk7XG4gICAgICAgICAgICB0aGlzLl96b29tID0gejtcbiAgICAgICAgICAgIGNvbnN0IG5ld1dvcmxkU3BhY2VNaWRwb2ludCA9IHRoaXMub3JpZ2luLmFkZCh0aGlzLndvcmxkRGltZW5zaW9ucy5kaXZpZGVTY2FsYXIoMikpO1xuICAgICAgICAgICAgdGhpcy5wYW4obmV3V29ybGRTcGFjZU1pZHBvaW50LnN1YihvbGRXb3JsZFNwYWNlTWlkcG9pbnQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVkaXRzIHZlY3RvclxuICAgICAqL1xuICAgIHpvb21Ub1dvcmxkKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB2LmRpdmlkZVNjYWxhcih0aGlzLl96b29tKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyB2ZWN0b3JcbiAgICAgKi9cbiAgICB6b29tVG9TY3JlZW4odjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgcmV0dXJuIHYubXVsdGlwbHlTY2FsYXIodGhpcy5fem9vbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRWRpdHMgdmVjdG9yXG4gICAgICovXG4gICAgc2NyZWVuVG9Xb3JsZCh2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy56b29tVG9Xb3JsZCh2KS5hZGQodGhpcy5fb3JpZ2luKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyB2ZWN0b3JcbiAgICAgKi9cbiAgICB3b3JsZFRvU2NyZWVuKHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLnpvb21Ub1NjcmVlbih2LnN1Yih0aGlzLl9vcmlnaW4pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBsb2cgZnJvbSAnbG9nbGV2ZWwnO1xuaW1wb3J0IGludGVyYWN0IGZyb20gJ2ludGVyYWN0anMnO1xuaW1wb3J0IFV0aWwgZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL1ZlY3Rvcic7XG5pbXBvcnQgRG9tYWluQ29udHJvbGxlciBmcm9tICcuL2RvbWFpbl9jb250cm9sbGVyJztcblxuaW50ZXJmYWNlIERyYWdnYWJsZSB7XG4gICAgZ2V0Q2VudHJlOiAoKCkgPT4gVmVjdG9yKTtcbiAgICBjYWxsYmFja0ZuOiAoKHY6IFZlY3RvcikgPT4gdm9pZCk7XG59XG5cbi8qKlxuKiBSZWdpc3RlciBtdWx0aXBsZSBjZW50cmUgcG9pbnRzXG4qIENsb3Nlc3Qgb25lIHRvIG1vdXNlIGNsaWNrIHdpbGwgYmUgc2VsZWN0ZWQgdG8gZHJhZ1xuKiBVcCB0byBjYWxsZXIgdG8gYWN0dWFsbHkgbW92ZSB0aGVpciBjZW50cmUgcG9pbnQgdmlhIGNhbGxiYWNrXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ0NvbnRyb2xsZXIge1xuICAgIC8vIEhvdyBjbG9zZSB0byBkcmFnIGhhbmRsZSBwb2ludGVyIG5lZWRzIHRvIGJlXG4gICAgcHJpdmF0ZSByZWFkb25seSBNSU5fRFJBR19ESVNUQU5DRSA9IDUwO1xuXG4gICAgcHJpdmF0ZSBkcmFnZ2FibGVzOiBEcmFnZ2FibGVbXSA9IFtdO1xuICAgIHByaXZhdGUgY3VycmVudGx5RHJhZ2dpbmc6IERyYWdnYWJsZSA9IG51bGw7XG4gICAgcHJpdmF0ZSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgZG9tYWluQ29udHJvbGxlciA9IERvbWFpbkNvbnRyb2xsZXIuZ2V0SW5zdGFuY2UoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3VpOiBkYXQuR1VJKSB7XG4gICAgICAgIGludGVyYWN0KGAjJHtVdGlsLkNBTlZBU19JRH1gKS5kcmFnZ2FibGUoe1xuICAgICAgICAgICAgb25zdGFydDogdGhpcy5kcmFnU3RhcnQuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIG9ubW92ZTogdGhpcy5kcmFnTW92ZS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgb25lbmQ6IHRoaXMuZHJhZ0VuZC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgY3Vyc29yQ2hlY2tlcjogdGhpcy5nZXRDdXJzb3IuYmluZCh0aGlzKSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0RHJhZ0Rpc2FibGVkKGRpc2FibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGRpc2FibGU7XG4gICAgfVxuXG4gICAgZ2V0Q3Vyc29yKGFjdGlvbjogYW55LCBpbnRlcmFjdGFibGU6IGFueSwgZWxlbWVudDogYW55LCBpbnRlcmFjdGluZzogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuICdkZWZhdWx0JztcbiAgICAgICAgaWYgKGludGVyYWN0aW5nKSByZXR1cm4gJ2dyYWJiaW5nJztcbiAgICAgICAgcmV0dXJuICdncmFiJztcbiAgICB9XG5cbiAgICBkcmFnU3RhcnQoZXZlbnQ6IGFueSk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIFRyYW5zZm9ybSBzY3JlZW4gc3BhY2UgdG8gd29ybGQgc3BhY2VcbiAgICAgICAgY29uc3Qgb3JpZ2luID0gdGhpcy5kb21haW5Db250cm9sbGVyLnNjcmVlblRvV29ybGQobmV3IFZlY3RvcihldmVudC54MCwgZXZlbnQueTApKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBjbG9zZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBkcmFnZ2FibGUuZ2V0Q2VudHJlKCkuZGlzdGFuY2VUbyhvcmlnaW4pO1xuICAgICAgICAgICAgaWYgKGQgPCBjbG9zZXN0RGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZXN0RGlzdGFuY2UgPSBkO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudGx5RHJhZ2dpbmcgPSBkcmFnZ2FibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFpvb20gc2NyZWVuIHNpemUgdG8gd29ybGQgc2l6ZSBmb3IgY29uc2lzdGVudCBkcmFnIGRpc3RhbmNlIHdoaWxlIHpvb21lZCBpblxuICAgICAgICBjb25zdCBzY2FsZWREcmFnRGlzdGFuY2UgPSB0aGlzLk1JTl9EUkFHX0RJU1RBTkNFIC8gdGhpcy5kb21haW5Db250cm9sbGVyLnpvb207XG5cbiAgICAgICAgaWYgKGNsb3Nlc3REaXN0YW5jZSA+IHNjYWxlZERyYWdEaXN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50bHlEcmFnZ2luZyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkcmFnTW92ZShldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZGVsdGEgPSBuZXcgVmVjdG9yKGV2ZW50LmRlbHRhLngsIGV2ZW50LmRlbHRhLnkpO1xuICAgICAgICB0aGlzLmRvbWFpbkNvbnRyb2xsZXIuem9vbVRvV29ybGQoZGVsdGEpO1xuXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRseURyYWdnaW5nICE9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBEcmFnIGZpZWxkXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRseURyYWdnaW5nLmNhbGxiYWNrRm4oZGVsdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTW92ZSBtYXBcbiAgICAgICAgICAgIHRoaXMuZG9tYWluQ29udHJvbGxlci5wYW4oZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhZ0VuZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcbiAgICAgICAgdGhpcy5jdXJyZW50bHlEcmFnZ2luZyA9IG51bGw7XG4gICAgICAgIFV0aWwudXBkYXRlR3VpKHRoaXMuZ3VpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0geygoKSA9PiBWZWN0b3IpfSBHZXRzIGNlbnRyZSBwb2ludFxuICAgICAqIEBwYXJhbSB7KCh2OiBWZWN0b3IpID0+IHZvaWQpfSBDYWxsZWQgb24gbW92ZSB3aXRoIGRlbHRhIHZlY3RvclxuICAgICAqIEByZXR1cm5zIHsoKCkgPT4gdm9pZCl9IEZ1bmN0aW9uIHRvIGRlcmVnaXN0ZXIgY2FsbGJhY2tcbiAgICAgKi9cbiAgICByZWdpc3RlcihnZXRDZW50cmU6ICgoKSA9PiBWZWN0b3IpLFxuICAgICAgICAgICAgIG9uTW92ZTogKCh2OiBWZWN0b3IpID0+IHZvaWQpKTogKCgpID0+IHZvaWQpIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlOiBEcmFnZ2FibGUgPSB7XG4gICAgICAgICAgICBnZXRDZW50cmU6IGdldENlbnRyZSxcbiAgICAgICAgICAgIGNhbGxiYWNrRm46IG9uTW92ZSxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xuICAgICAgICByZXR1cm4gKCgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnZ2FibGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgbG9nIGZyb20gJ2xvZ2xldmVsJztcbmltcG9ydCBEcmFnQ29udHJvbGxlciBmcm9tICcuL2RyYWdfY29udHJvbGxlcic7XG5pbXBvcnQgVGVuc29yRmllbGQgZnJvbSAnLi4vaW1wbC90ZW5zb3JfZmllbGQnO1xuaW1wb3J0IHtHcmlkLCBSYWRpYWwsIEJhc2lzRmllbGR9IGZyb20gJy4uL2ltcGwvYmFzaXNfZmllbGQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW5zb3JGaWVsZEludGVyZmFjZSBleHRlbmRzIFRlbnNvckZpZWxkIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGd1aUZvbGRlcjogZGF0LkdVSSwgcHJpdmF0ZSBkcmFnQ29udHJvbGxlcjogRHJhZ0NvbnRyb2xsZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWRkRmllbGQoZmllbGQ6IEJhc2lzRmllbGQpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIuYWRkRmllbGQoZmllbGQpO1xuICAgICAgICBjb25zdCBmb2xkZXIgPSB0aGlzLmd1aUZvbGRlci5hZGRGb2xkZXIoYCR7ZmllbGQuRk9MREVSX05BTUV9YCk7XG4gICAgICAgIFxuICAgICAgICAvLyBGdW5jdGlvbiB0byBkZXJlZ2lzdGVyIGZyb20gZHJhZyBjb250cm9sbGVyXG4gICAgICAgIGNvbnN0IGRlcmVnaXN0ZXJEcmFnID0gdGhpcy5kcmFnQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgICAgICAgICgpID0+IGZpZWxkLmNlbnRyZSwgZmllbGQuZHJhZ01vdmVMaXN0ZW5lci5iaW5kKGZpZWxkKSk7XG4gICAgICAgIGNvbnN0IHJlbW92ZUZpZWxkT2JqID0ge3JlbW92ZTogKCk6IHZvaWQgPT4gdGhpcy5yZW1vdmVGaWVsZEdVSS5iaW5kKHRoaXMpKGZpZWxkLCBmb2xkZXIsIGRlcmVnaXN0ZXJEcmFnKX07XG4gICAgICAgIFxuICAgICAgICAvLyBHaXZlIGRhdCBndWkgcmVtb3ZlRmllbGQgYnV0dG9uXG4gICAgICAgIGZvbGRlci5hZGQocmVtb3ZlRmllbGRPYmosICdyZW1vdmUnKTtcbiAgICAgICAgZmllbGQuc2V0R3VpKGZvbGRlcik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRmllbGRHVUkoZmllbGQ6IEJhc2lzRmllbGQsIGZvbGRlcjogZGF0LkdVSSwgZGVyZWdpc3RlckRyYWc6ICgoKSA9PiB2b2lkKSk6IHZvaWQge1xuICAgICAgICBzdXBlci5yZW1vdmVGaWVsZChmaWVsZCk7XG4gICAgICAgIHRoaXMuZ3VpRm9sZGVyLnJlbW92ZUZvbGRlcihmb2xkZXIpO1xuICAgICAgICAvLyBEZXJlZ2lzdGVyIGZyb20gZHJhZyBjb250cm9sbGVyXG4gICAgICAgIGRlcmVnaXN0ZXJEcmFnKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbCB7XG4gICAgc3RhdGljIHJlYWRvbmx5IENBTlZBU19JRDogc3RyaW5nID0gJ21hcC1jYW52YXMnO1xuXG4gICAgc3RhdGljIHVwZGF0ZUd1aShndWk6IGRhdC5HVUkpOiB2b2lkIHtcbiAgICAgICAgaWYgKGd1aS5fX2NvbnRyb2xsZXJzKSB7XG4gICAgICAgICAgICBndWkuX19jb250cm9sbGVycy5mb3JFYWNoKGMgPT4gYy51cGRhdGVEaXNwbGF5KCkpOyAgICBcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ3VpLl9fZm9sZGVycykge1xuICAgICAgICAgICAgZm9yIChsZXQgZm9sZGVyTmFtZSBpbiBndWkuX19mb2xkZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVHdWkoZ3VpLl9fZm9sZGVyc1tmb2xkZXJOYW1lXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBsb2cgZnJvbSAnbG9nbGV2ZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIpIHt9XG5cbiAgICBzdGF0aWMgemVyb1ZlY3RvcigpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcigwLCAwKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZnJvbVNjYWxhcihzOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gbmV3IFZlY3RvcihzLCBzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAtcGkgdG8gcGlcbiAgICAgKi9cbiAgICBzdGF0aWMgYW5nbGVCZXR3ZWVuKHYxOiBWZWN0b3IsIHYyOiBWZWN0b3IpOiBudW1iZXIge1xuICAgICAgICAvLyAtMnBpIHRvIDJwaVxuICAgICAgICBsZXQgYW5nbGVCZXR3ZWVuID0gdjEuYW5nbGUoKSAtIHYyLmFuZ2xlKCk7XG4gICAgICAgIGlmIChhbmdsZUJldHdlZW4gPiBNYXRoLlBJKSB7XG4gICAgICAgICAgICBhbmdsZUJldHdlZW4gLT0gMiAqIE1hdGguUEk7XG4gICAgICAgIH0gZWxzZSBpZiAoYW5nbGVCZXR3ZWVuIDw9IC1NYXRoLlBJKSB7XG4gICAgICAgICAgICBhbmdsZUJldHdlZW4gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuZ2xlQmV0d2VlbjtcbiAgICB9XG5cbiAgICBhZGQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgdGhpcy54ICs9IHYueDtcbiAgICAgICAgdGhpcy55ICs9IHYueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW5nbGUgaW4gcmFkaWFucyB0byBwb3NpdGl2ZSB4LWF4aXMgYmV0d2VlbiAtcGkgYW5kIHBpXG4gICAgICovXG4gICAgYW5nbGUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xuICAgIH1cblxuICAgIGNsb25lKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcbiAgICB9XG5cbiAgICBjb3B5KHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHRoaXMueCA9IHYueDtcbiAgICAgICAgdGhpcy55ID0gdi55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBjcm9zcyh2OiBWZWN0b3IpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdi55IC0gdGhpcy55ICogdi54O1xuICAgIH1cblxuICAgIGRpc3RhbmNlVG8odjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmRpc3RhbmNlVG9TcXVhcmVkKHYpKTtcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvU3F1YXJlZCAodjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICAgICAgY29uc3QgZHggPSB0aGlzLnggLSB2LnhcbiAgICAgICAgY29uc3QgZHkgPSB0aGlzLnkgLSB2Lnk7XG4gICAgICAgIHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbiAgICB9XG5cbiAgICBkaXZpZGUodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgaWYgKHYueCA9PT0gMCB8fCB2LnkgPT09IDApIHtcbiAgICAgICAgICAgIGxvZy53YXJuKFwiRGl2aXNpb24gYnkgemVyb1wiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy54IC89IHYueDtcbiAgICAgICAgdGhpcy55IC89IHYueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZGl2aWRlU2NhbGFyKHM6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIGlmIChzID09PSAwKSB7XG4gICAgICAgICAgICBsb2cud2FybihcIkRpdmlzaW9uIGJ5IHplcm9cIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5tdWx0aXBseVNjYWxhcigxIC8gcyk7XG4gICAgfVxuXG4gICAgZG90KHY6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB2LnggKyB0aGlzLnkgKiB2Lnk7XG4gICAgfVxuXG4gICAgZXF1YWxzKHY6IFZlY3Rvcik6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKCh2LnggPT09IHRoaXMueCkgJiYgKHYueSA9PT0gdGhpcy55KSk7XG4gICAgfVxuXG4gICAgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcSgpKTtcbiAgICB9XG5cbiAgICBsZW5ndGhTcSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xuICAgIH1cblxuICAgIG11bGl0cGx5KHY6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgICAgIHRoaXMueCAqPSB2Lng7XG4gICAgICAgIHRoaXMueSAqPSB2Lnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG11bHRpcGx5U2NhbGFyKHM6IG51bWJlcik6IFZlY3RvciB7XG4gICAgICAgIHRoaXMueCAqPSBzO1xuICAgICAgICB0aGlzLnkgKj0gcztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbmVnYXRlKCk6IFZlY3RvciB7XG4gICAgICAgIHJldHVybiB0aGlzLm11bHRpcGx5U2NhbGFyKC0xKTtcbiAgICB9XG5cbiAgICBub3JtYWxpemUoKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMubGVuZ3RoKCk7XG4gICAgICAgIGlmIChsID09PSAwKSB7XG4gICAgICAgICAgICBsb2cud2FybihcIlplcm8gVmVjdG9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzLmRpdmlkZVNjYWxhcih0aGlzLmxlbmd0aCgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbmdsZSBpbiByYWRpYW5zXG4gICAgICovXG4gICAgcm90YXRlQXJvdW5kKGNlbnRlcjogVmVjdG9yLCBhbmdsZTogbnVtYmVyKTogVmVjdG9yIHtcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYW5nbGUpXG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcblxuICAgICAgICBjb25zdCB4ID0gdGhpcy54IC0gY2VudGVyLng7XG4gICAgICAgIGNvbnN0IHkgPSB0aGlzLnkgLSBjZW50ZXIueTtcblxuICAgICAgICB0aGlzLnggPSB4ICogY29zIC0geSAqIHNpbiArIGNlbnRlci54O1xuICAgICAgICB0aGlzLnkgPSB4ICogc2luICsgeSAqIGNvcyArIGNlbnRlci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXQodjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICB0aGlzLnkgPSB2Lnk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldExlbmd0aCAobGVuZ3RoOiBudW1iZXIpOiBWZWN0b3Ige1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihsZW5ndGgpO1xuICAgIH1cblxuICAgIHN1Yih2OiBWZWN0b3IpOiBWZWN0b3Ige1xuICAgICAgICB0aGlzLnggLT0gdi54O1xuICAgICAgICB0aGlzLnkgLT0gdi55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG4iXX0=
