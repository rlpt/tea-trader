import seedrandom from "seedrandom";

import {
    ALL_TEA_NAMES,
    ALL_TOWN_NAMES,
    MAX_TURNS,
    SPECIAL_EVENT_CHANCE,
} from "./initialState";
import { RngTable, SpecialEvent, TeaRng } from "./types";

/**
 * We need a fixed number of random numbers each turn. We generate these up front
 * for every turn when we initialize the initial game state. This means we do
 * not have to generate new random numbers while the game is running.
 *
 * @param seed
 * @returns
 */
export function getRngTables(seed: string): RngTable[] {
    const prng = seedrandom(seed);

    let rngTableList = [];

    for (let i = 0; i < MAX_TURNS; i += 1) {
        let rngTable: RngTable = { message: prng(), towns: {} };

        for (let town of ALL_TOWN_NAMES) {
            let teaPrice: TeaRng = {};

            for (let tea of ALL_TEA_NAMES) {
                let specialEventRand = Math.floor(
                    SPECIAL_EVENT_CHANCE * prng(),
                );

                let specialEvent = SpecialEvent.NoSpecialEvent;

                if (specialEventRand === 0) {
                    specialEvent = SpecialEvent.HighPrice;
                } else if (specialEventRand === 1) {
                    specialEvent = SpecialEvent.LowPrice;
                }

                teaPrice[tea] = {
                    randomNumber: prng(),
                    specialEvent: specialEvent,
                };
            }

            rngTable.towns[town] = { teaPrice };
        }

        rngTableList[i] = rngTable;
    }

    return rngTableList;
}

export function randomInRange(
    min: number,
    max: number,
    randomFraction: number,
): number {
    const toAdd = Math.floor((max - min + 1) * randomFraction);

    return min + toAdd;
}
