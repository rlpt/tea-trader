import seedrandom, { State, StatefulPRNG } from "seedrandom";
import { RngTable } from "./types";
import { ALL_TEA_KEYS, MAX_TURNS } from "./initialState";

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
        let teaPrice: { [key: string]: number } = {};

        for (let tea of ALL_TEA_KEYS) {
            teaPrice[tea] = prng();
        }

        rngTableList[i] = { teaPrice };
    }

    return rngTableList;
}
