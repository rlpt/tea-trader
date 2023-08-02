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

export const teaPriceSelector = createSelector(
    [
        townSelector,
        prevTownSelector,
        turnNumberSelector,
        holdSelector,
        rngTablesSelector,
    ],
    (town, prevTown, turnNumber, hold, rngTables) => {
        const currentRngTable = rngTables[turnNumber][town];

        const prevTurnNumber = turnNumber === 1 ? 1 : turnNumber - 1;

        // we use previous rngTable to see if prices have increase or decreased compared
        // to previous town
        const prevRngTable = rngTables[prevTurnNumber][prevTown];

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
