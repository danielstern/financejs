export default val => val.length - 1 === `%` ? 0.01 * (+val.slice(0, val.length - 1)) : val;
