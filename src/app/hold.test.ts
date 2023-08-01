import * as hold from "./hold";
import { HoldItems, Tea } from "./types";

test("totalItemsInHold", () => {
    let holdItems: HoldItems = {
        [Tea.EarlGrey]: {
            quantity: 10,
        },
        [Tea.Assam]: {
            quantity: 15,
        },
    };

    expect(hold.totalItems(holdItems)).toBe(25);
});
