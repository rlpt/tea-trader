import { ALL_TEA_NAMES, ALL_TOWN_NAMES, MAX_TURNS } from "./initialState";
import { RngTable, PriceEvent, Town } from "./types";

export function getPriceMessages(
    turnNumber: number,
    currentTown: Town,
    rngTables: RngTable[],
): string[] {
    if (turnNumber === MAX_TURNS) {
        return [];
    }

    // see if any towns next turn have a special event
    const rngTable = rngTables[turnNumber];

    // don't include current town
    const townsToCheck = ALL_TOWN_NAMES.filter(
        (townName) => townName !== currentTown,
    );

    let messages = [];

    for (let townName of townsToCheck) {
        const teas = rngTable.towns[townName].teaPrice;

        for (let teaName of ALL_TEA_NAMES) {
            const tea = teas[teaName];

            if (tea.specialEvent === PriceEvent.HighPrice) {
                messages.push(`Shortage of ${teaName} in ${townName}!`);
            }

            if (tea.specialEvent === PriceEvent.LowPrice) {
                messages.push(`Glut of ${teaName} in ${townName}!`);
            }
        }
    }

    return messages;
}
