import { createSelector } from "@reduxjs/toolkit";
import { totalItems } from "./hold";
import { RootState } from "./store";
import {
    Hold,
    PriceChange,
    RngTable,
    SpecialEvent,
    TeaPrice,
    TeaRng,
} from "./types";
import {
    ALL_TEA_NAMES,
    teaInfo,
    SPECIAL_EVENT_MULTIPLIER,
    MAX_TURNS,
    ALL_TOWN_NAMES,
} from "./initialState";
import { randomInRange } from "./rng";
import _ from "lodash";

export const townSelector = (state: RootState) => {
    return state.townsVisited[state.turnNumber - 1];
};

export const prevTownSelector = (state: RootState) => {
    if (state.turnNumber === 1) {
        // return first town as previously visited town when we are on first turn
        // this avoids a null and works fine for comparing previous prices as
        // the prices will be the same
        return state.townsVisited[0];
    }

    return state.townsVisited[state.turnNumber - 2];
};

export const turnNumberSelector = (state: RootState) => state.turnNumber;
export const rngTablesSelector = (state: RootState) => state.rngTables;
export const cashSelector = (state: RootState) => state.cash;
export const holdSelector = (state: RootState) => state.hold;

export const holdTotalSelector = createSelector(
    [holdSelector],
    (hold: Hold) => {
        return {
            current: totalItems(hold.items),
            max: hold.maxSize,
        };
    },
);

const getPrice = (teaName: string, rngTable: TeaRng) => {
    const { lowPrice, highPrice } = teaInfo[teaName];
    const { randomNumber, specialEvent } = rngTable[teaName];

    let price = randomInRange(lowPrice, highPrice, randomNumber);

    if (specialEvent === SpecialEvent.HighPrice) {
        price = price * SPECIAL_EVENT_MULTIPLIER;
    }

    if (specialEvent === SpecialEvent.LowPrice) {
        price = Math.ceil(price / SPECIAL_EVENT_MULTIPLIER);
    }

    return { price, specialEvent };
};

export const teaPriceSelector = createSelector(
    [
        townSelector,
        prevTownSelector,
        turnNumberSelector,
        holdSelector,
        rngTablesSelector,
    ],
    (town, prevTown, turnNumber, hold, rngTables) => {
        const currentRngTable = rngTables[turnNumber].towns[town];

        const prevTurnNumber = turnNumber === 1 ? 1 : turnNumber - 1;

        // we use previous rngTable to see if prices have increase or decreased compared
        // to previous town
        const prevRngTable = rngTables[prevTurnNumber].towns[prevTown];

        const status: { [key: string]: TeaPrice } = _.fromPairs(
            ALL_TEA_NAMES.map((teaName) => {
                const { price, specialEvent } = getPrice(
                    teaName,
                    currentRngTable.teaPrice,
                );

                const prevPrices = getPrice(teaName, prevRngTable.teaPrice);

                let priceChange = PriceChange.NoChange;

                if (price > prevPrices.price) {
                    priceChange = PriceChange.PriceIncrease;
                } else if (price < prevPrices.price) {
                    priceChange = PriceChange.PriceDecrease;
                }

                const { quantity } = hold.items[teaName];

                return [
                    teaName,
                    {
                        teaName,
                        price,
                        quantity,
                        specialEvent,
                        priceChange,
                    },
                ];
            }),
        );

        return status;
    },
);

export const messageSelector = createSelector(
    [turnNumberSelector, rngTablesSelector, townSelector],
    (turnNumber, rngTables, currentTown) => {
        if (turnNumber === MAX_TURNS) {
            return "";
        }

        // see if any towns next turn have a special event
        const rngTable = rngTables[turnNumber + 1];

        // don't include current town
        const townsToCheck = ALL_TOWN_NAMES.filter(
            (townName) => townName !== currentTown,
        );

        // we pad out message list with blank messages to decrease the chance
        // of getting a message every turn
        let messages = ["", "", "", "", ""];

        for (let townName of townsToCheck) {
            const teas = rngTable.towns[townName].teaPrice;

            for (let teaName of ALL_TEA_NAMES) {
                const tea = teas[teaName];

                if (tea.specialEvent === SpecialEvent.HighPrice) {
                    messages.push(`Shortage of ${teaName} in ${townName}`);
                }

                if (tea.specialEvent === SpecialEvent.LowPrice) {
                    messages.push(`Glut of ${teaName} in ${townName}`);
                }
            }
        }

        // pick random message from list
        const messageIdx = randomInRange(0, messages.length, rngTable.message);

        return messages[messageIdx];
    },
);
