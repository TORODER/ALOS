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