import { curry } from "ramda";
import { routerViewLocationKey } from "vue-router";

export function late(f: Function, duration: number = 5) {
    setTimeout(() => f(), duration);
}

export function lateDuration(f: Function, duration: number = 100) {
    let t: number | undefined;
    return () => {
        if (t != undefined) {
            clearTimeout(t);
        }
        t = setTimeout(() => {
            f();
            t = undefined;
        }, duration);
    }
}
export function interval<T>(a: T, b: T, next: (a: T, b: T) => T, use: (a: T) => void, duration: number = 20, end: (a: T) => void = () => { }, stop: (a: T, b: T) => boolean = (a, b) => a == b) {
    const t = setInterval(() => {
        a = next(a, b);
        use(a);
        if (stop(a, b)) clearInterval(t);
    }, duration);
}
