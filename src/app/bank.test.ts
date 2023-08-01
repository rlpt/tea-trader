import * as bank from "./bank";
import { STARTING_DEBT } from "./initialState";

describe("applyInterest", () => {
    test("negative balance", () => {
        const balance = bank.applyInterest(0.05, STARTING_DEBT);

        expect(balance).toBe(-52500);
    });

    test("small balance", () => {
        const balance = bank.applyInterest(0.05, 1);

        console.log(balance);

        // expect(balance).toBe(-52500);
    });
});
