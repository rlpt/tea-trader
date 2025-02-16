import { ALL_TEA_NAMES } from "./initial-state";
import { CargoItems } from "./types";

export function totalItems(holdItems: CargoItems): number {
    let total = 0;

    for (let tea of ALL_TEA_NAMES) {
        total += holdItems[tea];
    }

    return total;
}
