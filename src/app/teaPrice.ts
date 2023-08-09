import { fromPairs } from "lodash";

import {
    ALL_TEA_NAMES,
    SPECIAL_TEA_PRICE_MULTIPLIER,
    teaInfo,
} from "./initialState";
import { randomInRange } from "./rng";
import {
    Cargo,
    PriceChange,
    RngTable,
    SpecialEvent,
    TeaPrice,
    TeaRng,
    Town,
} from "./types";

export function getTeaForTurn(
    town: Town,
    turnNumber: number,
    hold: Cargo,
    rngTables: RngTable[],
) {
    const currentRngTable = rngTables[turnNumber].towns[town];

    const status: { [key: string]: TeaPrice } = fromPairs(
        ALL_TEA_NAMES.map((teaName) => {
            const { price, specialEvent } = getTeaPrice(
                teaName,
                currentRngTable.teaPrice,
            );

            const priceData = teaInfo[teaName];
            const averagePrice =
                priceData.lowPrice +
                (priceData.highPrice - priceData.lowPrice) / 2;

            let priceChange = PriceChange.NoChange;

            if (price > averagePrice) {
                priceChange = PriceChange.PriceIncrease;
            } else if (price < averagePrice) {
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
}

const getTeaPrice = (teaName: string, rngTable: TeaRng) => {
    const { lowPrice, highPrice } = teaInfo[teaName];
    const { randomNumber, specialEvent } = rngTable[teaName];

    let price = randomInRange(lowPrice, highPrice, randomNumber);

    if (specialEvent === SpecialEvent.HighPrice) {
        price = price * SPECIAL_TEA_PRICE_MULTIPLIER;
    }

    if (specialEvent === SpecialEvent.LowPrice) {
        price = Math.ceil(price / SPECIAL_TEA_PRICE_MULTIPLIER);
    }

    return { price, specialEvent };
};