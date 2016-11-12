import isFunction from 'lodash/isFunction';

const cantrip = (context, data = {}) => (key, ...modifier) => (value, shouldModify = true) => {
    if (value === undefined) {
        return data[key];
    }



    if (shouldModify) {
        modifier.forEach(m => {
            if (!isFunction(m)) {
                throw new Error(`A modifier passed to cantrip ${key} is not a function. Be sure you are passing arguments and not an array.`);
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

export default cantrip;
