type Subscriber = () => any;

export class Observable {
    private subscriber: Subscriber;

    constructor() {
        this.subscriber = this.noOp;
    }

    subscribe(subscriber: Subscriber) {
        if (this.subscriber !== this.noOp) {
            throw new Error("Observable already has a subscriber");
        }
        this.subscriber = subscriber;
    }

    unsubscribe() {
        this.subscriber = this.noOp;
    }

    notify() {
        return this.subscriber();
    }

    private readonly noOp = () => {};
}