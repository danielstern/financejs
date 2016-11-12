import cantrip from './cantrip';

const namedCantrip = (context, data) => (key, ...modifier) => (name, value) => {
    const array = data[key];

    if (name === undefined) {
        return array;
    }

    const matchingIndex = array.findIndex(p => p.name === name);
    let matching = array[matchingIndex];

    if (value === undefined) {
        return matching;
    }

    modifier.forEach(m => {
        if (!isFunction(m)) {
            throw new Error(`A modifier passed to cantrip ${key} is not a function. Be sure you are passing arguments and not an array.`);
        }
        value = m(value, context);
    });

    if (matching) {
        if (value === null) {
            array.splice(matchingIndex, 1 );
        } else {
            matching = {...matching, value};
        }
    } else {
        array.push({name, value});
    }

    return cantrip(context, data)(key, ...modifier)(value, false);
};

export default namedCantrip;
