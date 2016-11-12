// magical...
import isFunction from 'lodash/isFunction';

export default x => (...args) => isFunction(x) ? x(...args) : x;
