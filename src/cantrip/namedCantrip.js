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

  if (matching) {
    value === null ? matching = {...matching, value} : array.splice(matchingIndex, 1);
  } else {
    array.push({name, value});
  }

  return cantrip(context, data)(key, ...modifier)(value);
};

export default namedCantrip;
