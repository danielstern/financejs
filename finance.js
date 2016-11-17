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
    // return presentValue * (interestRatePerPeriod + interestRatePerPeriod / (Math.pow(1 + interestRatePerPeriod, periods) - 1));
    var annuity = interestRatePerPeriod * presentValue / (1 - Math.pow(1 + interestRatePerPeriod, -periods));

    console.log("Calculate annuity:", periods, interestRatePerPeriod, presentValue, annuity);
    return annuity;
};

//export const

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

        // debugger;
        var interestRatePerPeriod = (0, _functor2.default)(interestRate)(undefined, i) / periodsPerYear;
        var prevValue = i === 0 ? principal - down : balances[i - 1].presentValue;
        var numPeriods = months;

        // annuity is, again, not being calculated correctly
        var annuity = calculateAnnuity({ interestRatePerPeriod: interestRatePerPeriod, periods: k - i + 1, presentValue: prevValue });
        var increaseInPresentValueDueToInterestRate = prevValue * interestRatePerPeriod;

        var presentValue = prevValue + increaseInPresentValueDueToInterestRate - annuity;
        // console.log("Annuity?",annuity);

        var change = increaseInPresentValueDueToInterestRate - annuity;
        // console.log("Change",change);
        // const equity = i === 0 ? (down + change) : (balances[i-1].equity + change);
        var equity = i === 0 ? down : balances[i - 1].equity;
        equity += annuity;
        console.log("Equity?", equity, annuity);

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

        var interestPaid = annuity - change;
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
            equityPaid: change,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVN1bS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3VtLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGNhbGN1bGF0ZUJhbGFuY2VzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGRlZmF1bHRzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGdldEJhbGFuY2UuanMiLCJzcmNcXGFtb3J0aXphdGlvblxcaW5kZXguanMiLCJzcmNcXGFtb3J0aXphdGlvblxccGVyY2VudE9mRG93bmlmeS5qcyIsInNyY1xcYW1vcnRpemF0aW9uXFxwZXJjZW50aWZ5LmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXHBlcmlvZGlmeS5qcyIsInNyY1xcY2FudHJpcFxcY2FudHJpcC5qcyIsInNyY1xcY2FudHJpcFxcaW5kZXguanMiLCJzcmNcXGNhbnRyaXBcXG5hbWVkQ2FudHJpcC5qcyIsInNyY1xcZmluYW5jZS5qcyIsInNyY1xcZnVuY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0gsc0JBQU0sSUFBTixDQUFXLEVBQUMsVUFBRCxFQUFPLFlBQVAsRUFBWDtBQUNIOztBQUVELG1CQUFPLHVCQUFRLE9BQVIsRUFBaUIsSUFBakIsb0JBQXVCLEdBQXZCLFNBQStCLFFBQS9CLEdBQXlDLEtBQXpDLEVBQWdELEtBQWhELENBQVA7QUFDSCxTQWhDdUM7QUFBQSxLQUFuQjtBQUFBLENBQXJCOztrQkFrQ2UsWTs7Ozs7Ozs7O0FDcENmOzs7Ozs7QUFFQSxJQUFNLE1BQU07QUFDVixVQURVLHNCQUNDO0FBQ1QsV0FBTyw0QkFBUDtBQUNEO0FBSFMsQ0FBWjs7QUFNQSxPQUFPLEdBQVAsR0FBYSxHQUFiOztrQkFFZSxHOzs7Ozs7Ozs7QUNUZjs7Ozs7O2tCQUVlO0FBQUEsU0FBSztBQUFBLFdBQWEsMEJBQVcsQ0FBWCxJQUFnQiw2QkFBaEIsR0FBNkIsQ0FBMUM7QUFBQSxHQUFMO0FBQUEsQyxFQUhmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxubW9kdWxlLmV4cG9ydHMgPSBTeW1ib2w7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgZ2V0UmF3VGFnID0gcmVxdWlyZSgnLi9fZ2V0UmF3VGFnJyksXG4gICAgb2JqZWN0VG9TdHJpbmcgPSByZXF1aXJlKCcuL19vYmplY3RUb1N0cmluZycpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbnVsbFRhZyA9ICdbb2JqZWN0IE51bGxdJyxcbiAgICB1bmRlZmluZWRUYWcgPSAnW29iamVjdCBVbmRlZmluZWRdJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2Agd2l0aG91dCBmYWxsYmFja3MgZm9yIGJ1Z2d5IGVudmlyb25tZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWRUYWcgOiBudWxsVGFnO1xuICB9XG4gIHZhbHVlID0gT2JqZWN0KHZhbHVlKTtcbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiB2YWx1ZSlcbiAgICA/IGdldFJhd1RhZyh2YWx1ZSlcbiAgICA6IG9iamVjdFRvU3RyaW5nKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zdW1gIGFuZCBgXy5zdW1CeWAgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdW0uXG4gKi9cbmZ1bmN0aW9uIGJhc2VTdW0oYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciByZXN1bHQsXG4gICAgICBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGN1cnJlbnQgPSBpdGVyYXRlZShhcnJheVtpbmRleF0pO1xuICAgIGlmIChjdXJyZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gY3VycmVudCA6IChyZXN1bHQgKyBjdXJyZW50KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU3VtO1xuIiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UmF3VGFnO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwidmFyIGJhc2VTdW0gPSByZXF1aXJlKCcuL19iYXNlU3VtJyksXG4gICAgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5Jyk7XG5cbi8qKlxuICogQ29tcHV0ZXMgdGhlIHN1bSBvZiB0aGUgdmFsdWVzIGluIGBhcnJheWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjQuMFxuICogQGNhdGVnb3J5IE1hdGhcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzdW0uXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uc3VtKFs0LCAyLCA4LCA2XSk7XG4gKiAvLyA9PiAyMFxuICovXG5mdW5jdGlvbiBzdW0oYXJyYXkpIHtcbiAgcmV0dXJuIChhcnJheSAmJiBhcnJheS5sZW5ndGgpXG4gICAgPyBiYXNlU3VtKGFycmF5LCBpZGVudGl0eSlcbiAgICA6IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3VtO1xuIiwiaW1wb3J0IGdldEJhbGFuY2UgZnJvbSAnLi9nZXRCYWxhbmNlJztcclxuZXhwb3J0IGRlZmF1bHQgKGRhdGEpPT57XHJcbiAgICAvLyBjb25zdCBiYWxhbmNlcyA9IGRhdGEuYmFsYW5jZXM7XHJcbiAgICAvLyBjb25zdCBuID0gZGF0YS5tb250aHM7XHJcbiAgICAvL1xyXG4gICAgLy8gd2hpbGUgKGJhbGFuY2VzLmxlbmd0aCA+IG4gJiYgbiA+IDApIHtcclxuICAgIC8vICAgICBiYWxhbmNlcy5wb3AoKTtcclxuICAgIC8vIH1cclxuICAgIC8vXHJcbiAgICAvLyBmb3IgKGxldCBqID0gMDsgaiA8IG47IGorKykge1xyXG4gICAgLy8gICAgIGJhbGFuY2VzW2pdID0gZ2V0QmFsYW5jZShkYXRhLGopO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGRhdGEuYmFsYW5jZXMgPSBnZXRCYWxhbmNlKGRhdGEsZGF0YS5tb250aHMsdHJ1ZSk7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiAoe1xyXG4gICdwcmluY2lwYWwnOiAxMDAwMDAsXHJcbiAgJ2ludGVyZXN0UmF0ZSc6IDAuMSxcclxuICAnY29tcG91bmRpbmdGcmVxdWVuY3knOiAyLFxyXG4gICdkb3duJzogMjAwMDAsXHJcbiAgJ21vbnRocyc6IDI0MCxcclxuICAndGF4UmF0ZSc6IDAuMzUsXHJcbiAgJ2RlcHJlY2lhdGlvbic6IDAuMDQsXHJcbiAgJ2V4cGVuc2VzJzogW10sXHJcbiAgJ2luY29tZXMnOiBbXSxcclxuICAnYmFsYW5jZXMnOiBbXVxyXG59KTtcclxuIiwiY29uc3QgcGVyaW9kc1BlclllYXIgPSAxMjtcclxuaW1wb3J0IGZ1bmN0b3IgZnJvbSAnLi8uLi9mdW5jdG9yJztcclxuaW1wb3J0IHN1bSBmcm9tICdsb2Rhc2gvc3VtJztcclxuXHJcbmV4cG9ydCBjb25zdCBjYWxjdWxhdGVBbm51aXR5ID0gKHtwZXJpb2RzLGludGVyZXN0UmF0ZVBlclBlcmlvZCxwcmVzZW50VmFsdWV9KT0+e1xyXG5cclxuICAgIGlmIChwZXJpb2RzID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBzcGVjaWZ5IGFyZ3VtZW50IG9wdGlvbjogcGVyaW9kc1wiKTtcclxuICAgIGlmIChpbnRlcmVzdFJhdGVQZXJQZXJpb2QgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHNwZWNpZnkgYXJndW1lbnQgb3B0aW9uOiBpbnRlcmVzdFJhdGVQZXJQZXJpb2RcIik7XHJcbiAgICBpZiAocHJlc2VudFZhbHVlID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBzcGVjaWZ5IGFyZ3VtZW50IG9wdGlvbjogcHJlc2VudFZhbHVlXCIpO1xyXG5cclxuICAgIGlmIChpbnRlcmVzdFJhdGVQZXJQZXJpb2QgPT09IDApIHtcclxuICAgICAgICByZXR1cm4gcHJlc2VudFZhbHVlIC8gcGVyaW9kcztcclxuICAgIH1cclxuICAgIC8vIHJldHVybiBwcmVzZW50VmFsdWUgKiAoaW50ZXJlc3RSYXRlUGVyUGVyaW9kICsgaW50ZXJlc3RSYXRlUGVyUGVyaW9kIC8gKE1hdGgucG93KDEgKyBpbnRlcmVzdFJhdGVQZXJQZXJpb2QsIHBlcmlvZHMpIC0gMSkpO1xyXG4gICAgY29uc3QgYW5udWl0eSA9IChpbnRlcmVzdFJhdGVQZXJQZXJpb2QgKiBwcmVzZW50VmFsdWUpIC8gKDEgLSBNYXRoLnBvdyggMSArIGludGVyZXN0UmF0ZVBlclBlcmlvZCAsIC1wZXJpb2RzKSk7XHJcblxyXG4gICAgY29uc29sZS5sb2coXCJDYWxjdWxhdGUgYW5udWl0eTpcIixwZXJpb2RzLGludGVyZXN0UmF0ZVBlclBlcmlvZCxwcmVzZW50VmFsdWUsYW5udWl0eSk7XHJcbiAgICByZXR1cm4gYW5udWl0eTtcclxufVxyXG5cclxuLy9leHBvcnQgY29uc3RcclxuXHJcbmV4cG9ydCBkZWZhdWx0IChkYXRhLCBrPTAsIHJldHVybkFsbCA9IGZhbHNlKT0+e1xyXG5cclxuICAgIGNvbnN0IHtleHBlbnNlcywgaW5jb21lcywgaW50ZXJlc3RSYXRlLHByaW5jaXBhbCxkb3duLG1vbnRocyxkZXByZWNpYXRpb24sdGF4UmF0ZX0gPSBkYXRhO1xyXG4gICAgY29uc3QgYmFsYW5jZXMgPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBrOyBpKyspIHtcclxuXHJcbiAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3RSYXRlUGVyUGVyaW9kID0gZnVuY3RvcihpbnRlcmVzdFJhdGUpKHRoaXMsIGkpIC8gcGVyaW9kc1BlclllYXI7XHJcbiAgICAgICAgY29uc3QgcHJldlZhbHVlID0gaSA9PT0gMCA/IHByaW5jaXBhbCAtIGRvd24gOiBiYWxhbmNlc1tpLTFdLnByZXNlbnRWYWx1ZTtcclxuICAgICAgICBjb25zdCBudW1QZXJpb2RzID0gbW9udGhzO1xyXG5cclxuICAgICAgICAvLyBhbm51aXR5IGlzLCBhZ2Fpbiwgbm90IGJlaW5nIGNhbGN1bGF0ZWQgY29ycmVjdGx5XHJcbiAgICAgICAgY29uc3QgYW5udWl0eSA9IGNhbGN1bGF0ZUFubnVpdHkoe2ludGVyZXN0UmF0ZVBlclBlcmlvZCxwZXJpb2RzOiBrIC0gaSArIDEscHJlc2VudFZhbHVlOnByZXZWYWx1ZX0pO1xyXG4gICAgICAgIGNvbnN0IGluY3JlYXNlSW5QcmVzZW50VmFsdWVEdWVUb0ludGVyZXN0UmF0ZSA9IHByZXZWYWx1ZSAqIGludGVyZXN0UmF0ZVBlclBlcmlvZDtcclxuXHJcbiAgICAgICAgY29uc3QgcHJlc2VudFZhbHVlID0gcHJldlZhbHVlICsgaW5jcmVhc2VJblByZXNlbnRWYWx1ZUR1ZVRvSW50ZXJlc3RSYXRlIC0gYW5udWl0eTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkFubnVpdHk/XCIsYW5udWl0eSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IGluY3JlYXNlSW5QcmVzZW50VmFsdWVEdWVUb0ludGVyZXN0UmF0ZSAtIGFubnVpdHk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDaGFuZ2VcIixjaGFuZ2UpO1xyXG4gICAgICAgIC8vIGNvbnN0IGVxdWl0eSA9IGkgPT09IDAgPyAoZG93biArIGNoYW5nZSkgOiAoYmFsYW5jZXNbaS0xXS5lcXVpdHkgKyBjaGFuZ2UpO1xyXG4gICAgICAgIGxldCBlcXVpdHkgPSBpID09PSAwID8gZG93biA6IGJhbGFuY2VzW2ktMV0uZXF1aXR5O1xyXG4gICAgICAgIGVxdWl0eSArPSBhbm51aXR5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXF1aXR5P1wiLGVxdWl0eSxhbm51aXR5KTtcclxuXHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNDYWxjdWxhdGVkID0gZXhwZW5zZXMubWFwKGEgPT4gKHsuLi5hLCB2YWx1ZTogZnVuY3RvcihhLnZhbHVlKShkYXRhLCBpKX0pKTtcclxuICAgICAgICBjb25zdCBpbmNvbWVzQ2FsY3VsYXRlZCA9IGluY29tZXMubWFwKGEgPT4gKHsuLi5hLCB2YWx1ZTogZnVuY3RvcihhLnZhbHVlKShkYXRhLCBpKX0pKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNUb3RhbCA9IHN1bShleHBlbnNlc0NhbGN1bGF0ZWQubWFwKHogPT4gei52YWx1ZSkpO1xyXG4gICAgICAgIGNvbnN0IGluY29tZXNUb3RhbCA9IHN1bShpbmNvbWVzQ2FsY3VsYXRlZC5tYXAoeCA9PiB4LnZhbHVlKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGludGVyZXN0UGFpZCA9IGFubnVpdHkgLSBjaGFuZ2U7XHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNEZWR1Y3RpYmxlID0gZXhwZW5zZXNUb3RhbCAqIHRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgaW50ZXJlc3REZWR1Y3RpYmxlID0gaW50ZXJlc3RQYWlkICogdGF4UmF0ZTtcclxuICAgICAgICBjb25zdCBkZXByZWNpYXRpb25Ub3RhbCA9IGRlcHJlY2lhdGlvbiAqIHByaW5jaXBhbCAvIHBlcmlvZHNQZXJZZWFyO1xyXG4gICAgICAgIGNvbnN0IGludGVyZXN0UmF0ZUZpbmFsID0gaW50ZXJlc3RSYXRlUGVyUGVyaW9kICogcGVyaW9kc1BlclllYXI7XHJcbiAgICAgICAgY29uc3QgZGVwcmVjaWF0aW9uRGVkdWN0aWJsZSA9IGRlcHJlY2lhdGlvblRvdGFsICogdGF4UmF0ZTtcclxuICAgICAgICBjb25zdCBuZXRCZWZvcmVEZWR1Y3Rpb25zID0gaW5jb21lc1RvdGFsIC0gZXhwZW5zZXNUb3RhbCAtIGludGVyZXN0UGFpZDtcclxuICAgICAgICBjb25zdCBuZXRBZnRlckRlZHVjdGlvbnMgPSBuZXRCZWZvcmVEZWR1Y3Rpb25zICsgZXhwZW5zZXNEZWR1Y3RpYmxlICsgZGVwcmVjaWF0aW9uRGVkdWN0aWJsZSArIGludGVyZXN0RGVkdWN0aWJsZTtcclxuICAgICAgICBjb25zdCBjYXBSYXRlID0gbmV0QWZ0ZXJEZWR1Y3Rpb25zICogcGVyaW9kc1BlclllYXIgLyBwcmluY2lwYWw7XHJcbiAgICAgICAgY29uc3Qgcm9pID0gKG5ldEFmdGVyRGVkdWN0aW9ucyAqIHBlcmlvZHNQZXJZZWFyKSAvIGVxdWl0eTtcclxuXHJcbiAgICAgICAgY29uc3QgYmFsYW5jZSA9IHtcclxuICAgICAgICAgICAgcHJlc2VudFZhbHVlLFxyXG4gICAgICAgICAgICBlcXVpdHksXHJcbiAgICAgICAgICAgIGludGVyZXN0UGFpZCxcclxuICAgICAgICAgICAgaW50ZXJlc3RSYXRlOmludGVyZXN0UmF0ZUZpbmFsLFxyXG4gICAgICAgICAgICBpbnRlcmVzdERlZHVjdGlibGUsXHJcbiAgICAgICAgICAgIGVxdWl0eVBhaWQ6IGNoYW5nZSxcclxuICAgICAgICAgICAgcGVyaW9kOiBpLFxyXG4gICAgICAgICAgICBleHBlbnNlc0NhbGN1bGF0ZWQsXHJcbiAgICAgICAgICAgIGV4cGVuc2VzRGVkdWN0aWJsZSxcclxuICAgICAgICAgICAgaW5jb21lOiBpbmNvbWVzVG90YWwsXHJcbiAgICAgICAgICAgIGV4cGVuc2VzOiBleHBlbnNlc1RvdGFsLFxyXG4gICAgICAgICAgICBwYXltZW50OiBhbm51aXR5LFxyXG4gICAgICAgICAgICBkZXByZWNpYXRpb25EZWR1Y3RpYmxlLFxyXG4gICAgICAgICAgICBpbmNvbWVzQ2FsY3VsYXRlZCxcclxuICAgICAgICAgICAgbmV0QmVmb3JlRGVkdWN0aW9ucyxcclxuICAgICAgICAgICAgbmV0QWZ0ZXJEZWR1Y3Rpb25zLFxyXG4gICAgICAgICAgICBkZXByZWNpYXRpb246IGRlcHJlY2lhdGlvbixcclxuICAgICAgICAgICAgY2FwUmF0ZSxcclxuICAgICAgICAgICAgcm9pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgYmFsYW5jZXMucHVzaChiYWxhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmV0dXJuQWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGJhbGFuY2VzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gYmFsYW5jZXNba107XHJcbiAgICB9XHJcblxyXG59IiwiXHJcblxyXG5pbXBvcnQgeyBjYW50cmlwLCBuYW1lZENhbnRyaXAgfSBmcm9tICcuLy4uL2NhbnRyaXAnO1xyXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9kZWZhdWx0cyc7XHJcbmltcG9ydCBwZXJjZW50aWZ5IGZyb20gJy4vcGVyY2VudGlmeSc7XHJcbmltcG9ydCBwZXJjZW50T2ZEb3duaWZ5IGZyb20gJy4vcGVyY2VudE9mRG93bmlmeSc7XHJcbmltcG9ydCBwZXJpb2RpZnkgZnJvbSAnLi9wZXJpb2RpZnknO1xyXG5pbXBvcnQgY2FsY3VsYXRlQmFsYW5jZXMgZnJvbSAnLi9jYWxjdWxhdGVCYWxhbmNlcyc7XHJcblxyXG5cclxuXHJcbmNsYXNzIEFtb3J0aXphdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGVmYXVsdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBlbnNlIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBuYW1lZENhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgZXhwZW5zZXNgKShuYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5jb21lIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBuYW1lZENhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgaW5jb21lc2ApKG5hbWUsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwZXJpb2QgKHApIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBtb250aHNgLCBwZXJpb2RpZnkpKHApO1xyXG4gICAgfVxyXG5cclxuICAgIGludGVyZXN0IChpKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgaW50ZXJlc3RSYXRlYCwgcGVyY2VudGlmeSkoaSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVwcmVjaWF0aW9uIChkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgZGVwcmVjaWF0aW9uYCwgcGVyY2VudGlmeSkoZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGF4ICh0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgdGF4UmF0ZWAsIHBlcmNlbnRpZnkpKHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaW5jaXBhbCAocCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYHByaW5jaXBhbGApKHApO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd24gKGQpIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBkb3duYCwgcGVyY2VudE9mRG93bmlmeSkoZCwgdGhpcy5kYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICBiYWxhbmNlcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5iYWxhbmNlcztcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWxhdGUgKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGF0YT9cIix0aGlzLmRhdGEpO1xyXG4gICAgICAgIGNhbGN1bGF0ZUJhbGFuY2VzKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJjYWxjdWxhdGVkLlwiLHRoaXMuZGF0YSk7XHJcblxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW1vcnRpemF0aW9uO1xyXG4iLCJleHBvcnQgZGVmYXVsdCAoZCwgY29udGV4dCkgPT4ge1xyXG4gICAgaWYgKGRbZC5sZW5ndGggLSAxXSA9PT0gJyUnKSB7XHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IDAuMDEgKiAoK2Quc2xpY2UoMCwgZC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgcmV0dXJuIHBlcmNlbnQgKiBjb250ZXh0LnByaW5jaXBhbCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZDtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IHZhbCA9PiB2YWwubGVuZ3RoIC0gMSA9PT0gYCVgID8gMC4wMSAqICgrdmFsLnNsaWNlKDAsIHZhbC5sZW5ndGggLSAxKSkgOiB2YWw7XHJcbiIsImV4cG9ydCBkZWZhdWx0IHZhbCA9PiB2YWxbdmFsLmxlbmd0aCAtIDFdID09PSAneScgPyAxMiAqICgrdmFsLnNsaWNlKDAsIHZhbC5sZW5ndGggLSAxKSkgOiB2YWw7IiwiaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5cclxuY29uc3QgY2FudHJpcCA9IChjb250ZXh0LCBkYXRhID0ge30pID0+IChrZXksIC4uLm1vZGlmaWVyKSA9PiAodmFsdWUsIHNob3VsZE1vZGlmeSA9IHRydWUpID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGlmIChzaG91bGRNb2RpZnkpIHtcclxuICAgICAgICBtb2RpZmllci5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWlzRnVuY3Rpb24obSkpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBtb2RpZmllciBwYXNzZWQgdG8gY2FudHJpcCAke2tleX0gaXMgbm90IGEgZnVuY3Rpb24uIEJlIHN1cmUgeW91IGFyZSBwYXNzaW5nIGFyZ3VtZW50cyBhbmQgbm90IGFuIGFycmF5LmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhbHVlID0gbSh2YWx1ZSwgY29udGV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGF0YVtrZXldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKGNvbnRleHQgJiYgY29udGV4dC5jYWxjdWxhdGUpIHtcclxuICAgIC8vICAgICBjb250ZXh0LmNhbGN1bGF0ZSgpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHJldHVybiBjb250ZXh0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FudHJpcDtcclxuIiwiaW1wb3J0IGNhbnRyaXAgZnJvbSAnLi9jYW50cmlwJztcclxuaW1wb3J0IG5hbWVkQ2FudHJpcCBmcm9tICcuL25hbWVkQ2FudHJpcCc7XHJcblxyXG5leHBvcnQgeyBjYW50cmlwLCBuYW1lZENhbnRyaXAgfTtcclxuIiwiaW1wb3J0IGNhbnRyaXAgZnJvbSAnLi9jYW50cmlwJztcclxuXHJcbmNvbnN0IG5hbWVkQ2FudHJpcCA9IChjb250ZXh0LCBkYXRhKSA9PiAoa2V5LCAuLi5tb2RpZmllcikgPT4gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICBjb25zdCBhcnJheSA9IGRhdGFba2V5XTtcclxuXHJcbiAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1hdGNoaW5nSW5kZXggPSBhcnJheS5maW5kSW5kZXgocCA9PiBwLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgbGV0IG1hdGNoaW5nID0gYXJyYXlbbWF0Y2hpbmdJbmRleF07XHJcblxyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gbWF0Y2hpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kaWZpZXIuZm9yRWFjaChtID0+IHtcclxuICAgICAgICBpZiAoIWlzRnVuY3Rpb24obSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBIG1vZGlmaWVyIHBhc3NlZCB0byBjYW50cmlwICR7a2V5fSBpcyBub3QgYSBmdW5jdGlvbi4gQmUgc3VyZSB5b3UgYXJlIHBhc3NpbmcgYXJndW1lbnRzIGFuZCBub3QgYW4gYXJyYXkuYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhbHVlID0gbSh2YWx1ZSwgY29udGV4dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAobWF0Y2hpbmcpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXkuc3BsaWNlKG1hdGNoaW5nSW5kZXgsIDEgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXRjaGluZyA9IHsuLi5tYXRjaGluZywgdmFsdWV9O1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXJyYXkucHVzaCh7bmFtZSwgdmFsdWV9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2FudHJpcChjb250ZXh0LCBkYXRhKShrZXksIC4uLm1vZGlmaWVyKSh2YWx1ZSwgZmFsc2UpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmFtZWRDYW50cmlwO1xyXG4iLCJpbXBvcnQgQW1vcnRpemF0aW9uIGZyb20gJy4vYW1vcnRpemF0aW9uJztcclxuXHJcbmNvbnN0ICQkJCA9IHtcclxuICBhbW9ydGl6ZSgpIHtcclxuICAgIHJldHVybiBuZXcgQW1vcnRpemF0aW9uKCk7XHJcbiAgfVxyXG59O1xyXG5cclxud2luZG93LiQkJCA9ICQkJDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICQkJDtcclxuIiwiLy8gbWFnaWNhbC4uLlxyXG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gvaXNGdW5jdGlvbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB4ID0+ICguLi5hcmdzKSA9PiBpc0Z1bmN0aW9uKHgpID8geCguLi5hcmdzKSA6IHg7XHJcbiJdfQ==
