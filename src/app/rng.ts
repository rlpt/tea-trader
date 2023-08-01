import seedrandom from "seedrandom";
import { RngTable, SpecialEvent, TeaRng } from "./types";
import { ALL_TEA_NAMES, MAX_TURNS, SPECIAL_EVENT_CHANCE } from "./initialState";

/**
 * We need a fixed number of random numbers each turn. We generate these up front
 * for every turn when we initialise the initial game state. This means we do
 * not have to generate new random numbers while the game is running.
 *
 * @param seed
 * @returns
 */
export function getRngTables(seed: string): RngTable[] {
    const prng = seedrandom(seed);

    let rngTableList = [];

    for (let i = 0; i < MAX_TURNS; i += 1) {
        let teaPrice: TeaRng = {};

        for (let tea of ALL_TEA_NAMES) {
            let specialEventRand = Math.floor(SPECIAL_EVENT_CHANCE * prng());

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

        rngTableList[i] = {
            teaPrice,
        };
    }

    return rngTableList;
}

export function randomInRange(
    min: number,
    max: number,
    randomFraction: number,
): number {
    const toAdd = Math.floor((max - min) * randomFraction);

    return min + toAdd;
}
