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

var _getBalance = require('./getBalance');

var _getBalance2 = _interopRequireDefault(_getBalance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (data) {
    // const balances = data.balances;
    // const n = data.months;
    //
    // while (balances.length > n && n > 0) {
    //     balances.pop();
    // }
    //
    // for (let j = 0; j < n; j++) {
    //     balances[j] = getBalance(data,j);
    // }

    data.balances = (0, _getBalance2.default)(data, data.months, true);
};

},{"./getBalance":14}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateAnnuity = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _functor = require('./../functor');

var _functor2 = _interopRequireDefault(_functor);

var _sum = require('lodash/sum');

var _sum2 = _interopRequireDefault(_sum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var periodsPerYear = 12;
var calculateAnnuity = exports.calculateAnnuity = function calculateAnnuity(_ref) {
    var periods = _ref.periods,
        interestRatePerPeriod = _ref.interestRatePerPeriod,
        presentValue = _ref.presentValue;


    if (periods === undefined) throw new Error("Failed to specify argument option: periods");
    if (interestRatePerPeriod === undefined) throw new Error("Failed to specify argument option: interestRatePerPeriod");
    if (presentValue === undefined) throw new Error("Failed to specify argument option: presentValue");

    if (interestRatePerPeriod === 0) {
        return presentValue / periods;
    }

    var annuity = interestRatePerPeriod * presentValue / (1 - Math.pow(1 + interestRatePerPeriod, -periods));

    return annuity;
};

exports.default = function (data) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var returnAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var expenses = data.expenses,
        incomes = data.incomes,
        interestRate = data.interestRate,
        principal = data.principal,
        down = data.down,
        months = data.months,
        depreciation = data.depreciation,
        taxRate = data.taxRate;

    var balances = [];

    var _loop = function _loop(i) {

        var interestRatePerPeriod = (0, _functor2.default)(interestRate)(undefined, i) / periodsPerYear;
        var prevValue = i === 0 ? principal - down : balances[i - 1].presentValue;
        var numPeriods = months;

        var annuity = calculateAnnuity({ interestRatePerPeriod: interestRatePerPeriod, periods: k - i, presentValue: prevValue });
        var interestThisPeriod = prevValue * interestRatePerPeriod;
        var presentValue = prevValue + interestThisPeriod - annuity;
        var change = interestThisPeriod - annuity;

        var equity = i === 0 ? down : balances[i - 1].equity;
        equity += annuity - interestThisPeriod;

        var expensesCalculated = expenses.map(function (a) {
            return _extends({}, a, { value: (0, _functor2.default)(a.value)(data, i) });
        });
        var incomesCalculated = incomes.map(function (a) {
            return _extends({}, a, { value: (0, _functor2.default)(a.value)(data, i) });
        });

        var expensesTotal = (0, _sum2.default)(expensesCalculated.map(function (z) {
            return z.value;
        }));
        var incomesTotal = (0, _sum2.default)(incomesCalculated.map(function (x) {
            return x.value;
        }));

        var interestPaid = interestThisPeriod;
        var expensesDeductible = expensesTotal * taxRate;
        var interestDeductible = interestPaid * taxRate;
        var depreciationTotal = depreciation * principal / periodsPerYear;
        var interestRateFinal = interestRatePerPeriod * periodsPerYear;
        var depreciationDeductible = depreciationTotal * taxRate;
        var netBeforeDeductions = incomesTotal - expensesTotal - interestPaid;
        var netAfterDeductions = netBeforeDeductions + expensesDeductible + depreciationDeductible + interestDeductible;
        var capRate = netAfterDeductions * periodsPerYear / principal;
        var roi = netAfterDeductions * periodsPerYear / equity;

        var balance = {
            presentValue: presentValue,
            equity: equity,
            interestPaid: interestPaid,
            interestRate: interestRateFinal,
            interestDeductible: interestDeductible,
            equityPaid: -change,
            period: i,
            expensesCalculated: expensesCalculated,
            expensesDeductible: expensesDeductible,
            income: incomesTotal,
            expenses: expensesTotal,
            payment: annuity,
            depreciationDeductible: depreciationDeductible,
            incomesCalculated: incomesCalculated,
            netBeforeDeductions: netBeforeDeductions,
            netAfterDeductions: netAfterDeductions,
            depreciation: depreciation,
            capRate: capRate,
            roi: roi
        };

        balances.push(balance);
    };

    for (var i = 0; i <= k; i++) {
        _loop(i);
    }

    if (returnAll) {
        return balances;
    } else {
        return balances[k];
    }
};

},{"./../functor":23,"lodash/sum":11}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cantrip = require('./../cantrip');

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _percentify = require('./percentify');

var _percentify2 = _interopRequireDefault(_percentify);

var _percentOfDownify = require('./percentOfDownify');

var _percentOfDownify2 = _interopRequireDefault(_percentOfDownify);

var _periodify = require('./periodify');

var _periodify2 = _interopRequireDefault(_periodify);

var _calculateBalances = require('./calculateBalances');

var _calculateBalances2 = _interopRequireDefault(_calculateBalances);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Amortization = function () {
    function Amortization() {
        _classCallCheck(this, Amortization);

        this.data = (0, _defaults2.default)();
    }

    _createClass(Amortization, [{
        key: 'expense',
        value: function expense(name, value) {
            return (0, _cantrip.namedCantrip)(this, this.data)('expenses')(name, value);
        }
    }, {
        key: 'income',
        value: function income(name, value) {
            return (0, _cantrip.namedCantrip)(this, this.data)('incomes')(name, value);
        }
    }, {
        key: 'period',
        value: function period(p) {
            return (0, _cantrip.cantrip)(this, this.data)('months', _periodify2.default)(p);
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
            return (0, _cantrip.cantrip)(this, this.data)('down', _percentOfDownify2.default)(d, this.data);
        }
    }, {
        key: 'balances',
        value: function balances() {
            return this.data.balances;
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            // console.log("Data?",this.data);
            (0, _calculateBalances2.default)(this.data);
            // console.log("calculated.",this.data);


            return this;
        }
    }]);

    return Amortization;
}();

exports.default = Amortization;

},{"./../cantrip":20,"./calculateBalances":12,"./defaults":13,"./percentOfDownify":16,"./percentify":17,"./periodify":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (d, context) {
    if (d[d.length - 1] === '%') {
        var percent = 0.01 * +d.slice(0, d.length - 1);
        return percent * context.principal();
    } else {
        return d;
    }
};

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val) {
  return val.length - 1 === "%" ? 0.01 * +val.slice(0, val.length - 1) : val;
};

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (val) {
  return val[val.length - 1] === 'y' ? 12 * +val.slice(0, val.length - 1) : val;
};

},{}],19:[function(require,module,exports){
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

            // if (context && context.calculate) {
            //     context.calculate();
            // }

            return context;
        };
    };
};

exports.default = cantrip;

},{"lodash/isFunction":9}],20:[function(require,module,exports){
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

},{"./cantrip":19,"./namedCantrip":21}],21:[function(require,module,exports){
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

            modifier.forEach(function (m) {
                if (!isFunction(m)) {
                    throw new Error('A modifier passed to cantrip ' + key + ' is not a function. Be sure you are passing arguments and not an array.');
                }
                value = m(value, context);
            });

            if (matching) {
                if (value === null) {
                    array.splice(matchingIndex, 1);
                } else {
                    matching = _extends({}, matching, { value: value });
                }
            } else {
                array.push({ name: name, value: value });
            }

            return (0, _cantrip2.default)(context, data).apply(undefined, [key].concat(modifier))(value, false);
        };
    };
};

exports.default = namedCantrip;

},{"./cantrip":19}],22:[function(require,module,exports){
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

},{"./amortization":15}],23:[function(require,module,exports){
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

},{"lodash/isFunction":9}]},{},[22])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVN1bS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3VtLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGNhbGN1bGF0ZUJhbGFuY2VzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGRlZmF1bHRzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGdldEJhbGFuY2UuanMiLCJzcmNcXGFtb3J0aXphdGlvblxcaW5kZXguanMiLCJzcmNcXGFtb3J0aXphdGlvblxccGVyY2VudE9mRG93bmlmeS5qcyIsInNyY1xcYW1vcnRpemF0aW9uXFxwZXJjZW50aWZ5LmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXHBlcmlvZGlmeS5qcyIsInNyY1xcY2FudHJpcFxcY2FudHJpcC5qcyIsInNyY1xcY2FudHJpcFxcaW5kZXguanMiLCJzcmNcXGNhbnRyaXBcXG5hbWVkQ2FudHJpcC5qcyIsInNyY1xcZmluYW5jZS5qcyIsInNyY1xcZnVuY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUEsQ0FBckI7O2tCQWtDZSxZOzs7Ozs7Ozs7QUNwQ2Y7Ozs7OztBQUVBLElBQU0sTUFBTTtBQUNWLFVBRFUsc0JBQ0M7QUFDVCxXQUFPLDRCQUFQO0FBQ0Q7QUFIUyxDQUFaOztBQU1BLE9BQU8sR0FBUCxHQUFhLEdBQWI7O2tCQUVlLEc7Ozs7Ozs7OztBQ1RmOzs7Ozs7a0JBRWU7QUFBQSxTQUFLO0FBQUEsV0FBYSwwQkFBVyxDQUFYLElBQWdCLDZCQUFoQixHQUE2QixDQUExQztBQUFBLEdBQUw7QUFBQSxDLEVBSGYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgdmFsdWUgPSBPYmplY3QodmFsdWUpO1xuICByZXR1cm4gKHN5bVRvU3RyaW5nVGFnICYmIHN5bVRvU3RyaW5nVGFnIGluIHZhbHVlKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnN1bWAgYW5kIGBfLnN1bUJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN1bS5cbiAqL1xuZnVuY3Rpb24gYmFzZVN1bShhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIHJlc3VsdCxcbiAgICAgIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgY3VycmVudCA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSk7XG4gICAgaWYgKGN1cnJlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBjdXJyZW50IDogKHJlc3VsdCArIGN1cnJlbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VTdW07XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nIHVzaW5nIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBvYmplY3RUb1N0cmluZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaWRlbnRpdHk7XG4iLCJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCJ2YXIgYmFzZVN1bSA9IHJlcXVpcmUoJy4vX2Jhc2VTdW0nKSxcbiAgICBpZGVudGl0eSA9IHJlcXVpcmUoJy4vaWRlbnRpdHknKTtcblxuLyoqXG4gKiBDb21wdXRlcyB0aGUgc3VtIG9mIHRoZSB2YWx1ZXMgaW4gYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNC4wXG4gKiBAY2F0ZWdvcnkgTWF0aFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHN1bS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5zdW0oWzQsIDIsIDgsIDZdKTtcbiAqIC8vID0+IDIwXG4gKi9cbmZ1bmN0aW9uIHN1bShhcnJheSkge1xuICByZXR1cm4gKGFycmF5ICYmIGFycmF5Lmxlbmd0aClcbiAgICA/IGJhc2VTdW0oYXJyYXksIGlkZW50aXR5KVxuICAgIDogMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdW07XG4iLCJpbXBvcnQgZ2V0QmFsYW5jZSBmcm9tICcuL2dldEJhbGFuY2UnO1xyXG5leHBvcnQgZGVmYXVsdCAoZGF0YSk9PntcclxuICAgIC8vIGNvbnN0IGJhbGFuY2VzID0gZGF0YS5iYWxhbmNlcztcclxuICAgIC8vIGNvbnN0IG4gPSBkYXRhLm1vbnRocztcclxuICAgIC8vXHJcbiAgICAvLyB3aGlsZSAoYmFsYW5jZXMubGVuZ3RoID4gbiAmJiBuID4gMCkge1xyXG4gICAgLy8gICAgIGJhbGFuY2VzLnBvcCgpO1xyXG4gICAgLy8gfVxyXG4gICAgLy9cclxuICAgIC8vIGZvciAobGV0IGogPSAwOyBqIDwgbjsgaisrKSB7XHJcbiAgICAvLyAgICAgYmFsYW5jZXNbal0gPSBnZXRCYWxhbmNlKGRhdGEsaik7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgZGF0YS5iYWxhbmNlcyA9IGdldEJhbGFuY2UoZGF0YSxkYXRhLm1vbnRocyx0cnVlKTtcclxufSIsImV4cG9ydCBkZWZhdWx0ICgpID0+ICh7XHJcbiAgJ3ByaW5jaXBhbCc6IDEwMDAwMCxcclxuICAnaW50ZXJlc3RSYXRlJzogMC4xLFxyXG4gICdjb21wb3VuZGluZ0ZyZXF1ZW5jeSc6IDIsXHJcbiAgJ2Rvd24nOiAyMDAwMCxcclxuICAnbW9udGhzJzogMjQwLFxyXG4gICd0YXhSYXRlJzogMC4zNSxcclxuICAnZGVwcmVjaWF0aW9uJzogMC4wNCxcclxuICAnZXhwZW5zZXMnOiBbXSxcclxuICAnaW5jb21lcyc6IFtdLFxyXG4gICdiYWxhbmNlcyc6IFtdXHJcbn0pO1xyXG4iLCJjb25zdCBwZXJpb2RzUGVyWWVhciA9IDEyO1xyXG5pbXBvcnQgZnVuY3RvciBmcm9tICcuLy4uL2Z1bmN0b3InO1xyXG5pbXBvcnQgc3VtIGZyb20gJ2xvZGFzaC9zdW0nO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhbGN1bGF0ZUFubnVpdHkgPSAoe3BlcmlvZHMsaW50ZXJlc3RSYXRlUGVyUGVyaW9kLHByZXNlbnRWYWx1ZX0pPT57XHJcblxyXG4gICAgaWYgKHBlcmlvZHMgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHNwZWNpZnkgYXJndW1lbnQgb3B0aW9uOiBwZXJpb2RzXCIpO1xyXG4gICAgaWYgKGludGVyZXN0UmF0ZVBlclBlcmlvZCA9PT0gdW5kZWZpbmVkKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gc3BlY2lmeSBhcmd1bWVudCBvcHRpb246IGludGVyZXN0UmF0ZVBlclBlcmlvZFwiKTtcclxuICAgIGlmIChwcmVzZW50VmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHNwZWNpZnkgYXJndW1lbnQgb3B0aW9uOiBwcmVzZW50VmFsdWVcIik7XHJcblxyXG4gICAgaWYgKGludGVyZXN0UmF0ZVBlclBlcmlvZCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBwcmVzZW50VmFsdWUgLyBwZXJpb2RzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFubnVpdHkgPSAoaW50ZXJlc3RSYXRlUGVyUGVyaW9kICogcHJlc2VudFZhbHVlKSAvICgxIC0gTWF0aC5wb3coIDEgKyBpbnRlcmVzdFJhdGVQZXJQZXJpb2QgLCAtcGVyaW9kcykpO1xyXG5cclxuICAgIHJldHVybiBhbm51aXR5O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGRhdGEsIGs9MCwgcmV0dXJuQWxsID0gZmFsc2UpPT57XHJcblxyXG4gICAgY29uc3Qge2V4cGVuc2VzLCBpbmNvbWVzLCBpbnRlcmVzdFJhdGUscHJpbmNpcGFsLGRvd24sbW9udGhzLGRlcHJlY2lhdGlvbix0YXhSYXRlfSA9IGRhdGE7XHJcbiAgICBjb25zdCBiYWxhbmNlcyA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGs7IGkrKykge1xyXG5cclxuICAgICAgICBjb25zdCBpbnRlcmVzdFJhdGVQZXJQZXJpb2QgPSBmdW5jdG9yKGludGVyZXN0UmF0ZSkodGhpcywgaSkgLyBwZXJpb2RzUGVyWWVhcjtcclxuICAgICAgICBjb25zdCBwcmV2VmFsdWUgPSBpID09PSAwID8gcHJpbmNpcGFsIC0gZG93biA6IGJhbGFuY2VzW2ktMV0ucHJlc2VudFZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG51bVBlcmlvZHMgPSBtb250aHM7XHJcblxyXG4gICAgICAgIGNvbnN0IGFubnVpdHkgPSBjYWxjdWxhdGVBbm51aXR5KHtpbnRlcmVzdFJhdGVQZXJQZXJpb2QscGVyaW9kczogayAtIGkscHJlc2VudFZhbHVlOnByZXZWYWx1ZX0pO1xyXG4gICAgICAgIGNvbnN0IGludGVyZXN0VGhpc1BlcmlvZCA9IHByZXZWYWx1ZSAqIGludGVyZXN0UmF0ZVBlclBlcmlvZDtcclxuICAgICAgICBjb25zdCBwcmVzZW50VmFsdWUgPSBwcmV2VmFsdWUgKyBpbnRlcmVzdFRoaXNQZXJpb2QgLSBhbm51aXR5O1xyXG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IGludGVyZXN0VGhpc1BlcmlvZCAtIGFubnVpdHk7XHJcblxyXG4gICAgICAgIGxldCBlcXVpdHkgPSBpID09PSAwID8gZG93biA6IGJhbGFuY2VzW2ktMV0uZXF1aXR5O1xyXG4gICAgICAgIGVxdWl0eSArPSBhbm51aXR5IC0gaW50ZXJlc3RUaGlzUGVyaW9kO1xyXG5cclxuICAgICAgICBjb25zdCBleHBlbnNlc0NhbGN1bGF0ZWQgPSBleHBlbnNlcy5tYXAoYSA9PiAoey4uLmEsIHZhbHVlOiBmdW5jdG9yKGEudmFsdWUpKGRhdGEsIGkpfSkpO1xyXG4gICAgICAgIGNvbnN0IGluY29tZXNDYWxjdWxhdGVkID0gaW5jb21lcy5tYXAoYSA9PiAoey4uLmEsIHZhbHVlOiBmdW5jdG9yKGEudmFsdWUpKGRhdGEsIGkpfSkpO1xyXG5cclxuICAgICAgICBjb25zdCBleHBlbnNlc1RvdGFsID0gc3VtKGV4cGVuc2VzQ2FsY3VsYXRlZC5tYXAoeiA9PiB6LnZhbHVlKSk7XHJcbiAgICAgICAgY29uc3QgaW5jb21lc1RvdGFsID0gc3VtKGluY29tZXNDYWxjdWxhdGVkLm1hcCh4ID0+IHgudmFsdWUpKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3RQYWlkID0gaW50ZXJlc3RUaGlzUGVyaW9kO1xyXG4gICAgICAgIGNvbnN0IGV4cGVuc2VzRGVkdWN0aWJsZSA9IGV4cGVuc2VzVG90YWwgKiB0YXhSYXRlO1xyXG4gICAgICAgIGNvbnN0IGludGVyZXN0RGVkdWN0aWJsZSA9IGludGVyZXN0UGFpZCAqIHRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgZGVwcmVjaWF0aW9uVG90YWwgPSBkZXByZWNpYXRpb24gKiBwcmluY2lwYWwgLyBwZXJpb2RzUGVyWWVhcjtcclxuICAgICAgICBjb25zdCBpbnRlcmVzdFJhdGVGaW5hbCA9IGludGVyZXN0UmF0ZVBlclBlcmlvZCAqIHBlcmlvZHNQZXJZZWFyO1xyXG4gICAgICAgIGNvbnN0IGRlcHJlY2lhdGlvbkRlZHVjdGlibGUgPSBkZXByZWNpYXRpb25Ub3RhbCAqIHRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgbmV0QmVmb3JlRGVkdWN0aW9ucyA9IGluY29tZXNUb3RhbCAtIGV4cGVuc2VzVG90YWwgLSBpbnRlcmVzdFBhaWQ7XHJcbiAgICAgICAgY29uc3QgbmV0QWZ0ZXJEZWR1Y3Rpb25zID0gbmV0QmVmb3JlRGVkdWN0aW9ucyArIGV4cGVuc2VzRGVkdWN0aWJsZSArIGRlcHJlY2lhdGlvbkRlZHVjdGlibGUgKyBpbnRlcmVzdERlZHVjdGlibGU7XHJcbiAgICAgICAgY29uc3QgY2FwUmF0ZSA9IG5ldEFmdGVyRGVkdWN0aW9ucyAqIHBlcmlvZHNQZXJZZWFyIC8gcHJpbmNpcGFsO1xyXG4gICAgICAgIGNvbnN0IHJvaSA9IChuZXRBZnRlckRlZHVjdGlvbnMgKiBwZXJpb2RzUGVyWWVhcikgLyBlcXVpdHk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhbGFuY2UgPSB7XHJcbiAgICAgICAgICAgIHByZXNlbnRWYWx1ZSxcclxuICAgICAgICAgICAgZXF1aXR5LFxyXG4gICAgICAgICAgICBpbnRlcmVzdFBhaWQsXHJcbiAgICAgICAgICAgIGludGVyZXN0UmF0ZTppbnRlcmVzdFJhdGVGaW5hbCxcclxuICAgICAgICAgICAgaW50ZXJlc3REZWR1Y3RpYmxlLFxyXG4gICAgICAgICAgICBlcXVpdHlQYWlkOiAtY2hhbmdlLFxyXG4gICAgICAgICAgICBwZXJpb2Q6IGksXHJcbiAgICAgICAgICAgIGV4cGVuc2VzQ2FsY3VsYXRlZCxcclxuICAgICAgICAgICAgZXhwZW5zZXNEZWR1Y3RpYmxlLFxyXG4gICAgICAgICAgICBpbmNvbWU6IGluY29tZXNUb3RhbCxcclxuICAgICAgICAgICAgZXhwZW5zZXM6IGV4cGVuc2VzVG90YWwsXHJcbiAgICAgICAgICAgIHBheW1lbnQ6IGFubnVpdHksXHJcbiAgICAgICAgICAgIGRlcHJlY2lhdGlvbkRlZHVjdGlibGUsXHJcbiAgICAgICAgICAgIGluY29tZXNDYWxjdWxhdGVkLFxyXG4gICAgICAgICAgICBuZXRCZWZvcmVEZWR1Y3Rpb25zLFxyXG4gICAgICAgICAgICBuZXRBZnRlckRlZHVjdGlvbnMsXHJcbiAgICAgICAgICAgIGRlcHJlY2lhdGlvbjogZGVwcmVjaWF0aW9uLFxyXG4gICAgICAgICAgICBjYXBSYXRlLFxyXG4gICAgICAgICAgICByb2lcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBiYWxhbmNlcy5wdXNoKGJhbGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXR1cm5BbGwpIHtcclxuICAgICAgICByZXR1cm4gYmFsYW5jZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBiYWxhbmNlc1trXTtcclxuICAgIH1cclxuXHJcbn0iLCJcclxuXHJcbmltcG9ydCB7IGNhbnRyaXAsIG5hbWVkQ2FudHJpcCB9IGZyb20gJy4vLi4vY2FudHJpcCc7XHJcbmltcG9ydCBkZWZhdWx0cyBmcm9tICcuL2RlZmF1bHRzJztcclxuaW1wb3J0IHBlcmNlbnRpZnkgZnJvbSAnLi9wZXJjZW50aWZ5JztcclxuaW1wb3J0IHBlcmNlbnRPZkRvd25pZnkgZnJvbSAnLi9wZXJjZW50T2ZEb3duaWZ5JztcclxuaW1wb3J0IHBlcmlvZGlmeSBmcm9tICcuL3BlcmlvZGlmeSc7XHJcbmltcG9ydCBjYWxjdWxhdGVCYWxhbmNlcyBmcm9tICcuL2NhbGN1bGF0ZUJhbGFuY2VzJztcclxuXHJcblxyXG5cclxuY2xhc3MgQW1vcnRpemF0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkZWZhdWx0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGVuc2UgKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hbWVkQ2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBleHBlbnNlc2ApKG5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBpbmNvbWUgKG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hbWVkQ2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBpbmNvbWVzYCkobmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBlcmlvZCAocCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYG1vbnRoc2AsIHBlcmlvZGlmeSkocCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW50ZXJlc3QgKGkpIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBpbnRlcmVzdFJhdGVgLCBwZXJjZW50aWZ5KShpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZXByZWNpYXRpb24gKGQpIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBkZXByZWNpYXRpb25gLCBwZXJjZW50aWZ5KShkKTtcclxuICAgIH1cclxuXHJcbiAgICB0YXggKHQpIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGB0YXhSYXRlYCwgcGVyY2VudGlmeSkodCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpbmNpcGFsIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgcHJpbmNpcGFsYCkocCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG93biAoZCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGRvd25gLCBwZXJjZW50T2ZEb3duaWZ5KShkLCB0aGlzLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGJhbGFuY2VzICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmJhbGFuY2VzO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGN1bGF0ZSAoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJEYXRhP1wiLHRoaXMuZGF0YSk7XHJcbiAgICAgICAgY2FsY3VsYXRlQmFsYW5jZXModGhpcy5kYXRhKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImNhbGN1bGF0ZWQuXCIsdGhpcy5kYXRhKTtcclxuXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBbW9ydGl6YXRpb247XHJcbiIsImV4cG9ydCBkZWZhdWx0IChkLCBjb250ZXh0KSA9PiB7XHJcbiAgICBpZiAoZFtkLmxlbmd0aCAtIDFdID09PSAnJScpIHtcclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gMC4wMSAqICgrZC5zbGljZSgwLCBkLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICByZXR1cm4gcGVyY2VudCAqIGNvbnRleHQucHJpbmNpcGFsKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgdmFsID0+IHZhbC5sZW5ndGggLSAxID09PSBgJWAgPyAwLjAxICogKCt2YWwuc2xpY2UoMCwgdmFsLmxlbmd0aCAtIDEpKSA6IHZhbDtcclxuIiwiZXhwb3J0IGRlZmF1bHQgdmFsID0+IHZhbFt2YWwubGVuZ3RoIC0gMV0gPT09ICd5JyA/IDEyICogKCt2YWwuc2xpY2UoMCwgdmFsLmxlbmd0aCAtIDEpKSA6IHZhbDsiLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XHJcblxyXG5jb25zdCBjYW50cmlwID0gKGNvbnRleHQsIGRhdGEgPSB7fSkgPT4gKGtleSwgLi4ubW9kaWZpZXIpID0+ICh2YWx1ZSwgc2hvdWxkTW9kaWZ5ID0gdHJ1ZSkgPT4ge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgaWYgKHNob3VsZE1vZGlmeSkge1xyXG4gICAgICAgIG1vZGlmaWVyLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghaXNGdW5jdGlvbihtKSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIG1vZGlmaWVyIHBhc3NlZCB0byBjYW50cmlwICR7a2V5fSBpcyBub3QgYSBmdW5jdGlvbi4gQmUgc3VyZSB5b3UgYXJlIHBhc3NpbmcgYXJndW1lbnRzIGFuZCBub3QgYW4gYXJyYXkuYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFsdWUgPSBtKHZhbHVlLCBjb250ZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkYXRhW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiAoY29udGV4dCAmJiBjb250ZXh0LmNhbGN1bGF0ZSkge1xyXG4gICAgLy8gICAgIGNvbnRleHQuY2FsY3VsYXRlKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRleHQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYW50cmlwO1xyXG4iLCJpbXBvcnQgY2FudHJpcCBmcm9tICcuL2NhbnRyaXAnO1xyXG5pbXBvcnQgbmFtZWRDYW50cmlwIGZyb20gJy4vbmFtZWRDYW50cmlwJztcclxuXHJcbmV4cG9ydCB7IGNhbnRyaXAsIG5hbWVkQ2FudHJpcCB9O1xyXG4iLCJpbXBvcnQgY2FudHJpcCBmcm9tICcuL2NhbnRyaXAnO1xyXG5cclxuY29uc3QgbmFtZWRDYW50cmlwID0gKGNvbnRleHQsIGRhdGEpID0+IChrZXksIC4uLm1vZGlmaWVyKSA9PiAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgIGNvbnN0IGFycmF5ID0gZGF0YVtrZXldO1xyXG5cclxuICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWF0Y2hpbmdJbmRleCA9IGFycmF5LmZpbmRJbmRleChwID0+IHAubmFtZSA9PT0gbmFtZSk7XHJcbiAgICBsZXQgbWF0Y2hpbmcgPSBhcnJheVttYXRjaGluZ0luZGV4XTtcclxuXHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBtYXRjaGluZztcclxuICAgIH1cclxuXHJcbiAgICBtb2RpZmllci5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgIGlmICghaXNGdW5jdGlvbihtKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbW9kaWZpZXIgcGFzc2VkIHRvIGNhbnRyaXAgJHtrZXl9IGlzIG5vdCBhIGZ1bmN0aW9uLiBCZSBzdXJlIHlvdSBhcmUgcGFzc2luZyBhcmd1bWVudHMgYW5kIG5vdCBhbiBhcnJheS5gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsdWUgPSBtKHZhbHVlLCBjb250ZXh0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChtYXRjaGluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBhcnJheS5zcGxpY2UobWF0Y2hpbmdJbmRleCwgMSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdGNoaW5nID0gey4uLm1hdGNoaW5nLCB2YWx1ZX07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhcnJheS5wdXNoKHtuYW1lLCB2YWx1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjYW50cmlwKGNvbnRleHQsIGRhdGEpKGtleSwgLi4ubW9kaWZpZXIpKHZhbHVlLCBmYWxzZSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuYW1lZENhbnRyaXA7XHJcbiIsImltcG9ydCBBbW9ydGl6YXRpb24gZnJvbSAnLi9hbW9ydGl6YXRpb24nO1xyXG5cclxuY29uc3QgJCQkID0ge1xyXG4gIGFtb3J0aXplKCkge1xyXG4gICAgcmV0dXJuIG5ldyBBbW9ydGl6YXRpb24oKTtcclxuICB9XHJcbn07XHJcblxyXG53aW5kb3cuJCQkID0gJCQkO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgJCQkO1xyXG4iLCIvLyBtYWdpY2FsLi4uXHJcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHggPT4gKC4uLmFyZ3MpID0+IGlzRnVuY3Rpb24oeCkgPyB4KC4uLmFyZ3MpIDogeDtcclxuIl19
