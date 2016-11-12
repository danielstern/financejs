(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":7}],2:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  value = Object(value);
  return (symToStringTag && symToStringTag in value)
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":1,"./_getRawTag":5,"./_objectToString":6}],3:[function(require,module,exports){
/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  var result,
      index = -1,
      length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : (result + current);
    }
  }
  return result;
}

module.exports = baseSum;

},{}],4:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":1}],6:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],7:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":4}],8:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],9:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    isObject = require('./isObject');

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./_baseGetTag":2,"./isObject":10}],10:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],11:[function(require,module,exports){
var baseSum = require('./_baseSum'),
    identity = require('./identity');

/**
 * Computes the sum of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 2, 8, 6]);
 * // => 20
 */
function sum(array) {
  return (array && array.length)
    ? baseSum(array, identity)
    : 0;
}

module.exports = sum;

},{"./_baseSum":3,"./identity":8}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    'principal': 100000,
    'interestRate': 0.1,
    'compoundingFrequency': 2,
    'down': 20000,
    'months': 240,
    'taxRate': 0.35,
    'depreciation': 0.04,
    'expenses': [],
    'incomes': [],
    'balances': []
  };
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sum = require('lodash/sum');

var _sum2 = _interopRequireDefault(_sum);

var _cantrip = require('./../cantrip');

var _functor = require('./../functor');

var _functor2 = _interopRequireDefault(_functor);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _percentify = require('./percentify');

var _percentify2 = _interopRequireDefault(_percentify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var monthsPerYear = 12;

var Amortization = function () {
    function Amortization() {
        _classCallCheck(this, Amortization);

        this.data = (0, _defaults2.default)();
    }
    // should this be a method?


    _createClass(Amortization, [{
        key: 'getBalance',
        value: function getBalance(k) {
            var data = this.data;
            var balance = data.balances[k] || {};
            var i = (0, _functor2.default)(data.interestRate)(this, k) / monthsPerYear;
            var P = data.principal - data.down;
            var equity = data.down;
            var n = data.months;
            var annuity = P * (i + i / (Math.pow(1 + i, n - k) - 1));
            var prev = P;

            P *= 1 + i;
            P -= annuity;

            var change = prev - P;
            equity += change;

            // const expensesCalculated = expenses.map(a => isFunction(a.cost) ? { ...a, cost: a.cost(mortgage, k) } : a);
            //   debugger;
            console.log("Expenses?", data.expenses);
            var expensesCalculated = data.expenses.map(function (a) {
                return _extends({}, a, { cost: (0, _functor2.default)(a.cost)(data, k) });
            });

            // const incomesCalculated = incomes.map(a => isFunction(a.value) ? { ...a, value: a.value(mortgage, k) } : a);
            var incomesCalculated = data.expenses.map(function (a) {
                return _extends({}, a, { value: (0, _functor2.default)(a.value)(data, k) });
            });

            var expensesTotal = (0, _sum2.default)(expensesCalculated.map(function (z) {
                return z.cost;
            }));
            var incomesTotal = (0, _sum2.default)(incomesCalculated.map(function (x) {
                return x.value;
            }));

            var interestPaid = annuity - change;
            var expensesDeductible = expensesTotal * data.taxRate;
            var interestDeductible = interestPaid * data.taxRate;
            var depreciationTotal = data.depreciation * data.principal / monthsPerYear;
            var interestRate = i * monthsPerYear;
            var depreciationDeductible = depreciationTotal * data.taxRate;
            var netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
            var netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
            var capRate = netAfterDeductions * monthsPerYear / data.principal;
            var roi = netAfterDeductions * monthsPerYear / equity;

            balance = _extends({
                P: P,
                equity: equity,
                interestPaid: interestPaid,
                interestRate: interestRate,
                interestDeductible: interestDeductible,
                equityPaid: change,
                period: k,
                expensesCalculated: expensesCalculated,
                income: incomesTotal,
                expenses: expensesTotal,
                payment: annuity,
                incomesCalculated: incomesCalculated,
                netBeforeDeductions: netBeforeDeductions,
                netAfterDeductions: netAfterDeductions,
                depreciation: data.depreciation,
                capRate: capRate,
                roi: roi
            }, balance);

            return balance;
        }
    }, {
        key: 'expense',
        value: function expense(name, cost) {
            console.log("Expense?", name, cost, this.data);
            // debugger;
            return (0, _cantrip.namedCantrip)(this, this.data)('expenses')(name, cost);
        }
    }, {
        key: 'income',
        value: function income(name, value) {
            return (0, _cantrip.namedCantrip)(this, this.data)('incomes')(name, value);
        }
    }, {
        key: 'period',
        value: function period(p) {
            return (0, _cantrip.cantrip)(this, this.data)('months', function (val) {
                return val[val.length - 1] === 'y' ? 12 * +val.slice(0, val.length - 1) : val;
            })(p);
        }
    }, {
        key: 'interest',
        value: function interest(i) {
            return (0, _cantrip.cantrip)(this, this.data)('interestRate', _percentify2.default)(i);
        }
    }, {
        key: 'depreciation',
        value: function depreciation(d) {
            return (0, _cantrip.cantrip)(this, this.data)('depreciation', _percentify2.default)(d);
        }
    }, {
        key: 'tax',
        value: function tax(t) {
            return (0, _cantrip.cantrip)(this, this.data)('taxRate', _percentify2.default)(t);
        }
    }, {
        key: 'principal',
        value: function principal(p) {
            return (0, _cantrip.cantrip)(this, this.data)('principal')(p);
        }
    }, {
        key: 'down',
        value: function down(d) {
            return (0, _cantrip.cantrip)(this, this.data)('down', function (d, context) {
                if (d[d.length - 1] === '%') {
                    var percent = 0.01 * +d.slice(0, d.length - 1);
                    return percent * context.principal();
                } else {
                    return d;
                }
            })(d, this.data);
        }
    }, {
        key: 'balances',
        value: function balances() {
            return this.data.balances;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            var data = this.data;
            var balances = data.balances;
            var n = data.months;

            // what does this do?
            while (balances.length > n && n > 0) {
                balances.pop();
            }

            for (var j = 0; j < n; j++) {
                balances[j] = this.getBalance(j);
            }

            return this;
        }
    }]);

    return Amortization;
}();

exports.default = Amortization;

},{"./../cantrip":16,"./../functor":19,"./defaults":12,"./percentify":14,"lodash/sum":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val) {
  return val.length - 1 === "%" ? 0.01 * +val.slice(0, val.length - 1) : val;
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cantrip = function cantrip(context) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return function (key) {
        for (var _len = arguments.length, modifier = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            modifier[_key - 1] = arguments[_key];
        }

        return function (value) {
            var shouldModify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (value === undefined) {
                return data[key];
            }

            if (shouldModify) {
                modifier.forEach(function (m) {
                    if (!(0, _isFunction2.default)(m)) {
                        throw new Error('A modifier passed to cantrip ' + key + ' is not a function. Be sure you are passing arguments and not an array.');
                    }
                    value = m(value, context);
                });
                data[key] = value;
            }

            if (context && context.calculate) {
                context.calculate();
            }

            return context;
        };
    };
};

exports.default = cantrip;

},{"lodash/isFunction":9}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namedCantrip = exports.cantrip = undefined;

var _cantrip = require('./cantrip');

var _cantrip2 = _interopRequireDefault(_cantrip);

var _namedCantrip = require('./namedCantrip');

var _namedCantrip2 = _interopRequireDefault(_namedCantrip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.cantrip = _cantrip2.default;
exports.namedCantrip = _namedCantrip2.default;

},{"./cantrip":15,"./namedCantrip":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cantrip = require('./cantrip');

var _cantrip2 = _interopRequireDefault(_cantrip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var namedCantrip = function namedCantrip(context, data) {
  return function (key) {
    for (var _len = arguments.length, modifier = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      modifier[_key - 1] = arguments[_key];
    }

    return function (name, value) {
      var array = data[key];

      if (name === undefined) {
        return array;
      }

      var matchingIndex = array.findIndex(function (p) {
        return p.name === name;
      });
      var matching = array[matchingIndex];

      if (value === undefined) {
        return matching;
      }

      if (matching) {
        value === null ? matching = _extends({}, matching, { value: value }) : array.splice(matchingIndex, 1);
      } else {
        array.push({ name: name, value: value });
      }

      return (0, _cantrip2.default)(context, data).apply(undefined, [key].concat(modifier))(value, false);
    };
  };
};

exports.default = namedCantrip;

},{"./cantrip":15}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _amortization = require('./amortization');

var _amortization2 = _interopRequireDefault(_amortization);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$$ = {
  amortize: function amortize() {
    return new _amortization2.default();
  }
};

window.$$$ = $$$;

exports.default = $$$;

},{"./amortization":13}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (x) {
  return function () {
    return (0, _isFunction2.default)(x) ? x.apply(undefined, arguments) : x;
  };
}; // magical...

},{"lodash/isFunction":9}]},{},[18])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVN1bS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3VtLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGRlZmF1bHRzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGluZGV4LmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXHBlcmNlbnRpZnkuanMiLCJzcmNcXGNhbnRyaXBcXGNhbnRyaXAuanMiLCJzcmNcXGNhbnRyaXBcXGluZGV4LmpzIiwic3JjXFxjYW50cmlwXFxuYW1lZENhbnRyaXAuanMiLCJzcmNcXGZpbmFuY2UuanMiLCJzcmNcXGZ1bmN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Um9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgdmFsdWUgPSBPYmplY3QodmFsdWUpO1xuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIHZhbHVlKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnN1bWAgYW5kIGBfLnN1bUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN1bS5cbiAqL1xuZnVuY3Rpb24gYmFzZVN1bShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIHJlc3VsdCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgY3VycmVudCA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSk7XG4gICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBjdXJyZW50IDogKHJlc3VsdCArIGN1cnJlbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTdW07XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCJ2YXIgYmFzZVN1bSA9IHJlcXVpcmUoJy4vX2Jhc2VTdW0nKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgc3VtIG9mIHRoZSB2YWx1ZXMgaW4gYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNC4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN1bS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zdW0oWzQsIDIsIDgsIDZdKTtcbiAqIC8vID0+IDIwXG4gKi9cbmZ1bmN0aW9uIHN1bShhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VTdW0oYXJyYXksIGlkZW50aXR5KVxuICAgIDogMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdW07XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xyXG4gICdwcmluY2lwYWwnOiAxMDAwMDAsXHJcbiAgJ2ludGVyZXN0UmF0ZSc6IDAuMSxcclxuICAnY29tcG91bmRpbmdGcmVxdWVuY3knOiAyLFxyXG4gICdkb3duJzogMjAwMDAsXHJcbiAgJ21vbnRocyc6IDI0MCxcclxuICAndGF4UmF0ZSc6IDAuMzUsXHJcbiAgJ2RlcHJlY2lhdGlvbic6IDAuMDQsXHJcbiAgJ2V4cGVuc2VzJzogW10sXHJcbiAgJ2luY29tZXMnOiBbXSxcclxuICAnYmFsYW5jZXMnOiBbXVxyXG59KTtcclxuIiwiaW1wb3J0IHN1bSBmcm9tICdsb2Rhc2gvc3VtJztcclxuXHJcbmltcG9ydCB7IGNhbnRyaXAsIG5hbWVkQ2FudHJpcCB9IGZyb20gJy4vLi4vY2FudHJpcCc7XHJcbmltcG9ydCBmdW5jdG9yIGZyb20gJy4vLi4vZnVuY3Rvcic7XHJcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJztcclxuaW1wb3J0IHBlcmNlbnRpZnkgZnJvbSAnLi9wZXJjZW50aWZ5JztcclxuXHJcbmNvbnN0IG1vbnRoc1BlclllYXIgPSAxMjtcclxuXHJcbmNsYXNzIEFtb3J0aXphdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGVmYXVsdHMoKTtcclxuICAgIH1cclxuICAgIC8vIHNob3VsZCB0aGlzIGJlIGEgbWV0aG9kP1xyXG4gICAgZ2V0QmFsYW5jZSAoaykge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgbGV0IGJhbGFuY2UgPSBkYXRhLmJhbGFuY2VzW2tdIHx8IHt9O1xyXG4gICAgICAgIGNvbnN0IGkgPSBmdW5jdG9yKGRhdGEuaW50ZXJlc3RSYXRlKSh0aGlzLCBrKSAvIG1vbnRoc1BlclllYXI7XHJcbiAgICAgICAgbGV0IFAgPSBkYXRhLnByaW5jaXBhbCAtIGRhdGEuZG93bjtcclxuICAgICAgICBsZXQgZXF1aXR5ID0gZGF0YS5kb3duO1xyXG4gICAgICAgIGNvbnN0IG4gPSBkYXRhLm1vbnRocztcclxuICAgICAgICBjb25zdCBhbm51aXR5ID0gUCAqIChpICsgaSAvIChNYXRoLnBvdygxICsgaSwgbiAtIGspIC0gMSkpO1xyXG4gICAgICAgIGNvbnN0IHByZXYgPSBQO1xyXG5cclxuICAgICAgICBQICo9IDEgKyBpO1xyXG4gICAgICAgIFAgLT0gYW5udWl0eTtcclxuXHJcbiAgICAgICAgY29uc3QgY2hhbmdlID0gcHJldiAtIFA7XHJcbiAgICAgICAgZXF1aXR5ICs9IGNoYW5nZTtcclxuXHJcbiAgICAgICAgLy8gY29uc3QgZXhwZW5zZXNDYWxjdWxhdGVkID0gZXhwZW5zZXMubWFwKGEgPT4gaXNGdW5jdGlvbihhLmNvc3QpID8geyAuLi5hLCBjb3N0OiBhLmNvc3QobW9ydGdhZ2UsIGspIH0gOiBhKTtcclxuICAgICAgICAvLyAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXhwZW5zZXM/XCIsZGF0YS5leHBlbnNlcyk7XHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNDYWxjdWxhdGVkID0gZGF0YS5leHBlbnNlcy5tYXAoYSA9PiAoey4uLmEsIGNvc3Q6IGZ1bmN0b3IoYS5jb3N0KShkYXRhLCBrKX0pKTtcclxuXHJcbiAgICAgICAgLy8gY29uc3QgaW5jb21lc0NhbGN1bGF0ZWQgPSBpbmNvbWVzLm1hcChhID0+IGlzRnVuY3Rpb24oYS52YWx1ZSkgPyB7IC4uLmEsIHZhbHVlOiBhLnZhbHVlKG1vcnRnYWdlLCBrKSB9IDogYSk7XHJcbiAgICAgICAgY29uc3QgaW5jb21lc0NhbGN1bGF0ZWQgPSBkYXRhLmV4cGVuc2VzLm1hcChhID0+ICh7Li4uYSwgdmFsdWU6IGZ1bmN0b3IoYS52YWx1ZSkoZGF0YSwgayl9KSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4cGVuc2VzVG90YWwgPSBzdW0oZXhwZW5zZXNDYWxjdWxhdGVkLm1hcCh6ID0+IHouY29zdCkpO1xyXG4gICAgICAgIGNvbnN0IGluY29tZXNUb3RhbCA9IHN1bShpbmNvbWVzQ2FsY3VsYXRlZC5tYXAoeCA9PiB4LnZhbHVlKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludGVyZXN0UGFpZCA9IGFubnVpdHkgLSBjaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNEZWR1Y3RpYmxlID0gZXhwZW5zZXNUb3RhbCAqIGRhdGEudGF4UmF0ZTtcclxuICAgICAgICBjb25zdCBpbnRlcmVzdERlZHVjdGlibGUgPSBpbnRlcmVzdFBhaWQgKiBkYXRhLnRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgZGVwcmVjaWF0aW9uVG90YWwgPSBkYXRhLmRlcHJlY2lhdGlvbiAqIGRhdGEucHJpbmNpcGFsIC8gbW9udGhzUGVyWWVhcjtcclxuICAgICAgICBjb25zdCBpbnRlcmVzdFJhdGUgPSBpICogbW9udGhzUGVyWWVhcjtcclxuICAgICAgICBjb25zdCBkZXByZWNpYXRpb25EZWR1Y3RpYmxlID0gZGVwcmVjaWF0aW9uVG90YWwgKiBkYXRhLnRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgbmV0QmVmb3JlRGVkdWN0aW9ucyA9IGluY29tZXNUb3RhbCAtIGV4cGVuc2VzVG90YWwgLSBpbnRlcmVzdFBhaWQ7XHJcbiAgICAgICAgY29uc3QgbmV0QWZ0ZXJEZWR1Y3Rpb25zID0gbmV0QmVmb3JlRGVkdWN0aW9ucyArIGV4cGVuc2VzRGVkdWN0aWJsZSArIGRlcHJlY2lhdGlvbkRlZHVjdGlibGUgKyBpbnRlcmVzdERlZHVjdGlibGU7XHJcbiAgICAgICAgY29uc3QgY2FwUmF0ZSA9IG5ldEFmdGVyRGVkdWN0aW9ucyAqIG1vbnRoc1BlclllYXIgLyAoZGF0YS5wcmluY2lwYWwpO1xyXG4gICAgICAgIGNvbnN0IHJvaSA9IG5ldEFmdGVyRGVkdWN0aW9ucyAqIG1vbnRoc1BlclllYXIgLyBlcXVpdHk7XHJcblxyXG4gICAgICAgIGJhbGFuY2UgPSB7XHJcbiAgICAgICAgICAgIFAsXHJcbiAgICAgICAgICAgIGVxdWl0eSxcclxuICAgICAgICAgICAgaW50ZXJlc3RQYWlkLFxyXG4gICAgICAgICAgICBpbnRlcmVzdFJhdGUsXHJcbiAgICAgICAgICAgIGludGVyZXN0RGVkdWN0aWJsZSxcclxuICAgICAgICAgICAgZXF1aXR5UGFpZDogY2hhbmdlLFxyXG4gICAgICAgICAgICBwZXJpb2Q6IGssXHJcbiAgICAgICAgICAgIGV4cGVuc2VzQ2FsY3VsYXRlZCxcclxuICAgICAgICAgICAgaW5jb21lOiBpbmNvbWVzVG90YWwsXHJcbiAgICAgICAgICAgIGV4cGVuc2VzOiBleHBlbnNlc1RvdGFsLFxyXG4gICAgICAgICAgICBwYXltZW50OiBhbm51aXR5LFxyXG4gICAgICAgICAgICBpbmNvbWVzQ2FsY3VsYXRlZCxcclxuICAgICAgICAgICAgbmV0QmVmb3JlRGVkdWN0aW9ucyxcclxuICAgICAgICAgICAgbmV0QWZ0ZXJEZWR1Y3Rpb25zLFxyXG4gICAgICAgICAgICBkZXByZWNpYXRpb246IGRhdGEuZGVwcmVjaWF0aW9uLFxyXG4gICAgICAgICAgICBjYXBSYXRlLFxyXG4gICAgICAgICAgICByb2ksXHJcbiAgICAgICAgICAgIC4uLmJhbGFuY2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gYmFsYW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBleHBlbnNlIChuYW1lLCBjb3N0KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFeHBlbnNlP1wiLG5hbWUsY29zdCx0aGlzLmRhdGEpO1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgIHJldHVybiBuYW1lZENhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgZXhwZW5zZXNgKShuYW1lLCBjb3N0KTtcclxuICAgIH1cclxuXHJcbiAgICBpbmNvbWUgKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hbWVkQ2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBpbmNvbWVzYCkobmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBlcmlvZCAocCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYG1vbnRoc2AsIHZhbCA9PiB2YWxbdmFsLmxlbmd0aCAtIDFdID09PSAneScgPyAxMiAqICgrdmFsLnNsaWNlKDAsIHZhbC5sZW5ndGggLSAxKSkgOiB2YWwpKHApO1xyXG4gICAgfVxyXG5cclxuICAgIGludGVyZXN0IChpKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgaW50ZXJlc3RSYXRlYCwgcGVyY2VudGlmeSkoaSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVwcmVjaWF0aW9uIChkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgZGVwcmVjaWF0aW9uYCwgcGVyY2VudGlmeSkoZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGF4ICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgdGF4UmF0ZWAsIHBlcmNlbnRpZnkpKHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaW5jaXBhbCAocCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYHByaW5jaXBhbGApKHApO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd24gKGQpIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBkb3duYCwgKGQsIGNvbnRleHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRbZC5sZW5ndGggLSAxXSA9PT0gJyUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50ID0gMC4wMSAqICgrZC5zbGljZSgwLCBkLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJjZW50ICogY29udGV4dC5wcmluY2lwYWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoZCwgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBiYWxhbmNlcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5iYWxhbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmRhdGE7XHJcbiAgICAgICAgY29uc3QgYmFsYW5jZXMgPSBkYXRhLmJhbGFuY2VzO1xyXG4gICAgICAgIGNvbnN0IG4gPSBkYXRhLm1vbnRocztcclxuXHJcbiAgICAgICAgLy8gd2hhdCBkb2VzIHRoaXMgZG8/XHJcbiAgICAgICAgd2hpbGUgKGJhbGFuY2VzLmxlbmd0aCA+IG4gJiYgbiA+IDApIHtcclxuICAgICAgICAgICAgYmFsYW5jZXMucG9wKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG47IGorKykge1xyXG4gICAgICAgICAgICBiYWxhbmNlc1tqXSA9IHRoaXMuZ2V0QmFsYW5jZShqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbW9ydGl6YXRpb247XHJcbiIsImV4cG9ydCBkZWZhdWx0IHZhbCA9PiB2YWwubGVuZ3RoIC0gMSA9PT0gYCVgID8gMC4wMSAqICgrdmFsLnNsaWNlKDAsIHZhbC5sZW5ndGggLSAxKSkgOiB2YWw7XHJcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcclxuXHJcbmNvbnN0IGNhbnRyaXAgPSAoY29udGV4dCwgZGF0YSA9IHt9KSA9PiAoa2V5LCAuLi5tb2RpZmllcikgPT4gKHZhbHVlLCBzaG91bGRNb2RpZnkgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBkYXRhW2tleV07XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpZiAoc2hvdWxkTW9kaWZ5KSB7XHJcbiAgICAgICAgbW9kaWZpZXIuZm9yRWFjaChtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKG0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbW9kaWZpZXIgcGFzc2VkIHRvIGNhbnRyaXAgJHtrZXl9IGlzIG5vdCBhIGZ1bmN0aW9uLiBCZSBzdXJlIHlvdSBhcmUgcGFzc2luZyBhcmd1bWVudHMgYW5kIG5vdCBhbiBhcnJheS5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IG0odmFsdWUsIGNvbnRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuY2FsY3VsYXRlKSB7XHJcbiAgICAgICAgY29udGV4dC5jYWxjdWxhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGV4dDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhbnRyaXA7XHJcbiIsImltcG9ydCBjYW50cmlwIGZyb20gJy4vY2FudHJpcCc7XHJcbmltcG9ydCBuYW1lZENhbnRyaXAgZnJvbSAnLi9uYW1lZENhbnRyaXAnO1xyXG5cclxuZXhwb3J0IHsgY2FudHJpcCwgbmFtZWRDYW50cmlwIH07XHJcbiIsImltcG9ydCBjYW50cmlwIGZyb20gJy4vY2FudHJpcCc7XHJcblxyXG5jb25zdCBuYW1lZENhbnRyaXAgPSAoY29udGV4dCwgZGF0YSkgPT4gKGtleSwgLi4ubW9kaWZpZXIpID0+IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gIGNvbnN0IGFycmF5ID0gZGF0YVtrZXldO1xyXG5cclxuICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXR1cm4gYXJyYXk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXRjaGluZ0luZGV4ID0gYXJyYXkuZmluZEluZGV4KHAgPT4gcC5uYW1lID09PSBuYW1lKTtcclxuICBsZXQgbWF0Y2hpbmcgPSBhcnJheVttYXRjaGluZ0luZGV4XTtcclxuXHJcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBtYXRjaGluZztcclxuICB9XHJcblxyXG4gIGlmIChtYXRjaGluZykge1xyXG4gICAgdmFsdWUgPT09IG51bGwgPyBtYXRjaGluZyA9IHsuLi5tYXRjaGluZywgdmFsdWV9IDogYXJyYXkuc3BsaWNlKG1hdGNoaW5nSW5kZXgsIDEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBhcnJheS5wdXNoKHtuYW1lLCB2YWx1ZX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbnRyaXAoY29udGV4dCwgZGF0YSkoa2V5LCAuLi5tb2RpZmllcikodmFsdWUsIGZhbHNlKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5hbWVkQ2FudHJpcDtcclxuIiwiaW1wb3J0IEFtb3J0aXphdGlvbiBmcm9tICcuL2Ftb3J0aXphdGlvbic7XHJcblxyXG5jb25zdCAkJCQgPSB7XHJcbiAgYW1vcnRpemUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEFtb3J0aXphdGlvbigpO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy4kJCQgPSAkJCQ7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAkJCQ7XHJcbiIsIi8vIG1hZ2ljYWwuLi5cclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeCA9PiAoLi4uYXJncykgPT4gaXNGdW5jdGlvbih4KSA/IHgoLi4uYXJncykgOiB4O1xyXG4iXX0=
