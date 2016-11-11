(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var amortize = function amortize() {
  console.log("Amortizing.....");
};

exports.default = amortize;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _amortize2 = require('./amortize');

var _amortize3 = _interopRequireDefault(_amortize2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $$$ = function () {
  function $$$() {
    _classCallCheck(this, $$$);
  }

  _createClass($$$, [{
    key: 'amortize',
    value: function amortize(x) {
      return (0, _amortize3.default)(x);
    }
  }]);

  return $$$;
}();

exports.default = $$$;

},{"./amortize":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGFtb3J0aXplLmpzIiwic3JjXFxmaW5hbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxJQUFNLFdBQVcsU0FBWCxRQUFXLEdBQUk7QUFDbkIsVUFBUSxHQUFSLENBQVksaUJBQVo7QUFDRCxDQUZEOztrQkFJZSxROzs7Ozs7Ozs7OztBQ0pmOzs7Ozs7OztJQUVNLEc7Ozs7Ozs7NkJBQ0ssQyxFQUFFO0FBQ1QsYUFBTyx3QkFBUyxDQUFULENBQVA7QUFDRDs7Ozs7O2tCQUdZLEciLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgYW1vcnRpemUgPSAoKT0+e1xyXG4gIGNvbnNvbGUubG9nKFwiQW1vcnRpemluZy4uLi4uXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhbW9ydGl6ZTtcclxuIiwiaW1wb3J0IGFtb3J0aXplIGZyb20gJy4vYW1vcnRpemUnO1xyXG5cclxuY2xhc3MgJCQkIHtcclxuICBhbW9ydGl6ZSh4KXtcclxuICAgIHJldHVybiBhbW9ydGl6ZSh4KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICQkJDtcclxuIl19
