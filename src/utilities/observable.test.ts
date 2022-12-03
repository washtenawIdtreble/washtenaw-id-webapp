import { Observable } from "./observable";

describe(Observable.name, () => {
    test("notifies subscriber and returns value", () => {
        const returnValue = 1;
        const observable = new Observable();

        let notified = false;

        observable.subscribe(() => {
            notified = true;
            return returnValue;
        });

        const result = observable.notify();

        expect(notified).toBe(true);
        expect(result).toBe(1);
    });
    test("unsubscribe removes subscriber", () => {
        const observable = new Observable();

        let notified = false;

        const subscriber = () => {
            notified = true;
        };
        observable.subscribe(subscriber);
        observable.unsubscribe();

        const result = observable.notify();

        expect(notified).toBe(false);
        expect(result).toBeUndefined();
    });
    test("throws error if subscribed with existing subscriber", () => {
        const observable = new Observable();

        const subscriber = () => {
            console.log("hello");
        };
        observable.subscribe(subscriber);
        expect(() => {
            observable.subscribe(subscriber);
        }).toThrow(new Error("Observable already has a subscriber"));
    });
    test("does nothing if unsubscribed without a subscriber", () => {
        const observable = new Observable();

        observable.unsubscribe();

        expect(() => {
            observable.unsubscribe();
        }).not.toThrow();
    });
});