import { CargoItems } from "./types";

export function totalItems(holdItems: CargoItems): number {
    let total = 0;

    for (let tea of Object.keys(holdItems)) {
        total += holdItems[tea];
    }

    return total;
}
