import { createSelector } from "@reduxjs/toolkit";
import { totalItems } from "./hold";
import { RootState } from "./store";
import { Hold, PriceChange, SpecialEvent, TeaPrice } from "./types";
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
    [townSelector, turnNumberSelector, holdSelector, rngTablesSelector],
    (town, turnNumber, hold, rngTables) => {
        const rngTable = rngTables[turnNumber][town];

        const status: { [key: string]: TeaPrice } = _.fromPairs(
            ALL_TEA_NAMES.map((teaName) => {
                const { lowPrice, highPrice } = teaInfo[teaName];
                const { randomNumber, specialEvent } =
                    rngTable.teaPrice[teaName];

                let price = randomInRange(lowPrice, highPrice, randomNumber);

                if (specialEvent === SpecialEvent.HighPrice) {
                    price = price * SPECIAL_EVENT_MULTIPLIER;
                }

                if (specialEvent === SpecialEvent.LowPrice) {
                    price = Math.ceil(price / SPECIAL_EVENT_MULTIPLIER);
                }

                const { quantity } = hold.items[teaName];

                return [
                    teaName,
                    {
                        teaName,
                        price,
                        quantity,
                        specialEvent,
                        priceChange: PriceChange.NoChange,
                    },
                ];
            }),
        );

        return status;
    },
);
