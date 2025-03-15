import * as R from "remeda";

import {
    ALL_TEA_NAMES,
    SPECIAL_TEA_PRICE_MULTIPLIER,
    teaInfo,
} from "./initial-state";
import { randomInRange } from "./rng";
import {
    Cargo,
    Price,
    PriceEvent,
    RngTable,
    TeaPrice,
    TeaRng,
    Town,
} from "./types";

export function getTeaForTurn(town: Town, hold: Cargo, rngTable: RngTable) {
    const currentRngTable = rngTable.towns[town];

    const status: { [key: string]: TeaPrice } = R.fromPairs(
        ALL_TEA_NAMES.map((teaName) => {
            const { price, specialEvent } = getTeaPrice(
                teaName,
                currentRngTable.teaPrice,
            );

            const priceData = teaInfo[teaName];
            const averagePrice =
                priceData.lowPrice +
                (priceData.highPrice - priceData.lowPrice) / 2;

            let priceAvg = Price.Avg;

            if (price > averagePrice) {
                priceAvg = Price.AboveAvg;
            } else if (price < averagePrice) {
                priceAvg = Price.BelowAvg;
            }

            const quantity = hold.items[teaName];

            return [
                teaName,
                {
                    teaName,
                    price,
                    quantity,
                    specialEvent,
                    priceAvg,
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

    if (specialEvent === PriceEvent.HighPrice) {
        price = price * SPECIAL_TEA_PRICE_MULTIPLIER;
    }

    if (specialEvent === PriceEvent.LowPrice) {
        price = Math.ceil(price / SPECIAL_TEA_PRICE_MULTIPLIER);
    }

    return { price, specialEvent };
};

export const getTeaEvents = (rngTable: TeaRng): { teaName: string; event: PriceEvent }[] => {
    return ALL_TEA_NAMES
    .map((teaName) => ({
        teaName,
        event: rngTable[teaName].specialEvent,
    }))
    .filter(({event}) => {
        return event === PriceEvent.HighPrice || event === PriceEvent.LowPrice;
    })
};
