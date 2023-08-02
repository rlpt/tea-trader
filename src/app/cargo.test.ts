import * as hold from "./cargo";
import { CargoItems, Tea } from "./types";

test("totalItemsInHold", () => {
    let holdItems: CargoItems = {
        [Tea.EarlGrey]: 10,
        [Tea.Assam]: 15,
    };

    expect(hold.totalItems(holdItems)).toBe(25);
});
