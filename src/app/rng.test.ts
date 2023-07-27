import { getRngTables, randomInRange } from "./rng";

describe("rng", () => {
    test("randomInRange", () => {
        const num = randomInRange(100, 1000, 0.7);

        expect(num).toBe(730);
    });
});
