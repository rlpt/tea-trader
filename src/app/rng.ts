import times from "lodash/times";
import seedrandom from "seedrandom";

import {
    ALL_TEA_NAMES,
    ALL_TOWN_NAMES,
    MAX_TURNS,
    SPECIAL_TEA_PRICE_CHANCE,
} from "./initialState";
import { PriceEvent, RngTable, TeaRng } from "./types";

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

    for (let i = 0; i <= MAX_TURNS; i += 1) {
        let rngTable: RngTable = {
            message: prng(),
            specialEvent: prng(),
            specialEventValue: prng(),
            towns: {},
            // make list of 100 rng for fighting, if we use all 100 in one turn (unlikely)
            // we will wrap around and start from the beginning of the list again
            fight: times(100, () => prng()),
        };

        for (let town of ALL_TOWN_NAMES) {
            let teaPrice: TeaRng = {};

            for (let tea of ALL_TEA_NAMES) {
                let specialEventRand = Math.floor(
                    SPECIAL_TEA_PRICE_CHANCE * prng(),
                );

                let specialEvent = PriceEvent.NoPriceEvent;

                if (specialEventRand === 0) {
                    specialEvent = PriceEvent.HighPrice;
                } else if (specialEventRand === 1) {
                    specialEvent = PriceEvent.LowPrice;
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

/**
 * Please note that number range is inclusive
 *
 */
export function randomInRange(
    min: number,
    max: number,
    randomFraction: number,
): number {
    const toAdd = Math.floor((max - min + 1) * randomFraction);

    return min + toAdd;
}

export function getRngFromList(
    index: number,
    amount: number,
    list: number[],
): { newIndex: number; items: number[] } {
    let out = [];

    let currentIndex = index;

    for (let i = 0; i < amount; i++) {
        out.push(list[currentIndex % list.length]);
        currentIndex += 1;
    }

    return { newIndex: currentIndex, items: out };
}
