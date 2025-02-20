import { getRngFromList, randomInRange } from "./rng";

describe("rng", () => {
    test("randomInRange", () => {
        const num = randomInRange(100, 1000, 0.7);

        expect(num).toBe(730);
    });

    test("getRngFromList", () => {
        expect(getRngFromList(0, 4, [1, 2, 3, 4])).toStrictEqual({
            newIndex: 4,
            items: [1, 2, 3, 4],
        });

        expect(getRngFromList(4, 6, [1, 2, 3, 4])).toStrictEqual({
            newIndex: 10,
            items: [1, 2, 3, 4, 1, 2],
        });
    });
});
