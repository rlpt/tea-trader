import * as hold from "./cargo";
import { CargoItems } from "./types";

test("totalItemsInHold", () => {
    const holdItems: CargoItems = {
        "Earl Grey": 10,
        Assam: 15,
        Darjeeling: 0,
        "Lapsang Souchong": 0,
        "Green Tea": 0,
        Matcha: 0,
        "English Breakfast": 0,
        "White Tea": 0,
        "Lady Grey": 0,
        Longjing: 0,
    };

    expect(hold.totalItems(holdItems)).toBe(25);
});
