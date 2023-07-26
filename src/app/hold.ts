import { Tea, HoldItems } from "./types";
import { teaInfo } from "./initialState";

export function totalItems(holdItems: HoldItems): number {
    let total = 0;

    for (let tea of Object.keys(holdItems)) {
        total += holdItems[tea].quantity;
    }

    return total;
}

export function getBasePrice(tea: Tea): number {
    return teaInfo[tea].basePrice;
}
