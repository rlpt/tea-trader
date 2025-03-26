import * as hold from "./cargo";
import { CargoItems } from "./types";

test("totalItemsInHold", () => {
    const holdItems: CargoItems = {
        "Earl Grey": 10,
        Assam: 15,
        Darjeeling: 0,
        Matcha: 0,
        Ceylon: 0,
        Rooibos: 0,
    };

    expect(hold.totalItems(holdItems)).toBe(25);
});
