export class Subject {
    constructor() {
        this.subscribers = [];
    }
    next(value) {
        this.subscribers.forEach(s => s(value));
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        return () => {
            this.unsubscribe(subscriber);
            return subscriber;
        };
    }
    unsubscribe(subscriber) {
        const indexToRemove = this.subscribers.findIndex(s => s === subscriber);
        if (indexToRemove > -1) {
            this.subscribers.splice(indexToRemove, 1);
        }
    }
}
//# sourceMappingURL=subject.js.map