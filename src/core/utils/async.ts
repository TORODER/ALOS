export function late(f: Function, duration: number = 5) {
    setTimeout(()=>f(),duration);
}