import * as hold from "./hold";
import { HoldItems, Tea } from "./types";

test("totalItemsInHold", () => {
    let holdItems: HoldItems = {
        [Tea.EarlGrey]: {
            quantity: 10,
            lastBuyPrice: 100,
        },
        [Tea.Assam]: {
            quantity: 15,
            lastBuyPrice: 100,
        },
    };

    expect(hold.totalItems(holdItems)).toBe(25);
});
