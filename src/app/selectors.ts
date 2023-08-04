import { createSelector } from "@reduxjs/toolkit";
import { totalItems } from "./cargo";
import { RootState } from "./store";
import { Cargo, PriceChange, SpecialEvent, TeaPrice, TeaRng } from "./types";
import {
    ALL_TEA_NAMES,
    teaInfo,
    SPECIAL_EVENT_MULTIPLIER,
    MAX_TURNS,
    ALL_TOWN_NAMES,
} from "./initialState";
import { randomInRange } from "./rng";
import _ from "lodash";
import { start } from "repl";

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
export const cargoSelector = (state: RootState) => state.cargo;
export const wipeSelector = (state: RootState) => state.wipe;

export const cargoTotalSelector = createSelector(
    [cargoSelector],
    (hold: Cargo) => {
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
        cargoSelector,
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

                const quantity = hold.items[teaName];

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

export const messageSelector = (state: RootState) => {
    if (state.modal.modalType === "MessageModal") {
        return state.modal.message;
    }

    return "";
};
