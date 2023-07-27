import { HoldItems } from "./types";

export function totalItems(holdItems: HoldItems): number {
    let total = 0;

    for (let tea of Object.keys(holdItems)) {
        total += holdItems[tea].quantity;
    }

    return total;
}
