import { now } from "./date-utilities";

describe("date utilities", () => {
    test("now returns current time in milliseconds since the epoch", () => {
        const timeFromDate = Date.now();
        const time = now();
        const fiveSeconds = 5000;

        expect(time).toBeGreaterThanOrEqual(timeFromDate);
        expect(time).toBeLessThanOrEqual(timeFromDate + fiveSeconds);
    });
});
