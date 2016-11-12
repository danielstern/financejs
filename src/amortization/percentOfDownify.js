export default (d, context) => {
    if (d[d.length - 1] === '%') {
        const percent = 0.01 * (+d.slice(0, d.length - 1));
        return percent * context.principal();
    } else {
        return d;
    }
}