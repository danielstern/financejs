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
    if (!interestRatePerPeriod) throw new Error("Failed to specify argument option: interestRatePerPeriod");
    if (presentValue === undefined) throw new Error("Failed to specify argument option: presentValue");

    if (interestRatePerPeriod === 0) {
        return presentValue / periods;
    }
    // return presentValue * (interestRatePerPeriod + interestRatePerPeriod / (Math.pow(1 + interestRatePerPeriod, periods) - 1));
    return interestRatePerPeriod * presentValue / (1 - Math.pow(1 + interestRatePerPeriod, -periods));
};

exports.default = function (data) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var returnAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


    // should this calculate every previous balance since the first cycle to correctly account for expenses and such?

    var expenses = data.expenses,
        incomes = data.incomes,
        interestRate = data.interestRate,
        principal = data.principal,
        down = data.down,
        months = data.months,
        depreciation = data.depreciation,
        taxRate = data.taxRate;

    var balances = [];
    // console.log("attempting calculation...",data);

    var _loop = function _loop(i) {
        //
        // debugger;

        var interestRatePerPeriod = (0, _functor2.default)(interestRate)(undefined, i) / periodsPerYear;
        // console.log(k,balances);
        var prevValue = i === 0 ? principal - down : balances[i - 1].presentValue;
        // let equity = down;
        var numPeriods = months;

        // let presentValue = k === 0 ? principalOwing : balances[k - 1].principalToBePaid;

        // Code is not taking into account the present value, just the value at the start...
        var annuity = calculateAnnuity({ interestRatePerPeriod: interestRatePerPeriod, periods: numPeriods - i, presentValue: prevValue });
        // const lastPeriodPresentValue = presentValue;
        var increaseInPresentValueDueToInterestRate = prevValue * interestRatePerPeriod;

        var presentValue = prevValue + increaseInPresentValueDueToInterestRate - annuity;

        var change = increaseInPresentValueDueToInterestRate - annuity;
        var equity = i === 0 ? principal - down + change : balances[i - 1].equity + change;

        // equity += change;
        // console.log("Change?",change,equity);
        // const equity =

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVN1bS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lkZW50aXR5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3VtLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGNhbGN1bGF0ZUJhbGFuY2VzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGRlZmF1bHRzLmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXGdldEJhbGFuY2UuanMiLCJzcmNcXGFtb3J0aXphdGlvblxcaW5kZXguanMiLCJzcmNcXGFtb3J0aXphdGlvblxccGVyY2VudE9mRG93bmlmeS5qcyIsInNyY1xcYW1vcnRpemF0aW9uXFxwZXJjZW50aWZ5LmpzIiwic3JjXFxhbW9ydGl6YXRpb25cXHBlcmlvZGlmeS5qcyIsInNyY1xcY2FudHJpcFxcY2FudHJpcC5qcyIsInNyY1xcY2FudHJpcFxcaW5kZXguanMiLCJzcmNcXGNhbnRyaXBcXG5hbWVkQ2FudHJpcC5qcyIsInNyY1xcZmluYW5jZS5qcyIsInNyY1xcZnVuY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QyxLQUF6QyxFQUFnRCxLQUFoRCxDQUFQO0FBQ0gsU0FoQ3VDO0FBQUEsS0FBbkI7QUFBQSxDQUFyQjs7a0JBa0NlLFk7Ozs7Ozs7OztBQ3BDZjs7Ozs7O0FBRUEsSUFBTSxNQUFNO0FBQ1YsVUFEVSxzQkFDQztBQUNULFdBQU8sNEJBQVA7QUFDRDtBQUhTLENBQVo7O0FBTUEsT0FBTyxHQUFQLEdBQWEsR0FBYjs7a0JBRWUsRzs7Ozs7Ozs7O0FDVGY7Ozs7OztrQkFFZTtBQUFBLFNBQUs7QUFBQSxXQUFhLDBCQUFXLENBQVgsSUFBZ0IsNkJBQWhCLEdBQTZCLENBQTFDO0FBQUEsR0FBTDtBQUFBLEMsRUFIZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIiwidmFyIFN5bWJvbCA9IHJlcXVpcmUoJy4vX1N5bWJvbCcpLFxuICAgIGdldFJhd1RhZyA9IHJlcXVpcmUoJy4vX2dldFJhd1RhZycpLFxuICAgIG9iamVjdFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fb2JqZWN0VG9TdHJpbmcnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG51bGxUYWcgPSAnW29iamVjdCBOdWxsXScsXG4gICAgdW5kZWZpbmVkVGFnID0gJ1tvYmplY3QgVW5kZWZpbmVkXSc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgIHdpdGhvdXQgZmFsbGJhY2tzIGZvciBidWdneSBlbnZpcm9ubWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkVGFnIDogbnVsbFRhZztcbiAgfVxuICB2YWx1ZSA9IE9iamVjdCh2YWx1ZSk7XG4gIHJldHVybiAoc3ltVG9TdHJpbmdUYWcgJiYgc3ltVG9TdHJpbmdUYWcgaW4gdmFsdWUpXG4gICAgPyBnZXRSYXdUYWcodmFsdWUpXG4gICAgOiBvYmplY3RUb1N0cmluZyh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUdldFRhZztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc3VtYCBhbmQgYF8uc3VtQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3VtLlxuICovXG5mdW5jdGlvbiBiYXNlU3VtKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgcmVzdWx0LFxuICAgICAgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBjdXJyZW50ID0gaXRlcmF0ZWUoYXJyYXlbaW5kZXhdKTtcbiAgICBpZiAoY3VycmVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHQgPSByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGN1cnJlbnQgOiAocmVzdWx0ICsgY3VycmVudCk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVN1bTtcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHN5bVRvU3RyaW5nVGFnID0gU3ltYm9sID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUdldFRhZ2Agd2hpY2ggaWdub3JlcyBgU3ltYm9sLnRvU3RyaW5nVGFnYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgcmF3IGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGdldFJhd1RhZyh2YWx1ZSkge1xuICB2YXIgaXNPd24gPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBzeW1Ub1N0cmluZ1RhZyksXG4gICAgICB0YWcgPSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG5cbiAgdHJ5IHtcbiAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB1bmRlZmluZWQ7XG4gICAgdmFyIHVubWFza2VkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG4gIGlmICh1bm1hc2tlZCkge1xuICAgIGlmIChpc093bikge1xuICAgICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdGFnO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUgdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9iamVjdFRvU3RyaW5nO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpZGVudGl0eTtcbiIsInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXN5bmNUYWcgPSAnW29iamVjdCBBc3luY0Z1bmN0aW9uXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheXMgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGJhc2VHZXRUYWcodmFsdWUpO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gYXN5bmNUYWcgfHwgdGFnID09IHByb3h5VGFnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb247XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsInZhciBiYXNlU3VtID0gcmVxdWlyZSgnLi9fYmFzZVN1bScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIENvbXB1dGVzIHRoZSBzdW0gb2YgdGhlIHZhbHVlcyBpbiBgYXJyYXlgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy40LjBcbiAqIEBjYXRlZ29yeSBNYXRoXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3VtLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnN1bShbNCwgMiwgOCwgNl0pO1xuICogLy8gPT4gMjBcbiAqL1xuZnVuY3Rpb24gc3VtKGFycmF5KSB7XG4gIHJldHVybiAoYXJyYXkgJiYgYXJyYXkubGVuZ3RoKVxuICAgID8gYmFzZVN1bShhcnJheSwgaWRlbnRpdHkpXG4gICAgOiAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN1bTtcbiIsImltcG9ydCBnZXRCYWxhbmNlIGZyb20gJy4vZ2V0QmFsYW5jZSc7XHJcbmV4cG9ydCBkZWZhdWx0IChkYXRhKT0+e1xyXG4gICAgLy8gY29uc3QgYmFsYW5jZXMgPSBkYXRhLmJhbGFuY2VzO1xyXG4gICAgLy8gY29uc3QgbiA9IGRhdGEubW9udGhzO1xyXG4gICAgLy9cclxuICAgIC8vIHdoaWxlIChiYWxhbmNlcy5sZW5ndGggPiBuICYmIG4gPiAwKSB7XHJcbiAgICAvLyAgICAgYmFsYW5jZXMucG9wKCk7XHJcbiAgICAvLyB9XHJcbiAgICAvL1xyXG4gICAgLy8gZm9yIChsZXQgaiA9IDA7IGogPCBuOyBqKyspIHtcclxuICAgIC8vICAgICBiYWxhbmNlc1tqXSA9IGdldEJhbGFuY2UoZGF0YSxqKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBkYXRhLmJhbGFuY2VzID0gZ2V0QmFsYW5jZShkYXRhLGRhdGEubW9udGhzLHRydWUpO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4gKHtcclxuICAncHJpbmNpcGFsJzogMTAwMDAwLFxyXG4gICdpbnRlcmVzdFJhdGUnOiAwLjEsXHJcbiAgJ2NvbXBvdW5kaW5nRnJlcXVlbmN5JzogMixcclxuICAnZG93bic6IDIwMDAwLFxyXG4gICdtb250aHMnOiAyNDAsXHJcbiAgJ3RheFJhdGUnOiAwLjM1LFxyXG4gICdkZXByZWNpYXRpb24nOiAwLjA0LFxyXG4gICdleHBlbnNlcyc6IFtdLFxyXG4gICdpbmNvbWVzJzogW10sXHJcbiAgJ2JhbGFuY2VzJzogW11cclxufSk7XHJcbiIsImNvbnN0IHBlcmlvZHNQZXJZZWFyID0gMTI7XHJcbmltcG9ydCBmdW5jdG9yIGZyb20gJy4vLi4vZnVuY3Rvcic7XHJcbmltcG9ydCBzdW0gZnJvbSAnbG9kYXNoL3N1bSc7XHJcblxyXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlQW5udWl0eSA9ICh7cGVyaW9kcyxpbnRlcmVzdFJhdGVQZXJQZXJpb2QscHJlc2VudFZhbHVlfSk9PntcclxuICAgIGlmIChwZXJpb2RzID09PSB1bmRlZmluZWQpIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBzcGVjaWZ5IGFyZ3VtZW50IG9wdGlvbjogcGVyaW9kc1wiKTtcclxuICAgIGlmICghaW50ZXJlc3RSYXRlUGVyUGVyaW9kKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gc3BlY2lmeSBhcmd1bWVudCBvcHRpb246IGludGVyZXN0UmF0ZVBlclBlcmlvZFwiKTtcclxuICAgIGlmIChwcmVzZW50VmFsdWUgPT09IHVuZGVmaW5lZCkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHNwZWNpZnkgYXJndW1lbnQgb3B0aW9uOiBwcmVzZW50VmFsdWVcIik7XHJcblxyXG4gICAgaWYgKGludGVyZXN0UmF0ZVBlclBlcmlvZCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBwcmVzZW50VmFsdWUgLyBwZXJpb2RzO1xyXG4gICAgfVxyXG4gICAgLy8gcmV0dXJuIHByZXNlbnRWYWx1ZSAqIChpbnRlcmVzdFJhdGVQZXJQZXJpb2QgKyBpbnRlcmVzdFJhdGVQZXJQZXJpb2QgLyAoTWF0aC5wb3coMSArIGludGVyZXN0UmF0ZVBlclBlcmlvZCwgcGVyaW9kcykgLSAxKSk7XHJcbiAgICByZXR1cm4gKGludGVyZXN0UmF0ZVBlclBlcmlvZCAqIHByZXNlbnRWYWx1ZSkgLyAoMSAtIE1hdGgucG93KCAxICsgaW50ZXJlc3RSYXRlUGVyUGVyaW9kICwgLXBlcmlvZHMpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKGRhdGEsIGs9MCwgcmV0dXJuQWxsID0gZmFsc2UpPT57XHJcblxyXG4gICAgLy8gc2hvdWxkIHRoaXMgY2FsY3VsYXRlIGV2ZXJ5IHByZXZpb3VzIGJhbGFuY2Ugc2luY2UgdGhlIGZpcnN0IGN5Y2xlIHRvIGNvcnJlY3RseSBhY2NvdW50IGZvciBleHBlbnNlcyBhbmQgc3VjaD9cclxuXHJcbiAgICBjb25zdCB7ZXhwZW5zZXMsIGluY29tZXMsIGludGVyZXN0UmF0ZSxwcmluY2lwYWwsZG93bixtb250aHMsZGVwcmVjaWF0aW9uLHRheFJhdGV9ID0gZGF0YTtcclxuICAgIGNvbnN0IGJhbGFuY2VzID0gW107XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImF0dGVtcHRpbmcgY2FsY3VsYXRpb24uLi5cIixkYXRhKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBrOyBpKyspIHtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG5cclxuICAgICAgICBjb25zdCBpbnRlcmVzdFJhdGVQZXJQZXJpb2QgPSBmdW5jdG9yKGludGVyZXN0UmF0ZSkodGhpcywgaSkgLyBwZXJpb2RzUGVyWWVhcjtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhrLGJhbGFuY2VzKTtcclxuICAgICAgICBjb25zdCBwcmV2VmFsdWUgPSBpID09PSAwID8gcHJpbmNpcGFsIC0gZG93biA6IGJhbGFuY2VzW2ktMV0ucHJlc2VudFZhbHVlO1xyXG4gICAgICAgIC8vIGxldCBlcXVpdHkgPSBkb3duO1xyXG4gICAgICAgIGNvbnN0IG51bVBlcmlvZHMgPSBtb250aHM7XHJcblxyXG4gICAgICAgIC8vIGxldCBwcmVzZW50VmFsdWUgPSBrID09PSAwID8gcHJpbmNpcGFsT3dpbmcgOiBiYWxhbmNlc1trIC0gMV0ucHJpbmNpcGFsVG9CZVBhaWQ7XHJcblxyXG4gICAgICAgIC8vIENvZGUgaXMgbm90IHRha2luZyBpbnRvIGFjY291bnQgdGhlIHByZXNlbnQgdmFsdWUsIGp1c3QgdGhlIHZhbHVlIGF0IHRoZSBzdGFydC4uLlxyXG4gICAgICAgIGNvbnN0IGFubnVpdHkgPSBjYWxjdWxhdGVBbm51aXR5KHtpbnRlcmVzdFJhdGVQZXJQZXJpb2QscGVyaW9kczogbnVtUGVyaW9kcyAtIGkscHJlc2VudFZhbHVlOnByZXZWYWx1ZX0pO1xyXG4gICAgICAgIC8vIGNvbnN0IGxhc3RQZXJpb2RQcmVzZW50VmFsdWUgPSBwcmVzZW50VmFsdWU7XHJcbiAgICAgICAgY29uc3QgaW5jcmVhc2VJblByZXNlbnRWYWx1ZUR1ZVRvSW50ZXJlc3RSYXRlID0gcHJldlZhbHVlICogaW50ZXJlc3RSYXRlUGVyUGVyaW9kO1xyXG5cclxuICAgICAgICBjb25zdCBwcmVzZW50VmFsdWUgPSBwcmV2VmFsdWUgKyBpbmNyZWFzZUluUHJlc2VudFZhbHVlRHVlVG9JbnRlcmVzdFJhdGUgLSBhbm51aXR5O1xyXG5cclxuICAgICAgICBjb25zdCBjaGFuZ2UgPSBpbmNyZWFzZUluUHJlc2VudFZhbHVlRHVlVG9JbnRlcmVzdFJhdGUgLSBhbm51aXR5O1xyXG4gICAgICAgIGNvbnN0IGVxdWl0eSA9IGkgPT09IDAgPyBwcmluY2lwYWwgLSBkb3duICsgY2hhbmdlIDogYmFsYW5jZXNbaS0xXS5lcXVpdHkgKyBjaGFuZ2U7XHJcblxyXG4gICAgICAgIC8vIGVxdWl0eSArPSBjaGFuZ2U7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJDaGFuZ2U/XCIsY2hhbmdlLGVxdWl0eSk7XHJcbiAgICAgICAgLy8gY29uc3QgZXF1aXR5ID1cclxuXHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNDYWxjdWxhdGVkID0gZXhwZW5zZXMubWFwKGEgPT4gKHsuLi5hLCB2YWx1ZTogZnVuY3RvcihhLnZhbHVlKShkYXRhLCBpKX0pKTtcclxuICAgICAgICBjb25zdCBpbmNvbWVzQ2FsY3VsYXRlZCA9IGluY29tZXMubWFwKGEgPT4gKHsuLi5hLCB2YWx1ZTogZnVuY3RvcihhLnZhbHVlKShkYXRhLCBpKX0pKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXhwZW5zZXNUb3RhbCA9IHN1bShleHBlbnNlc0NhbGN1bGF0ZWQubWFwKHogPT4gei52YWx1ZSkpO1xyXG4gICAgICAgIGNvbnN0IGluY29tZXNUb3RhbCA9IHN1bShpbmNvbWVzQ2FsY3VsYXRlZC5tYXAoeCA9PiB4LnZhbHVlKSk7XHJcblxyXG5cclxuICAgICAgICBjb25zdCBpbnRlcmVzdFBhaWQgPSBhbm51aXR5IC0gY2hhbmdlO1xyXG4gICAgICAgIGNvbnN0IGV4cGVuc2VzRGVkdWN0aWJsZSA9IGV4cGVuc2VzVG90YWwgKiB0YXhSYXRlO1xyXG4gICAgICAgIGNvbnN0IGludGVyZXN0RGVkdWN0aWJsZSA9IGludGVyZXN0UGFpZCAqIHRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgZGVwcmVjaWF0aW9uVG90YWwgPSBkZXByZWNpYXRpb24gKiBwcmluY2lwYWwgLyBwZXJpb2RzUGVyWWVhcjtcclxuICAgICAgICBjb25zdCBpbnRlcmVzdFJhdGVGaW5hbCA9IGludGVyZXN0UmF0ZVBlclBlcmlvZCAqIHBlcmlvZHNQZXJZZWFyO1xyXG4gICAgICAgIGNvbnN0IGRlcHJlY2lhdGlvbkRlZHVjdGlibGUgPSBkZXByZWNpYXRpb25Ub3RhbCAqIHRheFJhdGU7XHJcbiAgICAgICAgY29uc3QgbmV0QmVmb3JlRGVkdWN0aW9ucyA9IGluY29tZXNUb3RhbCAtIGV4cGVuc2VzVG90YWwgLSBpbnRlcmVzdFBhaWQ7XHJcbiAgICAgICAgY29uc3QgbmV0QWZ0ZXJEZWR1Y3Rpb25zID0gbmV0QmVmb3JlRGVkdWN0aW9ucyArIGV4cGVuc2VzRGVkdWN0aWJsZSArIGRlcHJlY2lhdGlvbkRlZHVjdGlibGUgKyBpbnRlcmVzdERlZHVjdGlibGU7XHJcbiAgICAgICAgY29uc3QgY2FwUmF0ZSA9IG5ldEFmdGVyRGVkdWN0aW9ucyAqIHBlcmlvZHNQZXJZZWFyIC8gcHJpbmNpcGFsO1xyXG4gICAgICAgIGNvbnN0IHJvaSA9IChuZXRBZnRlckRlZHVjdGlvbnMgKiBwZXJpb2RzUGVyWWVhcikgLyBlcXVpdHk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJhbGFuY2UgPSB7XHJcbiAgICAgICAgICAgIHByZXNlbnRWYWx1ZSxcclxuICAgICAgICAgICAgZXF1aXR5LFxyXG4gICAgICAgICAgICBpbnRlcmVzdFBhaWQsXHJcbiAgICAgICAgICAgIGludGVyZXN0UmF0ZTppbnRlcmVzdFJhdGVGaW5hbCxcclxuICAgICAgICAgICAgaW50ZXJlc3REZWR1Y3RpYmxlLFxyXG4gICAgICAgICAgICBlcXVpdHlQYWlkOiBjaGFuZ2UsXHJcbiAgICAgICAgICAgIHBlcmlvZDogaSxcclxuICAgICAgICAgICAgZXhwZW5zZXNDYWxjdWxhdGVkLFxyXG4gICAgICAgICAgICBleHBlbnNlc0RlZHVjdGlibGUsXHJcbiAgICAgICAgICAgIGluY29tZTogaW5jb21lc1RvdGFsLFxyXG4gICAgICAgICAgICBleHBlbnNlczogZXhwZW5zZXNUb3RhbCxcclxuICAgICAgICAgICAgcGF5bWVudDogYW5udWl0eSxcclxuICAgICAgICAgICAgZGVwcmVjaWF0aW9uRGVkdWN0aWJsZSxcclxuICAgICAgICAgICAgaW5jb21lc0NhbGN1bGF0ZWQsXHJcbiAgICAgICAgICAgIG5ldEJlZm9yZURlZHVjdGlvbnMsXHJcbiAgICAgICAgICAgIG5ldEFmdGVyRGVkdWN0aW9ucyxcclxuICAgICAgICAgICAgZGVwcmVjaWF0aW9uOiBkZXByZWNpYXRpb24sXHJcbiAgICAgICAgICAgIGNhcFJhdGUsXHJcbiAgICAgICAgICAgIHJvaVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGJhbGFuY2VzLnB1c2goYmFsYW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJldHVybkFsbCkge1xyXG4gICAgICAgIHJldHVybiBiYWxhbmNlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGJhbGFuY2VzW2tdO1xyXG4gICAgfVxyXG5cclxufSIsIlxyXG5cclxuaW1wb3J0IHsgY2FudHJpcCwgbmFtZWRDYW50cmlwIH0gZnJvbSAnLi8uLi9jYW50cmlwJztcclxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMnO1xyXG5pbXBvcnQgcGVyY2VudGlmeSBmcm9tICcuL3BlcmNlbnRpZnknO1xyXG5pbXBvcnQgcGVyY2VudE9mRG93bmlmeSBmcm9tICcuL3BlcmNlbnRPZkRvd25pZnknO1xyXG5pbXBvcnQgcGVyaW9kaWZ5IGZyb20gJy4vcGVyaW9kaWZ5JztcclxuaW1wb3J0IGNhbGN1bGF0ZUJhbGFuY2VzIGZyb20gJy4vY2FsY3VsYXRlQmFsYW5jZXMnO1xyXG5cclxuXHJcblxyXG5jbGFzcyBBbW9ydGl6YXRpb24ge1xyXG4gICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRlZmF1bHRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwZW5zZSAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbmFtZWRDYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGV4cGVuc2VzYCkobmFtZSwgdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGluY29tZSAobmFtZSwgdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gbmFtZWRDYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGluY29tZXNgKShuYW1lLCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGVyaW9kIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgbW9udGhzYCwgcGVyaW9kaWZ5KShwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnRlcmVzdCAoaSkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGludGVyZXN0UmF0ZWAsIHBlcmNlbnRpZnkpKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlcHJlY2lhdGlvbiAoZCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYGRlcHJlY2lhdGlvbmAsIHBlcmNlbnRpZnkpKGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRheCAodCkge1xyXG4gICAgICAgIHJldHVybiBjYW50cmlwKHRoaXMsIHRoaXMuZGF0YSkoYHRheFJhdGVgLCBwZXJjZW50aWZ5KSh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmluY2lwYWwgKHApIHtcclxuICAgICAgICByZXR1cm4gY2FudHJpcCh0aGlzLCB0aGlzLmRhdGEpKGBwcmluY2lwYWxgKShwKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3duIChkKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbnRyaXAodGhpcywgdGhpcy5kYXRhKShgZG93bmAsIHBlcmNlbnRPZkRvd25pZnkpKGQsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmFsYW5jZXMgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuYmFsYW5jZXM7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsY3VsYXRlICgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRhdGE/XCIsdGhpcy5kYXRhKTtcclxuICAgICAgICBjYWxjdWxhdGVCYWxhbmNlcyh0aGlzLmRhdGEpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2FsY3VsYXRlZC5cIix0aGlzLmRhdGEpO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFtb3J0aXphdGlvbjtcclxuIiwiZXhwb3J0IGRlZmF1bHQgKGQsIGNvbnRleHQpID0+IHtcclxuICAgIGlmIChkW2QubGVuZ3RoIC0gMV0gPT09ICclJykge1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSAwLjAxICogKCtkLnNsaWNlKDAsIGQubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgIHJldHVybiBwZXJjZW50ICogY29udGV4dC5wcmluY2lwYWwoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCB2YWwgPT4gdmFsLmxlbmd0aCAtIDEgPT09IGAlYCA/IDAuMDEgKiAoK3ZhbC5zbGljZSgwLCB2YWwubGVuZ3RoIC0gMSkpIDogdmFsO1xyXG4iLCJleHBvcnQgZGVmYXVsdCB2YWwgPT4gdmFsW3ZhbC5sZW5ndGggLSAxXSA9PT0gJ3knID8gMTIgKiAoK3ZhbC5zbGljZSgwLCB2YWwubGVuZ3RoIC0gMSkpIDogdmFsOyIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJ2xvZGFzaC9pc0Z1bmN0aW9uJztcclxuXHJcbmNvbnN0IGNhbnRyaXAgPSAoY29udGV4dCwgZGF0YSA9IHt9KSA9PiAoa2V5LCAuLi5tb2RpZmllcikgPT4gKHZhbHVlLCBzaG91bGRNb2RpZnkgPSB0cnVlKSA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBkYXRhW2tleV07XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBpZiAoc2hvdWxkTW9kaWZ5KSB7XHJcbiAgICAgICAgbW9kaWZpZXIuZm9yRWFjaChtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKG0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgbW9kaWZpZXIgcGFzc2VkIHRvIGNhbnRyaXAgJHtrZXl9IGlzIG5vdCBhIGZ1bmN0aW9uLiBCZSBzdXJlIHlvdSBhcmUgcGFzc2luZyBhcmd1bWVudHMgYW5kIG5vdCBhbiBhcnJheS5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IG0odmFsdWUsIGNvbnRleHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGlmIChjb250ZXh0ICYmIGNvbnRleHQuY2FsY3VsYXRlKSB7XHJcbiAgICAvLyAgICAgY29udGV4dC5jYWxjdWxhdGUoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICByZXR1cm4gY29udGV4dDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhbnRyaXA7XHJcbiIsImltcG9ydCBjYW50cmlwIGZyb20gJy4vY2FudHJpcCc7XHJcbmltcG9ydCBuYW1lZENhbnRyaXAgZnJvbSAnLi9uYW1lZENhbnRyaXAnO1xyXG5cclxuZXhwb3J0IHsgY2FudHJpcCwgbmFtZWRDYW50cmlwIH07XHJcbiIsImltcG9ydCBjYW50cmlwIGZyb20gJy4vY2FudHJpcCc7XHJcblxyXG5jb25zdCBuYW1lZENhbnRyaXAgPSAoY29udGV4dCwgZGF0YSkgPT4gKGtleSwgLi4ubW9kaWZpZXIpID0+IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgY29uc3QgYXJyYXkgPSBkYXRhW2tleV07XHJcblxyXG4gICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYXRjaGluZ0luZGV4ID0gYXJyYXkuZmluZEluZGV4KHAgPT4gcC5uYW1lID09PSBuYW1lKTtcclxuICAgIGxldCBtYXRjaGluZyA9IGFycmF5W21hdGNoaW5nSW5kZXhdO1xyXG5cclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGlmaWVyLmZvckVhY2gobSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc0Z1bmN0aW9uKG0pKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQSBtb2RpZmllciBwYXNzZWQgdG8gY2FudHJpcCAke2tleX0gaXMgbm90IGEgZnVuY3Rpb24uIEJlIHN1cmUgeW91IGFyZSBwYXNzaW5nIGFyZ3VtZW50cyBhbmQgbm90IGFuIGFycmF5LmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YWx1ZSA9IG0odmFsdWUsIGNvbnRleHQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1hdGNoaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShtYXRjaGluZ0luZGV4LCAxICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWF0Y2hpbmcgPSB7Li4ubWF0Y2hpbmcsIHZhbHVlfTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFycmF5LnB1c2goe25hbWUsIHZhbHVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNhbnRyaXAoY29udGV4dCwgZGF0YSkoa2V5LCAuLi5tb2RpZmllcikodmFsdWUsIGZhbHNlKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5hbWVkQ2FudHJpcDtcclxuIiwiaW1wb3J0IEFtb3J0aXphdGlvbiBmcm9tICcuL2Ftb3J0aXphdGlvbic7XHJcblxyXG5jb25zdCAkJCQgPSB7XHJcbiAgYW1vcnRpemUoKSB7XHJcbiAgICByZXR1cm4gbmV3IEFtb3J0aXphdGlvbigpO1xyXG4gIH1cclxufTtcclxuXHJcbndpbmRvdy4kJCQgPSAkJCQ7XHJcblxyXG5leHBvcnQgZGVmYXVsdCAkJCQ7XHJcbiIsIi8vIG1hZ2ljYWwuLi5cclxuaW1wb3J0IGlzRnVuY3Rpb24gZnJvbSAnbG9kYXNoL2lzRnVuY3Rpb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgeCA9PiAoLi4uYXJncykgPT4gaXNGdW5jdGlvbih4KSA/IHgoLi4uYXJncykgOiB4O1xyXG4iXX0=
