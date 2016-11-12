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
            if (value === undefined) {
                return data[key];
            }

            modifier.forEach(function (m) {
                if (!(0, _isFunction2.default)(m)) {
                    throw new Error('A modifier passed to cantrip ' + key + ' is not a function. Be sure you are passing arguments and not an array.');
                }
                // console.log("Modifier?",m);
                value = m(value, context);
            });

            data[key] = value;

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

      return (0, _cantrip2.default)(context, data).apply(undefined, [key].concat(modifier))(value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVN1bS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3VtLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGRlZmF1bHRzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGluZGV4LmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXHBlcmNlbnRpZnkuanMiLCJzcmNcXGNhbnRyaXBcXGNhbnRyaXAuanMiLCJzcmNcXGNhbnRyaXBcXGluZGV4LmpzIiwic3JjXFxjYW50cmlwXFxuYW1lZENhbnRyaXAuanMiLCJzcmNcXGZpbmFuY2UuanMiLCJzcmNcXGZ1bmN0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQUEsV0FBc0IsVUFBQyxJQUFELEVBQU8sS0FBUCxFQUFpQjtBQUM3RSxVQUFNLFFBQVEsS0FBSyxHQUFMLENBQWQ7O0FBRUEsVUFBSSxTQUFTLFNBQWIsRUFBd0I7QUFDdEIsZUFBTyxLQUFQO0FBQ0Q7O0FBRUQsVUFBTSxnQkFBZ0IsTUFBTSxTQUFOLENBQWdCO0FBQUEsZUFBSyxFQUFFLElBQUYsS0FBVyxJQUFoQjtBQUFBLE9BQWhCLENBQXRCO0FBQ0EsVUFBSSxXQUFXLE1BQU0sYUFBTixDQUFmOztBQUVBLFVBQUksVUFBVSxTQUFkLEVBQXlCO0FBQ3ZCLGVBQU8sUUFBUDtBQUNEOztBQUVELFVBQUksUUFBSixFQUFjO0FBQ1osa0JBQVUsSUFBVixHQUFpQix3QkFBZSxRQUFmLElBQXlCLFlBQXpCLEdBQWpCLEdBQW1ELE1BQU0sTUFBTixDQUFhLGFBQWIsRUFBNEIsQ0FBNUIsQ0FBbkQ7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNLElBQU4sQ0FBVyxFQUFDLFVBQUQsRUFBTyxZQUFQLEVBQVg7QUFDRDs7QUFFRCxhQUFPLHVCQUFRLE9BQVIsRUFBaUIsSUFBakIsb0JBQXVCLEdBQXZCLFNBQStCLFFBQS9CLEdBQXlDLEtBQXpDLENBQVA7QUFDRCxLQXJCdUM7QUFBQSxHQUFuQjtBQUFBLENBQXJCOztrQkF1QmUsWTs7Ozs7Ozs7O0FDekJmOzs7Ozs7QUFFQSxJQUFNLE1BQU07QUFDVixVQURVLHNCQUNDO0FBQ1QsV0FBTyw0QkFBUDtBQUNEO0FBSFMsQ0FBWjs7QUFNQSxPQUFPLEdBQVAsR0FBYSxHQUFiOztrQkFFZSxHOzs7Ozs7Ozs7QUNUZjs7Ozs7O2tCQUVlO0FBQUEsU0FBSztBQUFBLFdBQWEsMEJBQVcsQ0FBWCxJQUFnQiw2QkFBaEIsR0FBNkIsQ0FBMUM7QUFBQSxHQUFMO0FBQUEsQyxFQUhmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHZhbHVlID0gT2JqZWN0KHZhbHVlKTtcbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiB2YWx1ZSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zdW1gIGFuZCBgXy5zdW1CeWAgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdW0uXG4gKi9cbmZ1bmN0aW9uIGJhc2VTdW0oYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciByZXN1bHQsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBpdGVyYXRlZShhcnJheVtpbmRleF0pO1xuICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gY3VycmVudCA6IChyZXN1bHQgKyBjdXJyZW50KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU3VtO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwidmFyIGJhc2VTdW0gPSByZXF1aXJlKCcuL19iYXNlU3VtJyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHN1bSBvZiB0aGUgdmFsdWVzIGluIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjQuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdW0uXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc3VtKFs0LCAyLCA4LCA2XSk7XG4gKiAvLyA9PiAyMFxuICovXG5mdW5jdGlvbiBzdW0oYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlU3VtKGFycmF5LCBpZGVudGl0eSlcbiAgICA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VtO1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcclxuICAncHJpbmNpcGFsJzogMTAwMDAwLFxyXG4gICdpbnRlcmVzdFJhdGUnOiAwLjEsXHJcbiAgJ2NvbXBvdW5kaW5nRnJlcXVlbmN5JzogMixcclxuICAnZG93bic6IDIwMDAwLFxyXG4gICdtb250aHMnOiAyNDAsXHJcbiAgJ3RheFJhdGUnOiAwLjM1LFxyXG4gICdkZXByZWNpYXRpb24nOiAwLjA0LFxyXG4gICdleHBlbnNlcyc6IFtdLFxyXG4gICdpbmNvbWVzJzogW10sXHJcbiAgJ2JhbGFuY2VzJzogW11cclxufSk7XHJcbiIsImltcG9ydCBzdW0gZnJvbSAnbG9kYXNoL3N1bSc7XHJcblxyXG5pbXBvcnQgeyBjYW50cmlwLCBuYW1lZENhbnRyaXAgfSBmcm9tICcuLy4uL2NhbnRyaXAnO1xyXG5pbXBvcnQgZnVuY3RvciBmcm9tICcuLy4uL2Z1bmN0b3InO1xyXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cyc7XHJcbmltcG9ydCBwZXJjZW50aWZ5IGZyb20gJy4vcGVyY2VudGlmeSc7XHJcblxyXG5jb25zdCBtb250aHNQZXJZZWFyID0gMTI7XHJcblxyXG5jbGFzcyBBbW9ydGl6YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRlZmF1bHRzKCk7XHJcbiAgICB9XHJcbiAgICAvLyBzaG91bGQgdGhpcyBiZSBhIG1ldGhvZD9cclxuICAgIGdldEJhbGFuY2UgKGspIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGxldCBiYWxhbmNlID0gZGF0YS5iYWxhbmNlc1trXSB8fCB7fTtcclxuICAgICAgICBjb25zdCBpID0gZnVuY3RvcihkYXRhLmludGVyZXN0UmF0ZSkodGhpcywgaykgLyBtb250aHNQZXJZZWFyO1xyXG4gICAgICAgIGxldCBQID0gZGF0YS5wcmluY2lwYWwgLSBkYXRhLmRvd247XHJcbiAgICAgICAgbGV0IGVxdWl0eSA9IGRhdGEuZG93bjtcclxuICAgICAgICBjb25zdCBuID0gZGF0YS5tb250aHM7XHJcbiAgICAgICAgY29uc3QgYW5udWl0eSA9IFAgKiAoaSArIGkgLyAoTWF0aC5wb3coMSArIGksIG4gLSBrKSAtIDEpKTtcclxuICAgICAgICBjb25zdCBwcmV2ID0gUDtcclxuXHJcbiAgICAgICAgUCAqPSAxICsgaTtcclxuICAgICAgICBQIC09IGFubnVpdHk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IHByZXYgLSBQO1xyXG4gICAgICAgIGVxdWl0eSArPSBjaGFuZ2U7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGV4cGVuc2VzQ2FsY3VsYXRlZCA9IGV4cGVuc2VzLm1hcChhID0+IGlzRnVuY3Rpb24oYS5jb3N0KSA/IHsgLi4uYSwgY29zdDogYS5jb3N0KG1vcnRnYWdlLCBrKSB9IDogYSk7XHJcbiAgICAgICAgLy8gICBkZWJ1Z2dlcjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkV4cGVuc2VzP1wiLGRhdGEuZXhwZW5zZXMpO1xyXG4gICAgICAgIGNvbnN0IGV4cGVuc2VzQ2FsY3VsYXRlZCA9IGRhdGEuZXhwZW5zZXMubWFwKGEgPT4gKHsuLi5hLCBjb3N0OiBmdW5jdG9yKGEuY29zdCkoZGF0YSwgayl9KSk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IGluY29tZXNDYWxjdWxhdGVkID0gaW5jb21lcy5tYXAoYSA9PiBpc0Z1bmN0aW9uKGEudmFsdWUpID8geyAuLi5hLCB2YWx1ZTogYS52YWx1ZShtb3J0Z2FnZSwgaykgfSA6IGEpO1xyXG4gICAgICAgIGNvbnN0IGluY29tZXNDYWxjdWxhdGVkID0gZGF0YS5leHBlbnNlcy5tYXAoYSA9PiAoey4uLmEsIHZhbHVlOiBmdW5jdG9yKGEudmFsdWUpKGRhdGEsIGspfSkpO1xyXG5cclxuICAgICAgICBjb25zdCBleHBlbnNlc1RvdGFsID0gc3VtKGV4cGVuc2VzQ2FsY3VsYXRlZC5tYXAoeiA9PiB6LmNvc3QpKTtcclxuICAgICAgICBjb25zdCBpbmNvbWVzVG90YWwgPSBzdW0oaW5jb21lc0NhbGN1bGF0ZWQubWFwKHggPT4geC52YWx1ZSkpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnRlcmVzdFBhaWQgPSBhbm51aXR5IC0gY2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGV4cGVuc2VzRGVkdWN0aWJsZSA9IGV4cGVuc2VzVG90YWwgKiBkYXRhLnRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3REZWR1Y3RpYmxlID0gaW50ZXJlc3RQYWlkICogZGF0YS50YXhSYXRlO1xyXG4gICAgICAgIGNvbnN0IGRlcHJlY2lhdGlvblRvdGFsID0gZGF0YS5kZXByZWNpYXRpb24gKiBkYXRhLnByaW5jaXBhbCAvIG1vbnRoc1BlclllYXI7XHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3RSYXRlID0gaSAqIG1vbnRoc1BlclllYXI7XHJcbiAgICAgICAgY29uc3QgZGVwcmVjaWF0aW9uRGVkdWN0aWJsZSA9IGRlcHJlY2lhdGlvblRvdGFsICogZGF0YS50YXhSYXRlO1xyXG4gICAgICAgIGNvbnN0IG5ldEJlZm9yZURlZHVjdGlvbnMgPSBpbmNvbWVzVG90YWwgLSBleHBlbnNlc1RvdGFsIC0gaW50ZXJlc3RQYWlkO1xyXG4gICAgICAgIGNvbnN0IG5ldEFmdGVyRGVkdWN0aW9ucyA9IG5ldEJlZm9yZURlZHVjdGlvbnMgKyBleHBlbnNlc0RlZHVjdGlibGUgKyBkZXByZWNpYXRpb25EZWR1Y3RpYmxlICsgaW50ZXJlc3REZWR1Y3RpYmxlO1xyXG4gICAgICAgIGNvbnN0IGNhcFJhdGUgPSBuZXRBZnRlckRlZHVjdGlvbnMgKiBtb250aHNQZXJZZWFyIC8gKGRhdGEucHJpbmNpcGFsKTtcclxuICAgICAgICBjb25zdCByb2kgPSBuZXRBZnRlckRlZHVjdGlvbnMgKiBtb250aHNQZXJZZWFyIC8gZXF1aXR5O1xyXG5cclxuICAgICAgICBiYWxhbmNlID0ge1xyXG4gICAgICAgICAgICBQLFxyXG4gICAgICAgICAgICBlcXVpdHksXHJcbiAgICAgICAgICAgIGludGVyZXN0UGFpZCxcclxuICAgICAgICAgICAgaW50ZXJlc3RSYXRlLFxyXG4gICAgICAgICAgICBpbnRlcmVzdERlZHVjdGlibGUsXHJcbiAgICAgICAgICAgIGVxdWl0eVBhaWQ6IGNoYW5nZSxcclxuICAgICAgICAgICAgcGVyaW9kOiBrLFxyXG4gICAgICAgICAgICBleHBlbnNlc0NhbGN1bGF0ZWQsXHJcbiAgICAgICAgICAgIGluY29tZTogaW5jb21lc1RvdGFsLFxyXG4gICAgICAgICAgICBleHBlbnNlczogZXhwZW5zZXNUb3RhbCxcclxuICAgICAgICAgICAgcGF5bWVudDogYW5udWl0eSxcclxuICAgICAgICAgICAgaW5jb21lc0NhbGN1bGF0ZWQsXHJcbiAgICAgICAgICAgIG5ldEJlZm9yZURlZHVjdGlvbnMsXHJcbiAgICAgICAgICAgIG5ldEFmdGVyRGVkdWN0aW9ucyxcclxuICAgICAgICAgICAgZGVwcmVjaWF0aW9uOiBkYXRhLmRlcHJlY2lhdGlvbixcclxuICAgICAgICAgICAgY2FwUmF0ZSxcclxuICAgICAgICAgICAgcm9pLFxyXG4gICAgICAgICAgICAuLi5iYWxhbmNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGJhbGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwZW5zZSAobmFtZSwgY29zdCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXhwZW5zZT9cIixuYW1lLGNvc3QsdGhpcy5kYXRhKTtcclxuICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICByZXR1cm4gbmFtZWRDYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGV4cGVuc2VzYCkobmFtZSwgY29zdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5jb21lIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBuYW1lZENhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgaW5jb21lc2ApKG5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwZXJpb2QgKHApIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBtb250aHNgLCB2YWwgPT4gdmFsW3ZhbC5sZW5ndGggLSAxXSA9PT0gJ3knID8gMTIgKiAoK3ZhbC5zbGljZSgwLCB2YWwubGVuZ3RoIC0gMSkpIDogdmFsKShwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmVzdCAoaSkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGludGVyZXN0UmF0ZWAsIHBlcmNlbnRpZnkpKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlcHJlY2lhdGlvbiAoZCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGRlcHJlY2lhdGlvbmAsIHBlcmNlbnRpZnkpKGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRheCAodCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYHRheFJhdGVgLCBwZXJjZW50aWZ5KSh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmluY2lwYWwgKHApIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBwcmluY2lwYWxgKShwKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3duIChkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgZG93bmAsIChkLCBjb250ZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkW2QubGVuZ3RoIC0gMV0gPT09ICclJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9IDAuMDEgKiAoK2Quc2xpY2UoMCwgZC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVyY2VudCAqIGNvbnRleHQucHJpbmNpcGFsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKGQsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmFsYW5jZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuYmFsYW5jZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlICgpIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kYXRhO1xyXG4gICAgICAgIGNvbnN0IGJhbGFuY2VzID0gZGF0YS5iYWxhbmNlcztcclxuICAgICAgICBjb25zdCBuID0gZGF0YS5tb250aHM7XHJcblxyXG4gICAgICAgIC8vIHdoYXQgZG9lcyB0aGlzIGRvP1xyXG4gICAgICAgIHdoaWxlIChiYWxhbmNlcy5sZW5ndGggPiBuICYmIG4gPiAwKSB7XHJcbiAgICAgICAgICAgIGJhbGFuY2VzLnBvcCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHtcclxuICAgICAgICAgICAgYmFsYW5jZXNbal0gPSB0aGlzLmdldEJhbGFuY2Uoaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW1vcnRpemF0aW9uO1xyXG4iLCJleHBvcnQgZGVmYXVsdCB2YWwgPT4gdmFsLmxlbmd0aCAtIDEgPT09IGAlYCA/IDAuMDEgKiAoK3ZhbC5zbGljZSgwLCB2YWwubGVuZ3RoIC0gMSkpIDogdmFsO1xyXG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XHJcblxyXG5jb25zdCBjYW50cmlwID0gKGNvbnRleHQsIGRhdGEgPSB7fSkgPT4gKGtleSwgLi4ubW9kaWZpZXIpID0+IHZhbHVlID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RpZmllci5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihtKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbW9kaWZpZXIgcGFzc2VkIHRvIGNhbnRyaXAgJHtrZXl9IGlzIG5vdCBhIGZ1bmN0aW9uLiBCZSBzdXJlIHlvdSBhcmUgcGFzc2luZyBhcmd1bWVudHMgYW5kIG5vdCBhbiBhcnJheS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNb2RpZmllcj9cIixtKTtcclxuICAgICAgICB2YWx1ZSA9IG0odmFsdWUsIGNvbnRleHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZGF0YVtrZXldID0gdmFsdWU7XHJcblxyXG4gICAgaWYgKGNvbnRleHQgJiYgY29udGV4dC5jYWxjdWxhdGUpIHtcclxuICAgICAgICBjb250ZXh0LmNhbGN1bGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb250ZXh0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FudHJpcDtcclxuIiwiaW1wb3J0IGNhbnRyaXAgZnJvbSAnLi9jYW50cmlwJztcclxuaW1wb3J0IG5hbWVkQ2FudHJpcCBmcm9tICcuL25hbWVkQ2FudHJpcCc7XHJcblxyXG5leHBvcnQgeyBjYW50cmlwLCBuYW1lZENhbnRyaXAgfTtcclxuIiwiaW1wb3J0IGNhbnRyaXAgZnJvbSAnLi9jYW50cmlwJztcclxuXHJcbmNvbnN0IG5hbWVkQ2FudHJpcCA9IChjb250ZXh0LCBkYXRhKSA9PiAoa2V5LCAuLi5tb2RpZmllcikgPT4gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgY29uc3QgYXJyYXkgPSBkYXRhW2tleV07XHJcblxyXG4gIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBhcnJheTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1hdGNoaW5nSW5kZXggPSBhcnJheS5maW5kSW5kZXgocCA9PiBwLm5hbWUgPT09IG5hbWUpO1xyXG4gIGxldCBtYXRjaGluZyA9IGFycmF5W21hdGNoaW5nSW5kZXhdO1xyXG5cclxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIG1hdGNoaW5nO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1hdGNoaW5nKSB7XHJcbiAgICB2YWx1ZSA9PT0gbnVsbCA/IG1hdGNoaW5nID0gey4uLm1hdGNoaW5nLCB2YWx1ZX0gOiBhcnJheS5zcGxpY2UobWF0Y2hpbmdJbmRleCwgMSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFycmF5LnB1c2goe25hbWUsIHZhbHVlfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FudHJpcChjb250ZXh0LCBkYXRhKShrZXksIC4uLm1vZGlmaWVyKSh2YWx1ZSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuYW1lZENhbnRyaXA7XHJcbiIsImltcG9ydCBBbW9ydGl6YXRpb24gZnJvbSAnLi9hbW9ydGl6YXRpb24nO1xyXG5cclxuY29uc3QgJCQkID0ge1xyXG4gIGFtb3J0aXplKCkge1xyXG4gICAgcmV0dXJuIG5ldyBBbW9ydGl6YXRpb24oKTtcclxuICB9XHJcbn07XHJcblxyXG53aW5kb3cuJCQkID0gJCQkO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgJCQkO1xyXG4iLCIvLyBtYWdpY2FsLi4uXHJcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHggPT4gKC4uLmFyZ3MpID0+IGlzRnVuY3Rpb24oeCkgPyB4KC4uLmFyZ3MpIDogeDtcclxuIl19
