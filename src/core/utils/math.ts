import { curry } from "ramda";

const _range = curry((min: number, max: number, v: number) => {
    if (v < min) {
        return min;
    } else if (v > max) {
        return max;
    }
    return v;
});

const autoRange = curry((a: number, b: number, v: number) => {
    return _range(Math.min(a, b), Math.max(a, b), v);
});

export const MathUtils = Object.freeze({
    range: _range,
    autoRange: autoRange,
});