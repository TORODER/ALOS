import { late } from "./utils/async";

interface ListenerNotice<T> {
    (value: T): void
}

export class Listener<T>{
    private listeners: Set<ListenerNotice<T>>

    constructor() {
        this.listeners = new Set();
    }

    pushNotice(value: T) {
        late(() => {
            for (const listenerNotice of this.listeners.values()) {
                listenerNotice(value);
            }
        })
    }

    addListener(listenerNotice: ListenerNotice<T>) {
        this.listeners.add(listenerNotice);
    }

    removeListener(listenerNotice: ListenerNotice<T>) {
        this.listeners.delete(listenerNotice);
    }

    clearListener() {
        this.listeners.clear();
    }

    countListener(): number {
        return this.listeners.values.length;
    }

}

export class ListenerEvent<E, T>{
    event: E;
    data: T;
    constructor(event: E, data: T) {
        this.event = event;
        this.data = data;
    }
}